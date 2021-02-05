import React, { useEffect, useState } from "react";
import moment from "moment";

import BasicPage from "../common/BasicPage.jsx";
import Schedule from "./subComponents/Schedule.jsx";
import DetailedView from "./subComponents/DetailedView.jsx";
import { getAppointments } from "../../services/db_service.js";
import withModal from "../hoc/withModal";
import NewAppointmentModal from "./subComponents/NewAppointmentModal.jsx";
import { Button, Dropdown, Menu } from "antd";
import { BlockOutlined, PlusOutlined } from "@ant-design/icons";
import NewBlockedTimeModal from "./subComponents/NewBlockedTimeModal.jsx";

function SchedulePage(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [query, setQuery] = useState("");
  const [modalMode, setModalMode] = useState("APPOINTMENT");

  useEffect(() => {
    getAppointments(selectedDate).then((appts) => {
      console.log(appts.length);
      setLoading(true);
      setAppointments(appts);
      setLoading(false);
    });
  }, [selectedDate]);

  const fetchAppointments = async () => {
    getAppointments(selectedDate).then((appointments) => {
      setLoading(true);
      setAppointments(appointments);
      setLoading(false);
    });
  };

  const handleSearch = (query) => {
    setQuery(query);
  };

  const handleDateSelect = async (val) => {
    const dt = val._d;
    setSelectedDate(dt);

    if (
      moment(dt).month() !== moment(selectedDate).month() ||
      moment(dt).year() !== moment(selectedDate).year()
    ) {
      await fetchAppointments();
    }
  };

  const searchAppointment = () => {
    return appointments.filter((el) =>
      el.customer.toString().toLowerCase().includes(query.toLowerCase())
    );
  };

  const toggleModal = (mode) => {
    setModalMode(mode);
    props.toggleModal();
  };

  return (
    <React.Fragment>
      <NewAppointmentModal
        visible={props.visible && modalMode === "APPOINTMENT"}
        onOk={() => toggleModal("APPOINTMENT")}
        onCancel={() => toggleModal("APPOINTMENT")}
        selectedDate={selectedDate}
      />
      <NewBlockedTimeModal
        visible={props.visible && modalMode === "BLOCKED_TIME"}
        onOk={() => toggleModal("BLOCKED_TIME")}
        onCancel={() => toggleModal("BLOCKED_TIME")}
        selectedDate={selectedDate}
      />
      <BasicPage
        title="Schedule"
        actions={[
          <Dropdown.Button
            onClick={() => toggleModal("APPOINTMENT")}
            overlay={
              <Menu>
                <Menu.Item onClick={() => toggleModal("BLOCKED_TIME")} key="1">
                  New blocked time
                </Menu.Item>
              </Menu>
            }
            type="primary"
          >
            <PlusOutlined /> Appointment
          </Dropdown.Button>,
        ]}
      >
        <div className="flexbox-2" style={{ display: "flex" }}>
          <div className="row-1" style={{ flexBasis: "70%" }}>
            <Schedule
              {...props}
              appointments={appointments}
              selectedDate={selectedDate}
              handleDateSelect={handleDateSelect}
              handleSearch={handleSearch}
              handleRefresh={fetchAppointments}
              loading={loading}
            />
          </div>
          <div
            className="row-2"
            style={{
              flexBasis: "30%",
              marginLeft: 20,
            }}
          >
            <DetailedView
              {...props}
              title={query}
              appointments={
                query.length > 0 ? searchAppointment() : appointments
              }
              selectedDate={selectedDate}
            />
          </div>
        </div>
      </BasicPage>
    </React.Fragment>
  );
}

export default withModal()(SchedulePage);
