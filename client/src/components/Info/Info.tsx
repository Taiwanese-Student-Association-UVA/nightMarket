import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import BackButton from "../BackButton";

// ─── types ────────────────────────────────────────────────────────────────────

interface ScheduleRow {
  time: string;
  event: string;
  description: string;
}

interface StandInfo {
  number: number;
  stall: string; // matches "stall" column in vendors sheet
}

// ─── constants ────────────────────────────────────────────────────────────────

// Replace with your actual published CSV URL for the schedule sheet
const SCHEDULE_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRWtg5juZf3raTsoj6c-MeMNSluH1c4aXcxkQl4cQuqR4ByJh78PT4TyKiKXeICy9cDi7u6H_zXMiHG/pub?gid=476880880&single=true&output=csv";

// Map each stand number to its stall name (must match the "stall" column in your vendors sheet exactly)
const STAND_MAP: StandInfo[] = [
  { number: 1, stall: "Stall Name 1" },
  { number: 2, stall: "Stall Name 2" },
  { number: 3, stall: "Stall Name 3" },
  { number: 4, stall: "Stall Name 4" },
  { number: 5, stall: "Stall Name 5" },
  { number: 6, stall: "Stall Name 6" },
  { number: 7, stall: "Stall Name 7" },
  { number: 8, stall: "Stall Name 8" },
  { number: 9, stall: "Stall Name 9" },
  { number: 10, stall: "Stall Name 10" },
  { number: 11, stall: "Stall Name 11" },
  { number: 12, stall: "Stall Name 12" },
  { number: 13, stall: "Stall Name 13" },
  { number: 14, stall: "Stall Name 14" },
  { number: 15, stall: "Stall Name 15" },
  { number: 16, stall: "Stall Name 16" },
  { number: 17, stall: "Stall Name 17" },
  { number: 18, stall: "Stall Name 18" },
  { number: 19, stall: "Stall Name 19" },
  { number: 20, stall: "Stall Name 20" },
  { number: 21, stall: "Stall Name 21" },
  { number: 22, stall: "Stall Name 22" },
  { number: 23, stall: "Stall Name 23" },
  { number: 24, stall: "Stall Name 24" },
  { number: 25, stall: "Stall Name 25" },
  { number: 26, stall: "Stall Name 26" },
  { number: 27, stall: "Stall Name 27" },
  { number: 28, stall: "Stall Name 28" },
  { number: 29, stall: "Stall Name 29" },
  { number: 30, stall: "Stall Name 30" },
  { number: 31, stall: "Stall Name 31" },
  { number: 32, stall: "Stall Name 32" },
  { number: 33, stall: "Stall Name 33" },
  { number: 34, stall: "Stall Name 34" },
  { number: 35, stall: "Stall Name 35" },
  { number: 36, stall: "Stall Name 36" },
  { number: 37, stall: "Stall Name 37" },
  { number: 38, stall: "Stall Name 38" },
  { number: 39, stall: "Stall Name 39" },
  { number: 40, stall: "Stall Name 40" },
];

// ─── hooks ────────────────────────────────────────────────────────────────────

function useSchedule(csvUrl: string) {
  const [rows, setRows] = useState<ScheduleRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (result: Papa.ParseResult<ScheduleRow>) => {
        setRows(result.data.filter((r) => r.time || r.event));
        setLoading(false);
      },
    });
  }, [csvUrl]);

  return { rows, loading };
}

// ─── schedule tab ─────────────────────────────────────────────────────────────

function ScheduleCard({ row, index }: { row: ScheduleRow; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => row.description && setExpanded((e) => !e)}
      style={{
        background: "#fffaf8",
        borderRadius: 14,
        padding: "14px 16px",
        marginBottom: 10,
        boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
        cursor: row.description ? "pointer" : "default",
        borderLeft: `4px solid ${index % 3 === 0 ? "#c8a882" : index % 3 === 1 ? "#a8b87a" : "#c9848a"}`,
        transition: "box-shadow 0.15s",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 12,
              fontWeight: 600,
              color: "#63608a",
              margin: "0 0 3px",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
            }}
          >
            {row.time}
          </p>
          <p
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 17,
              fontWeight: 700,
              color: "#1c182a",
              margin: 0,
              lineHeight: 1.3,
            }}
          >
            {row.event}
          </p>
        </div>
        {row.description && (
          <span
            style={{
              fontSize: 18,
              color: "#8298c8",
              transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
              flexShrink: 0,
              marginTop: 2,
            }}
          >
            ↓
          </span>
        )}
      </div>

      {expanded && row.description && (
        <p
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            color: "#39416e",
            margin: "10px 0 0",
            lineHeight: 1.6,
            borderTop: "1px solid #dce3ed",
            paddingTop: 10,
          }}
        >
          {row.description}
        </p>
      )}
    </div>
  );
}

