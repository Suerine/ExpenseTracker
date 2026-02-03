import React from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CustomPieChart = ({
  data = [],
  label,
  totalAmount,
  colors = [],
  showTextAnchor = false,
}) => {
  return (
   <div className="flex flex-col items-center">
    <ResponsiveContainer width="100%" height={260}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
        >
          {data.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors.length]}
            />
          ))}
        </Pie>

        <Tooltip content={<CustomTooltip />} />

        {showTextAnchor && (
          <>
            <text
              x="50%"
              y="50%"
              dy={-25}
              textAnchor="middle"
              fill="#666"
              fontSize="14px"
            >
              {label}
            </text>

            <text
              x="50%"
              y="50%"
              dy={8}
              textAnchor="middle"
              fill="#333"
              fontSize="24px"
              fontWeight="600"
            >
              {totalAmount}
            </text>
          </>
        )}
      </PieChart>
    </ResponsiveContainer>

    {/* 🔽 LEGEND OUTSIDE */}
    <div className="mt-6">
      <CustomLegend payload={data.map((d, i) => ({
        value: d.name,
        color: colors[i % colors.length],
        payload: d
      }))} />
    </div>
  </div>

  );
};


export default CustomPieChart;
