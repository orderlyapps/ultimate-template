import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@feature/testing/render";
import { act } from "@testing-library/react";
import { SignOutButton } from "./SignOutButton";
import { useAuthStore } from "./useAuthStore";
import type { Session, User } from "@supabase/supabase-js";

const mockSignOut = vi.fn();

vi.mock("@supabase-db/client", () => ({
  supabase: {
    auth: {
      getSession: vi.fn().mockResolvedValue({ data: { session: null } }),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
      signOut: () => mockSignOut(),
    },
  },
}));

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

describe("SignOutButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockSignOut.mockResolvedValue({ error: null });

    act(() => {
      useAuthStore.setState({
        session: mockSession,
        user: mockUser,
        isLoading: false,
      });
    });
  });

  it("should render sign out button with text", () => {
    render(<SignOutButton />);

    expect(screen.getByText("Sign Out")).toBeInTheDocument();
  });

  it("should render logout icon", () => {
    render(<SignOutButton />);

    const icon = document.querySelector("ion-icon");
    expect(icon).toBeInTheDocument();
  });

  it("should call signOut when clicked", async () => {
    render(<SignOutButton />);

    const button = screen.getByText("Sign Out");
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockSignOut).toHaveBeenCalled();
    });
  });

  it("should handle sign out error gracefully", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    mockSignOut.mockResolvedValue({ error: { message: "Sign out error" } });

    render(<SignOutButton />);

    const button = screen.getByText("Sign Out");
    fireEvent.click(button);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });

  describe("size prop", () => {
    it("should render with default size", () => {
      render(<SignOutButton />);

      const button = document.querySelector("ion-button");
      expect(button).toHaveAttribute("size", "default");
    });

    it("should render with small size", () => {
      render(<SignOutButton size="small" />);

      const button = document.querySelector("ion-button");
      expect(button).toHaveAttribute("size", "small");
    });

    it("should render with large size", () => {
      render(<SignOutButton size="large" />);

      const button = document.querySelector("ion-button");
      expect(button).toHaveAttribute("size", "large");
    });
  });

  describe("color prop", () => {
    it("should render with default danger color", () => {
      render(<SignOutButton />);

      const button = document.querySelector("ion-button");
      expect(button).toHaveAttribute("color", "danger");
    });

    it("should render with custom color", () => {
      render(<SignOutButton color="primary" />);

      const button = document.querySelector("ion-button");
      expect(button).toHaveAttribute("color", "primary");
    });
  });
});