function ScheduleTab() {
  const { rows, loading } = useSchedule(SCHEDULE_CSV_URL);

  return (
    <div style={{ padding: "20px 16px" }}>
      {loading ? (
        <p
          style={{
            textAlign: "center",
            color: "#60668a",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
          }}
        >
          Loading schedule…
        </p>
      ) : rows.length === 0 ? (
        <p
          style={{
            textAlign: "center",
            color: "#60638a",
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
          }}
        >
          Schedule coming soon!
        </p>
      ) : (
        rows.map((row, i) => <ScheduleCard key={i} row={row} index={i} />)
      )}
    </div>
  );
}

// ─── venue map ────────────────────────────────────────────────────────────────

// Stand group positions: each group is a 2×2 or 2×1 cluster of numbered boxes
// Coordinates are in SVG viewBox units (0 0 400 380)
// Each stand box is 18×18, with 2px gap inside a group

interface StandBox {
  n: number; // stand number
  x: number; // top-left x
  y: number; // top-left y
}

const STAND_BOXES: StandBox[] = [
  // Group top-left (1–4)
  { n: 1, x: 62, y: 118 },
  { n: 2, x: 82, y: 118 },
  { n: 3, x: 62, y: 138 },
  { n: 4, x: 82, y: 138 },
  // Group mid-left (5–8)
  { n: 5, x: 62, y: 168 },
  { n: 6, x: 82, y: 168 },
  { n: 7, x: 62, y: 188 },
  { n: 8, x: 82, y: 188 },
  // Group center-left-upper (9–12)
  { n: 9, x: 88, y: 208 },
  { n: 10, x: 108, y: 208 },
  { n: 11, x: 88, y: 228 },
  { n: 12, x: 108, y: 228 },
  // Group center-left-lower (13–16)
  { n: 13, x: 102, y: 252 },
  { n: 14, x: 122, y: 252 },
  { n: 15, x: 102, y: 272 },
  { n: 16, x: 122, y: 272 },
  // Group center (17–20)
  { n: 17, x: 148, y: 268 },
  { n: 18, x: 168, y: 268 },
  { n: 19, x: 148, y: 288 },
  { n: 20, x: 168, y: 288 },
  // Group center-right (21–24)
  { n: 21, x: 210, y: 272 },
  { n: 22, x: 230, y: 272 },
  { n: 23, x: 210, y: 292 },
  { n: 24, x: 230, y: 292 },
  // Group right-lower (25–28)
  { n: 25, x: 252, y: 258 },
  { n: 26, x: 272, y: 258 },
  { n: 27, x: 252, y: 278 },
  { n: 28, x: 272, y: 278 },
  // Group right-mid (29–32)
  { n: 29, x: 268, y: 228 },
  { n: 30, x: 288, y: 228 },
  { n: 31, x: 268, y: 248 },
  { n: 32, x: 288, y: 248 },
  // Group right-upper (33–36)
  { n: 33, x: 278, y: 188 },
  { n: 34, x: 298, y: 188 },
  { n: 35, x: 278, y: 168 },
  { n: 36, x: 298, y: 168 },
  // Group top-right (37–40)
  { n: 37, x: 288, y: 128 },
  { n: 38, x: 308, y: 128 },
  { n: 39, x: 288, y: 108 },
  { n: 40, x: 308, y: 108 },
];

