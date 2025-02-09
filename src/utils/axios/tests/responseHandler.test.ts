import { renderHook } from "@testing-library/react";
import { useAlertStore } from "../../../stores/alert";
import handleResponse from "../responseHandler";

describe("utils/axios/responseHandler", () => {
  let wasCallbackCalled: boolean;

  const mockPromiseCallback = async () => {
    wasCallbackCalled = true;
    Promise.resolve();
  };

  beforeEach(() => {
    wasCallbackCalled = false;
  });

  afterEach(() => {
    wasCallbackCalled = false;
    vi.clearAllMocks();
    vi.restoreAllMocks();
  });

  it("Executes the callback promise function", async () => {
    await handleResponse(mockPromiseCallback);

    expect(wasCallbackCalled).toBeTruthy();
  });

  describe("When promise is fulfilled", () => {
    it("Uses the alertStore with success", async () => {
      const { result } = renderHook(() => useAlertStore());
      const alertStoreSpy = vi.spyOn(result.current, "createAlert");
      const successMessage = "Successfully saved workflow";

      await handleResponse(mockPromiseCallback, {
        showAlert: true,
        successMessage,
      });

      expect(alertStoreSpy).toHaveBeenCalledWith({
        message: successMessage,
        type: "success",
      });
    });
  });

  describe("when promise is rejected", () => {
    it("uses the alertStore with error", async () => {
      const mockPromiseReject = () =>
        Promise.reject(new Error("Something bad happened"));
      const { result } = renderHook(() => useAlertStore());
      const alertStoreSpy = vi.spyOn(result.current, "createAlert");
      const errorMessage = "Unable to save workflow";

      await expect(
        handleResponse(mockPromiseReject, { showAlert: true, errorMessage })
      ).rejects.toThrow();
      expect(alertStoreSpy).toHaveBeenCalledWith({
        message: errorMessage,
        type: "error",
      });
    });
  });
});
