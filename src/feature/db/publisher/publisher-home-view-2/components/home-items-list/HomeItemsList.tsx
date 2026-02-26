import { useState } from "react";
import { IonButton, IonLabel } from "@ionic/react";
import { Space } from "@layout/space/Space";
import { Text } from "@ionic-display/text/Text";
import { Item } from "@ionic-layout/item/Item";
import { HomeItemCard } from "../home-item-card/HomeItemCard";
import { getMonthLabel, type HomeItem } from "../../usePublisherHomeItems";

type DisplayMode = "initial" | "more" | "all";

type Props = {
  items: HomeItem[];
};

export const HomeItemsList: React.FC<Props> = ({ items }) => {
  const [displayMode, setDisplayMode] = useState<DisplayMode>("initial");

  const limit =
    displayMode === "initial" ? 5 : displayMode === "more" ? 9 : items.length;
  const visibleItems = items.slice(0, limit);

  const handleToggle = () => {
    if (displayMode === "initial") setDisplayMode("more");
    else if (displayMode === "more") setDisplayMode("all");
    else setDisplayMode("initial");
  };

  const getButtonLabel = () => {
    if (displayMode === "initial") return "Show More";
    if (displayMode === "more") return "Show All";
    return "Show Less";
  };

  const showButton = items.length > 4 || displayMode !== "initial";

  return (
    <>
      {visibleItems.map((item, index) => {
        const showDivider =
          index === 0 || item.monthId !== visibleItems[index - 1].monthId;

        return (
          <div key={item.key}>
            {showDivider && (
              <Item className="ion-no-padding ion-text-center" lines="none">
                <IonLabel>
                  <Text size="lg" bold color="primary">
                    {getMonthLabel(item.monthId).toUpperCase()}
                  </Text>
                </IonLabel>
              </Item>
            )}
            <HomeItemCard
              title={item.title}
              dateLabel={item.dateLabel}
              details={item.details}
            />
            <Space height="0.7" />
          </div>
        );
      })}
      {showButton && (
        <IonButton expand="block" fill="clear" onClick={handleToggle}>
          {getButtonLabel()}
        </IonButton>
      )}
    </>
  );
};
