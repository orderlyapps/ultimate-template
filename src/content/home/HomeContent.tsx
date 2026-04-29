// import { WelcomeHeading } from "./content/welcome-heading/WelcomeHeading";
import { List } from "@ionic-layout/list/List";
import { Item } from "@ionic-layout/item/Item";
import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";
import { Label } from "@ionic-display/label/Label";
import { useUserCongregation } from "@feature/db/congregation/user-congregation/use-user-congregation/useUserCongregation";
import { HomeAccordions } from "@/content/home/content/home-accordions/HomeAccordions";

export const HomeContent: React.FC = () => {
  const [congregation] = useUserCongregation();

  return (
    <>
      {congregation?.id === "7b15d4e5-d4fa-4eb4-a276-3790b7c4897b" && (
        <>
          {/* <WelcomeHeading /> */}
          <Space height="2" />
          <HomeAccordions />
        </>
      )}
      {congregation?.id !== "7b15d4e5-d4fa-4eb4-a276-3790b7c4897b" && (
        <List>
          <Space />
          <Item className="ion-text-center" lines="none">
            <Label>
              <Text size="lg">Go to Settings {">"} Profile to reset app</Text>
            </Label>
          </Item>
        </List>
      )}
      <Space />
    </>
  );
};
