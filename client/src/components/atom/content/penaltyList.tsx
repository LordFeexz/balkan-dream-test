import { XCircle } from "react-feather";
import type { CreatePenaltyProps } from "../../../interfaces/penalty";
import { type MouseEventHandler, useContext } from "react";
import { context } from "../../../context/penaltyContext";
import { useSelector } from "react-redux";
import type { RootReducer } from "../../../store";
import type { EmployeeState } from "../../../reducer/employee";

export interface PenaltyListProps {
  data: CreatePenaltyProps & { employeeId: string };
}

export default function PenaltyList({ data }: PenaltyListProps) {
  const { setPenaltyForms } = useContext(context);
  const deletePenaltyForm =
    (id: string): MouseEventHandler =>
    (e) => {
      e.preventDefault();

      setPenaltyForms((prev) => prev.filter((el) => el.employeeId !== id));
    };

  const { employeeNames } = useSelector<RootReducer, EmployeeState>(
    ({ employeeReducer }) => employeeReducer
  );

  return (
    <tr>
      <td className="col-md-4">
        {employeeNames.find((el) => el._id === data.employeeId)?.surname || "-"}
      </td>
      <td className="col-md-3">{'data.date'}</td>
      <td className="col-md-2">
        {data.amount} {data.unit}
      </td>
      <td className="col-md-3">{data.description || "N/A"}</td>
      <td>
        <button
          type="button"
          className="btn"
          onClick={deletePenaltyForm(data.employeeId)}>
          <XCircle size="18" />
        </button>
      </td>
    </tr>
  );
}
