import { delay } from "../../../utils/app.utils";
// @ts-ignore
import { useUtils } from "../../../context/utils.context";
// import InputField from "../InputField";
import { YMargin } from "../../../utils/widget.utils";
import useWindowSize from "../../../utils/screenSize.utils";
import { useEffect, useState } from "react";

export default function ListDialog(param: ListParam) {
  const { setShowListDialog, showPopup } = useUtils();
  const {
    images,
    items,
    selections,
    singleSelection,
    onSelected,
    returnIndex,
    title,
    canSearch,
    modal,
  } = param.listParam;
  const size = useWindowSize();

  const [showUI, setShowUI] = useState<boolean>(false);
  const [triggerSet, setTriggerSet] = useState<boolean>(false);

  const [selectionMode, setSelectionMode] = useState(
    singleSelection == true || singleSelection == false
  );
  const [selectedItems, setSelectedItems] = useState<Array<string>>(
    selections ?? []
  );
  const [search, setSearch] = useState("");

  useEffect(() => {
    handleTrigger();
  });

  async function handleTrigger() {
    if (triggerSet) return;
    setTriggerSet(true);
    await delay(100);
    setShowUI(true);
  }

  async function dismiss() {
    setShowUI(false);
    await delay(500);
    setShowListDialog(null);
  }

  return (
    <>
      <div className="fixed z-40 flex items-center justify-center w-screen h-screen">
        <div
          className="absolute top-0 bottom-0 left-0 right-0 z-30 w-screen h-screen duration-500 bg-black bg-opacity-50 backdrop-blur-sm"
          onClick={() => {
            dismiss();
          }}
          style={{
            opacity: `${showUI ? 0.9 : 0}`,
          }}
        />

        <div
          className="absolute z-40 flex flex-col items-end justify-start w-5/6 px-6 py-6 mx-3 duration-500 bg-white shadow-xl md:w-1/2 lg:w-1/3 sm:mx-6 md:px-8"
          style={{
            width:
              modal && size.width < 768
                ? "100%"
                : size.width < 768
                  ? "83%"
                  : size.width < 976
                    ? "50%"
                    : "33%",

            borderBottomRightRadius: modal && size.width < 768 ? 0 : 12,
            borderBottomLeftRadius: modal && size.width < 768 ? 0 : 12,
            borderTopRightRadius: 12,
            borderTopLeftRadius: 12,
            bottom: modal && size.width < 768 ? 0 : undefined,
            marginBottom: `${showUI ? "0px" : `-1000px`}`,
            opacity: `${showUI ? 1 : 0}`,
          }}
        >
          {/* <img src="/img/icon2.png" className="absolute z-0 w-10 h-10 opacity-10" /> */}

          <div className="flex flex-col items-start justify-center w-full h-full">
            {title && (
              <h1 className="z-10 mb-5 font-semibold text-black sm:text-xl text-start">
                {title}
              </h1>
            )}

            {/* {canSearch && (
              // <InputField
              //   id="Search"
              //   hint="Search"
              //   name="Search"
              //   iconClass="fa-solid fa-magnifying-glass"
              //   value={search}
              //   onChanged={(text: any) => {
              //     setSearch(text);
              //   }}
              // />
            )} */}
            {canSearch && <YMargin />}
            <ol className="w-full max-h-[400px] items-center justify-center overflow-y-auto">
              {items.map((text, index, list) => (
                <li
                  key={`${index}${text}`}
                  className="w-full py-3 duration-500 border-solid cursor-pointer border-slate-200 hover:font-bold group"
                  onClick={() => {
                    if (selectionMode) {
                      let items = Array.from(selectedItems);
                      if (singleSelection) items = [];
                      if (items?.includes(text)) {
                        let itemIndex = selectedItems.indexOf(text);
                        items.splice(itemIndex, 1);
                      } else {
                        items?.push(text);
                      }

                      setSelectedItems(items);
                      // printOut(items);
                      return;
                    }
                    dismiss();

                    onSelected(returnIndex ? index : text);
                  }}
                  style={{
                    // borderBottomWidth: `${
                    //   index == list.length - 1 ? "0px" : "1px"
                    // }`,
                    display:
                      search.length != 0 &&
                      !`${text}`
                        .toLowerCase()
                        .includes(search.trim().toLowerCase())
                        ? "none"
                        : "block",
                  }}
                >
                  <div className="flex flex-row items-center">
                    {images && (
                      <div className="flex items-center justify-center p-1 mr-2 text-center rounded-full bg-default_white">
                        <span
                          className="duration-150 rounded-full material-icons text-app_color"
                          style={{
                            fontSize: 25,
                            width: 25,
                            height: 25,
                          }}
                        >
                          {images![index]}
                        </span>
                      </div>
                    )}

                    <h1 className="flex-1 text-md">{`${text}`}</h1>
                    {selectionMode && (
                      <div className="flex items-center justify-center w-6 h-6 p-1 border-2 border-black border-solid rounded-full">
                        {selectedItems?.includes(text) && (
                          <i className="fa-solid fa-circle-check"></i>
                        )}
                      </div>
                    )}
                  </div>
                </li>
              ))}
              {selectedItems.length > 0 && (
                <button
                  type="submit"
                  className="z-10 mt-5 bg-blue0 w-1/3 h-[50px] rounded-full text-white 
                  text-xl font-bold hover:bg-blue3 duration-500"
                  onClick={() => {
                    dismiss();
                    onSelected(selectedItems);
                    // showPopup(`${selectedItems}`)
                    // if(onPositiveClicked)onPositiveClicked()
                  }}
                >
                  {"Ok"}
                </button>
              )}
            </ol>
          </div>
        </div>
      </div>
    </>
  );
}

interface ListParam {
  listParam: ListItem;
}

export class ListItem {
  title;
  items;
  images;
  selections;
  singleSelection;
  onSelected;
  returnIndex;
  canSearch;
  modal;

  constructor(
    items: Array<string>,
    onSelected: Function,
    {
      title,
      images,
      selections,
      singleSelection,
      returnIndex = true,
      canSearch = false,
      modal = false,
    }: {
      title?: string;
      returnIndex?: boolean;
      canSearch?: boolean;
      images?: Array<string>;
      selections?: Array<string>;
      singleSelection?: boolean;
      modal?: boolean;
    } = {}
  ) {
    this.title = title;
    this.onSelected = onSelected;
    this.items = items;
    this.images = images;
    this.selections = selections;
    this.singleSelection = singleSelection;
    this.returnIndex = returnIndex;
    this.canSearch = canSearch;
    this.modal = modal;
  }
}
