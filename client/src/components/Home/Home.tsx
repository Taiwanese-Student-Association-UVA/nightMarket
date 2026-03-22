import { useNavigate } from "react-router-dom";

// types
type Point = [number, number];

type PanelDef = {
  // [x, y] points for panels
  points: Point[];
  label: string;
  fill?: string;
  onClick?: () => void;
  /** Where to center the label — auto-computed from centroid if omitted */
  labelPos?: Point;
  fontSize?: number;
  fontWeight?: string;
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Compute the visual centroid of a polygon */
function centroid(pts: Point[]): Point {
  const x = pts.reduce((s, p) => s + p[0], 0) / pts.length;
  const y = pts.reduce((s, p) => s + p[1], 0) / pts.length;
  return [x, y];
}

/** Convert [[x,y], ...] to SVG polygon points string */
function toPointsStr(pts: Point[]) {
  return pts.map(([x, y]) => `${x},${y}`).join(" ");
}

// ─── Single Panel ─────────────────────────────────────────────────────────────

function ComicPanel({
  points,
  label,
  fill = "#FFE9E9",
  onClick,
  labelPos,
  fontSize = 10,
  fontWeight = "normal",
}: PanelDef) {
  const [lx, ly] = labelPos ?? centroid(points);

  return (
    <g onClick={onClick} style={{ cursor: onClick ? "pointer" : "default" }}>
      <polygon
        points={toPointsStr(points)}
        fill={fill}
        stroke="black"
        strokeWidth="1"
      />
      <text
        x={lx}
        y={ly}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={fontSize}
        fontWeight={fontWeight}
        pointerEvents="none"
      >
        {label}
      </text>
    </g>
  );
}

// ─── Home Page ────────────────────────────────────────────────────────────────

type Props = {
  openLogin: () => void;
};

export default function Home({ openLogin }: Props) {
  const navigate = useNavigate();

  /**
   * Define every panel here — just points + label + handler.
   * Paste coordinates from Figma / Inkscape, or eyeball them.
   * No SVG path syntax needed.
   */
  const panels: PanelDef[] = [
    {
      label: "TSA WEBSITE",
      points: [
        [17, 183],
        [372, 183],
        [372, 233],
        [17, 233],
      ],
      onClick: () => (window.location.href = "https://tsaatuva.org"),
    },
    {
      label: "DIRECTIONS",
      points: [
        [184, 130],
        [80, 130],
        [90, 173],
        [162.5, 173],
      ],
      onClick: () =>
        (window.location.href = "https://maps.app.goo.gl/ZwNFrEBbVZn1Pw1u8"),
    },
    {
      label: "SPONSORS",
      points: [
        [208, 82],
        [130, 82],
        [150, 120],
        [187, 120],
      ],
    },
    {
      label: "VENDORS",
      points: [
        [120, 82],
        [70, 82],
        [78, 120],
        [140, 120],
      ],
    },
    {
      label: "SCHEDULE",
      points: [
        [60, 82],
        [17, 82],
        [17, 173],
        [80, 173],
      ],
      onClick: () => navigate("/schedule"),
    },
    {
      label: "MAP",
      points: [
        [240, 18],
        [160, 18],
        [155, 72],
        [212, 72],
      ],
      onClick: () => navigate("/map"),
    },
    {
      label: "MENU",
      points: [
        [150, 18],
        [80, 18],
        [105, 72],
        [145, 72],
      ],
      onClick: () => navigate("/menu"),
    },
    {
      label: "NIGHT MARKET",
      points: [
        [372, 18],
        [250, 18],
        [172.5, 173],
        [372, 173],
      ],
      fontSize: 16,
      fontWeight: "bold",
    },
    {
      label: "LOGIN",
      points: [
        [85, 50],
        [17, 50],
        [17, 72],
        [95, 72],
      ],
      onClick: openLogin,
    },
    {
      label: "REGISTER",
      points: [
        [70, 18],
        [17, 18],
        [17, 40],
        [80, 40],
      ],
      onClick: openLogin,
    },
  ];

  return (
    <div style={{ width: "100vw", background: "white" }}>
      <svg
        viewBox="0 0 389 1187"
        style={{ width: "100vw", height: "auto", display: "block" }}
      >
        <rect width="389" height="1187" fill="white" />

        {panels.map((panel) => (
          <ComicPanel key={panel.label} {...panel} />
        ))}
      </svg>
    </div>
  );
}
