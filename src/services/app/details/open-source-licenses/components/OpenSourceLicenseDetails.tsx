import { Icon } from "@ionic-display/icon/Icon";
import { Text } from "@ionic-display/text/Text";
import { Button } from "@ionic-input/button/Button";
import { Item } from "@ionic-layout/item/Item";
import { List } from "@ionic-layout/list/List";
import { openOutline } from "ionicons/icons";
import type { LicenseListItem } from "../license-types";
import { IonLabel } from "@ionic/react";
import { Space } from "@layout/space/Space";

type Props = {
  item: Pick<LicenseListItem, "description" | "repo" | "licenseText">;
};

export function OpenSourceLicenseDetails({ item }: Props) {
  const { description, repo, licenseText } = item;

  return (
    <List inset>
      {description && (
        <Item lines="none">
          <IonLabel>
            <Text className="ion-text-wrap">{description}</Text>
          </IonLabel>
          <Button
            slot="end"
            fill="clear"
            // size="small"
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
          {/* <Label>License</Label> */}
          <div slot="end">
            <Text bold size="lg">
              License
            </Text>

            <Space height="0.5" />

            <Text>{licenseText}</Text>
          </div>
        </Item>
      )}
    </List>
  );
}
