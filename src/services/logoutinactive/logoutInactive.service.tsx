import React, { ReactNode, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

const debounce = <T extends (...args: any[]) => any>(func: T, delay: number): (...args: Parameters<T>) => void => {
  let timeoutId: NodeJS.Timeout | null = null; // Use NodeJS.Timeout for TypeScript

  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};


const AppLogout: React.FC<{ children: ReactNode; timeout?: number; checkInterval?: number }> = ({
  children,
  timeout = 180000, // Default to 100 seconds
  checkInterval = 1000, // Default to 10 seconds
}) => {
  const router = useRouter();
  const debouncedUpdateLastActivity = useRef(debounce(() => {
    localStorage.setItem("lastActivity", Date.now().toString());
  }, 300)).current;

  const logoutAction = () => {
    if (localStorage.getItem("token") && localStorage.getItem("userprofile")) {
      localStorage.clear();
      window.location.pathname = "/";
    }
  };

  const checkIdleTimeout = () => {
    const lastActivity = parseInt(localStorage.getItem("lastActivity") || "0", 10);
    const currentTime = Date.now();

    if (currentTime - lastActivity > timeout) {
      logoutAction();
    }
  };

  useEffect(() => {
    debouncedUpdateLastActivity(); // Set initial activity timestamp

    const events = ["mousemove", "keydown", "click", "scroll", "touchstart", "touchmove"];
    events.forEach((event) => {
      window.addEventListener(event, debouncedUpdateLastActivity);
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        checkIdleTimeout();
      } else {
        debouncedUpdateLastActivity();
      }
    });

    window.addEventListener("focus", debouncedUpdateLastActivity);
    window.addEventListener("blur", checkIdleTimeout);

    const intervalId = setInterval(checkIdleTimeout, checkInterval);

    return () => {
      events.forEach((event) => {
        window.removeEventListener(event, debouncedUpdateLastActivity);
      });
      document.removeEventListener("visibilitychange", checkIdleTimeout);
      window.removeEventListener("focus", debouncedUpdateLastActivity);
      window.removeEventListener("blur", checkIdleTimeout);
      clearInterval(intervalId);
    };
  }, [debouncedUpdateLastActivity]);

  return <>{children}</>;
};

export default AppLogout;
