import React, { useState } from "react";

interface Props{
  postUrl?: string; // e.g. "/api/contact"
}

const ContactForm:React.FC<Props> = ({postUrl="/api/contact"})=>{
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e:React.FormEvent<HTMLFormElement>){
    e.preventDefault();
    setLoading(true);
    setError(null);
    const data = new FormData(e.currentTarget);
    try{
      const res = await fetch(postUrl,{method:"POST", body:data});
      if(!res.ok) throw new Error("Network error");
      setSent(true);
      e.currentTarget.reset();
      setTimeout(()=>setSent(false), 4000);
    }catch(err:any){
      setError(err.message);
    }finally{
      setLoading(false);
    }
  }

  return(
    <>
      <form onSubmit={handleSubmit} aria-label="contact form">
        <input className="input" name="name" placeholder="Name" required/>
        <input className="input" name="email" type="email" placeholder="Email" required/>
        <textarea className="textarea" name="message" placeholder="Message" required/>
        <input className="input" name="attachment" type="file" />
        <button className="btn" type="submit" disabled={loading}>{loading ? "Sending..." : "Submit"}</button>
      </form>
      {sent && <div className="toast" role="status">Thanks! We got your message.</div>}
      {error && <div style={{color:"crimson", marginTop:"1rem"}}>{error}</div>}
    </>
  )
}
export default ContactForm;
