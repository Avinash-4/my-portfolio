import { RefObject, useState } from "react";

import { ImageBase64URLs } from "../../assets/images/ImageBase64URLs";
import Logo from "../../assets/images/logo.png";
import { IPageRefs } from "../../common/interfaces";
import { handleScroll } from "../../common/utils/utilities";
import "./navbar.css";

interface INavBarProps {
  refs: IPageRefs;
}

export default function NavBar(props: INavBarProps) {
  const { introRef, aboutRef, careerRef, skillsRef, projectsRef, contactRef } =
    props.refs;

  const [isNavLinksDropdownOpen, setIsNavLinksDropdownOpen] =
    useState<boolean>(false);

  const toggleNavlinksDropdown = () => {
    setIsNavLinksDropdownOpen(!isNavLinksDropdownOpen);
  };

  return (
    <div className="navbar">
      <img
        className="logo-img"
        src={Logo}
        alt="portfolio-logo"
        onClick={() => handleScroll(introRef)}
      />
      <div
        className={
          isNavLinksDropdownOpen
            ? "nav-links-collapsable-container active"
            : "nav-links-collapsable-container"
        }
      >
        <div className="toggle-buttons-container">
          <img
            className="toggle-open-img"
            onClick={toggleNavlinksDropdown}
            src={ImageBase64URLs.toggleOpen}
            alt="toggle-open"
          />
          <img
            onClick={toggleNavlinksDropdown}
            className="toggle-close-img"
            src={ImageBase64URLs.toggleClose}
            alt="toggle-close"
          />
        </div>
        <ul className="links">
          <li className="link" onClick={() => handleScroll(aboutRef)}>
            About
          </li>
          <li className="link" onClick={() => handleScroll(careerRef)}>
            Career
          </li>
          <li className="link" onClick={() => handleScroll(skillsRef)}>
            Skills
          </li>
          <li className="link" onClick={() => handleScroll(projectsRef)}>
            Projects
          </li>
          <li className="link" onClick={() => handleScroll(contactRef)}>
            Contact
          </li>
        </ul>
      </div>
    </div>
  );
}
