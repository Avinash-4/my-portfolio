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
import { motion, AnimatePresence } from "framer-motion";

interface INavBarProps {
  refs: IPageRefs;
  isDarkMode: boolean;
  setIsDarkMode: (v: boolean) => void;
}

const NAV_ITEMS = [
  { key: "intro",    label: "Home" },
  { key: "about",    label: "About" },
  { key: "career",   label: "Career" },
  { key: "skills",   label: "Skills" },
  { key: "projects", label: "Projects" },
  { key: "contact",  label: "Contact" },
] as const;

export default function SideNav({ refs, isDarkMode, setIsDarkMode }: INavBarProps) {
  const { introRef, aboutRef, careerRef, skillsRef, projectsRef, contactRef } = refs;
  const [isWinkEye, setWinkEye] = useState(false);
  const [animatedViewerCount, setAnimatedViewerCount] = useState(0);

  const toggleDarkMode = () => {
    setWinkEye(true);
    setTimeout(() => setWinkEye(false), 220);
    setIsDarkMode(!isDarkMode);
  };

  const isIntroActive    = useIntersectionObserver(introRef,    { threshold: 0.5 });
  const isAboutActive    = useIntersectionObserver(aboutRef,    { threshold: 0.5 });
  const isCareerActive   = useIntersectionObserver(careerRef,   { threshold: 0.5 });
  const isSkillsActive   = useIntersectionObserver(skillsRef,   { threshold: 0.5 });
  const isProjectsActive = useIntersectionObserver(projectsRef, { threshold: 0.5 });
  const isContactActive  = useIntersectionObserver(contactRef,  { threshold: 0.5 });

  const activeMap: Record<string, boolean> = {
    intro:    isIntroActive,
    about:    isAboutActive,
    career:   isCareerActive,
    skills:   isSkillsActive,
    projects: isProjectsActive,
    contact:  isContactActive,
  };

  const refMap: Record<string, React.RefObject<HTMLElement>> = {
    intro:    introRef,
    about:    aboutRef,
    career:   careerRef,
    skills:   skillsRef,
    projects: projectsRef,
    contact:  contactRef,
  };

  useEffect(() => {
    fetch(process.env.VIEWERCOUNT_END_POINT || "")
      .then((x) => x.json())
      .then((res) => {
        if (res?.isSuccess && res.result?.viewerCount) {
          animateCounter(0, res.result.viewerCount);
        }
      })
      .catch(() => {});
  }, []);

  function animateCounter(start: number, end: number) {
    if (start === end) return;
    const duration = 3000;
    const increment = Math.ceil(end / (duration / 100));
    let current = start;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) { current = end; clearInterval(timer); }
      setAnimatedViewerCount(current);
    }, 100);
  }

  const activeKey = NAV_ITEMS.find((item) => activeMap[item.key])?.key ?? "";

  return (
    <div className="side-nav">
      {/* ─── Logo with spinning border ─── */}
      <div className="logo-wrapper">
        <div className="logo-ring" />
        <img
          className="logo-img"
          src={isWinkEye ? LogoWinkEye : Logo}
          alt="anufolio"
          onClick={() => handleScroll(introRef)}
          onMouseEnter={() => setWinkEye(true)}
          onMouseLeave={() => setWinkEye(false)}
          data-hover
        />
      </div>

      {/* ─── Nav Links ─── */}
      <nav className="nav-links">
        {NAV_ITEMS.map((item) => {
          const isActive = activeMap[item.key];
          return (
            <div key={item.key}>
              <div
                className={`side-nav-item${isActive ? " active" : ""}`}
                onClick={() => handleScroll(refMap[item.key])}
                data-hover
              >
                {/* Sliding layoutId indicator */}
                {isActive && (
                  <motion.div
                    className="nav-active-bar"
                    layoutId="nav-indicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="nav-label">{item.label}</span>
              </div>
              <Divider />
            </div>
          );
        })}
      </nav>

      {/* ─── Visitor Counter ─── */}
      <div className="visits">
        <span className="visits-cursor">▋</span>
        {animatedViewerCount.toLocaleString()}
      </div>

      {/* ─── Mode Toggle ─── */}
      <AnimatePresence mode="wait">
        <motion.img
          key={isDarkMode ? "light" : "dark"}
          className="view-mode"
          src={isDarkMode ? LightMode : DarkMode}
          alt="mode toggle"
          onClick={toggleDarkMode}
          data-hover
          initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 30, scale: 0.7 }}
          transition={{ duration: 0.25 }}
        />
      </AnimatePresence>
    </div>
  );
}
