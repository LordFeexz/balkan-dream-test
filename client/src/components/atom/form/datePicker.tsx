import { DateTimePicker } from "react-widgets";

export interface DatePickerProps {
  value: string;
  onChangeHandler: (
    date: Date | null | undefined,
    dateStr: string | undefined
  ) => void;
  name: string;
}

export default function DatePicker({
  value,
  onChangeHandler,
  name,
}: DatePickerProps) {
  return (
    <DateTimePicker
      value={!!value ? new Date(value) : undefined}
      onChange={onChangeHandler}
      name={name}
    />
  );
}
