import { IonIcon, IonLabel } from "@ionic/react";
import { Item } from "@ionic-layout/item/Item";
import crossIcon from "@icons/cross.svg";
import add from "@icons/add.svg";
import minus from "@icons/minus.svg";
import { usePublisherSortFilterStore } from "../../../../../../../../store/usePublisherSortFilterStore";
import {
  DEFAULT_CONFIG,
  STAT_LABELS,
  type FilterConfig,
} from "../../../../../../../../store/publisher-sort-filter.types";
import { Grid } from "@ionic-layout/grid/Grid";
import { Row } from "@ionic-layout/row/Row";
import { Col } from "@ionic-layout/col/Col";
import { Text } from "@ionic-display/text/Text";
import { Space } from "@layout/space/Space";

type Props = {
  filter: FilterConfig;
  index: number;
};

export const FilterItem: React.FC<Props> = ({ filter, index }) => {
  const configByAssignment = usePublisherSortFilterStore(
    (s) => s.configByAssignment,
  );
  const currentAssignmentId = usePublisherSortFilterStore(
    (s) => s.currentAssignmentId,
  );
  const setActiveConfig = usePublisherSortFilterStore((s) => s.setActiveConfig);
  const activeConfig = currentAssignmentId
    ? (configByAssignment[currentAssignmentId]?.config ?? DEFAULT_CONFIG)
    : DEFAULT_CONFIG;

  const handleMinWeeksChange = (value: number) => {
    const newFilters = [...activeConfig.filters];
    newFilters[index] = { ...filter, minWeeks: value };
    setActiveConfig({ ...activeConfig, filters: newFilters });
  };

  const handleDelete = () => {
    const newFilters = activeConfig.filters.filter((_, i) => i !== index);
    setActiveConfig({ ...activeConfig, filters: newFilters });
  };

  return (
    <Item>
      <IonIcon onClick={handleDelete} src={crossIcon} slot="start" />
      <IonLabel>{STAT_LABELS[filter.stat]}</IonLabel>
      <div slot="end">
        <Grid>
          <Row>
            <Col>
              <Space height="0.2" />
              <IonIcon
                onClick={() => handleMinWeeksChange(filter.minWeeks - 1)}
                src={minus}
                size="large"
                color="primary"
              />
            </Col>
            <Col className="ion-align-content-center">
              <Text size="lg">{filter.minWeeks}</Text>
            </Col>
            <Col>
              <Space height="0.2" />
              <IonIcon
                onClick={() => handleMinWeeksChange(filter.minWeeks + 1)}
                src={add}
                size="large"
                color="primary"
              />
            </Col>
          </Row>
        </Grid>
      </div>
    </Item>
  );
};
