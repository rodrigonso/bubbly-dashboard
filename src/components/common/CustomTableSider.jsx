import React from "react";
import { Empty, Divider, Button, Card } from "antd";
import UserContactInfo from "./UserContactInfo";
import CustomerVehicleInfo from "./CustomerVehicleInfo";
import CustomerPaymentInfo from "./CustomerPaymentInfo";
import EmployeeRatingInfo from "./EmployeeRatingInfo";
import { FormOutlined } from "@ant-design/icons";

export default function CustomTableSider({
  selectedData,
  toggleModal,
  onDataDelete,
  loading,
}) {
  const isCustomer = selectedData?.role === "customer" ?? false;
  if (selectedData) {
    return (
      <Card
        style={{
          borderRadius: 5,
          height: "60vh",
        }}
        title={selectedData.formatName()}
        extra={
          <Button icon={<FormOutlined />} onClick={toggleModal} type="link" />
        }
      >
        <UserContactInfo user={selectedData} />
        <Divider />
        {isCustomer ? (
          <CustomerVehicleInfo customer={selectedData} />
        ) : (
          <EmployeeRatingInfo employee={selectedData} />
        )}
        <Divider />
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
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "60vh",
          backgroundColor: "#fff",
          borderRadius: 5,
        }}
      >
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description="Nothing Selected"
        />
      </div>
    );
  }
}
