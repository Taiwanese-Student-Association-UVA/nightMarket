import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse";
import BackButton from "../BackButton";

interface StandInfo {
  number: number;
  name: string;
}

// CSV URLs for different times
const VENDORS_CSV_BEFORE_8PM =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRWtg5juZf3raTsoj6c-MeMNSluH1c4aXcxkQl4cQuqR4ByJh78PT4TyKiKXeICy9cDi7u6H_zXMiHG/pub?gid=419450507&single=true&output=csv";
const VENDORS_CSV_AFTER_8PM =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRWtg5juZf3raTsoj6c-MeMNSluH1c4aXcxkQl4cQuqR4ByJh78PT4TyKiKXeICy9cDi7u6H_zXMiHG/pub?gid=270934886&single=true&output=csv";

// Expected CSV columns: number, stall (or whatever your columns are named)
interface VendorRow {
  number: string; // or number if it's a number column
  name: string;
}

function useVendors(csvUrl: string) {
  const [vendors, setVendors] = useState<StandInfo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (result: Papa.ParseResult<VendorRow>) => {
        const mappedVendors = result.data
          .filter((row) => row.number && row.name)
          .map((row) => ({
            number: parseInt(row.number, 10),
            name: row.name,
          }));
        setVendors(mappedVendors);
        setLoading(false);
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        setLoading(false);
      },
    });
  }, [csvUrl]);

  return { vendors, loading };
}

// Helper function to determine which CSV to use based on current time
function getCurrentVendorsCsvUrl(): string {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const currentTimeInMinutes = hours * 60 + minutes;
  const eightPMInMinutes = 20 * 60; // 8:00 PM = 20:00

  return currentTimeInMinutes < eightPMInMinutes
    ? VENDORS_CSV_BEFORE_8PM
    : VENDORS_CSV_AFTER_8PM;
}

interface StandBox {
  n: number;
  x: number;
  y: number;
  rotate?: number; // rotation in degrees, around center of box
}

// BOX size is 18x18; rotate is applied around the box center
const STAND_BOXES: StandBox[] = [
  // Group 1–4: top-left, upright 2×2
  { n: 1, x: 58, y: 112 },
  { n: 2, x: 78, y: 112 },
  { n: 3, x: 58, y: 132 },
  { n: 4, x: 78, y: 132 },

  // Group 5–8: mid-left, upright 2×2
  { n: 5, x: 52, y: 162 },
  { n: 6, x: 72, y: 162 },
  { n: 7, x: 52, y: 182 },
  { n: 8, x: 72, y: 182 },

  // Group 9–12: lower-left, upright 2×2
  { n: 9, x: 72, y: 210 },
  { n: 10, x: 92, y: 210 },
  { n: 11, x: 72, y: 230 },
  { n: 12, x: 92, y: 230 },

  // Group 13–16: angled ~25°, outside boxes (13,15) on left, inside (14,16) on right
  // 13 top-left, 14 top-right (inside), 15 bottom-left, 16 bottom-right (inside)
  { n: 13, x: 100, y: 256, rotate: 25 },
  { n: 14, x: 118, y: 248, rotate: 25 },
  { n: 15, x: 106, y: 274, rotate: 25 },
  { n: 16, x: 124, y: 266, rotate: 25 },

  // Group 17–20: center-bottom, upright 2×2
  { n: 18, x: 152, y: 262 },
  { n: 20, x: 172, y: 262 },
  { n: 17, x: 152, y: 282 },
  { n: 19, x: 172, y: 282 },

  // Group 21–24: center-right-bottom, upright 2×2
  { n: 22, x: 208, y: 262 },
  { n: 24, x: 228, y: 262 },
  { n: 21, x: 208, y: 282 },
  { n: 23, x: 228, y: 282 },

  // Group 25–28: angled ~-25°, inside boxes (26,28) on left, outside (25,27) on right
  // 28 top-left (inside), 26 below it (inside), 27 top-right, 25 bottom-right
  { n: 28, x: 252, y: 248, rotate: -25 },
  { n: 26, x: 258, y: 266, rotate: -25 },
  { n: 27, x: 270, y: 256, rotate: -25 },
  { n: 25, x: 276, y: 274, rotate: -25 },

  // Group 29–32: right side, upright 2×2
  { n: 30, x: 282, y: 220 },
  { n: 32, x: 302, y: 220 },
  { n: 29, x: 282, y: 240 },
  { n: 31, x: 302, y: 240 },

  // Group 33–36: upper-right, upright 2×2
  { n: 36, x: 290, y: 158 },
  { n: 35, x: 310, y: 158 },
  { n: 34, x: 290, y: 178 },
  { n: 33, x: 310, y: 178 },

  // Group 37–40: top-right, upright 2×2
  { n: 40, x: 294, y: 100 },
  { n: 39, x: 314, y: 100 },
  { n: 38, x: 294, y: 120 },
  { n: 37, x: 314, y: 120 },
];

