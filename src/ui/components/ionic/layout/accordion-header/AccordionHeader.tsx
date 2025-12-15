import { Item } from "@ionic-layout/item/Item";
import { Icon } from "@ionic-display/icon/Icon";
import type { ComponentProps } from "react";
import icon from "@icons/chevronDownJW.svg";

type ItemProps = ComponentProps<typeof Item>;

export const ItemAccordionHeader: React.FC<ItemProps> = ({
  children,
  ...props
}) => {
  return (
    <Item slot="header" button detail={false} {...props}>
      {children}

      <Icon
        className="ion-accordion-toggle-icon "
        slot="end"
        icon={icon}
        size="small"
      />
    </Item>
  );
};
