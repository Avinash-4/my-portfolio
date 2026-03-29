import { RefObject } from "react";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { handleScroll } from "../../common/utils/utilities";
import "./about.css";
import { pageInfo, aboutInfo } from "../../assets/data/data";

const stats = [
  { value: "5+", label: "Years Exp." },
  { value: "3", label: "Companies" },
  { value: "10+", label: "Projects" },
];

export default function About({ contactRef }: { contactRef: RefObject<HTMLElement> }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
        <motion.div
          ref={ref}
          className="content"
          initial={{ opacity: 0, y: 35 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <p className="about-text">{aboutInfo}</p>

          {/* Stats chips */}
          <div className="stat-chips">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                className="stat-chip"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.4 + i * 0.1, ease: "backOut" }}
              >
                <span className="stat-value">{s.value}</span>
                <span className="stat-label">{s.label}</span>
              </motion.div>
            ))}
          </div>

          <br />
          <div onClick={() => handleScroll(contactRef)} className="contact-link" data-hover>
            Let's make something special &rarr;
          </div>
        </motion.div>
      </div>
    </div>
  );
}
