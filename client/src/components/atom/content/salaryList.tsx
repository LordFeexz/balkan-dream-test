import type { ISalary } from "../../../interfaces/salary";
import { LazyLoadImage } from "react-lazy-load-image-component";
import notFound from "../../../images/404.png";

export interface SalaryListProps {
  salary?: ISalary;
}

export default function SalaryList({ salary }: SalaryListProps) {
  return !salary || !salary.paymentHistory.length ? (
    <LazyLoadImage
      src={notFound}
      alt="404 Not Found"
      className="notfound-data-image"
      loading="lazy"
    />
  ) : (
    <>
      {salary.paymentHistory.map((el, idx) => {
        const date = new Date(el.date);
        return (
          <p className="list-group-item-text salary-item" key={idx}>
            {date.getMonth() + 1}/{date.getFullYear()} - {el.amount} KM
          </p>
        );
      })}
    </>
  );
}
