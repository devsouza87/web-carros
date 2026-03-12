import { type ReactNode, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router";
import Loading from "../pages/loading";

export const PrivateRoute = ({ children }: { children: ReactNode }) => {
  const { signed, loadingAuth } = useContext(AuthContext);

  if (loadingAuth) {
    return <Loading />;
  }

  if (!signed) {
    return <Navigate to="/login" />;
  }

  return children;
};
