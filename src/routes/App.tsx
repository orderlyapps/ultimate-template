import { IonReactRouter } from "@ionic/react-router";
import { IonApp, setupIonicReact, IonTabs } from "@ionic/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@tanstack-query/client";
import { pages } from "@pages/Pages";
import { tabs } from "@tabs/Tabs";

import "@css/index.css";

setupIonicReact({ swipeBackEnabled: false });

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <IonApp>
        <IonReactRouter>
          <IonTabs>
            {pages}
            {tabs}
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </QueryClientProvider>
  );
};

export default App;
