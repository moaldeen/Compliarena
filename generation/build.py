"""Check and build the generated app on the host with Node 20, as in our runs.

Build steps: `npm install --ignore-scripts --no-audit --no-fund`, then `npm run build`. Each step has a 300 s limit.
"""
import json
import os
import shutil
import subprocess
from pathlib import Path

REQUIRED_FILES = ("package.json", "index.html", "src/main.jsx", "src/App.jsx")
NPM_TIMEOUT = 300


def find_npm() -> tuple[str, str]:
    """npm next to NODE_BIN (or next to `node` on PATH); refuses anything but Node 20. Returns (npm path, node version)."""
    node = os.environ.get("NODE_BIN") or shutil.which("node")
    if not node or not Path(node).is_file():
        raise SystemExit("Node 20 not found: set NODE_BIN to a Node 20 `node` binary (our runs used v20.20.2)")
    version = subprocess.run([node, "--version"], capture_output=True, text=True).stdout.strip()
    if not version.startswith("v20."):
        raise SystemExit(f"NODE_BIN must point to Node 20 (our runs used v20.20.2); {node} is {version or 'unknown'}")
    npm = Path(node).parent / "npm"
    if not npm.is_file():
        raise SystemExit(f"npm not found next to {node}")
    return str(npm), version


def validate_project(project: Path) -> None:
    """The app must have the four required files and a package.json with a `dev` script."""
    missing = [name for name in REQUIRED_FILES if not (project / name).is_file()]
    if missing:
        raise RuntimeError(f"Generated app is missing: {', '.join(missing)}")
    try:
        package = json.loads((project / "package.json").read_text(encoding="utf-8"))
    except json.JSONDecodeError as exc:
        raise RuntimeError("Generated package.json is invalid JSON") from exc
    if "dev" not in package.get("scripts", {}):
        raise RuntimeError("Generated package.json has no npm dev script")


def build_project(project: Path, npm: str, log_dir: Path, attempt: int) -> None:
    """npm install + npm run build; output goes to log_dir/npm_<step>_<attempt>.txt. The error text (last 4,500 characters) is what the repair turn sees."""
    env = os.environ.copy()
    env["PATH"] = str(Path(npm).parent) + os.pathsep + env.get("PATH", "")
    steps = (("install", [npm, "install", "--ignore-scripts", "--no-audit", "--no-fund"]),
             ("build", [npm, "run", "build"]))
    for name, command in steps:
        try:
            result = subprocess.run(command, cwd=project, env=env, capture_output=True, text=True,
                                    timeout=NPM_TIMEOUT, check=False)
        except subprocess.TimeoutExpired as exc:
            raise RuntimeError(f"npm {name} timed out after {NPM_TIMEOUT}s") from exc
        output = result.stdout + result.stderr
        (log_dir / f"npm_{name}_{attempt}.txt").write_text(output, encoding="utf-8")
        if result.returncode != 0:
            raise RuntimeError(f"npm {name} failed (exit {result.returncode}): {output[-4500:]}")
