import React, { useContext, useState, useEffect } from "react";
import { delay } from "@/utils/app.utils";
import { LoadingItem } from "@/components/widgets/dialogs/loading.dialog";
import { MessageItem } from "@/components/widgets/dialogs/message.dialog";
import { ListItem } from "@/components/widgets/dialogs/list.dialog";
import { PopupItem } from "@/components/widgets/dialogs/popup.dialog";
import { AccessItem } from "@/components/widgets/dialogs/accessCode.dialog";
import { HttpUtil } from "@/utils/http.utils";
import { AppBarData } from "@/utils/appBar.utils";

const UtilsContext = React.createContext<any | null>(null);

export function useUtils() {
  const context = useContext(UtilsContext);
  if (!context) {
    throw new Error("useUtils must be used within a UtilsProvider");
  }
  return context;
}
export function UtilsProvider({ children }: any) {
  const [loadingItem, setLoading] = useState<LoadingItem | null>(null);
  const [popupItem, setShowPopup] = useState<PopupItem | null>(null);
  const [showLogin, setShowLogin] = useState<boolean>(false);
  const [loginCancellable, setLoginCancellable] = useState<boolean>(false);
  const [accessItem, showAccessDialog] = useState<AccessItem | null>(null);
  const [messageItem, setShowMessageDialog] = useState<MessageItem | null>(
    null
  );
  const [listItem, setShowListDialog] = useState<ListItem | null>(null);
  const [navBackColor, setNavBackColor] = useState<any>(null);
  const [navItemColor, setNavItemColor] = useState<any>(null);
  const [httpUtil, setHttpUtil] = useState<HttpUtil | null>(null);
  const [fullMode, setFullMode] = useState(true);
  const [showCreateSplit, setShowCreateSplit] = useState(false);
  const [searchMode, setSearchMode] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const [groupTab, setGroupTag] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);
  const [openPayment, setOpenPayment] = useState(false);
  // const [appBarData, setAppBarData] = useState<AppBarData | null>(null) as any;

  const refreshComponents = () => {
    setRefreshKey((prevKey) => prevKey + 1);
  };

  async function showPopup(message: string, isError?: boolean) {
    let popupItem = new PopupItem(message);
    popupItem.isError = isError;
    setShowPopup(popupItem);
    await delay(2500);
    setShowPopup(null);
  }

  function showLoading(message?: string, cancellable?: boolean) {
    setLoading(new LoadingItem(message, cancellable));
  }
  function hideLoading() {
    setLoading(null);
  }

  function messageDialog(messageItem: MessageItem) {
    setShowMessageDialog(messageItem);
  }
  function yesNoDialog(
    message: string,
    onClicked: Function,
    onNegative?: Function
  ) {
    let dialogItem = new MessageItem({
      message: message,
      onPositiveClicked: onClicked,
    });
    dialogItem.positiveClickText = "Yes";
    dialogItem.negativeClickText = "No";
    dialogItem.onNegativeClicked = onNegative ?? (() => {});
    setShowMessageDialog(dialogItem);
  }

  function successDialog(
    message: string,
    onClicked: Function,
    cancellable?: boolean
  ) {
    let dialogItem = new MessageItem({
      message: message,
      onPositiveClicked: onClicked,
      negativeClickText: null,
    });
    dialogItem.type = 1;
    dialogItem.cancellable = cancellable ?? true;
    setShowMessageDialog(dialogItem);
  }
  function failedDialog(message: string, onClicked: Function) {
    let dialogItem = new MessageItem({
      message: message,
      onPositiveClicked: onClicked,
    });
    dialogItem.type = 2;
    setShowMessageDialog(dialogItem);
  }

  function showListDialog(listItem: ListItem) {
    setShowListDialog(listItem);
  }

  function apiCaller(): HttpUtil {
    if (httpUtil == null) {
      let newHttpUtil = new HttpUtil({
        showLoading,
        hideLoading,
        successDialog,
        failedDialog,
      });
      setHttpUtil(newHttpUtil);
      return newHttpUtil;
    }
    return httpUtil;
  }

  const value = {
    openPayment,
    setOpenPayment,
    refreshKey,
    refreshComponents,
    // setRefreshKey,
    showPopup,
    popupItem,
    loadingItem,
    showLoading,
    hideLoading,
    showLogin,
    setShowLogin,
    messageItem,
    setShowMessageDialog,
    yesNoDialog,
    successDialog,
    failedDialog,
    messageDialog,
    listItem,
    setShowListDialog,
    showListDialog,
    loginCancellable,
    setLoginCancellable,
    setNavItemColor,
    setNavBackColor,
    navBackColor,
    navItemColor,
    accessItem,
    showAccessDialog,
    apiCaller,
    fullMode,
    setFullMode,
    showCreateSplit,
    setShowCreateSplit,
    currentTab,
    setCurrentTab,
    searchMode,
    setSearchMode,
    setGroupTag,
    groupTab,
    // appBarData,
    // setAppBarData,
  };

  return (
    <UtilsContext.Provider value={value as any}>
      {children}
    </UtilsContext.Provider>
  );
}
