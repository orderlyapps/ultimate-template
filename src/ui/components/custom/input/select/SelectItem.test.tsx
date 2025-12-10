import { render, screen } from "@feature/testing/render";
import { SelectItem } from "./SelectItem";

const mockOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

describe("SelectItem", () => {
  it("renders without crashing", () => {
    render(<SelectItem label="Test Label" options={mockOptions} />);
    const item = document.querySelector("ion-item");
    expect(item).toBeInTheDocument();
  });

  it("renders the label text", () => {
    render(<SelectItem label="Test Label" options={mockOptions} />);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("renders all options", () => {
    render(<SelectItem label="Test Label" options={mockOptions} />);
    const selectOptions = document.querySelectorAll("ion-select-option");
    expect(selectOptions).toHaveLength(3);
  });

  it("renders option labels correctly", () => {
    render(<SelectItem label="Test Label" options={mockOptions} />);
    expect(screen.getByText("Option 1")).toBeInTheDocument();
    expect(screen.getByText("Option 2")).toBeInTheDocument();
    expect(screen.getByText("Option 3")).toBeInTheDocument();
  });

  it("passes through additional props to select", () => {
    render(
      <SelectItem
        label="Test Label"
        options={mockOptions}
        data-testid="custom-select"
      />
    );
    const select = screen.getByTestId("custom-select");
    expect(select).toBeInTheDocument();
  });

  it("handles options with null value", () => {
    const optionsWithNull = [
      { value: null, label: "None" },
      { value: "option1", label: "Option 1" },
    ];
    render(<SelectItem label="Test Label" options={optionsWithNull} />);
    expect(screen.getByText("None")).toBeInTheDocument();
  });

  it("sets slot='end' by default on the select", () => {
    render(
      <SelectItem
        label="Test Label"
        options={mockOptions}
        data-testid="test-select"
      />
    );
    const select = screen.getByTestId("test-select");
    expect(select).toHaveAttribute("slot", "end");
  });
});
