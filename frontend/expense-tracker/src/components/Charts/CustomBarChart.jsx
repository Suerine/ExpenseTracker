import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

const CustomBarChart = ({ data }) => {
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#875cf5" : "#cfbefb";
  };

  // Fixed the spelling here
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border border-gray-100">
          <p className="text-xs font-semibold text-purple-800 mb-1">
            {payload[0].payload.month}
          </p>
          <p className="text-sm text-gray-600">
            Amount <span className="text-sm font-medium text-gray-900">{payload[0].value} KSH</span>
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white mt-6 w-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey="month" 
            tick={{ fontSize: 12, fill: "#555" }} 
            axisLine={false} 
            tickLine={false} 
          />
          <YAxis 
            tick={{ fontSize: 12, fill: "#555" }} 
            axisLine={false} 
            tickLine={false} 
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: '#f5f5f5' }} />
          <Bar 
            dataKey="amount"
            radius={[6, 6, 0, 0]} 
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={getBarColor(index)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CustomBarChart;