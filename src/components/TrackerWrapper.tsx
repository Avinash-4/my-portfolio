import { ReactNode, useEffect, useRef } from "react";
import { useStorage } from "../common/hooks/useStorage";
import { useInterval } from "../common/hooks/useInterval";

type WrapperProps = {
  children: ReactNode;
};

export const TrackerWrapper: React.FC<WrapperProps> = ({ children }) => {
  const isMounted = useRef<boolean>(false);

  const [userId, setUserId, removeUserId] = useStorage(
    "userId",
    "",
    window.localStorage
  );

  const [sessionId, setSessionId, removeSessionId] = useStorage(
    "sessionId",
    "",
    window.sessionStorage
  );

  const track = (userId: string, sessionId: string) => {
    const options: any = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Environment": process.env.ENVIRONMENT,
      },
      body: JSON.stringify({
        userId: userId,
        sessionId: sessionId,
        timeStamp: new Date().toISOString(),
      }),
    };

    fetch(process.env.TRACKER_END_POINT || "", options);
  };

  useEffect(() => {
    if (!isMounted.current) {
      let newUserId = userId;
      let newSessionId = sessionId;

      if (!userId) {
        newUserId = self.crypto.randomUUID();
        setUserId(newUserId);
      }

      if (!sessionId) {
        newSessionId = self.crypto.randomUUID();
        setSessionId(newSessionId);
      }

      track(newUserId, newSessionId);
      isMounted.current = true;
    }
  }, []);

  useInterval(() => {
    if (userId && sessionId) {
      track(userId, sessionId);
    }
  }, 15000);

  return <>{children}</>;
};
