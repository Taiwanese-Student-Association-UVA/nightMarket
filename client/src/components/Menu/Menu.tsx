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
}

// ── data fetching ──────────────────────────────────────────────────────────
const SHEET_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRWtg5juZf3raTsoj6c-MeMNSluH1c4aXcxkQl4cQuqR4ByJh78PT4TyKiKXeICy9cDi7u6H_zXMiHG/pub?gid=1108498483&single=true&output=csv";

function useVendors(csvUrl: string) {
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(csvUrl, {
      download: true,
      header: true,
      complete: (result: Papa.ParseResult<Vendor>) => {
        setVendors(result.data as Vendor[]);
        setLoading(false);
      },
    });
  }, [csvUrl]);

  return { vendors, loading };
}

// ── modal ──────────────────────────────────────────────────────────────────
function VendorModal({
  vendor,
  onClose,
}: {
  vendor: Vendor;
  onClose: () => void;
}) {
  // lock scroll while open
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
          from { opacity: 0; transform: translateY(32px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)     scale(1);    }
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

      {/* card */}
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
            background: "#fffaf8",
            borderRadius: "15px 15px 0 0",
            padding: "0 0 32px",
            animation: "modalIn 0.35s cubic-bezier(.22,.97,.47,1) both",
            maxHeight: "85vh",
            overflowY: "auto",
          }}
        >
          {/* image */}
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
            {/* stall name */}
            <h2
              style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: 26,
                fontWeight: 700,
                color: "#2a2018",
                margin: "0 0 10px",
                lineHeight: 1.2,
              }}
            >
              {vendor.stall}
            </h2>

            {/* description */}
            {vendor.description && (
              <p
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 15,
                  lineHeight: 1.65,
                  color: "#4a3c30",
                  margin: "0 0 14px",
                }}
              >
                {vendor.description}
              </p>
            )}

            {/* sub tags */}
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
                    background: "#e8ddd4",
                    color: "#5c4a3a",
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
                    background: "#d4c9bc",
                    color: "#4a3a2a",
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

            {/* close button */}
            <button
              onClick={onClose}
              style={{
                width: "100%",
                padding: "14px",
                background: "#2a2018",
                color: "#fffaf8",
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
        background: "#f5ede7",
        cursor: "pointer",
        transform: pressed ? "scale(0.97)" : "scale(1)",
        transition: "transform 0.15s ease",
        boxShadow: pressed
          ? "0 1px 6px rgba(0,0,0,0.12)"
          : "0 2px 12px rgba(0,0,0,0.08)",
      }}
    >
      {/* image */}
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

      {/* name */}
      <div style={{ padding: "10px 12px 2px", textAlign: "center" }}>
        <p
          style={{
            margin: 0,
            fontFamily: "'DM Sans', sans-serif",
            fontSize: 14,
            fontWeight: 600,
            color: "#2a2018",
            lineHeight: 1.3,
          }}
        >
          {vendor.stall}
        </p>
      </div>
    </div>
  );
}

// ── page ───────────────────────────────────────────────────────────────────
export default function Vendors() {
  const { vendors, loading } = useVendors(SHEET_CSV_URL);
  const [selected, setSelected] = useState<Vendor | null>(null);

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          minHeight: "100dvh",
          background: "#fffaf8",
          padding: "0 0 40px",
          maxWidth: 480,
          margin: "0 auto",
        }}
      >
        {/* header */}
        <div style={{ padding: "16px 20px 0" }}>
          <BackButton />
        </div>

        <div style={{ padding: "12px 20px 0" }}>
          <h1
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
              fontSize: 38,
              fontWeight: 900,
              color: "#2a2018",
              margin: "0 0 6px",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            Our Vendors
          </h1>
          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: 14,
              color: "#8a7060",
              margin: "0 0 24px",
              lineHeight: 1.5,
            }}
          >
            Supporting student vendors — tap a stall to learn more!
          </p>
        </div>

        {/* grid */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              padding: "60px 0",
              fontFamily: "'DM Sans', sans-serif",
              color: "#8a7060",
              fontSize: 14,
            }}
          >
            Loading vendors…
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 12,
              padding: "0 20px",
            }}
          >
            {vendors.map((v, i) => (
              <VendorCard key={i} vendor={v} onClick={() => setSelected(v)} />
            ))}
          </div>
        )}
      </div>

      {/* modal */}
      {selected && (
        <VendorModal vendor={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
}
