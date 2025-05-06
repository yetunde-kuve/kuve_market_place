import React, { useContext, useEffect, useState } from "react";

const CachedContext = React.createContext(null);

export function useCached(): any {
  return useContext(CachedContext);
}

export function CachedProvider({ children }: any) {
  const [onboardingModel, setOnboardingModel] = useState<any>({});
  const [transferModel, setTransferModel] = useState<any>({}); // transfer modal
  const [activeStep, setActiveStep] = useState(0); //active onboarding
  const [transferActiveStep, setTransferActiveStep] = useState(0); //for transfer stepper
  const [airtimeactiveStep, setAirtimeActiveStep] = useState(0); // for airtime and data stepper
  const [airtimeModel, setAirtimeModel] = useState<any>({}); // transfer modal
  const [dataactivstep, setDataActivestep]=useState(0)//data steeper
  const[dataModel,setDataModel]=useState<any>([])//data model
  const[billsStepper, setbillsStepper]=useState(0)// Bills steeper
  const [billsModel,setbillsModel]=useState<any>([])//Bills model
  const [utilityStepper, setUtilityStepper]=useState(0)// utility stepper
  const[utilityModel,setUtilityModel]=useState<any>([])// utility
  const[internentServicesSteper, setInternetServicesSteper]=useState(0)// Internent Services steeper
  const[internentserviceModel,setInternentServiceModel]=useState<any>([])//data model
  const[cardCount, setCardCount]=useState(0);// use to update states of card
  const [getLocal, setGetLocal]=useState(0)// use to update fetch card
  const [PhoneVerificationDetails, setPhoneVerificationDetails]=useState<any>([])
  const [paymentJwt, setPaymentJwt]=useState<any>('')
  const [paymentLink, setPaymentLink]=useState<any>("")
  const [ busOnboardingActiveStep, setBusOnboardingActiveStep ] = useState(0);
 const[bussinessModel, setBusinessModel]=useState({})
 const[businessTopupModel, setBusinessTopupMode]=useState({})
 const[businessTopupStepper, setBuisnessTopupStepper]=useState(0)
 const [buinessWithdrawModel, setBusinessWithdrawModel]=useState({})
 const [businessWithdrawStepper, setBusinnessWithdrawStepper]=useState(0)
 const [buinessTransferModel, setBusinessTransferModel]=useState({})
 const [businessTransferStepper, setBusinnessTransferStepper]=useState(0)
 const [settingNavigate, setSettingNavigate]=useState(false)
 const [DownloadRecipt, setDownloadRecipt]=useState(false)
 const [loadUserData, setGetUserData]=useState(0)
 const [showIdverification, setShowIdverification]=useState(null)
 const [verificationMessage, setVerificationMessage]=useState(null)

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
  const [cachedGb, setCachedGb]=useState('')
  const [cacheNiara, setCacheNaira]=useState('')
  const [showConvertModal, setShowConvertModal]=useState(true)


  // const [cachedHomeList, setCachedHomeList] = useState(null) as any;
  // const [homeScroll, setHomeScroll] = useState(0) as any;
  // const [lastNewTime, setLastNewTime] = useState(null) as any;
  // const [lastOldTime, setLastOldTime] = useState(null) as any;
  // const [lastItem, setLastItem] = useState() as any;
  // const [lastPostData, setLastPostData] = useState(null) as any;
  const value = {
  showIdverification, setShowIdverification,
 verificationMessage, setVerificationMessage,

    loadUserData, setGetUserData,
    DownloadRecipt, setDownloadRecipt,
    settingNavigate, setSettingNavigate,
    buinessTransferModel, setBusinessTransferModel,
    businessTransferStepper, setBusinnessTransferStepper,
    businessWithdrawStepper, setBusinnessWithdrawStepper,
    buinessWithdrawModel, setBusinessWithdrawModel,
    businessTopupModel, setBusinessTopupMode,
    businessTopupStepper, setBuisnessTopupStepper,
    bussinessModel, setBusinessModel,
    busOnboardingActiveStep, 
    setBusOnboardingActiveStep,
    showConvertModal, setShowConvertModal,
    cachedGb, setCachedGb,
    cacheNiara, setCacheNaira,
    paymentLink, setPaymentLink,
    paymentJwt, 
    setPaymentJwt,
    PhoneVerificationDetails, 
    setPhoneVerificationDetails,
    getLocal, 
    setGetLocal,
    cardCount, 
    setCardCount,
    utilityStepper, 
    setUtilityStepper,
    utilityModel,
    setUtilityModel,
    internentserviceModel,
    setInternentServiceModel,
    internentServicesSteper, setInternetServicesSteper,
    billsModel,
    setbillsModel,
    billsStepper, 
    setbillsStepper,
    dataModel,
    setDataModel,
    dataactivstep, 
    setDataActivestep,
    airtimeModel, 
    setAirtimeModel,
    airtimeactiveStep, 
    setAirtimeActiveStep,
    transferModel,
    setTransferModel,
    transferActiveStep,
    setTransferActiveStep,
    resetpasswordModel,
    setResetPasswordModel,
    onboardingModel,
    setOnboardingModel,
    activeStep,
    setActiveStep,
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
