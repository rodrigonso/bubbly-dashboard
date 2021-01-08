import React from "react";
import { Select, message } from "antd";
import { useState, useEffect } from "react";
import { getServicesByType } from "../../services/db_service";

export default function ServicePicker(props) {
  const [services, setServices] = useState([]);

  useEffect(() => {
    getServicesByType(props.type)
      .then((services) => {
        setServices(services);
        console.log(services);
      })
      .catch((err) => message.error(`Unable to retrieve services ${err}`));
  }, [props.type]);

  const handleChange = (id, _) => {
    const service = services.filter((el) => el.id === id)[0];
    props.onChange(service);
  };

  return (
    <Select defaultValue={props.defaultService} onChange={handleChange}>
      {services.map((item) => (
        <Select.Option key={item.id}>{item.name}</Select.Option>
      ))}
    </Select>
  );
}
