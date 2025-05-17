import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LightingClock = ({
  timeOfDay,
  setTimeOfDay,
  isPlaying,
  setIsPlaying,
}) => {
  const [speed, setSpeed] = useState(1); // 1x, 2x, 4x, 8x

  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeOfDay((prev) => (prev + speed) % 24);
      }, 1000 / speed); // Adjust interval based on speed
    }
    return () => clearInterval(interval);
  }, [isPlaying, speed]);

  const speeds = [
    { value: 1, label: "1x" },
    { value: 2, label: "2x" },
    { value: 4, label: "4x" },
    { value: 8, label: "8x" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4 shadow-xl mt-4"
    >
      <h2 className="text-xl font-bold text-white mb-4">Lighting Clock</h2>

      {/* Time Display */}
      <div className="text-center mb-6">
        <div className="text-4xl font-bold text-white">
          {String(Math.floor(timeOfDay)).padStart(2, "0")}:
          {String(Math.floor((timeOfDay % 1) * 60)).padStart(2, "0")}
        </div>
        <div className="text-white/70 text-sm mt-1">
          {timeOfDay >= 5 && timeOfDay < 12
            ? "Morning"
            : timeOfDay >= 12 && timeOfDay < 17
            ? "Afternoon"
            : timeOfDay >= 17 && timeOfDay < 20
            ? "Evening"
            : "Night"}
        </div>
      </div>

      {/* Speed Controls */}
      <div className="flex justify-center gap-2 mb-4">
        {speeds.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setSpeed(value)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              speed === value
                ? "bg-blue-500 text-white"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Play/Pause Button */}
      <button
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-full px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        {isPlaying ? "Pause" : "Start"} Clock
      </button>
    </motion.div>
  );
};

export default LightingClock;
