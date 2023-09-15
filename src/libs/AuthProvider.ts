import { axiosInstance } from "./AxiosInterceptor";

// refine
import { AuthBindings } from "@refinedev/core";

export const authProvider: AuthBindings = {
  login: async () => {
    return {
      success: true,
    };
  },
  logout: async () => {
    window.localStorage.removeItem('accessToken');
    return {
      success: true,
    };
  },
  onError: async (error) => {
    return { error };
  },
  check: async () => {
    const token = window.localStorage.getItem('accessToken');
    if (token) {
      axiosInstance.defaults.headers.common = {
        Authorization: "Bearer " + token,
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
    const user = localStorage.getItem('user-system-portal');
    if (user) {
      return {
        ...user,
        avatar: user.picture,
      };
    }
    return null;
  },
};
