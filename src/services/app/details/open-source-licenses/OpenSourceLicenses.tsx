import { Item } from "@ionic-layout/item/Item";
import { Label } from "@ionic-display/label/Label";
import { Text } from "@ionic-display/text/Text";
import { Searchbar } from "@ionic-input/searchbar/Searchbar";
import { chevronDown, chevronUp, openOutline } from "ionicons/icons";
import { useMemo, useState } from "react";
import licensesJson from "./licenses.json";
import { List } from "@ionic-layout/list/List";
import { Icon } from "@ionic-display/icon/Icon";
import { Button } from "@ionic-input/button/Button";

type LicenseEntry = {
  licenses?: string;
  repository?: string;
  version?: string;
  description?: string;
  publisher?: string;
  email?: string;
  copyright?: string;
  licenseFile?: string;
  licenseText?: string;
  licenseModified?: string;
  path?: string;
};

type LicensesMap = Record<string, LicenseEntry>;

function normalize(text: string) {
  return text.trim().toLowerCase();
}

function safeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export const OpenSourceLicenses: React.FC = () => {
  const licenses = licensesJson as LicensesMap;

  const [query, setQuery] = useState("");
  const [openKey, setOpenKey] = useState<string | null>(null);

  const items = useMemo(() => {
    const q = normalize(query);

    return Object.entries(licenses)
      .map(([key, value]) => {
        const repo = safeString(value.repository);
        const description = safeString(value.description);
        const licenseName = safeString(value.licenses);
        const version = safeString(value.version);

        const haystack = normalize(
          [key, repo, description, licenseName, version]
            .filter(Boolean)
            .join(" ")
        );

        return {
          key,
          value,
          haystack,
        };
      })
      .filter((x) => (q.length === 0 ? true : x.haystack.includes(q)))
      .sort((a, b) => a.key.localeCompare(b.key));
  }, [licenses, query]);

  return (
    <>
      <Searchbar
        value={query}
        placeholder="Search packages"
        onIonInput={(e) => setQuery(e.detail.value ?? "")}
      />

      <List inset>
        {items.map(({ key, value }) => {
          const isOpen = openKey === key;

          const version = safeString(value.version);
          const licenseName = safeString(value.licenses);
          const repo = safeString(value.repository);
          const description = safeString(value.description);
          const licenseText = safeString(value.licenseText);

          return (
            <div key={key}>
              <Item
                button
                detail={false}
                onClick={() =>
                  setOpenKey((prev) => (prev === key ? null : key))
                }
              >
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
              )}
            </div>
          );
        })}
      </List>
    </>
  );
};
