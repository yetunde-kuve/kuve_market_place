import React, { useContext, useEffect, useState } from "react";

const CachedContext = React.createContext(null);

export function useCached(): any {
  return useContext(CachedContext);
}

export function CachedProvider({ children }: any) {
  const [onboardingModel, setOnboardingModel] = useState<any>({});
  const [onboardingStepper, setOnboardingStepper] = useState(0);

  const [resetpasswordModel, setResetPasswordModel] = useState<any>({});
  const [cachedHomeData, setCachedHomeData] = useState<null | CachedItem>(null);
  const [cachedWalletData, setCachedWalletData] = useState<null | CachedItem>(
    null
  );
  const [cachedNotificationData, setCachedNotificationData] =
    useState<null | CachedItem>(null);

  const [cachedGroupData0, setCachedGroupData0] = useState<null | CachedItem>(
    null
  );
  const [cachedGroupData1, setCachedGroupData1] = useState<null | CachedItem>(
    null
  );
  const [cachedGroupData2, setCachedGroupData2] = useState<null | CachedItem>(
    null
  );
  const [cachedSearchData, setCachedSearchData] = useState<null | CachedItem>(
    null
  );

  const [cachedTagData, setCachedTagData] = useState<null | CachedItem>(null);

  const [cachedGroupTab, setCachedGroupTab] = useState(0);
  const [cachedRedirect, setCachedRedirect] = useState("");
  const [cachedGb, setCachedGb] = useState("");
  const [cacheNiara, setCacheNaira] = useState("");
  const [showConvertModal, setShowConvertModal] = useState(true);

  // const [cachedHomeList, setCachedHomeList] = useState(null) as any;
  // const [homeScroll, setHomeScroll] = useState(0) as any;
  // const [lastNewTime, setLastNewTime] = useState(null) as any;
  // const [lastOldTime, setLastOldTime] = useState(null) as any;
  // const [lastItem, setLastItem] = useState() as any;
  // const [lastPostData, setLastPostData] = useState(null) as any;
  const value = {
    onboardingStepper,
    setOnboardingStepper,
    onboardingModel,
    setOnboardingModel,

    cachedHomeData,
    setCachedHomeData,
    cachedGroupData0,
    setCachedGroupData0,
    cachedGroupData1,
    setCachedGroupData1,
    cachedGroupData2,
    setCachedGroupData2,
    cachedGroupTab,
    setCachedGroupTab,
    cachedSearchData,
    setCachedSearchData,
    cachedTagData,
    setCachedTagData,
    cachedRedirect,
    setCachedRedirect,
    cachedWalletData,
    setCachedWalletData,
    cachedNotificationData,
    setCachedNotificationData,
    // cachedHomeList,
    // setCachedHomeList,
    // homeScroll,
    // setHomeScroll,
    // lastItem,
    // setLastItem,
    // setLastPostData,
    // lastPostData,
    // setLastNewTime,
    // setLastOldTime,
    // lastNewTime,
    // lastOldTime,
  };

  return (
    <CachedContext.Provider value={value as any}>
      {children}
    </CachedContext.Provider>
  );
}

export class CachedItem {
  listItem;
  scrollPosition;
  currentTab;
  newTime;
  oldTime;
  metaData;

  constructor({
    listItem,
    scrollPosition,
    currentTab,
    newTime,
    oldTime,
    metaData,
  }: {
    listItem?: any;
    scrollPosition?: any;
    currentTab?: any;
    newTime?: any;
    oldTime?: any;
    metaData?: any;
  } = {}) {
    this.listItem = listItem;
    this.scrollPosition = scrollPosition;
    this.currentTab = currentTab;
    this.newTime = newTime;
    this.oldTime = oldTime;
    this.metaData = metaData;
  }
}
