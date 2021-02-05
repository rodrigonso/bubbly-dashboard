import React, { useState } from "react";
import { Modal, Divider, Checkbox, message, Typography, Form } from "antd";
import CustomForm from "../../common/CustomForm";
import TimeRangePicker from "../../common/TimeRangePicker";
import DatePicker from "../../common/DatePicker";

import EmployeePicker from "../../common/EmployeePicker";
import { ScheduleApi } from "../../../api/scheduleApi";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";

export default function NewBlockedTimeModal(props) {
  const { selectedDate, visible, onCancel, onOk } = props;
  const [range, setRange] = useState([]);
  const [date, setDate] = useState(moment(selectedDate) ?? moment());
  const [duration, setDuration] = useState(0);
  const [loading, setLoading] = useState(false);
  const [detailer, setDetailer] = useState(null);

  const handleDateChange = (date) => {
    setDate(date);
    if (range.length > 0) {
      const startTime = date.clone().set({
        hour: range[0].hours(),
        minute: range[0].minutes(),
      });
      const endTime = date.clone().set({
        hour: range[1].hours(),
        minute: range[1].minutes(),
      });
      setRange([startTime, endTime]);
    }
  };

  const handleRangeChange = (range) => {
    console.log(range);
    // console.log(date.format("LLL"));
    const startTime = date.clone().set({
      hour: range[0].hours(),
      minute: range[0].minutes(),
    });
    const endTime = date.clone().set({
      hour: range[1].hours(),
      minute: range[1].minutes(),
    });
    console.log(startTime, endTime);
    setRange([startTime, endTime]);
  };

  const fields = [
    {
      name: "detailer",
      label: "Detailer",
      component: (
        <EmployeePicker allowMultiple={false} onChange={setDetailer} />
      ),
    },
  ];

  const fields2a = [
    {
      name: "date",
      label: "Date",
      component: <DatePicker onChange={handleDateChange} />,
    },
    {
      name: "time",
      label: "Time",
      component: <TimeRangePicker onChange={handleRangeChange} />,
    },
  ];

  const isFormValid = () => {
    return date && duration && range.length === 2 && detailer;
  };

  const handleNewBlockedTime = async () => {
    // if (!isFormValid()) {
    //   message.error("All fields are required");
    //   return;
    // }

    const blockedTime = {
      id: uuidv4(),
      active: false,
      customer: null,
      address: null,
      status: "BLOCKED_TIME",
      subtotal: null,
      total: null,
      notes: null,
      tip: null,
      date: date.unix(),
      startTime: range[0].unix(),
      endTime: range[1].unix(),
      employeeId: detailer?.id,
      paymentStatus: null,
      service: { name: "Blocked Time" },
      upgrades: null,
      vehicle: null,
      duration: null,
    };

    console.log(blockedTime);

    try {
      setLoading(true);
      // await bookNewAppointment({ options, order });
      await ScheduleApi.newBlockedTime(blockedTime);

      onOk();
      message.success(" booked successfully");
    } catch (ex) {
      message.error(ex.message);
    }
    setLoading(false);
  };

  return (
    <Modal
      destroyOnClose
      title="New Appointment"
      visible={visible}
      okButtonProps={{ loading }}
      onOk={handleNewBlockedTime}
      onCancel={onCancel}
    >
      <CustomForm fields={fields} />
      <Divider />
      <CustomForm fields={fields2a} />
    </Modal>
  );
}
