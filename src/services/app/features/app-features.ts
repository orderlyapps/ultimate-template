export type AppFeatureId = "talks";

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
  
];

export const appFeatures: readonly AppFeatureDefinition[] = [
  {
    id: "talks",
    label: "Talks",
    defaultEnabled: false,
    groups: [],
  },
];

export type FeatureOverrides = Partial<Record<AppFeatureId, boolean>>;
export type FeatureGroupOverrides = Partial<Record<FeatureGroupId, boolean>>;

export function isGroupEnabled(
  groupId: FeatureGroupId,
  groupOverrides: FeatureGroupOverrides
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
    isGroupEnabled(groupId, args.groupOverrides)
  );
}
