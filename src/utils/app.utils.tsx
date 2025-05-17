// export default function App
import { useAuth } from "../context/auth.context";
// import { useAuth } from "../context/auth.context";
import { useUtils } from "../context/utils.context";

const crypto = require("crypto");
var CryptoJS = require("crypto-js");
const Qs = require("qs");

const ENC_KEY = process.env.NEXT_PUBLIC_ENC_KEY;
const ENC_IV = process.env.NEXT_PUBLIC_ENC_IV;
const rsa = process.env.NEXT_PUBLIC_RSA_KEY;
export const ALGO = "aes-256-cbc";
export const TRANSFER = "transfer";
export const DATA_BUNDLE = "mobile data bundles";
export const MOBILE_RECHARGE = "mobile recharge";
export const CABLE_TV = "cable tv bills";
export const UTILITY_BILL = "utility bills";
export const INTERNET_SERVICE = "internet services";
const RSA_PUBLIC_KEY = `-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAhuGud1SBsSqchJJMEzuG
Xw/y/uD0MCgH95JH0W40TncOvHhKUOfQ/IMOSAOq7sK8wm1c2PTS3q/edQzuUAOG
d6xmNANH6vBnNGxJqKOKEt8n9N4VzfDE03kIMHG6WcuB8C57apiPIYEJ8T1nKdyy
kgZ6Kpzv2piytov1ioRXkiGCKjifwWy66lFsP0XZZjBrtngW9mdMf8T1vS6V/5oq
Hc3DtbG4DxUQNOqy93eSyoxWzcjOzjLKVxYmbu+IcddlfqGgEAC3V6+xwPMerfGW
bgYlmE5dhNu57tA+c4VDc1oavXGewrL1z3vLfzl7BWZC+RtQL/IHmBoENahRLpXg
nwIDAQAB
-----END PUBLIC KEY-----`;

export const NEXT_PUBLIC_DEBUG = process.env.NEXT_PUBLIC_DEBUG == "True";
import {
  conjunctionsAndPrepositions,
  states,
  states_data,
} from "./asset.utils";
import { ListItem } from "../components/widgets/dialogs/list.dialog";
import { MessageItem } from "../components/widgets/dialogs/message.dialog";
import { allCountries } from "./countryList.utils";
import { AxiosError } from "axios";

export const getTransactionStatusIconOne = (status: string) => {
  if (status.toLowerCase() === "incoming") {
    return <i className="ri-arrow-right-up-line text-[#38C793]"></i>;
  } else if (status.toLowerCase() === "outgoing") {
    return <i className="ri-arrow-right-down-line text-[#DF1C41]"></i>;
  }
  return null;
};
export const getTransactionStatusIconTwo = (status: string) => {
  if (status.toLowerCase() === "successful") {
    return <i className="ri-checkbox-circle-fill text-[#38C793]"></i>;
  } else if (status.toLowerCase() === "failed") {
    return <i className="ri-information-fill text-[#FB3748]"></i>;
  } else if (status.toLowerCase() === "pending") {
    return <i className="ri-alert-fill text-[#FF8447]"></i>;
  }
  return null;
};

export const TransactionColor = (status: string) => {
  if (status.toLowerCase() === "successful") {
    return "text-[#38C793]";
  } else if (status.toLowerCase() === "failed") {
    return "text-[#FB3748]";
  } else if (status.toLowerCase() === "pending") {
    return "text-[#FF8447]";
  }
  return "text-slate-600";
};
export const TransactionColorRecipt = (status: string) => {
  if (status.toLowerCase() === "successful") {
    return "#38C793";
  } else if (status.toLowerCase() === "failed") {
    return "#FB3748";
  } else if (status.toLowerCase() === "pending") {
    return "#FF8447";
  }
  return "text-slate-600";
};

export const securityQuestions = [
  "What is your Mother's Middle Name",
  "Who was your childhood hero?",
  "What city were you born in?",
  "What was your favorite sport in high school?",
  "What was your childhood nickname?",
  "What was your dream job as a child?",
  "In what city does your nearest sibling live?",
  "In what city or town was your first job?",
  "What city were you born in?",
  "What was the make and model of your first car?",
];

export function formatCardNumber(number: string): string {
  // Replace all occurrences of "#" with "*"
  const cardNumber = number.replace(/#/g, "*");
  return cardNumber;
}

export function formatAmount(value: any, decimal = 0): String {
  if (value == null || value == undefined) return "₦ — — —";
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "NGN",

    // These options are needed to round to whole numbers if that's what you want.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: decimal, // (causes 2500.99 to be printed as $2,501)
  });
  let text = `${formatter.format(value)}`;
  text = text.replace("NGN", "₦");
  return text;
}

