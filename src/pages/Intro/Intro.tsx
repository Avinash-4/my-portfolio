import { RefObject, useState, useEffect, useRef, memo } from "react";
import { motion, Variants } from "framer-motion";
import Particles from "@tsparticles/react";
import "./intro.css";

import IntroImg from "../../assets/images/avi-pic.jpeg";
import { introInfo } from "../../assets/data/data";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import { handleScroll } from "../../common/utils/utilities";

interface IntroProps {
  particlesReady?: boolean;
  projectsRef?: RefObject<HTMLElement>;
  contactRef?: RefObject<HTMLElement>;
}

const container: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
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

const ROLES = [
  "AI & Full Stack Engineer",
  "React & TypeScript Expert",
  "Cloud & DevOps Enthusiast",
  "Creative Problem Solver",
];

const STATS = [
  { label: "Years Exp",  value: 4,  suffix: "+", color: "#38bdf8" },
  { label: "Companies",  value: 3,  suffix: "",  color: "#a78bfa" },
  { label: "Projects",   value: 10, suffix: "+", color: "#4ade80" },
];

const TICKER_SKILLS = [
  { label: "React", color: "#61dafb" },
  { label: "TypeScript", color: "#3b82f6" },
  { label: "Java", color: "#fb923c" },
  { label: "Spring Boot", color: "#4ade80" },
  { label: "Vert.x", color: "#34d399" },
  { label: "Node.js", color: "#68d391" },
  { label: "Python", color: "#a78bfa" },
  { label: "Docker", color: "#38bdf8" },
  { label: "Kubernetes", color: "#7dd3fc" },
  { label: "GCP", color: "#f472b6" },
  { label: "PostgreSQL", color: "#818cf8" },
  { label: "Redux", color: "#a78bfa" },
];

/* ── Typewriter — isolated so its state updates don't re-render Intro ── */
function useTypewriter(words: string[], speed = 75, pause = 2200) {
  const [display, setDisplay] = useState(words[0]);
  const wordIdx = useRef(0);
  const charIdx = useRef(words[0].length);
  const phase = useRef<"pause" | "delete" | "type">("pause");

  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;

    const tick = () => {
      const word = words[wordIdx.current];

      if (phase.current === "pause") {
        t = setTimeout(() => {
          phase.current = "delete";
          tick();
        }, pause);
      } else if (phase.current === "delete") {
        if (charIdx.current > 0) {
          charIdx.current -= 1;
          setDisplay(word.slice(0, charIdx.current));
          t = setTimeout(tick, speed / 2);
        } else {
          wordIdx.current = (wordIdx.current + 1) % words.length;
          phase.current = "type";
          tick();
        }
      } else {
        const nextWord = words[wordIdx.current];
        if (charIdx.current < nextWord.length) {
          charIdx.current += 1;
          setDisplay(nextWord.slice(0, charIdx.current));
          t = setTimeout(tick, speed);
        } else {
          phase.current = "pause";
          tick();
        }
      }
    };

    t = setTimeout(tick, pause);
    return () => clearTimeout(t);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return display;
}

/* Isolated — only this tiny component re-renders on every character */
const TypewriterBadge = memo(() => {
  const role = useTypewriter(ROLES);
  return (
    <span className="premium-badge">
      <span className="badge-dot" />
      <span className="typewriter-text">
        {role}
        <span className="typewriter-cursor">|</span>
      </span>
    </span>
  );
});

/* ── Stat counter ─────────────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1400, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

const StatItem = memo(
  ({
    label,
    value,
    suffix,
    color,
    active,
  }: {
    label: string;
    value: number;
    suffix: string;
    color: string;
    active: boolean;
  }) => {
    const count = useCountUp(value, 1400, active);
    return (
      <div className="stat-item" style={{ "--stat-color": color } as React.CSSProperties}>
        <span className="stat-value">
          {count}
          {suffix}
        </span>
        <span className="stat-label">{label}</span>
        <div className={`stat-bar${active ? " active" : ""}`} />
      </div>
    );
  }
);

/* ── Particles — memoized so Intro re-renders never touch it ─────────── */
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
    modes: { grab: { distance: 160, links: { opacity: 0.25 } } },
  },
  detectRetina: true,
};

