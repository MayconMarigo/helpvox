import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { MONTHS_THIS_YEAR, CHART_NO_DATA_TO_SHOW } from "utils/constants";
import { useEffect } from "react";
import { useState } from "react";
import { useUser } from "contexts/User/User";

export default function BasicLineChart({ dataToShow = [] }) {
  const [text, setText] = useState([]);
  const { user } = useUser();

  const getTextByTagName = () => setText(document.getElementsByTagName("text"));

  useEffect(() => {
    getTextByTagName();

    if (!text[0]) return;
    if (dataToShow) return;
    text[0].innerHTML = CHART_NO_DATA_TO_SHOW;
  }, [dataToShow]);

  const color = user.colorScheme ? `rgb(${user.colorScheme})` : "#5120bd";

  return (
    <LineChart
      colors={[color]}
      xAxis={[
        {
          scaleType: "band",
          data: MONTHS_THIS_YEAR,
        },
      ]}
      series={[
        {
          data: dataToShow,
        },
      ]}
      height={400}
    />
  );
}
