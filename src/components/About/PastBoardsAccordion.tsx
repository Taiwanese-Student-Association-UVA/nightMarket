import React, { useRef, useState } from "react";
import { Member } from "./BoardGrid";

interface PastYear{
  year:string;
  members:Member[];
}
const PastBoardsAccordion:React.FC<{years:PastYear[]}> = ({years})=>{
  const [open, setOpen] = useState<string | null>(null);
  const panelRefs = useRef<Record<string, HTMLDivElement | null>>({});

  const toggle = (y:string)=>{
    setOpen(prev=> prev===y ? null : y);
  };

  return(
    <div>
      {years.map(y=>(
        <div className="accordion-item" key={y.year}>
          <button className="accordion-btn" onClick={()=>toggle(y.year)} aria-expanded={open===y.year}>
            <span>{y.year} Board</span>
            <span>{open===y.year ? "–" : "+"}</span>
          </button>
          <div
            ref={el => { panelRefs.current[y.year] = el; }}
            className={`accordion-panel ${open===y.year ? "open":""}`}
            style={{paddingBottom: open===y.year ? "1rem" : 0}}
          >
            <ul style={{paddingLeft:"1rem", lineHeight:1.6}}>
              {y.members.map((m,i)=>(
                <li key={i}><strong>{m.name}</strong> — {m.role}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  )
}
export default PastBoardsAccordion;
