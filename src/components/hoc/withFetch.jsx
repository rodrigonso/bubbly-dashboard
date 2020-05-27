import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

const withFetch = (props) => (WrappedComponent) => (moreProps) => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => fetchData(), []);

  const fetchData = () => {
    props.fetch().then((data) => {
      setData(data);
      setLoading(false);
    });
  };

  return (
    <WrappedComponent
      {...moreProps}
      loading={loading}
      refresh={fetchData}
      data={data}
    />
  );
};

withFetch.propTypes = {
  fetch: PropTypes.func.isRequired,
};

export default withFetch;
