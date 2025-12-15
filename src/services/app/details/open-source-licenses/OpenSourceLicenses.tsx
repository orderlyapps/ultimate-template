import { List } from "@ionic-layout/list/List";
import { useState } from "react";
import { OpenSourceLicenseItem } from "./components/OpenSourceLicenseItem";
import { OpenSourceLicensesSearchbar } from "./components/OpenSourceLicensesSearchbar";
import licensesJson from "./licenses.json";
import type { LicenseListItem, LicensesMap } from "./license-types";
import { normalize, safeString } from "./license-utils";

export function OpenSourceLicenses() {
  const licenses = licensesJson as LicensesMap;

  const [query, setQuery] = useState("");
  const [openKey, setOpenKey] = useState<string | null>(null);

  const q = normalize(query);
  const items: LicenseListItem[] = Object.entries(licenses)
    .map(([key, value]) => {
      const repo = safeString(value.repository);
      const description = safeString(value.description);
      const licenseName = safeString(value.licenses);
      const version = safeString(value.version);
      const licenseText = safeString(value.licenseText);

      const haystack = normalize(
        [key, repo, description, licenseName, version]
          .filter(Boolean)
          .join(" ")
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
    .filter((x) => (q.length === 0 ? true : x.haystack.includes(q)))
    .sort((a, b) => a.key.localeCompare(b.key));

  return (
    <>
      <OpenSourceLicensesSearchbar query={query} onQueryChange={setQuery} />

      <List inset>
        {items.map((item) => (
          <OpenSourceLicenseItem
            key={item.key}
            item={item}
            isOpen={openKey === item.key}
            onToggle={() =>
              setOpenKey((prev) => (prev === item.key ? null : item.key))
            }
          />
        ))}
      </List>
    </>
  );
}
