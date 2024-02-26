import { type MouseEventHandler, useEffect, useState } from "react";
import { swalError } from "../../../helpers/swal";
import { useNavigate } from "react-router-dom";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { microsoftLogin } from "../../../actions/user";
import msalInstance from '../../../lib/msal'
import type {AuthenticationResult} from '@azure/msal-browser'

export default function MicrosoftLoginBtn() {
  useEffect(() => {
    (async () => {
      await msalInstance.initialize();
    })();
  }, []);
  const [loading, setLoading] = useState<boolean>(false);

  const navigate = useNavigate();

  const microsoftHandler: MouseEventHandler = async (e) => {
    e.preventDefault();

    await msalInstance.handleRedirectPromise();
    const accounts = msalInstance.getAllAccounts();
    if (!accounts.length)
      msalInstance
        .loginPopup({
          scopes: ["profile", "email"],
        })
        .then((val: AuthenticationResult) => {
          setLoading(true);
          microsoftLogin(val.idToken)
            .then((token: string) => {
              localStorage.setItem("access_token", token);
              navigate("/employees");
            })
            .catch((err) => {
              return;
            });
        })
        .catch((err: Error) => {
          if (err?.message !== "user_cancelled: User cancelled the flow.")
            swalError("something went wrong");
          msalInstance.clearCache();
          return;
        })
        .finally(() => {
          setLoading(false);
        });
    else {
      swalError("Another interaction is in progress. Please wait.");
      msalInstance.clearCache();
    }
  };

  return (
    <LoadingOverlayWrapper active={loading} spinner>
      <button
        type="button"
        className="btn submit-button border border-2 border-black display-3"
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
        onClick={microsoftHandler}>
        <i className="fab fa-microsoft" style={{ marginRight: "8px" }}></i>
        <span style={{ marginLeft: "50px" }}>Login with microsoft</span>
      </button>
    </LoadingOverlayWrapper>
  );
}
