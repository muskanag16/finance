// // src/components/AdvancedCharts.jsx
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   Tooltip,
//   AreaChart,
//   Area,
//   PieChart,
//   Pie,
//   Cell,
//   Legend
// } from "recharts";

// // helper functions
// const groupByMonth = (data) => {
//   const map = {};
//   data.forEach(t => {
//     if (!map[t.date]) map[t.date] = { date: t.date, income: 0, expense: 0 };
//     if (t.type === "income") map[t.date].income += t.amount;
//     else map[t.date].expense += t.amount;
//   });
//   return Object.values(map);
// };

// const categoryData = (data) => {
//   const map = {};
//   data.forEach(t => {
//     if (t.type === "expense") {
//       map[t.category] = (map[t.category] || 0) + t.amount;
//     }
//   });
//   return Object.keys(map).map(k => ({ name: k, value: map[k] }));
// };

// const runningBalance = (data) => {
//   let balance = 0;
//   return data.map(t => {
//     balance += t.type === "income" ? t.amount : -t.amount;
//     return { ...t, balance };
//   });
// };

// export default function AdvancedCharts({ data }) {
//   const monthly = groupByMonth(data);
//   const categories = categoryData(data);
//   const trend = runningBalance(data);

//   const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444"];

//   return (
//     <div className="grid md:grid-cols-2 gap-6">

//       {/* 📊 Income vs Expense */}
//       <div className="glass p-4 rounded-2xl">
//         <h3 className="mb-2 font-semibold">Income vs Expense</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <BarChart data={monthly}>
//             <XAxis dataKey="date" />
//             <Tooltip />
//             <Legend />
//             <Bar dataKey="income" fill="#22c55e" />
//             <Bar dataKey="expense" fill="#ef4444" />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* 📈 Monthly Trend */}
//       <div className="glass p-4 rounded-2xl">
//         <h3 className="mb-2 font-semibold">Monthly Trend</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <AreaChart data={monthly}>
//             <XAxis dataKey="date" />
//             <Tooltip />
//             <Area type="monotone" dataKey="income" stroke="#22c55e" fill="#22c55e33" />
//             <Area type="monotone" dataKey="expense" stroke="#ef4444" fill="#ef444433" />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>

//       {/* 📉 Running Balance */}
//       <div className="glass p-4 rounded-2xl">
//         <h3 className="mb-2 font-semibold">Running Balance</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <AreaChart data={trend}>
//             <XAxis dataKey="date" />
//             <Tooltip />
//             <Area type="monotone" dataKey="balance" stroke="#6366f1" fill="#6366f133" />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>

//       {/* 🧠 Category Analytics */}
//       <div className="glass p-4 rounded-2xl">
//         <h3 className="mb-2 font-semibold">Spending by Category</h3>
//         <ResponsiveContainer width="100%" height={250}>
//           <PieChart>
//             <Pie
//               data={categories}
//               dataKey="value"
//               nameKey="name"
//               outerRadius={80}
//               label
//             >
//               {categories.map((_, i) => (
//                 <Cell key={i} fill={COLORS[i % COLORS.length]} />
//               ))}
//             </Pie>
//             <Tooltip />
//           </PieChart>
//         </ResponsiveContainer>
//       </div>

//     </div>
//   );
// }
// import {
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   XAxis,
//   Tooltip,
//   AreaChart,
//   Area,
//   PieChart,
//   Pie,
//   Cell,
//   Legend,
//   CartesianGrid,
// } from "recharts";
// import { groupByMonth,
//   categoryData, runningBalance } from "../utils/helper";


//   categoryData, runningBalance

// const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#ec489a", "#14b8a6"];

// export default function AdvancedCharts({ data }) {
//   const monthly = groupByMonth(data);
//   const categories = categoryData(data);
//   const trend = runningBalance(data);

//   const CustomTooltip = ({ active, payload, label }) => {
//     if (active && payload && payload.length) {
//       return (
//         <div className="glass p-3 rounded-lg shadow-lg">
//           <p className="font-semibold text-sm">{label}</p>
//           {payload.map((p, idx) => (
//             <p key={idx} className="text-sm" style={{ color: p.color }}>
//               {p.name}: ₹{p.value.toLocaleString()}
//             </p>
//           ))}
//         </div>
//       );
//     }
//     return null;
//   };

