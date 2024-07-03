// @ts-ignore
import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import Balances from "../pages/charts/Balances";

jest.mock("../utils/env", () => ({
  BASE_URL: "http://localhost:3000/api/v1",
}));

jest.mock("../components/CustomChart/CustomChart", () => () => (
  <div>Mock CustomChart</div>
));
jest.mock("axios");

test("Balances renders", async () => {
  const mockData = { data: { series: [] } };

  (axios.get as jest.Mock).mockResolvedValue(mockData);

  render(<Balances />);
  await waitFor(() => {
    expect(axios.get).toHaveBeenCalled();
  });
});

test("Balances renders and makes API call", async () => {
  const mockData = { data: { series: [] } };
  (axios.get as jest.Mock).mockResolvedValue(mockData);

  render(<Balances />);

  await waitFor(() => {
    expect(axios.get).toHaveBeenCalledWith(
      "http://localhost:3000/api/v1/balances"
    );
  });
});
