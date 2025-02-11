import { useAlertStore } from "../../stores/alert";
import { useAuthStore } from "../../stores/auth";
import { AlertType, RouteOptions } from "../../globalTypes";

type CallbackOptions = {
  showAlert: boolean;
  successMessage?: string;
  errorMessage?: string;
  errorMessageObject?: Record<number | "default", string>;
};

type AxiosCallback<T> = () => Promise<T>;

export async function handleResponse<T>(
  apiCallback: AxiosCallback<T>,
  options: CallbackOptions = { showAlert: false }
): Promise<T> {
  const { createAlert } = useAlertStore.getState();
  const { setIsAuthenticated } = useAuthStore.getState();
  const { showAlert, successMessage, errorMessage, errorMessageObject } =
    options;

  try {
    const response = await apiCallback();
    if (showAlert) {
      if (!successMessage) return response;

      createAlert({ message: successMessage, type: AlertType.Success });
    }
    return response;
  } catch (e) {
    let message = errorMessage ? errorMessage : (e as Error).message;
    if (errorMessageObject && Object.keys(errorMessageObject).length) {
      const statusCode = (e as { response: { status: number } }).response
        .status;
      message = errorMessageObject[statusCode] || errorMessageObject.default;
    }
    createAlert({ message: message, type: AlertType.Error });

    if ((e as { response: { status: number } })?.response?.status === 401) {
      setIsAuthenticated(false);
      window.location.replace(RouteOptions.Login);
    }

    return Promise.reject(e);
  }
}

export default handleResponse;
