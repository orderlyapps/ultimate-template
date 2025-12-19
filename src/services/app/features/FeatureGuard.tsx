import { useAppFeaturesStore } from "@services/app/features/useAppFeaturesStore";
import type { AppFeatureId } from "@services/app/features/app-features";

interface FeatureGuardProps {
  id: AppFeatureId;
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

export const FeatureGuard: React.FC<FeatureGuardProps> = ({
  id,
  children,
  fallback,
}) => {
  const isEnabled = useAppFeaturesStore((s) => s.isEnabled(id));

  if (!isEnabled) {
    return <>{fallback ?? null}</>;
  }

  return <>{children}</>;
};
