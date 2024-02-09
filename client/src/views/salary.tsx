import { ArrowRightCircle } from "react-feather";
import { ToastContainer } from "react-toastify";
import genSalaryPng from "../images/generate-salary-illustration.png";
import SalaryForm from "../components/organ/form/salaryForm";
import SalaryTabs from "../components/organ/tabs/salaryTab";
import SalaryTable from "../components/organ/table/salaryTable";
import SalaryPreview from "../components/mollecul/content/salaryPreview";

export default function SalaryPage() {
  return (
    <>
      <div className="container">
        {true ? (
          <div className="portlet portlet-boxed">
            <div className="portlet-header">
              <h4 className="portlet-title">Generate salary</h4>
            </div>
            <div className="portlet-body">
              <div className="row">
                <div className="col-md-9">
                  <SalaryForm />
                </div>
                <div className="col-md-3 generate-salary-illustration_wrapper">
                  <img
                    src={genSalaryPng}
                    alt="Generate Salaty Illustration"
                    className="generate-salary-illustration"
                  />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="portlet portlet-boxed">
            <div className="portlet-header tab-content-portlet-header portlet-salaries">
              <h4 className="portlet-title">
                {/* {this.state.months[this.state.month].label}, {this.state.year} */}
              </h4>
              {/* {!this.state.shouldDisplayTotalPreview && ( */}
              <button
                type="button"
                className="btn btn-primary btn-salaries"
                //   onClick={this.goToNextStep}
              >
                {/* {this.state.currentButtonState}  */}
                <ArrowRightCircle size="18" />
              </button>
              {/* )} */}
            </div>
          </div>
        )}

        {/* )} */}
      </div>
      <div>
        {/* {this.state.shouldDisplayEmployeesDataTable && (
          <SalariesTable
            employeesSalaries={this.props.employeesSalaries}
            getEmployeesSalaries={this.props.getEmployeesSalaries}
          />
        )} */}
        <SalaryTable />
        <SalaryTabs />
        {/* {this.state.shouldDisplayTotalPreview && (
          <SalariesTotalPreview
            employeesSalaries={this.props.employeesSalaries}
          />
        )} */}
        <SalaryPreview />
      </div>
      <ToastContainer autoClose={3000} closeOnClick />
    </>
  );
}
