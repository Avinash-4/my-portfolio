import { ReactNode } from "react";

type WrapperProps = {
  children: ReactNode;
};

// Tracking is handled by Google Analytics 4 (see index.html)
export const TrackerWrapper: React.FC<WrapperProps> = ({ children }) => {
  return <>{children}</>;
};
