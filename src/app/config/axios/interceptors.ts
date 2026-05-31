import { type AxiosResponse, isAxiosError } from "axios";
import { camelizeKeys } from "humps";

export const interceptors = {
  onSuccess: <T>(response: AxiosResponse<T>) => {
    const contentType = response.headers["content-type"];

    if (
      response.data &&
      typeof contentType === "string" &&
      contentType.includes("application/json")
    ) {
      return camelizeKeys(response.data) as T;
    }

    return response.data ? response.data : response;
  },
  onError: (error: Error) => {
    if (isAxiosError(error)) {
      console.error("API Error:", error.response?.status, error.message);
    }

    return Promise.reject(error);
  },
};
