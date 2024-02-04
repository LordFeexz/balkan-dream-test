import DatePicker from "../../atom/form/datePicker";
import CheckboxForm from "../../mollecul/form/checkboxForm";
import DescriptionForm from "../../mollecul/form/descriptionForm";
import NumberForm from "../../mollecul/form/numberForm";
import { useState } from "react";

export interface BonusFormState {
  date: string;
  amount: number;
  description: string;
  isRepeating: boolean;
}

export default function BonusForm() {
  const [data, setData] = useState<BonusFormState>();
  return (
    <form>
      <label className="form-title">Bonus</label>
      <div className="form-group">
        <label htmlFor="date">Date</label>
        <DatePicker value="" onChangeHandler={() => {}} name="" />
      </div>
      <NumberForm label="Amount" name="" value="" onChangeHandler={() => {}} />
      <DescriptionForm label="" value="" name="" onChangeHandler={() => {}} />
      <CheckboxForm
        name=""
        value=""
        onChangeHandler={() => {}}
        label="Is repeating"
      />
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
