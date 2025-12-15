import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, waitFor } from "@feature/testing/render";
import { AuthGuard } from "./AuthGuardPage";
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

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Redirect: ({ to }: { to: string }) => (
      <div data-testid="redirect" data-to={to}>
        Redirecting to {to}
      </div>
    ),
  };
});

const mockUser: User = {
  id: "user-123",
  app_metadata: {},
  user_metadata: {},
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

describe("AuthGuard", () => {
  beforeEach(() => {
    useAuthStore.setState({
      session: null,
      user: null,
      isLoading: true,
    });
  });

  describe("when loading", () => {
    it("should render spinner while loading", async () => {
      render(
        <AuthGuard>
          <div>Protected Content</div>
        </AuthGuard>
      );

      await waitFor(() => {
        const spinner = document.querySelector("ion-spinner");
        expect(spinner).toBeInTheDocument();
      });
    });

    it("should not render children while loading", async () => {
      render(
        <AuthGuard>
          <div>Protected Content</div>
        </AuthGuard>
      );

      await waitFor(() => {
        expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
      });
    });
  });

  describe("when not authenticated", () => {
    beforeEach(() => {
      useAuthStore.setState({
        session: null,
        user: null,
        isLoading: false,
      });
    });

    it("should redirect to login page", async () => {
      render(
        <AuthGuard>
          <div>Protected Content</div>
        </AuthGuard>
      );

      await waitFor(() => {
        const redirect = screen.getByTestId("redirect");
        expect(redirect).toBeInTheDocument();
        expect(redirect).toHaveAttribute("data-to", "/login");
      });
    });

    it("should not render children", async () => {
      render(
        <AuthGuard>
          <div>Protected Content</div>
        </AuthGuard>
      );

      await waitFor(() => {
        expect(screen.queryByText("Protected Content")).not.toBeInTheDocument();
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

    it("should render children", async () => {
      render(
        <AuthGuard>
          <div>Protected Content</div>
        </AuthGuard>
      );

      await waitFor(() => {
        expect(screen.getByText("Protected Content")).toBeInTheDocument();
      });
    });

    it("should not render spinner", async () => {
      render(
        <AuthGuard>
          <div>Protected Content</div>
        </AuthGuard>
      );

      await waitFor(() => {
        const spinner = document.querySelector("ion-spinner");
        expect(spinner).not.toBeInTheDocument();
      });
    });

    it("should not redirect", async () => {
      render(
        <AuthGuard>
          <div>Protected Content</div>
        </AuthGuard>
      );

      await waitFor(() => {
        expect(screen.queryByTestId("redirect")).not.toBeInTheDocument();
      });
    });
  });
});
