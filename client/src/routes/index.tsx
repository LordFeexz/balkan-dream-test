import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/login";

export default createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => (localStorage.getItem("access_token") ? redirect("/") : null),
  },
]);
