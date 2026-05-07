import { motion, AnimatePresence } from "motion/react";
import { AlertTriangle, Shield, AlertCircle } from "lucide-react";

interface PredictionCardProps {
  severity: string | null;
  isLoading: boolean;
}

export function PredictionCard({ severity, isLoading }: PredictionCardProps) {
  const getSeverityConfig = (sev: string) => {
    const lower = sev.toLowerCase();

    if (lower.includes("low") || lower.includes("minor") || lower === "1") {
      return {
        icon: Shield,
        gradient: "from-emerald-500 via-teal-500 to-green-600",
        glowColor: "rgba(16, 185, 129, 0.3)",
        textColor: "text-emerald-400",
        label: "Low Severity Risk",
        description: "Environmental conditions indicate minimal accident probability. Road safety appears optimal.",
        statusDot: "bg-emerald-500"
      };
    } else if (lower.includes("medium") || lower.includes("moderate") || lower === "2") {
      return {
        icon: AlertCircle,
        gradient: "from-amber-500 via-orange-500 to-yellow-600",
        glowColor: "rgba(251, 191, 36, 0.3)",
        textColor: "text-amber-400",
        label: "Moderate Severity Risk",
        description: "Environmental conditions suggest heightened caution. Accident risk is elevated above baseline.",
        statusDot: "bg-amber-500"
      };
    } else {
      return {
        icon: AlertTriangle,
        gradient: "from-red-500 via-rose-500 to-pink-600",
        glowColor: "rgba(239, 68, 68, 0.3)",
        textColor: "text-red-400",
        label: "High Severity Risk",
        description: "Environmental conditions present significant accident probability. Maximum caution advised.",
        statusDot: "bg-red-500"
      };
    }
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="loading"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          className="mt-8"
        >
          <div className="relative p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl overflow-hidden">
            {/* Animated border glow */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: "linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.5), transparent)",
              }}
              animate={{
                x: ["-100%", "200%"],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "linear",
              }}
            />

            <div className="relative flex flex-col items-center justify-center gap-5">
              <div className="relative">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 border-[3px] border-zinc-700 border-t-violet-500 rounded-full"
                />
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 border-[3px] border-zinc-700 border-b-pink-500 rounded-full"
                />
              </div>
              <div className="text-center">
                <p className="text-zinc-300 mb-1">Analyzing environmental parameters</p>
                <p className="text-sm text-zinc-500">Processing weather data patterns...</p>
              </div>
            </div>
          </div>
        </motion.div>
      ) : severity ? (
        <motion.div
          key="result"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -30, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
          className="mt-8"
        >
          {(() => {
            const config = getSeverityConfig(severity);
            const Icon = config.icon;

            return (
              <div className="relative p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 backdrop-blur-xl overflow-hidden">
                {/* Glow effect */}
                <motion.div
                  className="absolute inset-0 -z-10 blur-3xl opacity-30"
                  style={{ background: config.glowColor }}
                  animate={{
                    scale: [1, 1.1, 1],
                    opacity: [0.2, 0.3, 0.2],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />

                <div className="flex items-start gap-6">
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 180,
                      damping: 15,
                      delay: 0.1
                    }}
                    className="relative flex-shrink-0"
                  >
                    <div className={`w-20 h-20 rounded-2xl bg-gradient-to-br ${config.gradient} flex items-center justify-center shadow-2xl`}>
                      <Icon className="w-10 h-10 text-white" strokeWidth={2.5} />
                    </div>
                    <motion.div
                      className="absolute inset-0 rounded-2xl"
                      style={{ background: `linear-gradient(to bottom right, ${config.glowColor}, transparent)` }}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </motion.div>

                  <div className="flex-1 pt-2">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="flex items-center gap-3 mb-3"
                    >
                      <h3 className={`${config.textColor}`}>
                        {config.label}
                      </h3>
                      <motion.div
                        className={`w-2 h-2 rounded-full ${config.statusDot}`}
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.5, 1],
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                      />
                    </motion.div>

                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-zinc-300 leading-relaxed"
                    >
                      {config.description}
                    </motion.p>

                    {/* Data visualization bar */}
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                      className="mt-5 h-1.5 bg-zinc-800 rounded-full overflow-hidden"
                      style={{ transformOrigin: "left" }}
                    >
                      <motion.div
                        className={`h-full bg-gradient-to-r ${config.gradient}`}
                        initial={{ width: "0%" }}
                        animate={{
                          width: lower.includes("low") ? "33%" : lower.includes("medium") ? "66%" : "100%"
                        }}
                        transition={{ delay: 0.7, duration: 0.8, ease: "easeOut" }}
                      />
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })()}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
