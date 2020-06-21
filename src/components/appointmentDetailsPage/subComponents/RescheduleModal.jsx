import React from "react";
import { useState } from "react";
import { Modal, TimePicker, Form } from "antd";
import { rescheduleAppointmentById } from "../../../services/db_service";
import TimeRangePicker from "../../common/TimeRangePicker";
import DatePicker from "../../common/DatePicker";

export default function RescheduleModal(props) {
  const { appointment, onOk, visible, onCancel } = props;
  const [loading, setLoading] = useState(false);
  const [newDate, setNewDate] = useState(appointment?.date);
  const [newRange, setNewRange] = useState([
    appointment?.startTime,
    appointment?.endTime,
  ]);

  const formatDate = (date) => {
    console.log(date);
    return new Date(date).getTime() / 1000;
  };

  const handleOK = async () => {
    // Add Validation logic for dates
    setLoading(true);

    await rescheduleAppointmentById(appointment.id, {
      date: formatDate(newDate),
      startTime: formatDate(newRange[0]),
      endTime: formatDate(newRange[1]),
    });
    setLoading(false);
    onOk();
  };

  const validDate = newDate && newRange;
  return (
    <Modal
      destroyOnClose
      okButtonProps={{ shape: "round", disabled: !validDate }}
      cancelButtonProps={{ shape: "round" }}
      title="Reschedule"
      visible={visible}
      onOk={handleOK}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Form>
        <Form.Item label="Date">
          <DatePicker onChange={setNewDate} />
        </Form.Item>
        <Form.Item label="Time">
          <TimeRangePicker onChange={setNewRange} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