//   return (
//     <div className="grid md:grid-cols-2 gap-6">
//       {/* Income vs Expense Bar Chart */}
//       <div className="glass-card p-5">
//         <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//           <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
//           Income vs Expense
//         </h3>
//         <ResponsiveContainer width="100%" height={260}>
//           <BarChart data={monthly}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//             <XAxis dataKey="date" stroke="#64748b" />
//             <Tooltip content={<CustomTooltip />} />
//             <Legend />
//             <Bar dataKey="income" fill="#22c55e" radius={[8, 8, 0, 0]} />
//             <Bar dataKey="expense" fill="#ef4444" radius={[8, 8, 0, 0]} />
//           </BarChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Monthly Trend Area Chart */}
//       <div className="glass-card p-5">
//         <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//           <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
//           Monthly Trend
//         </h3>
//         <ResponsiveContainer width="100%" height={260}>
//           <AreaChart data={monthly}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//             <XAxis dataKey="date" stroke="#64748b" />
//             <Tooltip content={<CustomTooltip />} />
//             <Area
//               type="monotone"
//               dataKey="income"
//               stroke="#22c55e"
//               fill="#22c55e33"
//               strokeWidth={2}
//             />
//             <Area
//               type="monotone"
//               dataKey="expense"
//               stroke="#ef4444"
//               fill="#ef444433"
//               strokeWidth={2}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Running Balance */}
//       <div className="glass-card p-5">
//         <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//           <span className="w-1 h-6 bg-green-500 rounded-full"></span>
//           Running Balance
//         </h3>
//         <ResponsiveContainer width="100%" height={260}>
//           <AreaChart data={trend}>
//             <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
//             <XAxis dataKey="date" stroke="#64748b" />
//             <Tooltip content={<CustomTooltip />} />
//             <Area
//               type="monotone"
//               dataKey="balance"
//               stroke="#6366f1"
//               fill="#6366f133"
//               strokeWidth={2}
//             />
//           </AreaChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Category Pie Chart */}
//       <div className="glass-card p-5">
//         <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
//           <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
//           Spending by Category
//         </h3>
//         {categories.length > 0 ? (
//           <ResponsiveContainer width="100%" height={260}>
//             <PieChart>
//               <Pie
//                 data={categories}
//                 dataKey="value"
//                 nameKey="name"
//                 cx="50%"
//                 cy="50%"
//                 outerRadius={90}
//                 label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
//                 labelLine={false}
//               >
//                 {categories.map((_, index) => (
//                   <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                 ))}
//               </Pie>
//               <Tooltip content={<CustomTooltip />} />
//             </PieChart>
//           </ResponsiveContainer>
//         ) : (
//           <div className="h-[260px] flex items-center justify-center text-gray-400">
//             No expense data available
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
  CartesianGrid,
} from "recharts";
// import { groupByMonth, categoryData, runningBalance } from "../utils/helpers";
import { groupByMonth,categoryData,runningBalance } from "../utils/helper";
import { useDarkMode } from "../context/DarkModeContext";

const COLORS = ["#6366f1", "#22c55e", "#f59e0b", "#ef4444", "#8b5cf6", "#ec489a", "#14b8a6"];
const DARK_COLORS = ["#818cf8", "#4ade80", "#fbbf24", "#f87171", "#a78bfa", "#f472b6", "#2dd4bf"];

