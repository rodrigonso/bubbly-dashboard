import React from "react";
import BasicPage from "../common/BasicPage";
import { Divider, Button, Tabs, Row, Card } from "antd";
import { useState, useEffect } from "react";
import { getServicesByType, removeService } from "../../services/db_service";
import NewServiceModal from "./subComponents/NewServiceModal";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ServiceCard from "../common/ServiceCard";
import Spinner from "../common/Spinner";

const { TabPane } = Tabs;

export default function ServicesPage(props) {
  const [services, setServices] = useState([]);
  const [tab, setCurrentTab] = useState("non-sedan");
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getServicesByType(tab).then((services) => setServices(services));
  }, [tab]);

  const toggleModal = () => {
    setModal(!modal);
  };

  const handleSelection = (item) => {
    const arr = [...selected];
    if (arr.includes(item)) {
      const temp = arr.filter((el) => el.id !== item.id);
      setSelected(temp);
    } else {
      arr.push(item);
      setSelected(arr);
    }
  };

  const handleDeletion = async () => {
    setBusy(true);
    for (const item of selected) {
      await removeService(item.id);
    }
    setBusy(false);
    window.location.reload();
  };

  const isSelected = (item) => {
    return selected.includes(item);
  };

  const handleModalOk = () => {
    toggleModal();
    window.location.reload();
  };

  const renderPageActions = () => {
    return selected.length > 0 ? (
      <Button
        shape="round"
        loading={busy}
        onClick={handleDeletion}
        icon={<DeleteOutlined />}
        type="danger"
      >
        Delete
      </Button>
    ) : (
      <Button
        shape="round"
        icon={<PlusOutlined />}
        onClick={toggleModal}
        type="primary"
      >
        Service
      </Button>
    );
  };
  return (
    <React.Fragment>
      <NewServiceModal
        modal={modal}
        onCancel={toggleModal}
        onOk={handleModalOk}
      />
      <BasicPage title="Services" action={renderPageActions()}>
        <Card
          bodyStyle={{ padding: "5px 20px 10px 20px" }}
          style={{ borderRadius: 5, minHeight: "60vh" }}
        >
          <Tabs defaultActiveKey="1" onChange={setCurrentTab}>
            <TabPane key={"non-sedan"} tab="Non-Sedan">
              {services.length > 0 ? (
                <Row>
                  {services.map((item) => (
                    <ServiceCard
                      key={item.id}
                      selected={isSelected(item)}
                      onClick={handleSelection}
                      item={item}
                    />
                  ))}
                </Row>
              ) : (
                <Spinner />
              )}
            </TabPane>
            <TabPane key={"sedan"} tab="Sedan">
              {services.length > 0 ? (
                <Row>
                  {services.map((item) => (
                    <ServiceCard
                      key={item.id}
                      selected={isSelected(item)}
                      onClick={handleSelection}
                      item={item}
                    />
                  ))}
                </Row>
              ) : (
                <Spinner />
              )}
            </TabPane>
          </Tabs>
        </Card>
      </BasicPage>
    </React.Fragment>
  );
}
