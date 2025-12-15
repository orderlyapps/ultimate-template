import { IonReactRouter } from "@ionic/react-router";
import { IonApp, setupIonicReact, IonTabs } from "@ionic/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@tanstack-query/client";
import { pages } from "@pages/Pages";
import { Tabs } from "@tabs/Tabs";
import { PwaUpdatePrompt } from "@services/app/pwa/PwaUpdatePrompt";

import "@css/index.css";
import { useTheme } from "@services/app/theme/useTheme";

setupIonicReact({
  swipeBackEnabled: false,
});

const App: React.FC = () => {
  useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <IonApp>
        <PwaUpdatePrompt />
        <IonReactRouter>
          <IonTabs>
            {pages}
            <Tabs />
          </IonTabs>
        </IonReactRouter>
      </IonApp>
    </QueryClientProvider>
  );
};

export default App;
