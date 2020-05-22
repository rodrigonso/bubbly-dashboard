import React from "react";
import BasicPage from "../common/BasicPage";
import { PageHeader } from "antd";

function OverviewPage(props) {
  return (
    <BasicPage>
      <PageHeader title="Overview" style={{ padding: 0 }} />
    </BasicPage>
  );
}

export default OverviewPage;
