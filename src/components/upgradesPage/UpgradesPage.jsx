import React from "react";
import BasicPage from "../common/BasicPage";
import { Button, Row, Card } from "antd";
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
import withModal from "../hoc/withModal";

function UpgradesPage(props) {
  const [upgrades, setUpgrades] = useState([]);
  const [selected, setSelected] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getUpgrades().then((upgrades) => setUpgrades(upgrades));
  }, []);

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
      await removeUpgrade(item.id);
    }
    setLoading(false);
    // Fetch data
  };

  const isSelected = (item) => {
    return selected.includes(item);
  };

  const handleModalOk = () => {
    // Fetch data
    props.toggleModal();
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
        onClick={props.toggleModal}
        type="primary"
      >
        Upgrade
      </Button>
    );
  };
  return (
    <React.Fragment>
      <NewUpgradeModal
        visible={props.visible}
        onCancel={props.toggleModal}
        onOk={handleModalOk}
      />
      <BasicPage title="Upgrades" action={renderPageActions()}>
        <ColumnsLayout>
          <BigColumn>
            <Card
              bodyStyle={{ padding: 10 }}
              style={{
                borderRadius: 5,
                height: "80vh",
                // maxHeight: "80vh",
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
            <CustomSider
              type="upgrades"
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

export default withModal()(UpgradesPage);
