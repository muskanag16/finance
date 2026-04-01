// components/SummaryCard.jsx
// import { motion } from "framer-motion";

// export default function SummaryCard({ title, value }) {
//   return (
//     <motion.div whileHover={{ scale: 1.05 }} className="glass p-5 rounded-2xl">
//       <p className="text-gray-600">{title}</p>
//       <h2 className="text-3xl font-bold text-indigo-600">₹{value}</h2>
//     </motion.div>
//   );
// }
// import { motion } from "framer-motion";
// import { TrendingUp, TrendingDown, Wallet, Sparkles, ArrowUpRight, ArrowDownRight } from "lucide-react";

// const icons = {
//   income: { 
//     icon: TrendingUp, 
//     gradient: "from-emerald-400 to-green-500",
//     bgGradient: "from-emerald-50 to-green-50",
//     borderGlow: "shadow-emerald-500/20"
//   },
//   expense: { 
//     icon: TrendingDown, 
//     gradient: "from-rose-400 to-red-500",
//     bgGradient: "from-rose-50 to-red-50",
//     borderGlow: "shadow-rose-500/20"
//   },
//   balance: { 
//     icon: Wallet, 
//     gradient: "from-indigo-400 to-purple-500",
//     bgGradient: "from-indigo-50 to-purple-50",
//     borderGlow: "shadow-indigo-500/20"
//   },
// };

// const animations = {
//   income: {
//     icon: "animate-pulse",
//     hover: "hover:shadow-emerald-500/30"
//   },
//   expense: {
//     icon: "animate-bounce",
//     hover: "hover:shadow-rose-500/30"
//   },
//   balance: {
//     icon: "animate-spin-slow",
//     hover: "hover:shadow-indigo-500/30"
//   }
// };

// export default function SummaryCard({ title, value, type = "balance", trend = 8.2 }) {
//   const config = icons[type];
//   const IconComponent = config.icon;
//   const animation = animations[type];
  
//   // Generate random background pattern
//   const getPattern = () => {
//     const patterns = {
//       income: "radial-gradient(circle at 100% 0%, rgba(16,185,129,0.03) 0%, transparent 50%)",
//       expense: "radial-gradient(circle at 0% 100%, rgba(244,63,94,0.03) 0%, transparent 50%)",
//       balance: "radial-gradient(circle at 50% 50%, rgba(99,102,241,0.03) 0%, transparent 70%)"
//     };
//     return patterns[type];
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 30, scale: 0.95 }}
//       animate={{ opacity: 1, y: 0, scale: 1 }}
//       whileHover={{ 
//         y: -8,
//         scale: 1.02,
//         transition: { type: "spring", stiffness: 400, damping: 25 }
//       }}
//       whileTap={{ scale: 0.98 }}
//       className={`
//         relative overflow-hidden rounded-3xl p-6 cursor-pointer
//         bg-gradient-to-br ${config.bgGradient}
//         backdrop-blur-xl border border-white/40
//         shadow-2xl ${config.borderGlow}
//         transition-all duration-500 ease-out
//         group
//       `}
//       style={{
//         backgroundImage: getPattern(),
//       }}
//     >
//       {/* Animated Background Particles */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <motion.div
//           className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-white/20 blur-3xl"
//           animate={{
//             scale: [1, 1.2, 1],
//             opacity: [0.3, 0.5, 0.3],
//           }}
//           transition={{
//             duration: 4,
//             repeat: Infinity,
//             ease: "easeInOut",
//           }}
//         />
//         <motion.div
//           className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-white/20 blur-3xl"
//           animate={{
//             scale: [1, 1.3, 1],
//             opacity: [0.2, 0.4, 0.2],
//           }}
//           transition={{
//             duration: 5,
//             repeat: Infinity,
//             ease: "easeInOut",
//             delay: 1,
//           }}
//         />
//       </div>

//       {/* Decorative Elements */}
//       <div className="absolute top-0 right-0 w-24 h-24 opacity-10 group-hover:opacity-20 transition-opacity duration-500">
//         <svg viewBox="0 0 100 100" fill="currentColor" className="text-gray-900">
//           <path d="M50 0 L65 35 L100 40 L75 65 L80 100 L50 85 L20 100 L25 65 L0 40 L35 35 Z" />
//         </svg>
//       </div>

