import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import "./career.css";
import { carrerData, pageInfo, skills } from "../../assets/data/data";
import { ICareerItem } from "../../common/interfaces";

import PositionImage from "../../assets/images/position.png";
import LocationImage from "../../assets/images/location.png";
import TenureImage from "../../assets/images/tenure.png";

/* ─── Animated number counter ─── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const dur = 1400;
    const inc = to / (dur / (1000 / 60));
    let cur = 0;
    const id = setInterval(() => {
      cur += inc;
      if (cur >= to) { setVal(to); clearInterval(id); }
      else setVal(Math.floor(cur));
    }, 1000 / 60);
    return () => clearInterval(id);
  }, [inView, to]);

  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Stats bar ─── */
function StatsBar() {
  return (
    <motion.div
      className="career-stats"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.15 }}
    >
      {[
        { value: 3, suffix: "", label: "Companies" },
        { value: 4, suffix: "+", label: "Years" },
        { value: 2, suffix: "", label: "Countries" },
        { value: 15, suffix: "+", label: "Tech Skills" },
      ].map((stat, i) => (
        <div key={i} className="stat-block">
          <div className="stat-number">
            <Counter to={stat.value} suffix={stat.suffix} />
          </div>
          <div className="stat-label">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  );
}

/* ─── Radar wave rings behind each card ─── */
function CardWaves() {
  return (
    <div className="card-waves" aria-hidden="true">
      <div className="card-wave" />
      <div className="card-wave" />
    </div>
  );
}

/* ─── Ambient floating orbs ─── */
function AmbientOrbs() {
  return (
    <div className="career-ambient" aria-hidden="true">
      <div className="ambient-orb orb-1" />
      <div className="ambient-orb orb-2" />
      <div className="ambient-orb orb-3" />
    </div>
  );
}

/* ─── Skill chip (inside modal) ─── */
function SkillChip({ skillId }: { skillId: string }) {
  const skill = skills.find((s) => s.id === skillId);
  if (!skill) return null;
  return (
    <div className="skill-chip">
      <img src={skill.icon} alt={skill.techName} className="skill-chip-icon" />
      <span>{skill.techName}</span>
    </div>
  );
}

/* ═══════════════════════════════════
   MODAL
═══════════════════════════════════ */
function CareerModal({ item, onClose }: { item: ICareerItem; onClose: () => void }) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      className="career-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }}
      onClick={onClose}
    >
      <motion.div
        className="career-modal"
        /* data-lenis-prevent stops Lenis from hijacking scroll inside the modal */
        data-lenis-prevent
        initial={{ scale: 0.88, opacity: 0, y: 48 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 48 }}
        transition={{ type: "spring", damping: 22, stiffness: 310 }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}
      >
        {/* Animated glow ring behind modal */}
        <div className="modal-glow-ring" />

        {/* Blurred company logo as background */}
        <div className="modal-bg" style={{ backgroundImage: `url(${item.orgBGLogo})` }} />
        <div className="modal-bg-overlay" />

        {/* ── Header ── */}
        <div className="modal-header">
          <div className="modal-header-left">
            <div className="modal-logo-wrap">
              <img src={item.orgLogo} className="modal-logo" alt={item.orgName} />
              <div className="modal-logo-glow" />
            </div>
            <div>
              <h2 className="modal-org-name">{item.orgName}</h2>
              <div className="modal-badges">
                <span className="modal-badge position">
                  <img src={PositionImage} alt="" className="badge-icon" />
                  {item.orgPosition}
                </span>
                <span className="modal-badge tenure">
                  <img src={TenureImage} alt="" className="badge-icon" />
                  {item.orgTenure}
                </span>
                <span className="modal-badge location">
                  <img src={LocationImage} alt="" className="badge-icon" />
                  {item.location}
                </span>
              </div>
            </div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className="modal-divider" />

        {/* ── Body ── */}
        <div className="modal-body">
          {item.about && (
            <motion.div className="modal-section"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }}>
              <h3 className="modal-section-title"><span className="section-title-bar" />Overview</h3>
              <p className="modal-about">{item.about}</p>
            </motion.div>
          )}

          {item.workDone && item.workDone.length > 0 && (
            <motion.div className="modal-section"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.12 }}>
              <h3 className="modal-section-title"><span className="section-title-bar" />What I Built</h3>
              <ul className="modal-work-list">
                {item.workDone.map((work, i) => (
                  <motion.li key={i} className="modal-work-item"
                    initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.18 + i * 0.065 }}>
                    <span className="work-dot" />
                    {work}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}

          {item.highlights && item.highlights.length > 0 && (
            <motion.div className="modal-section"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.22 }}>
              <h3 className="modal-section-title"><span className="section-title-bar" />Highlights</h3>
              <div className="modal-highlights">
                {item.highlights.map((h, i) => (
                  <motion.div key={i} className="highlight-card"
                    initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + i * 0.08 }}>
                    <span className="highlight-icon">⚡</span>{h}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {item.techStack && item.techStack.length > 0 && (
            <motion.div className="modal-section"
              initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.28 }}>
              <h3 className="modal-section-title"><span className="section-title-bar" />Tech Stack</h3>
              <div className="modal-tech-stack">
                {item.techStack.map((id, i) => (
                  <motion.div key={id}
                    initial={{ opacity: 0, scale: 0.75 }} animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.36 + i * 0.05, type: "spring", stiffness: 300 }}>
                    <SkillChip skillId={id} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          <p className="modal-placeholder-note">
            ✦ More details coming soon — project specifics, metrics &amp; case studies
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ═══════════════════════════════════
   TIMELINE CARD
═══════════════════════════════════ */
function TimelineCard({
  item, index, isLatest, onClick,
}: {
  item: ICareerItem; index: number; isLatest: boolean; onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const isLeft = index % 2 === 0;

  return (
    <div className={`timeline-item ${isLeft ? "left" : "right"}`} ref={ref}>
      <div className="timeline-dot">
        <div className="dot-inner" />
        <div className="dot-ripple" />
      </div>

      <motion.div
        className="timeline-card-wrapper"
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        whileHover={{ y: -6, scale: 1.025 }}
        whileTap={{ scale: 0.97 }}
        style={{ position: 'relative', width: '100%', zIndex: 1 }}
      >
        <CardWaves />
        <div
          className={`timeline-card${isLatest ? " current" : ""}`}
          role="button"
          tabIndex={0}
          aria-label={`Open ${item.orgName} details`}
          style={{ backgroundImage: `url(${item.orgBGLogo})` }}
          onClick={onClick}
          onKeyDown={(e: React.KeyboardEvent) => e.key === "Enter" && onClick()}
        >
          <div className="card-bg-overlay" />
          <div className="card-shimmer" />

        {/* Always-visible "tap to open" corner badge */}
        <div className="card-open-badge">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="15,3 21,3 21,9" /><polyline points="9,21 3,21 3,15" />
            <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
          </svg>
          Expand
        </div>

        <div className="card-content">
          <div className="card-header">
            <img src={item.orgLogo} className="org-logo" alt={item.orgName} />
            <div className="org-name">{item.orgName}</div>
            {isLatest && (
              <span className="current-badge">
                <span className="now-dot" /> NOW
              </span>
            )}
          </div>

          <div className="card-details">
            <div className="detail-row">
              <img src={PositionImage} className="detail-icon" alt="" />
              <span>{item.orgPosition}</span>
            </div>
            <div className="detail-row">
              <img src={TenureImage} className="detail-icon" alt="" />
              <span>{item.orgTenure}</span>
            </div>
            <div className="detail-row">
              <img src={LocationImage} className="detail-icon" alt="" />
              <span>{item.location}</span>
            </div>
          </div>

          {/* Always visible click cue */}
          <div className="card-click-hint">
            <span>Click to explore</span>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9,18 15,12 9,6" />
            </svg>
          </div>
        </div>
        </div>
      </motion.div>
    </div>
  );
}

/* ═══════════════════════════════════
   PAGE
═══════════════════════════════════ */
export default function Career() {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-50px" });
  const [selectedItem, setSelectedItem] = useState<ICareerItem | null>(null);

  const sorted = [...carrerData].sort((a, b) => b.id - a.id);

  return (
    <div className="section career">
      <AmbientOrbs />

      <motion.div className="title"
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}>
        {pageInfo.career.title}
      </motion.div>
      <motion.div className="description"
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
        {pageInfo.career.description}
      </motion.div>

      <StatsBar />

      {/* "Click cards" nudge */}
      <motion.div
        className="career-explore-hint"
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <span className="explore-pulse" />
        Click any card to explore role details
      </motion.div>

      <div className="timeline-container">
        <div className="timeline-line-track">
          <motion.div
            ref={lineRef}
            className="timeline-line"
            initial={{ scaleY: 0 }}
            animate={lineInView ? { scaleY: 1 } : {}}
            transition={{ duration: 1.2, ease: "easeInOut", delay: 0.2 }}
            style={{ originY: 0 }}
          />
        </div>

        {sorted.map((item, index) => (
          <TimelineCard
            key={item.id}
            item={item}
            index={index}
            isLatest={index === 0}
            onClick={() => setSelectedItem(item)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selectedItem && (
          <CareerModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