const StableParticles = memo(({ ready }: { ready?: boolean }) => {
  if (!ready) return null;
  return (
    <Particles
      id="tsparticles"
      options={particleOptions as any}
      className="intro-particles"
    />
  );
});

/* ── Skills ticker ───────────────────────────────────────────────────── */
const SkillsTicker = memo(() => {
  // Duplicate for seamless loop
  const items = [...TICKER_SKILLS, ...TICKER_SKILLS];
  return (
    <div className="skills-ticker-wrapper">
      <div className="skills-ticker">
        <div className="skills-ticker-inner">
          {items.map((s, i) => (
            <span
              key={i}
              className="ticker-chip"
              style={{ "--chip-color": s.color } as React.CSSProperties}
            >
              <span className="ticker-dot" />
              {s.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
});

/* ── Main component ──────────────────────────────────────────────────── */
export default function Intro({ particlesReady, projectsRef, contactRef }: IntroProps) {
  const reduced = useReducedMotion();
  const [statsVisible, setStatsVisible] = useState(false);
  const statsRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true); },
      { threshold: 0.4 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Native DOM tilt — zero React re-renders, won't touch cursor perf
  useEffect(() => {
    if (reduced) return;
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    if (!wrapper || !card) return;

    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transition = "transform 0.08s ease";
      card.style.transform = `rotateY(${x * 18}deg) rotateX(${-y * 14}deg)`;
    };

    const onLeave = () => {
      card.style.transition = "transform 0.7s cubic-bezier(0.22, 1, 0.36, 1)";
      card.style.transform = "rotateY(-6deg) rotateX(4deg)";
    };

    wrapper.addEventListener("mousemove", onMove);
    wrapper.addEventListener("mouseleave", onLeave);
    return () => {
      wrapper.removeEventListener("mousemove", onMove);
      wrapper.removeEventListener("mouseleave", onLeave);
    };
  }, [reduced]);

  return (
    <div className="section intro">
      <div className="ambient-bg" />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <StableParticles ready={particlesReady} />

      <div className="intro-container">
        {/* ── Left / Text ── */}
        <motion.div
          className="intro-text"
          variants={reduced ? undefined : container}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={reduced ? undefined : item} className="badge-wrapper">
            <TypewriterBadge />
          </motion.div>

          <motion.h1 variants={reduced ? undefined : item} className="hero-name">
            {introInfo.name}
          </motion.h1>

          <motion.p variants={reduced ? undefined : item} className="hero-desc">
            {introInfo.shortDesc}
          </motion.p>

          {/* Skills ticker */}
          <motion.div variants={reduced ? undefined : item}>
            <SkillsTicker />
          </motion.div>

          {/* Stat counters */}
          <motion.div
            ref={statsRef}
            variants={reduced ? undefined : item}
            className="stats-row"
          >
            {STATS.map((s) => (
              <StatItem key={s.label} {...s} active={statsVisible} />
            ))}
          </motion.div>

          {/* CTA buttons */}
          <motion.div variants={reduced ? undefined : item} className="cta-row">
            <button
              className="cta-btn cta-primary"
              onClick={() => projectsRef && handleScroll(projectsRef)}
            >
              <span className="cta-btn-inner">View My Work</span>
              <span className="cta-shine" />
            </button>
            <button
              className="cta-btn cta-secondary"
              onClick={() => contactRef && handleScroll(contactRef)}
            >
              Let's Talk
            </button>
          </motion.div>
        </motion.div>

        {/* ── Right / Image ── */}
        <motion.div
          ref={wrapperRef}
          className="intro-image-wrapper"
          initial={reduced ? false : { opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="image-container">
            {/* Floating "Currently at" chip */}
            <div className="fc-chip fc-current">
              <span className="fc-live-dot" />
              <span className="fc-text">
                <span className="fc-sub">Currently at</span>
                American Express
              </span>
            </div>

            {/* Floating location chip */}
            <div className="fc-chip fc-location">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "#a78bfa", flexShrink: 0 }}><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              Phoenix, AZ
            </div>

            {/* The tilting card */}
            <div ref={cardRef} className="image-card">
              <div className="image-glow-ring" />
              <img src={IntroImg} className="intro-img" alt={introInfo.name} />
              <div className="image-overlay" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
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
