import { Searchbar } from "@ionic-input/searchbar/Searchbar";

type Props = {
  query: string;
  onQueryChange: (next: string) => void;
};

export function OpenSourceLicensesSearchbar({
  query,
  onQueryChange,
}: Props) {
  return (
    <Searchbar
      value={query}
      placeholder="Search packages"
      onIonInput={(e) => onQueryChange(e.detail.value ?? "")}
    />
  );
}
