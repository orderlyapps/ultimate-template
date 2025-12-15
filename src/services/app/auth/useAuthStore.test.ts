import { describe, it, expect, beforeEach } from "vitest";
import { act } from "@testing-library/react";
import { useAuthStore } from "./useAuthStore";
import type { Session, User } from "@supabase/supabase-js";

const mockUser: User = {
  id: "user-123",
  app_metadata: {},
  user_metadata: {
    full_name: "Test User",
    avatar_url: "https://example.com/avatar.png",
  },
  aud: "authenticated",
  created_at: "2024-01-01T00:00:00.000Z",
  email: "test@example.com",
};

const mockSession: Session = {
  access_token: "mock-access-token",
  refresh_token: "mock-refresh-token",
  expires_in: 3600,
  token_type: "bearer",
  user: mockUser,
};

describe("useAuthStore", () => {
  beforeEach(() => {
    act(() => {
      useAuthStore.setState({
        session: null,
        user: null,
        isLoading: true,
      });
    });
  });

  describe("initial state", () => {
    it("should have null session initially", () => {
      const state = useAuthStore.getState();
      expect(state.session).toBeNull();
    });

    it("should have null user initially", () => {
      const state = useAuthStore.getState();
      expect(state.user).toBeNull();
    });

    it("should have isLoading true initially", () => {
      const state = useAuthStore.getState();
      expect(state.isLoading).toBe(true);
    });
  });

  describe("setSession", () => {
    it("should set session and extract user", () => {
      act(() => {
        useAuthStore.getState().setSession(mockSession);
      });

      const state = useAuthStore.getState();
      expect(state.session).toEqual(mockSession);
      expect(state.user).toEqual(mockUser);
    });

    it("should set user to null when session is null", () => {
      act(() => {
        useAuthStore.getState().setSession(mockSession);
      });

      act(() => {
        useAuthStore.getState().setSession(null);
      });

      const state = useAuthStore.getState();
      expect(state.session).toBeNull();
      expect(state.user).toBeNull();
    });
  });

  describe("setLoading", () => {
    it("should set isLoading to false", () => {
      act(() => {
        useAuthStore.getState().setLoading(false);
      });

      const state = useAuthStore.getState();
      expect(state.isLoading).toBe(false);
    });

    it("should set isLoading to true", () => {
      act(() => {
        useAuthStore.getState().setLoading(false);
      });

      act(() => {
        useAuthStore.getState().setLoading(true);
      });

      const state = useAuthStore.getState();
      expect(state.isLoading).toBe(true);
    });
  });
});
