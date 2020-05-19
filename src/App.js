import React, { useState, useEffect } from "react";
import OverviewPage from "./components/overviewPage/OverviewPage";
import SchedulePage from "./components/schedulePage/SchedulePage";
import AppointmentDetails from "./components/appointmentDetailsPage/AppointmentDetailsPage";
import PayrollPage from "./components/payrollPage/PayrollPage";
import NotFoundPage from "./components/common/NotFoundPage";
import { Switch, Route, Redirect } from "react-router-dom";
import ServicesPage from "./components/servicesPage/ServicesPage";
import UpgradesPage from "./components/upgradesPage/UpgradesPage";
import CustomersPage from "./components/customersPage/CustomersPage";
import { AuthProvider } from "./services/auth_service";
import PrivateRoute from "./helpers/PrivateRoute";
import AuthPage from "./components/common/AuthPage";
import Item from "antd/lib/list/Item";

const routes = [
  { path: "/", component: OverviewPage },
  { path: "/schedule", component: SchedulePage },
  { path: "/customers", component: CustomersPage },
  { path: "/services/services", component: ServicesPage },
  { path: "/services/upgrades", component: UpgradesPage },
  { path: "/schedule/:appointmentId", component: AppointmentDetails },
  { path: "/payroll", component: PayrollPage },
  { path: "/not-found", component: NotFoundPage },
];

function App() {
  return (
    <AuthProvider>
      <Switch>
        <Route exact path="/auth" component={AuthPage} />
        {routes.map((route) => (
          <PrivateRoute exact path={route.path} component={route.component} />
        ))}
        <Redirect to="/not-found" />
      </Switch>
    </AuthProvider>
  );
}

export default App;
