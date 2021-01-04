import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Divider, Button, Card } from "antd";
import UserContactInfo from "./UserContactInfo";
import CustomerVehicleInfo from "./CustomerVehicleInfo";
import CustomerPaymentInfo from "./CustomerPaymentInfo";
import EmployeeRatingInfo from "./EmployeeRatingInfo";
import { FormOutlined } from "@ant-design/icons";
import ServiceInfo from "./ServiceInfo";
import Empty from "../common/Empty";
import UpgradeInfo from "./UpgradeInfo";

import EditEmployeeModal from "../manageEmployeesPage/subComponents/EditEmployeeModal";
import withModal from "../hoc/withModal";
import EditCustomerModal from "../customersPage/subComponents/EditCustomerModal";
import ServiceUpgradesInfo from "./ServiceUpgradesInfo";
import ActiveAppointmentInfo from "../overviewPage/subComponents/ActiveAppointmentInfo";
import TrackAppointmentInfo from "../activeAppointmentDetailsPage/subComponents/TrackAppointmentInfo";

function CustomSider(props) {
  const { type, selectedData, onDataDelete, loading } = props;

  const isCustomer = type === "customers" ?? false;
  const isEmployee = type === "employees" ?? false;
  const isService = type === "base-services" ?? false;
  const isUpgrade = type === "upgrades" ?? false;
  const isActive = type === "active" ?? false;
  const isTrack = type === "track" ?? false;

  const handleEdit = () => {
    const pathName = type;

    return props.history.push({
      pathname: `${pathName}/${selectedData.id}`,
      state: { id: selectedData.id },
    });
  };

  if (selectedData) {
    return (
      <React.Fragment>
        {/* {isEmployee ? (
          <EditEmployeeModal
            visible={visible}
            loading={false}
            onOk={toggleModal}
            onCancel={toggleModal}
            employee={selectedData}
          />
        ) : null}
        {isCustomer ? (
          <EditCustomerModal
            visible={visible}
            onCancel={toggleModal}
            onOk={toggleModal}
            customer={selectedData}
          />
        ) : null} */}
        <Card
          style={{
            borderRadius: 5,
            height: "80vh",
            // maxHeight: "90vh",
            overflow: "scroll",
          }}
          title={
            isActive || isTrack
              ? selectedData.service.name
              : isService || isUpgrade
              ? selectedData.name
              : selectedData.formatName()
          }
          extra={
            <Button onClick={handleEdit} icon={<FormOutlined />} type="link" />
          }
        >
          {!isService && !isUpgrade && !isActive && !isTrack ? (
            <UserContactInfo user={selectedData} />
          ) : null}
          {isActive ? (
            <ActiveAppointmentInfo appointment={selectedData} />
          ) : null}
          {isService ? <ServiceInfo service={selectedData} /> : null}
          {isUpgrade ? <UpgradeInfo upgrade={selectedData} /> : null}
          {isTrack ? <TrackAppointmentInfo appointment={selectedData} /> : null}
          <Divider />

          {isCustomer ? <CustomerVehicleInfo customer={selectedData} /> : null}
          {isEmployee && selectedData.role === "detailer" ? (
            <EmployeeRatingInfo employee={selectedData} />
          ) : null}
          {isService ? (
            <React.Fragment>
              <ServiceUpgradesInfo upgrades={selectedData.upgrades} />
              <Divider />
            </React.Fragment>
          ) : null}
          {(isEmployee || isCustomer) && selectedData.role !== "manager" ? (
            <Divider />
          ) : null}
          {isCustomer ? <CustomerPaymentInfo customer={selectedData} /> : null}
          {isCustomer ? <Divider /> : null}
          <Button onClick={onDataDelete} loading={loading} block type="danger">
            {`${isActive ? "Cancel" : "Delete"}`}
          </Button>
        </Card>
      </React.Fragment>
    );
  } else {
    return <Empty />;
  }
}

export default withRouter(CustomSider);
