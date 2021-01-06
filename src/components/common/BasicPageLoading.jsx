import React from "react";
import BasicPage from "../common/BasicPage";
import BigColumn from "../common/BigColumn";
import SmallColumn from "../common/SmallColumn";
import ColumnsLayout from "../common/ColumnsLayout";
import { Card, Skeleton } from "antd";

export default function BasicPageLoading(props) {
  return (
    <BasicPage>
      <ColumnsLayout>
        <BigColumn>
          <Card
            style={{
              borderRadius: 5,
              height: "80vh",
            }}
          >
            <Skeleton active />
          </Card>
        </BigColumn>
        <SmallColumn>
          <Card style={{ borderRadius: 5, height: "80vh" }}>
            <Skeleton active />
          </Card>
        </SmallColumn>
      </ColumnsLayout>
    </BasicPage>
  );
}
