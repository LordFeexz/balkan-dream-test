import { useParams, useNavigate } from "react-router-dom";
import salaryPng from "../../images/salary-illustration.png";
import anniversaryPng from "../../images/anniversary-illustration.png";
import birthDayPng from "../../images/birthday-illustration.png";
import { ArrowLeft, ArrowRight } from "react-feather";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootReducer } from "../../store";
import type { EmployeeState } from "../../reducer/employee";
import { useState, useEffect, Suspense } from "react";
import type { EmployeeDetail } from "../../interfaces/employee";
import { findEmployeeById } from "../../actions/employee";
import SalaryList from "../../components/atom/content/salaryList";
import EmployeeTabsProfile from "../../components/organ/tabs/employeeTabProfile";

export default function EmployeeDetailPage() {
  const { identifier } = useParams();
  const navigate = useNavigate();

  const { employees } = useSelector<RootReducer, EmployeeState>(
    ({ employeeReducer }) => employeeReducer
  );
  const [employee, setEmployee] = useState<EmployeeDetail | undefined>(() =>
    employees.find((el) => el._id === identifier || el.JMBG === identifier)
  );

  useEffect(() => {
    if (!employee)
      findEmployeeById(identifier as string)
        .then((val: EmployeeDetail) => {
          setEmployee(val);
        })
        .catch((err) => {
          navigate("/employees");
        });
  }, [employee]);

  return (
    <Suspense fallback={<div>...loading</div>}>
      <div className="container">
        <div className="row navigation-row">
          <Link to="/employees" className="btn btn-hollow">
            <ArrowLeft size="18" className="button-left-icon" /> Go back to
            employees
          </Link>

          <Link to="/reports" className="btn btn-hollow-right">
            <ArrowRight size="18" className="button-right-icon" /> Go to reports{" "}
          </Link>
        </div>

        <div className="row employee-statistics__wrapper">
          <div className="col-md-3 employee-image__wrapper">
            <div className="employee-image"></div>
            <h4>
              {employee?.name} {employee?.surname}
            </h4>
            <h6>{employee?.position}</h6>
            <p>
              {employee?.JMBG} | {employee?.gender}
            </p>
          </div>
          <div className="col-md-3 employee-statistics">
            <img
              src={salaryPng}
              alt="Salary illustration"
              className="employee-statistics__image"
            />
            <h4 className="list-group-item-text">{employee?.salary.amount}</h4>
            <h6 className="list-group-item-heading">Current Sallary</h6>
          </div>
          <div className="col-md-3 employee-statistics">
            <img
              src={anniversaryPng}
              alt="Anniversary illustration"
              className="employee-statistics__image"
            />
            <h4 className="list-group-item-text">{employee?.startdate}</h4>
            <h6 className="list-group-item-heading">Anniversary</h6>
          </div>
          <div className="col-md-3 employee-statistics">
            <img
              src={birthDayPng}
              alt="Birthday illustration"
              className="employee-statistics__image"
            />
            <h4 className="list-group-item-text">
              {employee?.birthdate || ""}
            </h4>
            <h6 className="list-group-item-heading">Birthday</h6>
          </div>
        </div>
        <div className="row">
          <div className="col-md-9">
            <div className="row tab-content">
              <EmployeeTabsProfile />
            </div>
          </div>
          <div className="col-md-3">
            <div className="portlet portlet-boxed">
              <div className="portlet-header">
                <h4 className="portlet-title">Salary history</h4>
              </div>
              <div className="portlet-body salary-content">
                <SalaryList salary={employee?.salary} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Suspense>
  );
}
