import type { Outline } from "@feature/talks/state/useTalksStore";
import { useEffect } from "react";
import { useTalkPresentationModalStore } from "../../../../hooks/useTalkPresentationModalStore";
import { TalkPresentationEmptyState } from "./components/talk-presentation-empty-state/TalkPresentationEmptyState";
import { TalkPresentationSubsectionContent } from "./components/talk-presentation-subsection-content/TalkPresentationSubsectionContent";

type PresentationItem = {
  sectionName: string;
  subsectionName: string;
  content: string;
};

function getPresentationItems(talk: Outline): PresentationItem[] {
  const items: PresentationItem[] = [];

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

type Props = {
  talk: Outline;
};

export function TalkPresentationTalkViewer({ talk }: Props) {
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
    return <TalkPresentationEmptyState />;
  }

  const clampedIndex = Math.min(maxIndex, Math.max(0, currentIndex));
  const current = items[clampedIndex];

  return (
    <>
      <TalkPresentationSubsectionContent
        sectionName={current.sectionName}
        subsectionName={current.subsectionName}
        content={current.content}
      />
    </>
  );
}
