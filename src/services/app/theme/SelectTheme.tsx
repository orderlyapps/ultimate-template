import { SelectItem } from "@input/select/SelectItem";
import {
  useThemeStore,
  type ThemePreference,
} from "@services/app/theme/themeStore";

const themeOptions: readonly { value: ThemePreference; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
] as const;

export const SelectTheme = () => {
  const { preference, setPreference } = useThemeStore();

  return (
    <SelectItem
      label="Theme"
      value={preference}
      options={themeOptions}
      onIonChange={(e) => setPreference(e.detail.value)}
    />
  );
};
