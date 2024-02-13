import { type MouseEventHandler, useState, useContext } from "react";
import { generateSalary } from "../../../actions/salary";
import { swalError } from "../../../helpers/swal";
import { context } from "../../../context/salaryContext";
import LoadingOverlayWrapper from "react-loading-overlay-ts";

export default function GenerateSalaryBtn() {
  const [loading, setLoading] = useState<boolean>(false);
  const { setDisplayData } = useContext(context);
  const generateSalaryHandler: MouseEventHandler = (e) => {
    e.preventDefault();
    setLoading(true);

    generateSalary()
      .then(({ signature, data }) => {
        console.log(JSON.stringify(data))
        setDisplayData((prev) => ({
          ...prev,
          signature,
          datas: data,
          step:'Preview'
        }));
      })
      .catch((err: Error) => {
        swalError(err?.message || "Internal Server Error");
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <div className="row">
      <div className="col-md-2 generate-salary__wrapper">
        <LoadingOverlayWrapper spinner active={loading}>
          <button
            type="button"
            className="btn btn-primary submit-button"
            onClick={generateSalaryHandler}
            disabled={loading}>
            Generate salary
          </button>
        </LoadingOverlayWrapper>
      </div>
    </div>
  );
}