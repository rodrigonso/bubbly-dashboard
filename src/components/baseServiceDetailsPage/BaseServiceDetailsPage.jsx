import React, { useEffect, useState } from "react";
import BasicPage from "../common/BasicPage";
import {
  getEmployees,
  getUpgrades,
  updateService,
  removeServiceById,
} from "../../services/db_service";
import {
  Card,
  Divider,
  Input,
  Form,
  InputNumber,
  Select,
  Button,
  Skeleton,
  Typography,
  Descriptions,
  Popconfirm,
} from "antd";
import CustomForm from "../common/CustomForm";
import Employee from "../../models/Employee";
import EmployeePicker from "../common/EmployeePicker";

export default function BaseServiceDetailsPage(props) {
  const { state: service } = props.location;

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);

  const [name, setName] = useState(service.name);
  const [desc, setDesc] = useState(service.desc);
  const [details, setDetails] = useState(service.details);
  const [duration, setDuration] = useState(service.duration);
  const [price, setPrice] = useState(service.price);
  const [detailers, setDetailers] = useState(service.detailers);
  const [type, setType] = useState(service.type);
  const [serviceUpgrades, setServiceUpgrades] = useState(service.upgrades);
  const [upgrades, setUpgrades] = useState([]);

  useEffect(() => {
    fetchData().then(() => setLoading(false));
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const upgrades = await getUpgrades();
    const employees = await getEmployees();
    setUpgrades(upgrades);
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

  const handleSave = async () => {
    setSaving(true);
    const obj = {
      id: service.id,
      name,
      desc,
      type,
      price,
      duration,
      details: typeof details === "string" ? details.split(",") : details,
      detailers: detailers.map((i) => Employee.toCompactObj(i)),
      upgrades: serviceUpgrades,
    };

    updateService(service.id, obj);
    setSaving(false);
  };

  const actions = [
    <Button
      style={{ marginRight: "1rem" }}
      onClick={() => props.history.goBack()}
      type="ghost"
    >
      Cancel
    </Button>,
    <Button loading={saving} onClick={handleSave} type="primary">
      Save
    </Button>,
  ];

  if (loading)
    return (
      <BasicPage narrow>
        <Card style={{ borderRadius: 5, backgroundColor: "#fff" }}>
          <Skeleton active title={false} paragraph={{ rows: 1 }} />
          <br />
          <Skeleton active title={false} paragraph={{ rows: 3 }} />
          <br />
          <Skeleton active title={false} paragraph={{ rows: 3 }} />
        </Card>
        <Card
          style={{
            marginTop: "1rem",
            borderRadius: 5,
            backgroundColor: "#fff",
          }}
        >
          <Skeleton active title={false} paragraph={{ rows: 1 }} />
          <br />
          <Skeleton active title={false} paragraph={{ rows: 3 }} />
          <br />
          <Skeleton active title={false} paragraph={{ rows: 3 }} />
        </Card>
      </BasicPage>
    );
  else
    return (
      <BasicPage
        title={service.name}
        narrow
        actions={actions}
        breadcrumbs={[{ label: "Base Services", route: "/services" }]}
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
            marginTop: "1rem",
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
                <EmployeePicker
                  allowMultiple
                  onChange={setDetailers}
                  defaultValue={detailers.map((i) => i.id)}
                />
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
        <Card
          title={
            <Typography.Text style={{ color: "red" }}>
              Danger Zone
            </Typography.Text>
          }
          style={{
            borderRadius: 5,
            backgroundColor: "#fff",
            marginTop: "1rem",
          }}
        >
          <Descriptions>
            <Descriptions.Item label="Remove Service">
              <Popconfirm
                onConfirm={async () => await removeServiceById(service.id)}
                title="Are you sure?"
                okText="Yes"
                cancelText="No"
              >
                <Button size="small" danger>
                  Delete
                </Button>
              </Popconfirm>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </BasicPage>
    );
}
