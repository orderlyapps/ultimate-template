import { Icon } from "@ionic-display/icon/Icon";
import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";
import { Button } from "@ionic-input/button/Button";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { openOutline } from "ionicons/icons";
import type { LicenseListItem } from "../license-types";

type Props = {
  item: Pick<LicenseListItem, "description" | "repo" | "licenseText">;
};

export function OpenSourceLicenseDetails({
  item,
}: Props) {
  const { description, repo, licenseText } = item;

  return (
    <List inset>
      {description && (
        <Item>
          <Label>Description</Label>
          <Text slot="end" className="ion-text-end ion-no-margin">
            {description}
          </Text>
        </Item>
      )}

      {repo && (
        <Item>
          <Label>Repository</Label>
          <Button
            slot="end"
            fill="clear"
            size="small"
            href={repo}
            target="_blank"
            rel="noreferrer"
          >
            <Icon icon={openOutline} />
          </Button>
        </Item>
      )}

      {licenseText && (
        <Item>
          <Label>License</Label>
          <Text slot="end" className="ion-text-end ion-no-margin">
            <pre
              style={{
                maxWidth: "60vw",
                maxHeight: "30vh",
                overflow: "auto",
                margin: 0,
                whiteSpace: "pre-wrap",
              }}
            >
              {licenseText}
            </pre>
          </Text>
        </Item>
      )}
    </List>
  );
}
