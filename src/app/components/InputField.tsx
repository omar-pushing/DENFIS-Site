import { LucideIcon } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";

interface InputFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  icon: LucideIcon;
  unit: string;
  min?: number;
  max?: number;
  helpText?: string;
}

export function InputField({
  label,
  value,
  onChange,
  placeholder,
  icon: Icon,
  unit,
  min,
  max,
  helpText,
}: InputFieldProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="relative">
      <label className="block mb-2.5 text-sm text-zinc-400">
        {label}
      </label>

      <motion.div
        className="relative group"
        whileHover={{ scale: 1.01 }}
        transition={{ type: "spring", stiffness: 400, damping: 30 }}
      >
        <div className={`absolute left-4 top-1/2 -translate-y-1/2 transition-all duration-300 ${
          isFocused ? 'text-violet-400 scale-110' : 'text-zinc-500'
        }`}>
          <Icon className="w-5 h-5" />
        </div>

        <input
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder={placeholder}
          min={min}
          max={max}
          step="0.1"
          className="w-full pl-12 pr-16 py-4 bg-zinc-900/50 border border-zinc-800 rounded-xl text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all duration-300 hover:border-zinc-700 backdrop-blur-xl"
        />

        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-sm text-zinc-500 pointer-events-none font-medium">
          {unit}
        </span>

        {/* Glow effect on focus */}
        {isFocused && (
          <motion.div
            className="absolute inset-0 -z-10 rounded-xl bg-violet-500/20 blur-xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </motion.div>

      {helpText && (
        <p className="mt-2 text-xs text-zinc-500 pl-1">{helpText}</p>
      )}
    </div>
  );
}
