import { useEffect, useRef } from "react";
import { motion, Variants } from "framer-motion";
import Particles from "@tsparticles/react";
import "./intro.css";

import IntroImg from "../../assets/images/intro-nb.png";
import { introInfo } from "../../assets/data/data";
import { useReducedMotion } from "../../hooks/useReducedMotion";

interface IntroProps {
  particlesReady: boolean;
}

const CODE_LINES = [
  "const avinash = { role: 'AI Engineer', passion: '∞' }",
  "async function ship(idea) { return await build(idea); }",
  "type Stack = 'React' | 'Java' | 'Python' | 'Azure'",
  "while (learning) { skills++; coffee++; }",
  "git commit -m 'feat: transform ideas into products'",
  "SELECT * FROM experience WHERE growth = true",
  "const impact = await Promise.all(solutions);",
];

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.048, delayChildren: 0.55 } },
};

const letter: Variants = {
  hidden: { opacity: 0, y: 44, rotateX: -30 },
  visible: {
    opacity: 1, y: 0, rotateX: 0,
    transition: { duration: 0.45, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

export default function Intro({ particlesReady }: IntroProps) {
  const reduced = useReducedMotion();
  const nameRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = nameRef.current;
    if (!el || reduced) return;
    const on  = () => el.classList.add("glitch");
    const off = () => el.classList.remove("glitch");
    el.addEventListener("mouseenter", on);
    el.addEventListener("mouseleave", off);
    return () => { el.removeEventListener("mouseenter", on); el.removeEventListener("mouseleave", off); };
  }, [reduced]);

  const particleOptions = {
    background: { color: { value: "transparent" } },
    fpsLimit: 60,
    particles: {
      color: { value: ["#00d4ff", "#a78bfa", "#00ffcc"] },
      links: {
        color: "#00d4ff", distance: 130, enable: true,
        opacity: 0.15, width: 1,
      },
      move: {
        enable: true, speed: 0.5, direction: "none" as const,
        random: true, outModes: { default: "out" as const },
      },
      number: { value: 85, density: { enable: true } },
      opacity: { value: { min: 0.08, max: 0.35 } },
      size: { value: { min: 1, max: 2.2 } },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "grab" as const },
        resize: { enable: true },
      },
      modes: { grab: { distance: 160, links: { opacity: 0.35 } } },
    },
    detectRetina: true,
  };

  return (
    <div className="section intro">

      {/* ── CSS background layers — single wrapper so .section > * doesn't displace them ── */}
      <div className="intro-bg-layer">
        <div className="intro-orb intro-orb-1" />
        <div className="intro-orb intro-orb-2" />
        <div className="intro-orb intro-orb-3" />
        <div className="intro-scanline" />
        <div className="intro-corner intro-corner-tl" />
        <div className="intro-corner intro-corner-tr" />
        <div className="intro-corner intro-corner-bl" />
        <div className="intro-corner intro-corner-br" />
      </div>

      {/* Particles — on top of CSS bg, below content */}
      {particlesReady && (
        <Particles
          id="tsparticles"
          options={particleOptions as any}
          className="intro-particles"
        />
      )}

      {/* Floating code lines */}
      {!reduced && CODE_LINES.map((line, i) => (
        <div
          key={i}
          className="code-float"
          style={{
            top: `${12 + (i * 13) % 76}%`,
            left: `${4 + (i * 17) % 42}%`,
            animationDelay: `${i * 2.8}s`,
            animationDuration: `${20 + i * 3.5}s`,
          }}
        >
          {line}
        </div>
      ))}

      {/* ─── Text Side ─── */}
      <div className="intro-text">
        <div className="content">
          {/* Badge */}
          <motion.div
            className="ai-badge"
            initial={reduced ? false : { opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "backOut" }}
          >
            <span className="badge-dot" />
            AI &amp; Full Stack Engineer
          </motion.div>

          {/* Greeting */}
          <motion.p
            className="heading-hi"
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            hey! I'm
          </motion.p>

          {/* Staggered name letters */}
          <motion.div
            className="heading-name-wrapper"
            variants={reduced ? undefined : container}
            initial="hidden"
            animate="visible"
          >
            <div
              ref={nameRef}
              className="heading-name"
              data-text={introInfo.name}
            >
              {introInfo.name.split("").map((char, i) => (
                <motion.span
                  key={i}
                  variants={reduced ? undefined : letter}
                  className="name-letter"
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {/* Description */}
          <motion.p
            className="heading-desc"
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
          >
            {introInfo.shortDesc}
          </motion.p>
        </div>
      </div>

      {/* ─── Image Side ─── */}
      <motion.div
        className="intro-image-container"
        initial={reduced ? false : { opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.9, delay: 0.55, ease: "easeOut" }}
      >
        <img src={IntroImg} className="intro-img" alt="Avinash" />
      </motion.div>

      {/* ─── Animated Welcome Kid ─── */}
      <motion.div
        className="welcome-kid"
        initial={{ opacity: 0, y: 30, scale: 0.7 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 1.8, ease: "backOut" }}
      >
        {/* Speech bubble */}
        <div className="kid-bubble">
          <span className="kid-bubble-text">Welcome!</span>
          <span className="kid-bubble-cursor">_</span>
        </div>

        {/* Character body */}
        <div className="kid-body">
          {/* Head */}
          <div className="kid-head">
            <div className="kid-visor" />
            <div className="kid-eye kid-eye-l" />
            <div className="kid-eye kid-eye-r" />
            <div className="kid-antenna">
              <div className="kid-antenna-tip" />
            </div>
          </div>
          {/* Torso */}
          <div className="kid-torso">
            <div className="kid-chest-light" />
          </div>
          {/* Arms */}
          <div className="kid-arm kid-arm-l" />
          <div className="kid-arm kid-arm-r">
            <div className="kid-hand" />
          </div>
          {/* Legs */}
          <div className="kid-legs">
            <div className="kid-leg kid-leg-l" />
            <div className="kid-leg kid-leg-r" />
          </div>
        </div>

        {/* Shadow */}
        <div className="kid-shadow" />
      </motion.div>

      {/* ─── Scroll Indicator ─── */}
      <motion.div
        className="scroll-indicator"
        animate={reduced ? {} : { y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
      >
        <div className="scroll-arrow" />
        <span className="scroll-label">scroll</span>
      </motion.div>
    </div>
  );
}
