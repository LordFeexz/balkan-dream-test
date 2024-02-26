import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../images/logo.png";
import { logout } from "../../actions/user";
import msalInstance from "../../lib/msal";

export default function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentRoute = location.pathname;

  const logoutHandler = async () => {
    await logout();
    localStorage.removeItem("access_token");
    await msalInstance.clearCache();
    navigate("/login");
  };

  return (
    <div className="wrapper">
      <header className="" role="banner">
        <div className="container">
          <div className="navbar navbar__container">
            <Link to="/employees">
              <img
                src={logo}
                alt="EMS Mars logo"
                className="logo"
                loading="lazy"
              />
            </Link>
            <ul className="navbar__menu">
              <li className={currentRoute === "/home" ? "active" : ""}>
                <Link to="/penalty"> Penalty </Link>
              </li>

              <li className={currentRoute === "/employees" ? "active" : ""}>
                <Link to="/employees"> Employees </Link>
              </li>

              <li className={currentRoute === "/reports" ? "active" : ""}>
                <Link to="/reports"> Reports </Link>
              </li>

              <li className={currentRoute === "/loans" ? "active" : ""}>
                <Link to="/loans"> Loans </Link>
              </li>

              <li className={currentRoute === "/salaries" ? "active" : ""}>
                <Link to="/salaries"> Salaries </Link>
              </li>

              <li className={currentRoute === "/about" ? "active" : ""}>
                <Link to="/about"> About </Link>
              </li>
            </ul>
            <Link to="/login" onClick={logoutHandler} className="navbar__links">
              Sign out
            </Link>
          </div>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}