//       <div className="relative z-10">
//         {/* Header Section with Icon */}
//         <div className="flex items-center justify-between mb-4">
//           <motion.div
//             initial={{ rotate: -180, opacity: 0 }}
//             animate={{ rotate: 0, opacity: 1 }}
//             transition={{ delay: 0.2, type: "spring" }}
//             className={`
//               relative p-3 rounded-2xl bg-gradient-to-br ${config.gradient}
//               shadow-lg ${config.borderGlow} group-hover:shadow-xl
//               transition-all duration-300
//             `}
//           >
//             <IconComponent className={`w-6 h-6 text-white ${animation.icon}`} />
            
//             {/* Icon Glow Effect */}
//             <motion.div
//               className="absolute inset-0 rounded-2xl bg-white/30 blur-md"
//               animate={{
//                 scale: [1, 1.2, 1],
//                 opacity: [0.5, 0.8, 0.5],
//               }}
//               transition={{
//                 duration: 2,
//                 repeat: Infinity,
//                 ease: "easeInOut",
//               }}
//             />
//           </motion.div>

//           {/* Trend Indicator */}
//           <motion.div
//             initial={{ x: 20, opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-white/50 backdrop-blur-sm border border-white/30"
//           >
//             {trend >= 0 ? (
//               <>
//                 <ArrowUpRight className="w-3 h-3 text-emerald-500" />
//                 <span className="text-xs font-semibold text-emerald-600">+{Math.abs(trend)}%</span>
//               </>
//             ) : (
//               <>
//                 <ArrowDownRight className="w-3 h-3 text-rose-500" />
//                 <span className="text-xs font-semibold text-rose-600">{trend}%</span>
//               </>
//             )}
//             <Sparkles className="w-3 h-3 text-amber-400" />
//           </motion.div>
//         </div>

//         {/* Title */}
//         <motion.p
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ delay: 0.2 }}
//           className="text-gray-600 text-sm font-medium uppercase tracking-wider mb-2"
//         >
//           {title}
//         </motion.p>

//         {/* Value with Animation */}
//         <motion.div
//           initial={{ scale: 0.5, opacity: 0 }}
//           animate={{ scale: 1, opacity: 1 }}
//           transition={{ 
//             delay: 0.4,
//             type: "spring",
//             stiffness: 200,
//             damping: 15
//           }}
//           className="mb-3"
//         >
//           <h2 className={`
//             text-4xl md:text-5xl font-extrabold tracking-tight
//             bg-gradient-to-r ${config.gradient} bg-clip-text text-transparent
//             group-hover:scale-105 transition-transform duration-300
//           `}>
//             ₹{value.toLocaleString()}
//           </h2>
//         </motion.div>

//         {/* Progress Bar or Additional Info */}
//         <motion.div
//           initial={{ width: 0 }}
//           animate={{ width: "100%" }}
//           transition={{ delay: 0.5, duration: 0.8 }}
//           className="mt-4"
//         >
//           <div className="flex justify-between items-center mb-1">
//             <span className="text-xs text-gray-500">Monthly target</span>
//             <span className="text-xs font-medium text-gray-600">
//               {Math.min(100, Math.floor((value / 100000) * 100))}%
//             </span>
//           </div>
//           <div className="h-1.5 bg-gray-200/50 rounded-full overflow-hidden backdrop-blur-sm">
//             <motion.div
//               initial={{ width: 0 }}
//               animate={{ width: `${Math.min(100, Math.floor((value / 100000) * 100))}%` }}
//               transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
//               className={`
//                 h-full rounded-full bg-gradient-to-r ${config.gradient}
//                 relative overflow-hidden
//               `}
//             >
//               {/* Animated Shimmer Effect */}
//               <motion.div
//                 className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
//                 animate={{
//                   x: ["-100%", "200%"],
//                 }}
//                 transition={{
//                   duration: 2,
//                   repeat: Infinity,
//                   ease: "linear",
//                   repeatDelay: 1,
//                 }}
//               />
//             </motion.div>
//           </div>
//         </motion.div>

//         {/* Floating Stats Card */}
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.7 }}
//           className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//         >
//           <div className="bg-white/90 backdrop-blur-md rounded-xl px-3 py-1.5 shadow-lg border border-white/50">
//             <p className="text-[10px] font-medium text-gray-500 whitespace-nowrap">
//               {trend >= 0 ? '↑ Upward trend' : '↓ Downward trend'}
//             </p>
//           </div>
//         </motion.div>
//       </div>

//       {/* Border Animation on Hover */}
//       <motion.div
//         className="absolute inset-0 rounded-3xl pointer-events-none"
//         initial={{ opacity: 0 }}
//         whileHover={{ opacity: 1 }}
//         transition={{ duration: 0.3 }}
//       >
//         <div className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${config.gradient} opacity-20 blur-xl`} />
//       </motion.div>
//     </motion.div>
//   );
// }
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet, Sparkles, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useDarkMode } from '../context/DarkModeContext';

