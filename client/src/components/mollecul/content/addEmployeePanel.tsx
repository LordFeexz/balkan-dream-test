import type { Employee } from "../../../interfaces/employee";

export interface AddEmployeePanelProps {
  employees: Employee[];
}

export default function AddEmployeePanel({ employees }: AddEmployeePanelProps) {
  return (
    <div className="col-md-4">
      <div className="portlet portlet-boxed">
        <div className="portlet-header">
          <h4 className="portlet-title">Add new employee</h4>
        </div>
        <div className="portlet-body">
          <div id="settings-content" className="stacked-content">
            <div className="tab-pane fade in active" id="profile-tab">
              {/* <AddEmployeeForm addEmployee={this.addEmployee}/> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
