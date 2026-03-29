import { useEffect, useState } from "react";
import Papa from "papaparse";
import BackButton from "../BackButton";

// ── types ──────────────────────────────────────────────────────────────────
interface Vendor {
  stall: string;
  description: string;
  sub: string;
  sub2: string;
  img: string;
  genre: string;
}

// ── data fetching ──────────────────────────────────────────────────────────
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRWtg5juZf3raTsoj6c-MeMNSluH1c4aXcxkQl4cQuqR4ByJh78PT4TyKiKXeICy9cDi7u6H_zXMiHG/pub?gid=1108498483&single=true&output=csv";

function useVendors(csvUrl: string) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      const result = await new Promise<Papa.ParseResult<Vendor>>((resolve) => {
        Papa.parse(csvUrl, { download: true, header: true, complete: resolve });
      });
      if (!cancelled) {
        setVendors(result.data as Vendor[]);
        setLoading(false);
      }
    };

    fetchData();
    return () => {
      cancelled = true;
    };
  }, [csvUrl]);

  // group vendors by genre, preserving first-seen order and filtering out empty
  const grouped = vendors.reduce<Record<string, Vendor[]>>((acc, v) => {
    const key = v.genre?.trim() || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(v);
    return acc;
  }, {});

  return { grouped, loading };
}

// ── modal ──────────────────────────────────────────────────────────────────
function VendorModal({
  vendor,
  onClose,
}: {
  vendor: Vendor;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
      `}</style>

      {/* backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 100,
          background: "rgba(0,0,0,0.55)",
          backdropFilter: "blur(4px)",
          WebkitBackdropFilter: "blur(4px)",
        }}
      />

      {/* sheet */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 101,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "0 0 env(safe-area-inset-bottom,0)",
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 480,
            background: "#f8f9ff",
            borderRadius: "15px 15px 0 0",
            padding: "0 0 32px",
            animation: "modalIn 0.35s cubic-bezier(.22,.97,.47,1) both",
            maxHeight: "85vh",
            overflowY: "auto",
          }}
        >
          {vendor.img && (
            <div
              style={{
                width: "100%",
                height: 275,
                overflow: "hidden",
                borderRadius: "15px 15px 0 0",
              }}
            >
              <img
                src={vendor.img}
                alt={vendor.stall}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
          )}

          <div style={{ padding: "20px 24px 0" }}>
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 26,
                fontWeight: 700,
                color: "#18182a",
                margin: "0 0 10px",
                lineHeight: 1.2,
              }}
            >
              {vendor.stall}
            </h2>

            {vendor.description && (
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "#30344a",
                  margin: "0 0 14px",
                }}
              >
                {vendor.description}
              </p>
            )}

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 20,
              }}
            >
              {vendor.sub && (
                <span
                  style={{
                    background: "#d4d8e8",
                    color: "#3d3a5c",
                    borderRadius: 20,
                    padding: "5px 14px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {vendor.sub}
                </span>
              )}
              {vendor.sub2 && (
                <span
                  style={{
                    background: "#bcbed4",
                    color: "#2b2a4a",
                    borderRadius: 20,
                    padding: "5px 14px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {vendor.sub2}
                </span>
              )}
            </div>

            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "14px",
                background: "#18182a",
                color: "#f8f8ff",
                border: "none",
                borderRadius: 14,
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                letterSpacing: "0.02em",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

// ── vendor card ────────────────────────────────────────────────────────────
function VendorCard({
  vendor,
  onClick,
}: {
  vendor: Vendor;
  onClick: () => void;
}) {
  const [pressed, setPressed] = useState(false);

  return (
    <div
      onClick={onClick}
      onPointerDown={() => setPressed(true)}
      onPointerUp={() => setPressed(false)}
      onPointerLeave={() => setPressed(false)}
      style={{
        borderRadius: 5,
        overflow: "hidden",
        background: "#e7e7f5",
        cursor: "pointer",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "transform 0.15s ease",
        boxShadow: pressed
          ? "0 1px 6px rgba(0,0,0,0.12)"
          : "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ width: "100%", aspectRatio: "1 / 1", overflow: "hidden" }}>
        {vendor.img ? (
          <img
            src={vendor.img}
            alt={vendor.stall}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div
            style={{ width: "100%", height: "100%", background: "#c8b8a8" }}
          />
        )}
      </div>

      <div style={{ padding: "10px 12px 12px", textAlign: "center" }}>
        <p
          style={{
            margin: 0,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "#18182a",
            lineHeight: 1.3,
          }}
        >
          {vendor.stall}
        </p>
      </div>
    </div>
  );
}

// ── accordion section ──────────────────────────────────────────────────────
function GenreSection({
  genre,
  vendors,
  onSelect,
  isOpen: initialIsOpen = false,
  onToggle,
}: {
  genre: string;
  vendors: Vendor[];
  onSelect: (v: Vendor) => void;
  isOpen?: boolean;
  onToggle?: (genre: string, isOpen: boolean) => void;
}) {
  const [open, setOpen] = useState(initialIsOpen);

  const handleToggle = () => {
    const newState = !open;
    setOpen(newState);
    onToggle?.(genre, newState);
  };

  return (
    <>
      <style>{`
        @keyframes gridReveal {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        style={{
          marginBottom: 2,
          borderBottom: "1px solid #d4d7e8",
        }}
      >
        {/* accordion header */}
        <button
          onClick={handleToggle}
          style={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "16px 20px",
            background: "none",
            border: "none",
            cursor: "pointer",
            textAlign: "left",
            gap: 12,
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 20,
                fontWeight: 700,
                color: "#18182a",
                letterSpacing: "-0.01em",
              }}
            >
              {genre}
            </span>
            <span
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 12,
                color: "#8084a8",
                background: "#e0e2f0",
                borderRadius: 20,
                padding: "2px 10px",
                fontWeight: 500,
              }}
            >
              {vendors.length}
            </span>
          </div>

          {/* chevron */}
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#808ba8"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              flexShrink: 0,
              transform: open ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.25s ease",
            }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>

        {/* collapsible grid */}
        <div
          style={{
            display: open ? "grid" : "none",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            padding: "0 20px 20px",
            animation: open ? "gridReveal 0.25s ease both" : "none",
          }}
        >
          {vendors.map((v, i) => (
            <VendorCard key={i} vendor={v} onClick={() => onSelect(v)} />
          ))}
        </div>
      </div>
    </>
  );
}

