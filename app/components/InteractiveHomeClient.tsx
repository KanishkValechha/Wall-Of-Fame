"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Sidebar from "./Sidebar";
import PolaroidCard from "./PolaroidCard";
import AchievementModal from "./AchievementModal";
import WelcomePage from "./WelcomePage";
import SubmitAchievementForm from "./SubmitAchievementForm";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAnimationSequence } from "../hooks/useAnimationSequence";

// Import types from your data file
import { Achievement } from "../data/achievements";

export interface InteractiveHomeClientProps {
  achievements: Achievement[];
  categories: string[];
  isReturning?: boolean;
}

export default function InteractiveHomeClient({
  achievements,
  categories,
  isReturning = false,
}: InteractiveHomeClientProps) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(
    isReturning ? "Overall TOP 10" : categories[0]
  );
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  const [showContent, setShowContent] = useState(isReturning);
  const [showSubmitForm, setShowSubmitForm] = useState(false);

  const [showWelcome, setShowWelcome] = useState(!isReturning);

  const {
    isSidebarAnimating,
    isContentFadingOut,
    isContentFadingIn,
    startAnimationSequence,
  } = useAnimationSequence();

  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isReturning) {
      const timer = setTimeout(() => {
        setShowContent(true);
      }, 3700);
      return () => clearTimeout(timer);
    }
  }, [isReturning]);

  const calculatePosition = useCallback(
    (index: number) => {
      const isMobile = windowWidth < 768;
      const isTablet = windowWidth >= 768 && windowWidth < 1024;
      if (isMobile) return null;
      const itemsPerRow = isTablet ? 3 : 5;
      const row = Math.floor(index / itemsPerRow);
      const col = index % itemsPerRow;
      const baseLeft = isTablet ? col * 33.33 + 16.66 : col * 20 + 10;
      const baseTop = row * 30 + 15;
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
    if (selectedCategory === "Overall TOP 10") {
      return achievements.filter((a) => a.overallTop).slice(0, 15);
    }
    return achievements.filter((a) => a.category === selectedCategory);
  }, [selectedCategory, achievements]);

  const handleSelectCategory = useCallback(
    (category: string) => {
      startAnimationSequence();
      setTimeout(() => {
        setSelectedCategory(category);
      }, 900);
    },
    [startAnimationSequence]
  );

  const handleAchievementClick = useCallback((achievement: Achievement) => {
    setSelectedAchievement(achievement);
  }, []);

  return (
    <>
      {showWelcome && <WelcomePage />}
      <div className="min-h-screen fancy-bg relative overflow-x-hidden">
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={handleSelectCategory}
          onSubmit={() => router.push("/submit")}
        />
        <Button
          onClick={() => router.push("/submit")}
          className="fixed top-8 right-4 z-50 bg-black text-white hover:bg-black/90 hidden sm:flex"
        >
          <Plus className="w-4 h-4 mr-2" />
          Submit Achievement
        </Button>
        <div className="relative z-0">
          <main className="min-h-screen overflow-y-auto">
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-md h-[120px] sm:h-[140px]">
              <div className="max-w-4xl mx-auto px-4 py-6 sm:py-8">
                <div className="decorative-line mb-4"></div>
                <h1 className="title-gradient text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center tracking-wider">
                  Wall of Fame
                </h1>
                <div className="decorative-line mt-4"></div>
              </div>
            </div>
            {/* Content */}
            <div className="relative w-full min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-140px)] max-w-7xl mx-auto px-4 sm:px-4 pt-[140px] sm:pt-[160px]">
              {/* For small screens */}
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
                        {filteredAchievements.map((achievement, index) => (
                          <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                              duration: isReturning ? 0 : 0.6,
                              delay: isReturning ? 0 : index * 0.1,
                            }}
                          >
                            <PolaroidCard
                              achievement={achievement}
                              onClick={() =>
                                handleAchievementClick(achievement)
                              }
                            />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              {/* For medium and larger screens */}
              <div className="hidden sm:block relative w-full min-h-[calc(100vh-140px)]">
                <AnimatePresence mode="popLayout">
                  {showContent && !isContentFadingOut && (
                    <motion.div
                      key={selectedCategory}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="relative w-full min-h-[calc(100vh-140px)]"
                    >
                      {filteredAchievements.map((achievement, index) => {
                        const position = calculatePosition(index);
                        return position ? (
                          <motion.div
                            key={achievement.id}
                            initial={
                              isReturning
                                ? {
                                    opacity: 1,
                                    scale: 1,
                                    y: "-50%",
                                    x: "-50%",
                                  }
                                : {
                                    opacity: 0,
                                    y: 50,
                                    scale: 0.8,
                                  }
                            }
                            animate={{
                              opacity: 1,
                              scale: 1,
                              y: "-50%",
                              x: "-50%",
                            }}
                            transition={{
                              duration: isReturning ? 0 : 0.5,
                              delay: isReturning ? 0 : index * 0.05,
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
                              onClick={() =>
                                handleAchievementClick(achievement)
                              }
                            />
                          </motion.div>
                        ) : null;
                      })}
                    </motion.div>
                  )}
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
