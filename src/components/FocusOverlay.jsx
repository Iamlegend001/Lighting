import { motion, AnimatePresence } from "motion/react";

const FocusOverlay = ({ isActive, onClose }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
          onClick={onClose}
        >
          {/* Dark overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
          />

          {/* Focus circle */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative w-64 h-64 rounded-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-blue-500 to-purple-600 opacity-50" />
            <div className="absolute inset-0 backdrop-blur-sm" />
          </motion.div>

          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-8 px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors"
            onClick={onClose}
          >
            Exit Focus Mode
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FocusOverlay;
