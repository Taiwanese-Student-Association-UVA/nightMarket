import { useState, useEffect } from "react";
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
  { n: 1, x: 70, y: 100 },
  { n: 2, x: 90, y: 100 },
  { n: 3, x: 70, y: 120 },
  { n: 4, x: 90, y: 120 },

  // Group 5–8: mid-left, upright 2×2
  { n: 5, x: 75, y: 145 },
  { n: 6, x: 95, y: 145 },
  { n: 7, x: 75, y: 165 },
  { n: 8, x: 95, y: 165 },

  // Group 9–12: lower-left, upright 2×2
  { n: 9, x: 80, y: 190 },
  { n: 10, x: 100, y: 190 },
  { n: 11, x: 80, y: 210 },
  { n: 12, x: 100, y: 210 },

  // Group 13–16: angled ~25°, outside boxes (13,15) on left, inside (14,16) on right
  // 13 top-left, 14 top-right (inside), 15 bottom-left, 16 bottom-right (inside)
  { n: 13, x: 95, y: 235 },
  { n: 14, x: 115, y: 235 },
  { n: 15, x: 95, y: 255 },
  { n: 16, x: 115, y: 255 },

  // Group 17–20: center-bottom, upright 2×2
  { n: 18, x: 140, y: 262 },
  { n: 20, x: 160, y: 262 },
  { n: 17, x: 140, y: 282 },
  { n: 19, x: 160, y: 282 },

  // Group 21–24: center-right-bottom, upright 2×2
  { n: 22, x: 220, y: 262 },
  { n: 24, x: 240, y: 262 },
  { n: 21, x: 220, y: 282 },
  { n: 23, x: 240, y: 282 },

  // Group 25–28: angled ~-25°, inside boxes (26,28) on left, outside (25,27) on right
  // 28 top-left (inside), 26 below it (inside), 27 top-right, 25 bottom-right
  { n: 28, x: 265, y: 235 },
  { n: 26, x: 285, y: 235 },
  { n: 27, x: 265, y: 255 },
  { n: 25, x: 285, y: 255 },

  // Group 29–32: right side, upright 2×2
  { n: 30, x: 280, y: 190 },
  { n: 32, x: 300, y: 190 },
  { n: 29, x: 280, y: 210 },
  { n: 31, x: 300, y: 210 },

  // Group 33–36: upper-right, upright 2×2
  { n: 36, x: 285, y: 145 },
  { n: 35, x: 305, y: 145 },
  { n: 34, x: 285, y: 165 },
  { n: 33, x: 305, y: 165 },

  // Group 37–40: top-right, upright 2×2
  { n: 40, x: 290, y: 100 },
  { n: 39, x: 310, y: 100 },
  { n: 38, x: 290, y: 120 },
  { n: 37, x: 310, y: 120 },
];

function VenueMap({
  vendors,
  onStandTap,
  activeStandFromLegend,
}: {
  vendors: StandInfo[];
  onStandTap: (n: number) => void;
  activeStandFromLegend: number | null;
}) {
  const [activeStand, setActiveStand] = useState<number | null>(null);
  const BOX = 18;

  // Sync internal active state with legend clicks
  useEffect(() => {
    setActiveStand(activeStandFromLegend);
  }, [activeStandFromLegend]);

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

export default function Info() {
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
            Tap{" "}
            <a
              href="/stands"
              style={{ color: "#583e0d", textDecoration: "underline" }}
            >
              here
            </a>{" "}
            to find out more about our stands!
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
                activeStandFromLegend={tappedStand}
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
                <div
                  style={{ display: "flex", flexDirection: "column", gap: 8 }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    <svg width="20" height="30" viewBox="0 0 20 30">
                      <polygon
                        points="10,0 13,12 20,15 13,18 10,30 7,18 0,15 7,12"
                        fill="#2a2018"
                      />
                    </svg>
                    <span
                      style={{
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 13,
                        color: "#2a2c4a",
                        margin: "15px 0",
                      }}
                    >
                      Wishboard - pick up a plaque from Stand #18 and hang up
                      your wish!
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
