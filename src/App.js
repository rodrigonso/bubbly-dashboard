import React from "react";
import OverviewPage from "./components/overviewPage/OverviewPage";
import SchedulePage from "./components/schedulePage/SchedulePage";
import AppointmentDetails from "./components/appointmentDetailsPage/AppointmentDetailsPage";
import NotFoundPage from "./components/common/NotFoundPage";
import { Route, Redirect, BrowserRouter } from "react-router-dom";
import BaseServicesPage from "./components/servicesPage/BaseServicesPage";
import UpgradesPage from "./components/upgradesPage/UpgradesPage";
import CustomersPage from "./components/customersPage/CustomersPage";
import { AuthProvider, logout } from "./services/auth_service";
import PrivateRoute from "./helpers/PrivateRoute";
import AuthPage from "./components/common/AuthPage";
import ManageEmployeesPage from "./components/manageEmployeesPage/ManageEmployeesPage";
import ActiveAppointmentDetailsPage from "./components/activeAppointmentDetailsPage/ActiveAppointmentDetailsPage";
import CustomerDetailsPage from "./components/customerDetailsPage/CustomerDetailsPage";
import BaseServiceDetailsPage from "./components/baseServiceDetailsPage/BaseServiceDetailsPage";
import { Layout, Popover, Button, Card, Avatar, Typography } from "antd";
import NavBar from "./components/common/NavBar";
import { UserOutlined } from "@ant-design/icons";
import PageStructure from "./components/common/PageStructure";

const { Header } = Layout;

const routes = [
  { path: "/", component: OverviewPage },
  { path: "/schedule", component: SchedulePage },
  { path: "/customers", component: CustomersPage },
  { path: "/services/base-services", component: BaseServicesPage },
  { path: "/services/upgrades", component: UpgradesPage },
  { path: "/employees/manage", component: ManageEmployeesPage },
  { path: "/schedule/:appointmentId", component: AppointmentDetails },
  { path: "/overview/:appointmentId", component: ActiveAppointmentDetailsPage },
  {
    path: "/services/base-services/:serviceId",
    component: BaseServiceDetailsPage,
  },
  // {path: "/employees/:employeeId", component: EmployeeDetailsPage},
  { path: "/customers/:customerId", component: CustomerDetailsPage },
  {
    path: "/active/:apppointmentId",
    component: AppointmentDetails,
  },
  {
    path: "/customers/schedule/:apppointmentId",
    component: AppointmentDetails,
  },
  { path: "/not-found", component: NotFoundPage },
];

function App() {
  return (
    <React.Fragment>
      <AuthProvider>
        <BrowserRouter>
          <Layout>
            <NavBar />
            <Layout className="site-layout">
              <PageStructure />
              <Route exact path="/auth" component={AuthPage} />
              {routes.map((route) => (
                <PrivateRoute
                  key={route.path}
                  exact
                  path={route.path}
                  component={route.component}
                />
              ))}
              <Redirect to="/not-found" />
            </Layout>
          </Layout>
        </BrowserRouter>
      </AuthProvider>
    </React.Fragment>
  );
}

export default App;