export function formatDigits(value: any, decimal = 2): String {
  if (value == null || value == undefined) return "0";
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: decimal,
  });
  let text = `${formatter.format(value)}`;
  return text;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function isEmailValid(email: string): boolean {
  const expression: RegExp = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  const result: boolean = expression.test(email);
  return result;
}

export function arrayBufferToBase64Image(window: any, buffer: any): any {
  var binary = "";
  var bytes = new Uint8Array(buffer);
  var len = bytes.byteLength;
  for (var i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
}

export function arrayBufferToBase64ForDownload(
  Arraybuffer: any,
  Filetype: any,
  fileName: any
) {
  let binary = "";
  const bytes = new Uint8Array(Arraybuffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  const file = window.btoa(binary);
  const mimType =
    Filetype === "pdf"
      ? "application/pdf"
      : Filetype === "xlsx"
        ? "application/xlsx"
        : Filetype === "pptx"
          ? "application/pptx"
          : Filetype === "csv"
            ? "application/csv"
            : Filetype === "docx"
              ? "application/docx"
              : Filetype === "jpg"
                ? "application/jpg"
                : Filetype === "png"
                  ? "application/png"
                  : "";
  const url = `data:${mimType};base64,` + file;

  // url for the file
  // let fileUrl = url;//sanitize.bypassSecurityTrustResourceUrl(url);

  // download the file
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  window.URL.revokeObjectURL(url);
}

export function dataURLtoFile(dataurl: any, filename: any) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = window.atob(arr[arr.length - 1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}

export async function urltoFile(url: any, filename: string, mimeType: any) {
  if (url.startsWith("data:")) {
    var arr = url.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    var file = new File([u8arr], filename, { type: mime || mimeType });
    return Promise.resolve(file);
  }
  return fetch(url)
    .then((res) => res.arrayBuffer())
    .then((buf) => new File([buf], filename, { type: mimeType }));
}

export function getError(e: any) {
  // console.log(`ex: ${JSON.stringify(e)}`);
  let error;
  try {
    let errorMap: any = (e as AxiosError).response?.data;
    if (errorMap != null) {
      error = `${errorMap.message ?? "Unexpected error occurred, please try again later"}`;
    } else {
      error = "Error occurred, please try again"; //`Unknown error ${e}`
    }
  } catch (e) {
    error = "Error occurred, please try again";
  }
  // try {
  //   error = `${
  //     e.message ?? "Unexpected error occurred, please try again later"
  //   }`;
  // } catch (e) {
  //   error = "Error occurred, please try again";
  // }

  return error;
}

export function trimPhone(phone: string, { pref }: { pref?: string } = {}) {
  if (`${phone}`.startsWith("+")) {
    return phone;
    // phone = phone.replace("+", "");
  } else {
    if (`${phone}`.startsWith("0")) {
      phone = `${phone}`.substring(1);
    }
    let prefix = pref ?? "+234";
    phone = `${prefix}${phone}`;
  }
  return phone;
}

export function trimPhoneTitle(phone: string) {
  if (`${phone}`.startsWith("+")) {
    // phone = phone.replace("+", "");
  } else {
    if (`${phone}`.startsWith("0")) {
      phone = `${phone}`.substring(1);
    }
    phone = `(+234) ${phone}`;
  }
  return phone;
}

export async function getHeader() {
  let userToken = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    authorization: `Bearer ${userToken}`,
  };
}

export function setupFocus(tag: string) {
  var container = document.getElementById(tag);
  if (container == null) return;
  container.onkeydown = function (e: any) {
    printOut(e);
    if (e.target.localName == "textarea") return;
    if (e.key != "Enter") return;

    let fIndex = -1;
    let elements = document.getElementsByClassName("myinput") as any;
    // let textareas = document.getElementsByTagName("textarea");
    // let elements = Array.from(textareas);
    for (let i = 0; i < elements.length; i++) {
      let element = elements[i];
      if (element == document.activeElement) {
        fIndex = i;
        break;
      }
    }
    if (fIndex == -1) {
      elements[0].focus();
    } else {
      let nIndex = fIndex + 1;
      if (nIndex >= elements.length) {
        elements[fIndex].blur();
      } else {
        elements[nIndex].focus();
      }
    }
  };
}

export function getApiKey(data: any): string {
  const hash = crypto
    .createHmac("sha512", process.env.API_KEY)
    .update(JSON.stringify(data))
    .digest("hex");
  return `${hash}`;
}

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function formatTranDate(time: number): String {
  var d = new Date(time);
  var day = days[d.getDay()];
  var hr = d.getHours();
  var min = d.getMinutes();

  let minText = `${min}`;
  if (min < 10) {
    minText = "0" + min;
  }
  var ampm = "AM";
  if (hr > 12) {
    hr -= 12;
    ampm = "PM";
  }
  var date = d.getDate();
  var month = months[d.getMonth()];
  var year = d.getFullYear().toString();
  year = year.substring(2, 4);
  return `${day}, ${date} ${month}`;
}

export function formatChatTime(time: number): String {
  var d = new Date(time);
  var day = days[d.getDay()];
  var hr = d.getHours();
  var min = d.getMinutes();

  let minText = `${min}`;
  if (min < 10) {
    minText = "0" + min;
  }
  var ampm = "AM";
  if (hr > 12) {
    hr -= 12;
    ampm = "PM";
  }
  var date = d.getDate();
  var month = months[d.getMonth()];
  var year = d.getFullYear().toString();
  // year = year.substring(2, 4);
  return `${hr}:${min}${ampm}`;
}
export function formatTranDateFull(time: number, withTime = false): String {
  var d = new Date(time);
  var day = days[d.getDay()];
  var hr = d.getHours();
  var min = d.getMinutes();

  let minText = `${min}`;
  if (min < 10) {
    minText = "0" + min;
  }
  var ampm = "AM";
  if (hr > 12) {
    hr -= 12;
    ampm = "PM";
  }
  var date = d.getDate();
  var month = months[d.getMonth()];
  var year = d.getFullYear().toString();
  // year = year.substring(2, 4);
  return `${day}, ${date} ${month} ${year} ${withTime ? `AT ${hr}:${min}${ampm}` : ``}`;
}

export function getChatData(time: number): String {
  var d = new Date(time);
  var day = days[d.getDay()];
  var hr = d.getHours();
  var min = d.getMinutes();

  let minText = `${min}`;
  if (min < 10) {
    minText = "0" + min;
  }
  var ampm = "AM";
  if (hr > 12) {
    hr -= 12;
    ampm = "PM";
  }
  var date = d.getDate();
  var month = months[d.getMonth()];
  var year = d.getFullYear().toString();
  // year = year.substring(2, 4);
  return `${day}, ${date} ${month} ${year} ${`AT ${hr}:${min}${ampm}`}`;
}

export function getFormattedDate(time: number): String {
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var d = new Date(time);
  // var day = days[d.getDay()];
  var hr = d.getHours();
  var min = d.getMinutes();

  let minText = `${min}`;
  if (min < 10) {
    minText = "0" + min;
  }
  var ampm = "AM";
  if (hr > 12) {
    hr -= 12;
    ampm = "PM";
  }
  var date = d.getDay();
  var month = months[d.getMonth()];
  var year = d.getFullYear().toString();
  year = year.substring(2, 4);
  return `${date}-${month}-${year}`;
}

export function generateCode(length: number): String {
  let code = "";
  length = length == null || length == undefined ? 6 : length;
  for (let i = 0; i < length; i++) {
    code = `${code}${Math.floor(Math.random() * 10)}`;
  }
  return code;
}

export function generateRandomIdShort(lenght = 5, numOnly = false) {
  let texts = "abcdefghijklmnopqrstuvwxyz";
  let nums = "0123456789";

  let code = "";
  for (let i = 0; i < lenght; i++) {
    let x = `${Math.floor(Math.random() * 2)}`;
    let useNum = x == "0";
    if (useNum || numOnly) {
      let y = `${Math.floor(Math.random() * nums.length)}`;
      code = `${code}${y}`;
    } else {
      let x = `${Math.floor(Math.random() * 2)}`;
      let upper = x == "0";
      let y = `${Math.floor(Math.random() * texts.length)}`;
      let s = texts[Number(y)];
      if (upper) s = s.toUpperCase();
      code = code + s;
    }
  }
  if (numOnly) {
  } else {
    let x = `${Math.floor(Math.random() * 2)}`;
    let y = `${Math.floor(Math.random() * texts.length)}`;
    let s = texts[Number(y)];
    if (x == "0") s = s.toUpperCase();
    code = code.substring(0, code.length - 1) + s;
  }
  return code;
}

export function getIndexFromMap(
  key: string,
  value: string,
  mapList: any
): number {
  let index = -1;

  for (let i = 0; i < mapList.length; i++) {
    if (value == mapList[i][key]) {
      index = i;
      break;
    }
  }

  return index;
}

const rand_icons = [
  "fa-solid fa-square",
  "fa-solid fa-star",
  "fa-solid fa-circle",
];
export function getRandomIcon(type: number) {
  type = type ?? 0;
  return rand_icons[type % rand_icons.length];
}

// export function getSavedPath(): any {
//   let path = localStorage.getItem("path");
//   // if (path == null) return null;
//   // let pathString = localStorage.getItem("paths");
//   // if (pathString != null && pathString != undefined) {
//   //   let paths = JSON.parse(pathString);
//   //   for (let i in paths) {
//   //     path = path?.replace(`[${i}]`, paths[i]);
//   //   }
//   // }
//   return path;
// }

export function mask(text: string) {
  let inits = "";
  let parts = text.split("");
  let half = Math.ceil(parts.length / 2);
  let maskCount = 0;
  let startMask = false;
  for (let i = 0; i < parts.length; i++) {
    let s = parts[i];
    if (startMask && maskCount >= half) {
      startMask = false;
    }
    if (i == Math.ceil(half / 2)) {
      startMask = true;
    }
    if (startMask) {
      inits += "*";
      maskCount++;
    } else {
      inits += s;
    }
  }
  return inits.trim();
}

export function capitalizeFirst(text: string) {
  return `${text.substring(0, 1).toUpperCase()}${text.substring(1)}`;
}

// export async function uploadFile64(file: any, onComplete: any) {
//   // const { showLoading, hideLoading } = useUtils();
//   // printOut(`Uploading: ${file}`);
//   let refId = generateRandomIdShort(12);
//   const storage = getStorage();
//   const storageRef = ref(storage, refId);

//   uploadString(storageRef, file, "base64").then((snapshot) => {
//     printOut("Uploaded a blob or file!");
//     getDownloadURL(snapshot.ref)
//       .then((url) => {
//         // hideLoading();
//         onComplete({ url: url, reference: snapshot.ref }, null);
//       })
//       .catch((e) => {
//         // hideLoading();
//         onComplete(null, getError(`${e}`));
//       });
//   });
// }

// export async function uploadFileBlob(
//   file: any,
//   onComplete: any,
//   { ext = "" }: { ext?: string } = {}
// ) {
//   // const { showLoading, hideLoading } = useUtils();
//   printOut(`Uploading: ${file}`);
//   let refId = generateRandomIdShort(12);
//   const storage = getStorage();
//   const storageRef = ref(storage, refId);

//   uploadBytes(storageRef, file, { contentType: "" }).then((snapshot) => {
//     printOut("Uploaded a blob or file!");
//     getDownloadURL(snapshot.ref)
//       .then((url) => {
//         // hideLoading();
//         onComplete({ url: url, reference: snapshot.ref }, null);
//       })
//       .catch((e) => {
//         // hideLoading();
//         printOut(`Uploading error: ${e}`);
//         onComplete(null, getError(`${e}`));
//       });
//   });
// }

export function extractLink() {
  let link = window.location.href;
  link = trimLink(link);
  link = link.substring(link.indexOf("/"), link.length);
  return link;
}
export function extractValueFromLink(title: string) {
  let link = extractLink();
  if (link.includes(`?`)) {
    link = link.substring(link.indexOf(`?`), link.length);
    let parts = link.split("&");
    for (let index in parts) {
      let part = parts[index];
      if (part.includes(title)) {
        let value = part.substring(
          part.indexOf(`${title}=`) + title.length + 1,
          part.length
        );
        return value;
      }
    }
  }
  return null;
}

export function trimLink(link: string) {
  link = link.replace("http://www.", "");
  link = link.replace("https://www.", "");
  link = link.replace("http://", "");
  link = link.replace("https://", "");
  return link;
}

export function getLinkToSave(link?: string, force = false) {
  if (link == null || link == undefined) return null;
  link = link.replace("http://www.", "");
  link = link.replace("https://www.", "");
  link = link.replace("http://", "");
  link = link.replace("https://", "");
  try {
    link = link.substring(link.indexOf("/"), link.length);
    // console.log(`The x link: ${link}`);
  } catch (e) {}
  if (link.trim().length == 0) return null;
  if (force == false) {
    if (
      // link.includes("#") ||
      !isLinkRestricted(link)
    ) {
      return null;
    }
  }
  return link;
}

export function savePage({ force = false }: { force?: boolean } = {}) {
  let link = window.location.href;
  let page = getLinkToSave(link, force);
  localStorage.removeItem("user");
  saveToLocal("lastlink", page);
}

export function resumePage(router: any) {
  let last = getFromLocal("lastlink") as any;
  // console.log(`Last link: ${last}`);
  if (last == null || last == undefined || last.length == 0) {
    router.push("/home");
    return;
  }
  router.push(last);
  // if (lp != null && lp != undefined) {
  //   lp = lp.replace("http://", "");
  //   lp = lp.replace("https://", "");
  //   lp = lp.replace("http://www.", "");
  //   lp = lp.replace("https://www.", "");

  //   let link;
  //   try {
  //     link = lp.substring(lp.indexOf("/"), lp.length);
  //   } catch (e) {
  //     router.push("/home");
  //   }
  //   if (link != null && link != undefined && link.trim().length != 0) {
  //     if (
  //       lp.includes("/faqs") ||
  //       lp.includes("/login") ||
  //       lp.includes("/signup") ||
  //       lp.includes("forgot_password")
  //     ) {
  //       router.push("/home");
  //     } else {
  //       router.push(link);
  //     }
  //   } else {
  //     router.push("/home");
  //   }
  // } else {
  //   router.push("/home");
  // }
}

export function saveToLocal(key: any, data: any) {
  localStorage.setItem(key, data);
}

export function getFromLocal(key: any) {
  let data = localStorage.getItem(key);
  // console.log(`Got from local: ${JSON.s}`)
  if (data == null || data == undefined) return data;
  if (data.length == 0) return data;
  return data;
}

export function encryptData(data: any): string {
  var ciphertext = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    process.env.NEXT_PUBLIC_API_KEY
  ).toString();
  return ciphertext;
}
export function encryptDataForApiRSA(data: any): string {
  const bufferData = Buffer.from(JSON.stringify(data), "utf8");

  const encrypted = crypto.publicEncrypt(
    {
      key: RSA_PUBLIC_KEY,
      padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      oaepHash: "sha256",
    },
    bufferData
  );
  console.log(encrypted.toString("base64"));
  return encrypted.toString("base64");
}
export function encryptDataForApi(data: any): string {
  let cipher = crypto.createCipheriv(ALGO, ENC_KEY, ENC_IV);
  let encrypted = cipher.update(JSON.stringify(data), "utf8", "base64");
  encrypted += cipher.final("base64");
  return encrypted;
}
export function decryptDataForApi(data: any): string {
  let decipher = crypto.createDecipheriv(ALGO, ENC_KEY, ENC_IV);
  let decrypted = decipher.update(data, "base64", "utf8");
  decrypted = decrypted + decipher.final("utf8");
  if (decrypted.startsWith('"')) {
    decrypted = decrypted.substring(1);
  }
  if (decrypted.endsWith('"')) {
    decrypted = decrypted.substring(0, decrypted.length - 1);
  }

  return decrypted;
}

export function decryptData(data: any): string {
  var bytes = CryptoJS.AES.decrypt(data, process.env.NEXT_PUBLIC_API_KEY);

  var decryptedData;
  try {
    decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  } catch (e) {}
  return decryptedData ?? "";
}

export function printOut(data: any) {
  if (NEXT_PUBLIC_DEBUG) console.log(`${data}`);
}

export function saveLogTime() {
  let date = new Date();
  let now = date.getTime();
  saveToLocal("lt", `${now}`);
}

export function reLogin(): boolean {
  // return false;
  let lt = getFromLocal("lt"); //lt is short for lat time, to tell the last time a user logged
  if (lt == null || lt == undefined) return true;
  let time = Number(lt);
  let date = new Date();
  let now = date.getTime();
  if (now - time > 1000 * 60 * 60 * 24 * 7) return true;
  return false;
}

export function formatNumber(n: any) {
  // format number 1000000 to 1,234,567
  return n.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function formatCurrency(input: any, blur?: any) {
  // appends $ to value, validates decimal side
  // and puts cursor back in right position.

  // get input value
  var input_val = input.value;

  // don't validate empty input
  if (input_val === "") {
    return;
  }

  // original length
  var original_len = input_val.length;

  // initial caret position
  var caret_pos = input.selectionStart;

  // check for decimal
  if (input_val.indexOf(".") >= 0) {
    // get position of first decimal
    // this prevents multiple decimals from
    // being entered
    var decimal_pos = input_val.indexOf(".");

    // split number by decimal point
    var left_side = input_val.substring(0, decimal_pos);
    var right_side = input_val.substring(decimal_pos);

    // add commas to left side of number
    left_side = formatNumber(left_side);

    // validate right side
    right_side = formatNumber(right_side);

    // On blur make sure 2 numbers after decimal
    if (blur === "blur") {
      right_side += "00";
    }

    // Limit decimal to only 2 digits
    right_side = right_side.substring(0, 2);

    // join number by .
    input_val = "₦" + left_side + "." + right_side;
  } else {
    // no decimal entered
    // add commas to number
    // remove all non-digits
    input_val = formatNumber(input_val);
    input_val = "₦" + input_val;

    // final formatting
    if (blur === "blur") {
      input_val += ".00";
    }
  }

  // send updated string to input
  input.value = input_val;

  // put caret back in the right position
  var updated_len = input_val.length;
  caret_pos = updated_len - original_len + caret_pos;
  input.setSelectionRange(caret_pos, caret_pos);
}

export function selectRegion(showListDialog: any, onComplete: Function) {
  let stateData = Array.from(states_data);
  // stateData.sort((a, b) => (`${a["state"]}` < `${b["state"]}` ? -1 : 0));
  // console.log(`states: ${JSON.stringify(stateData)}`);
  let stateList = [] as any;

  for (let i = 0; i < stateData.length; i++) {
    let item = stateData[i];
    let stateName = item["state"];
    stateList.push(stateName);
  }

  let state = "";
  let stateIndex = 0;
  let region = "";
  showListDialog(
    new ListItem(
      stateList,
      async (index: any) => {
        state = stateList[index];
        stateIndex = index;

        let list = [] as any;
        let items = (stateData[stateIndex] as any)["cities"] as any;
        for (let i = 0; i < items.length; i++) {
          let regionName = items[i] as any;
          list.push(regionName);
        }

        await delay(1000);
        showListDialog(
          new ListItem(
            list,
            (index: any) => {
              region = list[index];
              onComplete([state, region]);
            },
            { title: "Select Region", canSearch: true }
          )
        );
      },
      {
        title: "Select State",
        canSearch: true,
      }
    )
  );
}

export function getSearchString(text: string) {
  text = text.toLowerCase().trim();
  text = text.replaceAll(",", " ");
  if (text.trim().length == 0) return [];

  let list = [];
  list.push(text);
  var parts = text.split(" ");
  for (let index in parts) {
    let s = parts[index];
    if (s.length != 0 && !list.includes(s)) list.push(s);
    for (let i = 0; i < s.length; i++) {
      let sub = s.substring(0, i);
      if (sub.length != 0 && !list.includes(sub)) list.push(sub);
    }
  }
  for (let i = 0; i < text.length; i++) {
    let sub = text.substring(0, i);
    if (sub.length != 0 && !list.includes(sub)) list.push(sub.trim());
  }
  let longText = text.replaceAll(" ", "");
  for (let i = 0; i < longText.length; i++) {
    let sub = longText.substring(0, i);
    if (sub.length != 0 && !list.includes(sub)) list.push(sub.trim());
  }
  return list;
}

export function getTimerText(
  secondsValue: number,
  { three = false }: { three?: boolean } = {}
) {
  const pad = (n: any) => (n < 10 ? `0${n}` : n);

  const h = Math.floor(secondsValue / 3600);
  const m = Math.floor(secondsValue / 60) - h * 60;
  const s = Math.floor(secondsValue - h * 3600 - m * 60);

  return three ? `${pad(h)}:${pad(m)}:${pad(s)}` : `${pad(m)}:${pad(s)}`;
  // if (secondsValue == null) return "00:00";
  // if (secondsValue == 0) return "00:00";
  // let seconds = secondsValue;
  // let hour = Math.ceil(seconds / (60 * 60));
  // let min = Math.ceil((seconds / 60) % 60);
  // let sec = Math.ceil(seconds % 60);

  // let h = hour.toString();
  // let m = min.toString();
  // let s = sec.toString();

  // let hs = h.length == 1 ? `0${h}` : h;
  // let ms = m.length == 1 ? `0${m}` : m;
  // let ss = s.length == 1 ? `0${s}` : s;

  // return three ? `${hs}:${ms}:${ss}` : `${ms}:${ss}`;
}

export function getIdFromLink(link: string) {
  let id = link.substring(link.lastIndexOf("/") + 1, link.length);
  if (id.includes("?")) {
    return id.substring(0, id.indexOf("?"));
  }
  return id;
}

export function getQueryParam(key: any) {
  const urlParams = new URLSearchParams(window.location.search);
  const myParam = urlParams.get(key);
  return myParam;
}

export function getFittedHeight(
  screenSize: any,
  originalImageWidth: number,
  originalImageHeight: number,
  { padding = 0 }: { padding?: number } = {}
) {
  let heightRatio = originalImageWidth / originalImageHeight;

  let adjustedScreenWidth = screenSize.width - padding;

  let diff = adjustedScreenWidth - originalImageWidth;

  let ratio = diff / heightRatio;

  let fittedHeight = originalImageHeight + ratio;

  return fittedHeight;
}

export function getFittedWidth(
  screenSize: any,
  originalImageWidth: number,
  originalImageHeight: number,
  screenHeight: number
) {
  let widthRatio = originalImageHeight / originalImageWidth;

  let diff = screenHeight - originalImageHeight;

  let ratio = diff / widthRatio;

  let fittedWidth = originalImageWidth + ratio;

  return fittedWidth;
}
export const isValidEmail = (email: string) => {
  // Basic regex for email validation
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export const isValidNigerianPhone = (phone: string) => {
  return (
    /^0\d{10}$/.test(phone) || /^234[1-9]\d{9}$/.test(phone) // starts with 0 or 234 but not 2340
  );
};
export function isLinkRestricted(path: string): boolean {
  // console.log("this is the path", path);

  if (path == "/") return false;
  if (path.includes("/index_old")) return false;

  if (path.includes("/pages/resetpassword")) return false;
  if (path.includes("/onboarding")) return false;
  if (path.includes("/pages/card-tokenization")) return false;
  if (path.includes("/confirmbankpayment")) return false;
  if (path.includes("/auth")) return false;
  if (path.includes("/dasboard")) return false;

  //  console.log(``)

  if (path.includes("/forgot_password")) return false;
  if (path.includes("/unlockaccount")) return false;

  if (path.includes("/reset_password/")) return false;

  if (path.includes("/cookie-policy")) return false;
  if (path.includes("/business/onboarding")) return false;
  if (path.includes("/dashboard")) return false;

  return true;
}
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}
export function formatGbpAmount(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    minimumFractionDigits: 2,
    maximumFractionDigits: 20,
  }).format(amount);
}
export function floorProgress(progress: number) {
  return Math.floor(progress);
}

