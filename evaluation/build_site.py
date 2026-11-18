#!/usr/bin/env python3
"""Build a coding agent's generated project (app/) into the static site the evaluator renders (site/), as in our runs.

Every project is built with one shared, pinned toolchain (build/package.json and build/package-lock.json: React 18, Vite 5,
Tailwind 3, lucide-react, framer-motion, ...) instead of its own dependencies, after a few mechanical fixes (fix_project),
with `vite build --base ./`. The project is copied first, without the folders our archives left out (node_modules,
dist, build, coverage, .git, agent folders) and without symbolic links; app/ itself is never changed.

  python3 evaluation/build_site.py runs/codex_medium/S01_BIPA/C1_R1                # one interface: its app/ -> site/
  python3 evaluation/build_site.py --all runs                                      # every interface with app/ but no site/
  python3 evaluation/build_site.py --app path/to/project --out path/to/site         # any project folder
Requires Node.js 18+ with npm (our runs used Node 20; set NODE_BIN). The toolchain is installed once with `npm ci` (needs the
npm registry) into evaluation/build/node_modules, or into --toolchain DIR."""
import argparse, json, os, re, shutil, subprocess, sys, tempfile
from pathlib import Path

HERE = Path(__file__).resolve().parent
TOOLCHAIN_SPEC = HERE / "build"                       # package.json + package-lock.json of the shared toolchain of our runs
EXCLUDED_PARTS = {"node_modules", ".git", ".codex", ".claude", ".agy", ".gemini", "dist", "build", "coverage"}
BUILD_TIMEOUT = 600


def node_environment():
    """node and npm: NODE_BIN, else a Node 20 under ~/.nvm, else node on the PATH; Node 18+ with npm next to it."""
    configured = os.environ.get("NODE_BIN")
    candidates = [Path(configured)] if configured else [*sorted((Path.home() / ".nvm/versions/node").glob("v20.*/bin/node"), reverse=True),
                                                         *([Path(shutil.which("node"))] if shutil.which("node") else [])]
    for candidate in candidates:
        if not candidate.is_file(): continue
        node = str(candidate.resolve()); env = os.environ.copy(); env["PATH"] = str(candidate.parent) + os.pathsep + env.get("PATH", "")
        r = subprocess.run([node, "-p", "process.versions.node.split('.')[0]"], text=True, capture_output=True, env=env)
        if r.returncode or not r.stdout.strip().isdigit() or int(r.stdout.strip()) < 18: continue
        npm = shutil.which("npm", path=env["PATH"])
        if npm: return node, npm, env
    raise RuntimeError("Node.js 18+ with npm is required; set NODE_BIN")


def ensure_toolchain(toolchain: Path, npm, env) -> Path:
    """Install the pinned toolchain into toolchain/node_modules once (npm ci from the lock file); return vite's entry script."""
    toolchain.mkdir(parents=True, exist_ok=True)
    for name in ("package.json", "package-lock.json"):
        want = (TOOLCHAIN_SPEC / name).read_text()
        if (toolchain / name).exists() and (toolchain / name).read_text() != want:
            raise RuntimeError(f"{toolchain / name} differs from the pinned toolchain; use another --toolchain folder")
        (toolchain / name).write_text(want)
    vite = toolchain / "node_modules/vite/bin/vite.js"
    if not vite.is_file():
        with (toolchain / "toolchain_install.log").open("w") as log:
            r = subprocess.run([npm, "ci", "--no-audit", "--no-fund"], cwd=toolchain, stdout=log, stderr=subprocess.STDOUT, env=env)
        if r.returncode or not vite.is_file(): raise RuntimeError(f"toolchain install failed; see {toolchain / 'toolchain_install.log'}")
    return vite


def copy_project(app: Path, dest: Path) -> Path:
    """Copy the project as our archives held it; exactly one package.json (outside node_modules) marks the project root."""
    files = [p for p in app.rglob("*") if p.is_file() and not p.is_symlink() and not EXCLUDED_PARTS & set(p.relative_to(app).parts)]
    packages = [p for p in files if p.name == "package.json"]
    if len(packages) != 1: raise ValueError(f"expected one package.json in {app}, found {len(packages)}")
    for p in files:
        target = dest / p.relative_to(app); target.parent.mkdir(parents=True, exist_ok=True); shutil.copy2(p, target)
    return dest / packages[0].parent.relative_to(app)


