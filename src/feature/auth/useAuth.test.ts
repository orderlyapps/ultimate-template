import { describe, it, expect, beforeEach, vi, afterEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import { useAuth } from "./useAuth";
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

const mockUnsubscribe = vi.fn();
const mockGetSession = vi.fn();
const mockOnAuthStateChange = vi.fn();
const mockSignInWithOAuth = vi.fn();
const mockSignOut = vi.fn();

vi.mock("@supabase-db/client", () => ({
  supabase: {
    auth: {
      getSession: () => mockGetSession(),
      onAuthStateChange: (callback: (event: string, session: Session | null) => void) => {
        mockOnAuthStateChange(callback);
        return {
          data: {
            subscription: {
              unsubscribe: mockUnsubscribe,
            },
          },
        };
      },
      signInWithOAuth: (options: unknown) => mockSignInWithOAuth(options),
      signOut: () => mockSignOut(),
    },
  },
}));

describe("useAuth", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    act(() => {
      useAuthStore.setState({
        session: null,
        user: null,
        isLoading: true,
      });
    });

    mockGetSession.mockResolvedValue({ data: { session: null } });
    mockSignInWithOAuth.mockResolvedValue({ error: null });
    mockSignOut.mockResolvedValue({ error: null });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("initialization", () => {
    it("should call getSession on mount", async () => {
      renderHook(() => useAuth());

      await waitFor(() => {
        expect(mockGetSession).toHaveBeenCalled();
      });
    });

    it("should set up auth state change listener", () => {
      renderHook(() => useAuth());

      expect(mockOnAuthStateChange).toHaveBeenCalled();
    });

    it("should unsubscribe on unmount", () => {
      const { unmount } = renderHook(() => useAuth());
      unmount();

      expect(mockUnsubscribe).toHaveBeenCalled();
    });

    it("should set session from getSession response", async () => {
      mockGetSession.mockResolvedValue({ data: { session: mockSession } });

      renderHook(() => useAuth());

      await waitFor(() => {
        const state = useAuthStore.getState();
        expect(state.session).toEqual(mockSession);
        expect(state.isLoading).toBe(false);
      });
    });
  });

  describe("return values", () => {
    it("should return isAuthenticated as false when no session", async () => {
      mockGetSession.mockResolvedValue({ data: { session: null } });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(false);
      });
    });

    it("should return isAuthenticated as true when session exists", async () => {
      mockGetSession.mockResolvedValue({ data: { session: mockSession } });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.isAuthenticated).toBe(true);
      });
    });

    it("should return user from store", async () => {
      mockGetSession.mockResolvedValue({ data: { session: mockSession } });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.user).toEqual(mockUser);
      });
    });

    it("should return session from store", async () => {
      mockGetSession.mockResolvedValue({ data: { session: mockSession } });

      const { result } = renderHook(() => useAuth());

      await waitFor(() => {
        expect(result.current.session).toEqual(mockSession);
      });
    });

    it("should return isLoading from store", () => {
      const { result } = renderHook(() => useAuth());

      expect(result.current.isLoading).toBe(true);
    });
  });

  describe("signInWithGoogle", () => {
    it("should call signInWithOAuth with google provider", async () => {
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.signInWithGoogle();
      });

      expect(mockSignInWithOAuth).toHaveBeenCalledWith({
        provider: "google",
        options: {
          redirectTo: expect.any(String),
        },
      });
    });

    it("should throw error when signInWithOAuth fails", async () => {
      const mockError = { message: "Auth error" };
      mockSignInWithOAuth.mockResolvedValue({ error: mockError });

      const { result } = renderHook(() => useAuth());

      await expect(
        act(async () => {
          await result.current.signInWithGoogle();
        })
      ).rejects.toEqual(mockError);
    });
  });

  describe("signOut", () => {
    it("should call supabase signOut", async () => {
      const { result } = renderHook(() => useAuth());

      await act(async () => {
        await result.current.signOut();
      });

      expect(mockSignOut).toHaveBeenCalled();
    });

    it("should throw error when signOut fails", async () => {
      const mockError = { message: "Sign out error" };
      mockSignOut.mockResolvedValue({ error: mockError });

      const { result } = renderHook(() => useAuth());

      await expect(
        act(async () => {
          await result.current.signOut();
        })
      ).rejects.toEqual(mockError);
    });
  });
});
