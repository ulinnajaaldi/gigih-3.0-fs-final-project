import { useContext } from "react";
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
import { AuthContext } from "./contexts/auth-provider";

const App = () => {
  const { data } = useContext(AuthContext);

  const routes = [
    { path: "*", element: <NotFoundPage /> },
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/user/:id", element: <UserDetailsPage /> },
    { path: "/video/:id", element: <VideoDetailsPage /> },
    {
      path: "/dashboard",
      element: data === null ? <NotFoundPage /> : <DashboardPage />,
    },
    {
      path: "/dashboard/edit/:id",
      element: data === null ? <NotFoundPage /> : <DashboardEditPage />,
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
