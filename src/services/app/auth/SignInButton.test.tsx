import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@services/app/testing/render";
import { SignInButton } from "./SignInButton";
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

describe("SignInButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignInWithOAuth.mockResolvedValue({ error: null });

    useAuthStore.setState({
      session: null,
      user: null,
      isLoading: false,
    });
  });

  it("should render sign in button with text", async () => {
    render(<SignInButton />);

    await waitFor(() => {
      expect(screen.getByText("Sign in with Google")).toBeInTheDocument();
    });
  });

  it("should render Google icon", async () => {
    render(<SignInButton />);

    await waitFor(() => {
      const icon = document.querySelector("ion-icon");
      expect(icon).toBeInTheDocument();
    });
  });

  it("should call signInWithGoogle when clicked", async () => {
    render(<SignInButton />);

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

    render(<SignInButton />);

    const button = screen.getByText("Sign in with Google");
    fireEvent.click(button);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  describe("size prop", () => {
    it("should render with default size", async () => {
      render(<SignInButton />);

      await waitFor(() => {
        const button = document.querySelector("ion-button");
        expect(button).toHaveAttribute("size", "default");
      });
    });

    it("should render with small size", async () => {
      render(<SignInButton size="small" />);

      await waitFor(() => {
        const button = document.querySelector("ion-button");
        expect(button).toHaveAttribute("size", "small");
      });
    });

    it("should render with large size", async () => {
      render(<SignInButton size="large" />);

      await waitFor(() => {
        const button = document.querySelector("ion-button");
        expect(button).toHaveAttribute("size", "large");
      });
    });
  });
});
