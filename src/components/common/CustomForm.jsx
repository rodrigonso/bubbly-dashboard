import React from "react";
import { Form, Input } from "antd";

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 12 },
};

export default function CustomForm(props) {
  const renderField = (item) => {
    if (item.component) return item.component;
    if (item.isPassword)
      return <Input.Password onChange={props.handleChange} />;
    else return <Input onChange={props.handleChange} />;
  };
  return (
    <Form {...layout} name="basic">
      {props.fields.map((item) => {
        return (
          <Form.Item label={item.label} name={item.name}>
            {renderField(item)}
          </Form.Item>
        );
      })}
    </Form>
  );
}
