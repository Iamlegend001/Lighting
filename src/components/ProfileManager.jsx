import { useState } from "react";
import { motion } from "motion/react";

const ProfileManager = ({ currentSettings, onLoadProfile }) => {
  const [profiles, setProfiles] = useState(() => {
    const saved = localStorage.getItem("lightingProfiles");
    return saved ? JSON.parse(saved) : [];
  });
  const [newProfileName, setNewProfileName] = useState("");

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

  const actionButtonVariants = {
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
  };

  const saveProfile = () => {
    if (!newProfileName.trim()) return;

    const newProfile = {
      id: Date.now(),
      name: newProfileName,
      settings: currentSettings,
    };

    const updatedProfiles = [...profiles, newProfile];
    setProfiles(updatedProfiles);
    localStorage.setItem("lightingProfiles", JSON.stringify(updatedProfiles));
    setNewProfileName("");
  };

  const deleteProfile = (id) => {
    const updatedProfiles = profiles.filter((profile) => profile.id !== id);
    setProfiles(updatedProfiles);
    localStorage.setItem("lightingProfiles", JSON.stringify(updatedProfiles));
  };

  const exportProfile = (profile) => {
    const dataStr = JSON.stringify(profile.settings, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(
      dataStr
    )}`;

    const exportFileDefaultName = `lighting-profile-${profile.name}.json`;

    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", dataUri);
    linkElement.setAttribute("download", exportFileDefaultName);
    linkElement.click();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-xl p-4 shadow-xl mt-4 border border-white/20 bg-black/30"
    >
      <h2 className="text-xl font-bold text-white mb-4 text-center bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
        Lighting Profiles
      </h2>

      {/* Save new profile */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newProfileName}
          onChange={(e) => setNewProfileName(e.target.value)}
          placeholder="Profile name"
          className="flex-1 px-3 py-2 rounded-lg bg-black/40 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 border border-white/10"
        />
        <motion.button
          variants={buttonVariants}
          initial="initial"
          whileHover="hover"
          whileTap="tap"
          onClick={saveProfile}
          className="px-4 py-2 bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded-lg hover:from-blue-800 hover:to-blue-950 transition-all duration-300 font-bold shadow-lg"
        >
          Save
        </motion.button>
      </div>

      {/* Profile list */}
      <div className="space-y-2">
        {profiles.map((profile) => (
          <motion.div
            key={profile.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between p-3 bg-black/40 rounded-lg backdrop-blur-sm border border-white/10"
          >
            <span className="text-white font-medium">{profile.name}</span>
            <div className="flex gap-2">
              <motion.button
                variants={actionButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => onLoadProfile(profile.settings)}
                className="px-3 py-1 text-sm bg-gradient-to-r from-blue-700 to-blue-900 text-white rounded hover:from-blue-800 hover:to-blue-950 transition-all duration-300 font-medium shadow-md"
              >
                Load
              </motion.button>
              <motion.button
                variants={actionButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => exportProfile(profile)}
                className="px-3 py-1 text-sm bg-gradient-to-r from-green-700 to-green-900 text-white rounded hover:from-green-800 hover:to-green-950 transition-all duration-300 font-medium shadow-md"
              >
                Export
              </motion.button>
              <motion.button
                variants={actionButtonVariants}
                initial="initial"
                whileHover="hover"
                whileTap="tap"
                onClick={() => deleteProfile(profile.id)}
                className="px-3 py-1 text-sm bg-gradient-to-r from-red-700 to-red-900 text-white rounded hover:from-red-800 hover:to-red-950 transition-all duration-300 font-medium shadow-md"
              >
                Delete
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProfileManager;
