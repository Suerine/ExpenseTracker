import React, { useEffect, useState } from 'react'
import CustomPieChart from '../../components/Charts/CustomPieChart';

const COLORS = [
  "#875CF5", // purple
  "#4F46E5", // indigo
  "#22C55E", // green
  "#16A34A", // dark green
  "#06B6D4", // cyan
  "#0EA5E9", // sky blue
  "#F59E0B", // amber
  "#F97316", // orange
  "#EF4444", // red
  "#EC4899", // pink
];
const RecentIncomeWithChart = ({ data, totalIncome}) => {

  const [chartData, setChartData] = useState([]);

  const prepartChartData = () => {
   const dataArr = data?.map((item) => ({
    name: item?.source,
    amount: item?.amount,
   }));

   setChartData(dataArr);
  }

  useEffect(() => {
   prepartChartData();

   return () => {}
  }, [data])
  return (
    <div className='card'>
     <div className='flex items-center justify-between'>
      <h5 className='text-lg'>Last 60 Days Income</h5>
     </div>

     <CustomPieChart 
      data={chartData}
      label="Total Income"
      totalAmount={`${totalIncome} KSH`}
      showTextAnchor
      colors={COLORS}
     />
    </div>
  )
}

export default RecentIncomeWithChart