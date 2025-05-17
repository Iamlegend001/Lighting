import { motion } from "motion/react";
import { useState } from "react";

const MobileControls = ({
  timeOfDay,
  setTimeOfDay,
  brightness,
  setBrightness,
  weather,
  setWeather,
  isPlaying,
  setIsPlaying,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ y: "100%" }}
      animate={{ y: isExpanded ? 0 : "90%" }}
      className="fixed bottom-0 left-0 right-0 bg-black/80 backdrop-blur-lg rounded-t-2xl p-4 z-50"
    >
      {/* Handle */}
      <div
        className="w-12 h-1 bg-white/30 rounded-full mx-auto mb-4 cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      />

      {/* Controls */}
      <div className="space-y-4">
        {/* Time of Day Slider */}
        <div>
          <label className="block text-white text-sm mb-2">
            Time: {timeOfDay}:00
          </label>
          <input
            type="range"
            min="0"
            max="24"
            value={timeOfDay}
            onChange={(e) => setTimeOfDay(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Brightness Slider */}
        <div>
          <label className="block text-white text-sm mb-2">
            Brightness: {brightness}%
          </label>
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Weather Toggle */}
        <div>
          <label className="block text-white text-sm mb-2">Weather</label>
          <div className="grid grid-cols-2 gap-2">
            {["sunny", "cloudy", "rainy", "stormy"].map((condition) => (
              <button
                key={condition}
                onClick={() => setWeather(condition)}
                className={`px-3 py-2 rounded-lg transition-colors text-sm ${
                  weather === condition
                    ? "bg-blue-500 text-white"
                    : "bg-white/20 text-white hover:bg-white/30"
                }`}
              >
                {condition.charAt(0).toUpperCase() + condition.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {isPlaying ? "Pause" : "Play"} Time Progression
        </button>
      </div>
    </motion.div>
  );
};

export default MobileControls;
