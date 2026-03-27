import { useNavigate } from "react-router-dom";
import panelsImage from "../../assets/home/panels2.svg";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100vw", position: "relative" }}>
      <svg
        viewBox="0 0 390 844"
        width="100%"
        height="100%"
        style={{ display: "block" }}
      >
        {/* Background image as <image> */}
        <image
          href={panelsImage}
          x="0"
          y="0"
          width="390"
          height="844"
          preserveAspectRatio="xMidYMid meet"
        />

        {/* Header */}
        <path
          d="M371 239H18V16H370.003L371 239Z"
          fill="transparent"
          // stroke="red"
          strokeWidth={1}
          style={{ cursor: "pointer", pointerEvents: "all" }}
        />

        {/* Activity Card */}
        <path
          d="M17.5 413.683V253.089L262.983 253.089L244 359.036L17.5 413.683Z"
          fill="transparent"
          // stroke="lightgreen"
          strokeWidth={1}
          onClick={() => navigate("/activity")}
          style={{ cursor: "pointer", pointerEvents: "all" }}
        />

        {/* Link back to main website merch page */}
        <path
          d="M372.5 253.533H274.277L223.445 550.241L372.5 527.922V253.533Z"
          fill="transparent"
          // stroke="orange"
          strokeWidth={1}
          onClick={() => navigate("/merch")}
          style={{ cursor: "pointer", pointerEvents: "all" }}
        />

        {/* Stands */}
        <path
          d="M208.938 555.589L240.199 376.036L17.5 429.036V583.488L208.938 555.589Z"
          fill="transparent"
          // stroke="green"
          strokeWidth={1}
          onClick={() => navigate("/stands")}
          style={{ cursor: "pointer", pointerEvents: "all" }}
        />

        {/* Info */}
        <path
          d="M372.5 549.493L19 602.166V666.695L372.5 723.492V549.493Z"
          fill="transparent"
          // stroke="lightblue"
          strokeWidth={1}
          onClick={() => navigate("/info")}
          style={{ cursor: "pointer", pointerEvents: "all" }}
        />

        {/* Sponsors */}
        <path
          d="M17.5 683.028L372.5 744.91V823.043H19L17.5 683.028Z"
          fill="transparent"
          // stroke="blue"
          strokeWidth={1}
          onClick={() => navigate("/sponsors")}
          style={{ cursor: "pointer", pointerEvents: "all" }}
        />
      </svg>
    </div>
  );
}
