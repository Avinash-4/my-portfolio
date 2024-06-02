import { IPageRefs } from "../../common/interfaces";
import Logo from "../../assets/images/logo.png";
import LogoWinkEye from "../../assets/images/logo-wink.png";
import DarkMode from "../../assets/images/dark-mode.png";
import LightMode from "../../assets/images/light-mode.png";
import "./sidenav.css";
import Divider from "../Divider";
import { handleScroll } from "../../common/utils/utilities";
import { useIntersectionObserver } from "../../common/hooks/useIntersectionObserver";
import { useEffect, useState } from "react";

interface INavBarProps {
  refs: IPageRefs;
  isDarkMode: boolean;
  setIsDarkMode: any;
}

export default function SideNav(props: INavBarProps) {
  const { introRef, aboutRef, careerRef, skillsRef, projectsRef, contactRef } =
    props.refs;

  const { isDarkMode, setIsDarkMode } = props;

  const toggleDarkMode = () => {
    setWinkEye(true);
    setTimeout(() => {
      setWinkEye(false);
    }, 200);
    setIsDarkMode(!isDarkMode);
  };

  const isIntroRefActive: boolean = useIntersectionObserver(introRef, {
    threshold: 0.5,
  });

  const isAboutRefActive: boolean = useIntersectionObserver(aboutRef, {
    threshold: 0.5,
  });

  const isCareerRefActive: boolean = useIntersectionObserver(careerRef, {
    threshold: 0.5,
  });

  const isSkillsRefActive: boolean = useIntersectionObserver(skillsRef, {
    threshold: 0.5,
  });

  const isProjectsRefActive: boolean = useIntersectionObserver(projectsRef, {
    threshold: 0.5,
  });

  const isContactRefActive: boolean = useIntersectionObserver(contactRef, {
    threshold: 0.5,
  });

  const [isWinkEye, setWinkEye] = useState(false);
  const [animatedViewerCount, setAnimatedViewerCount] = useState(0);

  useEffect(() => {
    getViewerCount();
  }, []);

  function getViewerCount() {
    fetch(process.env.VIEWERCOUNT_END_POINT || "")
      .then((x) => x.json())
      .then((response) => {
        if (response?.isSuccess && response.result?.viewerCount) {
          animateCounter(0, response.result?.viewerCount);
        }
      });
  }

  function animateCounter(start: number, end: number) {
    if (start === end) return;
    const duration = 3000;
    const increment = Math.ceil(end / (duration / 100));
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }
      setAnimatedViewerCount(current);
    }, 100);
  }

  return (
    <div className="side-nav">
      <img
        className="logo-img"
        src={isWinkEye ? LogoWinkEye : Logo}
        alt="anufolio"
        onClick={() => handleScroll(introRef)}
        onMouseEnter={() => setWinkEye(true)}
        onMouseLeave={() => setWinkEye(false)}
      />
      <div className="nav-links">
        <div
          className={`side-nav-item ${isIntroRefActive && "active"}`}
          onClick={() => handleScroll(introRef)}
        >
          Home
        </div>
        <Divider />
        <div
          className={`side-nav-item ${isAboutRefActive && "active"}`}
          onClick={() => handleScroll(aboutRef)}
        >
          About
        </div>
        <Divider />
        <div
          className={`side-nav-item ${isCareerRefActive && "active"}`}
          onClick={() => handleScroll(careerRef)}
        >
          Career
        </div>
        <Divider />
        <div
          className={`side-nav-item ${isSkillsRefActive && "active"}`}
          onClick={() => handleScroll(skillsRef)}
        >
          Skills
        </div>
        <Divider />
        <div
          className={`side-nav-item ${isProjectsRefActive && "active"}`}
          onClick={() => handleScroll(projectsRef)}
        >
          Projects
        </div>
        <Divider />
        <div
          className={`side-nav-item ${isContactRefActive && "active"}`}
          onClick={() => handleScroll(contactRef)}
        >
          Contact
        </div>
      </div>
      <div className="visits">Visits: {animatedViewerCount}</div>
      <img
        className="view-mode"
        src={isDarkMode ? LightMode : DarkMode}
        alt="mode"
        onClick={toggleDarkMode}
      />
    </div>
  );
}
