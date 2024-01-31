import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import LoadingOverlayWrapper from "react-loading-overlay-ts";
import { useState } from "react";

export default function GoogleLoginButton() {
  const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <LoadingOverlayWrapper spinner text="...loading" active={loading}>
        <GoogleLogin
          text="signin_with"
          onSuccess={(credential) => {}}
          // onFailure={this.onFailure}
        />
      </LoadingOverlayWrapper>
    </GoogleOAuthProvider>
  );
}
