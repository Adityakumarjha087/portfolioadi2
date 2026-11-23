const W = 480;
const H = 300;

// Columns of nodes joined by flowing edges, drawn from project.diagram.
function Diagram({ columns }) {
  const nodeW = Math.min(112, (W - 40) / columns.length - 18);
  const nodeH = 36;
  const colX = (c) => ((c + 0.5) * W) / columns.length;
  const rowY = (c, r) => H / 2 + (r - (columns[c].length - 1) / 2) * 68;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {columns.slice(0, -1).flatMap((col, c) =>
        col.flatMap((_, r) =>
          columns[c + 1].map((__, r2) => {
            const x1 = colX(c) + nodeW / 2;
            const x2 = colX(c + 1) - nodeW / 2;
            const y1 = rowY(c, r);
            const y2 = rowY(c + 1, r2);
            const mid = (x1 + x2) / 2;
            return (
              <path
                key={`${c}-${r}-${r2}`}
                className="flow"
                d={`M${x1} ${y1} C${mid} ${y1} ${mid} ${y2} ${x2} ${y2}`}
                fill="none"
                stroke="#a1a1aa"
                strokeWidth="1.5"
              />
            );
          })
        )
      )}
      {columns.flatMap((col, c) =>
        col.map((label, r) => (
          <g key={`${c}-${label}`} transform={`translate(${colX(c)} ${rowY(c, r)})`}>
            <rect x={-nodeW / 2} y={-nodeH / 2} width={nodeW} height={nodeH} rx="10" fill="#0a0a0a" stroke="#52525b" />
            <text textAnchor="middle" dominantBaseline="central" fill="#f4f4f5" fontSize="13" fontFamily="Outfit, sans-serif">
              {label}
            </text>
          </g>
        ))
      )}
    </svg>
  );
}

export default function ProjectCover({ project, eager = false }) {
  if (project.image) {
    return (
      <img
        src={project.image}
        alt={`Screenshot of ${project.title}`}
        width="1280"
        height="800"
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="cover-img w-full h-full object-cover object-top"
      />
    );
  }
  return (
    <div className="grid-bg w-full h-full flex items-center justify-center bg-black">
      {project.diagram ? (
        <Diagram columns={project.diagram} />
      ) : (
        <span
          aria-hidden="true"
          className="font-display font-bold text-8xl text-zinc-800 group-hover:text-white transition-colors duration-500"
        >
          {project.glyph}
        </span>
      )}
    </div>
  );
}
