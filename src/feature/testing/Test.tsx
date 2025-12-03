import { Item } from "@ionic-layout/item/Item";

interface TestProps {
  hello: string;
}

export const Test: React.FC<TestProps> = ({ hello }) => {
  return (
    <Item>
      <div>{hello}</div>
    </Item>
  );
};
