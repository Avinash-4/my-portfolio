import PositionImage from "../../assets/images/position.png";
import LocationImage from "../../assets/images/location.png";
import OrganisationImage from "../../assets/images/organisation.png";
import TenureImage from "../../assets/images/tenure.png";
import RightArrow from "../../assets/images/right-arrow.png";
import LeftArrow from "../../assets/images/left-arrow.png";

import "./careerhz.css";
import { useEffect, useRef, useState } from "react";
import { carrerData, pageInfo } from "../../assets/data/data";

export default function CareerHZ({ isActive }: { isActive: boolean }) {
  const scrollContainerRef = useRef<HTMLDivElement>({} as HTMLDivElement);
  const [showScrollButtons, setShowScrollButtons] = useState<boolean>(false);
  const stepItemRef = useRef<HTMLLIElement>({} as HTMLLIElement);

  useEffect(() => {
    setShowScrollButtons(
      scrollContainerRef?.current?.scrollWidth >
        scrollContainerRef?.current?.clientWidth
    );
  }, [scrollContainerRef?.current?.scrollWidth]);

  const scrollLeft = () => {
    scrollContainerRef.current.scrollTo({
      left:
        scrollContainerRef.current.scrollLeft - stepItemRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollRight = () => {
    scrollContainerRef.current.scrollTo({
      left:
        scrollContainerRef.current.scrollLeft + stepItemRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="section careerhz">
      <div className="title">{pageInfo.career.title}</div>
      <div className="description">{pageInfo.career.description}</div>
      <div className="content">
        <div className="wrapper">
          <div className="scroll-container" ref={scrollContainerRef}>
            <ul className="step-progress">
              {carrerData
                .sort((a, b) => b.id - a.id)
                .map((item) => {
                  return (
                    <li
                      key={item.id}
                      className="step-progress-item"
                      ref={stepItemRef}
                    >
                      <div className="step-progress-item-content">
                        <div
                          className="background-image-container"
                          style={{ backgroundImage: `url(${item.orgBGLogo})` }}
                        />
                        <img
                          src={item.orgLogo}
                          className="org-detail org-logo"
                        />
                        <div>
                          <div className="org-detail org-position">
                            <img
                              src={PositionImage}
                              className="org-position-image"
                            />
                            {item.orgPosition}
                          </div>
                          <a
                            href={item.orgLink}
                            target="_blank"
                            rel="noreferrer"
                            className="org-detail org-name"
                          >
                            <img
                              src={OrganisationImage}
                              className="org-position-image"
                            />
                            {item.orgName}
                          </a>
                          <div className="org-detail org-location">
                            <img
                              src={LocationImage}
                              className="org-position-image"
                            />
                            {item.location}
                          </div>
                          <div className="org-detail org-tenure">
                            <img
                              src={TenureImage}
                              className="org-position-image"
                            />
                            {item.orgTenure}
                          </div>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
          {showScrollButtons && (
            <div className="scroll-buttons">
              <img
                src={LeftArrow}
                onClick={scrollLeft}
                className="scroll-button left"
              />
              <img
                src={RightArrow}
                onClick={scrollRight}
                className="scroll-button right"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
