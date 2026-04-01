import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Sparkles } from 'lucide-react';
import { useDarkMode } from '../context/DarkModeContext';

export default function DarkModeToggle() {
  const { isDark, toggleDarkMode } = useDarkMode();

  return (
    <motion.button
      onClick={toggleDarkMode}
      className={`
        relative overflow-hidden p-2 rounded-xl
        transition-all duration-500 ease-out
        ${isDark 
          ? 'bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg shadow-indigo-500/30' 
          : 'bg-gradient-to-r from-amber-400 to-orange-500 shadow-lg shadow-amber-500/30'
        }
        hover:scale-110 active:scale-95
      `}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={isDark ? 'dark' : 'light'}
          initial={{ y: -20, opacity: 0, rotate: -180 }}
          animate={{ y: 0, opacity: 1, rotate: 0 }}
          exit={{ y: 20, opacity: 0, rotate: 180 }}
          transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
          className="relative z-10"
        >
          {isDark ? (
            <Moon className="w-5 h-5 text-white" />
          ) : (
            <Sun className="w-5 h-5 text-white" />
          )}
        </motion.div>
      </AnimatePresence>

      {/* Animated Background Particles */}
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isDark ? 0.2 : 0.3 }}
        transition={{ duration: 0.5 }}
      />
      
      {/* Sparkle Effect on Hover */}
      <AnimatePresence>
        {!isDark && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Sparkles className="absolute top-0 left-0 w-3 h-3 text-yellow-300 animate-ping" />
            <Sparkles className="absolute bottom-0 right-0 w-3 h-3 text-yellow-300 animate-ping delay-100" />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  );
}