import { createBrowserRouter, redirect } from "react-router-dom";
import LoginPage from "../views/login";
import MainLayout from "../components/layout/main";
import NotFound from "../views/notFound";
import AboutPage from "../views/about";
import TermPage from "../views/term";
import PrivacyPage from "../views/privacy";
import Employee from "../views/employees/employees";
import EmployeeDetailPage from "../views/employees/detail";
import TabContentWrapper from "../context/tabContent";
import LoanPage from "../views/loan";

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
      {
        path: "/employees",
        element: <Employee />,
        loader: () =>
          !localStorage.getItem("access_token") ? redirect("/login") : null,
      },
      {
        path: "/employees/:identifier",
        element: (
          <TabContentWrapper>
            <EmployeeDetailPage />
          </TabContentWrapper>
        ),
        loader: () =>
          !localStorage.getItem("access_token") ? redirect("/login") : null,
      },
      {
        path: "/loans",
        loader: () =>
          !localStorage.getItem("access_token") ? redirect("/login") : null,
        element: <LoanPage />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
