import { act, renderHook } from "@testing-library/react";
import { setupAxios } from "../../setupAxios";
import { initialState, useAuthStore } from "../auth";
import { LoginBody } from "../types/apiTypes";

const mockAxiosInstance = {
  post: vi.fn(),
};
vi.mock("../../setupAxios", () => {
  return {
    setupAxios: vi.fn(() => mockAxiosInstance),
  };
});

describe("useAuthStore", () => {
  describe("#state", () => {
    it("Returns the initial state", () => {
      const { result } = renderHook(() => useAuthStore());

      expect(result.current.isAuthenticated).toBe(initialState.isAuthenticated);
    });
  });

  describe("#actions", () => {
    it("#setIsAuthenticated sets #state.isAuthenticated", async () => {
      const { result } = renderHook(() => useAuthStore());

      await act(() => result.current.setIsAuthenticated(true));

      expect(result.current.isAuthenticated).toBe(true);

      await act(() => result.current.setIsAuthenticated(false));

      expect(result.current.isAuthenticated).toBe(false);
    });
  });

  describe("#api", () => {
    describe("#login", () => {
      const mockPayload: LoginBody = {
        name: "Bob Builder",
        email: "bob.builder@test.com",
      };

      it("Calls the correct POST endpoint", async () => {
        vi.mocked(setupAxios().post).mockResolvedValue({ status: 200 });
        const { result } = renderHook(() => useAuthStore());

        await act(async () => await result.current.api.login(mockPayload));

        expect(setupAxios().post).toHaveBeenCalledWith("/auth/login", {
          ...mockPayload,
        });
      });

      it("Update #state.isAuthenticated on success", async () => {
        vi.mocked(setupAxios().post).mockResolvedValue({ status: 200 });
        const { result } = renderHook(() => useAuthStore());

        await act(async () => await result.current.api.login(mockPayload));

        expect(result.current.isAuthenticated).toBe(true);
      });

      it("Resets #state.isAuthenticated on failure", async () => {
        vi.mocked(setupAxios().post).mockRejectedValue({ status: 401 });
        const { result } = renderHook(() => useAuthStore());
        result.current.isAuthenticated = true;

        await act(async () => await result.current.api.login(mockPayload));

        expect(result.current.isAuthenticated).toBe(false);
      });
    });

    describe("#logout", () => {
      it("Calls the correct POST endpoint", async () => {
        vi.mocked(setupAxios().post).mockResolvedValue(undefined);
        const { result } = renderHook(() => useAuthStore());

        await act(async () => await result.current.api.logout());

        expect(setupAxios().post).toHaveBeenCalledWith("/auth/logout");
      });

      it("Update #state.isAuthenticated on success", async () => {
        vi.mocked(setupAxios().post).mockResolvedValue(undefined);
        const { result } = renderHook(() => useAuthStore());
        result.current.isAuthenticated = true;

        await act(async () => await result.current.api.logout());

        expect(result.current.isAuthenticated).toBe(false);
      });
    });
  });
});
