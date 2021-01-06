import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import BasicPage from "../common/BasicPage";
import Spinner from "../common/Spinner";
import {
  getEmployees,
  getUpgrades,
  updateService,
} from "../../services/db_service";
import { Card, Divider, Input, Form, InputNumber, Select, Button } from "antd";
import CustomForm from "../common/CustomForm";
import Employee from "../../models/Employee";

export default function BaseServiceDetailsPage(props) {
  const { data: service } = props.location.state;

  const [loading, setLoading] = useState(false);

  const [name, setName] = useState(service.name);
  const [desc, setDesc] = useState(service.desc);
  const [details, setDetails] = useState(service.details);
  const [duration, setDuration] = useState(service.duration);
  const [price, setPrice] = useState(service.price);
  const [employees, setEmployees] = useState([]);
  const [detailers, setDetailers] = useState(service.detailers);
  const [type, setType] = useState(service.type);
  const [serviceUpgrades, setServiceUpgrades] = useState(service.upgrades);
  const [upgrades, setUpgrades] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetchData().then(() => setLoading(false));
  }, []);

  const fetchData = async () => {
    getUpgrades().then((e) => setUpgrades(e));
    getEmployees().then((e) => setEmployees(e));
  };

  const formItems1 = [
    {
      label: "Service Name",
      name: "service-name",
      component: (
        <Input defaultValue={name} onChange={(e) => setName(e.target.value)} />
      ),
    },
    {
      label: "Description",
      name: "desc",
      component: (
        <Input.TextArea
          autoSize={{ minRows: 2, maxRows: 6 }}
          defaultValue={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
      ),
    },
    {
      label: "Details",
      name: "details",
      component: (
        <Input.TextArea
          autoSize={{ minRows: 3, maxRows: 8 }}
          defaultValue={details}
          onChange={(e) => setDetails(e.target.value)}
        />
      ),
    },
  ];

  console.log("BUILD!");

  const handleSave = async () => {
    setLoading(true);
    const obj = {
      id: service.id,
      name,
      desc,
      type,
      price,
      duration,
      details: details.split(","),
      detailers: detailers.map((i) => Employee.toCompactObj(i)),
      upgrades: serviceUpgrades,
    };
    console.log(obj);

    await updateService(service.id, obj);
    setLoading(false);
  };

  if (loading) return <Spinner />;
  else
    return (
      <BasicPage
        title={service.name}
        narrow
        action={
          <Button onClick={handleSave} type="primary">
            Save
          </Button>
        }
      >
        <Card
          title="General Info"
          style={{ borderRadius: 5, backgroundColor: "#fff" }}
        >
          <CustomForm fields={formItems1} />
        </Card>
        <Card
          title="Service Details"
          style={{
            borderRadius: 5,
            backgroundColor: "#fff",
            marginTop: 10,
          }}
        >
          <Form name="form">
            <div style={{ display: "flex", boxSizing: "border-box" }}>
              <div>
                <div style={{ padding: "20px 20px 0px 20px" }}>
                  <Form.Item label="Duration">
                    <InputNumber
                      defaultValue={duration}
                      formatter={(value) => `${value} hrs`}
                      step={0.25}
                      parser={(value) => value.replace(" hours", "")}
                      onChange={setDuration}
                    />
                  </Form.Item>
                </div>
              </div>
              <div>
                <div style={{ padding: "20px 20px 0px 20px" }}>
                  <Form.Item label="Amount">
                    <InputNumber
                      defaultValue={price}
                      parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                      formatter={(value) =>
                        `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                      }
                      onChange={setPrice}
                    />
                  </Form.Item>
                </div>
              </div>
            </div>
            <div style={{ padding: "20px 20px 0px 20px", width: "50%" }}>
              <Form.Item label="Service Type">
                <Select defaultValue={type} onChange={setType}>
                  <Select.Option key="sedan">Sedan</Select.Option>
                  <Select.Option key="non-sedan">Non-Sedan</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Divider />
            <div style={{ padding: "20px 20px 0px 20px" }}>
              <Form.Item label="Detailers">
                <Select
                  mode="tags"
                  defaultValue={() => detailers.map((i) => i.id)}
                  onChange={setDetailers}
                >
                  {employees.map((item) => (
                    <Select.Option key={item.id}>
                      {item.toString()}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
            <Divider />
            <div style={{ padding: "20px 20px 0px 20px" }}>
              <Form.Item label="Upgrades">
                <Select
                  mode="tags"
                  defaultValue={serviceUpgrades.map((i) => i.id)}
                  onChange={setServiceUpgrades}
                >
                  {upgrades.map((i) => (
                    <Select.Option key={i.id}>{i.name}</Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          </Form>
        </Card>
      </BasicPage>
    );
}
