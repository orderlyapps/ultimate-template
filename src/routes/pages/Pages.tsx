import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { Home } from "@pages/home/Home";
import { Test } from "@pages/home/Test";
import { Settings } from "@pages/settings/Settings";
import { Login } from "@services/app/auth/LoginPage";
import { AuthGuard } from "@services/app/auth/AuthGuard";

export const pages = (
  <IonRouterOutlet>
    <Route exact path="/login" render={() => <Login />} />
    <Route exact path="/home" render={() => <Home />} />
    <Route
      exact
      path="/home/test"
      render={() => (
        <AuthGuard>
          <Test />
        </AuthGuard>
      )}
    />
    <Route exact path="/settings" render={() => <Settings />} />
    <Route exact path="/" render={() => <Redirect to="/home" />} />
  </IonRouterOutlet>
);
