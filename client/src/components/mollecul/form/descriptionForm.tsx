import type { ChangeEvent } from "react";

export interface DescriptionFormProps {
  value: string;
  name: string;
  onChangeHandler: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  label: string;
}

export default function DescriptionForm({
  value,
  label,
  name,
  onChangeHandler,
  required = false,
}: DescriptionFormProps) {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type="text"
        className="form-control"
        required={required}
        value={value}
        onChange={onChangeHandler}
      />
    </div>
  );
}
