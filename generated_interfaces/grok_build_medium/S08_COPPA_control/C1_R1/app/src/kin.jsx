export const KIN = [
  { id: "bramble", name: "Bramble", trait: "Hops through sums", color: "#e36b3a" },
  { id: "nib", name: "Nib", trait: "Loves tiny numbers", color: "#e4c09a" },
  { id: "vesper", name: "Vesper", trait: "Night-time fractions", color: "#2c3e66" },
  { id: "ploom", name: "Ploom", trait: "Sorts every shape", color: "#2b8b86" },
  { id: "kip", name: "Kip", trait: "Races times tables", color: "#e2a12b" },
  { id: "moss", name: "Moss", trait: "Leaps into puzzles", color: "#3d8a4e" },
];

function Eyes({ x1, x2, y }) {
  return (
    <g>
      <circle cx={x1} cy={y} r="2.3" fill="#1e2430" />
      <circle cx={x2} cy={y} r="2.3" fill="#1e2430" />
      <circle cx={x1 + 0.8} cy={y - 0.8} r="0.8" fill="#fffaf3" />
      <circle cx={x2 + 0.8} cy={y - 0.8} r="0.8" fill="#fffaf3" />
    </g>
  );
}

function FaceArt({ id }) {
  if (id === "bramble") {
    return (
      <g>
        <path d="M17 28 24 11 31 27" fill="#c6532c" />
        <path d="M33 27 40 11 47 28" fill="#c6532c" />
        <path d="M20 25 25 15 29 25" fill="#f3c2a4" />
        <path d="M35 25 39 15 44 25" fill="#f3c2a4" />
        <ellipse cx="32" cy="44" rx="12" ry="10" fill="#f8e6d8" />
        <Eyes x1={25} x2={39} y={34} />
        <ellipse cx="32" cy="40" rx="2.1" ry="1.5" fill="#1e2430" />
        <circle cx="22" cy="40" r="2" fill="#ef8d78" opacity="0.85" />
        <circle cx="42" cy="40" r="2" fill="#ef8d78" opacity="0.85" />
        <path d="M28 46c2 2 6 2 8 0" fill="none" stroke="#1e2430" strokeWidth="1.5" strokeLinecap="round" />
      </g>
    );
  }
  if (id === "nib") {
    return (
      <g>
        <circle cx="16" cy="24" r="10" fill="#c9926a" />
        <circle cx="48" cy="24" r="10" fill="#c9926a" />
        <circle cx="16" cy="24" r="5.2" fill="#f4b7c4" />
        <circle cx="48" cy="24" r="5.2" fill="#f4b7c4" />
        <ellipse cx="32" cy="43" rx="13" ry="11" fill="#fff8ef" />
        <Eyes x1={26} x2={38} y={36} />
        <ellipse cx="32" cy="42" rx="2.5" ry="1.8" fill="#e07a8a" />
        <path d="M18 40h8M38 40h8M20 44h6M38 44h6" stroke="#6a5040" strokeWidth="1" strokeLinecap="round" />
      </g>
    );
  }
  if (id === "vesper") {
    return (
      <g>
        <path d="M18 22 24 10 29 22" fill="#7f93c4" />
        <path d="M35 22 40 10 46 22" fill="#7f93c4" />
        <circle cx="24" cy="32" r="9" fill="#f4efe3" />
        <circle cx="40" cy="32" r="9" fill="#f4efe3" />
        <circle cx="24" cy="33" r="4" fill="#1e2430" />
        <circle cx="40" cy="33" r="4" fill="#1e2430" />
        <circle cx="25.3" cy="31.6" r="1.2" fill="#fff" />
        <circle cx="41.3" cy="31.6" r="1.2" fill="#fff" />
        <path d="M32 37 28.5 43 35.5 43Z" fill="#e2a12b" />
      </g>
    );
  }
  if (id === "ploom") {
    return (
      <g>
        <ellipse cx="32" cy="44" rx="12" ry="9" fill="#f6e27a" />
        <ellipse cx="17" cy="40" rx="6" ry="4" fill="#1d6d68" />
        <Eyes x1={25} x2={37} y={30} />
        <path d="M29 35h8l-4 6z" fill="#e07a2f" />
        <path d="M26 47c2.2 2 7.8 2 10 0" fill="none" stroke="#1e2430" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    );
  }
  if (id === "kip") {
    return (
      <g>
        <path d="M22 22c-1-8 7-11 8-2" fill="none" stroke="#6b4516" strokeWidth="2.3" strokeLinecap="round" />
        <path d="M42 22c1-8-7-11-8-2" fill="none" stroke="#6b4516" strokeWidth="2.3" strokeLinecap="round" />
        <ellipse cx="15" cy="36" rx="6" ry="8" fill="#c9842a" />
        <ellipse cx="49" cy="36" rx="6" ry="8" fill="#c9842a" />
        <ellipse cx="32" cy="45" rx="11" ry="8" fill="#fff1cf" />
        <Eyes x1={26} x2={38} y={34} />
        <ellipse cx="32" cy="40" rx="2.3" ry="1.6" fill="#a86432" />
        <path d="M27 46c2 2 8 2 10 0" fill="none" stroke="#1e2430" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    );
  }
  return (
    <g>
      <ellipse cx="32" cy="44" rx="14" ry="10" fill="#e5f6c8" />
      <circle cx="22" cy="26" r="9" fill="#f4ffe8" />
      <circle cx="42" cy="26" r="9" fill="#f4ffe8" />
      <circle cx="22" cy="27" r="4" fill="#1e2430" />
      <circle cx="42" cy="27" r="4" fill="#1e2430" />
      <circle cx="23.4" cy="25.6" r="1.3" fill="#fff" />
      <circle cx="43.4" cy="25.6" r="1.3" fill="#fff" />
      <path d="M24 45c2.6 4 13.4 4 16 0" fill="none" stroke="#1e2430" strokeWidth="1.6" strokeLinecap="round" />
    </g>
  );
}

export function KinFace({ id, decorative = false }) {
  const kin = KIN.find((item) => item.id === id) || KIN[0];
  return (
    <svg
      className="kin-svg"
      viewBox="0 0 64 64"
      role={decorative ? "presentation" : "img"}
      aria-label={decorative ? undefined : kin.name}
      aria-hidden={decorative ? true : undefined}
    >
      <circle cx="32" cy="32" r="32" fill={kin.color} />
      <FaceArt id={kin.id} />
    </svg>
  );
}

export function kinById(id) {
  return KIN.find((item) => item.id === id) || null;
}