// ── page ───────────────────────────────────────────────────────────────────
export default function Menu() {
  const { grouped, loading } = useVendors(SHEET_CSV_URL);
  const [selected, setSelected] = useState<Vendor | null>(null);
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});

  // Load saved state from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("menu-open-sections");
    if (saved) {
      try {
        setOpenSections(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to load saved state", e);
      }
    }
  }, []);

  // Save state to localStorage
  const handleToggle = (genre: string, isOpen: boolean) => {
    const newState = { ...openSections, [genre]: isOpen };
    setOpenSections(newState);
    localStorage.setItem("menu-open-sections", JSON.stringify(newState));
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
          background: "#f8f9ff",
          paddingBottom: 40,
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        {/* header */}
        <div style={{ padding: "16px 20px 0" }}>
          <BackButton />
        </div>

        <div style={{ padding: "12px 20px 20px" }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 38,
              fontWeight: 900,
              color: "#181b2a",
              margin: "0 0 6px",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Our Stands
          </h1>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
            }}
          >
            <p
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: 14,
                color: "#60648a",
                margin: 0,
                lineHeight: 1.5,
              }}
            >
              Supporting student vendors, cultural CIOs, local organizations,
              and more - tap a stall to learn about each stand!
            </p>
          </div>
        </div>

        {/* accordion list */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "60px 0",
              fontFamily: "'DM Sans', sans-serif",
              color: "#60668a",
              fontSize: 14,
            }}
          >
            Loading vendors…
          </div>
        ) : (
          <div>
            {Object.entries(grouped).map(([genre, vendors]) => (
              <GenreSection
                key={genre}
                genre={genre}
                vendors={vendors}
                onSelect={setSelected}
                isOpen={openSections[genre] ?? false}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}
      </div>

      {selected && (
        <VendorModal vendor={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