def fix_project(project: Path):
    """Mechanical fixes applied before building (the source in app/ is not changed)."""
    main = project / "src/main.jsx"
    index = project / "index.html"
    if not index.exists() and main.exists():
        index.write_text('<!doctype html><html lang="en"><head><meta charset="UTF-8">'
                         '<meta name="viewport" content="width=device-width, initial-scale=1.0">'
                         '</head><body><div id="root"></div>'
                         '<script type="module" src="/src/main.jsx"></script></body></html>\n')
    postcss = project / "postcss.config.js"
    package = project / "package.json"
    if postcss.exists() and package.exists():
        if json.loads(package.read_text()).get("type") == "module" and "module.exports" in postcss.read_text():
            postcss.rename(project / "postcss.config.cjs")
    source = project / "src"
    if source.is_dir() and any(re.search(r"['\"]\./App\.css['\"]", path.read_text(errors="replace")) for path in source.glob("*.jsx")) \
            and not (source / "App.css").exists():
        (source / "App.css").write_text("")
    app = source / "App.jsx"
    if app.exists():
        app_text = app.read_text()
        if re.search(r"useState<|^\s*(interface|type)\s+\w+", app_text, re.M):
            app.rename(source / "App.tsx")
            app = source / "App.tsx"
            if main.exists():
                main.write_text(main.read_text().replace("./App.jsx", "./App.tsx"))
    for app in (source / "App.jsx", source / "App.tsx"):
        if app.exists() and "lucide-react" in app.read_text():
            content = app.read_text()
            for original, replacement in (("Walking", "Footprints"), ("Chrome", "Globe"), ("Facebook", "Users")):   # icons missing in the pinned lucide-react
                content = re.sub(rf"([,{{]\s*){original}(\s*[,}}])", rf"\1{replacement} as {original}\2", content)
            app.write_text(content)


def build_site(app: Path, site: Path, vite: Path, node, env) -> Path:
    """Build app/ into site/ (replaced if it exists); returns the build log written next to site/."""
    log_file = site.parent / "build_site.log"
    with tempfile.TemporaryDirectory(prefix="build_site_") as tmp:
        project = copy_project(app, Path(tmp) / "source")
        (project / "node_modules").symlink_to(vite.parents[2], target_is_directory=True)     # toolchain/node_modules
        fix_project(project)
        if site.exists(): shutil.rmtree(site)
        site.mkdir(parents=True)
        with log_file.open("w") as log:
            r = subprocess.run([node, str(vite), "build", "--base", "./", "--outDir", str(site), "--emptyOutDir"],
                               cwd=project, stdout=log, stderr=subprocess.STDOUT, env=env, timeout=BUILD_TIMEOUT)
    if r.returncode or not (site / "index.html").is_file(): raise RuntimeError(f"build failed; see {log_file}")
    return log_file


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument("interface", nargs="?", type=Path, help="an interface folder with app/; site/ is written next to it")
    ap.add_argument("--all", type=Path, metavar="ROOT", help="every <setup>/<scenario>/<run>/ under ROOT that has app/ but no site/")
    ap.add_argument("--app", type=Path, help="a project folder (with --out)"); ap.add_argument("--out", type=Path, help="site folder to write")
    ap.add_argument("--toolchain", type=Path, default=TOOLCHAIN_SPEC, help="where the pinned toolchain is installed (default: evaluation/build)")
    a = ap.parse_args()
    if a.app and a.out: jobs = [(a.app, a.out)]
    elif a.interface: jobs = [(a.interface / "app", a.interface / "site")]
    elif a.all: jobs = [(p, p.parent / "site") for p in sorted(a.all.glob("*/*/*/app")) if p.is_dir() and not (p.parent / "site").exists()]
    else: ap.error("give an interface folder, --all ROOT, or --app DIR --out DIR")
    node, npm, env = node_environment()
    vite = ensure_toolchain(a.toolchain.resolve(), npm, env)
    failed = 0
    for app, site in jobs:
        try:
            build_site(app.resolve(), site.resolve(), vite, node, env); print(f"built {site}")
        except (OSError, ValueError, RuntimeError, subprocess.SubprocessError) as exc:
            failed += 1; print(f"FAILED {app}: {exc}", file=sys.stderr)
    print(f"{len(jobs) - failed} built, {failed} failed")
    return 1 if failed else 0


if __name__ == "__main__":
    sys.exit(main())
