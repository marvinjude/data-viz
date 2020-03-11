import React from "react";
import { ResponsiveLine } from "@nivo/line";

const MyResponsiveLine = ({ data }) => (
  <ResponsiveLine
    data={data}
    enableArea={true}
    margin={{ top: 15, right: 50, bottom: 70, left: 50 }}
    xScale={{ type: "point" }}
    enableGridX={false}
    enableGridY={false}
    curve="natural"
    axisBottom={null}
    enablePoints={false}
    yScale={{
      type: "linear",
      min: "auto",
      max: "auto",
      stacked: true,
      reverse: false
    }}
    axisTop={null}
    axisRight={null}
    axisLeft={{
      orient: "left",
      tickSize: 5,
      tickPadding: 5,
      tickRotation: 0,
      legend: "count",
      legendOffset: -40,
      legendPosition: "middle"
    }}
    pointSize={10}
    pointColor={{ theme: "background" }}
    pointBorderWidth={2}
    pointBorderColor={{ from: "serieColor" }}
    pointLabel="y"
    pointLabelYOffset={-12}
    useMesh={true}
  />
);

export default MyResponsiveLine;