const icons = {
  income: { 
    icon: TrendingUp, 
    gradient: "from-emerald-400 to-green-500",
    darkGradient: "from-emerald-500 to-green-600",
    bgGradient: "from-emerald-50 to-green-50",
    darkBgGradient: "from-emerald-950/50 to-green-950/50",
    borderGlow: "shadow-emerald-500/20"
  },
  expense: { 
    icon: TrendingDown, 
    gradient: "from-rose-400 to-red-500",
    darkGradient: "from-rose-500 to-red-600",
    bgGradient: "from-rose-50 to-red-50",
    darkBgGradient: "from-rose-950/50 to-red-950/50",
    borderGlow: "shadow-rose-500/20"
  },
  balance: { 
    icon: Wallet, 
    gradient: "from-indigo-400 to-purple-500",
    darkGradient: "from-indigo-500 to-purple-600",
    bgGradient: "from-indigo-50 to-purple-50",
    darkBgGradient: "from-indigo-950/50 to-purple-950/50",
    borderGlow: "shadow-indigo-500/20"
  },
};

export default function SummaryCard({ title, value, type = "balance", trend = 8.2 }) {
  const { isDark } = useDarkMode();
  const config = icons[type];
  const IconComponent = config.icon;
  
  const gradientClass = isDark ? config.darkGradient : config.gradient;
  const bgGradientClass = isDark ? config.darkBgGradient : config.bgGradient;
  const textColorClass = isDark ? 'text-white' : 'text-gray-900';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      whileHover={{ 
        y: -8,
        scale: 1.02,
        transition: { type: "spring", stiffness: 400, damping: 25 }
      }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative overflow-hidden rounded-3xl p-6 cursor-pointer
        bg-gradient-to-br ${bgGradientClass}
        backdrop-blur-xl border ${isDark ? 'border-gray-700/50' : 'border-white/40'}
        shadow-2xl ${config.borderGlow}
        transition-all duration-500 ease-out
        group
      `}
    >
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${isDark ? 'bg-white/5' : 'bg-white/20'} blur-3xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className={`absolute -bottom-20 -left-20 w-40 h-40 rounded-full ${isDark ? 'bg-white/5' : 'bg-white/20'} blur-3xl`}
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <motion.div
            initial={{ rotate: -180, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className={`
              relative p-3 rounded-2xl bg-gradient-to-r ${gradientClass}
              shadow-lg ${config.borderGlow} group-hover:shadow-xl
              transition-all duration-300
            `}
          >
            <IconComponent className="w-6 h-6 text-white" />
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full backdrop-blur-sm border ${isDark ? 'bg-gray-800/50 border-gray-700' : 'bg-white/50 border-white/30'}`}
          >
            {trend >= 0 ? (
              <>
                <ArrowUpRight className="w-3 h-3 text-emerald-500" />
                <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">+{Math.abs(trend)}%</span>
              </>
            ) : (
              <>
                <ArrowDownRight className="w-3 h-3 text-rose-500" />
                <span className="text-xs font-semibold text-rose-600 dark:text-rose-400">{trend}%</span>
              </>
            )}
            <Sparkles className="w-3 h-3 text-amber-400" />
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`text-sm font-medium uppercase tracking-wider mb-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          {title}
        </motion.p>

        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            delay: 0.4,
            type: "spring",
            stiffness: 200,
            damping: 15
          }}
          className="mb-3"
        >
          <h2 className={`
            text-4xl md:text-5xl font-extrabold tracking-tight
            bg-gradient-to-r ${gradientClass} bg-clip-text text-transparent
            group-hover:scale-105 transition-transform duration-300
          `}>
            ₹{value.toLocaleString()}
          </h2>
        </motion.div>

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-4"
        >
          <div className="flex justify-between items-center mb-1">
            <span className={`text-xs ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>Monthly target</span>
            <span className={`text-xs font-medium ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
              {Math.min(100, Math.floor((value / 100000) * 100))}%
            </span>
          </div>
          <div className={`h-1.5 rounded-full overflow-hidden backdrop-blur-sm ${isDark ? 'bg-gray-700/50' : 'bg-gray-200/50'}`}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(100, Math.floor((value / 100000) * 100))}%` }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              className={`
                h-full rounded-full bg-gradient-to-r ${gradientClass}
                relative overflow-hidden
              `}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  repeatDelay: 1,
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}