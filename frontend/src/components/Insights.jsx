// components/Insights.jsx
import { motion } from "framer-motion";
// import { getHighestSpending, getMonthlyComparison, calculateSummary } from "../utils/helpers";

import { TrendingUp, AlertCircle, Award, Zap, TrendingDown, PieChart, DollarSign, Target, Sparkles, Import } from "lucide-react";
import { useDarkMode } from "../context/DarkModeContext";
import { calculateSummary, getHighestSpending, getMonthlyComparison } from "../utils/helper";

export default function Insights({ data }) {
  const { isDark } = useDarkMode();
  const highest = getHighestSpending(data);
  const monthlyComp = getMonthlyComparison(data);
  const summary = calculateSummary(data);
  
  const currentMonth = monthlyComp[monthlyComp.length - 1];
  const prevMonth = monthlyComp[monthlyComp.length - 2];
  const savingsChange = prevMonth && currentMonth 
    ? ((currentMonth.savings - prevMonth.savings) / prevMonth.savings * 100).toFixed(1)
    : 0;

  const topCategories = data
    .filter(t => t.type === "expense")
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
  
  const topCategory = Object.entries(topCategories).sort((a, b) => b[1] - a[1])[0];
  
  // Calculate spending trend
  const spendingTrend = monthlyComp.length >= 2 
    ? ((currentMonth?.expense - prevMonth?.expense) / prevMonth?.expense * 100).toFixed(1)
    : 0;

  const insightCards = [
    {
      id: 'highest',
      condition: highest,
      icon: AlertCircle,
      gradient: isDark ? 'from-red-900/50 to-orange-900/50' : 'from-red-50 to-orange-50',
      borderGradient: 'from-red-500 to-orange-500',
      iconColor: 'text-red-500',
      titleColor: isDark ? 'text-red-400' : 'text-red-600',
      valueColor: isDark ? 'text-red-300' : 'text-red-700',
      content: (
        <>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>💸 Highest Spending</p>
          <p className={`font-bold text-lg ${isDark ? 'text-red-400' : 'text-red-600'}`}>{highest?.category}</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-red-300' : 'text-red-700'}`}>₹{highest?.amount?.toLocaleString()}</p>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>{highest?.date}</p>
        </>
      )
    },
    {
      id: 'topCategory',
      condition: topCategory,
      icon: PieChart,
      gradient: isDark ? 'from-purple-900/50 to-pink-900/50' : 'from-purple-50 to-pink-50',
      borderGradient: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-500',
      titleColor: isDark ? 'text-purple-400' : 'text-purple-600',
      valueColor: isDark ? 'text-purple-300' : 'text-purple-700',
      content: (
        <>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>🏆 Most Spent Category</p>
          <p className={`font-bold text-lg ${isDark ? 'text-purple-400' : 'text-purple-600'}`}>{topCategory?.[0]}</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-purple-300' : 'text-purple-700'}`}>₹{topCategory?.[1]?.toLocaleString()}</p>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Total expenses</p>
        </>
      )
    },
    {
      id: 'savings',
      icon: TrendingUp,
      gradient: isDark ? 'from-green-900/50 to-emerald-900/50' : 'from-green-50 to-emerald-50',
      borderGradient: 'from-green-500 to-emerald-500',
      iconColor: 'text-green-500',
      titleColor: isDark ? 'text-green-400' : 'text-green-600',
      valueColor: isDark ? 'text-green-300' : 'text-green-700',
      content: (
        <>
          <p className={`text-sm mb-1 flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            <TrendingUp className="w-3 h-3" />
            Monthly Savings
          </p>
          <p className={`text-2xl font-bold ${isDark ? 'text-green-300' : 'text-green-700'}`}>
            ₹{currentMonth?.savings?.toLocaleString() || 0}
          </p>
          <p className={`text-xs mt-1 ${savingsChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
            {savingsChange >= 0 ? '↑' : '↓'} {Math.abs(savingsChange)}% from last month
          </p>
        </>
      )
    },
    {
      id: 'savingsRate',
      icon: Target,
      gradient: isDark ? 'from-blue-900/50 to-cyan-900/50' : 'from-blue-50 to-cyan-50',
      borderGradient: 'from-blue-500 to-cyan-500',
      iconColor: 'text-blue-500',
      titleColor: isDark ? 'text-blue-400' : 'text-blue-600',
      valueColor: isDark ? 'text-blue-300' : 'text-blue-700',
      content: (
        <>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>💰 Savings Rate</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>
            {summary.totalIncome > 0 
              ? ((summary.balance / summary.totalIncome) * 100).toFixed(1)
              : 0}%
          </p>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>of total income saved</p>
        </>
      )
    },
    {
      id: 'avgExpense',
      icon: DollarSign,
      gradient: isDark ? 'from-yellow-900/50 to-amber-900/50' : 'from-yellow-50 to-amber-50',
      borderGradient: 'from-yellow-500 to-amber-500',
      iconColor: 'text-yellow-500',
      titleColor: isDark ? 'text-yellow-400' : 'text-yellow-600',
      valueColor: isDark ? 'text-yellow-300' : 'text-amber-700',
      content: (
        <>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>📊 Avg Monthly Expense</p>
          <p className={`text-2xl font-bold ${isDark ? 'text-yellow-300' : 'text-amber-700'}`}>
            ₹{(summary.totalExpense / (monthlyComp.length || 1)).toFixed(0)}
          </p>
          <p className={`text-xs mt-1 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
            across {monthlyComp.length || 1} {monthlyComp.length === 1 ? 'month' : 'months'}
          </p>
        </>
      )
    },
    {
      id: 'tip',
      icon: Zap,
      gradient: isDark ? 'from-indigo-900/50 to-violet-900/50' : 'from-indigo-50 to-violet-50',
      borderGradient: 'from-indigo-500 to-violet-500',
      iconColor: 'text-indigo-500',
      titleColor: isDark ? 'text-indigo-400' : 'text-indigo-600',
      valueColor: isDark ? 'text-indigo-300' : 'text-indigo-700',
      content: (
        <>
          <p className={`text-sm mb-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>⚡ Quick Tip</p>
          {summary.balance > summary.totalIncome * 0.2 ? (
            <p className={`text-sm font-medium ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
              🎉 Great job! You're saving over 20% of income
            </p>
          ) : (
            <p className={`text-sm font-medium ${isDark ? 'text-indigo-300' : 'text-indigo-700'}`}>
              📉 Try to reduce non-essential expenses
            </p>
          )}
        </>
      )
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className={`
        rounded-2xl p-6 backdrop-blur-xl transition-all duration-300
        ${isDark 
          ? 'bg-gray-800/40 border border-gray-700/50' 
          : 'bg-white/40 border border-white/50'
        }
        shadow-xl hover:shadow-2xl
      `}
    >
      {/* Header with Animated Gradient */}
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-xl blur-xl" />
        <h2 className={`
          text-xl font-bold flex items-center gap-2 relative z-10
          ${isDark ? 'text-gray-100' : 'text-gray-800'}
        `}>
          <div className={`
            p-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500
            shadow-lg shadow-indigo-500/30
          `}>
            <Award className="w-5 h-5 text-white" />
          </div>
          Smart Insights
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="ml-auto"
          >
            <Sparkles className={`w-4 h-4 ${isDark ? 'text-indigo-400' : 'text-indigo-500'}`} />
          </motion.div>
        </h2>
      </div>
      
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {insightCards.map((card, index) => (
          (card.condition !== false && card.condition !== null && card.condition !== undefined) || !card.condition ? (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 * index, type: "spring", stiffness: 200 }}
              whileHover={{ 
                y: -5,
                scale: 1.02,
                transition: { type: "spring", stiffness: 400, damping: 25 }
              }}
              className={`
                relative overflow-hidden rounded-xl p-4
                bg-gradient-to-br ${card.gradient}
                backdrop-blur-sm
                border border-white/20
                transition-all duration-300
                cursor-pointer group
              `}
            >
              {/* Animated Background Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              
              {/* Decorative Glow */}
              <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${card.borderGradient} opacity-10 rounded-full blur-2xl`} />
              
              {/* Icon with Animation */}
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className={`
                  absolute top-3 right-3 p-1.5 rounded-lg
                  bg-gradient-to-br ${card.borderGradient} bg-opacity-20
                `}
              >
                <card.icon className={`w-4 h-4 ${card.iconColor}`} />
              </motion.div>
              
              {/* Content */}
              <div className="relative z-10">
                {card.content}
              </div>
              
              {/* Progress Bar Animation for Savings Rate */}
              {card.id === 'savingsRate' && summary.totalIncome > 0 && (
                <div className="mt-3">
                  <div className={`h-1 rounded-full overflow-hidden ${isDark ? 'bg-gray-700' : 'bg-gray-200'}`}>
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${((summary.balance / summary.totalIncome) * 100)}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full rounded-full bg-gradient-to-r ${card.borderGradient}`}
                    />
                  </div>
                </div>
              )}
              
              {/* Sparkle Effect for Tip Card */}
              {card.id === 'tip' && (
                <motion.div
                  animate={{ 
                    y: [0, -2, 0],
                    opacity: [0.5, 1, 0.5]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute bottom-2 right-2"
                >
                  <Sparkles className={`w-3 h-3 ${card.iconColor}`} />
                </motion.div>
              )}
            </motion.div>
          ) : null
        ))}
      </div>
      
      {/* Additional Insight: Spending Trend */}
      {monthlyComp.length >= 2 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className={`
            mt-5 p-4 rounded-xl
            ${isDark ? 'bg-gray-700/30' : 'bg-gray-100/50'}
            backdrop-blur-sm
          `}
        >
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <TrendingDown className={`w-4 h-4 ${spendingTrend <= 0 ? 'text-green-500' : 'text-red-500'}`} />
              <p className={`text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                Spending Trend: 
                <span className={`font-semibold ml-1 ${spendingTrend <= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {spendingTrend <= 0 ? '↓' : '↑'} {Math.abs(spendingTrend)}%
                </span>
              </p>
            </div>
            <p className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
              {spendingTrend <= 0 
                ? 'Great! Your spending decreased compared to last month' 
                : 'Your spending increased compared to last month'}
            </p>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}