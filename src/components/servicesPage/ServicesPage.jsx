import React from "react";
import BasicPage from "../common/BasicPage";
import { Divider, Button, Tabs, Row, Card } from "antd";
import { useState, useEffect } from "react";
import {
  getServicesByType,
  removeService,
  getServices,
} from "../../services/db_service";
import NewServiceModal from "./subComponents/NewServiceModal";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ColumnsLayout from "../common/ColumnsLayout";
import BigColumn from "../common/BigColumn";
import SmallColumn from "../common/SmallColumn";
import ServiceCard from "../common/ServiceCard";
import CustomSider from "../common/CustomSider";
import Spinner from "../common/Spinner";
import Empty from "../common/Empty";

const { TabPane } = Tabs;

export default function ServicesPage(props) {
  const [services, setServices] = useState([]);
  const [tab, setCurrentTab] = useState("non-sedan");
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getServices().then((services) => {
      const byType = services.filter((el) => el.type === tab);
      setServices(byType);
    });
    setLoading(false);
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
    setLoading(true);
    for (const item of selected) {
      await removeService(item.id);
    }
    setLoading(false);
    window.location.reload();
  };

  const isSelected = (item) => {
    return selected.includes(item);
  };

  const handleModalOk = () => {
    toggleModal();
    window.location.reload();
  };

  const handleTabChange = (type) => {
    setCurrentTab(type);
  };

  const renderPageActions = () => {
    return selected.length > 1 ? (
      <Button
        shape="round"
        loading={loading}
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
        <ColumnsLayout>
          <BigColumn>
            <Card
              bodyStyle={{ padding: "0px 10px 0px 15px" }}
              style={{ borderRadius: 5, minHeight: "60vh" }}
            >
              <Tabs defaultActiveKey="1" onChange={handleTabChange}>
                <TabPane key={"non-sedan"} tab="Non-Sedan">
                  {!loading ? (
                    services.length > 0 ? (
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
                      <div style={{ height: "55vh" }}>
                        <Empty />
                      </div>
                    )
                  ) : (
                    <Spinner />
                  )}
                </TabPane>
                <TabPane key={"sedan"} tab="Sedan">
                  {!loading ? (
                    services.length > 0 ? (
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
                      <div style={{ height: "55vh" }}>
                        <Empty />
                      </div>
                    )
                  ) : (
                    <Spinner />
                  )}
                </TabPane>
              </Tabs>
            </Card>
          </BigColumn>
          <SmallColumn>
            <CustomSider
              type="service"
              selectedData={selected[0]}
              onDataDelete={handleDeletion}
              loading={loading}
            />
          </SmallColumn>
        </ColumnsLayout>
      </BasicPage>
    </React.Fragment>
  );
}
