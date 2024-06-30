// @ts-ignore
import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import TPS from "../pages/TPS";

jest.mock("../utils/env", () => ({
  BASE_URL: "http://localhost:3000/api/v1",
}));

jest.mock("../components/CustomChart/CustomChart", () => () => (
  <div>Mock CustomChart</div>
));
jest.mock("axios");

test("TPS renders", async () => {
  const mockData = { data: { series: [] } };
  (axios.get as jest.Mock).mockResolvedValue(mockData);
  render(<TPS />);
  await waitFor(() => {
    expect(axios.get).toHaveBeenCalled();
  });
});

test("TPS renders and makes API call", async () => {
  const mockData = { data: { series: [] } };
  (axios.get as jest.Mock).mockResolvedValue(mockData);

  render(<TPS />);

  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith("http://localhost:3000/api/v1/tps");
  });
});
