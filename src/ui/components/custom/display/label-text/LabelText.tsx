import { Text } from "@ionic-display/text/Text";

interface SectionHeadingProps {
  children: string | string[];
}

export const LabelText: React.FC<SectionHeadingProps> = ({ children }) => {
  return <Text bold>{children}</Text>;
};
