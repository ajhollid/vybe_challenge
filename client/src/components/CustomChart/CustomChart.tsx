// @ts-ignore
import React from "react";
import ChartData from "../../types/ChartData";
import Chart from "react-apexcharts";

const CustomChart = ({ data }: { data: ChartData }) => {
  const { options, series, type, width } = data;
  return (
    <Chart
      key={type}
      options={options}
      series={series}
      type={type}
      width={width}
    />
  );
};

export default CustomChart;
