import { List } from "@ionic-layout/list/List";
import { NavItem } from "@navigation/nav-item/NavItem";
import { Space } from "@layout/space/Space";

/**
 * Content component for the Publishers page.
 * Renders the navigation list for publisher sub-pages.
 */
export const PublishersContent: React.FC = () => {
  return (
    <>
      <Space height="2" />
      <List>
        <NavItem routerLink="/publishers/all">Publisher Lists</NavItem>
        <NavItem routerLink="/publishers/groups">Groups</NavItem>
        <NavItem routerLink="/publishers/map">Map</NavItem>
      </List>
    </>
  );
};
