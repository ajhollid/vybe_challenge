// @ts-ignore
import React, { useState, useEffect } from "react";
import WsTpsData from "../../types/WsTpsData";
import axios from "axios";
import ChartData from "../../types/ChartData";
import CustomChart from "../../components/CustomChart/CustomChart";
import ENV_VARS from "../../utils/env";
import WsDetails from "../../types/WsDetails";
import WebSocketClient from "../../utils/WsClient";
const BASE_URL = ENV_VARS.BASE_URL;
const TPS_DATA_CODE = "TPS_DATA";
const TPS = () => {
  const [tpsData, setTpsData] = useState<ChartData>({
    options: {},
    series: [],
    type: "bar",
    width: "300",
  });

  const connectToWs = (msg: MessageEvent<any>) => {
    const wsData: WsTpsData[] = msg.data;
    const formattedTpsData = wsData
      .sort((a, b) => {
        return a.date - b.date;
      })
      .map((wsTps) => {
        return [wsTps.date, wsTps.TPS];
      });

    const series = [{ name: "TPS", data: formattedTpsData }];

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
            text: "Date (Updated every minute)",
          },
          labels: {
            formatter: (value: number) => {
              const date = new Date(value);
              return date.toLocaleString("en-US", {
                day: "2-digit",
                month: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              });
            },
          },
        },
        dataLabels: { enabled: false },
        stroke: { curve: "smooth" },
        theme: {
          mode: "dark", // Can be 'light' or 'dark'
          palette: "palette2", // Up to 'palette10' or custom colors array
        },
      },
      series: series,
      type: "line",
    };
    setTpsData(tpsChartData);
  };

  useEffect(() => {
    let wsClient: WebSocketClient | null = null;

    axios
      .get<WsDetails>(`${BASE_URL}/tps`)
      .then((response) => {
        const wsUrl = response.data.url;
        wsClient = new WebSocketClient(wsUrl);
        wsClient.ws.onmessage = (message) => {
          const msg = JSON.parse(message.data);
          if (msg.code === TPS_DATA_CODE) {
            connectToWs(msg);
          }
        };
      })
      .catch((error) => {
        console.error(error);
      });

    return () => {
      if (wsClient) {
        wsClient.ws.close();
      }
    };
  }, []);

  return (
    <div className="chart-content">
      <div className="header">
        <h1>Transactions per Second</h1>
      </div>
      <div className="container chart">
        <CustomChart data={tpsData} />
      </div>
    </div>
  );
};

export default TPS;
