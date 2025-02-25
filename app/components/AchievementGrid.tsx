import { motion, AnimatePresence } from "framer-motion";
import { Achievement } from "@/app/types/achievements";
import PolaroidCard from "./PolaroidCard";

interface AchievementGridProps {
  achievements: Achievement[];
  showContent: boolean;
  isContentFadingOut: boolean;
  selectedCategory: string;
  isReturning: boolean;
  calculatePosition: (index: number) => any;
  onAchievementClick: (achievement: Achievement) => void;
}

const staggerDuration = 0.05;
const animationConfig = {
  initial: { opacity: 0, y: 50, scale: 0.8 },
  animate: { opacity: 1, y: 0, scale: 1 },
  exit: { opacity: 0, scale: 0.8 },
  transition: {
    type: "spring",
    stiffness: 200,
    damping: 25,
    mass: 1,
    duration: 0.6,
  },
};

export function MobileAchievementGrid({
  achievements,
  showContent,
  isContentFadingOut,
  selectedCategory,
  isReturning,
  onAchievementClick,
}: AchievementGridProps) {
  return (
    <div className="sm:hidden w-full">
      <AnimatePresence mode="popLayout">
        {showContent && !isContentFadingOut && (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <div className="grid grid-cols-2 gap-4">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement._id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: isReturning ? 0 : 0.6,
                    delay: isReturning ? 0 : index * 0.1,
                  }}
                >
                  <PolaroidCard
                    achievement={achievement}
                    onClick={() => onAchievementClick(achievement)}
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function DesktopAchievementGrid({
  achievements,
  showContent,
  isContentFadingOut,
  selectedCategory,
  isReturning,
  calculatePosition,
  onAchievementClick,
}: AchievementGridProps) {
  return (
    <div className="hidden sm:block relative w-full min-h-[calc(100vh-140px)]">
      <AnimatePresence mode="wait">
        {showContent && !isContentFadingOut && (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative w-full min-h-[calc(100vh-140px)]"
            style={{ willChange: "opacity" }}
          >
            {achievements.map((achievement, index) => {
              const position = calculatePosition(index);
              return position ? (
                <motion.div
                  key={achievement._id}
                  {...animationConfig}
                  transition={{
                    ...animationConfig.transition,
                    delay: isReturning ? 0 : index * staggerDuration,
                  }}
                  className="absolute transform"
                  style={position}
                >
                  <PolaroidCard
                    achievement={achievement}
                    onClick={() => onAchievementClick(achievement)}
                  />
                </motion.div>
              ) : null;
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
