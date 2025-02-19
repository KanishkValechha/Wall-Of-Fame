"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Sidebar from "./Sidebar";
import PolaroidCard from "./PolaroidCard";
import AchievementModal from "./AchievementModal";
import WelcomePage from "./WelcomePage";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAnimationSequence } from "../hooks/useAnimationSequence";
import Logo from "./Logo";
import { teamMembers } from "../data/team";
import TeamModal from "./TeamModal";

// Import types from your data file
import { Achievement } from "@/app/types/achievements";
// import { Achievement } from "../data/achievements";

export interface InteractiveHomeClientProps {
  categories: string[];
  isReturning?: boolean;
}

export default function InteractiveHomeClient({
  categories,
  isReturning = false,
}: InteractiveHomeClientProps) {
  const router = useRouter();
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(
    isReturning ? "Overall TOP 10" : categories[0]
  );
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [loading, setLoading] = useState(true);

  const [showContent, setShowContent] = useState(isReturning);
  const [showTeamModal, setShowTeamModal] = useState(false);

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

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(
          `/api/achievements?approved=2001-01-01&archived=false`
        );
        const data = await response.json();
        if (response.ok) {
          const achievementsWithImages = data.achievements.map(
            (achievement: Achievement) => {
              // Convert user image to base64 URL if it exists
              if (achievement.userImage?.data) {
                achievement.imageUrl = `data:${achievement.userImage.contentType};base64,${achievement.userImage.data}`;
              }
              // Convert certificate to base64 URL if it exists
              if (achievement.certificateProof?.data) {
                achievement.certificateUrl = `data:${achievement.certificateProof.contentType};base64,${achievement.certificateProof.data}`;
              }
              return achievement;
            }
          );
          setAchievements(achievementsWithImages);
        } else {
          console.error("Failed to fetch achievements:", data.error);
        }
      } catch (error) {
        console.error("Error fetching achievements:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

  const filteredAchievements = useMemo(() => {
    if (loading) return [];
    if (selectedCategory === "Overall TOP 10") {
      return achievements.filter((a) => a.overAllTop10).slice(0, 15);
    }
    return achievements.filter(
      (a) => a.achievementCategory === selectedCategory
    );
  }, [selectedCategory, achievements, loading]);

  const calculatePosition = useCallback(
    (index: number) => {
      const isMobile = windowWidth < 768;
      const isTablet = windowWidth >= 768 && windowWidth < 1024;
      if (isMobile) return null;

      const itemsPerRow = isTablet ? 3 : 5;
      const row = Math.floor(index / itemsPerRow);
      const col = index % itemsPerRow;

      // Calculate grid dimensions
      const totalItems = filteredAchievements.length;
      const totalRows = Math.ceil(totalItems / itemsPerRow);

      // Increased grid width and adjusted spacing
      const gridWidth = isTablet ? 80 : 85; // Increased from 75/80
      const cellWidth = gridWidth / itemsPerRow;
      const gridLeft = (100 - gridWidth) / 2;
      const horizontalOffset = isTablet ? -2 : -4;

      // Increased row height for more vertical spacing
      const rowHeight = 35; // Increased from 30
      const startFromTop = 0;
      const baseTop = startFromTop + row * rowHeight;

      const baseLeft =
        gridLeft + col * cellWidth + cellWidth / 2 + horizontalOffset;

      // Reduced random variations to prevent overlapping
      const randomX = (Math.random() - 0.5) * 0.8; // Reduced from 1
      const randomY = (Math.random() - 0.5) * 0.8; // Reduced from 1
      const rotate = (Math.random() - 0.5) * 2; // Reduced from 3

      return {
        top: `${baseTop + randomY}%`,
        left: `${baseLeft + randomX}%`,
        transform: `rotate(${rotate}deg) translate3d(-50%, -50%, 0)`,
        willChange: "transform, opacity",
      };
    },
    [windowWidth, filteredAchievements.length]
  );

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

  // Slower animation config
  const staggerDuration = 0.05; // Increased from 0.03
  const animationConfig = {
    initial: { opacity: 0, y: 50, scale: 0.8 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: {
      type: "spring",
      stiffness: 200, // Reduced from 300
      damping: 25, // Adjusted for smoother motion
      mass: 1,
      duration: 0.6, // Increased from 0.4
    },
  };

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
              <div className="max-w-4xl mx-auto px-4 py-4 sm:py-6">
                <div className="decorative-line mb-4"></div>
                <div className="flex items-center justify-center gap-2 sm:gap-4">
                  <Logo />
                  <h1 className="title-gradient text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-center tracking-wider">
                    Wall of Fame
                  </h1>
                </div>
                <div className="decorative-line mt-4"></div>
              </div>
            </div>
            {/* Adjust the top padding back to original values */}
            <div className="relative w-full min-h-[calc(100vh-120px)] sm:min-h-[calc(100vh-140px)] max-w-7xl mx-auto px-4 sm:px-4 pt-[140px] md:pt-[140px] ">
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
                      {filteredAchievements.map((achievement, index) => {
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
        <motion.div
          onClick={() => setShowTeamModal(true)}
          className="fixed bottom-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-pink-600 
            text-white px-6 py-3 rounded-full cursor-pointer shadow-lg hover:shadow-xl
            backdrop-blur-sm text-sm sm:text-base font-medium flex items-center gap-2
            border border-white/20"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-5 h-5 relative">
            <Image
              src="/logo.png"
              alt="SDC Logo"
              fill
              className="object-contain"
            />
          </div>
          Made by the SDC Team
          <motion.div
            className="absolute inset-0 bg-white rounded-full"
            style={{ mixBlendMode: "overlay" }}
            initial={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.5, opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
        <TeamModal
          isOpen={showTeamModal}
          onClose={() => setShowTeamModal(false)}
          teamMembers={teamMembers}
        />
        <AchievementModal
          achievement={selectedAchievement}
          isOpen={!!selectedAchievement}
          onClose={() => setSelectedAchievement(null)}
        />
      </div>
    </>
  );
}
