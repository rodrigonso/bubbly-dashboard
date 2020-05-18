import React from "react";
import BasicPage from "../common/BasicPage";
import { PageHeader } from "antd";

export default function OverviewPage(props) {
  return (
    <BasicPage>
      <PageHeader title="Overview" style={{ padding: 0 }} />
    </BasicPage>
  );
}