function VenueMap({
  vendors,
  onStandTap,
}: {
  vendors: StandInfo[];
  onStandTap: (n: number) => void;
}) {
  const [activeStand, setActiveStand] = useState<number | null>(null);
  const BOX = 18;

  const handleTap = (n: number) => {
    setActiveStand(n);
    onStandTap(n);
  };

  // Create a map for quick lookup
  const vendorMap = new Map(vendors.map((v) => [v.number, v.name]));

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
        <ellipse cx="200" cy="185" rx="190" ry="165" fill="#ffffff" />
        <ellipse cx="200" cy="175" rx="160" ry="140" fill="#ffea8f" />

        <text
          x="15"
          y="270"
          fontSize="8"
          fill="#192147"
          fontFamily="'DM Sans', sans-serif"
          transform="rotate(50 52 290)"
        >
          seating / stairs
        </text>
        <text
          x="300"
          y="287"
          fontSize="8"
          fill="#192147"
          fontFamily="'DM Sans', sans-serif"
          transform="rotate(-50 318 268)"
        >
          seating / stairs
        </text>

        <rect x="58" y="18" width="284" height="58" rx="4" fill="#ffffff" />
        <text
          x="200"
          y="52"
          textAnchor="middle"
          fontSize="12"
          fontWeight="700"
          fill="#192147"
          fontFamily="'Playfair Display', serif"
        >
          Stage
        </text>

        <text
          x="200"
          y="150"
          textAnchor="middle"
          fontSize="9"
          fill="#151536"
          fontFamily="'DM Sans', sans-serif"
          fontStyle="italic"
        >
          Performance Seating Area
        </text>

        <rect x="173" y="319" width="52" height="16" rx="7" fill="#ffe385a9" />
        <text
          x="199"
          y="330"
          textAnchor="middle"
          fontSize="9"
          fontWeight="600"
          fill="#151536"
          fontFamily="'DM Sans', sans-serif"
        >
          Check-in!
        </text>

        <polygon
          points="200,270 203,282 210,285 203,288 200,300 197,288 190,285 197,282"
          fill="#2a2018"
        />

        {STAND_BOXES.map(({ n, x, y, rotate }) => {
          const isActive = activeStand === n;
          const hasVendor = vendorMap.has(n);
          const cx = x + BOX / 2;
          const cy = y + BOX / 2;
          const transform = rotate
            ? `rotate(${rotate} ${cx} ${cy})`
            : undefined;

          return (
            <g
              key={n}
              onClick={() => handleTap(n)}
              transform={transform}
              style={{ cursor: hasVendor ? "pointer" : "default" }}
            >
              <rect
                x={x}
                y={y}
                width={BOX}
                height={BOX}
                rx="3"
                fill={isActive ? "#ffd857" : hasVendor ? "#ffffff" : "#ffe9d2"}
                strokeWidth={isActive ? 1.5 : 1}
                opacity={hasVendor ? 1 : 0.6}
              />
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fontSize="7"
                fontWeight={isActive ? "700" : "500"}
                fill={isActive ? "#151536" : hasVendor ? "#4a3a2a" : "#9a9692"}
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

function StandTooltip({
  standNumber,
  stallName,
  onNavigate,
  onDismiss,
}: {
  standNumber: number;
  stallName: string;
  onNavigate: () => void;
  onDismiss: () => void;
}) {
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
          background: "#b3942e",
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
            color: "#c8c0a8",
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
          {stallName}
        </p>
      </div>
      <button
        onClick={onNavigate}
        style={{
          background: "#f0e1a2",
          border: "none",
          borderRadius: 10,
          color: "#523e1a",
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

export default function Info() {
  const navigate = useNavigate();
  const [tappedStand, setTappedStand] = useState<number | null>(null);
  const [csvUrl, setCsvUrl] = useState(getCurrentVendorsCsvUrl());
  const { vendors, loading } = useVendors(csvUrl);

  // Check for time changes and update CSV if needed
  useEffect(() => {
    const checkTimeAndUpdate = () => {
      const newCsvUrl = getCurrentVendorsCsvUrl();
      if (newCsvUrl !== csvUrl) {
        setCsvUrl(newCsvUrl);
      }
    };

    // Check every minute if we've crossed 8 PM
    const interval = setInterval(checkTimeAndUpdate, 60000);

    return () => clearInterval(interval);
  }, [csvUrl]);

  // Create a map for quick lookup
  const vendorMap = new Map(vendors.map((v) => [v.number, v.name]));

  const handleNavigate = () => {
    if (tappedStand === null) return;
    const stallName = vendorMap.get(tappedStand);
    if (stallName) {
      navigate(`/vendors?stall=${encodeURIComponent(stallName)}`);
    }
  };

  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          minHeight: "100dvh",
          background: "#f3d75b63",
          maxWidth: 480,
          margin: "auto auto",
        }}
      >
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
            NightMarket Map
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 13,
              color: "#61608a",
              margin: "0 auto",
              textAlign: "left",
            }}
          >
            Tap a stand number to find out who's there!
          </p>
        </div>

        <div
          style={{
            padding: "16px 16px 80px",
            display: "flex",
            flexDirection: "column",
            margin: "0 auto",
          }}
        >
          {loading ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "#60668a",
                  fontSize: 14,
                }}
              >
                Loading map information...
              </p>
            </div>
          ) : (
            <>
              <VenueMap
                vendors={vendors}
                onStandTap={(n) => setTappedStand(n)}
              />

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
                  {STAND_BOXES.map(({ n }) => {
                    const stallName = vendorMap.get(n);
                    if (!stallName) return null;

                    return (
                      <div
                        key={n}
                        onClick={() => setTappedStand(n)}
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
                            background:
                              tappedStand === n ? "#e9d24f" : "#f3ecc4",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            fontFamily: "'DM Sans', sans-serif",
                            fontSize: 10,
                            fontWeight: 700,
                            color: tappedStand === n ? "#ffffff" : "#3a3d5a",
                            flexShrink: 0,
                            transition: "background 0.15s",
                          }}
                        >
                          {n}
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
                          {stallName}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </>
          )}

          {tappedStand !== null && vendorMap.has(tappedStand) && (
            <StandTooltip
              standNumber={tappedStand}
              stallName={vendorMap.get(tappedStand)!}
              onNavigate={handleNavigate}
              onDismiss={() => setTappedStand(null)}
            />
          )}
        </div>
      </div>
    </>
  );
}
