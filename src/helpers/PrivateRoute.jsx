import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../services/auth_service";
import SplashPage from "../components/common/SplashPage";

export default function PrivateRoute({ component: RouteComponent, ...rest }) {
  const { currentUser, loading } = useContext(AuthContext);
  console.log(currentUser, loading);

  const handleLoading = (routeProps) => {
    if (currentUser) {
      return <RouteComponent {...routeProps} />;
    } else {
      if (loading) {
        return <SplashPage />;
      } else {
        return <Redirect to="/auth" />;
      }
    }
  };

  return <Route {...rest} render={(routeProps) => handleLoading(routeProps)} />;
}
