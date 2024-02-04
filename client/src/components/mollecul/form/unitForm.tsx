import type { ChangeEvent } from "react";

export interface UnitFormProps {
  onChangeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  value: string;
}

export default function UnitForm({
  onChangeHandler,
  name,
  value,
}: UnitFormProps) {
  return (
    <div className="form-group">
      <label htmlFor={name}>Unit</label>
      <select
        name={name}
        className="form-control"
        required
        value={value}
        defaultValue=""
        onChange={onChangeHandler}
      >
        <option></option>
        <option value="BAM">BAM</option>
        <option value="$">$</option>
      </select>
    </div>
  );
}
