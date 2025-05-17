import { useState, useEffect } from "react";
import WeatherEffects from "./components/WeatherEffects";
import CelestialBody from "./components/CelestialBody";
import Controls from "./components/Controls";
import FocusOverlay from "./components/FocusOverlay";
import MobileControls from "./components/MobileControls";
import "./App.css";

function App() {
  const [timeOfDay, setTimeOfDay] = useState(12); // 0-24 hours
  const [brightness, setBrightness] = useState(50); // 0-100
  const [weather, setWeather] = useState("sunny"); // sunny, cloudy, rainy, stormy
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [currentMode, setCurrentMode] = useState("normal"); // normal, focus, night

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Time progression effect with smoother transitions
  useEffect(() => {
    let interval;
    if (isPlaying) {
      interval = setInterval(() => {
        setTimeOfDay((prev) => {
          const newTime = (prev + 0.1) % 24;
          return Math.round(newTime * 10) / 10; // Round to 1 decimal place for smoother transitions
        });
      }, 100); // Update more frequently for smoother transitions
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Update mode based on time and focus state
  useEffect(() => {
    if (isFocusMode) {
      setCurrentMode("focus");
    } else if (timeOfDay < 6 || timeOfDay >= 18) {
      setCurrentMode("night");
    } else {
      setCurrentMode("normal");
    }
  }, [isFocusMode, timeOfDay]);

  // Calculate background color based on time of day and mode
  const getBackgroundColor = () => {
    if (currentMode === "focus") {
      return "bg-gradient-to-b from-gray-900 to-black";
    }

    const hour = timeOfDay;
    if (hour >= 5 && hour < 8)
      return "bg-gradient-to-b from-orange-200 to-blue-200"; // Sunrise
    if (hour >= 8 && hour < 16)
      return "bg-gradient-to-b from-blue-200 to-blue-300"; // Day
    if (hour >= 16 && hour < 19)
      return "bg-gradient-to-b from-orange-300 to-purple-400"; // Sunset
    return "bg-gradient-to-b from-blue-900 to-purple-900"; // Night
  };

  // Calculate text gradient based on mode
  const getTextGradient = () => {
    switch (currentMode) {
      case "focus":
        return "bg-gradient-to-r from-blue-400 to-purple-500";
      case "night":
        return "bg-gradient-to-r from-blue-300 to-purple-400";
      default:
        return "bg-gradient-to-r from-blue-500 to-cyan-400";
    }
  };

  // Calculate brightness filter with mode adjustments
  const getBrightnessFilter = () => {
    let brightnessValue = brightness / 100;
    if (currentMode === "focus") {
      brightnessValue *= 0.8; // Slightly dimmer in focus mode
    } else if (currentMode === "night") {
      brightnessValue *= 0.9; // Slightly dimmer at night
    }
    return `brightness(${brightnessValue})`;
  };

  // Calculate overlay opacity based on mode
  const getOverlayOpacity = () => {
    if (currentMode === "focus") {
      return 0.3; // Constant overlay in focus mode
    }
    if (brightness >= 50) {
      return (100 - brightness) / 100;
    }
    return brightness / 100;
  };

  const controlProps = {
    timeOfDay,
    setTimeOfDay,
    brightness,
    setBrightness,
    weather,
    setWeather,
    isPlaying,
    setIsPlaying,
    currentMode,
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background with brightness control */}
      <div
        className={`absolute inset-0 transition-all duration-1000 ${getBackgroundColor()}`}
        style={{ filter: getBrightnessFilter() }}
      />

      {/* Brightness overlay */}
      <div
        className="absolute inset-0 bg-black transition-opacity duration-500"
        style={{ opacity: getOverlayOpacity() }}
      />

      {/* Content container with brightness-aware styling */}
      <div className="relative z-10">
        {/* Celestial body (sun/moon) */}
        <CelestialBody
          timeOfDay={timeOfDay}
          brightness={brightness}
          currentMode={currentMode}
        />

        {/* Weather effects */}
        <WeatherEffects
          weather={weather}
          timeOfDay={timeOfDay}
          brightness={brightness}
          currentMode={currentMode}
        />

        <div className="container mx-auto px-4 py-8">
          {/* Desktop Controls */}
          {!isMobile && <Controls {...controlProps} />}

          {/* Focus Mode Button */}
          <button
            onClick={() => setIsFocusMode(!isFocusMode)}
            className={`fixed bottom-8 right-8 px-6 py-3 rounded-lg transition-all duration-300 backdrop-blur-sm
              ${getTextGradient()} bg-clip-text text-transparent
              hover:scale-105 hover:shadow-lg hover:shadow-blue-500/30
              border border-white/20 hover:border-white/40`}
            style={{ filter: getBrightnessFilter() }}
          >
            {isFocusMode ? "Exit Focus Mode" : "Enter Focus Mode"}
          </button>
        </div>

        {/* Mobile Controls */}
        {isMobile && <MobileControls {...controlProps} />}

        {/* Focus Mode Overlay */}
        <FocusOverlay
          isActive={isFocusMode}
          onClose={() => setIsFocusMode(false)}
          brightness={brightness}
          currentMode={currentMode}
        />
      </div>
    </div>
  );
}

export default App;
