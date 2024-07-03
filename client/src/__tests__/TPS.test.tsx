// @ts-ignore
import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import TPS from "../pages/charts/TPS";
import { Server } from "mock-socket";
import { cleanup } from "@testing-library/react";
import MockWebSocket from "jest-websocket-mock";

let server: Server;

beforeAll(() => {
  jest.spyOn(console, "log").mockImplementation(() => {});
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  jest.restoreAllMocks();
});

afterEach(() => {
  server.close();
  cleanup();
  MockWebSocket.clean();
});

jest.mock("../utils/env", () => ({
  BASE_URL: "http://localhost:3000/api/v1",
}));

jest.mock("../components/CustomChart/CustomChart", () => () => (
  <div>Mock CustomChart</div>
));
jest.mock("axios");

test("TPS renders", async () => {
  server = new Server("ws://localhost:3001");
  server.on("connection", (socket) => {
    socket.on("message", (data) => {});
  });

  const mockData = { data: { url: "ws://localhost:3001" } };

  (axios.get as jest.Mock).mockResolvedValue(mockData);
  render(<TPS />);
  await waitFor(() => {
    expect(axios.get).toHaveBeenCalled();
  });
});

test("TPS renders and makes API call", async () => {
  server = new Server("ws://localhost:3001");
  server.on("connection", (socket) => {
    socket.on("message", (data) => {});
  });

  const mockData = { data: { url: "ws://localhost:3001" } };

  (axios.get as jest.Mock).mockResolvedValue(mockData);

  render(<TPS />);

  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/api/v1/tps");
  });
});
