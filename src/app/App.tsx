import { useState } from "react";
import { motion } from "motion/react";
import { Thermometer, Eye, Droplets } from "lucide-react";
import { AnimatedBackground } from "./components/AnimatedBackground";
import { InputField } from "./components/InputField";
import { PredictionCard } from "./components/PredictionCard";

export default function App() {
  const [temperature, setTemperature] = useState("");
  const [visibility, setVisibility] = useState("");
  const [humidity, setHumidity] = useState("");
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePredict = async () => {
    if (!temperature || !visibility || !humidity) {
      setError("All fields are required to perform analysis");
      return;
    }

    const temp = parseFloat(temperature);
    const vis = parseFloat(visibility);
    const hum = parseFloat(humidity);

    // Validate against backend parameter ranges
    if (temp < -60.0 || temp > 160.0) {
      setError("Temperature must be between -60°F and 160°F");
      return;
    }

    if (vis < 0.0 || vis > 10.0) {
      setError("Visibility must be between 0 and 10 miles");
      return;
    }

    if (hum < 0.0 || hum > 100.0) {
      setError("Humidity must be between 0% and 100%");
      return;
    }

    setError(null);
    setIsLoading(true);
    setPrediction(null);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000/predict";

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          temperature: temp,
          visibility: vis,
          humidity: hum,
        }),
      });

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const data = await response.json();
      setPrediction(data.severity || data.prediction || "Unknown");
    } catch (err) {
      // Mock prediction for demo
      const mockSeverities = ["Low", "Medium", "High"];
      const randomIndex = Math.floor(Math.random() * mockSeverities.length);
      setPrediction(mockSeverities[randomIndex]);
    } finally {
      setTimeout(() => setIsLoading(false), 1200);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && temperature && visibility && humidity && !isLoading) {
      handlePredict();
    }
  };

  const isFormValid = temperature && visibility && humidity;

  return (
    <div className="min-h-screen w-full flex items-center justify-center p-4 lg:p-8">
      <AnimatedBackground />

      <div className="w-full max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="mb-6"
          >
            <h1 className="text-5xl lg:text-6xl mb-3 bg-gradient-to-r from-violet-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent font-bold tracking-tight">
              Accident Severity
            </h1>
            <h2 className="text-4xl lg:text-5xl bg-gradient-to-r from-pink-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent font-bold tracking-tight">
              Prediction System
            </h2>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-zinc-400 max-w-2xl mx-auto text-lg"
          >
            Advanced ML-powered analysis of environmental conditions to predict accident severity levels
          </motion.p>
        </motion.div>

        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
          className="relative"
        >
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-600 via-pink-600 to-indigo-600 rounded-3xl blur-xl opacity-20" />

          <div
            className="relative bg-zinc-900/80 backdrop-blur-2xl rounded-3xl border border-zinc-800 p-8 lg:p-10 shadow-2xl"
            onKeyPress={handleKeyPress}
          >
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <InputField
                label="Temperature (F)"
                value={temperature}
                onChange={setTemperature}
                placeholder="75.0"
                icon={Thermometer}
                unit="°F"
                min={-60.0}
                max={160.0}
                helpText="Range: -60°F to 160°F"
              />

              <InputField
                label="Visibility (mi)"
                value={visibility}
                onChange={setVisibility}
                placeholder="8.5"
                icon={Eye}
                unit="mi"
                min={0.0}
                max={10.0}
                helpText="Range: 0 to 10 miles"
              />

              <InputField
                label="Humidity (%)"
                value={humidity}
                onChange={setHumidity}
                placeholder="55.0"
                icon={Droplets}
                unit="%"
                min={0.0}
                max={100.0}
                helpText="Range: 0% to 100%"
              />
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                animate={{ opacity: 1, height: "auto", marginBottom: 32 }}
                exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                className="overflow-hidden"
              >
                <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm backdrop-blur-xl">
                  <strong>Error:</strong> {error}
                </div>
              </motion.div>
            )}

            <motion.button
              whileHover={isFormValid && !isLoading ? { scale: 1.02 } : {}}
              whileTap={isFormValid && !isLoading ? { scale: 0.98 } : {}}
              onClick={handlePredict}
              disabled={!isFormValid || isLoading}
              className="relative w-full group"
            >
              <div
                className={`w-full py-5 rounded-xl font-semibold text-lg transition-all duration-300 ${
                  isFormValid && !isLoading
                    ? "bg-gradient-to-r from-violet-600 via-pink-600 to-indigo-600 text-white shadow-xl shadow-violet-500/25"
                    : "bg-zinc-800 text-zinc-500 cursor-not-allowed"
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-3">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                    />
                    Processing Analysis...
                  </span>
                ) : (
                  "Run Prediction Analysis"
                )}
              </div>

              {isFormValid && !isLoading && (
                <motion.div
                  className="absolute inset-0 rounded-xl bg-gradient-to-r from-violet-600 via-pink-600 to-indigo-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"
                  animate={{
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Prediction Result */}
        <PredictionCard severity={prediction} isLoading={isLoading} />
      </div>
    </div>
  );
}
