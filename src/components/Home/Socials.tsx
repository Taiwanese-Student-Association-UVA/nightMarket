import { useState } from "react";
import {
  IG,
  FB,
  LI,
  IGhover,
  FBhover,
  LIhover,
} from "../../assets/buttons/index";

const Socials = () => {
  const [instagramImg, setInstagramImg] = useState(IG);
  const [facebookImg, setFacebookImg] = useState(FB);
  const [linkedinImg, setLinkedinImg] = useState(LI);
  return (
    <>
      <a
        href="https://www.instagram.com/tsaatuva?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
        target="_blank"
        rel="noreferrer"
        onMouseOver={() => setInstagramImg(IGhover)}
        onMouseOut={() => setInstagramImg(IG)}
      >
        <img src={instagramImg} alt="Button for the TSA Instagram account" />
      </a>
      <a
        href="https://www.facebook.com/groups/tsaatuva"
        target="_blank"
        rel="noreferrer"
        onMouseOver={() => setFacebookImg(FBhover)}
        onMouseOut={() => setFacebookImg(FB)}
      >
        <img src={facebookImg} alt="Button for the TSA Facebook account" />
      </a>
      <a
        href="https://www.linkedin.com/company/tsaatuva/"
        target="_blank"
        rel="noreferrer"
        onMouseOver={() => setLinkedinImg(LIhover)}
        onMouseOut={() => setLinkedinImg(LI)}
      >
        <img src={linkedinImg} alt="Button for the TSA LinkedIn account" />
      </a>
    </>
  );
};

export default Socials;
