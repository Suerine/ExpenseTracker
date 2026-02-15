import React, { useEffect, useState} from 'react'; 
import { LuPlus } from "react-icons/lu";
import CustomBarChart from '../Charts/CustomBarChart';
import { prepareIncomeBarChartData } from '../../utils/helper';


const IncomeOverview = 
({transactions, onAddIncome }) => {
  // console.log("IncomeOverview transactions:", transactions);

  const [chartData, setChartData] = useState([]);

  useEffect(() => {
   const result = prepareIncomeBarChartData(transactions);
   setChartData(result);

   return () => {};
  }, [transactions]);
  return (
   <div className='card p-4 sm:p-6'>
     <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
       <div className=''>
         <h5 className='text-base sm:text-lg'>Income Overview</h5>
         <p className='text-xs text-gray-400 mt-0.5 pr-2'>
           Track your earning over time and analyze your income trends.
         </p>
       </div>

       <button 
         className='add-btn w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 text-sm sm:text-base' 
         onClick={onAddIncome}
       >
         <LuPlus className='w-4 h-4' />
         <span>Add Income</span>
       </button>
     </div>

     <div className='mt-6 sm:mt-10'>
       {chartData.length > 0 ? (
         <div className="w-full overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
           <div className="min-w-[300px] sm:min-w-0">
             <CustomBarChart data={chartData} />
           </div>
         </div>
       ) : (
         <p className="text-sm text-gray-400 text-center py-8">
           No income data available yet
         </p>
       )}
     </div>
   </div>
  )
}

export default IncomeOverview