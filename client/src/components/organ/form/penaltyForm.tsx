import DatePicker from "../../atom/form/datePicker";
import DescriptionForm from "../../mollecul/form/descriptionForm";
import NumberForm from "../../mollecul/form/numberForm";
import UnitForm from "../../mollecul/form/unitForm";

export default function PenaltyForm() {
  return (
    <form>
      <label className="form-title">Penalty</label>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <DatePicker name="" value="" onChangeHandler={() => {}} />
      </div>
      <NumberForm value="" name="" onChangeHandler={() => {}} label="Amount" />
      <UnitForm name="" value="" onChangeHandler={() => {}} />
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
