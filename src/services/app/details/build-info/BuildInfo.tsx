import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { format, formatDistanceStrict } from "date-fns";
import { useEffect, useMemo, useState } from "react";

type BuildInfoProps = {
  buildTimeIso?: string;
};

export const BuildInfo: React.FC<BuildInfoProps> = ({ buildTimeIso }) => {
  const buildDate = useMemo(
    () => new Date(buildTimeIso ?? import.meta.env.VITE_BUILD_TIME_ISO),
    [buildTimeIso]
  );
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  const builtAt = format(buildDate, "EEEE, PPp");
  const timeAgo = useMemo(() => {
    return formatDistanceStrict(buildDate, now, {
      addSuffix: true,
    });
  }, [buildDate, now]);

  const secondary = `${timeAgo}`;

  return (
    <Item lines="none">
      <Label>App Build</Label>

      <Text slot="end" className="ion-text-end ion-no-margin">
        {builtAt}
        <br />
        {secondary}
      </Text>
    </Item>
  );
};
