import SelectMonth from "../../mollecul/form/selectMonth";

export default function SalaryForm() {
  return (
    <form>
      <div className="row">
        <div className="form-group col-md-4">
          <SelectMonth name="month" value="0" onChangeHandler={() => {}} />
        </div>
        <div className="form-group col-md-4">
          <label htmlFor="exampleInputPassword1">Year</label>
          <input
            type="text"
            className="form-control"
            id="year"
            placeholder="Enter year"
            name="year"
            // onChange={this.handleYearChange}
            // value={this.state.year}
          />
        </div>
        <div className="col-md-2 generate-salary__wrapper">
          <button
            type="button"
            className="btn btn-primary submit-button"
            // disabled={
            //   this.state.disableGenerateSalaryButton ||
            //   !Number.isInteger(this.state.month) ||
            //   !this.state.year
            // }
            // onClick={this.generateSalaries}
          >
            Generate salary
          </button>
        </div>
      </div>
    </form>
  );
}
