const xlsx = require("xlsx");
const fs = require("fs");
const Expense = require("../models/Expense");

//  ======================= Add Expense =======================
exports.addExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const { icon, category, amount, date } = req.body;

    // Validation
    if (!category || amount === undefined || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(amount) || amount < 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }

    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
      return res.status(400).json({ message: "Invalid date format" });
    }

    const expense = await Expense.create({
      userId,
      icon: icon || "💰",
      category,
      amount: Number(amount),
      date: parsedDate,
    });

    res.status(201).json(expense);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// =======================
// Get All Expenses
// =======================
exports.getAllExpense = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    const totalExpense = expenses.reduce((sum, item) => sum + item.amount, 0);

    res.json({
      expenses,
      totalExpense,
      count: expenses.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// =======================
// Delete Expense
// =======================
exports.deleteExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Expense not found" });
    }

    if (expense.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this expense" });
    }

    await expense.deleteOne();
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// =======================
// Download Expense Excel
// =======================
exports.downloadExpenseExcel = async (req, res) => {
  try {
    const userId = req.user.id;

    const expenses = await Expense.find({ userId }).sort({ date: -1 });

    if (!expenses.length) {
      return res.status(404).json({ message: "No expense data found" });
    }

    const data = expenses.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: item.date.toISOString().split("T")[0],
      Icon: item.icon || "",
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    ws["!cols"] = [{ wch: 20 }, { wch: 15 }, { wch: 15 }, { wch: 10 }];

    xlsx.utils.book_append_sheet(wb, ws, "Expenses");

    const filename = `expenses_${userId}_${Date.now()}.xlsx`;
    const filepath = `./${filename}`;

    xlsx.writeFile(wb, filepath);

    res.download(filepath, filename, () => {
      if (fs.existsSync(filepath)) fs.unlinkSync(filepath);
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
