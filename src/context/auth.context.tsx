import React, { useContext, useState, useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";
import { useUtils } from "./utils.context";
import { usePathname, useRouter } from "next/navigation";
import { useCached } from "./cached.context";
import { getFromLocal, isLinkRestricted, savePage } from "@/utils/app.utils";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const AuthContext = React.createContext(null);

export function useAuth(): any {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  const { showAccessDialog } = useUtils();
  const pathname = usePathname();
  const router = useRouter();
  const { apiCaller } = useUtils();
  const { setCachedHomeData } = useCached();

  const [userLoaded, setUserLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New flag for login status
  const inactivetimeout = 3600000; // milliseconds
  const inactivityTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    checkedLogined();
    resetInactivityTimer();

    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);

    return () => {
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      if (inactivityTimer.current) {
        clearTimeout(inactivityTimer.current);
      }
    };
  }, [router, kickOut]);

  const resetInactivityTimer = () => {
    if (inactivityTimer.current) {
      clearTimeout(inactivityTimer.current);
    }
    inactivityTimer.current = setTimeout(
      kickOutDueToInactivity,
      inactivetimeout
    );
    localStorage.setItem("lastActive", Date.now().toString());
  };

  const kickOutDueToInactivity = () => {
    console.log("User inactive - logging out.");
    kickOut({ reason: "inactivity" });
  };

  function checkedLogined() {
    let token = getFromLocal("token");
    setIsLoggedIn(!!token); // Set isLoggedIn based on the presence of the token

    if (isLinkRestricted(pathname) && token === null) {
      console.log(`Path is restricted: ${pathname}`);
      kickOut();
    } else {
      setUserLoaded(true);
    }
  }

  async function logout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false); // Update isLoggedIn on logout
  }

  function kickOut({
    force = false,
    reason,
  }: { force?: boolean; reason?: string } = {}) {
    savePage({ force: force });
    logout();
    router.push("/");
    setUserLoaded(false);
    setCachedHomeData(null);
    if (reason) {
      console.log(`Kicked out due to: ${reason}`);
    }
  }
  async function login() {
    // localStorage.setItem("token", authToken);
    setIsLoggedIn(true);
    localStorage.setItem("time", Date.now().toString()); // Save login time (you might use this elsewhere)
    localStorage.setItem("lastActive", Date.now().toString()); // Save last active time on login
    resetInactivityTimer(); // Reset inactivity timer on successful login
    // router.push("/dashboard"); // Redirect user after login
  }

  const value = {
    login,
    userLoaded,
    isLoggedIn, // Expose the isLoggedIn flag in the context
    kickOut,
    logout,
  };

  return (
    <AuthContext.Provider value={value as any}>{children}</AuthContext.Provider>
  );
}
