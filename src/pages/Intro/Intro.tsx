import "./intro.css";

import IntroImg from "../../assets/images/intro-nb.png";
import { introInfo } from "../../assets/data/data";

export default function Intro() {
  return (
    <div className="section intro">
      <div className="intro-text">
        <div className="content">
          <div className="ai-badge">AI &amp; Full Stack Engineer</div>
          <div className="heading-hi">hey! I'm</div>
          <div className="heading-name">{introInfo.name}</div>
          <div className="heading-desc">{introInfo.shortDesc}</div>
        </div>
      </div>
      <div className="intro-image-container">
        <img src={IntroImg} className="intro-img" alt="intro" />
      </div>
    </div>
  );
}
