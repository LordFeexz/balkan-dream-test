import type { DisplayContent } from "../../../interfaces";
import type { MouseEvent } from "react";

export interface DisplayTabProps {
  item: DisplayContent;
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export default function DisplayTab({ item, onClick }: DisplayTabProps) {
  return (
    <div className="portlet-body">
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Description</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr key={item.date}>
            <td className="col-md-3">{item.date}</td>
            <td className="col-md-3">
              {item.amount} {item.unit}
            </td>
            <td className="col-md-5">{item.description}</td>
            <td className="col-md-1">
              <a onClick={onClick}>
                <span className="fa fa-times icon-pointer"></span>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
