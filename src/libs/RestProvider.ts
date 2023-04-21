import axios from "axios";

// refine
import {
  AuthBindings,
  HttpError,
  DataProvider as DataProvider$1,
} from "@refinedev/core";
import nestjsxCrudDataProvider from "@refinedev/nestjsx-crud";
import {
  RequestQueryBuilder,
  QueryJoin,
  QueryJoinArr,
} from "@nestjsx/crud-request";

// interceptor
export const axiosInstance = axios.create({});

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

    return Promise.reject(customError);
  }
);

// Custom Data Provider
// const apiUrlBE = import.meta.env.VITE_BACKEND_URL + "/api";
const apiUrlBE = "http://localhost:8080/api";

const handleJoin = (
  query: RequestQueryBuilder,
  join?: QueryJoin | QueryJoinArr | (QueryJoin | QueryJoinArr)[]
) => {
  if (join) {
    query.setJoin(join);
  }
  return query;
};

export const CustomNestjsDataProvider = (
  apiUrl: string,
  httpClient: any = axiosInstance
): DataProvider$1 => ({
  ...nestjsxCrudDataProvider(apiUrl, httpClient),
  getOne: async ({ resource, id, metaData }) => {
    const url = `${apiUrl}/${resource}/${id}`;
    let query = RequestQueryBuilder.create();
    console.log({ metaData });
    query = handleJoin(query, metaData?.join);
    console.log({ query: query.query(true) });

    const { data } = await httpClient.get(`${url}?${query.query(true)}`);

    return {
      data,
    };
  },
});

export const nestJsDataProvider = CustomNestjsDataProvider(
  apiUrlBE,
  axiosInstance
);

// auth provider
export const authProvider: AuthBindings = {
  login: async () => {
    window.localStorage.setItem("accessToken", "token-test");
    return {
      success: true,
    };
  },
  logout: async () => {
    window.localStorage.removeItem("accessToken");
    return {
      success: true,
    };
  },
  onError: async (error) => {
    return { error };
  },
  check: async () => {
    const accessToken = window.localStorage.getItem("accessToken");
    if (accessToken) {
      axiosInstance.defaults.headers.common = {
        Authorization: "Bearer " + accessToken,
      };
      return {
        authenticated: true,
      };
    } else {
      return {
        authenticated: false,
      };
    }
  },
  getPermissions: async () => null,
  getIdentity: async () => {
    const user = {
      name: "truong",
    };
    if (user) {
      return {
        ...user,
      };
    }
    return null;
  },
};
