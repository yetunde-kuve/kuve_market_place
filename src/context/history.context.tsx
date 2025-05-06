import { useRouter } from "next/router";
import React, { createContext, useState, useEffect, useContext } from "react";

interface HValidation {
  history: string[];
  setHistory(data: string[]): void;
  back(): void;
}

const HistoryContext = createContext<HValidation>({} as HValidation);

// const HistoryContext = React.createContext(null);

// export function useHistory(): any {
//   return useContext(HistoryContext);
// }

export function HistoryProvider({ children }: any) {
  // export const HistoryProvider: React.FC = ({ children }: any) => {
  const { asPath, push, pathname } = useRouter();
  const router = useRouter();
  const [history, setHistory] = useState<string[]>([]);

  //   function back() {
  //     for (let i = history.length - 2; i >= 0; i--) {
  //       const route = history[i];
  //       if (!route.includes("#") && route !== pathname) {
  //         push(route);

  //         // if you want to pop history on back
  //         const newHistory = history.slice(0, i);
  //         setHistory(newHistory);

  //         break;
  //       }
  //     }
  //   }

  function back(fallbackRoute?: string) {
    for (let i = history.length - 2; i >= 0; i--) {
      const route = history[i];
      console.log({ route, pathname });
      if (
        !route.includes("#") &&
        route !== pathname &&
        route != "/login" &&
        route != "/signup"
      ) {
        router.push(route);
        const newHistory = history.slice(0, i);
        setHistory(newHistory);
        return;
      }
    }
    if (fallbackRoute) {
      router.push(fallbackRoute);
    } else {
      router.push("/home");
    }
  }
  useEffect(() => {
    setHistory((previous) => [...previous, asPath]);
  }, [asPath]);

  return (
    <HistoryContext.Provider
      value={{
        back,
        history,
        setHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
}

export function useHistory(): HValidation {
  const context = useContext(HistoryContext);
  return context;
}
