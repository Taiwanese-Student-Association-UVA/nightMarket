import React, { useState } from "react";
import "./about.css";

type Person = { name: string; role: string; photo: string };

const execBoard: Person[] = [
  { name: "Ashley Wu", role: "President", photo: "/assets/board/ashley.jpg" },
  { name: "Albany Viet", role: "Vice President", photo: "/assets/board/albany.jpg" },
  { name: "Mckenzie Tran", role: "Secretary", photo: "/assets/board/mckenzie.jpg" },
  { name: "Hebba Mohmand", role: "Treasurer", photo: "/assets/board/hebba.jpg" },
];

const groupedBoard: Record<string, Person[]> = {
  Membership: [
    { name: "Linda Tol", role: "Membership", photo: "/assets/board/linda.jpg" },
    { name: "Natalie Nguyen", role: "Membership", photo: "/assets/board/natalie.jpg" },
  ],
  Social: [
    { name: "Mridula Manikandan", role: "Social", photo: "/assets/board/mridula.jpg" },
    { name: "Matthew Nguyen", role: "Social", photo: "/assets/board/matthew.jpg" },
  ],
  Culinary: [
    { name: "Nolan Nguyen", role: "Culinary", photo: "/assets/board/nolan.jpg" },
    { name: "Britney Nguyen", role: "Culinary", photo: "/assets/board/britney.jpg" },
    { name: "Tina Lin", role: "Culinary", photo: "/assets/board/tina.jpg" },
    { name: "Emily Huo", role: "Culinary", photo: "/assets/board/emily.jpg" },
  ],
  Historian: [
    { name: "Ryan Fang", role: "Historian", photo: "/assets/board/nolan.jpg" },
    { name: "Angelina Nguyen", role: "Historian", photo: "/assets/board/angelina.jpg" },
  ],
  Sports: [
    { name: "Nathaly Du", role: "Sports", photo: "/assets/board/nathaly.jpg" },
    { name: "Robert Chen", role: "Sports", photo: "/assets/board/robert.jpg" },
  ],
  Publicity: [
    { name: "Ashley Qin", role: "Publicity", photo: "/assets/board/ashley2.jpg" },
    { name: "Oanh Dinh", role: "Publicity", photo: "/assets/board/oanh.jpg" },
    { name: "Anna Nguyen", role: "Publicity", photo: "/assets/board/anna.jpg" },
  ],
  Culture: [
    { name: "Jenny Zhang", role: "Culture", photo: "/assets/board/jenny.jpg" },
    { name: "Catherine Cheng", role: "Culture", photo: "/assets/board/catherine.jpg" },
  ],
  Fundraising: [
    { name: "Kerstin Quach", role: "Fundraising", photo: "/assets/board/kerstin.jpg" },
    { name: "Cedric Chen", role: "Fundraising", photo: "/assets/board/cedric.jpg" },
  ],
  Webmaster: [
    { name: "Joyce Yang", role: "Webmaster", photo: "/assets/board/joyce.jpg" },
    { name: "Norah Lee", role: "Webmaster", photo: "/assets/board/norah.jpg" },
    { name: "Brandon Yuan", role: "Webmaster", photo: "/assets/board/brandon.jpg" },
  ],
  Advisor: [
    { name: "Raymond Huang", role: "Advisor", photo: "/assets/board/raymond.jpg" },
    { name: "Hannah Tse", role: "Advisor", photo: "/assets/board/hannah.jpg" },
    { name: "Victoria Hua", role: "Advisor", photo: "/assets/board/victoria.jpg" },
    { name: "Caroline Ding", role: "Advisor", photo: "/assets/board/caroline.jpg" },
  ],
};

const BoardSection: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  return (
    <>
      <div className="galleryRow">
        {execBoard.map((m) => (
          <article key={m.name} className="galleryCard personCard">
            <div className="personText">
              <div className="personName">{m.name}</div>
              <div className="personRole">{m.role}</div>
            </div>
          </article>
        ))}
      </div>

      <div style={{ display: "flex", justifyContent: "center", marginTop: 14 }}>
        <button
          className="btnWide"
          onClick={() => setExpanded((s) => !s)}
          aria-expanded={expanded}
          aria-controls="board-more"
        >
          {expanded ? "View Less" : "View More"}
        </button>
      </div>

      {expanded && (
        <div id="board-more" className="boardGroups">
          {Object.entries(groupedBoard).map(([group, people]) => (
            <section key={group} className="groupBlock">
              <h3 className="groupTitle">{group}</h3>
              <div className="galleryRow">
                {people.map((p) => (
                  <article key={p.name} className="galleryCard personCard">
                    <div className="personText">
                      <div className="personName">{p.name}</div>
                      <div className="personRole">{p.role}</div>
                    </div>
                  </article>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </>
  );
};

export default BoardSection;