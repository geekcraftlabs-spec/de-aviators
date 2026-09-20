// Raw SVG string. Same geometry as components/Logo.tsx.
// If you tweak one, tweak the other — or generate Logo.tsx from this later.
const RAW = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 140" fill="none">
  <path d="M19.26 88.47 A54 54 0 1 1 88.47 120.74" stroke="#fff" stroke-width="6" stroke-linecap="round"/>
  <path d="M77.19 124.84 L90.52 126.38 L86.42 115.10 Z" fill="#fff"/>
  <path d="M42 62 L70 36 L98 62" stroke="#fff" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
  <rect x="48" y="62" width="44" height="44" stroke="#fff" stroke-width="6" stroke-linejoin="round"/>
  <rect x="63" y="92" width="14" height="14" fill="#fff"/>
  <line x1="172" y1="22" x2="172" y2="118" stroke="#fff" stroke-width="2.5" stroke-linecap="round"/>
  <g fill="#fff" font-family="Inter Tight, Inter, sans-serif" font-weight="800" letter-spacing="0.5">
    <text x="196" y="32"  font-size="27">DE AVIATORS</text>
    <text x="196" y="57"  font-size="27">RENOVATIONS</text>
    <text x="196" y="82"  font-size="27">AND</text>
    <text x="196" y="107" font-size="27">CONSTRUCTION</text>
  </g>
  <text x="196" y="130" fill="#fff" font-size="21" font-weight="600" letter-spacing="1.5"
        font-family="Inter Tight, Inter, sans-serif">(PTY) LTD</text>
</svg>`;

export const logoSvgRaw = RAW;
export const logoSvgDataUri =
  `data:image/svg+xml;base64,${Buffer.from(RAW).toString("base64")}`;