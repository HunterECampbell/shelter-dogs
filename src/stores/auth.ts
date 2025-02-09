import { create } from "zustand";
import { setupAxios } from "../setupAxios";
import { LoginBody } from "./types/apiTypes";
import handleResponse from "../utils/axios/responseHandler";
import { t } from "i18next";

export interface AuthStoreState {
  isAuthenticated: boolean;
}

export interface AuthStoreAPIs {
  api: {
    login: (payload: LoginBody) => void;
  };
}

export const initialState: AuthStoreState = {
  isAuthenticated: false,
};

export const useAuthStore = create<AuthStoreState & AuthStoreAPIs>((set) => ({
  ...initialState,
  api: {
    login: async (payload: LoginBody) => {
      try {
        const res = await handleResponse(
          async () => await setupAxios().post("/auth/login", { ...payload }),
          {
            showAlert: true,
            errorMessage: t("login.errors.login_failed"),
          }
        );
        if (res.status === 200) set(() => ({ isAuthenticated: true }));
      } catch (error) {
        set(() => ({ isAuthenticated: false }));
        console.error("Login Failed -", error);
      }
    },
  },
}));
