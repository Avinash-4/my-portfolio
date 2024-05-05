import { IPageRefs } from "../../common/interfaces";
import Logo from "../../assets/images/logo-nb.png";
import DarkMode from "../../assets/images/dark-mode.png";
import LightMode from "../../assets/images/light-mode.png";
import "./sidenav.css";
import Divider from "../Divider";
import { handleScroll } from "../../common/utils/utilities";
import { useIntersectionObserver } from "../../common/hooks/useIntersectionObserver";

interface INavBarProps {
  refs: IPageRefs;
  isDarkMode: boolean;
  setIsDarkMode: any;
}

export default function SideNav(props: INavBarProps) {
  const {
    introRef,
    aboutRef,
    careerHZRef,
    skillsRef,
    projectsRef,
    contactRef,
  } = props.refs;

  const { isDarkMode, setIsDarkMode } = props;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const isIntroRefActive: boolean = useIntersectionObserver(introRef, {
    threshold: 0.5,
  });

  const isAboutRefActive: boolean = useIntersectionObserver(aboutRef, {
    threshold: 0.5,
  });

  const isCareerHZRefActive: boolean = useIntersectionObserver(careerHZRef, {
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

  return (
    <div className="side-nav">
      <img
        className="logo-img"
        src={Logo}
        alt="anufolio"
        onClick={() => handleScroll(introRef)}
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
          className={`side-nav-item ${isCareerHZRefActive && "active"}`}
          onClick={() => handleScroll(careerHZRef)}
        >
          Career
        </div>
        <Divider />
        {/* <div className="side-nav-item" onClick={() => handleScroll(careerRef)}>
          Career
        </div>
        <Divider /> */}
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
      <img
        className="view-mode"
        src={isDarkMode ? LightMode : DarkMode}
        alt="mode"
        onClick={toggleDarkMode}
      />
    </div>
  );
}
