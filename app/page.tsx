"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Sidebar from "./components/Sidebar";
import PolaroidCard from "./components/PolaroidCard";
import AchievementModal from "./components/AchievementModal";
import { achievements, categories, Achievement } from "./data/achievements";
import WelcomePage from "./components/WelcomePage";
import SubmitAchievementForm from "./components/SubmitAchievementForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth);

    // Update width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    // Delay showing content until after welcome animation
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 3700); // 2.5s (welcome delay) + 1.2s (slide up) = 3.7s

    return () => clearTimeout(timer);
  }, []);

  const calculatePosition = useCallback(
    (index: number, total: number) => {
      const isMobile = windowWidth < 768;
      const isTablet = windowWidth >= 768 && windowWidth < 1024;

      if (isMobile) {
        return null;
      }

      const itemsPerRow = isTablet ? 3 : 5;
      const row = Math.floor(index / itemsPerRow);
      const col = index % itemsPerRow;

      const baseLeft = isTablet
        ? col * 33.33 + 16.66 // 3 columns on tablet
        : col * 20 + 10; // 5 columns on desktop

      // Increase the vertical spacing by adjusting the multiplier (from 25 to 30)
      const baseTop = row * 30 + 15;

      // Reduce the random movement range to prevent overlap
      const randomX = (Math.random() - 0.5) * 2;
      const randomY = (Math.random() - 0.5) * 2;
      const rotate = (Math.random() - 0.5) * 6;

      return {
        top: `${baseTop + randomY}%`,
        left: `${baseLeft + randomX}%`,
        rotate: `${rotate}deg`,
      };
    },
    [windowWidth]
  );

  const filteredAchievements = useMemo(() => {
    let filtered = achievements;

    if (selectedCategory === "Overall TOP 10") {
      filtered = achievements
        .filter((achievement) => achievement.overallTop)
        .slice(0, 15);
    } else {
      filtered = achievements.filter(
        (achievement) => achievement.category === selectedCategory
      );
    }

    return filtered;
  }, [selectedCategory, achievements]);

  const handleSelectCategory = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  const handleAchievementClick = useCallback((achievement: Achievement) => {
    setSelectedAchievement(achievement);
  }, []);

  return (
    <>
      <WelcomePage />
      <div className="min-h-screen fancy-bg relative overflow-x-hidden">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onSubmit={() => router.push("/submit")}
        />
        {/* Add back the submit button with hidden-sm for mobile */}
        <Button
          onClick={() => router.push("/submit")}
          className="fixed top-8 right-4 z-50 bg-black text-white hover:bg-black/90 hidden sm:flex"
        >
          <Plus className="w-4 h-4 mr-2" />
          Submit Achievement
        </Button>
        <div className="relative z-0">
          <main className="min-h-screen overflow-y-auto">
            {/* Header section with fixed height */}
            <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-md h-[120px] sm:h-[140px]">
              <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
                <div className="decorative-line mb-4"></div>
                <h1 className="title-gradient text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center tracking-wider">
                  Wall of Fame
                </h1>
                <div className="decorative-line mt-4"></div>
              </div>
            </div>

            {/* Content section with proper top padding */}
            <div className="relative w-full min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-140px)] max-w-7xl mx-auto px-4 sm:px-4 pt-[140px] sm:pt-[160px]">
              {/* Mobile layout - Updated grid positioning */}
              <div className="sm:hidden grid grid-cols-2 gap-4 mb-20 justify-items-center">
                <AnimatePresence mode="sync">
                  {showContent &&
                    filteredAchievements.map((achievement, index) => (
                      <motion.div
                        key={achievement.id}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{
                          duration: 0.6,
                          delay: index * 0.1,
                          ease: [0.21, 1.11, 0.81, 0.99],
                        }}
                      >
                        <PolaroidCard
                          achievement={achievement}
                          onClick={() => handleAchievementClick(achievement)}
                        />
                      </motion.div>
                    ))}
                </AnimatePresence>
              </div>

              {/* Desktop layout */}
              <div className="hidden sm:block relative w-full min-h-[calc(100vh-140px)]">
                <AnimatePresence mode="sync">
                  {showContent &&
                    filteredAchievements.map((achievement, index) => {
                      const position = calculatePosition(
                        index,
                        filteredAchievements.length
                      );
                      return position ? (
                        <motion.div
                          key={achievement.id}
                          initial={{ opacity: 0, y: 50, scale: 0.8 }}
                          animate={{
                            opacity: 1,
                            scale: 1,
                            y: "-50%",
                            x: "-50%",
                          }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{
                            duration: 0.6,
                            delay: index * 0.1,
                            ease: [0.21, 1.11, 0.81, 0.99],
                          }}
                          className="absolute transform"
                          style={{
                            top: position.top,
                            left: position.left,
                            rotate: position.rotate,
                            zIndex: 10,
                          }}
                        >
                          <PolaroidCard
                            achievement={achievement}
                            onClick={() => handleAchievementClick(achievement)}
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
        <SubmitAchievementForm
          isOpen={showSubmitForm}
          onClose={() => setShowSubmitForm(false)}
        />
      </div>
    </>
  );
}
