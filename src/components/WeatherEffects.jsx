import { motion } from "motion/react";

const WeatherEffects = ({ weather, timeOfDay, brightness, currentMode }) => {
  const isDay = timeOfDay >= 6 && timeOfDay < 18;

  // Calculate brightness-based opacity with mode adjustments
  const getBrightnessOpacity = (baseOpacity) => {
    let brightnessFactor = brightness / 100;
    let modeFactor = 1;

    // Adjust opacity based on mode
    if (currentMode === "focus") {
      modeFactor = 0.3; // Significantly reduce weather effects in focus mode
    } else if (currentMode === "night") {
      modeFactor = 0.8; // Slightly reduce weather effects at night
    }

    return baseOpacity * brightnessFactor * modeFactor;
  };

  // Get weather color based on mode
  const getWeatherColor = (type) => {
    if (currentMode === "focus") {
      switch (type) {
        case "cloud":
          return "bg-gray-400/30";
        case "rain":
          return "bg-blue-300";
        case "lightning":
          return "bg-white/90";
        default:
          return "bg-white/30";
      }
    }
    return type === "cloud" ? "bg-white/30" : "bg-blue-400";
  };

  return (
    <div className="fixed inset-0 pointer-events-none">
      {/* Clouds */}
      {weather === "cloudy" && (
        <motion.div
          className={`absolute inset-0 ${getWeatherColor("cloud")}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: getBrightnessOpacity(0.3) }}
          transition={{ duration: 1 }}
        />
      )}

      {/* Rain */}
      {weather === "rainy" && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: getBrightnessOpacity(0.4) }}
          transition={{ duration: 1 }}
        >
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-0.5 h-8 ${getWeatherColor("rain")}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 100}%`,
              }}
              animate={{
                y: ["0%", "100vh"],
                opacity: [0, getBrightnessOpacity(0.6), 0],
              }}
              transition={{
                duration: 1 + Math.random(),
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Storm */}
      {weather === "stormy" && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: getBrightnessOpacity(0.5) }}
          transition={{ duration: 1 }}
        >
          {/* Lightning */}
          <motion.div
            className={`absolute inset-0 ${getWeatherColor("lightning")}`}
            animate={{
              opacity: [0, getBrightnessOpacity(0.8), 0],
            }}
            transition={{
              duration: 0.2,
              repeat: Infinity,
              repeatDelay: 2 + Math.random() * 3,
            }}
          />
          {/* Rain */}
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute w-0.5 h-8 ${getWeatherColor("rain")}`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `-${Math.random() * 100}%`,
              }}
              animate={{
                y: ["0%", "100vh"],
                opacity: [0, getBrightnessOpacity(0.6), 0],
              }}
              transition={{
                duration: 0.5 + Math.random() * 0.5,
                repeat: Infinity,
                delay: Math.random(),
              }}
            />
          ))}
        </motion.div>
      )}

      {/* Ambient light based on time of day, brightness, and mode */}
      <motion.div
        className={`absolute inset-0 ${
          isDay ? "bg-yellow-100/20" : "bg-blue-900/20"
        }`}
        style={{
          opacity: getBrightnessOpacity(0.2),
        }}
      />
    </div>
  );
};

export default WeatherEffects;
