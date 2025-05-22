import axios from "axios";
const Qs = require("qs");

export const NEXT_PUBLIC_DEBUG = process.env.NEXT_PUBLIC_DEBUG === "True";

export class HttpUtil {
  props: any;
  baseUrl: string;
  apiKey: string | undefined;
  token: string | null;

  constructor(props: any) {
    this.props = props;
    this.baseUrl = process.env.NEXT_PUBLIC_BASED_URL || "";
    this.apiKey = process.env.NEXT_PUBLIC_API_KEY;
    this.token = localStorage.getItem("token");
  }

  private async callApi(
    method: "get" | "post" | "put" | "patch" | "delete",
    path: string,
    data: any = null,
    {
      silently = false,
      handleError = false,
      dontDissmissProgress = false,
      progressMessage = "Please wait",
    }: {
      silently?: boolean;
      handleError?: boolean;
      dontDissmissProgress?: boolean;
      progressMessage?: string;
    } = {},
    onComplete: Function | null = null
  ) {
    const { showLoading, hideLoading, failedDialog, successDialog } =
      this.props;
    const url = `${this.baseUrl}${path}`;
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
      ...(this.token ? { authorization: `Bearer ${this.token}` } : {}),
      ...(this.apiKey ? { XApiKey: this.apiKey } : {}),
    };

    if (!silently) {
      showLoading(progressMessage);
    }

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

      const status = respData["status"] ?? false;
      const message = respData["message"] ?? "";
      const result = respData["data"] ?? respData;

      if (!status) {
        if (!silently) {
          hideLoading();
        }
        if (handleError) {
          failedDialog(message);
        } else if (onComplete) {
          onComplete(null, message);
        }
        return message;
      } else {
        if (!silently && !dontDissmissProgress) {
          hideLoading();
        }
        if (onComplete) {
          onComplete(result, null, message);
        }
        return result;
      }
    } catch (error: any) {
      hideLoading();
      const errorMessage =
        error.response?.data?.message || error.message || "An error occurred";
      if (handleError) {
        failedDialog(errorMessage);
      } else if (onComplete) {
        onComplete(null, errorMessage);
      }
      return errorMessage;
    }
  }

  async get(
    path: string,
    data: any = null,
    options: {
      silently?: boolean;
      handleError?: boolean;
      dontDissmissProgress?: boolean;
      progressMessage?: string;
    } = {},
    onComplete: Function | null = null
  ) {
    return this.callApi("get", path, data, options, onComplete);
  }

  async post(
    path: string,
    data: any = null,
    options: {
      silently?: boolean;
      handleError?: boolean;
      dontDissmissProgress?: boolean;
      progressMessage?: string;
    } = {},
    onComplete: Function | null = null
  ) {
    return this.callApi("post", path, data, options, onComplete);
  }

  async put(
    path: string,
    data: any = null,
    options: {
      silently?: boolean;
      handleError?: boolean;
      dontDissmissProgress?: boolean;
      progressMessage?: string;
    } = {},
    onComplete: Function | null = null
  ) {
    return this.callApi("put", path, data, options, onComplete);
  }

  async patch(
    path: string,
    data: any = null,
    options: {
      silently?: boolean;
      handleError?: boolean;
      dontDissmissProgress?: boolean;
      progressMessage?: string;
    } = {},
    onComplete: Function | null = null
  ) {
    return this.callApi("patch", path, data, options, onComplete);
  }

  async delete(
    path: string,
    data: any = null,
    options: {
      silently?: boolean;
      handleError?: boolean;
      dontDissmissProgress?: boolean;
      progressMessage?: string;
    } = {},
    onComplete: Function | null = null
  ) {
    return this.callApi("delete", path, data, options, onComplete);
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
    return getMethod
      ? this.get(
          path,
          data,
          { silently, handleError, dontDissmissProgress, progressMessage },
          onComplete
        )
      : this.post(
          path,
          data,
          { silently, handleError, dontDissmissProgress, progressMessage },
          onComplete
        );
  }
}

// // Assuming 'httpUtilInstance' is an instance of HttpUtil passed as a prop
// httpUtilInstance.get('/users', { page: 1 }, {}, (data, error) => {
//   if (data) {
//     console.log('Get users:', data);
//   } else if (error) {
//     console.error('Error getting users:', error);
//   }
// });

// httpUtilInstance.post('/users', { name: 'John Doe' }, {}, (data, error) => {
//   if (data) {
//     console.log('Created user:', data);
//   } else if (error) {
//     console.error('Error creating user:', error);
//   }
// });

// httpUtilInstance.put('/users/123', { name: 'Jane Doe' }, {}, (data, error) => {
//   // ...
// });

// httpUtilInstance.patch('/users/123', { email: 'jane.doe@example.com' }, {}, (data, error) => {
//   // ...
// });

// httpUtilInstance.delete('/users/123', {}, {}, (data, error) => {
//   if (data === null && error === null) {
//     console.log('User deleted successfully');
//   } else if (error) {
//     console.error('Error deleting user:', error);
//   }
// });
