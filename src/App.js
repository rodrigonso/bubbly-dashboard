import React, { useState, useEffect } from "react";
import OverviewPage from "./components/overviewPage/OverviewPage";
import SchedulePage from "./components/schedulePage/SchedulePage";
import AppointmentDetails from "./components/appointmentDetailsPage/AppointmentDetailsPage";
import PayrollPage from "./components/payrollPage/PayrollPage";
import NotFoundPage from "./components/common/NotFoundPage";
import { Switch, Route, Redirect } from "react-router-dom";
import AuthPage from "./components/common/AuthPage";
import { isUserLoggedIn } from "./services/auth_service";
import AuthRoute from "./helpers/AuthRoute";

const routes = [
  { path: "/", component: OverviewPage },
  { path: "/schedule", component: SchedulePage },
  { path: "/schedule/:appointmentId", component: AppointmentDetails },
  { path: "/payroll", component: PayrollPage },
  { path: "/not-found", component: NotFoundPage },
];

function App() {
  var isAuth = isUserLoggedIn();
  return (
    <Switch>
      <Route
        path="/auth"
        render={() => (isAuth ? <OverviewPage /> : <AuthPage />)}
      />
      {routes.map((route) => (
        <Route
          path={route.path}
          exact
          render={(props) => (
            <AuthRoute
              path={route.path}
              isAuth={isAuth}
              orRender={<route.component {...props} />}
            />
          )}
        />
      ))}
      <Redirect to="/not-found" />
    </Switch>
  );
}

export default App;
