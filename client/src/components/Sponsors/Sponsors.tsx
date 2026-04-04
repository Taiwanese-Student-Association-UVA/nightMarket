import { useState, useEffect } from "react";
import BackButton from "../BackButton";

// ── types ─────────────────────────────────────────
interface Sponsor {
    name: string;
    blurb: string;
    link: string;
    img?: string;
}

// ── sponsor data ──────────────────────────────────
const sponsors: Sponsor[] = [
    {
        name: "RVA Katana",
        blurb:
            "RVA Katana brings warrior spirit to the Richmond area and beyond. They offer authentic swords and the opportunity to connect with a timeless tradition.",
        link: "https://rva-katana.com",
        img: "/sponsors/katana.png",
    },
    {
        name: "Taiwanese Sausages",
        blurb:
            "Created by a Taiwanese couple who moved to the US after graduation and wanted to bring a taste of home to Minnesota, Taiwanese Sausages is a USDA licensed factory in America which specializes in creating authentic Taiwanese sausages.",
        link: "https://taiwanesesausages.com",
        img: "/sponsors/sausage.png",
    },
    {
        name: "Bodo's Bagels",
        blurb:
            "Bodo's Bagels is a Charlottesville staple, operating since 1988 and serving sandwiches, salads, and freshly baked NY bagels.",
        link: "https://bodosbagels.com",
        img: "/sponsors/bodos.png",
    },
    {
        name: "Ragged Mountain",
        blurb:
            "Ragged Mountain Running Shop is a long-standing, family-owned speciality store in Charlottesville, known for its expert in shoe fitting, gait analysis, and a wide selection of running and walking gear. Since, 1982, it has served the local community with personalized service, focusing on promoting healthy lifestyles for runners of all levels.",
        link: "https://raggedmountainrunning.com",
        img: "/sponsors/raggedmountain.png",
    },
    {
        name: "Shenandoah Joe",
        blurb:
            "Shenandoah Joe Coffee Roasters was established as a small batch coffee roaster in 1993 in Charlottesville, VA. They offer over 25 varieties of coffee using the finest Arabica coffee from all over the world.",
        link: "https://shenandoahjoe.com",
        img: "/sponsors/joe.png",
    },
    {
        name: "Yun Hai",
        blurb:
            "Yun Hai offers a selection of premium ingredients for Taiwanese and Chinese cooking. They source directly from artisans, farms, and soy sauce breweries in Taiwan. Yun Haiâ€™s team helps small food businesses based in Taiwan prepare their product for commercial import to an eager audience in the United States. They intend to bring visibility to the culture, cuisine, and independence of Taiwan while offering a selection of fine and fancy ingredients for Taiwanese and Chinese cooking.",
        link: "https://yunhai.shop/",
        img: "/sponsors/yunhai.png",
    },
    {
        name: "Pineapples Thai",
        blurb:
            "Pineapples Thai Kitchen is a family-owned Thai restaurant in Charlottesville, VA. The restaurant is owned by Kitty Ashi who refers to her staff as a family and focuses on creating a family atmosphere. Pineapples Thai is known for having a welcoming, family run atmosphere with yummy authentic food.",
        link: "https://pineapplescville.com",
        img: "/sponsors/pthai.png",
    },
    {
        name: "FAPA",
        blurb:
            "The Formosan Association of Public Affairs (FAPA) was founded in 1982 and is one of the oldest grassroots organizations for Taiwan in the US. FAPA’s mission is educational and provides US policymakers, the media, scholars, and the public with information about Taiwan.",
        link: "https://fapa.org",
        img: "/sponsors/fapa.png",
    },
    {
        name: "Tap-DC",
        blurb:
            "The Taiwanese American Professionals of DC organization is an affiliate chapter of the Taiwanese American Citizens League (TACL) and builds a network of Taiwanese Americans in the Washington, D.C. area while emphasizing professional development and Taiwanese identity.",
        link: "https://tap-dc.org",
        img: "/sponsors/tapdc.png",
    },
    {
        name: "WMACS",
        blurb:
            "The Washington Metropolitan Association of Chinese Schools (WMACS) promotes Chinese language and cultural education to children of the DC metro area including Maryland and Virginia.",
        link: "https://wmacs.org",
        img: "/sponsors/wmacs.png",
    },
    {
        name: "UJC",
        blurb:
            "The University Judiciary Committee is the student-run judiciary body of the University of Virginia and promotes a community of respect, safety, and freedom at UVA.",
        link: "https://ujc.virginia.edu",
        img: "/sponsors/ujc.png",
    },
    {
        name: "UVA Honor",
        blurb:
            "UVA’s Honor Committee upholds the Community of Trust, where honesty and mutual respect form the foundation of academic and personal interactions.",
        link: "https://honor.virginia.edu",
        img: "/sponsors/honor.png",
    },
    {
        name: "Class of 2027",
        blurb:
            "UVA Third Year Council is comprised of representatives from each of the University's 8 undergraduate schools and the incoming class of transfer students. The Council is responsible for overseeing the third-year experience at UVA including planning all third-year programming, coordinating class-wide initiatives, and represents the interests of the third-year class to the University administration.",
        link: "https://uvaclasscouncils.org",
        img: "/sponsors/thirdyearcouncil.png",
    },
    {
        name: "UVA Parents Program",
        blurb:
            "The UVA Parents Program enhances the student experience through annual gifts from parents of current and former students. The Parents Program supports student clubs and cultural events, academic enhancement programs and career services, health and wellness initiatives, and class dinners and traditions that enrich student life across Ground.",
        link: "https://giving.virginia.edu/where-to-give/parents-fund/",
        img: "/sponsors/parents.png",
    },
];

