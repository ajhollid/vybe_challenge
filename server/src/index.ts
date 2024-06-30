import express, { Express, NextFunction, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Connection, PublicKey, LAMPORTS_PER_SOL } from "@solana/web3.js";
import axios from "axios";
import CoinData from "../types/CoinData";
import Token from "../types/Token";
import { Redis } from "ioredis";
import ErrorHandler from "./middleware/ErrorHandler";
dotenv.config();

import { TOP_TOKENS, TOP_WALLETS } from "./data";

const PORT = process.env.PORT || 3000;
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const REDIS_HOST = process.env.REDIS_HOST || "";
const MINS_OF_TPS_DATA = 30;
const app: Express = express();

app.use(cors());
const redis = new Redis(REDIS_PORT, REDIS_HOST);
redis.on("connect", () => {
  console.log("Connected to Redis");
});

const connection = new Connection(
  `https://solana-mainnet.rpc.extrnode.com/${process.env.API_KEY}`
);

app.get(
  "/api/v1/market-cap",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // If cached data exists, return cached data
      const cachedData = await redis.get("marketCap");
      if (cachedData) {
        console.log("MarketCap cache hit");
        res.status(200).json(JSON.parse(cachedData));
        return;
      }

      // Grab all token supplies
      const requests: Promise<Token>[] = TOP_TOKENS.map(async (token) => {
        const tokenSupply = await connection.getTokenSupply(
          new PublicKey(token.ADDR)
        );
        const supplyInTokens = tokenSupply.value.uiAmount;
        return {
          symbol: token.symbol,
          totalSupply: supplyInTokens || 0,
          marketCap: 0,
        };
      });

      const totalSupplies = await Promise.all(requests);

      // Generate currency ids for Coin Gecko API request
      const currencyIds = TOP_TOKENS.map((token) => {
        return token.id;
      }).join(",");

      // Fetch market prices
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets",
        {
          params: {
            vs_currency: "usd",
            ids: currencyIds,
          },
          headers: {
            "x-cg-demo-api-key": process.env.COIN_GECKO_API_KEY,
          },
        }
      );

      // Reduce market prices to key-val pair
      const marketPrices = response.data.reduce(
        (acc: Record<string, number>, curr: CoinData) => {
          acc[curr.symbol] = curr.current_price;
          return acc;
        },
        {}
      );

      // Calculate market cap
      const marketCaps = totalSupplies.map((token) => {
        return token.totalSupply * marketPrices[token.symbol];
      });

      // Generate labels for the chart
      const labels = totalSupplies.map((token) => token.symbol.toUpperCase());

      const returnData = { labels, series: marketCaps };
      // 10 minutes seems like a reasonable cache time for market cap data
      redis.set("marketCap", JSON.stringify(returnData), "EX", 10 * 60);
      res.status(200).json(returnData);
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  "/api/v1/tps",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cahcedData = await redis.get("tps");
      if (cahcedData) {
        console.log("TPS cache hit");
        res.status(200).json(JSON.parse(cahcedData));
        return;
      }

      // Get recent performance stats
      const recentPerformance = await connection.getRecentPerformanceSamples(
        MINS_OF_TPS_DATA
      );

      // Caluclate TPS
      const tpsArray = recentPerformance.map((performance, index) => [
        index,
        performance.numTransactions / performance.samplePeriodSecs,
      ]);

      const returnData = { series: [{ name: "TPS", data: tpsArray }] };

      // TPS is returned in 1 minute intervals, so invalidating cache after 1 minute seems reasonable
      redis.set("tps", JSON.stringify(returnData), "EX", 60);
      res.status(200).json(returnData);
    } catch (error) {
      next(error);
    }
  }
);

app.get(
  "/api/v1/balances",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const cachedData = await redis.get("balances");
      if (cachedData) {
        console.log("Balances cache hit");
        res.status(200).json(JSON.parse(cachedData));
        return;
      }

      // Get balances of all wallets
      const balances = await Promise.all(
        TOP_WALLETS.map(async (address) => {
          const publicKey = new PublicKey(address);
          const lBalance = await connection.getBalance(publicKey);
          const balance = lBalance / LAMPORTS_PER_SOL;
          return { x: address, y: balance };
        })
      );

      const returnData = {
        series: [{ name: "Top 10 Wallets", data: balances }],
      };

      redis.set("balances", JSON.stringify(returnData), "EX", 10 * 60);
      res.status(200).json(returnData);
    } catch (error) {
      next(error);
    }
  }
);

app.use(ErrorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
