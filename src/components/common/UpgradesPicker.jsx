import React from "react";
import { Select } from "antd";
import { useState, useEffect } from "react";
import { getUpgrades } from "../../services/db_service";

export default function UpgradesPicker(props) {
  const [upgrades, setUpgrades] = useState([]);

  useEffect(() => {
    getUpgrades().then((upgrades) => setUpgrades(upgrades));
  }, [props.vehicleType]);

  const handleSelection = (items) => {
    const temp = [];
    items.forEach(function (item) {
      const upgrade = upgrades.filter((el) => el.id === item)[0];
      temp.push(upgrade);
    });
    props.onChange(temp);
  };

  return (
    <Select
      defaultValue={props.defaultValue}
      mode="multiple"
      onChange={handleSelection}
    >
      {upgrades.map((item) => (
        <Select.Option key={item.id}>{item.name}</Select.Option>
      ))}
    </Select>
  );
}
