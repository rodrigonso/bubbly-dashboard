import React from "react";
import { Card, Rate } from "antd";

export default function UserPaymentInfo(props) {
  const { employee } = props;

  const calculateRating = () => {
    const ratings = [0, 1, 2, 3, 4, 5];

    let average = 0;
    let weights = 0;
    for (let rate in ratings) {
      average = average + employee.ratings[rate] * rate;
      weights = weights + employee.ratings[rate];
    }
    average = average / weights;
    console.log(Math.round(average * 2) / 2);
    return Math.round(average * 2) / 2;
  };

  return (
    <Card bordered={false} bodyStyle={{ padding: 0 }}>
      <p style={{ fontWeight: 600 }}>Rating</p>
      <Rate disabled value={calculateRating()} allowHalf />
    </Card>
  );
}
