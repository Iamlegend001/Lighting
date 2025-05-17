import { motion } from "motion/react";

const presets = [
  {
    name: "Morning Glow",
    settings: {
      timeOfDay: 7,
      brightness: 70,
      weather: "sunny",
    },
    description: "Warm sunrise lighting to start your day",
  },
  {
    name: "Golden Hour",
    settings: {
      timeOfDay: 17,
      brightness: 60,
      weather: "sunny",
    },
    description: "Perfect evening ambiance",
  },
  {
    name: "Night Owl",
    settings: {
      timeOfDay: 23,
      brightness: 30,
      weather: "cloudy",
    },
    description: "Calm night lighting for late work",
  },
  {
    name: "Cozy Rain",
    settings: {
      timeOfDay: 15,
      brightness: 40,
      weather: "rainy",
    },
    description: "Relaxing rainy day atmosphere",
  },
  {
    name: "Focus",
    settings: {
      timeOfDay: 10,
      brightness: 80,
      weather: "sunny",
    },
    description: "Bright, clear lighting for productivity",
  },
];

const PresetModes = ({ onSelectPreset }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4 shadow-xl mt-4"
    >
      <h2 className="text-xl font-bold text-white mb-4">Preset Modes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {presets.map((preset) => (
          <motion.button
            key={preset.name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelectPreset(preset.settings)}
            className="p-4 bg-white/10 rounded-lg text-left hover:bg-white/20 transition-colors"
          >
            <h3 className="text-lg font-semibold text-white mb-1">
              {preset.name}
            </h3>
            <p className="text-white/70 text-sm">{preset.description}</p>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default PresetModes;
