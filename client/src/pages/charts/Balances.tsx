// @ts-ignore
import React, { useState, useEffect } from "react";
import axios from "axios";
import ChartData from "../../types/ChartData";
import WalletData from "../../types/WalletData";
import CustomChart from "../../components/CustomChart/CustomChart";
import ENV_VARS from "../../utils/env";

const BASE_URL = ENV_VARS.BASE_URL;
const Balances = () => {
  const [walletData, setWalletData] = useState<ChartData>({
    options: {},
    series: [],
    type: "bar",
    width: "300",
  });

  useEffect(() => {
    axios.get<WalletData>(`${BASE_URL}/balances`).then((response) => {
      const walletData: ChartData = {
        options: {
          yaxis: {
            title: {
              text: "Wallet Balance",
            },
            labels: {
              formatter: (value: number) => Math.round(value),
            },
          },
          xaxis: {
            type: "category",
            tickAmount: 10,
            title: {
              text: "Wallet Address",
            },
            labels: {
              formatter: function (val: string) {
                return val.length > 20 ? val.substring(0, 10) + "..." : val;
              },
            },
          },
          dataLabels: {
            enabled: false,
          },
          tooltip: {
            x: {
              formatter: function (val: string) {
                return val; // show the full label in the tooltip
              },
            },
          },
          theme: {
            mode: "dark", // Can be 'light' or 'dark'
            palette: "palette2", // Up to 'palette10' or custom colors array
          },
        },
        series: response.data.series,
        type: "bar",
      };
      setWalletData(walletData);
    });
  }, []);

  return (
    <div className="chart-content">
      <div className="header">
        <h1>Balances</h1>
      </div>
      <div className="container chart">
        <CustomChart data={walletData} />
      </div>
    </div>
  );
};

export default Balances;
