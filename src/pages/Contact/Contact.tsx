import React, { useState } from "react";
import { contactLinks, pageInfo, socialLinks } from "../../assets/data/data";
import SendingIcon from "../../assets/images/sendingIcon.svg";
import SentIcon from "../../assets/images/sent.png";
import FailedIcon from "../../assets/images/failed.png";
import "./contact.css";

enum sendStauts {
  INACTIVE = "INACTIVE",
  TRIGGERED = "TRIGGERED",
  SENT = "SENT",
  FAILED = "FAILED",
}

export default function Contact() {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [messageSendingStatus, setMessageSendingStatus] = useState<sendStauts>(
    sendStauts.INACTIVE
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessageSendingStatus(sendStauts.TRIGGERED);
    fetch(`${process.env.FOLIO_API_ENDPOINT}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        subject,
        message,
      }),
    })
      .then((res) => {
        if (res.status === 200 || res.status === 201) {
          setMessageSendingStatus(sendStauts.SENT);
        } else {
          setMessageSendingStatus(sendStauts.FAILED);
        }
      })
      .catch((err) => {
        setMessageSendingStatus(sendStauts.FAILED);
      })
      .finally(() => {
        setTimeout(() => {
          setMessageSendingStatus(sendStauts.INACTIVE);
        }, 10000);
      });
  };

  const renderFormLabel = (label: string) => {
    return React.Children.toArray(
      label.split("").map((letter, index) => {
        return (
          <span
            className="form-label-letter"
            style={{ transitionDelay: `${index * 50}ms` }}
          >
            {letter}
          </span>
        );
      })
    );
  };

  return (
    <div className="section contact">
      <div className="title">{pageInfo.contact.title}</div>
      <div className="description">{pageInfo.contact.description}</div>
      <div className="content">
        <div className="wrapper">
          <div className="platform-links">
            <div className="contact-links">
              <div className="box-title">Contact me on</div>
              <div className="platforms">
                {contactLinks.map((item) => {
                  return (
                    <a
                      href={item.link}
                      key={item.id}
                      className="contact-link"
                      target="_blank"
                    >
                      <img src={item.icon} />
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="contact-links">
              <div className="box-title">Follow me on</div>
              <div className="platforms">
                {socialLinks.map((item) => {
                  return (
                    <a
                      href={item.link}
                      key={item.id}
                      className="social-link"
                      target="_blank"
                    >
                      <img src={item.icon} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="contact-form">
          <form autoComplete="off" onSubmit={handleSubmit}>
            <div className="input-form-rail first-rail">
              <div className="input-field">
                <input
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
                <label className="form-label">{renderFormLabel("Name")}</label>
              </div>

              <div className="input-field">
                <input
                  type="text"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <label className="form-label">{renderFormLabel("Email")}</label>
              </div>
            </div>
            <div className="input-form-rail second-rail">
              <div className="input-field">
                <input
                  type="text"
                  name="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  required
                />
                <label className="form-label">
                  {renderFormLabel("Subject")}
                </label>
              </div>
            </div>
            <div className="input-form-rail third-rail">
              <div className="input-field">
                <textarea
                  name="message"
                  rows={2}
                  style={{ resize: "none" }}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
                <label className="form-label">
                  {renderFormLabel("Message")}
                </label>
              </div>
            </div>
            <div className="input-form-rail fourth-rail">
              <button className="submit-button" type="submit">
                {messageSendingStatus === sendStauts.TRIGGERED ? (
                  <div className="sending-status">
                    <span className="button-text">Sending</span>
                    <img src={SendingIcon} className="sending-status-icon" />
                  </div>
                ) : messageSendingStatus === sendStauts.SENT ? (
                  <div className="sending-status">
                    <span className="button-text">Sent</span>
                    <img src={SentIcon} className="sending-status-icon" />
                  </div>
                ) : messageSendingStatus === sendStauts.FAILED ? (
                  <div className="sending-status">
                    <span className="button-text">Failed</span>
                    <img src={FailedIcon} className="sending-status-icon" />
                  </div>
                ) : (
                  <div className="sending-status">
                    <span className="button-text">Send message</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="sending-status-icon" viewBox="0 0 512 512"><path d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z" fill="var(--ternery-color)"></path></svg>
                  </div>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
