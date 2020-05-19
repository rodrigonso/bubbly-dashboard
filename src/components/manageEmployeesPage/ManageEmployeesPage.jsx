import React, { useEffect } from "react";
import BasicPage from "../common/BasicPage";
import {
  Card,
  Row,
  Table,
  Divider,
  Typography,
  Col,
  Button,
  Empty,
} from "antd";
import { useState } from "react";
import {
  getUsers,
  deleteUserById,
  getEmployees,
} from "../../services/db_service";
import Spinner from "../common/Spinner";
import {
  PlusOutlined,
  CreditCardOutlined,
  CarOutlined,
} from "@ant-design/icons";
import UserContactInfo from "../common/UserContactInfo";

export default function CustomersPage() {
  const [loading, setLoading] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    getEmployees().then((employees) => setEmployees(employees));
  }, []);

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
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
    await deleteUserById(selectedEmployee.id);
    setSelectedEmployee(null);
    setLoading(false);
  };

  return (
    <React.Fragment>
      <BasicPage
        title="Customers"
        action={
          <Button type="primary" icon={<PlusOutlined />} shape="round">
            Employee
          </Button>
        }
      >
        <div className="flexbox-2" style={{ display: "flex" }}>
          <div className="row-1" style={{ flexBasis: "70%" }}>
            <Card
              style={{ borderRadius: 5, height: "60vh" }}
              bodyStyle={{ padding: "10px 10px 10px 10px" }}
              bordered
            >
              {employees.length > 0 ? (
                <Table
                  dataSource={employees}
                  columns={columns}
                  onRow={(record, _) => {
                    return {
                      onClick: () => setSelectedEmployee(record),
                    };
                  }}
                />
              ) : (
                <Spinner />
              )}
            </Card>
          </div>
          <div
            className="row-2"
            style={{
              flexBasis: "30%",
              marginLeft: 20,
            }}
          >
            {selectedEmployee ? (
              <Card
                style={{ borderRadius: 5, height: "60vh" }}
                title={selectedEmployee?.name ?? ""}
              >
                <UserContactInfo user={selectedEmployee} />
                <Divider />
                <Card bordered={false} bodyStyle={{ padding: 0 }}>
                  <p style={{ fontWeight: 600 }}>Vehicle Info</p>
                  {selectedEmployee.vehicles.map((item) => {
                    return (
                      <Row>
                        <Col>
                          <CarOutlined />
                        </Col>
                        <Col style={{ marginLeft: 10 }}>
                          <Typography.Text
                            type="secondary"
                            style={{ fontSize: 12 }}
                          >
                            {`${item.make} ${item.model}`}
                          </Typography.Text>
                        </Col>
                      </Row>
                    );
                  })}
                </Card>
                <Divider />
                <Card bordered={false} bodyStyle={{ padding: 0 }}>
                  <p style={{ fontWeight: 600 }}>Payment Info</p>
                  {selectedEmployee.sources.map((item) => {
                    return (
                      <Row>
                        <Col>
                          <CreditCardOutlined />
                        </Col>
                        <Col style={{ marginLeft: 10 }}>
                          <Typography.Text
                            type="secondary"
                            style={{ fontSize: 12 }}
                          >
                            {`${item.card_brand} ${item.last_4}`}
                          </Typography.Text>
                        </Col>
                      </Row>
                    );
                  })}
                </Card>
                <Divider />
                <Button
                  onClick={handleUserDeletion}
                  loading={loading}
                  block
                  shape="round"
                  type="danger"
                >
                  Delete User
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
          </div>
        </div>
      </BasicPage>
    </React.Fragment>
  );
}
