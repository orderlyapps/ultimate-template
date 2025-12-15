import { AccordionGroup } from "@ionic-layout/accordion-group/AccordionGroup";
import { useState } from "react";
import { OpenSourceLicenseItem } from "./components/OpenSourceLicenseItem";
import { OpenSourceLicensesSearchbar } from "./components/OpenSourceLicensesSearchbar";
import licensesJson from "./licenses.json";
import type { LicenseListItem, LicensesMap } from "./license-types";
import { normalize, safeString } from "./license-utils";

function isLicensed(licenseName: string) {
  const v = licenseName.trim();
  if (v.length === 0) return false;
  return !/^(unlicensed|unknown|none|noassertion)$/i.test(v);
}

export function OpenSourceLicenses() {
  const licenses = licensesJson as LicensesMap;

  const [query, setQuery] = useState("");

  const q = normalize(query);
  const items: LicenseListItem[] = Object.entries(licenses)
    .map(([key, value]) => {
      const repo = safeString(value.repository);
      const description = safeString(value.description);
      const licenseName = safeString(value.licenses);
      const version = safeString(value.version);
      const licenseText = safeString(value.licenseText);

      const haystack = normalize(
        [key, repo, description, licenseName, version].filter(Boolean).join(" ")
      );

      return {
        key,
        repo,
        description,
        licenseName,
        version,
        licenseText,
        haystack,
      };
    })
    .filter((x) => isLicensed(x.licenseName))
    .filter((x) => (q.length === 0 ? true : x.haystack.includes(q)))
    .sort((a, b) => a.key.localeCompare(b.key));

  return (
    <>
      <OpenSourceLicensesSearchbar query={query} onQueryChange={setQuery} />

      <AccordionGroup>
        {items.map((item) => (
          <OpenSourceLicenseItem key={item.key} item={item} />
        ))}
      </AccordionGroup>
    </>
  );
}
