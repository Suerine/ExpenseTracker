import React from 'react';
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["oklch(60% 0.118 184.704)", "#FA2C37", "oklch(72.3% 0.219 149.579)"];

const FinancalOverview = ({totalBalance, totalIncome, totalExpense}) => {

  const balanceData = [
   {name: "Total Balance", amount: totalBalance},
   {name: "Total Expense", amount: totalExpense},
   {name: "Total Income", amount: totalIncome}
  ]
  return (
    <div className='card'>
     <div className='flex items-center justify-between'>
      <h5 className='text-lg'>Financial Overview</h5>
     </div>
     
     <CustomPieChart 
      data={balanceData}
      label="Total Balance"
      totalAmount={`${totalBalance} KSH`}
      colors={COLORS}
      showTextAnchor
     />
    </div>
  )
}

export default FinancalOverview