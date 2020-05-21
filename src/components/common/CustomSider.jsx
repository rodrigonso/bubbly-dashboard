import React from "react";
import { Divider, Button, Card } from "antd";
import UserContactInfo from "./UserContactInfo";
import CustomerVehicleInfo from "./CustomerVehicleInfo";
import CustomerPaymentInfo from "./CustomerPaymentInfo";
import EmployeeRatingInfo from "./EmployeeRatingInfo";
import { FormOutlined } from "@ant-design/icons";
import { TinderLikeCard } from "react-stack-cards";
import ServiceInfo from "./ServiceInfo";
import Empty from "../common/Empty";

export default function CustomSider({
  type,
  selectedData,
  toggleModal,
  onDataDelete,
  loading,
}) {
  const isCustomer = type === "customer" ?? false;
  const isEmployee = type === "employee" ?? false;
  const isService = type === "service" ?? false;

  if (selectedData) {
    return (
      <React.Fragment>
        <Card
          style={{
            borderRadius: 5,
            height: "60vh",
          }}
          title={isService ? selectedData.name : selectedData.formatName()}
          extra={
            <Button icon={<FormOutlined />} onClick={toggleModal} type="link" />
          }
        >
          {!isService ? <UserContactInfo user={selectedData} /> : null}
          {isService ? <ServiceInfo service={selectedData} /> : null}
          <Divider />
          {isCustomer ? <CustomerVehicleInfo customer={selectedData} /> : null}
          {isEmployee ? <EmployeeRatingInfo employee={selectedData} /> : null}
          {isEmployee || isCustomer ? <Divider /> : null}
          {isCustomer ? <CustomerPaymentInfo customer={selectedData} /> : null}
          {isCustomer ? <Divider /> : null}
          <Button
            onClick={onDataDelete}
            loading={loading}
            block
            shape="round"
            type="danger"
          >
            Delete
          </Button>
        </Card>
      </React.Fragment>
    );
  } else {
    return <Empty />;
  }
}
