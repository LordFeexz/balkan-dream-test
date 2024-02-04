import DatePicker from "../../atom/form/datePicker";
import DescriptionForm from "../../mollecul/form/descriptionForm";
import NumberForm from "../../mollecul/form/numberForm";

export default function LoanPaymentForm() {
  return (
    <form>
      <label className="form-title">Loan Payment</label>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <DatePicker name="" value="" onChangeHandler={() => {}} />
      </div>
      <NumberForm label="Amount" name="" value="" onChangeHandler={() => {}} />
      <DescriptionForm label="" name="" value="" onChangeHandler={() => {}} />
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
