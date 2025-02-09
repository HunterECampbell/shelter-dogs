import { create } from "zustand";
import { setupAxios } from "../setupAxios";
import { LoginBody } from "./apiTypes";
import handleResponse from "../utils/axios/responseHandler";
import { t } from "i18next";

export interface AuthStoreAPIs {
  api: {
    login: (payload: LoginBody) => void;
  };
}

export const useAuthStore = create<AuthStoreAPIs>(() => ({
  api: {
    login: async (payload: LoginBody) => {
      try {
        handleResponse(
          async () => await setupAxios().post("/auth/loginz", { ...payload }),
          {
            showAlert: true,
            errorMessage: t("login.errors.login_failed"),
          }
        );
      } catch (error) {
        console.error("Login Failed -", error);
      }
    },
  },
}));
