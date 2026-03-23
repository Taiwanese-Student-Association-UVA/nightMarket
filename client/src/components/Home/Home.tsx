import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
      <div style={{ width: "100vw", background: "white" }}>
        <svg
            viewBox="0 0 389 1187"
            style={{ width: "100vw", height: "auto", display: "block" }}
        >
          <rect width="389" height="1187" fill="white" />

          {/* ACTIVITY BUTTON AT TOP */}
          <g
              onClick={() => navigate("/activity")}
              style={{ cursor: "pointer" }}
          >
            <path
                d="M17 100L195.5 60L372 100V160L17 160Z"
                fill="#FFE9E9"
                stroke="black"
                strokeWidth="3"
            />
            <text
                x="195"
                y="120"
                textAnchor="middle"
                fontSize="14"
                pointerEvents="none"
            >
              ACTIVITY
            </text>
          </g>

          {/* NIGHT MARKET LOGO */}
          <g>
            <path
                d="M372 212.673L17 336.5V481.5L372 534.5V212.673Z"
                fill="#FFE9E9"
                stroke="black"
                strokeWidth="3"
            />
            <text
                x="195"
                y="400"
                textAnchor="middle"
                fontSize="16"
                fontWeight="bold"
                pointerEvents="none"
            >
              NIGHT MARKET
            </text>
          </g>

          {/* MENU */}
          <g onClick={() => navigate("/menu")} style={{ cursor: "pointer" }}>
            <path
                d="M17 660.647V501.301L256.076 538.848L243.5 606L17 660.647Z"
                fill="#FFE9E9"
                stroke="black"
                strokeWidth="3"
            />
            <text
                x="130"
                y="580"
                textAnchor="middle"
                fontSize="14"
                pointerEvents="none"
            >
              MENU
            </text>
          </g>

          {/* MAP */}
          <g onClick={() => navigate("/map")} style={{ cursor: "pointer" }}>
            <path
                d="M372 556.922L270.984 541.427L225.5 790.5L372 771.5V556.922Z"
                fill="#FFE9E9"
                stroke="black"
                strokeWidth="3"
            />
            <text
                x="310"
                y="670"
                textAnchor="middle"
                fontSize="14"
                pointerEvents="none"
            >
              MAP
            </text>
          </g>

          {/* SCHEDULE */}
          <g onClick={() => navigate("/schedule")} style={{ cursor: "pointer" }}>
            <path
                d="M207.5 794L239.699 623L17 676V823L207.5 794Z"
                fill="#FFE9E9"
                stroke="black"
                strokeWidth="3"
            />
            <text
                x="120"
                y="730"
                textAnchor="middle"
                fontSize="14"
                pointerEvents="none"
            >
              SCHEDULE
            </text>
          </g>

          {/* VENDORS */}
          <g style={{ cursor: "pointer" }}>
            <path
                d="M18.5 983V842L163.5 820L195.5 952.5L18.5 983Z"
                fill="#FFE9E9"
                stroke="black"
                strokeWidth="3"
            />
            <text
                x="110"
                y="900"
                textAnchor="middle"
                fontSize="14"
                pointerEvents="none"
            >
              VENDORS
            </text>
          </g>

          {/* SPONSORS */}
          <g style={{ cursor: "pointer" }}>
            <path
                d="M209 950L175 817L372 790.5V923L209 950Z"
                fill="#FFE9E9"
                stroke="black"
                strokeWidth="3"
            />
            <text
                x="290"
                y="870"
                textAnchor="middle"
                fontSize="14"
                pointerEvents="none"
            >
              SPONSORS
            </text>
          </g>

          {/* DIRECTIONS */}
          <g
              onClick={() =>
                  (window.location.href =
                      "https://maps.app.goo.gl/ZwNFrEBbVZn1Pw1u8")
              }
              style={{ cursor: "pointer" }}
          >
            <path
                d="M372 941L18.5 999V1043L372 1091V941Z"
                fill="#FFE9E9"
                stroke="black"
                strokeWidth="3"
            />
            <text
                x="195"
                y="1015"
                textAnchor="middle"
                fontSize="14"
                pointerEvents="none"
            >
              DIRECTIONS
            </text>
          </g>

          {/* TSA WEBSITE */}
          <g
              onClick={() => (window.location.href = "https://tsaatuva.org")}
              style={{ cursor: "pointer" }}
          >
            <path
                d="M17 1057L372 1106.5V1169H18.5L17 1057Z"
                fill="#FFE9E9"
                stroke="black"
                strokeWidth="3"
            />
            <text
                x="195"
                y="1125"
                textAnchor="middle"
                fontSize="14"
                pointerEvents="none"
            >
              TSA WEBSITE
            </text>
          </g>
        </svg>
      </div>
  );
}