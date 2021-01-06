import React from "react";
import { useState } from "react";
import { Modal, Form, message } from "antd";
import { rescheduleAppointmentById } from "../../../services/db_service";
import TimeRangePicker from "../../common/TimeRangePicker";
import DatePicker from "../../common/DatePicker";

export default function RescheduleModal(props) {
  const { appointment, onOk, visible, onCancel } = props;
  const [loading, setLoading] = useState(false);
  const [newDate, setNewDate] = useState(appointment.date);
  const [newRange, setNewRange] = useState([
    appointment.startTime,
    appointment.endTime,
  ]);

  const formatDate = (date) => {
    console.log("FORMAT DATE: " + date);
    let res = new Date(date).getTime() / 1000;
    console.log("RES: " + res);
    return res;
    // return new Date(date).
  };

  const handleOK = async () => {
    // Add Validation logic for dates
    console.log(newRange);
    // setLoading(true);
    const dt1 = new Date(newRange[0]);
    const dt2 = new Date(newRange[1]);
    dt1.setDate(newDate?._d?.getDate() ?? newDate.getDate());
    dt2.setDate(newDate?._d?.getDate() ?? newDate.getDate());

    try {
      const dt = new Date(newDate);
      const startTime = formatDate(
        new Date(
          dt.getFullYear(),
          dt.getMonth(),
          dt.getDate(),
          dt1.getHours(),
          dt1.getMinutes()
        )
      );
      const endTime = formatDate(
        new Date(
          dt.getFullYear(),
          dt.getMonth(),
          dt.getDate(),
          dt2.getHours(),
          dt2.getMinutes()
        )
      );

      await rescheduleAppointmentById(appointment.id, {
        date: formatDate(newDate),
        startTime,
        endTime,
      });
      setLoading(false);
      message.success("Appointment rescheduled succesfully");
      onOk();
    } catch (ex) {
      message.error(ex.message);
    }
    setLoading(false);
  };

  const isValidDate = newDate && newRange;
  return (
    <Modal
      destroyOnClose
      okButtonProps={{ disabled: !isValidDate }}
      title="Reschedule"
      visible={visible}
      onOk={handleOK}
      onCancel={onCancel}
      confirmLoading={loading}
    >
      <Form>
        <Form.Item label="Date">
          <DatePicker onChange={setNewDate} appointment={appointment} />
        </Form.Item>
        <Form.Item label="Time">
          <TimeRangePicker onChange={setNewRange} appointment={appointment} />
        </Form.Item>
      </Form>
    </Modal>
  );
}
