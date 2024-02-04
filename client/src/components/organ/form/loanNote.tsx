import DatePicker from "../../atom/form/datePicker";
import DescriptionForm from "../../mollecul/form/descriptionForm";
import NumberForm from "../../mollecul/form/numberForm";

export default function LoanNoteForm() {
  return (
    <form>
      <label className="form-title">Loan Note</label>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <DatePicker value="" name="" onChangeHandler={() => {}} />
      </div>
      <NumberForm name="" value="" onChangeHandler={() => {}} label="Amount" />
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
