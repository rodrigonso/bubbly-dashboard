import React from "react";
import { Form } from "antd";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

export default function CustomForm(props) {
  return (
    <Form {...layout} name="basic">
      {props.fields.map((item) => {
        return (
          <Form.Item label={item.label} name={item.name}>
            {item.component}
          </Form.Item>
        );
      })}
    </Form>
  );
}
