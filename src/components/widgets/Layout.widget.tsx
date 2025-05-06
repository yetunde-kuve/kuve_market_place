import Popup from "./dialogs/popup.dialog";
import Loading from "./dialogs/loading.dialog";
import MessageDialog from "./dialogs/message.dialog";
// import AccessCodeDialog from "./dialogs/AccessCodeDialog";
import ListDialog from "./dialogs/list.dialog";

import CookieWidget from "./CookieWidget.widget";
import { useUtils } from "../../context/utils.context";

function Layout({ children }: any) {
  const {
    popupItem,
    loadingItem,
    showLogin,
    messageItem,
    listItem,
    accessItem,
    showCreateSplit,
    searchMode,
  } = useUtils();
  // const { currentUser } = useAuth();

  return (
    <>
      {<CookieWidget />}
      {popupItem && <Popup key={"popup"} popupParam={popupItem} />}
      {loadingItem && <Loading key={"loading"} loadingParam={loadingItem} />}
      {/* {showLogin && <LoginModal key={"loginmodal"} />} */}
      {messageItem && (
        <MessageDialog key={"dialogModal"} messageParam={messageItem} />
      )}
      {/* {accessItem && (
         <AccessCodeDialog key={"accessModal"} accessParam={accessItem} />
      )} */}
      {listItem && <ListDialog key={"listDialogModal"} listParam={listItem} />}
      {/* {true && <ListDialog key={"listDialogModal"} listParam={new ListItem(["Hello","Hi"],(d:any)=>{console.log(d)},"Custom Title")} />} */}

      {/* {showCreateSplit && currentUser && <CreateSplit />} */}
      {/* {searchMode && <SearchPage />} */}
      <div>
        {/* <Header /> */}
        {children}
      </div>
    </>
  );
}

export default Layout;
