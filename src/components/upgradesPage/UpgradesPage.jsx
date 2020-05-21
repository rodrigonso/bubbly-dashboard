import React from "react";
import BasicPage from "../common/BasicPage";
import { Divider, Button, Tabs, Row, Card, Col } from "antd";
import { useState, useEffect } from "react";
import { removeUpgrade, getUpgrades } from "../../services/db_service";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import UpgradeCard from "../common/UpgradeCard";
import NewUpgradeModal from "./subComponents/NewUpgradeModal";
import Spinner from "../common/Spinner";
import BigColumn from "../common/BigColumn";
import SmallColumn from "../common/SmallColumn";
import ColumnsLayout from "../common/ColumnsLayout";
import CustomSider from "../common/CustomSider";

export default function UpgradesPage(props) {
  const [upgrades, setUprades] = useState([]);
  const [modal, setModal] = useState(false);
  const [selected, setSelected] = useState([]);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    getUpgrades().then((services) => setUprades(services));
  }, []);

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
      await removeUpgrade(item.id);
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
    return selected.length > 1 ? (
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
          Upgrade
        </Button>
      );
  };
  return (
    <React.Fragment>
      <NewUpgradeModal
        modal={modal}
        onCancel={toggleModal}
        onOk={handleModalOk}
      />
      <BasicPage title="Upgrades" action={renderPageActions()}>
        <ColumnsLayout>
          <BigColumn>
            <Card
              bodyStyle={{ padding: 10 }}
              style={{
                borderRadius: 5,
                height: "74vh",
                maxHeight: "80vh",
              }}
            >
              <React.Fragment>
                {upgrades.length > 0 ? (
                  <Row>
                    {upgrades.map((item) => (
                      <UpgradeCard
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
              </React.Fragment>
            </Card>
          </BigColumn>
          <SmallColumn>
            <CustomSider type="upgrade" selectedData={selected[0]} />
          </SmallColumn>
        </ColumnsLayout>
      </BasicPage>
    </React.Fragment>
  );
}