function VenueMap({ onStandTap }: { onStandTap: (n: number) => void }) {
  const [activeStand, setActiveStand] = useState<number | null>(null);

  const handleTap = (n: number) => {
    setActiveStand(n);
    onStandTap(n);
  };

  const BOX = 18;

  return (
    <div style={{ width: "100%", overflowX: "auto", padding: "12px 0" }}>
      <svg
        viewBox="0 0 400 340"
        style={{
          width: "100%",
          maxWidth: 480,
          display: "block",
          margin: "0 auto",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* ── venue outline: amphitheatre arc ── */}
        {/* Outer grassy area */}
        <ellipse cx="200" cy="185" rx="190" ry="165" fill="#eef3d8" />
        {/* Inner paved area */}
        <ellipse cx="200" cy="175" rx="160" ry="140" fill="#f7f3ed" />

        {/* sidewalk path label bottom */}
        <text
          x="200"
          y="326"
          textAnchor="middle"
          fontSize="7"
          fill="#a09080"
          fontFamily="'DM Sans', sans-serif"
        >
          sidewalk / path
        </text>
        {/* sidewalk left */}
        <text
          x="22"
          y="200"
          textAnchor="middle"
          fontSize="7"
          fill="#a09080"
          fontFamily="'DM Sans', sans-serif"
          transform="rotate(-90 22 200)"
        >
          sidewalk / path
        </text>
        {/* sidewalk right */}
        <text
          x="378"
          y="200"
          textAnchor="middle"
          fontSize="7"
          fill="#a09080"
          fontFamily="'DM Sans', sans-serif"
          transform="rotate(90 378 200)"
        >
          sidewalk / path
        </text>

        {/* seating/stairs arcs labels */}
        <text
          x="52"
          y="290"
          fontSize="7"
          fill="#a09080"
          fontFamily="'DM Sans', sans-serif"
          transform="rotate(-35 52 290)"
        >
          seating / stairs
        </text>
        <text
          x="318"
          y="268"
          fontSize="7"
          fill="#a09080"
          fontFamily="'DM Sans', sans-serif"
          transform="rotate(35 318 268)"
        >
          seating / stairs
        </text>

        {/* ── stage ── */}
        <rect
          x="58"
          y="18"
          width="284"
          height="58"
          rx="4"
          fill="#d8d0c4"
          stroke="#b8a898"
          strokeWidth="1.5"
        />
        <text
          x="200"
          y="52"
          textAnchor="middle"
          fontSize="11"
          fontWeight="700"
          fill="#5a4a3a"
          fontFamily="'Playfair Display', serif"
        >
          Stage
        </text>
        {/* steps */}
        <rect x="108" y="74" width="16" height="6" rx="1" fill="#c8bfb2" />
        <rect x="276" y="74" width="16" height="6" rx="1" fill="#c8bfb2" />
        <text
          x="116"
          y="85"
          textAnchor="middle"
          fontSize="5.5"
          fill="#9a8a7a"
          fontFamily="'DM Sans', sans-serif"
        >
          steps
        </text>
        <text
          x="284"
          y="85"
          textAnchor="middle"
          fontSize="5.5"
          fill="#9a8a7a"
          fontFamily="'DM Sans', sans-serif"
        >
          steps
        </text>

        {/* ── prime seating area label ── */}
        <text
          x="200"
          y="150"
          textAnchor="middle"
          fontSize="9"
          fill="#b8a898"
          fontFamily="'DM Sans', sans-serif"
          fontStyle="italic"
        >
          prime seating area
        </text>

        {/* ── grass area ── */}
        <ellipse
          cx="200"
          cy="300"
          rx="32"
          ry="10"
          fill="#b8d4a0"
          opacity="0.7"
        />
        <text
          x="200"
          y="303"
          textAnchor="middle"
          fontSize="7"
          fill="#6a8a5a"
          fontFamily="'DM Sans', sans-serif"
          fontStyle="italic"
        >
          grass area
        </text>

        {/* ── check-in ── */}
        <rect
          x="162"
          y="318"
          width="48"
          height="14"
          rx="7"
          fill="#d0dafd"
          stroke="#787ae8"
          strokeWidth="1"
        />
        <text
          x="186"
          y="328"
          textAnchor="middle"
          fontSize="7.5"
          fontWeight="600"
          fill="#32308a"
          fontFamily="'DM Sans', sans-serif"
        >
          Check-in!
        </text>
        {/* line arrows */}
        <text
          x="130"
          y="328"
          textAnchor="middle"
          fontSize="6.5"
          fill="#61608a"
          fontFamily="'DM Sans', sans-serif"
        >
          ← Line 2
        </text>
        <text
          x="248"
          y="328"
          textAnchor="middle"
          fontSize="6.5"
          fill="#61608a"
          fontFamily="'DM Sans', sans-serif"
        >
          Line 1 →
        </text>

        {/* ── stand boxes ── */}
        {STAND_BOXES.map(({ n, x, y }) => {
          const isActive = activeStand === n;
          return (
            <g
              key={n}
              onClick={() => handleTap(n)}
              style={{ cursor: "pointer" }}
            >
              <rect
                x={x}
                y={y}
                width={BOX}
                height={BOX}
                rx="3"
                fill={isActive ? "#c8a882" : "#fffaf8"}
                stroke={isActive ? "#8a6040" : "#b8a898"}
                strokeWidth={isActive ? 1.5 : 1}
              />
              <text
                x={x + BOX / 2}
                y={y + BOX / 2 + 4}
                textAnchor="middle"
                fontSize="7"
                fontWeight={isActive ? "700" : "500"}
                fill={isActive ? "#fff" : "#4a3a2a"}
                fontFamily="'DM Sans', sans-serif"
                style={{ pointerEvents: "none", userSelect: "none" }}
              >
                {n}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── stand tooltip ────────────────────────────────────────────────────────────

function StandTooltip({
  standNumber,
  onNavigate,
  onDismiss,
}: {
  standNumber: number;
  onNavigate: () => void;
  onDismiss: () => void;
}) {
  const info = STAND_MAP.find((s) => s.number === standNumber);

  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 200,
        background: "#181a2a",
        color: "#f8f9ff",
        borderRadius: 16,
        padding: "14px 18px",
        width: "calc(100% - 40px)",
        maxWidth: 440,
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: "#8382c8",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 700,
          fontSize: 15,
          color: "#fff",
        }}
      >
        {standNumber}
      </div>
      <div style={{ flex: 1 }}>
        <p
          style={{
            margin: 0,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 13,
            color: "#a8abc8",
          }}
        >
          Stand {standNumber}
        </p>
        <p
          style={{
            margin: "2px 0 0",
            fontFamily: "'Playfair Display', serif",
            fontSize: 15,
            fontWeight: 700,
          }}
        >
          {info?.stall ?? "Unassigned"}
        </p>
      </div>
      <button
        onClick={onNavigate}
        style={{
          background: "#8289c8",
          border: "none",
          borderRadius: 10,
          color: "#fff",
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 12,
          fontWeight: 600,
          padding: "8px 12px",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        View →
      </button>
      <button
        onClick={onDismiss}
        style={{
          background: "transparent",
          border: "none",
          color: "#60648a",
          fontSize: 18,
          cursor: "pointer",
          padding: "4px",
          flexShrink: 0,
          lineHeight: 1,
        }}
      >
        ×
      </button>
    </div>
  );
}

// ─── map tab ──────────────────────────────────────────────────────────────────

function MapTab() {
  const navigate = useNavigate();
  const [tappedStand, setTappedStand] = useState<number | null>(null);

  const handleNavigate = () => {
    if (tappedStand === null) return;
    const info = STAND_MAP.find((s) => s.number === tappedStand);
    if (info) {
      // Navigate to vendors page with the stall name as a query param
      navigate(`/vendors?stall=${encodeURIComponent(info.stall)}`);
    }
  };

  return (
    <div style={{ padding: "16px 16px 80px" }}>
      <p
        style={{
          fontFamily: "'DM Sans', sans-serif",
          fontSize: 13,
          color: "#61608a",
          margin: "0 0 12px",
          textAlign: "center",
        }}
      >
        Tap a stand number to find out who's there
      </p>

      <VenueMap onStandTap={(n) => setTappedStand(n)} />

      {/* legend */}
      <div
        style={{
          marginTop: 16,
          background: "#f8f9ff",
          borderRadius: 14,
          padding: "14px 16px",
          boxShadow: "0 1px 8px rgba(0,0,0,0.07)",
        }}
      >
        <p
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 15,
            fontWeight: 700,
            color: "#19182a",
            margin: "0 0 10px",
          }}
        >
          Stand Legend
        </p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "6px 12px",
          }}
        >
          {STAND_MAP.map(({ number, stall }) => (
            <div
              key={number}
              onClick={() => setTappedStand(number)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                cursor: "pointer",
              }}
            >
              <span
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: 6,
                  background: tappedStand === number ? "#8289c8" : "#ede5dc",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 10,
                  fontWeight: 700,
                  color: tappedStand === number ? "#ffffff" : "#3a3d5a",
                  flexShrink: 0,
                  transition: "background 0.15s",
                }}
              >
                {number}
              </span>
              <span
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 12,
                  color: "#2a2c4a",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {stall}
              </span>
            </div>
          ))}
        </div>
      </div>

      {tappedStand !== null && (
        <StandTooltip
          standNumber={tappedStand}
          onNavigate={handleNavigate}
          onDismiss={() => setTappedStand(null)}
        />
      )}
    </div>
  );
}

