import React, { useEffect } from "react";
import BasicPage from "../common/BasicPage";
import { Card, Table, Divider, Button, Empty, Typography } from "antd";
import { useState } from "react";
import { getCustomers, deleteUserById } from "../../services/db_service";
import Spinner from "../common/Spinner";
import { PlusOutlined, EditOutlined, FormOutlined } from "@ant-design/icons";
import UserContactInfo from "../common/UserContactInfo";
import SearchTable from "../common/SearchTable";
import UserVehicleInfo from "../common/UserVehicleInfo";
import UserPaymentInfo from "../common/UserPaymentInfo";
import ColumnsLayout from "../common/ColumnsLayout";
import SmallColumn from "../common/SmallColumn";
import BigColumn from "../common/BigColumn";
import EditCustomerModal from "./subComponents/EditCustomerModal";

export default function CustomersPage() {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [query, setQuery] = useState("");
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getCustomers().then((users) => setCustomers(users));
  }, []);

  const columns = [
    {
      title: "Name",
      render: (record) => (
        <Typography.Text>{record.nameToString()}</Typography.Text>
      ),
      key: "name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
  ];

  const handleUserDeletion = async () => {
    setLoading(true);
    await deleteUserById(selectedCustomer.id);
    setSelectedCustomer(null);
    setLoading(false);
  };

  const handleUserSearch = () => {
    if (query.length > 0)
      return customers.filter((item) =>
        item.nameToString().toLowerCase().includes(query.toLowerCase())
      );
    else return customers;
  };

  const toggleModal = () => {
    setModal(!modal);
  };

  return (
    <React.Fragment>
      <EditCustomerModal
        visible={modal}
        onCancel={toggleModal}
        onOk={toggleModal}
        customer={selectedCustomer}
      />
      <BasicPage
        title="Customers"
        action={
          <Button type="primary" icon={<PlusOutlined />} shape="round">
            Customer
          </Button>
        }
      >
        <ColumnsLayout>
          <BigColumn>
            <Card
              style={{ borderRadius: 5, height: "60vh" }}
              bodyStyle={{ padding: "10px 10px 10px 10px" }}
              bordered
            >
              {customers.length > 0 ? (
                <Table
                  title={() => (
                    <SearchTable onSearch={setQuery} hint="Search customers" />
                  )}
                  dataSource={handleUserSearch()}
                  columns={columns}
                  onRow={(record, _) => {
                    return {
                      onClick: () => setSelectedCustomer(record),
                    };
                  }}
                />
              ) : (
                <Spinner />
              )}
            </Card>
          </BigColumn>
          <SmallColumn>
            {selectedCustomer ? (
              <Card
                style={{
                  borderRadius: 5,
                  height: "60vh",
                }}
                title={selectedCustomer.nameToString()}
                extra={
                  <Button
                    icon={<FormOutlined />}
                    onClick={toggleModal}
                    type="link"
                  />
                }
              >
                <UserContactInfo user={selectedCustomer} />
                <Divider />
                <UserVehicleInfo user={selectedCustomer} />
                <Divider />
                <UserPaymentInfo user={selectedCustomer} />
                <Divider />
                <Button
                  onClick={handleUserDeletion}
                  loading={loading}
                  block
                  shape="round"
                  type="danger"
                >
                  Delete Customer
                </Button>
              </Card>
            ) : (
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
            )}
          </SmallColumn>
        </ColumnsLayout>
      </BasicPage>
    </React.Fragment>
  );
}
