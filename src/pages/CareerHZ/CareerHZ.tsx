import PositionImage from "../../assets/images/position.png";
import LocationImage from "../../assets/images/location.png";
import OrganisationImage from "../../assets/images/organisation.png";
import TenureImage from "../../assets/images/tenure.png";

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
              <svg id="svg" className="scroll-button left" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" height="400" viewBox="0, 0, 400,400">
                <g id="svgg">
                  <path id="path0" d="M201.643 125.557 C 200.472 126.728,199.406 127.003,197.340 126.668 C 194.899 126.272,193.009 127.195,180.297 134.992 C 153.562 151.393,133.065 162.323,86.400 185.066 C 80.268 188.054,78.997 191.429,82.561 195.258 C 88.833 201.995,135.820 235.186,151.600 244.026 C 180.472 260.201,185.508 263.230,193.728 269.366 C 203.883 276.945,204.066 276.990,208.986 273.157 L 212.635 270.315 212.917 251.224 C 213.073 240.724,213.500 231.833,213.866 231.466 C 215.224 230.108,267.468 230.192,286.000 231.583 C 319.831 234.123,316.430 234.109,317.999 231.713 C 320.067 228.557,317.880 222.400,314.691 222.400 C 312.044 222.400,312.628 192.769,315.647 173.884 C 316.079 171.184,315.843 170.307,314.158 168.348 L 312.156 166.021 297.878 166.310 C 263.652 167.002,212.350 167.644,211.800 167.387 C 211.470 167.232,211.194 158.217,211.188 147.353 C 211.181 136.489,210.911 127.204,210.588 126.720 C 208.696 123.886,203.933 123.267,201.643 125.557 M200.185 156.162 L 200.400 174.724 203.600 177.010 L 206.800 179.295 255.097 178.808 L 303.393 178.321 302.892 180.960 C 302.616 182.412,302.161 192.014,301.880 202.298 L 301.369 220.996 297.285 220.500 C 281.341 218.564,237.270 218.064,208.519 219.492 C 203.225 219.755,201.940 224.483,201.040 247.000 C 200.771 253.710,200.440 259.200,200.304 259.200 C 200.167 259.200,197.073 257.260,193.428 254.890 C 189.782 252.519,180.860 247.257,173.600 243.196 C 155.661 233.162,152.584 231.300,139.200 222.387 C 125.130 213.017,98.482 193.668,98.452 192.800 C 98.444 192.580,108.145 187.590,120.010 181.711 C 141.799 170.914,168.510 156.091,187.600 144.205 C 193.320 140.643,198.443 137.700,198.985 137.664 C 199.733 137.616,200.022 142.067,200.185 156.162 M178.400 152.918 C 162.056 161.614,135.199 178.401,131.146 182.454 C 128.976 184.624,129.167 188.439,131.564 190.836 C 134.431 193.704,135.208 193.454,146.296 186.085 C 159.282 177.454,172.476 169.516,184.291 163.224 C 194.305 157.891,196.403 155.886,195.545 152.466 C 194.091 146.674,189.930 146.784,178.400 152.918 " stroke="none" fill="var(--primary-color)" fill-rule="evenodd"></path>
                </g>
              </svg>
              <svg id="svg" className="scroll-button right" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="400" height="400" viewBox="0, 0, 400,400">
                <g id="svgg">
                  <path id="path0" d="M190.400 125.600 C 188.885 127.115,188.800 128.267,188.800 147.322 L 188.800 167.444 141.800 166.881 C 115.950 166.571,93.498 166.118,91.908 165.874 C 89.490 165.503,88.584 165.816,86.386 167.780 L 83.756 170.129 84.726 177.665 C 87.244 197.215,87.481 222.400,85.148 222.400 C 81.818 222.400,79.576 229.858,82.200 232.204 C 84.130 233.930,93.116 234.021,102.403 232.408 C 114.528 230.303,183.741 229.821,185.748 231.828 C 186.481 232.561,186.834 237.882,187.046 251.417 L 187.338 270.000 190.107 272.594 C 195.008 277.185,196.862 276.964,204.334 270.900 C 210.700 265.733,222.334 258.515,238.000 250.013 C 259.221 238.496,304.627 207.371,316.811 195.990 C 321.201 191.889,320.143 188.270,313.600 185.006 C 310.740 183.579,299.299 177.911,288.175 172.411 C 260.864 158.905,240.902 147.954,219.200 134.569 C 214.580 131.719,209.615 128.671,208.166 127.795 C 206.376 126.712,204.705 126.336,202.953 126.620 C 201.140 126.914,199.818 126.588,198.499 125.519 C 196.062 123.546,192.418 123.582,190.400 125.600 M207.043 141.074 C 224.186 152.189,250.903 167.143,278.916 181.300 L 301.431 192.680 299.716 194.248 C 292.102 201.208,253.706 227.556,239.200 235.774 C 234.580 238.391,226.480 242.977,221.200 245.966 C 215.920 248.954,208.983 253.154,205.785 255.299 C 202.586 257.445,199.850 259.200,199.704 259.200 C 199.558 259.200,199.229 253.530,198.973 246.600 C 198.122 223.568,196.808 219.190,190.769 219.268 C 189.466 219.285,177.600 219.048,164.400 218.740 C 148.270 218.365,134.366 218.513,122.000 219.193 C 111.880 219.749,102.520 220.249,101.200 220.302 L 98.800 220.400 98.663 211.200 C 98.485 199.238,97.680 183.802,97.077 180.787 L 96.602 178.410 144.264 178.936 L 191.926 179.461 195.582 177.531 C 200.441 174.965,200.761 173.531,200.739 154.395 C 200.718 136.288,200.678 137.600,201.243 137.600 C 201.486 137.600,204.096 139.163,207.043 141.074 M209.200 147.830 C 200.337 149.686,202.916 156.410,214.966 162.864 C 226.857 169.233,237.468 175.607,251.652 184.902 C 258.281 189.246,264.465 192.800,265.394 192.800 C 268.709 192.800,271.349 187.405,269.892 183.607 C 268.096 178.928,213.733 146.881,209.200 147.830 " stroke="none" fill="var(--primary-colr)" fill-rule="evenodd"></path>
                </g>
              </svg>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
