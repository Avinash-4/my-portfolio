import { ReactNode, useEffect, useRef, useState } from "react";
import { useStorage } from "../common/hooks/useStorage";
import { useInterval } from "../common/hooks/useInterval";

type WrapperProps = {
  children: ReactNode;
};

export const TrackerWrapper: React.FC<WrapperProps> = ({ children }) => {
  const [referrer, setRefferer] = useState<string>("UK");
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

  const track = (userId: string, sessionId: string, ref: string) => {
    const options: any = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Environment: process.env.ENVIRONMENT,
      },
      body: JSON.stringify({
        userId: userId,
        sessionId: sessionId,
        timeStamp: new Date().toISOString(),
        referrer: ref,
      }),
    };

    fetch(process.env.TRACKER_END_POINT || "", options);
  };

  function extractDomainName(url: string) : string | null {
    // Remove any leading whitespace and trailing slashes
    url = url.trim().replace(/\/+$/, '');
  
    // Use a regular expression to extract the domain name
    const domainRegex = /^(?:https?:\/\/)?(?:www\.)?([a-zA-Z0-9.-]+)\.[a-zA-Z]{2,}(?:\/|$)/;
    const matches = url.match(domainRegex);
  
    if (matches && matches.length > 1) {
      const domain = matches[1];
      const capitalizedDomain = domain.charAt(0).toUpperCase() + domain.slice(1);
      return capitalizedDomain;
    } else {
      return null;
    }
  }

  useEffect(() => {
    if (!isMounted.current) {
      let newUserId = userId;
      let newSessionId = sessionId;
      const params = new URLSearchParams(window.location.search);
      const ref = extractDomainName(document.referrer) || params.get("ref") || "Unknown";
      
      setRefferer(ref);
      history.replaceState({}, "", "/");

      if (!userId) {
        newUserId = self.crypto.randomUUID();
        setUserId(newUserId);
      }

      if (!sessionId) {
        newSessionId = self.crypto.randomUUID();
        setSessionId(newSessionId);
      }

      track(newUserId, newSessionId, ref);
      isMounted.current = true;
    }
  }, []);

  useInterval(() => {
    if (userId && sessionId) {
      track(userId, sessionId, referrer);
    }
  }, 10000);

  return <>{children}</>;
};
