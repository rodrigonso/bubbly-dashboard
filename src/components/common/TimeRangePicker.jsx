import React from "react";
import { TimePicker } from "antd";
import moment from "moment";

const { RangePicker } = TimePicker;

export default function TimeRangePicker(props) {
  const handleRangeChange = (range, _) => {
    return props.onChange(range.map((i) => i._d));
  };

  return (
    <RangePicker
      format="hh:mm A"
      minuteStep={15}
      use12Hours
      allowClear={false}
      onChange={handleRangeChange}
      defaultValue={(props?.defaultValue ?? []).map((item) => moment(item))}
    />
  );
}
