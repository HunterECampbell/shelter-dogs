import { act, renderHook } from "@testing-library/react";
import { setupAxios } from "../../setupAxios";
import { useAuthStore } from "../auth";
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
  describe("#api", () => {
    it("#login calls the correct POST endpoint", async () => {
      const mockPayload: LoginBody = {
        name: "Bob Builder",
        email: "bob.builder@test.com",
      };
      vi.mocked(setupAxios().post).mockResolvedValue({ status: 200 });
      const { result } = renderHook(() => useAuthStore());

      await act(async () => await result.current.api.login(mockPayload));

      expect(setupAxios().post).toHaveBeenCalledTimes(1);
      expect(setupAxios().post).toHaveBeenCalledWith("/auth/login", {
        ...mockPayload,
      });
    });
  });
});
