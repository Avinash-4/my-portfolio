import { useState } from "react";

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
import PlayIcon from "../../assets/images/play.png";
import LockIcon from "../../assets/images/lock.png";

import "./projects.css";
import ImagePreloader from "../../common/utils/utilities";

export default function Projects({ isCurrent }: { isCurrent: boolean }) {
  const [selectedProject, setSelectedProject] = useState<IProject>(
    projects[defaultProjectKey]
  );

  const [showGif, setShowGif] = useState<boolean>(false);

  const changeSelectedProject = (projectKey: string) => {
    setSelectedProject(projects[projectKey]);
    setShowGif(false);
  };

  const playSelectedProjectGIF = () => {
    setShowGif(true);
  };

  const projectCount = Object.keys(projects).length;
  const boxAnimation = Array.from({ length: projectCount }, (_, index) => {
    const percentage = 10 + index * (80 / (projectCount - 1));
    return `${percentage}% { transform: translateX(-${index * 120}%); }`;
  }).join(" ");

  return (
    <div className={`section projects${isCurrent ? " open" : ""}`}>
      <style>
        {`
        @media (max-width: 750px) {
          @keyframes rotateBox {
            ${boxAnimation}
          }
        }
        `}
      </style>
      <div className="title">{pageInfo.projects.title}</div>
      <div className="description">{pageInfo.projects.description}</div>
      <div className="content">
        <ImagePreloader
          imageUrls={[
            ...Object.values(projects).map((item) => item.image),
            ...Object.values(projects).map((item) => item.gif),
          ]}
        />
        <div className="wrapper">
          <div className="projects-details">
            <ul className="projects-list">
              {Object.keys(projects).map((projectKey) => {
                const project: IProject = projects[projectKey];
                return (
                  <li
                    className={`project-card ${
                      selectedProject.id === project.id ? "selected" : ""
                    }`}
                    style={{
                      marginRight: "3rem",
                      animation: `rotateBox ${projectCount + "s"} infinite`,
                      animationDelay: "1s",
                    }}
                    key={project.id}
                    onClick={() => changeSelectedProject(projectKey)}
                  >
                    <div className="title">{project.title}</div>
                    <img src={project.logo} className="logo" />
                  </li>
                );
              })}
            </ul>

            <div className="project-description">
              {selectedProject.description}
            </div>
            <div className="tech-stack">
              {selectedProject.techStack.map((tech) => (
                <img
                  src={skills[tech]?.icon}
                  className="tech-icon"
                  key={tech}
                />
              ))}
            </div>
            <div className="project-links">
              {selectedProject.projectLink ? (
                <a
                  href={selectedProject.projectLink}
                  target="_blank"
                  className="project-link"
                >
                  Open website <img src={NavigateIcon} className="link-icon" />
                </a>
              ) : (
                <span className="project-link private">
                  Private website <img src={LockIcon} className="link-icon" />
                </span>
              )}
              {selectedProject.githubLink ? (
                <a
                  href={selectedProject.githubLink}
                  target="_blank"
                  className="project-link"
                >
                  Github repo <img src={CodeIcon} className="link-icon" />
                </a>
              ) : (
                <span className="project-link private">
                  Private repo <img src={LockIcon} className="link-icon" />
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="project-monitor-box">
          <div className="project-monitor">
            <img
              src={MonitorImage}
              alt="Monitor"
              className="project-monitor-image"
            />
            <img
              src={!showGif ? selectedProject.image : selectedProject?.gif}
              className="project-image"
            />
            {selectedProject?.gif && (
              <img
                src={PlayIcon}
                className={showGif ? "play-icon playing" : "play-icon"}
                onClick={playSelectedProjectGIF}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
