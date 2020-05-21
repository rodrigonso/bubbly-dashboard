import React, { useEffect } from "react";
import BasicPage from "../common/BasicPage";
import { Button, Typography } from "antd";
import { useState } from "react";
import { getCustomers, deleteUserById } from "../../services/db_service";
import { PlusOutlined } from "@ant-design/icons";

import ColumnsLayout from "../common/ColumnsLayout";
import SmallColumn from "../common/SmallColumn";
import BigColumn from "../common/BigColumn";
import EditCustomerModal from "./subComponents/EditCustomerModal";
import CustomTable from "../common/CustomTable";
import CustomSider from "../common/CustomSider";

export default function CustomersPage() {
  const [loading, setLoading] = useState(false);
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    setLoading(true);
    getCustomers().then((users) => setCustomers(users));
    setLoading(false);
  };

  const columns = [
    {
      title: "Name",
      render: (record) => (
        <Typography.Text>{record.formatName()}</Typography.Text>
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
    await fetchCustomers();
  };

  const toggleModal = async () => {
    if (modal === true) {
      setSelectedCustomer(null);
      await fetchCustomers();
    }
    setModal(!modal);
  };

  return (
    <React.Fragment>
      {selectedCustomer ? (
        <EditCustomerModal
          visible={modal}
          onCancel={toggleModal}
          onOk={toggleModal}
          customer={selectedCustomer}
        />
      ) : null}
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
            <CustomTable
              data={customers}
              onRowClick={setSelectedCustomer}
              columns={columns}
            />
          </BigColumn>
          <SmallColumn>
            <CustomSider
              type="customer"
              selectedData={selectedCustomer}
              toggleModal={toggleModal}
              loading={loading}
              onDataDelete={handleUserDeletion}
            />
          </SmallColumn>
        </ColumnsLayout>
      </BasicPage>
    </React.Fragment>
  );
}
