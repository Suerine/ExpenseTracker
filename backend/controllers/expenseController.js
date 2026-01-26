const xlsx = require("xlsx");
const Income = require("../models/Expense");
const fs = require("fs"); // For file cleanup if needed
const Expense = require("../models/Expense");

// Add Expense Source
exports.addExpense = async (req, res) => {
  try {
    const userId = req.user._id;
    const { icon, category, amount, date } = req.body;

    // Validation
    if (!category || amount == null || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate amount is a number
    if (isNaN(amount) || amount < 0) {
      return res
        .status(400)
        .json({ message: "Amount must be a positive number" });
    }

    const newExpense = await Expense.create({
      userId,
      icon,
      category,
      amount: parseFloat(amount),
      date: new Date(date),
    });

    await newExpense.save();
    res.status(201).json(newExpense);
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res.status(400).json({ message: error.message });
    }

    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Income Source
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expense);

    // Calculate total income
    const totalExpense = expense.reduce((sum, item) => sum + item.amount, 0);

    res.json({
      expense,
      totalExpense,
      count: expense.length,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Income Source
exports.deleteExpense = async (req, res) => {
  try {
    const userId = req.user.id;
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: "Income not found" });
    }

    // Check ownership
    if (expense.userId.toString() !== userId) {
      return res
        .status(403)
        .json({ message: "Not authorized to delete this expense" });
    }

    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Download Excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const expense = await Expense.find({ userId }).sort({ date: -1 });

    if (expense.length === 0) {
      return res.status(404).json({ message: "No expense data found" });
    }

    // Prepare data for Excel with formatting
    const data = expense.map((item) => ({
      Category: item.category,
      Amount: item.amount,
      Date: new Date(item.date).toLocaleDateString(),
      Icon: item.icon || "",
    }));

    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);

    // Format column widths
    const colWidths = [
      { wch: 20 }, // Category
      { wch: 15 }, // Amount
      { wch: 15 }, // Date
      { wch: 10 }, // Icon
    ];
    ws["!cols"] = colWidths;

    xlsx.utils.book_append_sheet(wb, ws, "Expense");

    // Create unique filename
    const filename = `expense_${userId}_${Date.now()}.xlsx`;
    const filepath = `./${filename}`;

    xlsx.writeFile(wb, filepath);

    // Set download headers
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    );
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);

    // Send file
    res.download(filepath, filename, (err) => {
      if (err) {
        console.error("Download error:", err);
      }
      // Cleanup file after sending (optional)
      setTimeout(() => {
        if (fs.existsSync(filepath)) {
          fs.unlinkSync(filepath);
        }
      }, 5000); // Delete after 5 seconds
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
