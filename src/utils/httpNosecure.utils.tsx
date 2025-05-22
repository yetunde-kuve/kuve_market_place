import axios from "axios";
const Qs = require("qs");

export const NEXT_PUBLIC_DEBUG = process.env.NEXT_PUBLIC_DEBUG === "True";

export class HttpUtilNoSecure {
  baseUrl: string;
  apiKey: string | undefined;
  token: string | null;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BASED_URL || "";
    this.apiKey = process.env.NEXT_PUBLIC_API_KEY;
    this.token = localStorage.getItem("token");
  }

  private async callApi(
    method: "get" | "post" | "put" | "patch" | "delete",
    path: string,
    data: any = null,
    _options: {},
    onComplete: Function | null = null
  ) {
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(this.token ? { authorization: `Bearer ${this.token}` } : {}),
      ...(this.apiKey ? { XApiKey: this.apiKey } : {}),
    };

    try {
      let response;
      switch (method) {
        case "get":
          const queryString = data ? `?${Qs.stringify(data)}` : "";
          response = await axios.get(`${url}${queryString}`, { headers });
          break;
        case "post":
          response = await axios.post(url, data, { headers });
          break;
        case "put":
          response = await axios.put(url, data, { headers });
          break;
        case "patch":
          response = await axios.patch(url, data, { headers });
          break;
        case "delete":
          response = await axios.delete(url, {
            headers,
            ...(data ? { data } : {}), // Axios delete with body
          });
          break;
        default:
          throw new Error(`Unsupported HTTP method: ${method}`);
      }

      const respData = response.data;
      if (NEXT_PUBLIC_DEBUG) {
        console.log(`Response [${method.toUpperCase()} ${url}]:`, respData);
      }

      const isSuccess = response.status === 200;
      const message = respData["message"] ?? "";
      const result = respData["data"] ?? respData;

      if (!isSuccess) {
        if (onComplete) {
          onComplete(
            null,
            message || `Request failed with status: ${response.status}`
          );
        }
        return message || `Request failed with status: ${response.status}`;
      } else {
        if (onComplete) {
          onComplete(result, null, message);
        }
        return result;
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      if (onComplete) {
        onComplete(null, errorMessage);
      }
      return errorMessage;
    }
  }

  async get(
    path: string,
    data: any = null,
    _options: {},
    onComplete: Function | null = null
  ) {
    return this.callApi("get", path, data, {}, onComplete);
  }

  async post(
    path: string,
    data: any = null,
    _options: {},
    onComplete: Function | null = null
  ) {
    return this.callApi("post", path, data, {}, onComplete);
  }

  async put(
    path: string,
    data: any = null,
    _options: {},
    onComplete: Function | null = null
  ) {
    return this.callApi("put", path, data, {}, onComplete);
  }

  async patch(
    path: string,
    data: any = null,
    _options: {},
    onComplete: Function | null = null
  ) {
    return this.callApi("patch", path, data, {}, onComplete);
  }

  async delete(
    path: string,
    data: any = null,
    _options: {},
    onComplete: Function | null = null
  ) {
    return this.callApi("delete", path, data, {}, onComplete);
  }

  async performApiCall(
    path: string,
    onComplete: Function | null,
    {
      data = null,
      getMethod = false,
    }: {
      data?: any;
      getMethod?: boolean;
    } = {}
  ) {
    return getMethod
      ? this.get(path, data, {}, onComplete)
      : this.post(path, data, {}, onComplete);
  }
}
