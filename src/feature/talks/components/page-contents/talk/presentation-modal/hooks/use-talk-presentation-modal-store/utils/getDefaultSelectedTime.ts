import { toLocalDatetimeValue } from "../../../utils/toLocalDatetimeValue";

export const getDefaultSelectedTime = () => {
  return toLocalDatetimeValue(new Date());
};
