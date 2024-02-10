import { ArrowRightCircle } from "react-feather";
import { ToastContainer } from "react-toastify";
import genSalaryPng from "../images/generate-salary-illustration.png";
import GenerateSalaryBtn from "../components/mollecul/button/generateSalaryBtn";
import SalaryTabs from "../components/organ/tabs/salaryTab";
import SalaryTable from "../components/organ/table/salaryTable";
import SalaryPreview from "../components/mollecul/content/salaryPreview";
import type { SalaryStep } from "../interfaces/context";
import { type MouseEventHandler, useContext } from "react";
import { context } from "../context/salaryContext";
import { months } from "../constant/month";

function ChangePage(step: SalaryStep,nextStep:MouseEventHandler) {
  const now = new Date();
  switch (step) {
    case "Generate":
      return (
        <div className="portlet portlet-boxed">
          <div className="portlet-header">
            <h4 className="portlet-title">Generate salary</h4>
          </div>
          <div className="portlet-body">
            <div className="row">
              <div className="col-md-9">
                <GenerateSalaryBtn />
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
      );
    case "Preview":
      return (
        <div className="portlet portlet-boxed">
          <div className="portlet-header tab-content-portlet-header portlet-salaries">
            <h4 className="portlet-title">
              {months[now.getMonth()].label} - {now.getFullYear()}
            </h4>
            <button
              type="button"
              className="btn btn-primary btn-salaries"
                onClick={nextStep}
            >
              <ArrowRightCircle size="18" />
            </button>
          </div>
          <SalaryTable />
        </div>
      );
    case "Release":
      return (
        <>
          <SalaryTabs />
          <SalaryPreview />
        </>
      );
  }
}

export default function SalaryPage() {
  const { step, setDisplayData } = useContext(context);

  const nextStep: MouseEventHandler = (e) => {
    e.preventDefault();

    setDisplayData((prev) => ({
      ...prev,
      step: "Release",
    }));
  };
  return (
    <>
      <div className="container">{ChangePage(step,nextStep)}</div>
      <ToastContainer autoClose={3000} closeOnClick />
    </>
  );
}
