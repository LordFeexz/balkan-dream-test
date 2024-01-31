import { Link, Outlet, useLocation } from "react-router-dom";
import logo from "../../images/logo.png";

export default function MainLayout() {
  const location = useLocation();
  const currentRoute = location.pathname;

  const logout = () => {
    localStorage.removeItem("access_token");
  };
  return (
    <div className="wrapper">
      <header className="" role="banner">
        <div className="container">
          <div className="navbar navbar__container">
            <Link to="/home">
              <img src={logo} alt="EMS Mars logo" className="logo" />
            </Link>
            <ul className="navbar__menu">
              <li className={currentRoute === "/home" ? "active" : ""}>
                <Link to="/home"> Home </Link>
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
            <Link to="/login" onClick={logout} className="navbar__links">
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
