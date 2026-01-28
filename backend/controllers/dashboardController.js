const Income = require("../models/Income");
const Expense = require("../models/Expense");
const mongoose = require("mongoose");

exports.getDashboardData = async (req, res) => {
  try {
    // 1. Convert user id to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(req.user.id);

    // 2. Aggregate income
    const totalIncomeAgg = await Income.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    // 3. Aggregate expense
    const totalExpenseAgg = await Expense.aggregate([
      { $match: { userId: userObjectId } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = totalIncomeAgg[0]?.total || 0;
    const totalExpense = totalExpenseAgg[0]?.total || 0;

    // 4. Last 60 days income
    const last60DaysIncomeTransactions = await Income.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const incomeLast60Days = last60DaysIncomeTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0,
    );

    // 5. Last 30 days expense
    const last30DaysExpenseTransactions = await Expense.find({
      userId: userObjectId,
      date: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) },
    }).sort({ date: -1 });

    const expenseLast30Days = last30DaysExpenseTransactions.reduce(
      (sum, tx) => sum + tx.amount,
      0,
    );

    // 6. Recent transactions
    const recentTransactions = [
      ...(
        await Income.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)
      ).map((tx) => ({
        ...tx.toObject(),
        type: "income",
      })),
      ...(
        await Expense.find({ userId: userObjectId }).sort({ date: -1 }).limit(5)
      ).map((tx) => ({
        ...tx.toObject(),
        type: "expense",
      })),
    ]
      .sort((a, b) => b.date - a.date)
      .slice(0, 5);

    // 7. Final response
    res.json({
      totalBalance: totalIncome - totalExpense,
      totalIncome,
      totalExpense,
      last30DaysExpenses: {
        total: expenseLast30Days,
        transactions: last30DaysExpenseTransactions,
      },
      last60DaysIncome: {
        total: incomeLast60Days,
        transactions: last60DaysIncomeTransactions,
      },
      recentTransactions,
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
