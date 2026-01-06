import {
  useTalksStore,
} from "@feature/talks/state/useTalksStore";
import { type Outline } from "@feature/talks/types/Outline";
import { useEffect } from "react";
import { EmptyStateView } from "./components/empty-state-view/EmptyStateView";
import { PresentationViewContent } from "./components/presentation-view-content/PresentationViewContent";
import { useParams } from "react-router-dom";
import { useTalkPresentationModalStore } from "@feature/talks/components/page-contents/talk/presentation-modal/hooks/use-talk-presentation-modal-store/useTalkPresentationModalStore";
import { IonItemDivider } from "@ionic/react";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { List } from "@ionic-layout/list/List";
import { TimingAdjustment } from "@feature/talks/components/page-contents/talk/presentation-modal/components/content/components/presentation-view/components/timing-adjustment/TimingAdjustment";
import { Item } from "@ionic-layout/item/Item";
import { ProgressBar } from "@feature/talks/components/page-contents/talk/presentation-modal/components/header/components/progress-bar/ProgressBar";
import { SectionName } from "@feature/talks/components/page-contents/talk/presentation-modal/components/content/components/presentation-view/components/section-name/SectionName";
import { SubsectionName } from "@feature/talks/components/page-contents/talk/presentation-modal/components/content/components/presentation-view/components/subsection-name/SubsectionName";

type PresentationItem = {
  sectionName: string;
  subsectionName: string;
  content: string | Record<string, unknown>;
};

function getPresentationItems(talk?: Outline): PresentationItem[] {
  const items: PresentationItem[] = [];

  if (!talk) return items;

  for (const section of talk.sections) {
    for (const subsection of section.subsections) {
      items.push({
        sectionName: section.name,
        subsectionName: subsection.name,
        content: subsection.content,
      });
    }
  }

  return items;
}

export function PresentationViewer() {
  const { talkId } = useParams<{ talkId: string }>();
  const talk = useTalksStore((s) => s.talks.find((t) => t.id === talkId));

  const items = getPresentationItems(talk);
  const maxIndex = Math.max(0, items.length - 1);

  const currentIndex = useTalkPresentationModalStore((s) => s.currentIndex);
  const setCurrentIndex = useTalkPresentationModalStore(
    (s) => s.setCurrentIndex
  );

  useEffect(() => {
    if (items.length === 0) {
      setCurrentIndex(0);
      return;
    }

    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [currentIndex, items.length, maxIndex, setCurrentIndex]);

  if (items.length === 0) {
    return <EmptyStateView />;
  }

  const clampedIndex = Math.min(maxIndex, Math.max(0, currentIndex));
  const current = items[clampedIndex];

  return (
    <>
      <IonItemDivider sticky></IonItemDivider>
      <Grid>
        <Row>
          <Col>
            <List lines="none">
              <TimingAdjustment />

              <Item>
                <ProgressBar />
              </Item>

              <SectionName sectionName={current.sectionName} />

              <SubsectionName subsectionName={current.subsectionName} />
            </List>
          </Col>
        </Row>
      </Grid>

      <PresentationViewContent
        sectionName={current.sectionName}
        subsectionName={current.subsectionName}
        content={current.content}
      />
    </>
  );
}
