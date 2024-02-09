import { useContext } from "react";
import { context } from "../../../context/salaryContext";
import Tabs from "../../atom/tabs/salaryTabs";

export default function SalaryTabs() {
  const { activeTab } = useContext(context);
  return (
    <div className="portlet portlet-boxed">
      <div className="portlet-body portlet-body-salaries">
        <ul id="myTab1" className="nav nav-tabs">
          <Tabs />
        </ul>
        <div id="myTab1Content">
          <div className="tab-pane active in">
            <button className="btn btn-primary ml-20">
              <span>{`Confirm${activeTab.confirmed ? "ed" : ""}`}</span>
            </button>
            <table className="table table-striped mt-20">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>{/* {displayTabContent} */}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
