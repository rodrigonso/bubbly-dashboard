import React from "react";
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

function CustomSider({
  type,
  selectedData,
  toggleModal,
  visible,
  onDataDelete,
  loading,
}) {
  const isCustomer = type === "customer" ?? false;
  const isEmployee = type === "employee" ?? false;
  const isService = type === "service" ?? false;
  const isUpgrade = type === "upgrade" ?? false;
  const isActive = type === "active" ?? false;
  const isTrack = type === "track" ?? false;

  if (selectedData) {
    return (
      <React.Fragment>
        {isEmployee ? (
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
        ) : null}
        <Card
          style={{
            borderRadius: 5,
            height: "74vh",
            maxHeight: "80vh",
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
            <Button icon={<FormOutlined />} onClick={toggleModal} type="link" />
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

export default withModal()(CustomSider);
