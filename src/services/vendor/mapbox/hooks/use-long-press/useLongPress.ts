import { useRef } from "react";
import type { MapTouchEvent } from "react-map-gl/mapbox";

interface UseLongPressOptions {
  onLongPress?: (event: MapTouchEvent) => void;
  threshold?: number;
}

export const useLongPress = ({
  onLongPress,
  threshold = 500,
}: UseLongPressOptions = {}) => {
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseDown = (e: MapTouchEvent) => {
    // Clear any existing timer
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }

    // Start the long press timer
    longPressTimer.current = setTimeout(() => {
      if (onLongPress) {
        onLongPress(e);
      }
    }, threshold);
  };

  const handleMouseUp = () => {
    // Clear the timer if mouse is released before threshold
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  const handleMouseMove = () => {
    // Cancel long press if mouse moves
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  };

  return {
    handleMouseDown,
    handleMouseUp,
    handleMouseMove,
  };
};
