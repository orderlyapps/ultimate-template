import { List } from "@ionic-layout/list/List";
import { NavItem } from "@navigation/nav-item/NavItem";
import { FeatureGuard } from "@services/app/features/FeatureGuard";

export const ToolsContent: React.FC = () => {
  return (
      <List>
        <FeatureGuard id="talks">
          <NavItem routerLink="/home/talks">Talks</NavItem>
        </FeatureGuard>
        <FeatureGuard id="mapPrint">
          <NavItem routerLink="/home/map-print">Map Print</NavItem>
        </FeatureGuard>
        <FeatureGuard id="groups">
          <NavItem routerLink="/home/groups">Groups</NavItem>
        </FeatureGuard>
        <NavItem routerLink="/home/tools/schedule-pdfs">Schedule PDFs</NavItem>
      </List>
  );
};