export function GetIcon({
  icon,
  size,
  color,
  opacity = 1,
}: {
  icon: string;
  size: number;
  color: string;
  opacity?: number;
}) {
  return (
    <span
      className="material-icons"
      style={{
        fontSize: size,
        width: size,
        height: size,
        opacity: opacity,
        color: !color.startsWith("var(") ? `var(--${color})` : color,
      }}
    >
      {icon}
    </span>
  );
}

export function getSearchingList(text: any) {
  text = `${text}`.toLowerCase().trim();
  text = ` ${text} `;
  let cleanText: string = text.replace(/[^\w\s]/gi, "");
  cleanText = cleanText.replace(/[0-9]/g, "");
  for (let index in conjunctionsAndPrepositions) {
    let t = conjunctionsAndPrepositions[index];
    t = t.toLowerCase().trim();
    cleanText = cleanText.replaceAll(` ${t} `, " ");
  }
  let list = [];
  let parts = cleanText.split(" ");
  let count = 0;
  for (let index in parts) {
    let part = parts[index];
    if (part.trim().length == 0) continue;
    if (part == "a" || part == "an") continue;
    if (count > 9) break;
    list.push(part.trim());
    count++;
  }
  printOut(`got search list: ${list}`);
  return list;
}

export function isSameDay(time1: number, time2: number): boolean {
  let date1 = new Date(time1);
  let date2 = new Date(time2);

  return (
    date1.getDay() == date2.getDay() &&
    date1.getMonth() == date2.getMonth() &&
    date1.getFullYear() == date2.getFullYear()
  );
}

