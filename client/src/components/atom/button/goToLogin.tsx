import { Link } from "react-router-dom";
import { ArrowLeft } from "react-feather";

export default function GoToLogin() {
  return (
    <>
      <div className="col-12">
        <Link to="/login" className="btn btn-hollow btn-xo">
          <ArrowLeft size="18" className="button-left-icon" /> Go to the LOGIN
          page
        </Link>
      </div>
      <br />
    </>
  );
}
