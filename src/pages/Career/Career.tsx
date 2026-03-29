import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import "./career.css";
import { carrerData, pageInfo } from "../../assets/data/data";
import { ICareerItem } from "../../common/interfaces";

import PositionImage from "../../assets/images/position.png";
import LocationImage from "../../assets/images/location.png";
import TenureImage from "../../assets/images/tenure.png";

function TimelineCard({
  item,
  index,
  isLatest,
}: {
  item: ICareerItem;
  index: number;
  isLatest: boolean;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const isLeft = index % 2 === 0;

  return (
    <div className={`timeline-item ${isLeft ? "left" : "right"}`} ref={ref}>
      {/* Connector dot */}
      <div className="timeline-dot">
        <div className="dot-inner" />
        <div className="dot-ripple" />
      </div>

      {/* Card */}
      <motion.div
        className={`timeline-card${isLatest ? " current" : ""}`}
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ backgroundImage: `url(${item.orgBGLogo})` }}
      >
        {/* Background tint */}
        <div className="card-bg-overlay" />

        {/* Content */}
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
        </div>
      </motion.div>
    </div>
  );
}

export default function Career() {
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-50px" });

  const sorted = [...carrerData].sort((a, b) => b.id - a.id);

  return (
    <div className="section career">
      <motion.div
        className="title"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        {pageInfo.career.title}
      </motion.div>
      <motion.div
        className="description"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        {pageInfo.career.description}
      </motion.div>

      <div className="timeline-container">
        {/* Animated vertical line */}
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
          />
        ))}
      </div>
    </div>
  );
}