export function cloneMap(item: any) {
  let newMap = {} as any;
  for (let key in item) {
    newMap[`${key}`] = item[key];
  }
  return newMap;
}

export function isEmpty(item: any) {
  if (typeof item == "string") {
    return item.length == 0;
  }

  let count = 0;
  for (let key in item) {
    count++;
  }
  return count == 0;
}

export function getLength(item: any) {
  if (typeof item == "string") {
    return item.length == 0;
  }

  let count = 0;
  for (let key in item) {
    count++;
  }
  return count;
}

export function getExtImage(fileExtension: string) {
  if (fileExtension == null) return "";
  fileExtension = fileExtension.toLowerCase().trim();
  if (fileExtension.includes("doc")) {
    return "icon_file_doc";
  } else if (fileExtension.includes("pdf")) {
    return "icon_file_pdf";
  } else if (fileExtension.includes("xls")) {
    return "icon_file_xls";
  } else if (fileExtension.includes("ppt")) {
    return "icon_file_ppt";
  } else if (fileExtension.includes("txt")) {
    return "icon_file_text";
  } else if (fileExtension.includes("zip")) {
    return "icon_file_zip";
  } else if (fileExtension.includes("xml")) {
    return "icon_file_xml";
  } else if (
    fileExtension.includes("png") ||
    fileExtension.includes("jpg") ||
    fileExtension.includes("jpeg")
  ) {
    return "icon_file_photo";
  } else if (
    fileExtension.includes("mp4") ||
    fileExtension.includes("3gp") ||
    fileExtension.includes("mpeg") ||
    fileExtension.includes("avi")
  ) {
    return "icon_file_video";
  } else if (
    fileExtension.includes("mp3") ||
    fileExtension.includes("m4a") ||
    fileExtension.includes("m4p")
  ) {
    return "icon_file_audio";
  }

  return "icon_file_unknown";
}

