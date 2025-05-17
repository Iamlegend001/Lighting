import { motion, AnimatePresence } from "motion/react";
import { useState, useEffect } from "react";

const SystemTimeSync = ({ onSync }) => {
  const [isSynced, setIsSynced] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    let interval;
    if (isSynced) {
      interval = setInterval(() => {
        const now = new Date();
        setCurrentTime(now);
        onSync(now.getHours() + now.getMinutes() / 60);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSynced, onSync]);

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="glass rounded-xl p-4 shadow-xl mt-4"
    >
      <motion.div
        variants={itemVariants}
        className="flex items-center justify-between mb-4"
      >
        <div>
          <motion.h2
            variants={itemVariants}
            className="text-xl font-bold text-white"
          >
            System Time Sync
          </motion.h2>
          <motion.p variants={itemVariants} className="text-white/70 text-sm">
            {currentTime.toLocaleTimeString()}
          </motion.p>
        </div>
        <motion.button
          variants={itemVariants}
          onClick={() => setIsSynced(!isSynced)}
          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
            isSynced ? "bg-blue-500" : "bg-gray-400"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <motion.span
            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
              isSynced ? "translate-x-6" : "translate-x-1"
            }`}
            animate={{
              scale: isSynced ? [1, 1.2, 1] : 1,
            }}
            transition={{
              duration: 0.3,
            }}
          />
        </motion.button>
      </motion.div>

      <AnimatePresence>
        {isSynced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="text-white/70 text-sm overflow-hidden"
          >
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Syncing with system time. The lighting will update automatically.
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SystemTimeSync;
