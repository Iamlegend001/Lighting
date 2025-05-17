import { motion } from "motion/react";
import SoundControls from "./SoundControls";
import ProfileManager from "./ProfileManager";
import PresetModes from "./PresetModes";
import LightingClock from "./LightingClock";
import SmartHomeMock from "./SmartHomeMock";
import SystemTimeSync from "./SystemTimeSync";

const brightnessPresets = {
  dim: { value: 25, name: "Dim", icon: "🌙" },
  normal: { value: 50, name: "Normal", icon: "☀️" },
  bright: { value: 75, name: "Bright", icon: "✨" },
  max: { value: 100, name: "Maximum", icon: "💡" },
};

const Controls = ({
  timeOfDay,
  setTimeOfDay,
  brightness,
  setBrightness,
  weather,
  setWeather,
  isPlaying,
  setIsPlaying,
}) => {
  const handleLoadProfile = (settings) => {
    setTimeOfDay(settings.timeOfDay);
    setBrightness(settings.brightness);
    setWeather(settings.weather);
  };

  const handleSelectPreset = (settings) => {
    setTimeOfDay(settings.timeOfDay);
    setBrightness(settings.brightness);
    setWeather(settings.weather);
  };

  const handleTimeSync = (systemTime) => {
    setTimeOfDay(systemTime);
    setIsPlaying(false); // Stop time progression when syncing with system time
  };

  const handleBrightnessPreset = (presetValue) => {
    setBrightness(presetValue);
  };

  const getBrightnessColor = (value) => {
    if (value <= 25) return "from-gray-700 to-gray-900";
    if (value <= 50) return "from-gray-500 to-gray-700";
    if (value <= 75) return "from-gray-300 to-gray-500";
    return "from-gray-100 to-gray-300";
  };

  const getBrightnessIcon = (value) => {
    if (value <= 25) return "🌙";
    if (value <= 50) return "🌤️";
    if (value <= 75) return "☀️";
    return "✨";
  };

  const currentSettings = {
    timeOfDay,
    brightness,
    weather,
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 25px rgba(37, 99, 235, 0.9)",
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
  };

  const weatherButtonVariants = {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      boxShadow: "0 0 20px rgba(255, 255, 255, 0.6)",
      transition: { duration: 0.2 },
    },
    tap: {
      scale: 0.95,
      transition: { duration: 0.1 },
    },
    active: {
      scale: 1.05,
      backgroundColor: "rgb(30, 64, 175)",
      boxShadow: "0 0 30px rgba(30, 64, 175, 0.9)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-6 shadow-xl border border-white/20 bg-black/30"
    >
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-white mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent"
      >
        Lighting Theme Visualizer
      </motion.h1>

      <SystemTimeSync onSync={handleTimeSync} />

      {/* Time of Day Slider */}
      <div className="mb-6">
        <label className="block text-white font-semibold mb-2">
          Time of Day: {timeOfDay}:00
        </label>
        <input
          type="range"
          min="0"
          max="24"
          value={timeOfDay}
          onChange={(e) => setTimeOfDay(Number(e.target.value))}
          className="w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-blue-500"
        />
      </div>

      {/* Enhanced Brightness Controls */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <label className="block text-white font-semibold">
            Brightness: {brightness}%
          </label>
          <span className="text-white text-lg">
            {getBrightnessIcon(brightness)}
          </span>
        </div>

        {/* Brightness Slider with Gradient Background */}
        <div className="relative mb-2">
          <div
            className={`absolute inset-0 rounded-lg bg-gradient-to-r ${getBrightnessColor(
              brightness
            )} opacity-50`}
          />
          <input
            type="range"
            min="0"
            max="100"
            value={brightness}
            onChange={(e) => setBrightness(Number(e.target.value))}
            className="relative w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-500 z-10"
          />
        </div>

        {/* Brightness Presets */}
        <div className="grid grid-cols-4 gap-2 mt-3">
          {Object.entries(brightnessPresets).map(([key, preset]) => (
            <motion.button
              key={key}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={() => handleBrightnessPreset(preset.value)}
              className={`flex flex-col items-center justify-center px-2 py-1 rounded-lg transition-all duration-300 ${
                brightness === preset.value
                  ? "bg-gradient-to-r from-blue-700 to-blue-900 text-white"
                  : "bg-black/40 text-white hover:bg-black/60"
              }`}
            >
              <span className="text-lg">{preset.icon}</span>
              <span className="text-xs mt-1">{preset.name}</span>
            </motion.button>
          ))}
        </div>

        {/* Brightness Info */}
        <div className="mt-2 text-white/70 text-sm">
          {brightness <= 25 &&
            "Low brightness for night mode or dark environments"}
          {brightness > 25 &&
            brightness <= 50 &&
            "Moderate brightness for comfortable viewing"}
          {brightness > 50 &&
            brightness <= 75 &&
            "High brightness for well-lit environments"}
          {brightness > 75 && "Maximum brightness for bright environments"}
        </div>
      </div>

      {/* Weather Toggle */}
      <div className="mb-6">
        <label className="block text-white font-semibold mb-2">Weather</label>
        <div className="flex gap-4">
          {["sunny", "cloudy", "rainy", "stormy"].map((condition) => (
            <motion.button
              key={condition}
              variants={weatherButtonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              animate={weather === condition ? "active" : "initial"}
              onClick={() => setWeather(condition)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                weather === condition
                  ? "bg-gradient-to-r from-blue-700 to-blue-800 text-white"
                  : "bg-black/40 text-white hover:bg-black/60"
              }`}
            >
              {condition.charAt(0).toUpperCase() + condition.slice(1)}
            </motion.button>
          ))}
        </div>
      </div>

      {/* Play/Pause Button */}
      <motion.button
        variants={buttonVariants}
        initial="initial"
        whileHover="hover"
        whileTap="tap"
        onClick={() => setIsPlaying(!isPlaying)}
        className="w-full px-6 py-3 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg hover:from-blue-800 hover:to-blue-950 transition-all duration-300 font-bold shadow-lg"
      >
        {isPlaying ? "Pause" : "Play"} Time Progression
      </motion.button>

      <SoundControls weather={weather} isPlaying={isPlaying} />

      <SmartHomeMock
        timeOfDay={timeOfDay}
        brightness={brightness}
        weather={weather}
      />

      <LightingClock
        timeOfDay={timeOfDay}
        setTimeOfDay={setTimeOfDay}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
      />

      <PresetModes onSelectPreset={handleSelectPreset} />

      <ProfileManager
        currentSettings={currentSettings}
        onLoadProfile={handleLoadProfile}
      />
    </motion.div>
  );
};

export default Controls;
