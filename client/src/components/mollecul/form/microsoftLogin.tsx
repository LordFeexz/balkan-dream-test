import { type MouseEventHandler, useEffect, useState } from "react";
import * as msal from "@azure/msal-browser";
import { swalError } from "../../../helpers/swal";
import { useNavigate } from "react-router-dom";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { microsoftLogin } from "../../../actions/user";

export default function MicrosoftLoginBtn() {
  const msalInstance = new msal.PublicClientApplication({
    auth: {
      clientId: process.env.REACT_APP_MSAL_CLIENT_ID as string,
      redirectUri:process.env.REACT_APP_MSAL_REDIRECT_URI ?? "http://localhost:3000",
    },
  });

  useEffect(() => {
    (async () => {
      await msalInstance.initialize();
    })();
  }, []);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const microsoftHandler: MouseEventHandler = async (e) => {
    e.preventDefault();

    await msalInstance.handleRedirectPromise()
    const account = msalInstance.getAllAccounts()

    if(!account.length)
    msalInstance
      .loginPopup({
        scopes: ["profile", "email"],
      })
      .then((val: msal.AuthenticationResult) => {
        setLoading(true);
        microsoftLogin(val.idToken)
          .then((token: string) => {
            localStorage.setItem("access_token", token);
            navigate("/employees");
          })
          .catch((err: Error) => {
            throw err
          });
      })
      .catch((err: Error) => {
        swalError("something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
    else swalError('cannot login by microsoft')
  };

  return (
    <LoadingOverlayWrapper active={loading} spinner>
      <button
        type="button"
        className="btn btn-primary submit-button"
        onClick={microsoftHandler}>
        login with microsoft
      </button>
    </LoadingOverlayWrapper>
  );
}
