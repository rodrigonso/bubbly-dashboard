import React, { useState } from "react";
import PropTypes from "prop-types";

const withModal = (props) => (WrappedComponent) => (moreProps) => {
  const [visible, setVisible] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const toggle = () => setVisible(!visible);
  const toggle2 = () => setVisible2(!visible);

  return (
    <WrappedComponent
      {...moreProps}
      visible={visible}
      visible2={props?.double ? visible2 : null}
      toggleModal={toggle}
      toggleModal2={props?.double ? toggle2 : null}
    />
  );
};

withModal.propTypes = {};
export default withModal;
