import React from "react";

interface SpacerProps {
  height?: string;
}

export const Space: React.FC<SpacerProps> = ({ height = "5" }) => {
  return <div id="space" style={{ height: height + "rem" }}></div>;
};
