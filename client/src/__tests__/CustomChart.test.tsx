// @ts-ignore
import React from "react";
import CustomChart from "../components/CustomChart/CustomChart";
import ChartData from "../types/ChartData";
import "@testing-library/jest-dom";

test("CustomChart is defined", () => {
  expect(CustomChart).toBeDefined();
});

test("CustomChart throws when no data is provided", () => {
  const dummyData: ChartData = {
    options: {},
    series: [],
    type: "bar",
    width: "500",
  };
  const chart = CustomChart({ data: dummyData });
  expect(chart.props.type).toBe(dummyData.type);
  expect(chart.props.options).toBe(dummyData.options);
  expect(chart.props.series).toBe(dummyData.series);
  expect(chart.props.type).toBe(dummyData.type);
  expect(chart.props.width).toBe(dummyData.width);
});
