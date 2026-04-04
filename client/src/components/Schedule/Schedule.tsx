import { useEffect, useState } from "react";
import Papa from "papaparse";
import BackButton from "../BackButton";

interface ScheduleRow {
  time: string;
  event: string;
  description: string;
}

// Replace with your actual published CSV URL for the schedule sheet
const SCHEDULE_CSV_URL =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vRWtg5juZf3raTsoj6c-MeMNSluH1c4aXcxkQl4cQuqR4ByJh78PT4TyKiKXeICy9cDi7u6H_zXMiHG/pub?gid=476880880&single=true&output=csv";

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

function ScheduleCard({ row }: { row: ScheduleRow }) {
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
        borderLeft: "4px solid #ffd06b",
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
              color: "#8a8060",
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
              whiteSpace: "pre-line",
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
            color: "#0c112b",
            margin: "10px 0 0",
            lineHeight: 1.6,
            borderTop: "1px solid #dce3ed",
            paddingTop: 10,
            whiteSpace: "pre-line",
          }}
        >
          {row.description}
        </p>
      )}
    </div>
  );
}

function ScheduleList() {
  const { rows, loading } = useSchedule(SCHEDULE_CSV_URL);

  return (
    <div style={{ padding: "20px 16px" }}>
      {loading ? (
        <p
          style={{
            textAlign: "center",
            color: "#0a0b27",
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
        rows.map((row, i) => <ScheduleCard key={i} row={row} />)
      )}
    </div>
  );
}

export default function Schedule() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@400;500;600&display=swap"
        rel="stylesheet"
      />

      <div
        style={{
          minHeight: "100dvh",
          background: "#fff0b3",
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
            Schedule
          </h1>
        </div>

        <ScheduleList />
      </div>
    </>
  );
}
