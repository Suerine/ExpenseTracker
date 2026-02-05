import React from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Area,
  AreaChart,
} from "recharts";

const COLORS = [
  "#875cf5",
  "#FA2C37",
  "#FF6900",
  "#22c55e",
  "#0ea5e9",
  "#f59e0b",
];

const CustomLineChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-[300px] flex items-center justify-center text-sm text-gray-400">
        No data available
      </div>
    );
  }
  const color = COLORS[data.length % COLORS.length] || COLORS[0];

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-300">
          <p className="text-xs font-semibold mb-1" style={{ color }}>
            {payload[0]?.payload?.month}
          </p>
          <p className="text-sm text-gray-600">
            Amount:{" "}
            <span className="font-medium text-gray-900">
              {payload[0]?.payload?.amount} KSH
            </span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ResponsiveContainer width="100%" height={300}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.4} />
            <stop offset="95%" stopColor={color} stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid stroke="none" />
        <XAxis dataKey="month" tick={{ fontSize: 12, fill: "#555" }} />
        <YAxis tick={{ fontSize: 12, fill: "#555" }} />
        <Tooltip content={<CustomTooltip />} />

        <Area
          type="monotone"
          dataKey="amount"
          stroke={color}
          fill="url(#chartGradient)"
          strokeWidth={3}
          dot={{ r: 4, fill: color }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default CustomLineChart;
