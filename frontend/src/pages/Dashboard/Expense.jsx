import React, { useState, useEffect } from 'react';
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import toast from 'react-hot-toast';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal  from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/layouts/DeleteAlert';


const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null,
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const fetchExpenseDetails = async () => {
    setLoading(true);

    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.GET_ALL_EXPENSE
      );

     if (response.data?.expenses) {
        setExpenseData(response.data.expenses);
      } else {
        setExpenseData([]);
      }

    } catch (error) {
      console.error("Something went wrong.", error);
      setExpenseData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, []);

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    if (!category.trim()) {
      toast.error("Category is required.");
      return;
    }

    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0.");
      return;
    }

    if (!date) {
      toast.error("Date is required.");
      return;
    }

    try {
      setLoading(true);

      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount: Number(amount),
        date,
        icon,
      });

      toast.success("Expense added successfully");
      setOpenAddExpenseModal(false);
      fetchExpenseDetails();
    } catch (error) {
      toast.error("Failed to add expense");
    } finally {
      setLoading(false);
    }
  };

  // Delete Expense
  const handleDelete = async (id) => {
  if (!id) return;

  try {
    setLoading(true);

    await axiosInstance.delete(
      API_PATHS.EXPENSE.DELETE_EXPENSE(id)
    );

    toast.success("Expense deleted successfully");
    setOpenDeleteAlert({ show: false, data: null });
    fetchExpenseDetails();

  } catch (error) {
    console.error(
      "Error deleting expense:",
      error.response?.data?.message || error.message
    );
    toast.error("Failed to delete expense");
  } finally {
    setLoading(false);
  }
 };


  const handleDownloadExpenseDetails = async () => {
   try {
    const response = await axiosInstance.get(
     API_PATHS.EXPENSE.DOWNLOAD_EXPENSE,
     {
      responseType: "blob",
     })
      // Create a URL for the blob
     const url = window.URL.createObjectURL(new Blob([response.data]))
     const link = document.createElement("a");
     link.href = url;
     link.setAttribute("download", "expense_details.xlsx");
     document.body.appendChild(link);
     link.click();
     link.parentNode.removeChild(link);
     window.URL.revokeObjectURL(url);
     } catch (error) {
       console.error("Error downloading expense details:", error)
       toast.error("Failed to download expense details. Please try again later.")
     }
 }
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <div className='grid grid-cols-1 gap-6'>
         <div className=''>
          <ExpenseOverview 
            transactions={expenseData}
            onExpenseIncome={() => setOpenAddExpenseModal(true)} />
         </div>

         <ExpenseList 
           transactions={expenseData}
           onDelete={(id) => {
            setOpenDeleteAlert({ show: true, data: id })
           }}
           onDownload={handleDownloadExpenseDetails} 
           />
        </div>

        <Modal 
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense">
           <AddExpenseForm onAddExpense={handleAddExpense} />
          </Modal>

        <Modal 
         isOpen={openDeleteAlert.show}
         onClose={() => setOpenDeleteAlert({ show: false, data: null })}
         title="Delete Expense"
         >
         <DeleteAlert
           content="Are you sure you want to delete this expense?"
           onDelete={() => handleDelete(openDeleteAlert.data)}
           onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
         />
       </Modal>
      </div>
    </DashboardLayout>
  );
};

export default Expense;
