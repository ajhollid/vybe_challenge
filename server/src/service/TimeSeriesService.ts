import { Redis } from "ioredis";
import { Connection, PerfSample } from "@solana/web3.js";
import { Server as WebSocketServer } from "ws";
const TPS_DATA_CODE = "TPS_DATA";

type TPSDataPoint = {
  date: number;
  TPS: number;
};

class TimeSeriesService {
  redis: Redis;
  connection: Connection;
  wss: WebSocketServer;
  constructor(connection: Connection, redis: Redis, wss: WebSocketServer) {
    this.redis = redis;
    this.connection = connection;
    this.wss = wss;
    this.startDataCollection();
  }

  async getDataFromRedis() {
    const keys = await this.redis.keys("TPSData:*");
    const dataPromises = keys.map((key) => this.redis.get(key));
    const dataStrings = await Promise.all(dataPromises);
    const data = dataStrings.map((dataString) => {
      if (dataString) {
        return JSON.parse(dataString);
      }
      return "";
    });
    return data;
  }

  async sendDatatoClient(data: any) {
    this.wss.clients.forEach((client) => {
      client.send(JSON.stringify({ code: TPS_DATA_CODE, data: data }));
    });
  }

  async getData() {
    try {
      const performance: PerfSample[] =
        await this.connection.getRecentPerformanceSamples(1);
      const TPS =
        performance[0].numTransactions / performance[0].samplePeriodSecs;
      const date = Date.now();
      const dataPoint: TPSDataPoint = { date, TPS };
      const key = `TPSData:${dataPoint.date}`;
      await this.redis.set(key, JSON.stringify(dataPoint), "EX", 30 * 60); // 30 minutes expiration
      const data = await this.getDataFromRedis();

      this.sendDatatoClient(data);
    } catch (error) {
      throw error;
    }
  }

  startDataCollection() {
    this.getData();
    setInterval(() => {
      this.getData();
    }, 1000 * 60);
  }
}

export default TimeSeriesService;
