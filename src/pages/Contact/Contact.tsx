import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { contactLinks, pageInfo, socialLinks } from "../../assets/data/data";
import SendingIcon from "../../assets/images/sendingIcon.svg";
import SentIcon from "../../assets/images/sent.png";
import FailedIcon from "../../assets/images/failed.png";
import "./contact.css";

enum SendStatus {
  INACTIVE = "INACTIVE",
  TRIGGERED = "TRIGGERED",
  SENT = "SENT",
  FAILED = "FAILED",
}

// Platform brand colors for hover glow
const PLATFORM_COLORS: Record<string, string> = {
  linkedin: "#0077b5",
  github: "#6e40c9",
  email: "#00d4ff",
  phone: "#06d6a0",
};

function MagneticButton({ children, className, ...props }: React.HTMLAttributes<HTMLButtonElement> & { type?: "button" | "submit" | "reset" }) {
  const ref = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) * 0.28;
    const dy = (e.clientY - cy) * 0.28;
    el.style.transform = `translate(${dx}px, ${dy}px)`;
  };

  const handleLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <button
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </button>
  );
}

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<SendStatus>(SendStatus.INACTIVE);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("avinashchowdarykongara4@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(SendStatus.TRIGGERED);
    const mailto = `mailto:avinashchowdarykongara4@gmail.com`
      + `?subject=${encodeURIComponent(subject || "Portfolio Inquiry")}`
      + `&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
    window.open(mailto, "_blank");
    setStatus(SendStatus.SENT);
    setTimeout(() => {
      setStatus(SendStatus.INACTIVE);
      setName(""); setEmail(""); setSubject(""); setMessage("");
    }, 3000);
  };

  const renderFormLabel = (label: string) =>
    React.Children.toArray(
      label.split("").map((ch, i) => (
        <span className="form-label-letter" style={{ transitionDelay: `${i * 50}ms` }}>
          {ch}
        </span>
      ))
    );

  const getPlatformKey = (link: string) => {
    if (link.includes("linkedin")) return "linkedin";
    if (link.includes("github")) return "github";
    if (link.startsWith("mailto")) return "email";
    if (link.startsWith("tel")) return "phone";
    return "email";
  };

  return (
    <div className="section contact">
      <motion.div className="title" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        {pageInfo.contact.title}
      </motion.div>
      <motion.div className="description" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.1 }}>
        {pageInfo.contact.description}
      </motion.div>

      <div className="content">
        {/* ─── Left: Platform Cards ─── */}
        <motion.div
          className="wrapper"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <div className="platform-links">
            <div className="contact-links">
              <div className="box-title">Contact me on</div>
              <div className="platforms">
                {contactLinks.map((item) => {
                  const pk = getPlatformKey(item.link);
                  return (
                    <motion.a
                      href={item.link}
                      key={item.id}
                      className="contact-card"
                      target="_blank"
                      rel="noreferrer"
                      data-hover
                      whileHover={{ scale: 1.06, y: -4 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      style={{ "--platform-color": PLATFORM_COLORS[pk] } as React.CSSProperties}
                    >
                      <img src={item.icon} className="contact-card-icon" alt={item.label} />
                      <span className="contact-card-label">{item.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
            {/* Copy email button */}
            <div className="copy-email-row">
              <span className="copy-email-addr">avinashchowdarykongara4@gmail.com</span>
              <button className="copy-email-btn" onClick={copyEmail} title="Copy email" data-hover>
                {copied ? (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                ) : (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                  </svg>
                )}
                <span>{copied ? "Copied!" : "Copy"}</span>
              </button>
            </div>

            <div className="contact-links">
              <div className="box-title">Follow me on</div>
              <div className="platforms">
                {socialLinks.map((item) => {
                  const pk = getPlatformKey(item.link);
                  return (
                    <motion.a
                      href={item.link}
                      key={item.id}
                      className="contact-card"
                      target="_blank"
                      rel="noreferrer"
                      data-hover
                      whileHover={{ scale: 1.06, y: -4 }}
                      transition={{ type: "spring", stiffness: 400 }}
                      style={{ "--platform-color": PLATFORM_COLORS[pk] } as React.CSSProperties}
                    >
                      <img src={item.icon} className="contact-card-icon" alt={item.label} />
                      <span className="contact-card-label">{item.label}</span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
            {/* Recommendations link */}
            <motion.a
              href="https://www.linkedin.com/in/avinashchowdary04/details/recommendations/"
              target="_blank"
              rel="noreferrer"
              className="recommendations-link"
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              View LinkedIn recommendations
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M7 17L17 7M7 7h10v10"/>
              </svg>
            </motion.a>

            {/* LinkedIn Preview Card */}
            <motion.a
              href="https://www.linkedin.com/in/avinash444/"
              target="_blank"
              rel="noreferrer"
              className="linkedin-preview"
              whileHover={{ scale: 1.02, y: -3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <div className="li-header">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#0077b5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                <span className="li-header-text">LinkedIn Profile</span>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="li-arrow">
                  <path d="M7 17L17 7M7 7h10v10"/>
                </svg>
              </div>
              <div className="li-body">
                <div className="li-avatar">AK</div>
                <div className="li-info">
                  <div className="li-name">Avinash Chowdary Kongara</div>
                  <div className="li-title">Software AI Engineer · American Express</div>
                  <div className="li-location">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    Scottsdale, AZ
                  </div>
                </div>
              </div>
            </motion.a>
          </div>
        </motion.div>

        {/* ─── Right: Contact Form ─── */}
        <motion.div
          className="contact-form"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
        >
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="input-form-rail first-rail">
              <div className="input-field">
                <input name="name" value={name} onChange={(e) => setName(e.target.value)} required />
                <label className="form-label">{renderFormLabel("Name")}</label>
              </div>
              <div className="input-field">
                <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <label className="form-label">{renderFormLabel("Email")}</label>
              </div>
            </div>
            <div className="input-form-rail second-rail">
              <div className="input-field">
                <input type="text" name="subject" value={subject} onChange={(e) => setSubject(e.target.value)} required />
                <label className="form-label">{renderFormLabel("Subject")}</label>
              </div>
            </div>
            <div className="input-form-rail third-rail">
              <div className="input-field">
                <textarea name="message" rows={3} style={{ resize: "none" }} value={message} onChange={(e) => setMessage(e.target.value)} required />
                <label className="form-label">{renderFormLabel("Message")}</label>
              </div>
            </div>
            <div className="input-form-rail fourth-rail">
              <MagneticButton className="submit-button" type="submit" data-hover>
                {status === SendStatus.TRIGGERED ? (
                  <span className="sending-status"><span className="button-text">Sending</span><img src={SendingIcon} className="sending-status-icon" /></span>
                ) : status === SendStatus.SENT ? (
                  <span className="sending-status"><span className="button-text">Sent ✓</span><img src={SentIcon} className="sending-status-icon" /></span>
                ) : status === SendStatus.FAILED ? (
                  <span className="sending-status"><span className="button-text">Failed</span><img src={FailedIcon} className="sending-status-icon" /></span>
                ) : (
                  <span className="sending-status">
                    <span className="button-text">Send Message</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="sending-status-icon" viewBox="0 0 512 512">
                      <path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z" fill="currentColor" />
                    </svg>
                  </span>
                )}
              </MagneticButton>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
