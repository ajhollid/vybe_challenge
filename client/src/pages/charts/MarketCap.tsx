// @ts-ignore
import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartData from "../../types/ChartData";
import MarketCapData from "../../types/MarketCapData";
import CustomChart from "../../components/CustomChart/CustomChart";
import "./index.css";

import ENV_VARS from "../../utils/env";

const BASE_URL = ENV_VARS.BASE_URL;

const MarketCap = () => {
  const [marketCapData, setMarketCapData] = useState<ChartData>({
    options: {},
    series: [],
    type: "bar",
    width: "300",
  });

  useEffect(() => {
    axios
      .get<MarketCapData>(`${BASE_URL}/market-cap`)
      .then((response) => {
        const marketCapData: ChartData = {
          options: {
            labels: response.data.labels,
            theme: {
              mode: "dark", // Can be 'light' or 'dark'
              palette: "palette2", // Up to 'palette10' or custom colors array
            },
          },
          series: response.data.series,
          type: "pie",
        };
        setMarketCapData(marketCapData);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }, []);

  return (
    <div className="chart-content">
      <div className="header">
        <h1>Market Cap</h1>
      </div>
      <div className="container chart">
        <CustomChart data={marketCapData} />
      </div>
    </div>
  );
};

export default MarketCap;
