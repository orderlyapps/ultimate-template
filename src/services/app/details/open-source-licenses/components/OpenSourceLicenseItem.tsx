import { Label } from "@ionic-display/label/Label";
import { Accordion } from "@ionic-layout/accordion/Accordion";
import { AccordionContent } from "@ionic-layout/accordion-content/AccordionContent";
import { ItemAccordionHeader } from "@ionic-layout/accordion-header/AccordionHeader";
import { OpenSourceLicenseDetails } from "./OpenSourceLicenseDetails";
import type { LicenseListItem } from "../license-types";

type Props = {
  item: Pick<
    LicenseListItem,
    "key" | "licenseName" | "description" | "repo" | "licenseText"
  >;
};

function stripVersionFromKey(key: string) {
  const at = key.lastIndexOf("@");
  if (at <= 0) return key;

  const maybeVersion = key.slice(at + 1);
  if (!maybeVersion) return key;
  if (!/\d/.test(maybeVersion)) return key;

  return key.slice(0, at);
}

export function OpenSourceLicenseItem({ item }: Props) {
  const { key } = item;
  const displayKey = stripVersionFromKey(key);

  return (
    <Accordion value={key}>
      <ItemAccordionHeader>
        <Label>{displayKey}</Label>
      </ItemAccordionHeader>

      <AccordionContent>
        <OpenSourceLicenseDetails item={item} />
      </AccordionContent>
    </Accordion>
  );
}
