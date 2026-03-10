import React, { useState } from 'react'
import Input from "../Inputs/Input"
import EmojiPickerPopup from '../layouts/EmojiPickerPopup'

const AddExpenseForm = ({ onAddExpense }) => {
  const [expense, setExpense] = useState({
    category: "",
    amount: "",
    date: "",
    icon: "",
  });

  const handleChange = (key, value) =>
    setExpense({ ...expense, [key]: value });

  return (
    <div>
      <EmojiPickerPopup
        icon={expense.icon}
        onSelect={(selectedIcon) =>
          handleChange("icon", selectedIcon)
        }
      />

      <Input
        value={expense.category}
        onChange={(value) =>
          handleChange("category", value)
        }
        label="Category"
        placeholder="Rent, Groceries, etc"
        type="text"
      />

      <Input
        value={expense.amount}
        onChange={(value) =>
          handleChange("amount", Number(value))
        }
        label="Amount"
        type="number"
      />

      <Input
        value={expense.date}
        onChange={(value) =>
          handleChange("date", value)
        }
        label="Date"
        type="date"
      />

      <div className="flex justify-end mt-6">
        <button
          type="button"
          className="add-btn add-btn-fill"
          onClick={() => {
            if (!expense.category || !expense.amount || !expense.date) {
              alert("Please fill all required fields");
              return;
            }
            onAddExpense(expense);
          }}
        >
          Add Expense
        </button>
      </div>
    </div>
  );
};

export default AddExpenseForm;
