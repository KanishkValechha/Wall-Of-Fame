"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "./components/Sidebar";
import PolaroidCard from "./components/PolaroidCard";
import AchievementModal from "./components/AchievementModal";
import { achievements, categories, Achievement } from "./data/achievements";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedAchievement, setSelectedAchievement] = useState<Achievement | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Update width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const calculatePosition = (index: number, total: number) => {
    const isMobile = windowWidth < 768;
    const isTablet = windowWidth >= 768 && windowWidth < 1024;
    
    if (isMobile) {
      return null;
    }
    
    const itemsPerRow = isTablet ? 3 : 5;
    const row = Math.floor(index / itemsPerRow);
    const col = index % itemsPerRow;
    
    const baseLeft = isTablet ?
      (col * 33.33) + 16.66 : // 3 columns on tablet
      (col * 20) + 10; // 5 columns on desktop
    
    const baseTop = (row * 25) + 12.5;
    
    const randomX = (Math.random() - 0.5) * 3;
    const randomY = (Math.random() - 0.5) * 3;
    const rotate = (Math.random() - 0.5) * 8;

    return {
      top: `${baseTop + randomY}%`,
      left: `${baseLeft + randomX}%`,
      rotate: `${rotate}deg`
    };
  };

  const filteredAchievements = achievements.filter(
    (achievement) => selectedCategory === "Overall TOP 10" || achievement.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-gray-50 relative overflow-x-hidden">
      <Sidebar
        categories={categories}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      <div className="relative z-0">
        <main className="min-h-screen overflow-y-auto pt-16 sm:pt-20">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold py-4 sm:py-8 text-center fixed top-0 left-0 right-0 bg-gray-50/80 backdrop-blur-sm z-10">
            Wall of Fame
          </h1>
          <div className="relative w-full min-h-[calc(100vh-64px)] sm:min-h-[calc(100vh-80px)] max-w-7xl mx-auto px-2 sm:px-4 pt-4 sm:pt-8">
            <div className="sm:hidden grid grid-cols-2 gap-4 mb-20">
              {/* Mobile layout */}
              <AnimatePresence mode="wait">
                {filteredAchievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.05,
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

            {/* Desktop layout with absolute positioning */}
            <div className="hidden sm:block relative w-full min-h-[calc(100vh-80px)]">
              <AnimatePresence mode="wait">
                {filteredAchievements.map((achievement, index) => {
                  const position = calculatePosition(index, filteredAchievements.length);
                  return position ? (
                    <motion.div
                      key={achievement.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: 1,
                        x: "-50%",
                        y: "-50%",
                      }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{
                        duration: 0.4,
                        delay: index * 0.05,
                      }}
                      className="absolute transform"
                      style={{
                        top: position.top,
                        left: position.left,
                        rotate: position.rotate,
                        zIndex: 10
                      }}
                    >
                      <PolaroidCard
                        achievement={achievement}
                        onClick={() => setSelectedAchievement(achievement)}
                      />
                    </motion.div>
                  ) : null;
                })}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>
      <AchievementModal
        achievement={selectedAchievement}
        isOpen={!!selectedAchievement}
        onClose={() => setSelectedAchievement(null)}
      />
    </div>
  );
}