import React from "react";

interface SectionProps{
  id:string;
  title:string;
  kicker?:string;
  children:React.ReactNode;
  blob?:boolean;
}
const Section:React.FC<SectionProps> = ({id,title,kicker,children,blob=true})=>{
  return(
    <section id={id} className="section">
      <div className="container">
        <header className="section-header">
          {kicker && <p className="section-kicker">{kicker}</p>}
          <h2 className="section-title">{title}</h2>
        </header>
        {children}
      </div>
    </section>
  )
}
export default Section;
