import React from "react";
import { Select } from "antd";
import { useState, useEffect } from "react";
import { getServicesByType } from "../../services/db_service";

export default function ServicePicker(props) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServicesByType(props.vehicleType).then((services) =>
      setServices(services)
    );
  }, [props.vehicleType]);

  const handleChange = (id, _) => {
    const service = services.filter((el) => el.id === id)[0];
    props.onChange(service);
  };

  return (
    <Select onChange={handleChange}>
      {services.map((item) => (
        <Select.Option key={item.id}>{item.name}</Select.Option>
      ))}
    </Select>
  );
}
