import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@services/app/testing/render";
import { Login } from "./LoginPage";
import { useAuthStore } from "./useAuthStore";

const mockSignInWithOAuth = vi.fn();

vi.mock("@supabase-db/client", () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
      signInWithOAuth: (options: unknown) => mockSignInWithOAuth(options),
    },
  },
}));

describe("Login", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignInWithOAuth.mockResolvedValue({ error: null });

    useAuthStore.setState({
      session: null,
      user: null,
      isLoading: false,
    });
  });

  describe("when loading", () => {
    beforeEach(() => {
      useAuthStore.setState({
        session: null,
        user: null,
        isLoading: true,
      });
    });

    it("should render spinner while loading", async () => {
      render(<Login />);

      await waitFor(() => {
        const spinner = document.querySelector("ion-spinner");
        expect(spinner).toBeInTheDocument();
      });
    });

    it("should not render sign in button while loading", async () => {
      render(<Login />);

      await waitFor(() => {
        expect(screen.queryByText("Sign in with Google")).not.toBeInTheDocument();
      });
    });
  });

  describe("when not loading", () => {
    it("should render welcome message", async () => {
      render(<Login />);

      await waitFor(() => {
        expect(screen.getByText("Welcome")).toBeInTheDocument();
      });
    });

    it("should render sign in prompt", async () => {
      render(<Login />);

      await waitFor(() => {
        expect(screen.getByText("Sign in to continue")).toBeInTheDocument();
      });
    });

    it("should render Google sign in button", async () => {
      render(<Login />);

      await waitFor(() => {
        expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
      });
    });

    it("should not render spinner", async () => {
      render(<Login />);

      await waitFor(() => {
        const spinner = document.querySelector("ion-spinner");
        expect(spinner).not.toBeInTheDocument();
      });
    });
  });

  describe("sign in action", () => {
    it("should call signInWithGoogle when button is clicked", async () => {
      render(<Login />);

      const button = screen.getByText("Sign in with Google");
      fireEvent.click(button);

      await waitFor(() => {
        expect(mockSignInWithOAuth).toHaveBeenCalledWith({
          provider: "google",
          options: {
            redirectTo: expect.any(String),
          },
        });
      });
    });

    it("should handle sign in error gracefully", async () => {
      const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
      mockSignInWithOAuth.mockResolvedValue({ error: { message: "Auth error" } });

      render(<Login />);

      const button = screen.getByText("Sign in with Google");
      fireEvent.click(button);

      await waitFor(() => {
        expect(consoleSpy).toHaveBeenCalled();
      });

      consoleSpy.mockRestore();
    });
  });
});
