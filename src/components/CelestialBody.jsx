import { motion } from "motion/react";

const CelestialBody = ({ timeOfDay, brightness, currentMode }) => {
  const isDay = timeOfDay >= 6 && timeOfDay < 18;
  const progress = (timeOfDay % 24) / 24;
  const angle = progress * 360;

  // Calculate brightness-based opacity with mode adjustments
  const getBrightnessOpacity = () => {
    let baseOpacity = isDay ? 1 : 0.8;
    let brightnessFactor = brightness / 100;

    // Adjust opacity based on mode
    if (currentMode === "focus") {
      baseOpacity *= 0.5; // Reduce visibility in focus mode
    } else if (currentMode === "night") {
      baseOpacity *= 0.9; // Slightly reduce visibility at night
    }

    return baseOpacity * brightnessFactor;
  };

  // Calculate brightness-based glow with mode adjustments
  const getBrightnessGlow = () => {
    let baseGlow = isDay ? 40 : 20;
    let brightnessFactor = brightness / 100;

    // Adjust glow based on mode
    if (currentMode === "focus") {
      baseGlow *= 0.3; // Reduce glow in focus mode
    } else if (currentMode === "night") {
      baseGlow *= 1.2; // Increase glow at night
    }

    return baseGlow * brightnessFactor;
  };

  // Calculate vertical position based on time of day and mode
  const getVerticalPosition = () => {
    const hour = timeOfDay;
    let position;

    if (hour >= 6 && hour < 18) {
      // Day time: sun moves from bottom to top
      const dayProgress = (hour - 6) / 12;
      position = -200 + dayProgress * 400;
    } else {
      // Night time: moon moves from top to bottom
      const nightProgress = ((hour + 6) % 24) / 12;
      position = 200 - nightProgress * 400;
    }

    // Adjust position based on mode
    if (currentMode === "focus") {
      position *= 0.8; // Reduce movement range in focus mode
    }

    return position;
  };

  // Get celestial body color based on mode
  const getCelestialBodyColor = () => {
    if (currentMode === "focus") {
      return isDay ? "bg-yellow-300" : "bg-gray-300";
    }
    return isDay ? "bg-yellow-400" : "bg-gray-200";
  };

  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <motion.div
        className={`absolute w-24 h-24 rounded-full ${getCelestialBodyColor()}`}
        style={{
          left: "50%",
          top: "50%",
          transform: `translate(-50%, -50%) rotate(${angle}deg) translateY(${getVerticalPosition()}px) rotate(-${angle}deg)`,
          opacity: getBrightnessOpacity(),
          boxShadow: `0 0 ${getBrightnessGlow()}px ${
            isDay ? "rgba(255, 255, 0, 0.8)" : "rgba(255, 255, 255, 0.8)"
          }`,
        }}
        animate={{
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.div>
  );
};

export default CelestialBody;
