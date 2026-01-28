import React from "react";

interface CardProps{
  title:string;
  desc?:string;
  href?:string;
  children?:React.ReactNode;
}
const Card:React.FC<CardProps> = ({title,desc,href,children})=>{
  const content = (
    <div className="card">
      <h3 style={{fontWeight:600, fontSize:"1.1rem", marginBottom:".5rem"}}>{title}</h3>
      {desc && <p style={{fontSize:".95rem", lineHeight:1.55, marginBottom:"1rem"}}>{desc}</p>}
      {children}
      {href && <a className="btn" href={href} target="_blank" rel="noreferrer">Open</a>}
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noreferrer" style={{textDecoration:"none"}}>{content}</a> : content;
}
export default Card;
