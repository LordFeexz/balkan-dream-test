import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/login";
import MainLayout from "../components/layout/main";
import NotFound from "../views/notFound";
import AboutPage from "../views/about";
import TermPage from "../views/term";
import PrivacyPage from "../views/privacy";

export default createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
    loader: () => (localStorage.getItem("access_token") ? redirect("/") : null),
  },
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/about",
        element: <AboutPage />,
      },
      {
        path: "/terms",
        element: <TermPage />,
      },
      {
        path: "/privacy",
        element: <PrivacyPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
