import { IonReactRouter } from "@ionic/react-router";
import { IonApp, setupIonicReact, IonTabs } from "@ionic/react";
import { pages } from "@pages/Pages";
import { tabs } from "@tabs/Tabs";

import "@css/index.css";

setupIonicReact();

function App() {
  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          {pages}
          {tabs}
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
}

export default App;
