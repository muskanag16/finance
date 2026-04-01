import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import SummaryCard from "./components/summaryCard.jsx";
import Charts from "./components/Charts.jsx";
import transactionTable from "./components/transactionTable.jsx";
import Insights from "./components/Insights.jsx";
import RoleSwitcher from "./components/RoleSwitcher.jsx";
import DarkModeToggle from "./components/DarkModeToggle.jsx";
import { transactions as initialTransactions } from "./data/mockData.jsx";
import { calculateSummary } from "./utils/helper.js";
import { useLocalStorage } from "./hooks/useLocalStorage.jsx";
import { DarkModeProvider, useDarkMode } from "./context/DarkModeContext.jsx";

function DashboardContent() {
  const [transactions, setTransactions] = useLocalStorage("transactions", initialTransactions);
  const [role, setRole] = useLocalStorage("userRole", "viewer");
  const [isAdding, setIsAdding] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const { isDark } = useDarkMode();

  const summary = useMemo(() => calculateSummary(transactions), [transactions]);

  const handleAddTransaction = () => {
    const newTransaction = {
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      amount: 0,
      category: "Food",
      type: "expense",
    };
    setEditingTransaction(newTransaction);
    setIsAdding(true);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
    setIsAdding(true);
  };

  const handleSaveTransaction = (updatedTransaction) => {
    if (transactions.find(t => t.id === updatedTransaction.id)) {
      setTransactions(transactions.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
    } else {
      setTransactions([...transactions, updatedTransaction]);
    }
    setIsAdding(false);
    setEditingTransaction(null);
  };

  const handleDeleteTransaction = (id) => {
    if (window.confirm("Are you sure you want to delete this transaction?")) {
      setTransactions(transactions.filter(t => t.id !== id));
    }
  };

  return (
    <div className={`min-h-screen p-4 md:p-8 transition-colors duration-300 ${isDark ? 'bg-gray-900' : 'bg-gradient-to-br from-indigo-50 via-white to-purple-50'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-wrap justify-between items-center mb-8 gap-4"
        >
          <div>
            <h1 className={`text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent ${isDark ? 'gradient-text' : ''}`}>
              Fintellect
            </h1>
            <p className={`text-sm mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              Smart Finance Dashboard
            </p>
          </div>
          <div className="flex items-center gap-3">
            <DarkModeToggle />
            <RoleSwitcher role={role} setRole={setRole} />
          </div>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <SummaryCard title="Total Balance" value={summary.balance} type="balance" />
          <SummaryCard title="Total Income" value={summary.totalIncome} type="income" trend={12.5} />
          <SummaryCard title="Total Expenses" value={summary.totalExpense} type="expense" trend={-3.2} />
        </div>

        {/* Charts Section */}
        <div className="mb-8">
          <Charts data={transactions} />
        </div>

        {/* Insights Section */}
        <div className="mb-8">
          <Insights data={transactions} />
        </div>

        {/* Transactions Section */}
        <div>
          <transactionTable
            data={transactions}
            role={role}
            onAddTransaction={handleAddTransaction}
            onDeleteTransaction={handleDeleteTransaction}
            onEditTransaction={handleEditTransaction}
          />
        </div>

        {/* Add/Edit Modal */}
        {isAdding && editingTransaction && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className={`rounded-2xl p-6 max-w-md w-full ${isDark ? 'bg-gray-800 border border-gray-700' : 'glass-card'}`}
            >
              <h3 className={`text-xl font-bold mb-4 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {transactions.find(t => t.id === editingTransaction.id) ? "Edit Transaction" : "Add Transaction"}
              </h3>
              <div className="space-y-4">
                <input
                  type="number"
                  placeholder="Amount"
                  value={editingTransaction.amount}
                  onChange={(e) => setEditingTransaction({ ...editingTransaction, amount: parseFloat(e.target.value) || 0 })}
                  className={`w-full p-2 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-indigo-500 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-indigo-500' 
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={editingTransaction.category}
                  onChange={(e) => setEditingTransaction({ ...editingTransaction, category: e.target.value })}
                  className={`w-full p-2 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-indigo-500 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-black focus:border-indigo-500' 
                      : 'bg-black border-gray-200 text-gray-900'
                  }`}
                />
                <select
                  value={editingTransaction.type}
                  onChange={(e) => setEditingTransaction({ ...editingTransaction, type: e.target.value })}
                  className={`w-full p-2 rounded-lg border transition-all duration-200 focus:ring-2 focus:ring-indigo-500 ${
                    isDark 
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-indigo-500' 
                      : 'bg-white border-gray-200 text-gray-900'
                  }`}
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
                <div className="flex gap-3 mt-4">
                  <button
                    onClick={() => handleSaveTransaction(editingTransaction)}
                    className="flex-1 btn-primary"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => {
                      setIsAdding(false);
                      setEditingTransaction(null);
                    }}
                    className="flex-1 btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <DarkModeProvider>
      <DashboardContent />
    </DarkModeProvider>
  );
}

export default App;