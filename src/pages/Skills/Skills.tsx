import { CSSProperties, useEffect, useRef, useState } from "react";
import { pageInfo, skills } from "../../assets/data/data";
import { ExperienceType, ISkill } from "../../common/interfaces";
import "./skills.css";

export default function Skills() {
  const [dragStarted, setDragStarted] = useState<boolean>(false);
  const currentSkillLevelInDegrees = useRef<string>("-90deg");
  const [selectedSkill, setSelectedSkill] = useState<ISkill | null>(null);
  const [isTouchDevice, setIsTouchDevice] = useState<boolean>(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(pointer: coarse)");
    setIsTouchDevice(mediaQuery.matches);
  }, []);

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    skill: ISkill
  ) => {
    setDragStarted(true);
    e.dataTransfer.setData("text/plain", JSON.stringify(skill));
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragStarted(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedItem = JSON.parse(e.dataTransfer.getData("text/plain"));
    setSelectedSkill(droppedItem);
    setDragStarted(false);
  };

  const getExperience = (
    experienceType: ExperienceType,
    startDate: string,
    endDate: string
  ): string => {
    const closingDate =
      experienceType === "relative"
        ? new Date()
        : new Date(endDate.slice(0, 2) + "/01/" + endDate.slice(3));
    const closingYear: number = closingDate.getFullYear();
    const exprienceYear: number = Number(startDate.slice(3));
    let monthDiff = 0;
    if (closingYear > exprienceYear) {
      monthDiff =
        (closingYear - exprienceYear - 1) * 12 +
        12 -
        Number(startDate.slice(0, 2)) +
        (closingDate.getMonth() + 1);
    } else {
      monthDiff = closingDate.getMonth() + 1 - Number(startDate.slice(0, 2));
    }
    return monthDiff > 0 ? (monthDiff / 12).toFixed(1) : "0";
  };

  const handleSkillClickForTouchDevices = (skill: ISkill) => {
    if (skill.id === selectedSkill?.id) return;
    if (isTouchDevice) {
      setSelectedSkill(null);
      let timerId: any;
      timerId = setTimeout(() => {
        setSelectedSkill(skill);
        clearTimeout(timerId);
      }, 1);
    }
  };

  const getSkillLevelInDegrees = (skillLevelPercentage: number): string => {
    const degree = skillLevelPercentage * 1.9 - 90;
    let timer: any;
    timer = setTimeout(() => {
      currentSkillLevelInDegrees.current = `${degree}deg`;
      clearTimeout(timer);
    }, 1);
    return `${degree}deg`;
  };

  return (
    <div className="section skills">
      <div className="title">{pageInfo.skills.title}</div>
      <div className="description">{pageInfo.skills.description}</div>
      <div className="content">
        <div className="wrapper">
          <div className="scroll-container">
            <ul className="skills-basket">
              {Object.keys(skills).map((skillKey) => {
                const skill = skills[skillKey];
                if (skill.isActive) {
                  return (
                    <li key={skill.id}>
                      <div
                        key={skill.id}
                        className={`skill-card ${isTouchDevice ? "touch" : ""}`}
                        draggable
                        onDragStart={(e) => handleDragStart(e, skill)}
                        onDragEnd={handleDragEnd}
                        onClick={() => handleSkillClickForTouchDevices(skill)}
                      >
                        <img
                          src={skill.icon}
                          className="skill-image"
                          draggable={false}
                        />
                      </div>
                    </li>
                  );
                }
              })}
            </ul>
          </div>
        </div>

        <div
          className={`skill-selector${dragStarted ? " dragging" : ""}${
            selectedSkill ? " dropped" : ""
          }`}
        >
          <div className="box-rail first-rail">
            <div
              className="drop-receiver"
              onDragOver={(e) => handleDragOver(e)}
              onDrop={(e) => handleDrop(e)}
            >
              {selectedSkill && (
                <img src={selectedSkill.icon} className="skill-image" />
              )}
            </div>
            <div className="box-title">
              {selectedSkill ? selectedSkill.techName : "Drop a skill"}
            </div>
          </div>
          <div className="box-rail second-rail">
            <div className="box-description">
              {selectedSkill
                ? selectedSkill.description
                : "Simply drag a skill from the available skillset and drop it into the circle above. If you are using a mobile phone, you can tap on the skill to select it."}
            </div>
          </div>
          <div className="box-rail third-rail">
            <div className="experience-count">
              <div>Experience in years</div>
              <div>
                {selectedSkill &&
                  getExperience(
                    selectedSkill.experienceType,
                    selectedSkill.startDate,
                    selectedSkill.experienceType === "fixed"
                      ? selectedSkill.endDate
                      : ""
                  )}
              </div>
            </div>
            <div className="skill-meter-box">
              <div
                className="skill-meter"
                style={
                  {
                    "--exisiting-skill-percentage":
                      currentSkillLevelInDegrees.current,
                    "--skill-percentage": selectedSkill
                      ? getSkillLevelInDegrees(
                          selectedSkill.skillLevelPercentage
                        )
                      : "-90deg",
                  } as CSSProperties
                }
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
        </div>
      </div>
    </div>
  );
}
