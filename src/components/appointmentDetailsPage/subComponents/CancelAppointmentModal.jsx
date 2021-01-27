import React, { useState } from "react";
import moment from "moment";
import {
  Modal,
  Checkbox,
  Form,
  Typography,
  Divider,
  InputNumber,
  Tooltip,
  Input,
  message,
} from "antd";
import CustomForm from "../../common/CustomForm";
import { ScheduleApi } from "../../../api/scheduleApi";
import { withRouter } from "react-router-dom";

function CancelAppointmentModal(props) {
  const { appointment } = props;

  const shouldAllowRefund = () => {
    return appointment.paymentStatus === "PAID";
  };

  const [loading, setLoading] = useState(false);
  const [sendCancellationEmail, setSendCancellationEmail] = useState(false);
  const [issueRefund, setIssueRefund] = useState(false);
  const [refundReason, setRefundReason] = useState("");
  const [refundAmount, setRefundAmount] = useState(
    shouldAllowRefund() ? appointment.total : 0
  );

  const refundFields = [
    {
      name: "amount",
      label: "Amount",
      component: (
        <InputNumber
          min={0}
          max={props.appointment.total}
          formatter={(value) =>
            `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
          }
          parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
          defaultValue={refundAmount}
        />
      ),
    },
    {
      name: "reason",
      label: "Reason",
      component: (
        <Input.TextArea
          onChange={(e) => setRefundReason(e.target.value)}
          rows={2}
        />
      ),
    },
  ];

  const handleOk = async () => {
    setLoading(true);
    const options = {
      refundAmount,
      refundReason,
      sendCancellationEmail,
    };
    try {
      await ScheduleApi.cancelAppointment({ options, appointment });
      props.history.goBack();
      message.success("Appointment cancelled with success!");
    } catch (ex) {
      console.log(ex);
      message.error("Something went wrong: ", ex.message);
    }
    setLoading(false);
  };

  return (
    <Modal
      destroyOnClose
      confirmLoading={loading}
      visible={props.visible}
      onOk={handleOk}
      onCancel={props.onCancel}
      cancelText="Go back"
      okButtonProps={{ danger: true }}
      okText="Yes, cancel appointment"
      title="Cancel Appointment"
    >
      <Typography.Text>
        You're about to cancel {appointment.service.name} for
        {" " + appointment.customer.toString()} on{" "}
        {moment(appointment.startTime).format("LLL")}
      </Typography.Text>
      <Divider />
      <Form>
        <Form.Item>
          <div style={{ width: "75%" }}>
            <Checkbox
              onClick={(e) => setSendCancellationEmail(e.target.checked)}
            />
            <Typography.Text style={{ marginLeft: "1rem" }}>
              Send cancellation email
            </Typography.Text>
          </div>
        </Form.Item>
        <Divider />
        <Form.Item>
          <div style={{ width: "75%" }}>
            <Tooltip
              title={`Payment status: ${
                appointment.paymentStatus === "NOT_PAID" ? "Not paid" : "Paid"
              }`}
            >
              <Checkbox
                onClick={(e) => setIssueRefund(e.target.checked)}
                disabled={setRefundReason}
              />
              <Typography.Text style={{ marginLeft: "1rem" }}>
                Issue refund
              </Typography.Text>
            </Tooltip>
          </div>
        </Form.Item>
        {issueRefund ? <CustomForm fields={refundFields} /> : null}
      </Form>
    </Modal>
  );
}

export default withRouter(CancelAppointmentModal);
