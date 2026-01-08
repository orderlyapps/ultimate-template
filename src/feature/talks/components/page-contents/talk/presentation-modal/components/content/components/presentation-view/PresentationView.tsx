import { useTalksStore } from "@feature/talks/state/useTalksStore";
import { PresentationViewContent } from "./components/presentation-view-content/PresentationViewContent";
import { useParams } from "react-router-dom";
import { IonItemDivider } from "@ionic/react";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { List } from "@ionic-layout/list/List";
import { SubsectionTiming } from "@feature/talks/components/page-contents/talk/presentation-modal/components/content/components/presentation-view/components/subsection-timing/SubsectionTiming";
import { Item } from "@ionic-layout/item/Item";
import { SectionName } from "@feature/talks/components/page-contents/talk/presentation-modal/components/content/components/presentation-view/components/section-name/SectionName";
import { SubsectionName } from "@feature/talks/components/page-contents/talk/presentation-modal/components/content/components/presentation-view/components/subsection-name/SubsectionName";
import { ProgressBar } from "@feature/talks/components/page-contents/talk/presentation-modal/components/content/components/presentation-view/components/progress-bar/ProgressBar";
import { useTalkPresentationStore } from "../../../../hooks/use-talk-presentation-store/useTalkPresentationStore";
import { getFlattenedTalkSubsections } from "./helper/getFlattenedTalkSubsections";

export type PresentationItem = {
  section: string;
  name: string;
  content: string | Record<string, unknown>;
};

export function PresentationView() {
  const { talkId } = useParams<{ talkId: string }>();
  const talk = useTalksStore((s) => s.talks.find((t) => t.id === talkId));
  const currentSubsectionIndex = useTalkPresentationStore(
    (s) => s.currentSubsectionIndex
  );

  const subsection = getFlattenedTalkSubsections(talk)[currentSubsectionIndex];

  return (
    <>
      <IonItemDivider sticky>
        <Grid>
          <Row>
            <Col>
              <List lines="none">
                <SubsectionTiming />

                <Item>
                  <ProgressBar />
                </Item>

                <SectionName sectionName={subsection.section} />

                <SubsectionName subsectionName={subsection.name} />
              </List>
            </Col>
          </Row>
        </Grid>
      </IonItemDivider>

      <PresentationViewContent
        sectionName={subsection.section}
        subsectionName={subsection.name}
        content={subsection.content}
      />
    </>
  );
}
