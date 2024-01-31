import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/login";
import MainLayout from "../components/layout/main";
import NotFound from "../views/notFound";

export default createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => (localStorage.getItem("access_token") ? redirect("/") : null),
  },
  {
    path: "/",
    element: <MainLayout />,
    loader: () =>
      !localStorage.getItem("access_token") ? redirect("/login") : null,
    children: [],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
