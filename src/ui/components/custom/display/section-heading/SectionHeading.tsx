import { Text } from "@ionic-display/text/Text";

interface SectionHeadingProps {
  children: string | string[];
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({ children }) => {
  return (
    <Text color="primary" size="xl" className="ion-margin">
      {children}
    </Text>
  );
};
