"use client";

import { Achievement } from "../data/achievements";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface AchievementModalProps {
  achievement: Achievement | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function AchievementModal({
  achievement,
  isOpen,
  onClose,
}: AchievementModalProps) {
  if (!achievement) return null;

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <div className="fixed inset-0 z-50">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/40"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
              className="relative w-full bg-white rounded-lg overflow-hidden max-h-[90vh] md:max-w-4xl shadow-xl"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-50 p-2 rounded-full bg-white/80 hover:bg-white shadow-md"
              >
                ✕
              </button>

              <div className="flex flex-col md:grid md:grid-cols-2 max-h-[90vh] overflow-y-auto">
                <motion.div
                  layoutId={`image-container-${achievement.id}`}
                  transition={{ 
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6
                  }}
                  className="relative w-full h-[35vh] md:h-[600px] shrink-0"
                >
                  <Image
                    src={achievement.image}
                    alt={achievement.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="p-6 md:p-8 bg-white"
                >
                  <div className="space-y-4">
                    <div>
                      <motion.h2 
                        layoutId={`name-${achievement.id}`}
                        className="text-2xl md:text-3xl font-bold mb-2"
                      >
                        {achievement.name}
                      </motion.h2>
                      <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="text-sm md:text-base text-muted-foreground"
                      >
                        {achievement.category}
                      </motion.p>
                    </div>

                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="space-y-3"
                    >
                      <h3 className="text-lg md:text-xl font-semibold">
                        {achievement.title}
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                        {achievement.description}
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}