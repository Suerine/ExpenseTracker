import React, { useEffect, useState } from 'react'
import { LuPlus } from "react-icons/lu"
import { prepareExpenseLineChartData } from '../../utils/helper';
import CustomLineChart from '../Charts/CustomLineChart';

const ExpenseOverview = ({transactions, onExpenseIncome}) => {

 const [ chartData, setChartData ] = useState([]);

 useEffect(() => {
  const result = prepareExpenseLineChartData(transactions)
  setChartData(result)

  return () => {};
 }, [transactions]);
  return (
    <div className='card p-3 sm:p-6'>
     <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4'>
       <div className=''>
         <h5 className='text-base sm:text-lg font-semibold'>Expense Overview</h5>
         <p className='text-xs text-gray-400 mt-1 leading-relaxed sm:pr-4'>
           Track your spending trends over time and gain insights on where your money goes.
         </p>
       </div>

       <button 
         className='add-btn w-full sm:w-auto flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2.5 sm:px-4 sm:py-2 text-sm rounded-lg active:scale-95 transition-transform' 
         onClick={onExpenseIncome}
       >
         <LuPlus className='text-base sm:text-lg' />
         <span>Add Expense</span>
       </button>
     </div>

     <div className='mt-4 sm:mt-10'>
       {chartData?.length > 0 ? (
         <div className="w-full overflow-x-auto -mx-3 px-3 sm:mx-0 sm:px-0">
           <div className="min-w-[280px] xs:min-w-[320px] sm:min-w-0">
             <CustomLineChart data={chartData} />
           </div>
         </div>
       ) : (
         <div className="flex flex-col items-center justify-center py-8 sm:py-12 px-4">
           <p className="text-sm text-gray-400 text-center">
             No expense data available yet
           </p>
           <button 
             onClick={onExpenseIncome}
             className="mt-3 text-sm text-blue-500 font-medium active:opacity-70"
           >
             Add your first expense
           </button>
         </div>
       )}
     </div>
   </div>  
  ) 
}

export default ExpenseOverview