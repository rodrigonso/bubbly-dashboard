import React, { useEffect } from "react";
import BasicPage from "../common/BasicPage";
import { Button, Typography } from "antd";
import { useState } from "react";
import { deleteUserById, getEmployees } from "../../services/db_service";
import { PlusOutlined } from "@ant-design/icons";
import ColumnsLayout from "../common/ColumnsLayout";
import BigColumn from "../common/BigColumn";
import SmallColumn from "../common/SmallColumn";
import CustomTable from "../common/CustomTable";
import CustomTableSider from "../common/CustomTableSider";
import NewEmployeeModal from "./subComponents/NewEmployeeModal";
import EditCustomerModal from "../customersPage/subComponents/EditCustomerModal";
import EditEmployeeModal from "./subComponents/EditEmployeeModal";

export default function CustomersPage() {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [modalNew, setModalNew] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

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

  const fetchEmployees = async () => {
    setLoading(true);
    getEmployees().then((users) => setEmployees(users));
    setLoading(false);
  };

  const toggleNew = async () => {
    if (modalNew === true) {
      setSelectedEmployee(null);
      await fetchEmployees();
    }
    setModalNew(!modalNew);
  };

  const toggleEdit = async () => {
    if (modalEdit === true) {
      setSelectedEmployee(null);
      await fetchEmployees();
    }
    setModalEdit(!modalEdit);
  };

  const handleEmployeeDeletion = async () => {
    setLoading(true);
    await deleteUserById(selectedEmployee.id);
    setSelectedEmployee(null);
    setLoading(false);
  };

  return (
    <React.Fragment>
      <NewEmployeeModal
        onOk={toggleNew}
        onCancel={toggleNew}
        visible={modalNew}
      />
      {selectedEmployee ? (
        <EditEmployeeModal
          visible={modalEdit}
          onCancel={toggleEdit}
          onOk={toggleEdit}
          employee={selectedEmployee}
        />
      ) : null}
      <BasicPage
        title="Manage Employees"
        action={
          <Button
            onClick={toggleNew}
            type="primary"
            icon={<PlusOutlined />}
            shape="round"
          >
            Employee
          </Button>
        }
      >
        <ColumnsLayout>
          <BigColumn>
            <CustomTable
              data={employees}
              columns={columns}
              onRowClick={setSelectedEmployee}
            />
          </BigColumn>
          <SmallColumn>
            <CustomTableSider
              selectedData={selectedEmployee}
              loading={loading}
              onDataDelete={handleEmployeeDeletion}
              toggleModal={toggleEdit}
            />
          </SmallColumn>
        </ColumnsLayout>
      </BasicPage>
    </React.Fragment>
  );
}
