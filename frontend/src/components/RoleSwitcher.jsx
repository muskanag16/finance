import { motion } from "framer-motion";
import { Shield, User } from "lucide-react";

export default function RoleSwitcher({ role, setRole }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="glass px-4 py-2 rounded-xl flex items-center gap-3"
    >
      <div className="flex items-center gap-2">
        {role === "admin" ? (
          <Shield className="w-4 h-4 text-indigo-600" />
        ) : (
          <User className="w-4 h-4 text-gray-600" />
        )}
        <span className="text-sm font-medium text-gray-700">Role:</span>
      </div>
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="bg-transparent outline-none text-sm font-semibold cursor-pointer hover:text-indigo-600 transition-colors"
      >
        <option value="viewer" className="text-gray-700">👁️ Viewer</option>
        <option value="admin" className="text-gray-700">⚡ Admin</option>
      </select>
    </motion.div>
  );
}