import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@services/app/testing/render";
import { UserProfile } from "./UserProfile";
import { useAuthStore } from "./useAuthStore";
import type { Session, User } from "@supabase/supabase-js";

vi.mock("@supabase-db/client", () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
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

describe("UserProfile", () => {
  beforeEach(() => {
    useAuthStore.setState({
      session: null,
      user: null,
      isLoading: false,
    });
  });

  describe("when not authenticated", () => {
    it("should render Account label", async () => {
      render(<UserProfile />);

      await waitFor(() => {
        expect(screen.getByText("Account")).toBeInTheDocument();
      });
    });

    it("should render not signed in message", async () => {
      render(<UserProfile />);

      await waitFor(() => {
        expect(screen.getByText("Not signed in")).toBeInTheDocument();
      });
    });

    it("should not render avatar", async () => {
      render(<UserProfile />);

      await waitFor(() => {
        const avatar = document.querySelector("ion-avatar");
        expect(avatar).not.toBeInTheDocument();
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

    it("should render user full name", async () => {
      render(<UserProfile />);

      await waitFor(() => {
        expect(screen.getByText("Test User")).toBeInTheDocument();
      });
    });

    it("should render user email", async () => {
      render(<UserProfile />);

      await waitFor(() => {
        expect(screen.getByText("test@example.com")).toBeInTheDocument();
      });
    });

    it("should render avatar with correct src", async () => {
      render(<UserProfile />);

      await waitFor(() => {
        const avatar = document.querySelector("ion-avatar");
        expect(avatar).toBeInTheDocument();

        const img = avatar?.querySelector("img");
        expect(img).toHaveAttribute("src", "https://example.com/avatar.png");
      });
    });

    it("should render avatar with alt text", async () => {
      render(<UserProfile />);

      await waitFor(() => {
        const img = document.querySelector("ion-avatar img");
        expect(img).toHaveAttribute("alt", "Test User");
      });
    });
  });

  describe("when authenticated without avatar", () => {
    beforeEach(() => {
      const userWithoutAvatar: User = {
        ...mockUser,
        user_metadata: {
          full_name: "Test User",
        },
      };

      useAuthStore.setState({
        session: { ...mockSession, user: userWithoutAvatar },
        user: userWithoutAvatar,
        isLoading: false,
      });
    });

    it("should not render avatar when no avatar_url", async () => {
      render(<UserProfile />);

      await waitFor(() => {
        const avatar = document.querySelector("ion-avatar");
        expect(avatar).not.toBeInTheDocument();
      });
    });

    it("should still render user name and email", async () => {
      render(<UserProfile />);

      await waitFor(() => {
        expect(screen.getByText("Test User")).toBeInTheDocument();
        expect(screen.getByText("test@example.com")).toBeInTheDocument();
      });
    });
  });

  describe("when authenticated without full name", () => {
    beforeEach(() => {
      const userWithoutName: User = {
        ...mockUser,
        user_metadata: {
          avatar_url: "https://example.com/avatar.png",
        },
      };

      useAuthStore.setState({
        session: { ...mockSession, user: userWithoutName },
        user: userWithoutName,
        isLoading: false,
      });
    });

    it("should render avatar with fallback alt text", async () => {
      render(<UserProfile />);

      await waitFor(() => {
        const img = document.querySelector("ion-avatar img");
        expect(img).toHaveAttribute("alt", "User avatar");
      });
    });

    it("should still render email", async () => {
      render(<UserProfile />);

      await waitFor(() => {
        expect(screen.getByText("test@example.com")).toBeInTheDocument();
      });
    });
  });
});
