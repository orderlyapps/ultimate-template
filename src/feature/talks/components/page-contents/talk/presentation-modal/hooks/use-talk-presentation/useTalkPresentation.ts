import { useEffect } from "react";
import { useTalkPresentationStore } from "../use-talk-presentation-store/useTalkPresentationStore";

export const useTalkPresentation = () => {
  const updateTimes = useTalkPresentationStore((s) => s.updateTimes);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateTimes();
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [updateTimes]);

  return;
};
