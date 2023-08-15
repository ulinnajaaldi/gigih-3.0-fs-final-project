import {
  HomePage,
  UserDetailsPage,
  VideoDetailsPage,
  LoginPage,
  RegisterPage,
  DashboardPage,
  DashboardEditPage,
  NotFoundPage,
} from "./pages";
import { Route, Routes } from "react-router";
import Cookies from "js-cookie";

const App = () => {
  const token = Cookies.get("access_token");

  const routes = [
    { path: "*", element: <NotFoundPage /> },
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/user/:id", element: <UserDetailsPage /> },
    { path: "/video/:id", element: <VideoDetailsPage /> },
    {
      path: "/dashboard",
      element: !token ? <NotFoundPage /> : <DashboardPage />,
    },
    {
      path: "/dashboard/edit/:id",
      element: !token ? <NotFoundPage /> : <DashboardEditPage />,
    },
  ];

  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export default App;
