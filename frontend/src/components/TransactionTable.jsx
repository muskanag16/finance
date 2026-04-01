import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, Filter, Edit, Trash2, Plus, X, Calendar, 
  DollarSign, Tag, ArrowUpDown, ChevronDown, ChevronUp, 
  TrendingUp, TrendingDown, Layers, Zap 
} from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext.jsx";

export default function transactionTable({ data, role, onAddTransaction, onDeleteTransaction, onEditTransaction }) {
  const { isDark } = useDarkMode();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [dateRange, setDateRange] = useState({ start: "", end: "" });
  const [amountRange, setAmountRange] = useState({ min: "", max: "" });

  // Extract unique categories from data
  const allCategories = useMemo(() => [...new Set(data.map(t => t.category))], [data]);

  const filtered = useMemo(() => {
    let result = [...data];
    
    // Apply search filter
    if (search) {
      result = result.filter(t => 
        t.category.toLowerCase().includes(search.toLowerCase()) || 
        t.amount.toString().includes(search.toLowerCase())
      );
    }
    
    // Apply type filter
    if (filterType !== "all") {
      result = result.filter(t => t.type === filterType);
    }
    
    // Apply category filter
    if (selectedCategories.length > 0) {
      result = result.filter(t => selectedCategories.includes(t.category));
    }
    
    // Apply date range filter
    if (dateRange.start) {
      result = result.filter(t => new Date(t.date) >= new Date(dateRange.start));
    }
    if (dateRange.end) {
      result = result.filter(t => new Date(t.date) <= new Date(dateRange.end));
    }
    
    // Apply amount range filter
    if (amountRange.min) {
      result = result.filter(t => t.amount >= parseFloat(amountRange.min));
    }
    if (amountRange.max) {
      result = result.filter(t => t.amount <= parseFloat(amountRange.max));
    }
    
    // Apply sorting
    result.sort((a, b) => {
      if (sortBy === "date") {
        return sortOrder === "desc" 
          ? new Date(b.date) - new Date(a.date)
          : new Date(a.date) - new Date(b.date);
      }
      if (sortBy === "amount") {
        return sortOrder === "desc" ? b.amount - a.amount : a.amount - b.amount;
      }
      if (sortBy === "category") {
        return sortOrder === "desc" 
          ? b.category.localeCompare(a.category)
          : a.category.localeCompare(b.category);
      }
      return 0;
    });
    
    return result;
  }, [data, search, filterType, selectedCategories, dateRange, amountRange, sortBy, sortOrder]);

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "desc" ? "asc" : "desc");
    } else {
      setSortBy(field);
      setSortOrder("desc");
    }
  };

  const clearFilters = () => {
    setSearch("");
    setFilterType("all");
    setSelectedCategories([]);
    setDateRange({ start: "", end: "" });
    setAmountRange({ min: "", max: "" });
  };

  const hasActiveFilters = search || filterType !== "all" || selectedCategories.length > 0 || dateRange.start || dateRange.end || amountRange.min || amountRange.max;

  // Enhanced category colors with FIXED text visibility
  const getCategoryColors = (category) => {
    const colorMap = {
      'Food': { 
        light: 'bg-gradient-to-r from-orange-400 to-red-500', 
        dark: 'bg-gradient-to-r from-orange-500 to-red-500',
        lightText: 'text-gray-900',
        darkText: 'text-white',
        shadow: 'shadow-orange-500/30',
        icon: '🍔',
        bgLight: 'bg-orange-100',
        bgDark: 'bg-orange-900/50'
      },
      'Shopping': { 
        light: 'bg-gradient-to-r from-pink-400 to-rose-500', 
        dark: 'bg-gradient-to-r from-pink-500 to-rose-500',
        lightText: 'text-gray-900',
        darkText: 'text-white',
        shadow: 'shadow-pink-500/30',
        icon: '🛍️',
        bgLight: 'bg-pink-100',
        bgDark: 'bg-pink-900/50'
      },
      'Transport': { 
        light: 'bg-gradient-to-r from-blue-400 to-cyan-500', 
        dark: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        lightText: 'text-gray-900',
        darkText: 'text-white',
        shadow: 'shadow-blue-500/30',
        icon: '🚗',
        bgLight: 'bg-blue-100',
        bgDark: 'bg-blue-900/50'
      },
      'Entertainment': { 
        light: 'bg-gradient-to-r from-purple-400 to-indigo-500', 
        dark: 'bg-gradient-to-r from-purple-500 to-indigo-500',
        lightText: 'text-gray-900',
        darkText: 'text-white',
        shadow: 'shadow-purple-500/30',
        icon: '🎬',
        bgLight: 'bg-purple-100',
        bgDark: 'bg-purple-900/50'
      },
      'Rent': { 
        light: 'bg-gradient-to-r from-emerald-400 to-teal-500', 
        dark: 'bg-gradient-to-r from-emerald-500 to-teal-500',
        lightText: 'text-gray-900',
        darkText: 'text-white',
        shadow: 'shadow-emerald-500/30',
        icon: '🏠',
        bgLight: 'bg-emerald-100',
        bgDark: 'bg-emerald-900/50'
      },
      'Utilities': { 
        light: 'bg-gradient-to-r from-yellow-400 to-amber-500', 
        dark: 'bg-gradient-to-r from-yellow-500 to-amber-500',
        lightText: 'text-gray-900',
        darkText: 'text-white',
        shadow: 'shadow-yellow-500/30',
        icon: '💡',
        bgLight: 'bg-yellow-100',
        bgDark: 'bg-yellow-900/50'
      },
      'Coffee': { 
        light: 'bg-gradient-to-r from-amber-400 to-orange-500', 
        dark: 'bg-gradient-to-r from-amber-500 to-orange-500',
        lightText: 'text-gray-900',
        darkText: 'text-white',
        shadow: 'shadow-amber-500/30',
        icon: '☕',
        bgLight: 'bg-amber-100',
        bgDark: 'bg-amber-900/50'
      },
      'Salary': { 
        light: 'bg-gradient-to-r from-green-400 to-emerald-500', 
        dark: 'bg-gradient-to-r from-green-500 to-emerald-500',
        lightText: 'text-gray-900',
        darkText: 'text-white',
        shadow: 'shadow-green-500/30',
        icon: '💰',
        bgLight: 'bg-green-100',
        bgDark: 'bg-green-900/50'
      },
      'Freelance': { 
        light: 'bg-gradient-to-r from-cyan-400 to-blue-500', 
        dark: 'bg-gradient-to-r from-cyan-500 to-blue-500',
        lightText: 'text-gray-900',
        darkText: 'text-white',
        shadow: 'shadow-cyan-500/30',
        icon: '💻',
        bgLight: 'bg-cyan-100',
        bgDark: 'bg-cyan-900/50'
      },
      'Design': { 
        light: 'bg-gradient-to-r from-violet-400 to-purple-500', 
        dark: 'bg-gradient-to-r from-violet-500 to-purple-500',
        lightText: 'text-gray-900',
        darkText: 'text-white',
        shadow: 'shadow-violet-500/30',
        icon: '🎨',
        bgLight: 'bg-violet-100',
        bgDark: 'bg-violet-900/50'
      },
    };
    const defaultColors = { 
      light: 'bg-gradient-to-r from-gray-400 to-gray-500', 
      dark: 'bg-gradient-to-r from-gray-500 to-gray-600',
      lightText: 'text-gray-900',
      darkText: 'text-white',
      shadow: 'shadow-gray-500/30',
      icon: '📦',
      bgLight: 'bg-gray-100',
      bgDark: 'bg-gray-800'
    };
    return colorMap[category] || defaultColors;
  };

  // Calculate summary statistics
  const totalIncome = filtered.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = filtered.filter(t => t.type === "expense").reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpense;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`
        rounded-2xl p-6 backdrop-blur-xl transition-all duration-300 relative
        ${isDark 
          ? 'bg-gray-900/80 border border-gray-700/50' 
          : 'bg-white/80 border border-white/50'
        }
        shadow-2xl
      `}
    >
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-indigo-600/10' : 'bg-indigo-200/30'}`} />
        <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl ${isDark ? 'bg-purple-600/10' : 'bg-purple-200/30'}`} />
      </div>

      {/* Header Section */}
      <div className="relative z-10">
        <div className="flex flex-wrap gap-4 items-center justify-between mb-6">
          <div>
            <h3 className={`text-2xl font-bold flex items-center gap-3 ${isDark ? 'text-white' : 'text-gray-800'}`}>
              <div className="p-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 shadow-lg shadow-indigo-500/30">
                <Layers className="w-5 h-5 text-white" />
              </div>
              Transaction History
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={`text-xs px-3 py-1 rounded-full font-medium ${isDark ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-600'}`}
              >
                {filtered.length} {filtered.length === 1 ? 'item' : 'items'}
              </motion.span>
            </h3>
            {filtered.length > 0 && (
              <p className={`text-xs mt-1 ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                Showing {filtered.length} of {data.length} transactions
              </p>
            )}
          </div>
          
          <div className="flex gap-2">
            {role === "admin" && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onAddTransaction}
                className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all flex items-center gap-2 text-sm font-medium shadow-lg shadow-indigo-500/30"
              >
                <Plus className="w-4 h-4" />
                Add Transaction
              </motion.button>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className={`p-3 rounded-xl ${isDark ? 'bg-green-500/10 border border-green-500/20' : 'bg-green-50 border border-green-200'}`}>
              <div className="flex items-center justify-between">
                <TrendingUp className={`w-4 h-4 ${isDark ? 'text-green-400' : 'text-green-600'}`} />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Income</span>
              </div>
              <p className={`text-lg font-bold mt-1 ${isDark ? 'text-green-400' : 'text-green-600'}`}>₹{totalIncome.toLocaleString()}</p>
            </div>
            <div className={`p-3 rounded-xl ${isDark ? 'bg-red-500/10 border border-red-500/20' : 'bg-red-50 border border-red-200'}`}>
              <div className="flex items-center justify-between">
                <TrendingDown className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-600'}`} />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Expense</span>
              </div>
              <p className={`text-lg font-bold mt-1 ${isDark ? 'text-red-400' : 'text-red-600'}`}>₹{totalExpense.toLocaleString()}</p>
            </div>
            <div className={`p-3 rounded-xl ${isDark ? 'bg-indigo-500/10 border border-indigo-500/20' : 'bg-indigo-50 border border-indigo-200'}`}>
              <div className="flex items-center justify-between">
                <Zap className={`w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-indigo-600'}`} />
                <span className={`text-xs ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>Net</span>
              </div>
              <p className={`text-lg font-bold mt-1 ${netBalance >= 0 ? (isDark ? 'text-green-400' : 'text-green-600') : (isDark ? 'text-red-400' : 'text-red-600')}`}>
                ₹{netBalance.toLocaleString()}
              </p>
            </div>
          </div>
        )}

        {/* Search and Filter Bar */}
        <div className="space-y-3">
          <div className="flex flex-wrap gap-3">
            <div className="flex-1 min-w-[200px] relative group">
              <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 transition-colors ${isDark ? 'text-gray-500 group-focus-within:text-indigo-400' : 'text-gray-400 group-focus-within:text-indigo-500'}`} />
              <input
                type="text"
                placeholder="Search by category, amount, or description..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className={`
                  w-full pl-10 pr-10 py-3 rounded-xl transition-all duration-200
                  ${isDark 
                    ? 'bg-gray-800/80 border-gray-600 text-white placeholder-gray-500 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50' 
                    : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-200'
                  }
                  border focus:outline-none shadow-sm
                `}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  <X className={`w-4 h-4 ${isDark ? 'text-gray-500 hover:text-gray-300' : 'text-gray-400 hover:text-gray-600'}`} />
                </button>
              )}
            </div>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowFilters(!showFilters)}
              className={`
                px-5 py-3 rounded-xl flex items-center gap-2 transition-all font-medium
                ${showFilters 
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg' 
                  : isDark 
                    ? 'bg-gray-800/80 text-gray-300 hover:bg-gray-700 border border-gray-600' 
                    : 'bg-white/80 text-gray-700 hover:bg-white border border-gray-200'
                }
              `}
            >
              <Filter className="w-4 h-4" />
              Filters
              {hasActiveFilters && (
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              )}
            </motion.button>
          </div>

          {/* Advanced Filters Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -10 }}
                animate={{ opacity: 1, height: "auto", y: 0 }}
                exit={{ opacity: 0, height: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className={`
                  p-5 rounded-xl mt-2
                  ${isDark ? 'bg-gray-800/80 border border-gray-700' : 'bg-white/80 border border-gray-200'}
                  backdrop-blur-sm shadow-lg
                `}>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {/* Type Filter */}
                    <div>
                      <label className={`text-xs font-semibold uppercase tracking-wider mb-2 block ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Transaction Type
                      </label>
                      <div className="flex gap-2">
                        {['all', 'income', 'expense'].map((type) => (
                          <button
                            key={type}
                            onClick={() => setFilterType(type)}
                            className={`
                              flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-all
                              ${filterType === type 
                                ? type === 'all' 
                                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md' 
                                  : type === 'income'
                                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-md'
                                    : 'bg-gradient-to-r from-red-500 to-rose-500 text-white shadow-md'
                                : isDark 
                                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }
                            `}
                          >
                            {type === 'all' ? 'All' : type === 'income' ? 'Income' : 'Expense'}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <label className={`text-xs font-semibold uppercase tracking-wider mb-2 block ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Categories
                      </label>
                      <div className="flex flex-wrap gap-2 max-h-32 overflow-y-auto p-1">
                        {allCategories.map(cat => {
                          const colors = getCategoryColors(cat);
                          const isSelected = selectedCategories.includes(cat);
                          return (
                            <motion.button
                              key={cat}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                if (isSelected) {
                                  setSelectedCategories(selectedCategories.filter(c => c !== cat));
                                } else {
                                  setSelectedCategories([...selectedCategories, cat]);
                                }
                              }}
                              className={`
                                px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1
                                ${isSelected
                                  ? `${isDark ? colors.dark : colors.light} text-white shadow-lg ${colors.shadow}`
                                  : isDark 
                                    ? 'bg-gray-700 text-gray-300 hover:bg-gray-600' 
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }
                              `}
                            >
                              <span>{colors.icon}</span>
                              <span>{cat}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Amount Range */}
                    <div>
                      <label className={`text-xs font-semibold uppercase tracking-wider mb-2 block ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                        Amount Range (₹)
                      </label>
                      <div className="flex gap-2">
                        <div className="relative flex-1">
                          <DollarSign className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                          <input
                            type="number"
                            placeholder="Min"
                            value={amountRange.min}
                            onChange={(e) => setAmountRange({ ...amountRange, min: e.target.value })}
                            className={`
                              w-full pl-7 pr-2 py-2 rounded-lg text-sm
                              ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}
                              border focus:outline-none focus:ring-2 focus:ring-indigo-500
                            `}
                          />
                        </div>
                        <div className="relative flex-1">
                          <DollarSign className={`absolute left-2 top-1/2 transform -translate-y-1/2 w-3 h-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                          <input
                            type="number"
                            placeholder="Max"
                            value={amountRange.max}
                            onChange={(e) => setAmountRange({ ...amountRange, max: e.target.value })}
                            className={`
                              w-full pl-7 pr-2 py-2 rounded-lg text-sm
                              ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-900'}
                              border focus:outline-none focus:ring-2 focus:ring-indigo-500
                            `}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {hasActiveFilters && (
                    <div className="mt-4 flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={clearFilters}
                        className="text-xs text-red-500 hover:text-red-600 flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-red-500/10 transition-all"
                      >
                        <X className="w-3 h-3" />
                        Clear all filters
                      </motion.button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="overflow-x-auto relative z-10 mt-6">
        <table className="w-full text-sm">
          <thead>
            <tr className={`border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
              {['date', 'category', 'amount'].map((field) => (
                <th
                  key={field}
                  onClick={() => handleSort(field)}
                  className={`
                    text-left py-4 px-3 cursor-pointer transition-all group
                    ${isDark ? 'text-gray-400 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'}
                  `}
                >
                  <div className="flex items-center gap-2">
                    {field === 'date' && <Calendar className="w-3.5 h-3.5" />}
                    {field === 'category' && <Tag className="w-3.5 h-3.5" />}
                    {field === 'amount' && <DollarSign className="w-3.5 h-3.5" />}
                    <span className="font-semibold uppercase text-xs tracking-wider">
                      {field}
                    </span>
                    <ArrowUpDown className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {sortBy === field && (
                      sortOrder === "desc" ? <ChevronDown className="w-3 h-3" /> : <ChevronUp className="w-3 h-3" />
                    )}
                  </div>
                </th>
              ))}
              <th className={`text-left py-4 px-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                <span className="font-semibold uppercase text-xs tracking-wider">Type</span>
              </th>
              {role === "admin" && (
                <th className={`text-center py-4 px-3 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                  <span className="font-semibold uppercase text-xs tracking-wider">Actions</span>
                </th>
              )}
             </tr>
          </thead>
          <tbody>
            <AnimatePresence mode="wait">
              {filtered.map((t, index) => {
                const categoryColors = getCategoryColors(t.category);
                // Determine text color based on dark mode - ALWAYS WHITE IN DARK MODE
                // const categoryTextColor = isDark ? 'text-white' : 'text-gray-900';
                const categoryTextColor = isDark ? 'text-gray-200' : 'text-gray-800';
                return (
                  <motion.tr
                    key={t.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.02 }}
                    className={`
                      border-b transition-all duration-200 group
                      ${isDark 
                        ? 'border-gray-700/50 hover:bg-gray-800/50' 
                        : 'border-gray-100 hover:bg-white/50'
                      }
                    `}
                  >
                    <td className={`py-3 px-3 ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
                      <div className="flex items-center gap-2">
                        <Calendar className={`w-3 h-3 ${isDark ? 'text-gray-500' : 'text-gray-400'}`} />
                        <span className="font-medium">{t.date}</span>
                      </div>
                    </td>
                    
                    {/* FIXED: Category cell with guaranteed visibility */}
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-3">
                        {/* Icon Badge */}
                        <div className={`
                          w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0
                          ${isDark ? categoryColors.dark : categoryColors.light}
                          shadow-lg ${categoryColors.shadow}
                        `}>
                          <span className="text-sm">{categoryColors.icon}</span>
                        </div>
                        {/* Category Name - FIXED TEXT COLOR */}
                      <span
  className={`
    font-semibold text-base transition-colors duration-200
    ${isDark ? 'text-gray-200 group-hover:text-white' : 'text-gray-800'}
  `}
>
  {t.category}
</span>
                      </div>
                    </td>
                    
                    <td className={`py-3 px-3 text-right font-bold ${t.type === "income" ? "text-green-500" : "text-red-500"}`}>
                      <div className="flex items-center justify-end gap-1">
                        <span>{t.type === "income" ? "+" : "-"}</span>
                        <span className="text-lg">₹{t.amount.toLocaleString()}</span>
                      </div>
                    </td>
                    
                    <td className="py-3 px-3">
                      <span className={`
                        inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold
                        ${t.type === "income" 
                          ? isDark 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-green-100 text-green-700'
                          : isDark 
                            ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                            : 'bg-red-100 text-red-700'
                        }
                      `}>
                        {t.type === "income" ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                        {t.type}
                      </span>
                    </td>
                    
                    {role === "admin" && (
                      <td className="py-3 px-3 text-center">
                        <div className="flex gap-1 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onEditTransaction(t)}
                            className={`p-1.5 rounded-lg transition-all ${isDark ? 'hover:bg-indigo-500/20' : 'hover:bg-indigo-100'}`}
                          >
                            <Edit className={`w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
                          </motion.button>
                          <motion.button
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => onDeleteTransaction(t.id)}
                            className={`p-1.5 rounded-lg transition-all ${isDark ? 'hover:bg-red-500/20' : 'hover:bg-red-100'}`}
                          >
                            <Trash2 className={`w-4 h-4 ${isDark ? 'text-red-400' : 'text-red-500'}`} />
                          </motion.button>
                        </div>
                      </td>
                    )}
                  </motion.tr>
                );
              })}
            </AnimatePresence>
          </tbody>
        </table>
        
        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className={`inline-flex items-center justify-center w-24 h-24 rounded-full mb-4 ${isDark ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <Search className={`w-10 h-10 ${isDark ? 'text-gray-600' : 'text-gray-400'}`} />
            </div>
            <p className={`text-base ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
              {hasActiveFilters ? 'No transactions match your filters' : 'No transactions yet'}
            </p>
            {hasActiveFilters && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={clearFilters}
                className="mt-3 text-sm text-indigo-500 hover:text-indigo-600 font-medium"
              >
                Clear all filters
              </motion.button>
            )}
            {!hasActiveFilters && role === "admin" && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                onClick={onAddTransaction}
                className="mt-3 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl text-sm font-medium shadow-lg"
              >
                Add your first transaction
              </motion.button>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}