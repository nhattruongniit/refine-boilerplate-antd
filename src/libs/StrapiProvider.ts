import { DataProvider } from "@pankod/refine-strapi-v4";
import { DataProvider as DataProvider$1 } from "@refinedev/core";

// libs
import { axiosInstance } from "./AxiosInterceptor";

const apiUrlBE = "http://localhost:3000" + "/api";
export const CustomStrapiDataProvider = (apiUrl: string, httpClient: any = axiosInstance): DataProvider$1 => ({
  ...DataProvider(apiUrl, httpClient),
});

export const strapiDataProvider = CustomStrapiDataProvider(apiUrlBE, axiosInstance);
