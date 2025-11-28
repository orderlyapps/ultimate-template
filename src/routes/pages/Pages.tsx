import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import Home from "@home/Home";
import Settings from "@settings/Settings";

export const pages = (
  <IonRouterOutlet>
    <Route exact path="/home" render={() => <Home />} />
    <Route exact path="/settings" render={() => <Settings />} />
    <Route exact path="/" render={() => <Redirect to="/home" />} />
  </IonRouterOutlet>
);
