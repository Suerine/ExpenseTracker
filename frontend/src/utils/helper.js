import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";

  for (let i = 0; i < Math.min(2, words.length); i++) {
    initials += words[i][0];
  }

  return initials.toUpperCase();
};

export const addThousandsSeparator = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const prepareExpenseBarChartData = (data = []) => {
  // Group expenses by date and sum amounts
  const grouped = data.reduce((acc, item) => {
    const date = moment(item?.date).format("Do MMM");
    if (acc[date]) {
      acc[date] += item?.amount; // ✅ Add to existing day
    } else {
      acc[date] = item?.amount; // ✅ Create new day entry
    }
    return acc;
  }, {});

  // Convert back to array
  const chartData = Object.keys(grouped).map((date) => ({
    month: date,
    amount: grouped[date],
  }));

  return chartData;
};

export const prepareIncomeBarChartData = (data = []) => {
  if (!Array.isArray(data)) return [];

  const sortedData = [...data].sort(
    (a, b) => new Date(a.date) - new Date(b.date),
  );

  const chartData = sortedData.map((item) => ({
    month: moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};

export const prepareExpenseLineChartData = (data = []) => {
  return data
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map((item) => ({
      month: moment(item.date).format("Do MMM"),
      amount: Number(item.amount),
      category: item.category,
    }));
};
