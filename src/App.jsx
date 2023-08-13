import {
  HomePage,
  UserDetailsPage,
  VideoDetailsPage,
  LoginPage,
  RegisterPage,
  DashboardPage,
} from "./pages";
import { Route, Routes } from "react-router";

const App = () => {
  const routes = [
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/user/:id", element: <UserDetailsPage /> },
    { path: "/video/:id", element: <VideoDetailsPage /> },
    { path: "/dashboard", element: <DashboardPage /> },
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
