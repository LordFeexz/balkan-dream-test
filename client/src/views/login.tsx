import logo from "../images/logo.png";
import { Link, useNavigate } from "react-router-dom";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { useState, type ChangeEvent, type FormEvent } from "react";
import PasswordForm from "../components/mollecul/form/passwordForm";
import EmailForm from "../components/mollecul/form/emailForm";
import GoogleLoginButton from "../components/mollecul/form/googleLoginForm";
import { loginHandler } from "../actions/user";
import { swalError } from "../helpers/swal";

export type LoginPageData = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<LoginPageData>({
    email: "",
    password: "",
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prev: LoginPageData) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    loginHandler(data)
      .then((val) => {
        localStorage.setItem("access_token", val);
        navigate("/");
      })
      .catch((err) => {
        swalError(err?.message || "Internal Server Error");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <LoadingOverlayWrapper spinner active={loading} text="...loading">
      <div className="container">
        <div className="container container__login">
          <div className="login__section">
            <img
              src={logo}
              alt="EMS Mars logo"
              className="login__section__logo"
            />
            <h4>Welcome to Mars EMS! </h4>
            <p className="no-data" style={{ marginBottom: "-.25rem" }}>
              Sign in with your credentials
            </p>
            <br />

            <form onSubmit={onSubmit}>
              <EmailForm
                value={data.email}
                name="email"
                onChangeHandler={onChange}
              />

              <PasswordForm
                value={data.password}
                onChangeHandler={onChange}
                name="password"
              />
              <button type="submit" className="btn btn-primary submit-button">
                submit
              </button>
            </form>

            <p className="no-data" style={{ marginBottom: "-.25rem" }}>
              Or
            </p>
            <br />
            <br />
            <GoogleLoginButton />
            <div className="intro">
              <ul>
                <li>
                  <Link to="/about">About</Link>
                </li>
                <li>
                  <Link to="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link to="/terms">Terms And Conditions</Link>
                </li>
                <li style={{ marginTop: ".6rem" }}>Made for test</li>
                <li>&copy; {new Date().getFullYear()}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </LoadingOverlayWrapper>
  );
}
