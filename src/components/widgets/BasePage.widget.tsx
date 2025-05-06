// @ts-ignore
import { useAuth } from "@/context/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { extractLink, isLinkRestricted, printOut } from "../../utils/app.utils";
import { useHistory } from "@/context/history.context";
import { EmtpyWidget, LoadingBar } from "../../utils/widget.utils";

export default function BasePage({
  loadItems,
  itemBuilder,
}: // onPageClosed,
// pageTitle = "",
// appBarChild,
// appBarButton,
{
  loadItems?: Function;
  itemBuilder: any;
  // onPageClosed?: Function;
  // pageTitle?: string;
  // appBarChild?: any;
  // appBarButton?: any;
}) {
  // const { loadItems, ItemBuilder } = param;
  const [resultItems, setResultItems] = useState<any>(null);
  const [pageError, setPageError] = useState<string | null>(null);
  const [setup, setPageSetup] = useState(false);
  const router = useRouter();
  const { history, back } = useHistory();
  const { userLoaded } = useAuth();
  useEffect(() => {
    if (userLoaded) {
      dataHandler();
    }
  }, [setup, userLoaded]);

  async function dataHandler({
    retrying = false,
  }: { retrying?: boolean } = {}) {
    // if (isLinkRestricted(extractLink()) && currentUser == null) return;
    if (setup && !retrying) return;
    setPageSetup(true);

    if (loadItems == undefined || loadItems == null) {
      setResultItems([]);
      return;
    }
    setPageError(null);
    printOut(`fetching data...`);
    let result = await loadItems!();
    if (result == null) {
      setPageError(`Error result is null`);
    } else if (typeof result == "string") {
      setPageError(result);
    } else {
      // let itemList = result["Message"] ?? [];
      setResultItems(result);
    }
  }

  if (!userLoaded) return <LoadingBar fullscreen />;
  return (
    <div className="w-full h-full">
      {/* <AppBarWidget
        onClick={() => {
          if (onPageClosed != undefined && onPageClosed != null) {
            onPageClosed();
          } else {
            back();
          }
        }}
        title={pageTitle}
        child={appBarChild}
        button={resultItems && appBarButton}
      /> */}
      <div className="flex-1 item-center justify-center flex w-full h-full overflow-y-auto">
        {pageError != null ? (
          <div className="w-4/5 md:w-1/2 h-full items-center justify-center flex px-4">
            <EmtpyWidget
              title={`${pageError}`}
              retryClicked={() => dataHandler({ retrying: true })}
            />
          </div>
        ) : !resultItems ? (
          <div className="w-full h-full items-center justify-center flex">
            <i className="circle_loader w-5 h-5 mb-16"></i>
          </div>
        ) : (
          itemBuilder(resultItems)
        )}
      </div>
    </div>
  );
}
