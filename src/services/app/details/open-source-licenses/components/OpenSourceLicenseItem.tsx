import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";
import { Accordion } from "@ionic-layout/accordion/Accordion";
import { AccordionContent } from "@ionic-layout/accordion-content/AccordionContent";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { OpenSourceLicenseDetails } from "./OpenSourceLicenseDetails";
import type { LicenseListItem } from "../license-types";

type Props = {
  item: Pick<
    LicenseListItem,
    "key" | "licenseName" | "version" | "description" | "repo" | "licenseText"
  >;
};

export function OpenSourceLicenseItem({ item }: Props) {
  const { key, licenseName, version } = item;

  return (
    <Accordion value={key}>
      <ItemAccordionHeader>
        <Label>{key}</Label>

        <Text slot="end" className="ion-text-end ion-no-margin">
          {licenseName && <span>{licenseName}</span>}
          {licenseName && version && " - "}
          {version && <span>{version}</span>}
        </Text>
      </ItemAccordionHeader>

      <AccordionContent>
        <OpenSourceLicenseDetails item={item} />
      </AccordionContent>
    </Accordion>
  );
}
