import { context } from "../../../context/tabContent";
import { getActiveEmployeeTabContent } from "../../../helpers/global";
import { useContext } from "react";

export default function DisplayTab() {
  const ctx = useContext(context);
  const items = getActiveEmployeeTabContent(ctx.activeTab.name, ctx);
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
          {items.map((item, idx) => (
            <tr key={idx}>
              <td className="col-md-3">{item.date as string}</td>
              <td className="col-md-3">
                {item.amount} {item.unit}
              </td>
              <td className="col-md-5">{item.description}</td>
              <td className="col-md-1">
                <button className="btn" onClick={() => {}}>
                  <span className="fa fa-times icon-pointer"></span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
