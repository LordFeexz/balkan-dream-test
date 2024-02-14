import { ArrowLeft } from "react-feather";
import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function EmployeeStat() {
  const { id } = useParams();
  return (
    <div className="container">
      <div className="row navigation-row-2">
        <Link to="/reports/details" className="btn btn-hollow">
          <ArrowLeft size="18" className="button-left-icon" /> Go back to
          Details
        </Link>
      </div>

      <div>
        <header style={{ textAlign: "center" }}>
          <h4>
            {" "}
            <span style={{ color: "#48C6EF", fontStyle: "italic" }}>
              {" "}
              {/* {onlyName}'s */}
            </span>{" "}
            detailed payment info{" "}
          </h4>
        </header>

        <div className="col-md-6" style={{ textAlign: "center" }}>
          <p>
            START DATE <i className={`fa fa-long-arrow-right`}></i>
            <span
              style={{
                fontFamily: "Arial",
                color: "#0ea55c",
                fontWeight: "bold",
                letterSpacing: "2px",
                fontSize: "1,5rem",
              }}
            >
              {" "}
              {/* {empStartDate} */}
            </span>
          </p>
        </div>
        <div className="col-md-6" style={{ textAlign: "center" }}>
          <p>
            END DATE <i className={`fa fa-long-arrow-right`}></i>
            <span
              style={{
                fontFamily: "Arial",
                color: "#da002e",
                fontWeight: "bold",
                letterSpacing: "2px",
                fontSize: "1,5rem",
              }}
            >
              {" "}
              {/* {empEndDate} */}
            </span>
          </p>
        </div>
        <hr />
      </div>
    </div>
  );
}
