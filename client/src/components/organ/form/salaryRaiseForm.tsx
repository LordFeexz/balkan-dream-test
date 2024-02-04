import DatePicker from "../../atom/form/datePicker";
import DescriptionForm from "../../mollecul/form/descriptionForm";
import NumberForm from "../../mollecul/form/numberForm";

export default function SalaryRaise() {
  return (
    <form>
      <label className="form-title"> Salary Raise</label>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <DatePicker name="" value="" onChangeHandler={() => {}} />
      </div>
      <NumberForm onChangeHandler={() => {}} name="" value=" " label="Amount" />
      <DescriptionForm label="" name="" value=" " onChangeHandler={() => {}} />
      <button
        type="submit"
        className="btn btn-primary submit-button"
        // onClick={this.reset}
      >
        Submit
      </button>
    </form>
  );
}
