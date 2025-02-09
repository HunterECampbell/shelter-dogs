import { create } from "zustand";
import { Alert, AlertType } from "../globalTypes";

export interface AlertStoreState {
  alert: Alert;
}

export interface AlertStoreActions {
  createAlert: ({
    message,
    type,
  }: {
    message: string;
    type: AlertType;
  }) => void;
}

export const initialState: AlertStoreState = {
  alert: {
    message: "",
    type: AlertType.Error,
  },
};

export const useAlertStore = create<AlertStoreState & AlertStoreActions>(
  (set) => ({
    ...initialState,
    createAlert: ({ message, type }: { message: string; type: AlertType }) =>
      set(() => ({ alert: { message, type } })),
  })
);
