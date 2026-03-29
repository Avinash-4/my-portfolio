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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus(SendStatus.TRIGGERED);
    fetch(`${process.env.FOLIO_API_ENDPOINT}/message`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, subject, message }),
    })
      .then((res) => {
        setStatus(res.status === 200 || res.status === 201 ? SendStatus.SENT : SendStatus.FAILED);
      })
      .catch(() => setStatus(SendStatus.FAILED))
      .finally(() => {
        setTimeout(() => setStatus(SendStatus.INACTIVE), 10000);
      });
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