export function getTextWidth(text: any, font: any) {
  // re-use canvas object for better performance
  const canvas: any =
    (getTextWidth as any).canvas ||
    ((getTextWidth as any).canvas = document.createElement("canvas"));
  const context = canvas.getContext("2d");
  context.font = font;
  const metrics = context.measureText(text);
  return metrics.width;
}

function getCssStyle(element: any, prop: any) {
  return window.getComputedStyle(element, null).getPropertyValue(prop);
}

function getCanvasFont(el = document.body) {
  const fontWeight = getCssStyle(el, "font-weight") || "normal";
  const fontSize = getCssStyle(el, "font-size") || "16px";
  const fontFamily = getCssStyle(el, "font-family") || "Times New Roman";

  return `${fontWeight} ${fontSize} ${fontFamily}`;
}

// function getVariableFromURIString(varname:string) {
//   var result = "";
//   var s = extractLink();
//   s = s.split("&");
//   var i = 0;
//   for (i = 0; i < s.length; i++) {
//       var value = s[i];
//       value = value.split("=")
//       if (value[0] == varname) {
//           // match
//           result = value[1];
//           break;
//       }
//   }
//   return result;
// }
export function isMobileOrTablet() {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent); //|| navigator.vendor || window.opera);
  return check;
}

export function canProceed({
  userModel,
  messageDialog,
  router,
  auth,
  kickOut,
}: {
  userModel: any;
  messageDialog: any;
  router: any;
  auth: any;
  kickOut: Function;
}): boolean {
  if (auth.currentUser == null) {
    kickOut({ force: true });
    return false;
  }
  if (!userModel().personalInfoCompleted()) {
    messageDialog(
      new MessageItem({
        icon: "person",
        title: "Profile Incomplete",
        message:
          "You need to complete your profile information before you can proceed",
        positiveClickText: "Update Profile",
        onPositiveClicked: () => {
          router.push(`/profile/complete_profile?fromSignup=true`);
        },
      })
    );
    // showMessage(Icons.person, app_color, "Profile Incomplete",
    //     "You need to complete your profile information before you can proceed",
    //     clickYesText: "Update Profile",clickNoText: "Cancel",
    //     onClicked: (_){
    //       if(_==true){
    //         launchScreen(AppSections.personalInfo,PersonalInfo(fromSignup: true,));
    //       }
    //     });
    return false;
  }
  return true;
}

