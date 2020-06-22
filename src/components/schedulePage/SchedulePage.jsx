import React, { useEffect, useState } from "react";
import moment from "moment";

import BasicPage from "../common/BasicPage.jsx";
import Schedule from "./subComponents/Schedule.jsx";
import DetailedView from "./subComponents/DetailedView.jsx";
import { getAppointments } from "../../services/db_service.js";

function SchedulePage(props) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    getAppointments(selectedDate).then((appts) => {
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
      el.customer.formatName().toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <BasicPage title="Schedule">
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
            appointments={query.length > 0 ? searchAppointment() : appointments}
            selectedDate={selectedDate}
          />
        </div>
      </div>
    </BasicPage>
  );
}

export default SchedulePage;
