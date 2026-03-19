import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100vw",
        background: "white",
      }}
    >
      <svg
        viewBox="0 0 389 1187"
        style={{
          width: "100vw",
          height: "auto",
          display: "block",
        }}
      >
        <rect width="389" height="1187" fill="white" />

        {/* TSA WEBSITE */}
        <path
          d="M17 1057L372 1106.5V1169H18.5L17 1057Z"
          fill="#FFE9E9"
          stroke="black"
          strokeWidth="3"
          onClick={() => window.location.href = "https://tsaatuva.org"}
        />

        {/* DIRECTIONS*/}
        <path
          d="M372 941L18.5 999V1043L372 1091V941Z"
          fill="#FFE9E9"
          stroke="black"
          strokeWidth="3"
          onClick={() => window.location.href = "https://maps.app.goo.gl/ZwNFrEBbVZn1Pw1u8"}
          
        />

        {/* SPONSORS*/}
        <path
          d="M209 950L175 817L372 790.5V923L209 950Z"
          fill="#FFE9E9"
          stroke="black"
          strokeWidth="3"
          //onClick={() => navigate("/Menu")}
          style={{ cursor: "pointer" }}
        />

        {/* VENDORS*/}
        <path
          d="M18.5 983V842L163.5 820L195.5 952.5L18.5 983Z"
          fill="#FFE9E9"
          stroke="black"
          strokeWidth="3"
          //onClick={() => navigate("/Menu")}
          style={{ cursor: "pointer" }}

        />

        {/* SCHEDULE*/}
        <path
          d="M207.5 794L239.699 623L17 676V823L207.5 794Z"
          fill="#FFE9E9"
          stroke="black"
          strokeWidth="3"
          onClick={() => navigate("/Schedule")}
          style={{ cursor: "pointer" }}
        />

        {/* MAP */}
        <path
          d="M372 556.922L270.984 541.427L225.5 790.5L372 771.5V556.922Z"
          fill="#FFE9E9"
          stroke="black"
          strokeWidth="3"
          onClick={() => navigate("/Map")}
          style={{ cursor: "pointer" }}
        />

        {/* MENU */}
        <path
          d="M17 660.647V501.301L256.076 538.848L243.5 606L17 660.647Z"
          fill="#FFE9E9"
          stroke="black"
          strokeWidth="3"
          onClick={() => navigate("/Menu")}
        />

        {/* NIGHT MARKET LOGO*/}
        <path
          d="M372 212.673L17 336.5V481.5L372 534.5V212.673Z"
          fill="#FFE9E9"
          stroke="black"
          strokeWidth="3"
        />

        {/* LOGIN*/}
        <path
          d="M372 18H144L189.792 254.765L372 192.379V18Z"
          fill="#FFE9E9"
          stroke="black"
          strokeWidth="3"
          onClick={() => navigate("/Login")}
        />

        {/* Register*/}
        <path
          d="M126.702 18H17V314.895L172.371 260.026L126.702 18Z"
          fill="#FFE9E9"
          stroke="black"
          strokeWidth="3"
          onClick={() => navigate("/Login")}
        />
      </svg>
    </div>
  );
}