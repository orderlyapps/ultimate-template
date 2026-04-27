import { LabelText } from "@display/label-text/LabelText";
import { IonItem, IonLabel, IonSelect, IonSelectOption } from "@ionic/react";
import type { ComponentProps } from "react";

type MonthOption = {
  readonly value: string;
  readonly label: string;
};

type MonthPickerProps = Omit<
  ComponentProps<typeof IonSelect>,
  "value" | "onIonChange"
> & {
  readonly value?: string;
  readonly onValueChange?: (value: {
    readonly firstMonday: string;
    readonly lastMonday: string;
  }) => void;
  readonly label?: string;
  readonly monthsInFuture?: number;
  readonly monthsInPast?: number;
};

function getMonthOptions(monthsInPast: number, monthsInFuture: number): MonthOption[] {
  const now = new Date();
  const options: MonthOption[] = [];

  for (let i = -monthsInPast; i <= monthsInFuture; i++) {
    const date = new Date(now.getFullYear(), now.getMonth() + i, 1);
    const monthName = date.toLocaleDateString(undefined, {
      month: "long",
    });
    const value = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    options.push({
      value,
      label: i === 0 ? `${monthName} (Current)` : monthName,
    });
  }

  return options;
}

function getFirstMondayOfMonth(year: number, month: number): Date {
  const firstDayOfMonth = new Date(year, month - 1, 1);
  const dayOfWeek = firstDayOfMonth.getDay();
  // Days from the 1st to the first Monday: 0 if the 1st is Monday, otherwise the offset to the next Monday.
  const offsetToMonday = (8 - dayOfWeek) % 7;
  return new Date(year, month - 1, 1 + offsetToMonday);
}

function getLastMondayOfMonth(year: number, month: number): Date {
  const lastDayOfMonth = new Date(year, month, 0);
  const dayOfWeek = lastDayOfMonth.getDay();
  const daysToSubtract = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
  return new Date(year, month - 1, lastDayOfMonth.getDate() - daysToSubtract);
}

function formatDateToYyyyMmDd(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export const MonthPicker: React.FC<MonthPickerProps> = ({
  value,
  onValueChange,
  label,
  monthsInFuture = 2,
  monthsInPast = 0,
  ...props
}) => {
  const monthOptions = getMonthOptions(monthsInPast, monthsInFuture);
  const now = new Date();
  const currentMonthValue = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
  const displayValue = value ?? currentMonthValue;

  const handleChange = (e: CustomEvent) => {
    const selectedValue = e.detail.value as string;
    const [year, month] = selectedValue.split("-").map(Number);

    const firstMonday = getFirstMondayOfMonth(year, month);
    const lastMonday = getLastMondayOfMonth(year, month);

    onValueChange?.({
      firstMonday: formatDateToYyyyMmDd(firstMonday),
      lastMonday: formatDateToYyyyMmDd(lastMonday),
    });
  };

  return (
    <IonItem>
      {label && (
        <IonLabel>
          <LabelText>{label}</LabelText>
        </IonLabel>
      )}
      {!label && (
        <IonLabel>
          <LabelText>Month</LabelText>
        </IonLabel>
      )}
      <IonSelect
        value={displayValue}
        onIonChange={handleChange}
        interface="popover"
        {...props}
        slot="end"
      >
        {monthOptions.map((option) => (
          <IonSelectOption key={option.value} value={option.value}>
            {option.label}
          </IonSelectOption>
        ))}
      </IonSelect>
    </IonItem>
  );
};
