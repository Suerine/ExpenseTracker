import React, { useState, useEffect } from 'react'
import DashboardLayout from '../../components/layouts/DashboardLayout'
import IncomeOverview from '../../components/Income/IncomeOverview';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import Modal from '../../components/Modal';
import AddIncomeForm from '../../components/Income/AddIncomeForm';
import toast from 'react-hot-toast';
import IncomeList from '../../components/Income/IncomeList';
import DeleteAlert from '../../components/layouts/DeleteAlert';



const Income = () => {

  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
   show: false,
   data: null
  });

  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  // Get All Income Details
 const fetchIncomeDetails = async () => {
  setLoading(true);

  try {
    const response = await axiosInstance.get(API_PATHS.INCOME.GET_ALL_INCOME);

    console.log("Income API response:", response.data);

    if (response.data?.income) {
      setIncomeData(response.data.income);
    } else {
      setIncomeData([]);
    }
  } catch (error) {
    console.error("Something went wrong.", error);
    setIncomeData([]);
  } finally {
    setLoading(false);
  }
};

  // Handle Add Income 
  const handleAddIncome = async (income) => {
  const { source, amount, date, icon } = income;

  if (!source.trim()) {
    toast.error("Source is required.");
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

    await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
      source,
      amount: Number(amount),
      date,
      icon
    });

    toast.success("Income added successfully");
    setOpenAddIncomeModal(false);
    await fetchIncomeDetails();

  } catch (error) {
    console.error(
      "Error adding income:",
      error.response?.data?.message || error.message
    );
    toast.error("Failed to add income");
  } finally {
    setLoading(false);
  }
};

 
  // Delete Income
  const handleDelete = async (id) => {
  if (!id) return;

  try {
    setLoading(true);

    await axiosInstance.delete(
      API_PATHS.INCOME.DELETE_INCOME(id)
    );

    toast.success("Income deleted successfully");
    setOpenDeleteAlert({ show: false, data: null });
    fetchIncomeDetails();

  } catch (error) {
    console.error(
      "Error deleting income:",
      error.response?.data?.message || error.message
    );
    toast.error("Failed to delete income");
  } finally {
    setLoading(false);
  }
 };


 const handleDownloadIncomeDetails = async () => {
    try {
    const response = await axiosInstance.get(
     API_PATHS.INCOME.DOWNLOAD_INCOME,
     {
      responseType: "blob",
     })
      // Create a URL for the blob
     const url = window.URL.createObjectURL(new Blob([response.data]))
     const link = document.createElement("a");
     link.href = url;
     link.setAttribute("download", "income_details.xlsx");
     document.body.appendChild(link);
     link.click();
     link.parentNode.removeChild(link);
     window.URL.revokeObjectURL(url);
     } catch (error) {
       console.error("Error downloading income details:", error)
       toast.error("Failed to download income details. Please try again later.")
     }
   }

  useEffect(() => {
   fetchIncomeDetails();

   return () => {}
  }, []);



  return (
   <DashboardLayout activeMenu="Income">
    <div className='my-5 mx-auto'>
     <div className='grid grid-cols-1 gap-6'>
      <div className=''>
       <IncomeOverview 
        transactions={incomeData}
        onAddIncome={() => setOpenAddIncomeModal(true)}
        />
      </div>
       <IncomeList 
       transactions={incomeData}
       onDelete={(id) => {
        setOpenDeleteAlert({ show: true, data: id });
       }}
       onDownload = {handleDownloadIncomeDetails}
      />
     </div>

     <Modal 
      isOpen={openAddIncomeModal}
      onClose={() => setOpenAddIncomeModal(false)}
      title="Add Income" >
       <AddIncomeForm onAddIncome={handleAddIncome} />
     </Modal>

     <Modal 
       isOpen={openDeleteAlert.show}
       onClose={() => setOpenDeleteAlert({ show: false, data: null })}
       title="Delete Income"
     >
       <DeleteAlert
         content="Are you sure you want to delete this income?"
         onDelete={() => handleDelete(openDeleteAlert.data)}
         onCancel={() => setOpenDeleteAlert({ show: false, data: null })}
       />
     </Modal>
    </div>
   </DashboardLayout>
  )
}

export default Income