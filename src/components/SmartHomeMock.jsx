import { motion } from "framer-motion";

const SmartHomeMock = ({ timeOfDay, brightness, weather }) => {
  const isDay = timeOfDay >= 6 && timeOfDay <= 18;
  const roomBrightness = Math.min(100, brightness + (isDay ? 20 : -20));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4 shadow-xl mt-4"
    >
      <h2 className="text-xl font-bold text-white mb-4">Room Preview</h2>

      <div className="relative w-full h-64 bg-gradient-to-b from-gray-800 to-gray-900 rounded-lg overflow-hidden">
        {/* Window */}
        <div
          className="absolute top-4 right-4 w-24 h-32 bg-gradient-to-b from-blue-400 to-blue-600 rounded-lg"
          style={{
            opacity: isDay ? 0.8 : 0.2,
            filter: `brightness(${roomBrightness}%)`,
          }}
        />

        {/* Ceiling Light */}
        <div
          className="absolute top-4 left-1/2 transform -translate-x-1/2 w-8 h-8 bg-yellow-300 rounded-full"
          style={{
            opacity: isDay ? 0.3 : 0.8,
            filter: `brightness(${roomBrightness}%)`,
            boxShadow: `0 0 ${isDay ? "20px" : "40px"} rgba(255, 255, 0, 0.5)`,
          }}
        />

        {/* Floor */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-700 to-gray-800"
          style={{
            filter: `brightness(${roomBrightness}%)`,
          }}
        />

        {/* Weather Effects */}
        {weather === "rainy" && (
          <div className="absolute inset-0">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-0.5 h-4 bg-blue-400"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: ["0%", "100%"],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )}

        {weather === "stormy" && (
          <motion.div
            className="absolute inset-0 bg-white"
            animate={{
              opacity: [0, 0.3, 0],
            }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 2,
            }}
          />
        )}

        {/* Furniture */}
        <div
          className="absolute bottom-16 left-8 w-16 h-24 bg-gray-700 rounded-lg"
          style={{
            filter: `brightness(${roomBrightness}%)`,
          }}
        />
        <div
          className="absolute bottom-16 right-8 w-16 h-16 bg-gray-700 rounded-lg"
          style={{
            filter: `brightness(${roomBrightness}%)`,
          }}
        />
      </div>
    </motion.div>
  );
};

export default SmartHomeMock;
