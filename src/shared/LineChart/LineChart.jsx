import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import {
  MONTHS_THIS_YEAR,
  CHART_NO_DATA_TO_SHOW,
  months,
} from "utils/constants";
import { useEffect } from "react";
import { useState } from "react";
import { useUser } from "contexts/User/User";

export default function BasicLineChart({ firstLabel = [], secondLabel = [] }) {
  const [text, setText] = useState([]);
  const { user } = useUser();

  const getTextByTagName = () => setText(document.getElementsByTagName("text"));

  useEffect(() => {
    getTextByTagName();

    if (!text[0]) return;
    if (firstLabel) return;
    text[0].innerHTML = CHART_NO_DATA_TO_SHOW;
  }, [firstLabel]);

  const color = user.colorScheme ? `rgb(${user.colorScheme})` : "#183088";

  const formattedSecondLabel = (values) => {
    const total = months.map((month) => {
      const finder = values.find((label) => label.month == month.value - 1);
      if (finder) {
        // console.log(finder);
        return finder.minutes_count;
      }

      return 0;
    });

    return total;
  };

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
          data: firstLabel,
          label: "Atendimentos",
          color: "#000",
        },
        {
          data: formattedSecondLabel(secondLabel),
          label: "Minutagem total",
        },
      ]}
      height={400}
    />
  );
}
