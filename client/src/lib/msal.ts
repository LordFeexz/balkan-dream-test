import * as msal from "@azure/msal-browser";

export default new msal.PublicClientApplication({
  auth: {
    clientId: process.env.REACT_APP_MSAL_CLIENT_ID as string,
    redirectUri:
      process.env.REACT_APP_MSAL_REDIRECT_URI ?? "http://localhost:3000",
  },
});
