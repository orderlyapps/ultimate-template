import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { Home } from "@pages/home/Home";
import { Tools } from "@pages/home/tools/Tools";
import { SchedulePdfs } from "@pages/home/tools/schedule-pdfs/SchedulePdfs";
import { Announcements } from "@pages/home/announcements/Announcements";
import { Announcement } from "@pages/home/announcement/Announcement";
import { Talks } from "@pages/home/talks/Talks";
import { MapPrint } from "@pages/home/map-print/MapPrint";
import { Groups } from "@pages/home/groups/Groups";
import { Group } from "@pages/home/groups/group/Group";
import { Talk } from "@pages/home/talks/talk/Talk";
import { TalkSection } from "@pages/home/talks/talk/section/TalkSection";
import { TalkSubsection } from "@pages/home/talks/talk/section/subsection/TalkSubsection";
import { Ministry } from "@pages/ministry/Ministry";
import { DoorToDoor } from "@pages/ministry/door-to-door/DoorToDoor";
import { LetterWriting } from "@pages/ministry/letter-writing/LetterWriting";
import { Maps } from "@pages/ministry/maps/Maps";
import { MapDetail } from "@pages/ministry/maps/map-detail/MapDetail";
import { Schedule } from "@pages/ministry/schedule/Schedule";
import { Schedules } from "@pages/schedules/Schedules";
import { MidweekMeeting } from "@pages/schedules/midweek-meeting/MidweekMeeting";
import { WeekendMeeting } from "@pages/schedules/weekend-meeting/WeekendMeeting";
import { WeekendMeetingEdit } from "@pages/schedules/weekend-meeting/edit/WeekendMeetingEdit";
import { WeekendAssignmentEdit } from "@pages/schedules/weekend-meeting/edit/assignment/WeekendAssignmentEdit";
import { AudioAndVideo } from "@pages/schedules/audio-and-video/AudioAndVideo";
import { Cleaning } from "@pages/schedules/cleaning/Cleaning";
import { Events } from "@pages/schedules/events/Events";
import { Publishers } from "@pages/publishers/Publishers";
import { AllPublishers } from "@pages/publishers/all/AllPublishers";
import { PublisherDetail } from "@pages/publishers/all/publisher-detail/PublisherDetail";
import { PublisherGroups } from "@pages/publishers/groups/PublisherGroups";
import { Appointed } from "@pages/publishers/appointed/Appointed";
import { RegularPioneers } from "@pages/publishers/regular-pioneers/RegularPioneers";
import { Settings } from "@pages/settings/Settings";
import { Profile } from "@pages/settings/profile/Profile";
import { Appearance } from "@pages/settings/appearance/Appearance";
import { Features } from "@pages/settings/features/Features";
import { HelpTextSettings } from "@pages/settings/help-text/HelpTextSettings";
import { AppDetails } from "@pages/settings/app-details/AppDetails";
import { Login } from "@services/app/auth/LoginPage";

export const pages = (
  <IonRouterOutlet>
    <Route exact path="/login" render={() => <Login />} />
    <Route exact path="/home" render={() => <Home />} />
    <Route exact path="/home/tools" render={() => <Tools />} />
    <Route exact path="/home/tools/schedule-pdfs" render={() => <SchedulePdfs />} />
    <Route exact path="/home/announcements" render={() => <Announcements />} />
    <Route exact path="/home/announcements/:announcementId" render={() => <Announcement />} />
    <Route exact path="/home/talks" render={() => <Talks />} />
    <Route exact path="/home/map-print" render={() => <MapPrint />} />
    <Route exact path="/home/groups" render={() => <Groups />} />
    <Route exact path="/home/groups/:groupId" render={() => <Group />} />
    <Route exact path="/home/talks/:talkId" render={() => <Talk />} />
    <Route
      exact
      path="/home/talks/:talkId/sections/:sectionId"
      render={() => <TalkSection />}
    />
    <Route
      exact
      path="/home/talks/:talkId/sections/:sectionId/subsections/:subsectionId"
      render={() => <TalkSubsection />}
    />
    <Route exact path="/ministry" render={() => <Ministry />} />
    <Route exact path="/ministry/door-to-door" render={() => <DoorToDoor />} />
    <Route exact path="/ministry/letter-writing" render={() => <LetterWriting />} />
    <Route exact path="/ministry/maps" render={() => <Maps />} />
    <Route exact path="/ministry/maps/detail/:mapID/:fileType" render={() => <MapDetail />} />
    <Route exact path="/ministry/schedule" render={() => <Schedule />} />
    <Route exact path="/schedules" render={() => <Schedules />} />
    <Route
      exact
      path="/schedules/midweek-meeting/:week_id"
      render={() => <MidweekMeeting />}
    />
    <Route
      exact
      path="/schedules/weekend-meeting/:week_id"
      render={() => <WeekendMeeting />}
    />
    <Route
      exact
      path="/schedules/weekend-meeting/:week_id/edit"
      render={() => <WeekendMeetingEdit />}
    />
    <Route
      exact
      path="/schedules/weekend-meeting/:week_id/edit/:assignment_id"
      render={() => <WeekendAssignmentEdit />}
    />
    <Route
      exact
      path="/schedules/audio-and-video"
      render={() => <AudioAndVideo />}
    />
    <Route exact path="/schedules/cleaning" render={() => <Cleaning />} />
    <Route exact path="/schedules/events" render={() => <Events />} />
    <Route exact path="/publishers" render={() => <Publishers />} />
    <Route exact path="/publishers/all" render={() => <AllPublishers />} />
    <Route exact path="/publishers/all/:publisherId" render={() => <PublisherDetail />} />
    <Route exact path="/publishers/groups" render={() => <PublisherGroups />} />
    <Route exact path="/publishers/appointed" render={() => <Appointed />} />
    <Route exact path="/publishers/regular-pioneers" render={() => <RegularPioneers />} />
    <Route exact path="/settings" render={() => <Settings />} />
    <Route exact path="/settings/profile" render={() => <Profile />} />
    <Route exact path="/settings/appearance" render={() => <Appearance />} />
    <Route exact path="/settings/features" render={() => <Features />} />
    <Route
      exact
      path="/settings/help-text"
      render={() => <HelpTextSettings />}
    />
    <Route exact path="/settings/app-details" render={() => <AppDetails />} />
    <Route exact path="/" render={() => <Redirect to="/home" />} />
  </IonRouterOutlet>
);
