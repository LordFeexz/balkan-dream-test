import { getEmployeeName } from "../../../actions/employee";
import { EmployeeName } from "../../../interfaces/employee";
import SelectForm from "../../atom/form/selectForm";
import { type ChangeEvent, useState, useEffect } from "react";

export interface EmployeeSelectProps {
  onChangeHandler: (e: ChangeEvent<HTMLSelectElement>) => void;
  name: string;
  value: string;
}

export default function EmployeeSelect({
  onChangeHandler,
  name,
  value,
}: EmployeeSelectProps) {
  const [data, setData] = useState<EmployeeName[]>([]);
  useEffect(() => {
    if (!data.length)
      (async () => {
        setData(await getEmployeeName());
      })();
  }, [data.length]);

  return (
    <SelectForm
      name={name}
      value={value}
      label="Employee"
      datas={data.map(({surname,_id}) => ({value:_id,label:surname}))}
      onChangeHandler={onChangeHandler}
    />
  );
}
