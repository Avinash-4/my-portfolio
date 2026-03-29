import { CSSProperties, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { pageInfo, skills } from "../../assets/data/data";
import { ExperienceType, ISkill } from "../../common/interfaces";
import { useReducedMotion } from "../../hooks/useReducedMotion";
import "./skills.css";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.7, y: 20 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] } },
};

function SkillCard3D({
  skill,
  isTouchDevice,
  onDragStart,
  onDragEnd,
  onClick,
}: {
  skill: ISkill;
  isTouchDevice: boolean;
  onDragStart: (e: React.DragEvent<HTMLDivElement>, s: ISkill) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
  onClick: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const rx = ((e.clientY - cy) / (rect.height / 2)) * -12;
    const ry = ((e.clientX - cx) / (rect.width / 2)) * 12;
    ref.current.style.transform = `perspective(600px) rotateX(${rx}deg) rotateY(${ry}deg) scale(1.12)`;
    ref.current.style.boxShadow = `${-ry * 0.5}px ${rx * 0.5}px 20px var(--glow)`;
  };

  const handleMouseLeave = () => {
    if (!ref.current) return;
    ref.current.style.transform = "";
    ref.current.style.boxShadow = "";
  };

  return (
    <motion.li variants={cardVariants}>
      <div
        ref={ref}
        className={`skill-card ${isTouchDevice ? "touch" : ""}${!skill.isActive ? " inactive" : ""}`}
        draggable
        onDragStart={(e) => onDragStart(e, skill)}
        onDragEnd={onDragEnd}
        onClick={onClick}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        data-hover
        title={skill.techName}
      >
        <img src={skill.icon} className="skill-image" draggable={false} />
        {!skill.isActive && <span className="archived-label">Archive</span>}
      </div>
    </motion.li>
  );
}

export default function Skills() {
  const [dragStarted, setDragStarted] = useState<boolean>(false);
  const currentSkillLevelInDegrees = useRef<string>("-90deg");
  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    setIsTouchDevice(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, skill: ISkill) => {
    setDragStarted(true);
    e.dataTransfer.setData("text/plain", JSON.stringify(skill));
  };
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); setDragStarted(false); };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setSelectedSkill(JSON.parse(e.dataTransfer.getData("text/plain")));
    setDragStarted(false);
  };

  const getExperience = (type: ExperienceType, start: string, end: string): string => {
    const closing = type === "relative" ? new Date() : new Date(end.slice(0, 2) + "/01/" + end.slice(3));
    const cy = closing.getFullYear(), sy = Number(start.slice(3));
    let diff = cy > sy
      ? (cy - sy - 1) * 12 + 12 - Number(start.slice(0, 2)) + (closing.getMonth() + 1)
      : closing.getMonth() + 1 - Number(start.slice(0, 2));
    return diff > 0 ? (diff / 12).toFixed(1) : "0";
  };

  const handleTouchClick = (skill: ISkill) => {
    if (skill.id === selectedSkill?.id || !isTouchDevice) return;
    setSelectedSkill(null);
    setTimeout(() => setSelectedSkill(skill), 1);
  };

  const getSkillLevelInDegrees = (pct: number): string => {
    const deg = pct * 1.9 - 90;
    setTimeout(() => { currentSkillLevelInDegrees.current = `${deg}deg`; }, 1);
    return `${deg}deg`;
  };

  const activeSkills = skills.filter((s) => s.isActive).sort((a, b) => a.displayOrder - b.displayOrder);
  const allSkills = skills.sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="section skills">
      <motion.div className="title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        {pageInfo.skills.title}
      </motion.div>
      <motion.div className="description" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
        {pageInfo.skills.description}
      </motion.div>

      <div className="content">
        <div className="wrapper">
          <div className="scroll-container">
            <motion.ul
              className="skills-basket"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
            >
              {allSkills.map((skill) => (
                <SkillCard3D
                  key={skill.id}
                  skill={skill}
                  isTouchDevice={isTouchDevice}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                  onClick={() => handleTouchClick(skill)}
                />
              ))}
            </motion.ul>
          </div>
        </div>

        <motion.div
          className={`skill-selector${dragStarted ? " dragging" : ""}${selectedSkill ? " dropped" : ""}`}
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="box-rail first-rail">
            <div className="drop-receiver" onDragOver={handleDragOver} onDrop={handleDrop}>
              {selectedSkill && <img src={selectedSkill.icon} className="skill-image" />}
            </div>
            <div className="box-title">
              {selectedSkill ? selectedSkill.techName : "Drop a skill"}
            </div>
          </div>
          <div className="box-rail second-rail">
            <div className="box-description">
              {selectedSkill
                ? selectedSkill.description
                : "Drag a skill into the circle. On mobile, tap to select."}
            </div>
          </div>
          <div className="box-rail third-rail">
            <div className="experience-count">
              <div>Experience</div>
              <div className="exp-value">
                {selectedSkill && getExperience(
                  selectedSkill.experienceType,
                  selectedSkill.startDate,
                  selectedSkill.experienceType === "fixed" ? selectedSkill.endDate : ""
                )}
                {selectedSkill && " yrs"}
              </div>
            </div>
            <div className="skill-meter-box">
              <div
                className="skill-meter"
                style={{
                  "--exisiting-skill-percentage": currentSkillLevelInDegrees.current,
                  "--skill-percentage": selectedSkill
                    ? getSkillLevelInDegrees(selectedSkill.skillLevelPercentage)
                    : "-90deg",
                } as CSSProperties}
              >
                <div className="block first" data-name="Novice" />
                <div className="block second" data-name="Beginner" />
                <div className="block third" data-name="Intermediate" />
                <div className="block fourth" data-name="Advanced" />
                <div className="block fifth" data-name="Expert" />
                <div className="meter-pin" />
                <div className="meter-bob" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
