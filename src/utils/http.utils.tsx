import axios from "axios";
const Qs = require("qs");

import {
  decryptDataForApi,
  encryptData,
  encryptDataForApi,
  getApiKey,
  getError,
  printOut,
} from "./app.utils";

export const NEXT_PUBLIC_DEBUG = process.env.NEXT_PUBLIC_DEBUG == "True";

export class HttpUtil {
  props: any;
  constructor(props: any) {
    this.props = props;
  }

  async performApiCall(
    path: string,
    onComplete: Function | null,
    {
      data = null,
      getMethod = false,
      silently = false,
      handleError = false,
      dontDissmissProgress = false,
      progressMessage = "Please wait",
    }: {
      data?: any;
      getMethod?: boolean;
      silently?: boolean;
      handleError?: boolean;
      dontDissmissProgress?: boolean;
      progressMessage?: string;
    } = {}
  ) {
    const { showLoading, hideLoading, failedDialog, successDialog } =
      this.props;

    if (!silently) {
      showLoading(progressMessage ?? "Please Wait");
    }

    let baseUrl = process.env.NEXT_PUBLIC_BASED_URL;
    let url = `${baseUrl}${path}`;
    //   printOut("Url: $url");

    if (getMethod && data != null && data.size != 0) {
      url = `${url}?${Qs.stringify(data)}`;
    }

    //let auth = getAuth();
    let token = null;
    // if (auth != null && auth != undefined) {
    //   try {
    //     let user = auth.currentUser;
    //     if (user != null && user != undefined) {
    //       token = await user.getIdToken();
    //     }
    //   } catch (e) {}
    // }
    token = localStorage.getItem("token");
    const APIKey = process.env.NEXT_PULIC_API_KEY;
    let header = {
      "Content-Type": "application/json",
      // apikey: getApiKey(data ?? {}),
      authorization: token == null ? undefined : `Bearer ${token}`,
      // url: url,

      XApiKey: APIKey,
    };
    let payload = encryptDataForApi(data);

    // if (NEXT_PUBLIC_DEBUG) {
    //   printOut(`Requesting >> ${url} || ${JSON.stringify(data)} || ${payload} || ${JSON.stringify(header)} <<`);
    // }
    // console.log(`Requesting >> ${url} ||  ${JSON.stringify(data)}  <<`)
    try {
      let response = await (!getMethod
        ? axios.post(url, { body: { data: payload } }, { headers: header })
        : axios.get(url, { headers: header }));

      let body = response.data;
      let encryptedResponse = body.response;
      printOut(`encryptedResponse: ${encryptedResponse}`);
      let decryptedResponse = decryptDataForApi(encryptedResponse);
      printOut(`decryptedResponse: ${decryptedResponse}`);

      console.log(response);
      let respData = JSON.parse(decryptedResponse);
      console.log(respData);
      if (NEXT_PUBLIC_DEBUG) {
        // printOut(
        //   `Response >> ${response.status} || ${JSON.stringify(respData)} <<`
        // );
      }
      // let statusCode = respData["statusCode"] ;
      let status = respData["status"] ?? false;

      let message = respData["message"] ?? "";

      if (status != true) {
        // if(statusCode===401){
        //   const userId=

        // }
        if (!silently) {
          hideLoading();
        }
        if (handleError) {
          failedDialog(message);
        } else {
          if (onComplete != undefined && onComplete != null)
            onComplete(respData, message);
        }
        // this.checkIndexError(message);
        return message;
        // onComplete(null, message);
      } else {
        if (!silently && !dontDissmissProgress) {
          hideLoading();
        }
        // console.log("statustCode in successs",  statusCode)
        var result = respData["data"] ?? respData;
        if (onComplete != undefined && onComplete != null)
          onComplete!(result, null, message);
        return result;
      }
      // })
    } catch (e) {
      hideLoading();
      let error = `${getError(e)}`;
      if (handleError) {
        failedDialog(error);
      } else {
        if (onComplete != undefined && onComplete != null)
          onComplete(null, error);
      }
      return error;
    }
  }

  //   checkIndexError(message: string) {
  //     if (message.includes("requires an index")) {
  //       this.performApiCall("user/triggerIndexEmail", null, {
  //         data: {
  //           data: message,
  //         },
  //         silently: true,
  //         handleError: false,
  //       });
  //     }
  //   }
  // }

  // export async function performStandAloneApiCall(
  //   path: string,
  //   onComplete: Function | null,
  //   {
  //     data = null,
  //     getMethod = false,
  //   }: {
  //     data?: any;
  //     getMethod?: boolean;
  //     silently?: boolean;
  //     handleError?: boolean;
  //     dontDissmissProgress?: boolean;
  //     progressMessage?: string;
  //   } = {}
  // ) {
  //   let baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  //   let url = `${baseUrl}${path}`;

  //   if (getMethod && data != null) {
  //     url = `${url}?${Qs.stringify(data)}`;
  //   }

  //   let header = {
  //     "Content-Type": "application/json",
  //    // apikey: getApiKey(data ?? {}),
  //     // url: url,
  //     xroute: "web",
  //   };
  //   let payload= encryptDataForApi(data)
  //   if (NEXT_PUBLIC_DEBUG) {
  //     printOut(`xRequesting >> ${url} || ${JSON.stringify(data)} || ${payload} <<`);
  //   }
  //   try {

  //     let response = await (!getMethod
  //       ? axios.post(url, {data:payload}, { headers: header })
  //       : axios.get(url, { headers: header }));
  //     // .then((response) => {
  //     let respData = response.data;

  //     if (NEXT_PUBLIC_DEBUG) {
  //       // printOut(
  //       //   `Response >> ${response.status} || ${JSON.stringify(respData)} <<`
  //       // );
  //     }

  //     let success = respData["success"] ?? false;

  //     let message = respData["message"] ?? "";

  //     if (success != true) {
  //       if (onComplete != undefined && onComplete != null) {
  //         onComplete(null, message);
  //       }
  //       return message;
  //       // onComplete(null, message);
  //     } else {
  //       var result = respData["data"];
  //       if (onComplete != undefined && onComplete != null)
  //         onComplete(result, null);
  //       return result;
  //     }
  //     // })
  //   } catch (e) {
  //     let error = `${getError(e)}`;
  //     if (onComplete != undefined && onComplete != null) {
  //       onComplete(null, error);
  //     }
  //     return error;
  //   }
  // }

  // export const httpUtil = new HttpUtil();

  // export async function getFromFirebase(String collection,onComplete){
  //   performApiCall("firebase/getItems", onComplete,);
}
