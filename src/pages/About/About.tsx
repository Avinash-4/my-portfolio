import { RefObject, useRef, useEffect, useState, memo } from "react";
import { motion, useInView } from "framer-motion";
import { handleScroll } from "../../common/utils/utilities";
import "./about.css";
import { pageInfo, aboutInfo } from "../../assets/data/data";

const stats = [
  { value: 4,  suffix: "+", label: "Years Exp.", color: "#38bdf8" },
  { value: 3,  suffix: "",  label: "Companies",  color: "#a78bfa" },
  { value: 10, suffix: "+", label: "Projects",   color: "#4ade80" },
];

const traits = [
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
      </svg>
    ),
    label: "Clean Code",
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
      </svg>
    ),
    label: "Agile Mindset",
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"/>
      </svg>
    ),
    label: "AI-Driven",
  },
  {
    icon: (
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
    label: "Team-First",
  },
];

const expertise = [
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
      </svg>
    ),
    title: "Frontend",
    color: "#38bdf8",
    tags: ["React", "TypeScript", "Redux", "Material UI"],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="8" rx="2"/><rect x="2" y="14" width="20" height="8" rx="2"/><path d="M6 6h.01M6 18h.01"/>
      </svg>
    ),
    title: "Backend",
    color: "#a78bfa",
    tags: ["Java", "Spring Boot", "Vert.x", "Node.js"],
  },
  {
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"/>
      </svg>
    ),
    title: "Cloud & DevOps",
    color: "#4ade80",
    tags: ["GCP", "Azure", "Docker", "Kubernetes"],
  },
];

function useCountUp(target: number, duration = 1400, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [active, target, duration]);
  return count;
}

const StatChip = memo(
  ({
    value, suffix, label, color, active, delay,
  }: {
    value: number; suffix: string; label: string;
    color: string; active: boolean; delay: number;
  }) => {
    const count = useCountUp(value, 1400, active);
    return (
      <motion.div
        className="stat-chip"
        style={{ "--chip-accent": color } as React.CSSProperties}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={active ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.45, delay, ease: "backOut" }}
      >
        <div className="chip-glow-blob" />
        <span className="stat-value">{count}{suffix}</span>
        <span className="stat-label">{label}</span>
        <div className={`chip-bar${active ? " active" : ""}`} />
      </motion.div>
    );
  }
);

export default function About({ contactRef }: { contactRef: RefObject<HTMLElement> }) {
  const sentinelRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sentinelRef, { once: true, margin: "-80px" });

  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // Native 3D tilt — no React state, no re-renders
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const card = cardRef.current;
    if (!wrapper || !card) return;

    const onMove = (e: MouseEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transition = "transform 0.1s ease";
      card.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 8}deg)`;
    };

    const onLeave = () => {
      card.style.transition = "transform 0.65s cubic-bezier(0.22, 1, 0.36, 1)";
      card.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
    };

    wrapper.addEventListener("mousemove", onMove);
    wrapper.addEventListener("mouseleave", onLeave);
    return () => {
      wrapper.removeEventListener("mousemove", onMove);
      wrapper.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="section about">
      <motion.div
        className="title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {pageInfo.about.title}
      </motion.div>
      <motion.div
        className="description"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {pageInfo.about.description}
      </motion.div>

      <div className="container">
        {/* Wrapper carries the spinning glow border + tilt listener */}
        <div ref={wrapperRef} className="content-wrapper">
          <motion.div
            ref={sentinelRef}
            className="content"
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {/* Current role strip */}
            <motion.div
              className="current-strip"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <span className="strip-live-dot" />
              <span className="strip-item strip-role">Software AI Engineer</span>
              <span className="strip-sep">·</span>
              <span className="strip-item strip-company">American Express</span>
              <span className="strip-sep">·</span>
              <span className="strip-item strip-location">
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                Phoenix, AZ
              </span>
            </motion.div>

            <p className="about-text">{aboutInfo}</p>

            {/* Expertise pillars */}
            <div className="expertise-row">
              {expertise.map((e, i) => (
                <motion.div
                  key={e.title}
                  className="expertise-card"
                  style={{ "--exp-color": e.color } as React.CSSProperties}
                  initial={{ opacity: 0, y: 18 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div className="exp-icon">{e.icon}</div>
                  <span className="exp-title">{e.title}</span>
                  <div className="exp-tags">
                    {e.tags.map(t => <span key={t} className="exp-tag">{t}</span>)}
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="stat-chips">
              {stats.map((s, i) => (
                <StatChip
                  key={s.label}
                  {...s}
                  active={isInView}
                  delay={0.35 + i * 0.12}
                />
              ))}
            </div>

            {/* Traits row */}
            <motion.div
              className="traits-row"
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              {traits.map((t) => (
                <span key={t.label} className="trait-tag">
                  {t.icon}
                  {t.label}
                </span>
              ))}
            </motion.div>

            <div
              onClick={() => handleScroll(contactRef)}
              className="contact-link"
              data-hover
            >
              Let's make something special &rarr;
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
