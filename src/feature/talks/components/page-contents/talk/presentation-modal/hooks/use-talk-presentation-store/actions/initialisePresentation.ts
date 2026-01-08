import { getLocalDatetimeValue } from "@date/getLocalDatetimeValue";
import { type Outline } from "@feature/talks/types/Outline";

export const initialisePresentation = (talk: Outline) => {
  const presentationTime = talk.sections.reduce((talkTotal, section) => {
    const sectionTotal = section.subsections.reduce(
      (subTotal, subsection) => subTotal + (subsection.timeAllocation ?? 0),
      0
    );
    return talkTotal + sectionTotal;
  }, 0);

  const calculatedPresentationEndTime = new Date();
  calculatedPresentationEndTime.setSeconds(
    calculatedPresentationEndTime.getSeconds() + presentationTime
  );

  const presentationEndTime = getLocalDatetimeValue(
    calculatedPresentationEndTime
  );

  const subsectionTimes: number[] = [];

  for (const section of talk.sections) {
    for (const subsection of section.subsections) {
      subsectionTimes.push(Math.max(0, subsection.timeAllocation ?? 0));
    }
  }

  return {
    presentationTime,
    presentationEndTime,
    subsectionTimes,
  };
};