export default function AdvancedCharts({ data }) {
  const { isDark } = useDarkMode();
  const monthly = groupByMonth(data);
  const categories = categoryData(data);
  const trend = runningBalance(data);

  // Dynamic colors based on dark mode
  const chartColors = {
    grid: isDark ? "#374151" : "#e2e8f0",
    axis: isDark ? "#9ca3af" : "#64748b",
    text: isDark ? "#f3f4f6" : "#1f2937",
    income: "#22c55e",
    expense: "#ef4444",
    balance: "#6366f1",
    incomeFill: isDark ? "#22c55e40" : "#22c55e33",
    expenseFill: isDark ? "#ef444440" : "#ef444433",
    balanceFill: isDark ? "#6366f140" : "#6366f133",
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className={`
          p-3 rounded-lg shadow-lg backdrop-blur-xl
          ${isDark 
            ? 'bg-gray-900/90 border border-gray-700 text-gray-100' 
            : 'bg-white/90 border border-white/50 text-gray-900'
          }
        `}>
          <p className={`font-semibold text-sm mb-1 ${isDark ? 'text-gray-200' : 'text-gray-700'}`}>
            {label}
          </p>
          {payload.map((p, idx) => (
            <p key={idx} className="text-sm flex items-center gap-2" style={{ color: p.color }}>
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></span>
              {p.name}: <span className="font-bold">₹{p.value.toLocaleString()}</span>
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Income vs Expense Bar Chart */}
      <div className={`
        rounded-2xl p-5 backdrop-blur-xl transition-all duration-300
        ${isDark 
          ? 'bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60' 
          : 'bg-white/40 border border-white/50 hover:bg-white/60'
        }
        shadow-lg hover:shadow-xl
      `}>
        <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
          <span className="w-1 h-6 bg-indigo-500 rounded-full"></span>
          Income vs Expense
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={monthly}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={chartColors.grid}
              opacity={isDark ? 0.3 : 0.5}
            />
            <XAxis 
              dataKey="date" 
              stroke={chartColors.axis}
              tick={{ fill: chartColors.axis, fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ 
                color: chartColors.text,
                fontSize: 12,
                paddingTop: 10
              }}
            />
            <Bar 
              dataKey="income" 
              fill={chartColors.income}
              radius={[8, 8, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Bar 
              dataKey="expense" 
              fill={chartColors.expense}
              radius={[8, 8, 0, 0]}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Trend Area Chart */}
      <div className={`
        rounded-2xl p-5 backdrop-blur-xl transition-all duration-300
        ${isDark 
          ? 'bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60' 
          : 'bg-white/40 border border-white/50 hover:bg-white/60'
        }
        shadow-lg hover:shadow-xl
      `}>
        <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
          <span className="w-1 h-6 bg-purple-500 rounded-full"></span>
          Monthly Trend
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={monthly}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={chartColors.grid}
              opacity={isDark ? 0.3 : 0.5}
            />
            <XAxis 
              dataKey="date" 
              stroke={chartColors.axis}
              tick={{ fill: chartColors.axis, fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stroke={chartColors.income}
              fill={chartColors.incomeFill}
              strokeWidth={2}
              animationDuration={1500}
              animationEasing="ease-out"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke={chartColors.expense}
              fill={chartColors.expenseFill}
              strokeWidth={2}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Running Balance */}
      <div className={`
        rounded-2xl p-5 backdrop-blur-xl transition-all duration-300
        ${isDark 
          ? 'bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60' 
          : 'bg-white/40 border border-white/50 hover:bg-white/60'
        }
        shadow-lg hover:shadow-xl
      `}>
        <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
          <span className="w-1 h-6 bg-green-500 rounded-full"></span>
          Running Balance
        </h3>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={trend}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke={chartColors.grid}
              opacity={isDark ? 0.3 : 0.5}
            />
            <XAxis 
              dataKey="date" 
              stroke={chartColors.axis}
              tick={{ fill: chartColors.axis, fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="balance"
              stroke={chartColors.balance}
              fill={chartColors.balanceFill}
              strokeWidth={2}
              animationDuration={1500}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Category Pie Chart */}
      <div className={`
        rounded-2xl p-5 backdrop-blur-xl transition-all duration-300
        ${isDark 
          ? 'bg-gray-800/40 border border-gray-700/50 hover:bg-gray-800/60' 
          : 'bg-white/40 border border-white/50 hover:bg-white/60'
        }
        shadow-lg hover:shadow-xl
      `}>
        <h3 className={`font-bold mb-4 flex items-center gap-2 ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>
          <span className="w-1 h-6 bg-orange-500 rounded-full"></span>
          Spending by Category
        </h3>
        {categories.length > 0 ? (
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie
                data={categories}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {categories.map((_, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={isDark ? DARK_COLORS[index % DARK_COLORS.length] : COLORS[index % COLORS.length]}
                    className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                wrapperStyle={{ 
                  color: chartColors.text,
                  fontSize: 12,
                  paddingTop: 10
                }}
                formatter={(value) => (
                  <span className={isDark ? 'text-gray-300' : 'text-gray-600'}>
                    {value}
                  </span>
                )}
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className={`h-[260px] flex items-center justify-center ${isDark ? 'text-gray-500' : 'text-gray-400'}`}>
            <div className="text-center">
              <svg className="w-12 h-12 mx-auto mb-2 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="text-sm">No expense data available</p>
              <p className="text-xs mt-1">Add some expenses to see the breakdown</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}