import { motion, Variants } from "framer-motion";
import Particles from "@tsparticles/react";
import "./intro.css";

import IntroImg from "../../assets/images/avi-pic.jpeg";
import { introInfo } from "../../assets/data/data";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface IntroProps {
  particlesReady?: boolean;
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Intro({ particlesReady }: IntroProps) {
  const reduced = useReducedMotion();

  const particleOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      color: { value: ["#ffffff", "#94a3b8", "#38bdf8"] },
      links: {
        color: "#ffffff",
        distance: 140,
        enable: true,
        opacity: 0.08,
        width: 1,
      },
      move: {
        enable: true,
        speed: 0.4,
        direction: "none" as const,
        random: true,
        outModes: { default: "out" as const },
      },
      number: { value: 70, density: { enable: true } },
      opacity: { value: { min: 0.05, max: 0.15 } },
      size: { value: { min: 1, max: 2 } },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" as const },
        resize: { enable: true },
      },
      modes: { grab: { distance: 160, links: { opacity: 0.2 } } },
    },
    detectRetina: true,
  };

  return (
    <div className="section intro">
      {/* Refined Ambient Background Layer */}
      <div className="ambient-bg" />

      {particlesReady && (
        <Particles
          id="tsparticles"
          options={particleOptions as any}
          className="intro-particles"
        />
      )}

      <div className="intro-container">
        {/* Text Section */}
        <motion.div
          className="intro-text"
          variants={reduced ? undefined : container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={reduced ? undefined : item} className="badge-wrapper">
            <span className="premium-badge">
              <span className="badge-dot" />
              AI & Full Stack Engineer
            </span>
          </motion.div>

          <motion.h1 variants={reduced ? undefined : item} className="hero-name">
            {introInfo.name}
          </motion.h1>

          <motion.p variants={reduced ? undefined : item} className="hero-desc">
            {introInfo.shortDesc}
          </motion.p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          className="intro-image-wrapper"
          initial={reduced ? false : { opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="image-card">
            <img src={IntroImg} className="intro-img" alt={introInfo.name} />
            <div className="image-overlay" />
          </div>
        </motion.div>
      </div>

      {/* Elegant Scroll Indicator */}
      <motion.div
        className="scroll-indicator"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <div className="scroll-line" />
        <span className="scroll-text">SCROLL</span>
      </motion.div>
    </div>
  );
}
