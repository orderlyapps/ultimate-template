export type LicenseEntry = {
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

export type LicensesMap = Record<string, LicenseEntry>;

export type LicenseListItem = {
  key: string;
  licenseName: string;
  version: string;
  repo: string;
  description: string;
  licenseText: string;
  haystack: string;
};
