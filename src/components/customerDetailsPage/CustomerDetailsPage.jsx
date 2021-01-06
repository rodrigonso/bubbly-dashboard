import React, { useEffect, useState } from "react";
import BasicPage from "../common/BasicPage";
import {
  Image,
  Card,
  Divider,
  Skeleton,
  Descriptions,
  Row,
  Col,
  Checkbox,
  Typography,
  Tabs,
} from "antd";
import { getCustomerById } from "../../services/db_service";
import Empty from "../common/Empty";

export default function CustomerDetailsPage(props) {
  const { data: customerId } = props.location.state;

  const [loading, setLoading] = useState(true);
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    getCustomerById(customerId).then((customer) => {
      console.log(customerId);
      setLoading(true);
      setCustomer(customer);
      setLoading(false);
    });
  }, [customerId]);

  const getStaticMap = (address) => {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${
      address.coords.latitude
    },${
      address.coords.longitude
    }&zoom=16&scale=2&size=${300}x${100}&maptype=roadmap&key=${
      process.env.REACT_APP_GOOGLE_MAPS_API
    }&format=png&visual_refresh=true&markers=icon:https://rb.gy/dh5je3%7Cshadow:false%7C${
      address.coords.latitude
    },${address.coords.longitude}`;
  };

  if (loading)
    return (
      <BasicPage>
        <div style={{ marginBottom: 20 }}>
          <Skeleton title={{ width: "30%" }} paragraph={false} active={true} />
        </div>
        <Card>
          <Skeleton
            title={{ width: "20%" }}
            paragraph={{
              width: ["30%", "30%", "40%", "35%", "40%"],
              rows: 5,
            }}
          />
          <div style={{ marginTop: 40, marginBottom: 40 }}>
            <Skeleton
              paragraph={false}
              title={{ width: ["40%"] }}
              active={true}
            />
          </div>
          <Skeleton
            paragraph={false}
            title={{ width: ["55%"] }}
            active={true}
          />
        </Card>
      </BasicPage>
    );
  else
    return (
      <BasicPage>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div style={{ width: "33.3%" }}>
            <Card
              style={{ backgroundColor: "#fff", borderRadius: 5 }}
              bodyStyle={{ padding: 20, textAlign: "center" }}
            >
              <Image
                src={customer.profileUrl ?? "error"}
                width={200}
                height={200}
                preview="false"
                fallback="data:image/png;base64,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"
                style={{ borderRadius: "200px", margin: "auto" }}
              />
              <Divider />
              <h4 style={{ fontWeight: "bold", textAlign: "left" }}>
                Basic Details
              </h4>
              <Descriptions column={1}>
                <Descriptions.Item label="Name">
                  {customer.toString()}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {customer.email}
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  {customer.phone}
                </Descriptions.Item>
                <Descriptions.Item label="Square ID">
                  {customer.customerId}
                </Descriptions.Item>
              </Descriptions>
              <div>
                <Divider
                  type="vertical"
                  style={{ height: "100%", marginTop: 2.5 }}
                />
              </div>
            </Card>
          </div>
          <div style={{ width: "75%", marginLeft: 10 }}>
            <Card
              bodyStyle={{ padding: "0px 10px 0px 15px" }}
              style={{ borderRadius: 5 }}
            >
              <Tabs
                defaultActiveKey="addresses"
                onChange={() => console.log("change tabs")}
              >
                <Tabs.TabPane key="addresses" tab="Addresses">
                  <Row>
                    {customer.addresses.length > 0 ? (
                      customer.addresses.map((item) => (
                        <Card
                          style={{
                            width: "48.5%",
                            margin: "0px 10px 10px 0px",
                            borderRadius: 5,
                          }}
                          bodyStyle={{ padding: 10 }}
                          onClick={() => console.log(item)}
                        >
                          <Row justify="space-between">
                            <Col>
                              <Image
                                preview={false}
                                src={getStaticMap(item)}
                              ></Image>
                            </Col>
                            <Col>
                              <p
                                style={{
                                  fontWeight: 700,
                                  fontSize: 16,
                                  marginBottom: 5,
                                  marginTop: 10,
                                }}
                              >
                                {`${item.street}`}
                              </p>
                            </Col>
                          </Row>
                          <Col justify="space-between">
                            <div
                              style={{
                                textOverflow: "elipsis",
                              }}
                            >
                              <Typography.Text type="secondary">{`${item.city}, ${item.state}`}</Typography.Text>
                            </div>
                          </Col>
                        </Card>
                      ))
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <Empty
                          desc="No addresses saved"
                          style={{ margin: "auto" }}
                        />
                      </div>
                    )}
                  </Row>
                </Tabs.TabPane>
                <Tabs.TabPane key="vehicles" tab="Vehicles">
                  <Row>
                    {customer.vehicles.length > 0 ? (
                      customer.vehicles.map((item) => (
                        <Card
                          style={{
                            width: "31.75%",
                            margin: "0px 10px 10px 0px",
                            borderRadius: 5,
                          }}
                          bodyStyle={{ padding: 10 }}
                          onClick={() => console.log(item)}
                        >
                          <Row justify="space-between">
                            <Col>
                              <p
                                style={{
                                  fontWeight: 700,
                                  fontSize: 16,
                                  marginBottom: 5,
                                }}
                              >
                                {`${item.make} ${item.model}`}
                              </p>
                            </Col>
                            <Col>
                              <Checkbox checked={false} />
                            </Col>
                          </Row>
                          <Col justify="space-between">
                            <div
                              style={{
                                textOverflow: "elipsis",
                              }}
                            >
                              <Typography.Text type="secondary">
                                {item.type === "SEDAN" ? "Sedan" : "Non-Sedan"}
                              </Typography.Text>
                            </div>
                          </Col>
                        </Card>
                      ))
                    ) : (
                      <div style={{ textAlign: "center" }}>
                        <Empty
                          desc="No vehicles saved"
                          style={{ margin: "auto" }}
                        />
                      </div>
                    )}
                  </Row>
                </Tabs.TabPane>
              </Tabs>
            </Card>
          </div>
        </div>
      </BasicPage>
    );
}
