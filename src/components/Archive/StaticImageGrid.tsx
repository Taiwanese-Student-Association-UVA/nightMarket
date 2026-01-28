import React from "react";

type Props = {
  width: number;
  height: number;
};

type Item = {
  img: string;
  title: string;
  desc: string;
};

const StaticImageGrid: React.FC<Props> = ({ width, height }) => {
  const items: Item[] = [
    {
      img: require("../../assets/Photos/P1.jpg"),
      title: "Pumpkin Painting",
      desc:
        "Fall is creeping in… 🍁🍂 Join us for TSA’s annual PUMPKIN PAINTING!! 🎃🎨🖌️Start out the spooky season right by making some cute decor at the Lawn! It's also a great opportunity to meet new people :)",
    },
    {
      img: require("../../assets/Photos/T1.png"),
      title: "Taste of Taiwan",
      desc:
        "TSA will be serving some popular Taiwanese cuisine 🤭🍽️ come and treat yourselves to some delicious restaurant style cooking for FREE! 🐻💯💯",
    },
    {
      img: require("../../assets/Photos/NM2.jpg"),
      title: "Night Market",
      desc:
        "Live, Laugh, Love.🌙Imagine a gentle breeze carrying the sweet scent of Taiwanese street food your way🧋🍲Lanterns and street lights glow brightly🏮🌟, illuminating the market booths while the crowd cheers on the lively performances under the bright stars🎶💃✨",
    },
  ];

  const gap = 20;
  const side = 220;
  const textMaxWidth = width - side - gap;

  return (
    <div
      style={{
        width,
        height,
        overflowY: "auto",
        paddingRight: 2,
      }}
    >
      <div style={{ display: "grid", rowGap: 28 }}>
        {items.map((it, i) => {
          const image = (
            <div
              key={`img-${i}`}
              style={{
                width: side,
                height: side,
                background: "#cfd6ff",
                borderRadius: 18,
                overflow: "hidden",
              }}
            >
              <img
                src={it.img}
                alt={it.title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </div>
          );

          const text = (
            <div key={`txt-${i}`} style={{ maxWidth: textMaxWidth }}>
              <div
                style={{
                  fontWeight: 700,
                  marginBottom: 10,
                  fontSize: 20,
                  lineHeight: 1.1,
                }}
              >
                {it.title}
              </div>
              <p
                style={{
                  margin: 0,
                  color: "#222",
                  lineHeight: 1.5,
                  fontSize: 15.5,
                }}
              >
                {it.desc}
              </p>
            </div>
          );

          const leftFirst = i % 2 === 0;

          return (
            <div
              key={i}
              style={{
                display: "grid",
                gridTemplateColumns: `${side}px 1fr`,
                columnGap: gap,
                alignItems: "center",
              }}
            >
              {leftFirst ? (
                <>
                  {image}
                  {text}
                </>
              ) : (
                <>
                  {text}
                  {image}
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StaticImageGrid;
