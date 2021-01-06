import React from "react";
import { TimePicker } from "antd";
import moment from "moment";

const { RangePicker } = TimePicker;

export default function TimeRangePicker(props) {
  // const formatDate = (date) => {

  //   return moment(date).format("YYYY-MM-DDTHH:mm:ss");
  // };

  const handleRangeChange = (range, _) => {
    // const newRange = range.map((item) => formatDate(item));
    console.log(range);
    return props.onChange(range);
  };

  return (
    <RangePicker
      format="hh:mm A"
      minuteStep={15}
      use12Hours
      allowClear={false}
      onChange={handleRangeChange}
      defaultValue={[
        props.appointment ? moment(props.appointment.startTime) : null,
        props.appointment ? moment(props.appointment.endTime) : null,
      ]}
    />
  );
}