function SponsorCard({
                         sponsor,
                         onClick,
                     }: {
    sponsor: Sponsor;
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
            <div style={{ width: "100%", aspectRatio: "1 / 1" }}>
                {sponsor.img ? (
                    <img
                        src={sponsor.img}
                        alt={sponsor.name}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                        }}
                    />
                ) : (
                    <div style={{ width: "100%", height: "100%", background: "#c8b8a8" }} />
                )}
            </div>

            <div style={{ padding: "10px 12px", textAlign: "center" }}>
                <p
                    style={{
                        margin: 0,
                        fontFamily: "'DM Sans', sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#18182a",
                    }}
                >
                    {sponsor.name}
                </p>
            </div>
        </div>
    );
}

function SponsorModal({
                          sponsor,
                          onClose,
                      }: {
    sponsor: Sponsor;
    onClose: () => void;
}) {
    const [closing, setClosing] = useState(false);

    // Lock scroll when modal is open
    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "";
        };
    }, []);

    const handleClose = () => {
        setClosing(true);
        // Wait for animation to finish (350ms) then call parent onClose
        setTimeout(onClose, 350);
    };

    return (
        <>
            <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes modalOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(40px) scale(0.97); }
        }

        @keyframes backdropIn {
          from { opacity: 0; }
          to { opacity: 0.55; }
        }

        @keyframes backdropOut {
          from { opacity: 0.55; }
          to { opacity: 0; }
        }
      `}</style>

            {/* backdrop */}
            <div
                onClick={handleClose}
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 100,
                    background: "rgba(0,0,0,0.55)",
                    backdropFilter: "blur(4px)",
                    WebkitBackdropFilter: "blur(4px)",
                    animation: closing ? "backdropOut 0.1s forwards" : "backdropIn 0.1s forwards",
                }}
            />

            {/* modal sheet */}
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
                        maxHeight: "85vh",
                        overflowY: "auto",
                        animation: closing ? "modalOut 0.2s forwards" : "modalIn 0.15s forwards",
                    }}
                >
                    {sponsor.img && (
                        <div
                            style={{
                                width: "100%",
                                height: 275,
                                overflow: "hidden",
                                borderRadius: "15px 15px 0 0",
                            }}
                        >
                            <img
                                src={sponsor.img}
                                alt={sponsor.name}
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
                            {sponsor.name}
                        </h2>

                        <p
                            style={{
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 15,
                                lineHeight: 1.65,
                                color: "#30344a",
                                margin: "0 0 16px",
                            }}
                        >
                            {sponsor.blurb}
                        </p>

                        <a
                            href={sponsor.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                display: "inline-block",
                                marginBottom: 20,
                                fontFamily: "'DM Sans', sans-serif",
                                fontSize: 14,
                                fontWeight: 600,
                                color: "#3d3a5c",
                                textDecoration: "none",
                                background: "#d4d8e8",
                                padding: "6px 14px",
                                borderRadius: 20,
                            }}
                        >
                            Visit Website
                        </a>

                        <button
                            onClick={handleClose}
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

export default function Sponsors() {
    const [selected, setSelected] = useState<Sponsor | null>(null);

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
                    background: "#f8f9ff",
                    maxWidth: 480,
                    margin: "0 auto",
                }}
            >
                <div style={{padding: "16px 20px 0"}}>
                    <BackButton/>
                </div>

                <div style={{padding: "12px 20px 20px"}}>
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
                        Our Sponsors
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
                            Welcome to the NightMarket Cultural Event sponsors page! Here you'll find all the organizations and businesses supporting us - tap a stall to learn about each stand!
                        </p>
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: 12,
                        padding: "0 20px 40px",
                    }}
                >
                    {sponsors.map((s, i) => (
                        <SponsorCard key={i} sponsor={s} onClick={() => setSelected(s)}/>
                    ))}
                </div>

                {selected && (
                    <SponsorModal sponsor={selected} onClose={() => setSelected(null)}/>
                )}
            </div>
        </>
    );
}