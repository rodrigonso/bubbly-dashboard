import React from "react";
import BasicPage from "../common/BasicPage";
import { Card, Divider, Typography, Button, Tabs } from "antd";
import { useState, useEffect } from "react";
import { getServices } from "../../services/db_service";
import NewServiceModal from "./subComponents/NewServiceModal";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export default function ServicesPage() {
  const [services, setServices] = useState([]);
  const [tab, setCurrentTab] = useState(1);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    getServices().then((services) => setServices(services));
  }, []);

  return (
    <React.Fragment>
      <NewServiceModal modal={modal} onCancel={() => setModal(!modal)} />
      <BasicPage
        title="Services"
        action={
          <Button onClick={() => setModal(!modal)} type="primary">
            New Service
          </Button>
        }
      >
        <Divider style={{ margin: "10px 10px 0px 0px" }} />
        <Tabs defaultActiveKey="1" onChange={setCurrentTab}>
          <TabPane key={1} tab="Base Services"></TabPane>
          <TabPane key={2} tab="Upgrades"></TabPane>
        </Tabs>
        {services.map((item) => (
          <Card style={{ maxWidth: "350px" }}>
            <Title level={4}>{item.name}</Title>
            <Text type="secondary">{item.desc}</Text>
            <br />
            <Text>{`$${item.price}`}</Text>
          </Card>
        ))}
      </BasicPage>
    </React.Fragment>
  );
}
