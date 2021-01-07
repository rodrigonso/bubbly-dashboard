import React from "react";
import BasicPage from "../common/BasicPage";
import { Button, Tabs, List, Card } from "antd";
import { useState, useEffect } from "react";
import { removeServiceById, getServices } from "../../services/db_service";
import NewServiceModal from "./subComponents/NewServiceModal";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import ColumnsLayout from "../common/ColumnsLayout";
import BigColumn from "../common/BigColumn";
import SmallColumn from "../common/SmallColumn";
import ServiceCard from "../common/ServiceCard";
import CustomSider from "../common/CustomSider";
import Spinner from "../common/Spinner";
import Empty from "../common/Empty";
import withModal from "../hoc/withModal";
import BasicPageLoading from "../common/BasicPageLoading";

const { TabPane } = Tabs;

function BaseServicesPage(props) {
  const [services, setServices] = useState([]);
  const [tab, setCurrentTab] = useState("non-sedan");
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = (tab) => {
    setLoading(true);
    getServices().then((services) => {
      setServices(services);
      setLoading(false);
    });
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
      await removeServiceById(item.id);
    }
    setLoading(false);
    await fetchServices();
  };

  const isSelected = (item) => {
    return selected.includes(item);
  };

  const handleModalOk = async () => {
    props.toggleModal();
    await fetchServices();
  };

  const handleTabChange = async (type) => {
    setCurrentTab(type);
    setSelected([]);
  };

  const filterServices = () => {
    return services.filter((el) => el.type === tab);
  };

  const renderPageActions = () => {
    return selected.length > 1 ? (
      <Button
        loading={loading}
        onClick={handleDeletion}
        icon={<DeleteOutlined />}
        type="danger"
      >
        Delete
      </Button>
    ) : (
      <Button
        icon={<PlusOutlined />}
        onClick={props.toggleModal}
        type="primary"
      >
        Service
      </Button>
    );
  };

  const filtered = filterServices();
  if (loading) return <BasicPageLoading />;
  else
    return (
      <React.Fragment>
        <NewServiceModal
          visible={props.visible}
          onCancel={props.toggleModal}
          onOk={handleModalOk}
        />
        <BasicPage title="Services" action={renderPageActions()}>
          <ColumnsLayout>
            <BigColumn>
              <Card
                bodyStyle={{ padding: "0px 10px 0px 15px" }}
                style={{
                  borderRadius: 5,
                  height: "80vh",
                }}
              >
                <Tabs defaultActiveKey="non-sedan" onChange={handleTabChange}>
                  <TabPane key={"non-sedan"} tab="Non-Sedan">
                    {!loading ? (
                      filtered.length > 0 ? (
                        <React.Fragment>
                          <div style={{ display: "flex" }}>
                            {filtered.map((item) => (
                              <ServiceCard
                                key={item.id}
                                selected={isSelected(item)}
                                onClick={handleSelection}
                                item={item}
                              />
                            ))}
                          </div>
                        </React.Fragment>
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
                      filtered.length > 0 ? (
                        <List
                          grid={{ gutter: 8, column: 2 }}
                          dataSource={filtered}
                          renderItem={(item) => (
                            <List.Item>
                              <ServiceCard
                                key={item.id}
                                selected={isSelected(item)}
                                onClick={handleSelection}
                                item={item}
                              />
                            </List.Item>
                          )}
                        />
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
                type="base-services"
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

export default withModal()(BaseServicesPage);
