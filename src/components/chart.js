import React from "react";
import Chart from "react-google-charts";

function ChartC() {
  return (
    <div>
      <Chart
        width={"100%"}
        height={"400px"}
        chartType="AreaChart"
        loader={<div>Loading Chart</div>}
        data={[
          ["Year", "Sales", "Expenses"],
          ["2013", 1000, 400],
          ["2014", 1170, 460],
          ["2015", 660, 1120],
          ["2016", 1030, 540],
        ]}
        options={{
          legend: "none",
          series: {
            1: { curveType: "function" },
          },
        }}
        rootProps={{ "data-testid": "2" }}
      />
    </div>
  );
}

export default ChartC;
