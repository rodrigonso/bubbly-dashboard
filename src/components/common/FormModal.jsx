import React from "react";
import PropTypes from "prop-types";
import { Modal, Input, Divider } from "antd";
import CustomForm from "../common/CustomForm";

export default function FormModal(props) {
  const { sections, title, visible, onCancel, onOk, loading } = props;

  return (
    <Modal
      destroyOnClose
      visible={visible}
      confirmLoading={loading}
      onCancel={onCancel}
      onOk={onOk}
      title={title}
      okButtonProps={{ shape: "round" }}
      cancelButtonProps={{ shape: "round" }}
    >
      {sections.map((section, i) => (
        <React.Fragment>
          <CustomForm fields={section} />
          {i !== sections.length - 1 ? <Divider /> : null}
        </React.Fragment>
      ))}
    </Modal>
  );
}

FormModal.propTypes = {
  loading: PropTypes.bool,
  visible: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  sections: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired,
  onOk: PropTypes.func.isRequired,
};
