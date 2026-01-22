const Income = require("../models/Income");

// Add Income Source
exports.addIncome = async (req, res) => {
  try {
    const userId = req.user._id;
    const { icon, source, amount, date } = req.body;

    // Validation
    if (!source || amount == null || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newIncome = await Income.create({
      userId,
      icon,
      source,
      amount,
      date: new Date(date),
    });

    res.status(201).json(newIncome);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get All Income Source
exports.getAllIncome = async (req, res) => {
  const userId = req.user.id;

  try {
    const income = await Income.find({ userId }).sort({
      date: -1,
    });
    res.json(income);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Delete Income Source
exports.deleteIncome = async (req, res) => {
  try {
    await Income.findByIdAndDelete(req.params.id);
    res.json({ message: "Income deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Download Excel
exports.downloadIncomeExcel = async (req, res) => {};
