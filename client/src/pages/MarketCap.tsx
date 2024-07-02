// @ts-ignore
import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartData from "../types/ChartData";
import MarketCapData from "../types/MarketCapData";
import CustomChart from "../components/CustomChart/CustomChart";

import ENV_VARS from "../utils/env";

const BASE_URL = ENV_VARS.BASE_URL;

const MarketCap = () => {
  const [marketCapData, setMarketCapData] = useState<ChartData>({
    options: {},
    series: [],
    type: "bar",
    width: "800",
  });

  useEffect(() => {
    axios
      .get<MarketCapData>(`${BASE_URL}/market-cap`)
      .then((response) => {
        const marketCapData: ChartData = {
          options: {
            labels: response.data.labels,
          },
          series: response.data.series,
          type: "pie",
          width: "800",
        };
        setMarketCapData(marketCapData);
      })
      .catch((error: Error) => {
        console.error(error);
      });
  }, []);

  return (
    <div>
      <CustomChart data={marketCapData} />
    </div>
  );
};

export default MarketCap;
