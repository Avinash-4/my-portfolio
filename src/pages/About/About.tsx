import { RefObject } from "react";
import { handleScroll } from "../../common/utils/utilities";
import "./about.css";
import { pageInfo, aboutInfo } from "../../assets/data/data";

export default function About({
  contactRef,
}: {
  contactRef: RefObject<HTMLElement>;
}) {
  return (
    <div className="section about">
      <div className="title">{pageInfo.about.title}</div>
      <div className="description">{pageInfo.about.description}</div>
      <div className="container">
        <div className="content">
          {aboutInfo}
          <br />
          <br />
          <div
            onClick={() => handleScroll(contactRef)}
            className="contact-link"
          >
            Let's make something special {":)"}
          </div>
        </div>
      </div>
    </div>
  );
}
