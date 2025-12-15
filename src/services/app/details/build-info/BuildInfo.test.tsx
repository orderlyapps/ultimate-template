import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { render, screen } from "@services/app/testing/render";
import { act } from "@testing-library/react";
import { format, formatDistanceStrict } from "date-fns";
import { BuildInfo } from "./BuildInfo";

describe("BuildInfo", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders the build label and formatted build timestamp", () => {
    const buildIso = "2025-12-12T00:00:00.000Z";
    vi.setSystemTime(new Date("2025-12-12T00:00:05.000Z"));

    const buildDate = new Date(buildIso);
    const expectedBuiltAt = format(buildDate, "EEEE, PPp");

    const { container } = render(<BuildInfo buildTimeIso={buildIso} />);

    expect(screen.getByText("Built")).toBeInTheDocument();
    expect(container).toHaveTextContent(expectedBuiltAt);
  });

  it("updates the relative time as time passes", () => {
    const buildIso = "2025-12-12T00:00:00.000Z";

    const buildDate = new Date(buildIso);

    const initialNow = new Date("2025-12-12T00:00:02.000Z");
    vi.setSystemTime(initialNow);

    const { container } = render(<BuildInfo buildTimeIso={buildIso} />);

    const getRelative = () =>
      formatDistanceStrict(buildDate, new Date(Date.now()), { addSuffix: true });

    expect(container).toHaveTextContent(getRelative());

    act(() => {
      vi.setSystemTime(new Date("2025-12-12T00:00:03.000Z"));
      vi.advanceTimersByTime(1000);
    });

    expect(container).toHaveTextContent(getRelative());
  });
});
