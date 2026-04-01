export const groupByMonth = (data) => {
  const map = {};
  data.forEach(t => {
    const month = t.date.split(' ')[0];
    if (!map[month]) map[month] = { date: month, income: 0, expense: 0 };
    if (t.type === "income") map[month].income += t.amount;
    else map[month].expense += t.amount;
  });
  return Object.values(map);
};

export const categoryData = (data) => {
  const map = {};
  data.forEach(t => {
    if (t.type === "expense") {
      map[t.category] = (map[t.category] || 0) + t.amount;
    }
  });
  return Object.keys(map).map(k => ({ name: k, value: map[k] }));
};

export const runningBalance = (data) => {
  let balance = 0;
  return data
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(t => {
      balance += t.type === "income" ? t.amount : -t.amount;
      return { ...t, balance };
    });
};

export const calculateSummary = (data) => {
  const totalIncome = data.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = data.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const balance = totalIncome - totalExpense;
  return { totalIncome, totalExpense, balance };
};

export const getMonthlyComparison = (data) => {
  const monthly = groupByMonth(data);
  return monthly.map(m => ({
    month: m.date,
    savings: m.income - m.expense,
    income: m.income,
    expense: m.expense,
  }));
};

export const getHighestSpending = (data) => {
  const expenses = data.filter(t => t.type === "expense");
  if (expenses.length === 0) return null;
  return expenses.reduce((max, t) => t.amount > max.amount ? t : max);
};