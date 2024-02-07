import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootReducer } from "../../../store";
import type { LoanState } from "../../../reducer/loan";
import { getEmployeeLoanSummary } from "../../../actions/loan";
import SummaryLoanData from "../../mollecul/content/summaryLoan";

export default function SummaryLoanTable() {
  const dispatch = useDispatch();

  const { summaryLoanTotalData, summaryLoans } = useSelector<
    RootReducer,
    LoanState
  >(({ loanReducer }) => loanReducer);

  useEffect(() => {
    if (!summaryLoanTotalData)
      dispatch<any>(getEmployeeLoanSummary({ page: 1 }));
  }, [summaryLoanTotalData]);

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Name</th>
          <th>Loans Amount [totaled]</th>
          <th>Loans [totaled]</th>
          <th>Installments [current]</th>
          <th>Remaining Debt</th>
        </tr>
      </thead>
      <tbody>
        {summaryLoans.map((el) => (
          <SummaryLoanData data={el} key={el._id} />
        ))}
      </tbody>
    </table>
  );
}
