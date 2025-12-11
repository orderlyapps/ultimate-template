import { useState, useEffect } from "react";
import { IonIcon, IonLabel, IonTabBar, IonTabButton } from "@ionic/react";
import home from "@icons/home.svg";
import settings from "@icons/settings.svg";

const useOrientation = () => {
  const [isPortrait, setIsPortrait] = useState(
    window.matchMedia("(orientation: portrait)").matches
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(orientation: portrait)");
    const handler = (e: MediaQueryListEvent) => setIsPortrait(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  return isPortrait;
};

export const Tabs: React.FC = () => {
  const isPortrait = useOrientation();
  const layout = isPortrait ? "icon-top" : "icon-start";

  return (
    <IonTabBar slot="bottom">
      <IonTabButton tab="home" href="/home" layout={layout}>
        <IonIcon src={home} />
        <IonLabel>Home</IonLabel>
      </IonTabButton>
      <IonTabButton tab="settings" href="/settings" layout={layout}>
        <IonIcon icon={settings} />
        <IonLabel>Settings</IonLabel>
      </IonTabButton>
    </IonTabBar>
  );
};