// ─── main page ────────────────────────────────────────────────────────────────

type Tab = "schedule" | "map";

export default function EventInfo() {
  const [tab, setTab] = useState<Tab>("schedule");

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          minHeight: "100dvh",
          background: "#e7eaf5",
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        {/* header */}
        <div style={{ padding: "16px 20px 0" }}>
          <BackButton />
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 34,
              fontWeight: 900,
              color: "#1a182a",
              margin: "10px 0 16px",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Event Info
          </h1>
        </div>

        {/* tabs */}
        <div
          style={{
            display: "flex",
            margin: "0 16px 4px",
            background: "#dcdced",
            borderRadius: 14,
            padding: 4,
            gap: 4,
          }}
        >
          {(["schedule", "map"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                flex: 1,
                padding: "10px 0",
                border: "none",
                borderRadius: 10,
                background: tab === t ? "#18182a" : "transparent",
                color: tab === t ? "#f8f9ff" : "#61608a",
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                fontWeight: 600,
                cursor: "pointer",
                transition: "background 0.18s, color 0.18s",
                textTransform: "capitalize",
              }}
            >
              {t === "schedule" ? "Schedule" : "Map"}
            </button>
          ))}
        </div>

        {/* content */}
        {tab === "schedule" ? <ScheduleTab /> : <MapTab />}
      </div>
    </>
  );
}
