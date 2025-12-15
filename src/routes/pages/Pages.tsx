import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { Home } from "@pages/home/Home";
import { Settings } from "@pages/settings/Settings";
import { Profile } from "@pages/settings/profile/Profile";
import { Appearance } from "@pages/settings/appearance/Appearance";
import { Features } from "@pages/settings/features/Features";
import { AppDetails } from "@pages/settings/app-details/AppDetails";
import { Login } from "@services/app/auth/LoginPage";

export const pages = (
  <IonRouterOutlet>
    <Route exact path="/login" render={() => <Login />} />
    <Route exact path="/home" render={() => <Home />} />
    <Route exact path="/settings" render={() => <Settings />} />
    <Route exact path="/settings/profile" render={() => <Profile />} />
    <Route exact path="/settings/appearance" render={() => <Appearance />} />
    <Route exact path="/settings/features" render={() => <Features />} />
    <Route exact path="/settings/app-details" render={() => <AppDetails />} />
    <Route exact path="/" render={() => <Redirect to="/home" />} />
  </IonRouterOutlet>
);
