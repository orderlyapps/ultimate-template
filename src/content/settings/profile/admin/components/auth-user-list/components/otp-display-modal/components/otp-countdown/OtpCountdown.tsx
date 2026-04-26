import { Text } from "@ionic-display/text/Text";
import { useEffect, useState } from "react";

interface OtpCountdownProps {
  /** Total seconds before `onExpire` fires. */
  durationSeconds: number;
  onExpire: () => void;
}

/**
 * Shows a "Hides in Ns" countdown and invokes `onExpire` when it reaches
 * zero. Lives in its own component so it can be remounted (via a `key`)
 * to restart cleanly without `setState` during the render of the parent.
 */
export const OtpCountdown: React.FC<OtpCountdownProps> = ({
  durationSeconds,
  onExpire,
}) => {
  const [remaining, setRemaining] = useState(durationSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setRemaining((s) => {
        if (s <= 1) {
          clearInterval(interval);
          onExpire();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [onExpire]);

  return (
    <Text color="medium" size="sm">
      Hides in {remaining}s
    </Text>
  );
};
