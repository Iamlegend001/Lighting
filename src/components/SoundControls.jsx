import { useState, useEffect, useRef } from "react";
import { motion } from "motion/react";
import { Howl } from "howler";

const soundEffects = {
  sunny: {
    src: "/Sound/birds.mp3",
    volume: 0.5,
    name: "Birds Chirping",
    icon: "🐦",
  },
  rainy: {
    src: "/Sound/rain.mp3",
    volume: 0.4,
    name: "Rainfall",
    icon: "🌧️",
  },
  stormy: {
    src: "/Sound/thunder.mp3",
    volume: 0.6,
    name: "Thunderstorm",
    icon: "⛈️",
  },
  cloudy: {
    src: "/Sound/wind.mp3",
    volume: 0.3,
    name: "Wind",
    icon: "🌪️",
  },
};

// Additional ambient sounds
const ambientSounds = {
  fireplace: {
    src: "/Sound/fireplace.mp3",
    volume: 0.4,
    name: "Fireplace",
    icon: "🔥",
  },
  waves: {
    src: "/Sound/waves.mp3",
    volume: 0.4,
    name: "Ocean Waves",
    icon: "🌊",
  },
  forest: {
    src: "/Sound/forest.mp3",
    volume: 0.4,
    name: "Forest",
    icon: "🌲",
  },
};

const SoundControls = ({ weather, isPlaying }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(false);
  const [volume, setVolume] = useState(50);
  const [currentSound, setCurrentSound] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeAmbientSounds, setActiveAmbientSounds] = useState({});
  const [soundMix, setSoundMix] = useState({});
  const soundRefs = useRef({});

  // Fade out sound
  const fadeOutSound = (sound, duration = 1000) => {
    if (!sound) return Promise.resolve();

    return new Promise((resolve) => {
      const startVolume = sound.volume();
      const startTime = Date.now();

      const fadeInterval = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / duration, 1);

        sound.volume(startVolume * (1 - progress));

        if (progress === 1) {
          clearInterval(fadeInterval);
          sound.stop();
          resolve();
        }
      }, 50);
    });
  };

  // Fade in sound
  const fadeInSound = (sound, targetVolume, duration = 1000) => {
    if (!sound) return;

    sound.volume(0);
    sound.play();

    const startTime = Date.now();
    const fadeInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      sound.volume(targetVolume * progress);

      if (progress === 1) {
        clearInterval(fadeInterval);
      }
    }, 50);
  };

  // Load and play a sound
  const loadAndPlaySound = async (soundKey, soundConfig, isAmbient = false) => {
    if (!isSoundEnabled) return;

    setIsLoading(true);
    setError(null);

    try {
      // Fade out existing sound if it exists
      if (soundRefs.current[soundKey]) {
        await fadeOutSound(soundRefs.current[soundKey]);
      }

      const sound = new Howl({
        src: [soundConfig.src],
        loop: true,
        volume: 0,
        onload: () => {
          const targetVolume = (volume / 100) * soundConfig.volume;
          fadeInSound(sound, targetVolume);
          soundRefs.current[soundKey] = sound;
          setIsLoading(false);
        },
        onloaderror: (id, error) => {
          console.error("Error loading sound:", error);
          setError(`Failed to load ${soundConfig.name}. Please try again.`);
          setIsLoading(false);
        },
      });
    } catch (err) {
      console.error("Error initializing sound:", err);
      setError(`Failed to initialize ${soundConfig.name}. Please try again.`);
      setIsLoading(false);
    }
  };

  // Handle weather sound changes
  useEffect(() => {
    if (isSoundEnabled && soundEffects[weather]) {
      loadAndPlaySound("weather", soundEffects[weather]);
    }
  }, [weather, isSoundEnabled]);

  // Handle ambient sound toggles
  const toggleAmbientSound = (soundKey) => {
    const newActiveSounds = { ...activeAmbientSounds };
    if (newActiveSounds[soundKey]) {
      // Stop and remove sound
      if (soundRefs.current[soundKey]) {
        fadeOutSound(soundRefs.current[soundKey], 500).then(() => {
          delete soundRefs.current[soundKey];
        });
      }
      delete newActiveSounds[soundKey];
    } else {
      // Start new sound
      loadAndPlaySound(soundKey, ambientSounds[soundKey], true);
      newActiveSounds[soundKey] = true;
    }
    setActiveAmbientSounds(newActiveSounds);
  };

  // Update volume for all active sounds
  useEffect(() => {
    Object.entries(soundRefs.current).forEach(([key, sound]) => {
      const config =
        key === "weather" ? soundEffects[weather] : ambientSounds[key];
      if (config) {
        const targetVolume = (volume / 100) * config.volume;
        fadeInSound(sound, targetVolume, 500);
      }
    });
  }, [volume, weather]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      Object.values(soundRefs.current).forEach((sound) => {
        if (sound) {
          sound.stop();
        }
      });
    };
  }, []);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4 shadow-xl mt-4 border border-white/20 bg-black/30"
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
            Ambient Sound
          </h2>
          {isSoundEnabled && (
            <p className="text-white/70 text-sm mt-1">
              {soundEffects[weather].icon} {soundEffects[weather].name}
            </p>
          )}
          {error && <p className="text-red-400 text-sm mt-1">{error}</p>}
        </div>
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={() => setIsSoundEnabled(!isSoundEnabled)}
          disabled={isLoading}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isSoundEnabled
              ? "bg-gradient-to-r from-blue-700 to-blue-900"
              : "bg-black/40"
          } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          <motion.span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isSoundEnabled ? "translate-x-6" : "translate-x-1"
            }`}
            animate={{
              scale: isSoundEnabled ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 0.3,
            }}
          />
        </motion.button>
      </div>

      {isSoundEnabled && (
        <>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-2"
          >
            <label className="block text-white text-sm mb-2">
              Master Volume: {volume}%
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              disabled={isLoading}
              className={`w-full h-2 bg-black/40 rounded-lg appearance-none cursor-pointer accent-blue-500 ${
                isLoading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            />
          </motion.div>

          {/* Additional Ambient Sounds */}
          <div className="mt-4">
            <h3 className="text-white font-medium mb-2">Additional Sounds</h3>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(ambientSounds).map(([key, sound]) => (
                <motion.button
                  key={key}
                  variants={buttonVariants}
                  initial="initial"
                  whileHover="hover"
                  whileTap="tap"
                  onClick={() => toggleAmbientSound(key)}
                  className={`flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 ${
                    activeAmbientSounds[key]
                      ? "bg-gradient-to-r from-blue-700 to-blue-900 text-white"
                      : "bg-black/40 text-white hover:bg-black/60"
                  }`}
                >
                  <span>{sound.icon}</span>
                  <span>{sound.name}</span>
                </motion.button>
              ))}
            </div>
          </div>
        </>
      )}
    </motion.div>
  );
};

export default SoundControls;
