
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Wallet, Sparkles, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { useDarkMode } from '../context/DarkModeContext.jsx';

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