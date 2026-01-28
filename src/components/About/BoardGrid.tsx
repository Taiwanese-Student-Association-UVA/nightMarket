import React from "react";

export type Member = { name: string; role: string; img?: string };

const BoardGrid:React.FC<{members:Member[]}> = ({members})=>{
  return(
    <div className="board-grid">
      {members.map((m,i)=>(
        <div key={i} className="card board-card">
          {m.img && <img src={m.img} alt={m.name}/>}
          <div className="board-role">{m.role}</div>
          <div style={{fontWeight:600}}>{m.name}</div>
        </div>
      ))}
    </div>
  )
}
export default BoardGrid;
