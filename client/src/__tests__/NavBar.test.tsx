// @ts-ignore
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { BrowserRouter as Router } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";
import "@testing-library/jest-dom";

test("NavBar renders", () => {
  render(
    <Router>
      <NavBar />
    </Router>
  );
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

test("handleNavigate receives the correct path", () => {
  const navigate = jest.fn();
  (useNavigate as jest.Mock).mockReturnValue(navigate);

  const { getByText } = render(
    <Router>
      <NavBar />
    </Router>
  );

  fireEvent.click(getByText("Market Cap"));
  expect(navigate).toHaveBeenCalledWith("/market-cap");

  fireEvent.click(getByText("TPS"));
  expect(navigate).toHaveBeenCalledWith("/tps");

  fireEvent.click(getByText("Wallet Balances"));
  expect(navigate).toHaveBeenCalledWith("/balances");
});

test("NavBar contains all the links", () => {
  const { getByText } = render(
    <Router>
      <NavBar />
    </Router>
  );
  expect(getByText("Market Cap")).toBeInTheDocument();
  expect(getByText("TPS")).toBeInTheDocument();
  expect(getByText("Wallet Balances")).toBeInTheDocument();
});
