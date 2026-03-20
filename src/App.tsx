import { createBrowserRouter } from "react-router";

import { Home } from "./pages/home";
import { Dashboard } from "./pages/dashboard";
import { Car } from "./pages/car";
import { New } from "./pages/dashboard/new";
import { EditCar } from "./pages/dashboard/edit";
import { Login } from "./pages/login";
import { Register } from "./pages/register";

import { Layout } from "./components/layout";
import { PrivateRoute } from "./routes/Private";

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />,
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/new",
        element: (
          <PrivateRoute>
            <New />,
          </PrivateRoute>
        ),
      },
      {
        path: "/dashboard/edit/:id",
        element: (
          <PrivateRoute>
            <EditCar />,
          </PrivateRoute>
        ),
      },
      {
        path: "car/:id",
        element: <Car />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
