export function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 140 140"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <path
        d="M19.26 88.47 A54 54 0 1 1 88.47 120.74"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
      />
      <path
        d="M77.19 124.84 L90.52 126.38 L86.42 115.10 Z"
        fill="currentColor"
      />
      <path
        d="M42 62 L70 36 L98 62"
        stroke="currentColor"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x={48}
        y={62}
        width={44}
        height={44}
        stroke="currentColor"
        strokeWidth={6}
        strokeLinejoin="round"
      />
      <rect x={63} y={92} width={14} height={14} fill="currentColor" />
    </svg>
  );
}

export function Logo({
  className,
  variant = "horizontal",
}: {
  className?: string;
  variant?: "horizontal" | "mark";
}) {
  if (variant === "mark") return <LogoMark className={className} />;

  return (
    <svg
      viewBox="0 0 480 140"
      fill="none"
      className={className}
      role="img"
      aria-label="De Aviators Renovations and Construction (PTY) LTD"
    >
      {/* ---- House mark, drawn inline in THIS coordinate system ---- */}
      {/* Shifted 0,0 — its natural centre is ~(70,70) inside a 140×140 box */}
      <g>
        {/* Clockwise 270° arc */}
        <path
          d="M19.26 88.47 A54 54 0 1 1 88.47 120.74"
          stroke="currentColor"
          strokeWidth={6}
          strokeLinecap="round"
        />
        <path
          d="M77.19 124.84 L90.52 126.38 L86.42 115.10 Z"
          fill="currentColor"
        />
        <path
          d="M42 62 L70 36 L98 62"
          stroke="currentColor"
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <rect
          x={48}
          y={62}
          width={44}
          height={44}
          stroke="currentColor"
          strokeWidth={6}
          strokeLinejoin="round"
        />
        <rect x={63} y={92} width={14} height={14} fill="currentColor" />
      </g>

      {/* ---- Vertical rule ---- */}
      <line
        x1={172}
        y1={22}
        x2={172}
        y2={118}
        stroke="currentColor"
        strokeWidth={2.5}
        strokeLinecap="round"
      />

      {/* ---- Wordmark ---- */}
      <g
        fill="currentColor"
        fontFamily="Inter Tight, Inter, sans-serif"
        fontWeight={800}
        letterSpacing="0.5"
      >
        <text x={196} y={32} fontSize={27}>DE AVIATORS</text>
        <text x={196} y={57} fontSize={27}>RENOVATIONS</text>
        <text x={196} y={82} fontSize={27}>AND</text>
        <text x={196} y={107} fontSize={27}>CONSTRUCTION</text>
      </g>
      <text
        x={196}
        y={130}
        fill="currentColor"
        fontSize={21}
        fontWeight={600}
        letterSpacing="1.5"
        fontFamily="Inter Tight, Inter, sans-serif"
      >
        (PTY) LTD
      </text>
    </svg>
  );
}