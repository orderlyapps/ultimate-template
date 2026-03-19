export type AppFeatureId = "talks" | "mapPrint" | "groups";

export type FeatureGroupId = string;

export type FeatureGroupDefinition = {
  id: FeatureGroupId;
  label: string;
  defaultEnabled: boolean;
};

export type AppFeatureDefinition = {
  id: AppFeatureId;
  label: string;
  defaultEnabled: boolean;
  groups: FeatureGroupId[];
};

export const featureGroups: readonly FeatureGroupDefinition[] = [
  {
    id: "tools",
    label: "Tools",
    defaultEnabled: false,
  },
];

export const appFeatures: readonly AppFeatureDefinition[] = [
  {
    id: "talks" as const,
    label: "Talks",
    defaultEnabled: false,
    groups: ["tools"],
  },
  {
    id: "mapPrint" as const,
    label: "Map Print",
    defaultEnabled: false,
    groups: ["tools"],
  },
  ...(import.meta.env.VITE_IS_BETA
    ? [
        {
          id: "groups" as const,
          label: "Groups",
          defaultEnabled: false,
          groups: ["tools"],
        },
      ]
    : []),
];

export type FeatureOverrides = Partial<Record<AppFeatureId, boolean>>;
export type FeatureGroupOverrides = Partial<Record<FeatureGroupId, boolean>>;

export function isGroupEnabled(
  groupId: FeatureGroupId,
  groupOverrides: FeatureGroupOverrides,
) {
  const override = groupOverrides[groupId];
  if (typeof override === "boolean") return override;

  const def = featureGroups.find((g) => g.id === groupId);
  return def?.defaultEnabled ?? true;
}

export function isFeatureEnabled(args: {
  featureId: AppFeatureId;
  featureOverrides: FeatureOverrides;
  groupOverrides: FeatureGroupOverrides;
}) {
  const feature = appFeatures.find((f) => f.id === args.featureId);
  if (!feature) return false;

  const featureOverride = args.featureOverrides[args.featureId];
  const featureEnabled =
    typeof featureOverride === "boolean"
      ? featureOverride
      : feature.defaultEnabled;

  if (!featureEnabled) return false;

  return feature.groups.every((groupId) =>
    isGroupEnabled(groupId, args.groupOverrides),
  );
}
