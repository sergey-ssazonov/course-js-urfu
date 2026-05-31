import axios from "axios";
import { decamelizeKeys } from "humps";

import { interceptors } from "./interceptors";

export const http = axios.create({
  baseURL: "",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use(async (config) => {
  if (config.params) {
    config.params = decamelizeKeys(config.params);
  }

  const contentType =
    config.headers?.["Content-Type"] ?? config.headers?.["content-type"];

  if (
    config.data &&
    typeof contentType === "string" &&
    contentType.includes("application/json")
  ) {
    config.data = decamelizeKeys(config.data);
  }

  return config;
});

http.interceptors.response.use(interceptors.onSuccess, interceptors.onError);
