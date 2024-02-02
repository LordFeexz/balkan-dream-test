import AddEmployeePanel from "../components/mollecul/content/addEmployeePanel";
import EmployeeTable from "../components/organ/table/employeeTable";
import { useSelector, useDispatch } from "react-redux";
import type { RootReducer } from "../store";
import type { EmployeeState } from "../reducer/employee";
import { useEffect, useState } from "react";
import { getListEmployee } from "../actions/employee";

export default function Employee() {
  const dispatch = useDispatch();
  const { employees, totalPage } = useSelector<RootReducer, EmployeeState>(
    ({ employeeReducer }) => employeeReducer
  );
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    if (!employees.length && page === 1)
      dispatch<any>(getListEmployee({ page }));
  }, [page]);

  return (
    <div className="container">
      <div className="row">
        <AddEmployeePanel />
        <div className="col-md-8">
          <div className="portlet portlet-boxed">
            <div className="portlet-header">
              <h4 className="portlet-title">Employees</h4>
            </div>
            <EmployeeTable employees={employees} />
          </div>
        </div>
      </div>
    </div>
  );
}
