import React from "react";
import BasicPage from "../common/BasicPage";
import { Button, Typography } from "antd";
import { useState } from "react";
import { getCustomers, deleteUserById } from "../../services/db_service";
import { PlusOutlined } from "@ant-design/icons";

import ColumnsLayout from "../common/ColumnsLayout";
import SmallColumn from "../common/SmallColumn";
import BigColumn from "../common/BigColumn";
import CustomTable from "../common/CustomTable";
import CustomSider from "../common/CustomSider";
import withModal from "../hoc/withModal";
import withFetch from "../hoc/withFetch";
import BasicPageLoading from "../common/BasicPageLoading";

function CustomersPage(props) {
  const { data: customers, refresh, loading } = props;
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const columns = [
    {
      title: "Name",
      render: (record) => (
        <Typography.Text>{record.toString()}</Typography.Text>
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

  if (loading) return <BasicPageLoading table />;
  else
    return (
      <React.Fragment>
        <BasicPage
          title="Customers"
          action={
            <Button type="primary" icon={<PlusOutlined />}>
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
                hint="Search customer"
              />
            </BigColumn>
            <SmallColumn>
              <CustomSider
                type="customers"
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
