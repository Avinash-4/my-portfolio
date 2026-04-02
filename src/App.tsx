import { useRef, useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

import { IPageRefs } from "./common/interfaces";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Intro from "./pages/Intro/Intro";
import Projects from "./pages/Projects/Projects";
import Skills from "./pages/Skills/Skills";
import SideNav from "./components/SideNav/SideNav";
import CustomCursor from "./components/CustomCursor/CustomCursor";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";

import "./App.css";
import { TrackerWrapper } from "./components/TrackerWrapper";
import { useIntersectionObserver } from "./common/hooks/useIntersectionObserver";
import Career from "./pages/Career/Career";

// Page title cycling
const roles = [
  "Avinash Chowdary",
  "AI Engineer",
  "Full Stack Dev",
  "@ American Express",
];

function App() {
  const refs: IPageRefs = {
    introRef: useRef<HTMLElement>(null),
    aboutRef: useRef<HTMLElement>(null),
    careerRef: useRef<HTMLElement>(null),
    skillsRef: useRef<HTMLElement>(null),
    projectsRef: useRef<HTMLElement>(null),
    contactRef: useRef<HTMLElement>(null),
  };

  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [particlesReady, setParticlesReady] = useState(false);

  const isProjectsRefActive: boolean = useIntersectionObserver(
    refs.projectsRef,
    { threshold: 0.5 }
  );

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  // Initialize tsparticles engine (once globally)
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setParticlesReady(true));
  }, []);

  // Page title cycling
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % roles.length;
      document.title = roles[i];
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <CustomCursor />

      <AnimatePresence>
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      <div className={`app ${isDarkMode ? "dark-mode" : "light-mode"}`}>
        <div className="side-nav-container">
          <SideNav
            refs={refs}
            isDarkMode={isDarkMode}
            setIsDarkMode={setIsDarkMode}
          />
        </div>
        <div className="body-container">
          <section ref={refs.introRef}>
            <Intro
              particlesReady={particlesReady}
              projectsRef={refs.projectsRef}
              contactRef={refs.contactRef}
            />
          </section>
          <section ref={refs.aboutRef}>
            <About contactRef={refs.contactRef} />
          </section>
          <section ref={refs.careerRef}>
            <Career />
          </section>
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
    </>
  );
}

const WrappedApp = () => (
  <TrackerWrapper>
    <App />
  </TrackerWrapper>
);

export { WrappedApp as App };
