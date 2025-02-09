import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { setupAxios } from "../setupAxios";
import { LoginBody } from "./types/apiTypes";
import handleResponse from "../utils/axios/responseHandler";
import { t } from "i18next";

export interface AuthStoreState {
  isAuthenticated: boolean;
}

export interface AuthStoreActions {
  setIsAuthenticated: (value: boolean) => void;
}

export interface AuthStoreAPIs {
  api: {
    login: (payload: LoginBody) => void;
    logout: () => void;
  };
}

export const initialState: AuthStoreState = {
  isAuthenticated: false,
};

export const useAuthStore = create<
  AuthStoreState & AuthStoreActions & AuthStoreAPIs
>()(
  persist(
    (set) => ({
      ...initialState,
      setIsAuthenticated: (value: boolean) =>
        set(() => ({ isAuthenticated: value })),
      api: {
        login: async (payload: LoginBody) => {
          try {
            const res = await handleResponse(
              async () =>
                await setupAxios().post("/auth/login", { ...payload }),
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
        logout: async () => {
          try {
            await handleResponse(
              async () => await setupAxios().post("/auth/logout"),
              {
                showAlert: true,
                errorMessage: t("login.errors.logout_failed"),
              }
            );
            set(() => ({ isAuthenticated: false }));
          } catch (error) {
            console.error("Login Failed -", error);
          }
        },
      },
    }),
    {
      name: "isAuthenticated",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
