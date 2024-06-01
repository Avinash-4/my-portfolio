import { useRef, useState } from "react";

import { IPageRefs } from "./common/interfaces";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Intro from "./pages/Intro/Intro";
import Projects from "./pages/Projects/Projects";
import Skills from "./pages/Skills/Skills";
import SideNav from "./components/SideNav/SideNav";

import "./App.css";
import { TrackerWrapper } from "./components/TrackerWrapper";
import { useIntersectionObserver } from "./common/hooks/useIntersectionObserver";
import Career from "./pages/Career/Career";

function App() {
  const refs: IPageRefs = {
    introRef: useRef<HTMLElement>(null),
    aboutRef: useRef<HTMLElement>(null),
    careerHZRef: useRef<HTMLElement>(null),
    careerRef: useRef<HTMLElement>(null),
    skillsRef: useRef<HTMLElement>(null),
    projectsRef: useRef<HTMLElement>(null),
    contactRef: useRef<HTMLElement>(null),
  };
  const [isDarkMode, setIsDarkMode] = useState(true);

  const isCareerHZRefActive: boolean = useIntersectionObserver(
    refs.careerHZRef,
    {
      threshold: 0.5,
    }
  );

  const isProjectsRefActive: boolean = useIntersectionObserver(
    refs.projectsRef,
    {
      threshold: 0.5,
    }
  );

  return (
    <div className={`app ${isDarkMode ? " dark-mode" : " light-mode"}`}>
      <div className="side-nav-container">
        <SideNav
          refs={refs}
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
        />
      </div>
      <div className="body-container">
        <section ref={refs.introRef}>
          <Intro />
        </section>
        <section ref={refs.aboutRef}>
          <About contactRef={refs.contactRef} />
        </section>
        <section ref={refs.careerHZRef}>
          <Career isActive={isCareerHZRefActive} />
        </section>
        {/* <section ref={refs.careerRef}>
          <Career />
        </section> */}
        <section ref={refs.skillsRef}>
          <Skills />
        </section>
        <section ref={refs.projectsRef}>
          <Projects isCurrent={isProjectsRefActive} />
        </section>
        <section ref={refs.contactRef}>
          <Contact />
        </section>
      </div>
    </div>
  );
}

const WrappedApp = () => (
  <TrackerWrapper>
    <App />
  </TrackerWrapper>
);

export { WrappedApp as App };
