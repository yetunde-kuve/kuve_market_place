import React, { useContext, useState, useEffect, useRef } from "react";
import axios, { AxiosError } from "axios";
import { useUtils } from "./utils.context";

import { usePathname, useRouter } from "next/navigation";
// import { UserModel } from "../components/models/usermodel";
// import { SettingsModel } from "../components/models/settingsmodel";
import { AccessItem } from "@/components/widgets/dialogs/accessCode.dialog";
// import TimeAgo from "javascript-time-ago";
// import { NotifyModel } from "../components/models/notifymodel";
import { useCached } from "./cached.context";
import { RiTokenSwapFill } from "react-icons/ri";
import { getFromLocal, isLinkRestricted, savePage } from "@/utils/app.utils";

// import en from 'javascript-time-ago/locale/en';

// TimeAgo.addDefaultLocale(en);

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
});

const AuthContext = React.createContext(null);

export function useAuth(): any {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: any) {
  // const [appReady, setAppReady] = useState(false);
  // const [currentUser, setCurrentUser] = useState<UserModel | null>(null);
  const { showAccessDialog } = useUtils();
  const pathname = usePathname();
  const router = useRouter();

  const [subscribed, setSubscribed] = useState(false);
  const [isSupport, setIsSupport] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const { apiCaller } = useUtils();
  const [settingsModel, setSettingsModel] = useState() as any;
  const [requireAccessCode, setRequireAccessCode] = useState(false);
  const [userLoaded, setUserLoaded] = useState(false);
  const [roleSet, setRoleSet] = useState(false);
  const [showNewNotifyDot, setShowNewNotifyDot] = useState(false);
  const { setCachedHomeData } = useCached();

  // function signup(email: string, password: string) {
  //   createUserWithEmailAndPassword(auth, email, password);
  //   return;
  // }

  // function login(email: string, password: string): Promise<UserCredential> {
  //   return signInWithEmailAndPassword(auth, email, password);
  // }
  const inactivetimeout = 10000; // milliseconds

  useEffect(() => {
    checkedLogined();
  }, []);

  function checkedLogined() {
    // console.log(`checking for ${extractLink()}`)
    let token = getFromLocal("token");
    let timeloggedin = getFromLocal("time");

    if (isLinkRestricted(pathname) && token === null) {
      // console.log(`Path is restricted: ${pathname}`);
      kickOut();
    } else {
      // if(token)
      setUserLoaded(true);
    }
    //   if(Number(timeloggedin )< (new Date().getTime()- inactivetimeout))
    //   setUserLoaded(true);

    // }
  }

  async function logout() {
    // setCurrentUser(null);
    localStorage.removeItem("token");
  }

  // // function userModel(): UserModel | null {
  //   // if (currentUser == null) return new UserModel({});
  //   // return currentUser ?? new UserModel({});
  // }

  // async function savePath() {
  //   let path = await router.asPath;
  //   let { ...paths } = await router.query;
  //   printOut(`Saving path ${router.route} ${JSON.stringify(paths)}`);
  //   localStorage.setItem("path", `${path}`);
  // }

  function kickOut({ force = false }: { force?: boolean } = {}) {
    savePage({ force: force });
    logout();
    router.push("/");
    setUserLoaded(false);
    setRoleSet(false);
    setCachedHomeData(null);
  }

  // async function loadUser(): Promise<UserModel | null | undefined> {
  // let currentUser = auth.currentUser;
  // if (currentUser == null || currentUser == undefined) {
  //   return null;
  // }
  // let userData;
  // let uid = currentUser.uid;
  // let localUser = getFromLocal("_user");
  // if (localUser != null && localUser != undefined) {
  //   let userMap = null;
  //   try {
  //     userMap = JSON.parse(localUser);
  //   } catch (e) {}
  //   if (userMap != null) {
  //     if (userMap["id"] == uid) {
  //       setCurrentUser(new UserModel({ items: userMap }));
  //     }
  //   }
  // return null
  // }
  // createUserListener();

  // function showSecurity() {
  //   // if (!requireAccessCode) return;
  //   showAccessDialog(
  //     new AccessItem(
  //       (pin: any) => {
  //         if (pin == null || pin == undefined) return;
  //       },
  //       { security: true, verifyCode: true }
  //     )
  //   );
  // }
  // async function appReadyPage() {
  //   let currentRoute = router.route;
  //   printOut(`route: ${currentRoute}`);

  //   if (
  //     currentRoute != "/login" &&
  //     currentRoute != "/forgot_password" &&
  //     currentRoute != "/signup"
  //   ) {
  //     let user = await loadUser();
  //     if (user == null) {
  //       router.push("/login");
  //     }
  //   }

  //   setAppReady(true);
  // }

  // useEffect(() => {
  //   appReadyPage();
  // }, [appReady]);

  // function createUserListener() {
  //   if (subscribed == true) return;
  //   let currentUser = auth.currentUser;
  //   if (currentUser == null || currentUser == undefined) {
  //     return;
  //   }
  //   setSubscribed(true);
  //   printOut("Subscribing...");

  // }

  // useEffect(() => {
  //   if (currentUser != null && currentUser != undefined) {
  //     setSubscribed(true);
  //     printOut("Subscribing...");
  //     const unsubscribe = onSnapshot(
  //       doc(db, "userBase", currentUser.getId()),
  //       (shot: DocumentSnapshot) => {
  //         printOut("User event.");
  //         if (shot.exists()) {
  //           setCurrentUser(new UserModel({ doc: shot }));
  //         }
  //         // else {
  //         //   printOut("Shot no user");
  //         //   router.push("/login");
  //         // }
  //         // printOut(`Useer Data: ${JSON.stringify(shot.data())}`);
  //       }
  //     );
  //     return unsubscribe;
  //   }
  // }, [subscribed]);

  const value = {
    // currentUser,
    // setCurrentUser,
    // // login,
    // // signup,
    // logout,
    // loadUser,
    // userModel,
    // isSupport,
    // isAdmin,
    // settingsModel,
    userLoaded,
    kickOut,
    // roleSet,
    // setShowNewNotifyDot,
    // showNewNotifyDot,
    // appReady,
  };

  return (
    <AuthContext.Provider value={value as any}>{children}</AuthContext.Provider>
  );
}
