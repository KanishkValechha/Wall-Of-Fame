"use client";

import { Achievement } from "../data/achievements";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl p-0 overflow-hidden">
        <DialogTitle className="sr-only">
          {achievement.name}&apos;s Achievement Details
        </DialogTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{
              duration: 0.5,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="relative h-[300px] md:h-[600px]"
          >
            <Image
              src={achievement.image}
              alt={achievement.name}
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 100, opacity: 0 }}
            transition={{
              duration: 0.5,
              delay: 0.1,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="p-4 md:p-8 bg-white"
          >
            <div className="space-y-4 md:space-y-6">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{achievement.name}</h2>
                <p className="text-muted-foreground">{achievement.category}</p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold mb-2">{achievement.title}</h3>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {achievement.description}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </DialogContent>
    </Dialog>
  );
}