import { useEffect, useRef } from "react";
import "./cursor.css";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);
    document.addEventListener("mousemove", moveCursor);

    const hoverOn = () => dotRef.current?.classList.add("hover");
    const hoverOff = () => dotRef.current?.classList.remove("hover");

    // Re-attach whenever DOM changes (simple approach)
    const attach = () => {
      document
        .querySelectorAll("a, button, [data-hover], .skill-card, .project-card, .side-nav-item, .contact-card")
        .forEach((el) => {
          el.addEventListener("mouseenter", hoverOn);
          el.addEventListener("mouseleave", hoverOff);
        });
    };
    attach();

    const obs = new MutationObserver(attach);
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", moveCursor);
      obs.disconnect();
    };
  }, []);

  return <div ref={dotRef} className="cursor-dot" />;
}
