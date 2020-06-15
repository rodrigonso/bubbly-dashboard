import React, { useContext } from "react";
import BasicPage from "../common/BasicPage";
import { AuthContext } from "../../services/auth_service";
import { PageHeader } from "antd";

function OverviewPage(props) {
  const { currentUser } = useContext(AuthContext);
  return (
    <BasicPage>
      <PageHeader
        title={`Good afternoon, ${currentUser.displayName}`}
        style={{ padding: 0 }}
      />
    </BasicPage>
  );
}

export default OverviewPage;
