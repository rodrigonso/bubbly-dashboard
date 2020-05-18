import React from "react";
import { Route, Redirect } from "react-router-dom";

export default function AuthRoute(props) {
  if (props.isAuth) return props.orRender;
  else return <Redirect to="/auth" />;
}
