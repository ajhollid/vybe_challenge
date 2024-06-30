// @ts-ignore
import React, { useState, useEffect } from "react";
import TpsData from "../types/TpsData";
import axios from "axios";
import ChartData from "../types/ChartData";
import CustomChart from "../components/CustomChart/CustomChart";

import ENV_VARS from "../utils/env";

const MINS_OF_TPS_DATA = 30;
const BASE_URL = ENV_VARS.BASE_URL;

const TPS = () => {
  const [tpsData, setTpsData] = useState<ChartData>({
    options: {},
    series: [],
    type: "bar",
    width: "500",
  });

  useEffect(() => {
    axios.get<TpsData>(`${BASE_URL}/tps`).then((response) => {
      const tpsChartData: ChartData = {
        options: {
          yaxis: {
            title: {
              text: "Transactions per second",
            },
            labels: {
              formatter: (value: number) => Math.round(value),
            },
          },
          xaxis: {
            title: {
              text: "Minutes ago",
            },
            labels: {
              formatter: (value: number) => MINS_OF_TPS_DATA - value,
            },
          },
          dataLabels: { enabled: false },
          stroke: { curve: "smooth" },
        },
        series: response.data.series,
        type: "line",
        width: "500",
      };
      setTpsData(tpsChartData);
    });
  }, []);

  return (
    <div>
      <CustomChart data={tpsData} />
    </div>
  );
};

export default TPS;
