import {
  useTalksStore,
  type Outline,
} from "@feature/talks/state/useTalksStore";
import { useEffect } from "react";
import { EmptyStateView } from "./components/empty-state-view/EmptyStateView";
import { PresentationViewContent } from "./components/presentation-view-content/PresentationViewContent";
import { useParams } from "react-router-dom";
import { useTalkPresentationModalStore } from "@feature/talks/components/page-contents/talk/presentation-modal/hooks/use-talk-presentation-modal-store/useTalkPresentationModalStore";

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
      <PresentationViewContent
        sectionName={current.sectionName}
        subsectionName={current.subsectionName}
        content={current.content}
      />
    </>
  );
}
