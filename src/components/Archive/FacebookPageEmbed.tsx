import React, { useEffect, useLayoutEffect, useRef, useState } from "react";

declare global {
  interface Window { FB?: any; fbAsyncInit?: () => void; }
}

type Props = {
  pageUrl: string;
  tabs?: string;
  height?: number;
  hideCover?: boolean;
  showFacepile?: boolean;
  smallHeader?: boolean;
};

const FacebookPageEmbed: React.FC<Props> = ({
  pageUrl,
  tabs = "timeline",
  height = 1200,
  hideCover = false,
  showFacepile = true,
  smallHeader = false,
}) => {
  const hostRef = useRef<HTMLDivElement | null>(null);
  const [w, setW] = useState<number>(800);

  useLayoutEffect(() => {
    if (!hostRef.current) return;
    const ro = new ResizeObserver(([entry]) => {
      const cw = Math.max(320, Math.round(entry.contentRect.width));
      setW(cw);
    });
    ro.observe(hostRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    if (window.FB) {
      window.FB.XFBML.parse(hostRef.current || undefined);
      return;
    }
    if (!document.getElementById("fb-root")) {
      const fbRoot = document.createElement("div");
      fbRoot.id = "fb-root";
      document.body.appendChild(fbRoot);
    }
    const id = "facebook-jssdk";
    if (document.getElementById(id)) return;
    window.fbAsyncInit = () => window.FB?.init({ xfbml: true, version: "v20.0" });
    const s = document.createElement("script");
    s.id = id; s.async = true; s.defer = true; s.crossOrigin = "anonymous";
    s.src = "https://connect.facebook.net/en_US/sdk.js";
    document.body.appendChild(s);
  }, []);

  useEffect(() => { window.FB?.XFBML.parse(hostRef.current || undefined); }, [w]);

  return (
    <div ref={hostRef} style={{ width: "100%" }}>
      <div
        key={w}
        className="fb-page"
        data-href={pageUrl}
        data-tabs={tabs}
        data-width={String(w)}
        data-height={height}
        data-small-header={smallHeader ? "true" : "false"}
        data-adapt-container-width="true"
        data-hide-cover={hideCover ? "true" : "false"}
        data-show-facepile={showFacepile ? "true" : "false"}
      >
        <blockquote className="fb-xfbml-parse-ignore" cite={pageUrl}>
          <a href={pageUrl}>Facebook Page</a>
        </blockquote>
      </div>
    </div>
  );
};

export default FacebookPageEmbed;
