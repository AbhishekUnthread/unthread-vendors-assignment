import React from "react";
import "./AppCustomerOverviewChart.scss";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";

const data = [
  {
    name: "Nov",
    uv: 4000,
    totalSpent: 2400,
  },
  {
    name: "Dec",
    uv: 3000,
    totalSpent: 1398,
  },
  {
    name: "Jan",
    uv: 2000,
    totalSpent: 9800,
  },
  {
    name: "Feb",
    uv: 2780,
    totalSpent: 3908,
  },
  {
    name: "Mar",
    uv: 1890,
    totalSpent: 4800,
  },
  {
    name: "Apr",
    uv: 2390,
    totalSpent: 3800,
  },
];
const AppCustomerOverviewChart = () => {
  const CustomTooltip = ({ active, payload, label, name }) => {
    if (active && payload && payload.length) {
      return (
        <div className="chart-tooltip d-flex flex-column align-items-center justify-content-center">
          <h6 className="text-lightBlue fw-500">{`₹ ${payload[0].value}`}</h6>
          <small className="text-grey-6 mt-1 fw-600">Total Spent</small>
          {/* <p className="label">{`${label} : ${payload[0].value}`}</p>
              <p className="intro">{getIntroOfPage(label)}</p>
              <p className="desc">Anything you want can be displayed here.</p> */}
        </div>
      );
    }

    return null;
  };

  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <AreaChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 24,
          right: 16,
          left: 0,
          bottom: 8,
        }}
      >
        <defs>
          <linearGradient id="colorTotalSpent" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8f5fe8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8f5fe8" stopOpacity={0} />
          </linearGradient>
        </defs>
        {/* <CartesianGrid strokeDasharray="3 3" /> */}
        <XAxis
          dataKey="name"
          tick={{ fill: "#c8d8ff", fontSize: 12, fontFamily: "Inter" }}
          tickLine={{ stroke: "transparent" }}
          stroke="transparent"
        />
        <YAxis
          tick={{ fill: "#c8d8ff", fontSize: 12, fontFamily: "Inter" }}
          tickLine={{ stroke: "transparent" }}
          stroke="transparent"
        />
        {/* <Tooltip /> */}
        {/* <Legend /> */}
        <Tooltip content={<CustomTooltip />} wrapperStyle={{ opacity: 1 }} />
        <Area
          type="monotone"
          dataKey="totalSpent"
          stroke="#8f5fe8"
          //   fill="#8f5fe8"
          fill="url(#colorTotalSpent)"
          fillOpacity={"0.5"}
          activeDot={{ r: 8 }}
        />
        {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default AppCustomerOverviewChart;
