import { act, renderHook } from "@testing-library/react";
import { initialState, useAlertStore } from "../alert";
import { Alert, AlertType } from "../../globalTypes";

describe("useAlertStore", () => {
  describe("#state", () => {
    it("Returns the initial state", () => {
      const { result } = renderHook(() => useAlertStore());

      expect(result.current.alert).toBe(initialState.alert);
    });
  });

  describe("#actions", () => {
    it("#createAlert sets #state.alert to trigger alert creation", () => {
      const mockAlert: Alert = {
        message: "Test Alert",
        type: AlertType.Success,
      };
      const { result } = renderHook(() => useAlertStore());

      act(() => result.current.createAlert(mockAlert));

      expect(result.current.alert).toEqual(mockAlert);
    });
  });
});
