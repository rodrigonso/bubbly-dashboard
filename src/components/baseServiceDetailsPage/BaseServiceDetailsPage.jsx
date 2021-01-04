import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import BasicPage from "../common/BasicPage";
import { getServiceById } from "../../services/db_service";
import { Card, Input } from "antd";
import CustomForm from "../common/CustomForm";
import Empty from "../common/Empty";

export default function BaseServiceDetailsPage(props) {
  const { id: serviceId } = props.location.state;

  const [loading, setLoading] = useState(true);
  const [service, setService] = useState(null);

  const [name, setName] = useState(null);
  const [desc, setDesc] = useState(null);

  useEffect(() => {
    getServiceById(serviceId).then((service) => {
      console.log(serviceId);
      setLoading(true);
      setService(service);
      setName(service.name);
      setDesc(service.desc);
      setLoading(false);
    });
  }, [serviceId]);

  const formItems = [
    {
      label: "Service Name",
      name: "service-name",
      component: (
        <Input initialValues={service?.name ?? ""} onChange={setName} />
      ),
    },
    {
      label: "Description",
      name: "desc",
      component: (
        <Input.TextArea
          initialValues={service?.desc ?? ""}
          onChange={setDesc}
        />
      ),
    },
  ];

  if (loading) {
    return <Empty />;
  } else
    return (
      <BasicPage>
        <Card
          title="General Info"
          style={{ borderRadius: 5, backgroundColor: "#fff" }}
        >
          <CustomForm fields={formItems} />
        </Card>
      </BasicPage>
    );
}
