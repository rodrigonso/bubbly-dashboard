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
import withModal from "../hoc/withModal";
import withFetch from "../hoc/withFetch";

function CustomersPage(props) {
  const { data: customers, refresh, loading } = props;
  const [selectedCustomer, setSelectedCustomer] = useState(null);

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
    await deleteUserById(selectedCustomer.id);
    setSelectedCustomer(null);
    await refresh();
  };

  return (
    <React.Fragment>
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
              toggleModal={props.toggleModal}
              loading={loading}
              onDataDelete={handleUserDeletion}
            />
          </SmallColumn>
        </ColumnsLayout>
      </BasicPage>
    </React.Fragment>
  );
}

export default withModal()(withFetch({ fetch: getCustomers })(CustomersPage));
