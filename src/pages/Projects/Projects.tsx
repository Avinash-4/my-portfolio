import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  defaultProjectKey,
  pageInfo,
  projects,
  skills,
} from "../../assets/data/data";
import MonitorImage from "../../assets/images/monitor.png";
import { IProject } from "../../common/interfaces";
import NavigateIcon from "../../assets/images/navigate.png";
import CodeIcon from "../../assets/images/code.png";
import LockIcon from "../../assets/images/lock.png";
import "./projects.css";
import ImagePreloader from "../../common/utils/utilities";

const PROJECT_ICONS: Record<string, JSX.Element> = {
  dashboard: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
      <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
    </svg>
  ),
  "ai-governance": (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-1H1a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A1.5 1.5 0 0 0 6 14.5 1.5 1.5 0 0 0 7.5 16 1.5 1.5 0 0 0 9 14.5 1.5 1.5 0 0 0 7.5 13m9 0A1.5 1.5 0 0 0 15 14.5 1.5 1.5 0 0 0 16.5 16 1.5 1.5 0 0 0 18 14.5 1.5 1.5 0 0 0 16.5 13z"/>
    </svg>
  ),
  pro4: (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>
    </svg>
  ),
  "website-tracker": (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
    </svg>
  ),
  "cube-chat": (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
    </svg>
  ),
};

export default function Projects({ isCurrent }: { isCurrent: boolean }) {
  const [selectedProject, setSelectedProject] = useState<IProject>(
    projects[defaultProjectKey]
  );
  const [showGif, setShowGif] = useState<boolean>(false);
  const monitorRef = useRef<HTMLDivElement>(null);

  const changeSelectedProject = (projectKey: string) => {
    setSelectedProject(projects[projectKey]);
    setShowGif(false);
  };

  const playSelectedProjectGIF = () => setShowGif(true);

  // 3D tilt on monitor hover
  const handleMonitorMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = monitorRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -6;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 6;
    el.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.03)`;
  };

  const handleMonitorLeave = () => {
    if (monitorRef.current) monitorRef.current.style.transform = "";
  };

  return (
    <div className={`section projects${isCurrent ? " open" : ""}`}>

      <motion.div
        className="title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {pageInfo.projects.title}
      </motion.div>
      <motion.div
        className="description"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {pageInfo.projects.description}
      </motion.div>

      <div className="content">
        <ImagePreloader
          imageUrls={[
            ...Object.values(projects).map((p) => p.image),
            ...Object.values(projects).map((p) => p.gif),
          ]}
        />

        {/* ─── Left: Details Panel ─── */}
        <motion.div
          className="wrapper"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="projects-details">
            {/* Project tabs — auto-scrolling ticker */}
            <div className="projects-list-wrapper">
              <div className="projects-list-track">
                {[...Object.keys(projects), ...Object.keys(projects)].map((key, i) => {
                  const project = projects[key];
                  const isSelected = selectedProject.id === project.id;
                  return (
                    <motion.div
                      key={`${project.id}-${i}`}
                      className={`project-card${isSelected ? " selected" : ""}`}
                      onClick={() => changeSelectedProject(key)}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      data-hover
                    >
                      <span className="project-card-icon">{PROJECT_ICONS[project.id]}</span>
                      <div className="title">{project.title}</div>
                      {project.logo && <img src={project.logo} className="logo" />}
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id + "-desc"}
                className="project-description"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {selectedProject.description}
              </motion.div>
            </AnimatePresence>

            {/* Tech stack */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedProject.id + "-tech"}
                className="tech-stack"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {selectedProject.techStack.map((tech) => (
                  <motion.img
                    key={tech}
                    src={skills.find((x) => x.id === tech)?.icon}
                    className="tech-icon"
                    whileHover={{ scale: 1.25, y: -4 }}
                    transition={{ type: "spring", stiffness: 400 }}
                    title={tech}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Links */}
            <div className="project-links">
              {selectedProject.projectLink ? (
                <a
                  href={selectedProject.projectLink}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                  data-hover
                >
                  Live Site
                  <img src={NavigateIcon} className="link-icon" alt="" />
                </a>
              ) : (
                <span className="project-link private">
                  Private
                  <img src={LockIcon} className="link-icon" alt="" />
                </span>
              )}
              {selectedProject.githubLink ? (
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  rel="noreferrer"
                  className="project-link"
                  data-hover
                >
                  GitHub
                  <img src={CodeIcon} className="link-icon" alt="" />
                </a>
              ) : (
                <span className="project-link private">
                  Private Repo
                  <img src={LockIcon} className="link-icon" alt="" />
                </span>
              )}
            </div>
          </div>
        </motion.div>

        {/* ─── Right: Monitor ─── */}
        <motion.div
          className="project-monitor-box"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div
            ref={monitorRef}
            className="project-monitor"
            onMouseMove={handleMonitorMove}
            onMouseLeave={handleMonitorLeave}
          >
            <img src={MonitorImage} className="project-monitor-image" alt="Monitor" />
            <AnimatePresence mode="wait">
              {selectedProject.image ? (
                <motion.img
                  key={selectedProject.id + "-img"}
                  src={showGif ? selectedProject.gif : selectedProject.image}
                  className="project-image"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  alt={selectedProject.title}
                />
              ) : (
                <motion.div
                  key={selectedProject.id + "-private"}
                  className="project-image project-private-screen"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  <span>Confidential</span>
                  <span className="private-sub">Enterprise / NDA</span>
                </motion.div>
              )}
            </AnimatePresence>
            {selectedProject.gif && (
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%2300d4ff' d='M8 5v14l11-7z'/%3E%3C/svg%3E"
                className={`play-icon${showGif ? " playing" : ""}`}
                onClick={playSelectedProjectGIF}
                alt="Play"
              />
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
