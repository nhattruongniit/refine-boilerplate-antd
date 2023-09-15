import { HttpError } from "@refinedev/core";
import axios from "axios";

export const axiosInstance = axios.create();

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let customError: HttpError = {
      ...error,
      message: error.response?.data?.error?.message,
      statusCode: error.response?.status,
    };

    if (error.response?.status === 429) {
      customError = {
        ...customError,
        message: error.response?.data.message,
        statusCode: error.response?.status,
      };
    }

    if (error.response?.status === 403) {
      customError = {
        ...customError,
        message: error.response?.data?.error?.message || `You didn't have permission to perform this action`,
        statusCode: error.response?.status,
      };
    }

    return Promise.reject(customError);
  },
);
