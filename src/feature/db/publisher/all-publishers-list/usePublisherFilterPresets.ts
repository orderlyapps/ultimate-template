import { useLocalStorage } from "@util/hooks/useLocalStorage";
import type { UserFilterPreset, PublisherFilterState } from "./publisherFilterState";

const STORAGE_KEY = "publisher-filter-presets";

export function usePublisherFilterPresets() {
  const [presets, setPresets] = useLocalStorage<UserFilterPreset[]>(STORAGE_KEY, []);

  const savePreset = (name: string, filters: PublisherFilterState) => {
    const newPreset: UserFilterPreset = {
      id: crypto.randomUUID(),
      name,
      filters,
    };
    setPresets((prev) => [...(prev ?? []), newPreset]);
  };

  const renamePreset = (id: string, newName: string) => {
    setPresets((prev) =>
      (prev ?? []).map((p) => (p.id === id ? { ...p, name: newName } : p))
    );
  };

  const duplicatePreset = (id: string) => {
    const preset = (presets ?? []).find((p) => p.id === id);
    if (!preset) return;
    const copy: UserFilterPreset = {
      id: crypto.randomUUID(),
      name: `${preset.name} (copy)`,
      filters: { ...preset.filters },
    };
    setPresets((prev) => [...(prev ?? []), copy]);
  };

  const deletePreset = (id: string) => {
    setPresets((prev) => (prev ?? []).filter((p) => p.id !== id));
  };

  return {
    userPresets: presets ?? [],
    savePreset,
    renamePreset,
    duplicatePreset,
    deletePreset,
  };
}
