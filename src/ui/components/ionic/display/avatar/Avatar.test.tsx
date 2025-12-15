import { render, screen } from "@services/app/testing/render";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders without crashing", () => {
    render(<Avatar />);
    const avatar = document.querySelector("ion-avatar");
    expect(avatar).toBeInTheDocument();
  });

  it("renders children content", () => {
    render(
      <Avatar>
        <img src="https://example.com/avatar.png" alt="User avatar" />
      </Avatar>
    );
    const img = screen.getByAltText("User avatar");
    expect(img).toBeInTheDocument();
  });

  it("passes through additional props", () => {
    render(<Avatar data-testid="custom-avatar" />);
    const avatar = screen.getByTestId("custom-avatar");
    expect(avatar).toBeInTheDocument();
  });

  it("applies slot prop when provided", () => {
    render(<Avatar slot="start" data-testid="slotted-avatar" />);
    const avatar = screen.getByTestId("slotted-avatar");
    expect(avatar).toHaveAttribute("slot", "start");
  });
});
