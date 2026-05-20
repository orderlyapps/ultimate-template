import { Redirect, Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";

// HOME
import { Home } from "@pages/home/Home";
import { SchedulePdfs } from "@pages/home/tools/schedule-pdfs/SchedulePdfs";
import { Announcements } from "@pages/home/announcements/Announcements";
import { Announcement } from "@pages/home/announcement/Announcement";
import { Talks } from "@pages/home/tools/talks/Talks";
import { MapPrint } from "@pages/home/tools/map-print/MapPrint";
import { Groups } from "@pages/home/tools/groups/Groups";
import { Group } from "@pages/home/tools/groups/group/Group";
import { Talk } from "@pages/home/tools/talks/talk/Talk";
import { TalkSection } from "@pages/home/tools/talks/talk/section/TalkSection";
import { TalkSubsection } from "@pages/home/tools/talks/talk/section/subsection/TalkSubsection";
import { GroupReports } from "@pages/home/tools/group-reports/GroupReports";
import { Reminders } from "@pages/home/tools/reminders/Reminders";
import { ClamAssignmentForms } from "@pages/home/tools/clam-assignment-forms/ClamAssignmentForms";
import { CleanTables } from "@pages/home/tools/clean-tables/CleanTables";
import { HomeEvents } from "@pages/home/events/Events";
import { HomeAssignments } from "@pages/home/assignments/Assignments";

// MINISTRY
import { Ministry } from "@pages/ministry/Ministry";
import { DoorToDoor } from "@pages/ministry/door-to-door/DoorToDoor";
import { LetterWriting } from "@pages/ministry/letter-writing/LetterWriting";
import { Maps } from "@pages/ministry/maps/Maps";
import { MapDetail } from "@pages/ministry/maps/map-detail/MapDetail";
import { Schedule } from "@pages/ministry/schedule/Schedule";

// SCHEDULES
import { Schedules } from "@pages/schedules/Schedules";
import { MidweekMeeting } from "@pages/schedules/midweek-meeting/MidweekMeeting";
import { WeekendMeeting } from "@pages/schedules/weekend-meeting/WeekendMeeting";
import { WeekendMeetingEdit } from "@pages/schedules/weekend-meeting/edit/WeekendMeetingEdit";
import { WeekendAssignmentEdit } from "@pages/schedules/weekend-meeting/edit/assignment/WeekendAssignmentEdit";
import { EditSpeaker } from "@pages/schedules/weekend-meeting/edit/edit-speaker/EditSpeaker";
import { OutgoingSpeaker } from "@pages/schedules/weekend-meeting/edit/outgoing-speaker/OutgoingSpeaker";
import { AudioAndVideo } from "@pages/schedules/audio-and-video/AudioAndVideo";
import { Cleaning } from "@pages/schedules/cleaning/Cleaning";
import { Events } from "@pages/schedules/events/Events";

// PUBLISHERS
import { Publishers } from "@pages/publishers/Publishers";
import { PublisherLists } from "@pages/publishers/lists/PublisherLists";
import { PublisherDetail } from "@pages/publishers/lists/publisher-detail/PublisherDetail";
import { PublisherEdit } from "@pages/publishers/lists/publisher-detail/publisher-local-edit/PublisherLocalEdit";
import { PublisherReports } from "@pages/publishers/lists/publisher-detail/publisher-reports/PublisherReports";
import { PublisherGroups } from "@pages/publishers/groups/PublisherGroups";
import { PublishersMap } from "@pages/publishers/map/Map";

// SETTINGS
import { Settings } from "@pages/settings/Settings";
import { Profile } from "@pages/settings/profile/Profile";
import { Admin } from "@pages/settings/profile/admin/Admin";
import { AuthUser } from "@pages/settings/profile/admin/auth-user/AuthUser";
import { Appearance } from "@pages/settings/appearance/Appearance";
import { Features } from "@pages/settings/features/Features";
import { HelpTextSettings } from "@pages/settings/help-text/HelpTextSettings";
import { AppDetails } from "@pages/settings/app-details/AppDetails";
import { Login } from "@services/app/auth/LoginPage";

export const pages = (
  <IonRouterOutlet>
    <Route exact path="/login" render={() => <Login />} />
    <Route exact path="/home" render={() => <Home />} />
    <Route
      exact
      path="/home/tools/schedule-pdfs"
      render={() => <SchedulePdfs />}
    />
    <Route exact path="/home/announcements" render={() => <Announcements />} />
    <Route
      exact
      path="/home/announcements/:announcementId"
      render={() => <Announcement />}
    />
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
    <Route exact path="/home/group-reports" render={() => <GroupReports />} />
    <Route exact path="/home/tools/reminders" render={() => <Reminders />} />
    <Route exact path="/home/tools/clam-assignment-forms/:week_id" render={() => <ClamAssignmentForms />} />
    <Route exact path="/home/tools/clean-tables" render={() => <CleanTables />} />
    <Route exact path="/home/events" render={() => <HomeEvents />} />
    <Route exact path="/home/assignments" render={() => <HomeAssignments />} />

    {/* MINISTRY */}
    <Route exact path="/ministry" render={() => <Ministry />} />
    <Route exact path="/ministry/door-to-door" render={() => <DoorToDoor />} />
    <Route
      exact
      path="/ministry/letter-writing"
      render={() => <LetterWriting />}
    />
    <Route exact path="/ministry/maps" render={() => <Maps />} />
    <Route
      exact
      path="/ministry/maps/detail/:mapID/:fileType"
      render={() => <MapDetail />}
    />
    <Route exact path="/ministry/schedule" render={() => <Schedule />} />

    {/* SCHEDULES */}
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
      path="/schedules/weekend-meeting/:week_id/edit/edit-speaker"
      render={() => <EditSpeaker />}
    />
    <Route
      exact
      path="/schedules/weekend-meeting/:week_id/edit/outgoing-speaker/:speaker_id"
      render={() => <OutgoingSpeaker />}
    />
    <Route
      exact
      path="/schedules/audio-and-video"
      render={() => <AudioAndVideo />}
    />
    <Route exact path="/schedules/cleaning" render={() => <Cleaning />} />
    <Route exact path="/schedules/events" render={() => <Events />} />

    {/* PUBLISHERS */}
    <Route exact path="/publishers" render={() => <Publishers />} />
    <Route exact path="/publishers/all" render={() => <PublisherLists />} />
    <Route
      exact
      path="/publishers/all/:publisherId"
      render={() => <PublisherDetail />}
    />
    <Route
      exact
      path="/publishers/all/:publisherId/edit"
      render={() => <PublisherEdit />}
    />
    <Route
      exact
      path="/publishers/all/:publisherId/reports"
      render={() => <PublisherReports />}
    />
    <Route exact path="/publishers/groups" render={() => <PublisherGroups />} />
    <Route exact path="/publishers/map" render={() => <PublishersMap />} />

    {/* SETTINGS */}
    <Route exact path="/settings" render={() => <Settings />} />
    <Route exact path="/settings/profile" render={() => <Profile />} />
    <Route exact path="/settings/profile/admin" render={() => <Admin />} />
    <Route
      exact
      path="/settings/profile/admin/auth-user/:publisherId"
      render={() => <AuthUser />}
    />
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
