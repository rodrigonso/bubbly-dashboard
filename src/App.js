import React from "react";
import "./App.css";
import OverviewPage from "./components/overviewPage/OverviewPage";
import SchedulePage from "./components/schedulePage/SchedulePage";
import PayrollPage from "./components/payrollPage/PayrollPage";
import NotFoundPage from "./components/common/NotFoundPage";
import { Switch, Route, Redirect } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route exact path="/" component={OverviewPage} />
      <Route exact path="/schedule" component={SchedulePage} />
      <Route exact path="/payroll" component={PayrollPage} />
      <Route path="/not-found" component={NotFoundPage} />
      <Redirect to="/not-found" />
    </Switch>
  );
}

export default App;
