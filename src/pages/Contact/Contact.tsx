import React, { useState } from "react";
import { contactLinks, pageInfo, socialLinks } from "../../assets/data/data";
import SendingIcon from "../../assets/images/sendingIcon.svg";
import SentIcon from "../../assets/images/sent.png";
import FailedIcon from "../../assets/images/failed.png";
import SendIcon from "../../assets/images/send.svg";
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
                    <img src={SendIcon} className="sending-status-icon" />
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
