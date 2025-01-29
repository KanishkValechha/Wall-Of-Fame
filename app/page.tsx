"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import PolaroidCard from "./components/PolaroidCard";
import AchievementModal from "./components/AchievementModal";
import { achievements, categories, Achievement } from "./data/achievements";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);

  const filteredAchievements = achievements.filter(
    (achievement) => selectedCategory === "Overall TOP 10" || achievement.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <main className="min-h-screen">
        <div className="relative w-full overflow-visible pb-16">
          <h1 className="text-3xl md:text-4xl font-bold py-8 text-center top-0  bg-gray-50/80 backdrop-blur-sm">
            Wall of Fame
          </h1>
          <div className="relative w-full max-w-[2000px] mx-auto px-6 pt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-4 gap-y-12 items-start">
              <AnimatePresence mode="wait">
                {filteredAchievements.map((achievement) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      opacity: { duration: 0.3 },
                      scale: { duration: 0.3 },
                    }}
                    className="relative flex justify-center"
                    style={{
                      transform: `rotate(${Math.random() * 10 - 5}deg)`,
                    }}
                  >
                    <PolaroidCard
                      achievement={achievement}
                      onClick={() => setSelectedAchievement(achievement)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </main>
      <AchievementModal
        achievement={selectedAchievement}
        isOpen={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </div>
  );
}