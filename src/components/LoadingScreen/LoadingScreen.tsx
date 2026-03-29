import { useEffect } from "react";
import { motion } from "framer-motion";
import "./LoadingScreen.css";

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  useEffect(() => {
    const t = setTimeout(onComplete, 2400);
    return () => clearTimeout(t);
  }, [onComplete]);

  return (
    <motion.div
      className="loading-screen"
      exit={{ opacity: 0, scale: 1.04, transition: { duration: 0.55, ease: "easeInOut" } }}
    >
      {/* SVG "A" letter stroke animation */}
      <svg viewBox="0 0 100 110" className="loader-svg" fill="none">
        <motion.path
          d="M 50 8 L 14 98 M 50 8 L 86 98 M 23 66 L 77 66"
          stroke="var(--primary-color)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
        {/* Glow duplicate */}
        <motion.path
          d="M 50 8 L 14 98 M 50 8 L 86 98 M 23 66 L 77 66"
          stroke="var(--primary-color)"
          strokeWidth="8"
          strokeLinecap="round"
          opacity={0.15}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.4, ease: "easeInOut" }}
        />
      </svg>

      <motion.div
        className="loader-tagline"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.0, duration: 0.5 }}
      >
        <span className="loader-name">AVINASH</span>
        <span className="loader-role">AI &amp; Full Stack Engineer</span>
      </motion.div>

      {/* Progress bar */}
      <motion.div className="loader-bar-track">
        <motion.div
          className="loader-bar-fill"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 2.0, ease: "easeInOut" }}
          style={{ originX: 0 }}
        />
      </motion.div>
    </motion.div>
  );
}
