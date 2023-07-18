import { RefObject } from "react";
import { handleScroll } from "../../common/utils/utilities";
import "./about.css";
import { pageInfo } from "../../assets/data/data";

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
          I specialize in full-stack development, creating and integrating
          data-driven applications with effective interfaces to deliver dynamic
          user experiences. I also enjoy coding as a hobby, allowing me to
          explore new technologies and push the boundaries of what's possible.
          When I'm not coding, you can usually find me playing badminton or
          watching cricket. Trying to be a better version of myself every day in
          this fast moving world.
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
