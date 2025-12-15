import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@services/app/testing/render";
import { AuthSection } from "./AuthSection";
import { useAuthStore } from "./useAuthStore";
import type { Session, User } from "@supabase/supabase-js";

vi.mock("@supabase-db/client", () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
      signInWithOAuth: vi.fn().mockResolvedValue({ error: null }),
      signOut: vi.fn().mockResolvedValue({ error: null }),
    },
  },
}));

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

describe("AuthSection", () => {
  beforeEach(() => {
    useAuthStore.setState({
      session: null,
      user: null,
      isLoading: false,
    });
  });

  describe("when not authenticated", () => {
    it("should render UserProfile component", async () => {
      render(<AuthSection />);

      await waitFor(() => {
        expect(screen.getByText("Not signed in")).toBeInTheDocument();
      });
    });

    it("should render SignInButton", async () => {
      render(<AuthSection />);

      await waitFor(() => {
        expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
      });
    });

    it("should not render SignOutButton", async () => {
      render(<AuthSection />);

      await waitFor(() => {
        expect(screen.queryByText("Sign Out")).not.toBeInTheDocument();
      });
    });
  });

  describe("when authenticated", () => {
    beforeEach(() => {
      useAuthStore.setState({
        session: mockSession,
        user: mockUser,
        isLoading: false,
      });
    });

    it("should render UserProfile with user info", async () => {
      render(<AuthSection />);

      await waitFor(() => {
        expect(screen.getByText("Test User")).toBeInTheDocument();
        expect(screen.getByText("test@example.com")).toBeInTheDocument();
      });
    });

    it("should render SignOutButton", async () => {
      render(<AuthSection />);

      await waitFor(() => {
        expect(screen.getByText("Sign Out")).toBeInTheDocument();
      });
    });

    it("should not render SignInButton", async () => {
      render(<AuthSection />);

      await waitFor(() => {
        expect(screen.queryByText("Sign in with Google")).not.toBeInTheDocument();
      });
    });
  });
});