export function toUpper(item: string) {
  if (item.length < 2) return item.toUpperCase();
  return `${item.substring(0, 1).toUpperCase()}${item.substring(1)}`;
}

export class onClick {
  onClick;
  constructor({ onClick }: { onClick?: Function } = {}) {
    this.onClick = onClick;
  }
}

export default function getCurrentYear() {
  let date = new Date();
  return date.getFullYear();
}

export function getSearchValue(key: string) {
  let s = extractValueFromLink(key) ?? "";
  return decodeURI(s);
}
export function getSearch() {
  return getSearchValue("query");
}
export function getState() {
  return getSearchValue("state");
}
export function getCity() {
  return getSearchValue("city");
}
export function getCashPayment() {
  return getSearchValue("cashPayment");
}
export function getSplitCount() {
  return getSearchValue("splitCount");
}
export function getCategoryId() {
  return getSearchValue("categoryId");
}
export function getCategoryName() {
  return getSearchValue("categoryName");
}

export function createSearchUrl({
  state,
  city,
  categoryId,
  categoryName,
  query,
  cashPayment,
  splitCount,
  router,
  updateSearchKey,
}: {
  state?: string;
  city?: string;
  categoryId?: string;
  categoryName?: string;
  query?: string;
  cashPayment?: string;
  splitCount?: string;
  router?: any;
  updateSearchKey: any;
}) {
  let theQuery = query ?? getSearch();
  let theState = state ?? getState();
  let theCity = city ?? getCity();
  let theCategoryId = categoryId ?? getCategoryId();
  let theCategoryName = categoryName ?? getCategoryName();
  let theCashPayment = cashPayment ?? getCashPayment();
  let theSplitCount = splitCount ?? getSplitCount();

  let data = {} as any;
  if (theQuery.length != 0) {
    data.query = theQuery;
  }
  if (theState.length != 0) {
    data.state = theState;
  }
  if (theCity.length != 0) {
    data.city = theCity;
  }
  if (theCategoryId.length != 0) {
    data.categoryId = theCategoryId;
  }
  if (theCategoryName.length != 0) {
    data.categoryName = theCategoryName;
  }
  if (theCashPayment.length != 0) {
    data.cashPayment = theCashPayment;
  }
  if (theSplitCount.length != 0) {
    data.splitCount = theSplitCount;
  }
  let url = `/search?${Qs.stringify(data)}`;
  // return url
  // window.history.replaceState(null, "Search", url);
  // console.log(`url: ${url}`);
  let link = extractLink();
  if (link.includes("/search")) {
    window.history.replaceState(null, "Search", url);
    updateSearchKey();
  } else {
    router.push(url);
  }
}

export function getId() {
  let link = window.location.pathname;
  return link.substring(link.lastIndexOf("/") + 1, link.length);
}

export function seperatePhoneAndDialCode(phoneWithDialCode: string) {
  let foundedCountry = {} as any;
  for (let index in allCountries) {
    let country = allCountries[index];
    let dialCode = country["dial_code"].toString();
    if (phoneWithDialCode.includes(dialCode)) {
      foundedCountry = country;
    }
  }

  if (foundedCountry.length != 0) {
    var dialCode = phoneWithDialCode.substring(
      0,
      foundedCountry["dial_code"]!.length
    );
    var newPhoneNumber = phoneWithDialCode.substring(
      foundedCountry["dial_code"]!.length
    );
    return [dialCode, newPhoneNumber, foundedCountry["name"]];
  }
  return [];
}
