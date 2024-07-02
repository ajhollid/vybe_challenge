// @ts-ignore
import React, { useState, useEffect } from "react";
import WsTpsData from "../types/WsTpsData";
import axios from "axios";
import ChartData from "../types/ChartData";
import CustomChart from "../components/CustomChart/CustomChart";
import ENV_VARS from "../utils/env";
import WsDetails from "../types/WsDetails";
import WebSocketClient from "../utils/WsClient";
const BASE_URL = ENV_VARS.BASE_URL;
const TPS_DATA_CODE = "TPS_DATA";
const TPS = () => {
  const [tpsData, setTpsData] = useState<ChartData>({
    options: {},
    series: [],
    type: "bar",
    width: "800",
  });

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
                      return date.toLocaleTimeString();
                    },
                  },
                },
                dataLabels: { enabled: false },
                stroke: { curve: "smooth" },
              },
              series: series,
              type: "line",
              width: "800",
            };
            setTpsData(tpsChartData);
          }
        };
      })
      .catch((error: Error) => {
        console.log(error);
      });

    return () => {
      if (wsClient) {
        wsClient.ws.close();
      }
    };
  }, []);

  return (
    <div>
      <CustomChart data={tpsData} />
    </div>
  );
};

export default TPS;
