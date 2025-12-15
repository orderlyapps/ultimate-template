import { Icon } from "@ionic-display/icon/Icon";
import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { chevronDown, chevronUp } from "ionicons/icons";
import { OpenSourceLicenseDetails } from "./OpenSourceLicenseDetails";
import type { LicenseListItem } from "../license-types";

type Props = {
  item: Pick<
    LicenseListItem,
    "key" | "licenseName" | "version" | "description" | "repo" | "licenseText"
  >;
  isOpen: boolean;
  onToggle: () => void;
};

export function OpenSourceLicenseItem({
  item,
  isOpen,
  onToggle,
}: Props) {
  const { key, licenseName, version } = item;

  return (
    <div>
      <Item button detail={false} onClick={onToggle}>
        <Label>{key}</Label>

        <Text slot="end" className="ion-text-end ion-no-margin">
          {licenseName && <span>{licenseName}</span>}
          {licenseName && version && <br />}
          {version && <span>{version}</span>}
        </Text>

        <Icon
          slot="end"
          icon={isOpen ? chevronUp : chevronDown}
          aria-hidden="true"
        />
      </Item>

      {isOpen && (
        <OpenSourceLicenseDetails item={item} />
      )}
    </div>
  );
}
