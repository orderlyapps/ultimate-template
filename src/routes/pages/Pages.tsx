import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { Home } from "@pages/home/Home";
import { Talks } from "@pages/home/talks/Talks";
import { Talk } from "@pages/home/talks/talk/Talk";
import { TalkSection } from "@pages/home/talks/talk/section/TalkSection";
import { TalkSubsection } from "@pages/home/talks/talk/section/subsection/TalkSubsection";
import { Ministry } from "@pages/ministry/Ministry";
import { Schedules } from "@pages/schedules/Schedules";
import { Publishers } from "@pages/publishers/Publishers";
import { Settings } from "@pages/settings/Settings";
import { Profile } from "@pages/settings/profile/Profile";
import { Appearance } from "@pages/settings/appearance/Appearance";
import { Features } from "@pages/settings/features/Features";
import { HelpTextSettings } from "@pages/settings/help-text/HelpTextSettings";
import { AppDetails } from "@pages/settings/app-details/AppDetails";
import { Login } from "@services/app/auth/LoginPage";
import { FeatureGuard } from "@services/app/features/FeatureGuard";

export const pages = (
  <IonRouterOutlet>
    <Route exact path="/login" render={() => <Login />} />
    <Route exact path="/home" render={() => <Home />} />
    <Route
      exact
      path="/home/talks"
      render={() => (
        <FeatureGuard id="talks" fallback={<Redirect to="/home" />}>
          <Talks />
        </FeatureGuard>
      )}
    />
    <Route
      exact
      path="/home/talks/:talkId"
      render={() => (
        <FeatureGuard id="talks" fallback={<Redirect to="/home" />}>
          <Talk />
        </FeatureGuard>
      )}
    />
    <Route
      exact
      path="/home/talks/:talkId/sections/:sectionId"
      render={() => (
        <FeatureGuard id="talks" fallback={<Redirect to="/home" />}>
          <TalkSection />
        </FeatureGuard>
      )}
    />
    <Route
      exact
      path="/home/talks/:talkId/sections/:sectionId/subsections/:subsectionId"
      render={() => (
        <FeatureGuard id="talks" fallback={<Redirect to="/home" />}>
          <TalkSubsection />
        </FeatureGuard>
      )}
    />
    <Route exact path="/ministry" render={() => <Ministry />} />
    <Route exact path="/schedules" render={() => <Schedules />} />
    <Route exact path="/publishers" render={() => <Publishers />} />
    <Route exact path="/settings" render={() => <Settings />} />
    <Route exact path="/settings/profile" render={() => <Profile />} />
    <Route exact path="/settings/appearance" render={() => <Appearance />} />
    <Route exact path="/settings/features" render={() => <Features />} />
    <Route exact path="/settings/help-text" render={() => <HelpTextSettings />} />
    <Route exact path="/settings/app-details" render={() => <AppDetails />} />
    <Route exact path="/" render={() => <Redirect to="/home" />} />
  </IonRouterOutlet>
);
