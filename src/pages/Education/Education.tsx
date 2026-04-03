import { motion } from "framer-motion";
import { pageInfo } from "../../assets/data/data";
import "./education.css";

const educationData = [
  {
    id: 1,
    degree: "Ph.D. in Information Technology",
    specialization: "Specialization in Artificial Intelligence",
    school: "University of the Cumberlands",
    location: "Williamsburg, KY",
    tenure: "Jan 2026 – Present",
    isCurrent: true,
    highlights: [
      "Research focused on Artificial Intelligence and Machine Learning applications",
      "Exploring advanced topics in neural networks, NLP, and intelligent systems",
      "Bridging academic AI research with real-world software engineering",
    ],
  },
  {
    id: 2,
    degree: "Master of Science",
    specialization: "Computer Science",
    school: "University of Missouri – Kansas City",
    location: "Kansas City, MO",
    tenure: "Aug 2021 – Dec 2022",
    isCurrent: false,
    highlights: [
      "Specialized in software systems and algorithm design",
      "Strong foundation in distributed systems and advanced data structures",
      "Transitioned into professional full-stack engineering roles post-graduation",
    ],
  },
];

const GradCapIcon = () => (
  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z"/>
    <path d="M6 12v5c3 3 9 3 12 0v-5"/>
  </svg>
);

export default function Education() {
  return (
    <div className="section education">
      <motion.div className="title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        {pageInfo.education.title}
      </motion.div>
      <motion.div className="description" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
        {pageInfo.education.description}
      </motion.div>

      <div className="edu-content">
        {educationData.map((edu, i) => (
          <motion.div
            key={edu.id}
            className={`edu-card${edu.isCurrent ? " current" : ""}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: i * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            {edu.isCurrent && (
              <div className="edu-badge">
                <span className="edu-live-dot" />
                In Progress
              </div>
            )}
            {!edu.isCurrent && (
              <div className="edu-badge completed">Completed</div>
            )}

            <div className="edu-icon-wrap">
              <GradCapIcon />
            </div>

            <div className="edu-degree">{edu.degree}</div>
            <div className="edu-specialization">{edu.specialization}</div>

            <div className="edu-school">{edu.school}</div>

            <div className="edu-meta">
              <span className="edu-meta-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
                </svg>
                {edu.tenure}
              </span>
              <span className="edu-meta-sep">·</span>
              <span className="edu-meta-item">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
                {edu.location}
              </span>
            </div>

            <ul className="edu-highlights">
              {edu.highlights.map((h, j) => (
                <motion.li
                  key={j}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.15 + j * 0.08 }}
                >
                  {h}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
