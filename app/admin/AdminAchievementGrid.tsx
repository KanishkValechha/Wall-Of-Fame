"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Achievement } from "@/app/types/achievements";
import AdminAchievementCard from "./AdminAchievementCard";

interface AdminAchievementGridProps {
  achievements: Achievement[];
  showContent: boolean;
  isContentFadingOut: boolean;
  selectedCategory: string;
  onAchievementClick: (achievement: Achievement) => void;
  onToggleArchive: (achievement: Achievement) => void;
  onToggleTop10: (achievement: Achievement) => void;
  windowWidth: number;
}

export default function AdminAchievementGrid({
  achievements,
  showContent,
  isContentFadingOut,
  selectedCategory,
  onAchievementClick,
  onToggleArchive,
  onToggleTop10,
  windowWidth,
}: AdminAchievementGridProps) {
  const isMobile = windowWidth < 768;
  const isTablet = windowWidth >= 768 && windowWidth < 1024;

  // Helper function to separate achievements into sections
  const getSectionedAchievements = (
    achievements: Achievement[],
    selectedCategory: string
  ) => {
    // Skip sectioning for special categories
    if (
      ["All Achievements", "Top 10", "Pending Students", "Archived"].includes(
        selectedCategory
      )
    ) {
      return { top10: [], others: achievements };
    }

    // For specific categories, separate top 10 from other unarchived
    const top10 = achievements.filter((a) => a.overAllTop10);
    const others = achievements.filter((a) => !a.overAllTop10);

    return { top10, others };
  };

  // Separate achievements into sections when viewing a specific category
  const { top10, others } = getSectionedAchievements(
    achievements,
    selectedCategory
  );
  const hasMultipleSections = top10.length > 0 && others.length > 0;

  // Mobile view with modern grid layout
  if (isMobile) {
    return (
      <div className="w-full pb-10">
        <AnimatePresence mode="wait">
          {showContent && !isContentFadingOut && (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
              transition={{ duration: 0.4 }}
            >
              {achievements.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  {/* Show sectioned achievements on mobile */}
                  {hasMultipleSections ? (
                    <>
                      {/* Top 10 section */}
                      {top10.length > 0 && (
                        <>
                          <SectionHeader title="Top 10 Achievements" />
                          <div className="grid grid-cols-1 gap-6 mb-8">
                            <AnimatedCards
                              achievements={top10}
                              onAchievementClick={onAchievementClick}
                              onToggleArchive={onToggleArchive}
                              onToggleTop10={onToggleTop10}
                            />
                          </div>

                          <div className="border-t border-gray-100 my-8"></div>
                          <SectionHeader title="Other Achievements" />
                        </>
                      )}

                      {/* Other achievements section */}
                      <div className="grid grid-cols-1 gap-6 mb-6">
                        <AnimatedCards
                          achievements={others}
                          onAchievementClick={onAchievementClick}
                          onToggleArchive={onToggleArchive}
                          onToggleTop10={onToggleTop10}
                          startIndex={top10.length}
                        />
                      </div>
                    </>
                  ) : (
                    // Show all achievements without sections for other categories
                    <div className="grid grid-cols-1 gap-6 mb-6">
                      <AnimatedCards
                        achievements={achievements}
                        onAchievementClick={onAchievementClick}
                        onToggleArchive={onToggleArchive}
                        onToggleTop10={onToggleTop10}
                      />
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Tablet view with 2 columns
  if (isTablet) {
    return (
      <div className="w-full pb-10">
        <AnimatePresence mode="wait">
          {showContent && !isContentFadingOut && (
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="w-full"
              transition={{ duration: 0.4 }}
            >
              {achievements.length === 0 ? (
                <EmptyState />
              ) : (
                <>
                  {/* Show sectioned achievements */}
                  {hasMultipleSections ? (
                    <>
                      {/* Top 10 section */}
                      {top10.length > 0 && (
                        <>
                          <SectionHeader title="Top 10 Achievements" />
                          <div className="grid grid-cols-2 gap-6 mb-8">
                            <AnimatedCards
                              achievements={top10}
                              onAchievementClick={onAchievementClick}
                              onToggleArchive={onToggleArchive}
                              onToggleTop10={onToggleTop10}
                            />
                          </div>

                          <div className="border-t border-gray-100 my-8"></div>
                          <SectionHeader title="Other Achievements" />
                        </>
                      )}

                      {/* Other achievements section */}
                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <AnimatedCards
                          achievements={others}
                          onAchievementClick={onAchievementClick}
                          onToggleArchive={onToggleArchive}
                          onToggleTop10={onToggleTop10}
                        />
                      </div>
                    </>
                  ) : (
                    // Show all achievements without sections for other categories
                    <div className="grid grid-cols-2 gap-6 mb-6">
                      <AnimatedCards
                        achievements={achievements}
                        onAchievementClick={onAchievementClick}
                        onToggleArchive={onToggleArchive}
                        onToggleTop10={onToggleTop10}
                      />
                    </div>
                  )}
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  // Desktop view with 3-4 columns
  return (
    <div className="w-full pb-10">
      <AnimatePresence mode="wait">
        {showContent && !isContentFadingOut && (
          <motion.div
            key={selectedCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
            transition={{ duration: 0.4 }}
          >
            {achievements.length === 0 ? (
              <EmptyState />
            ) : (
              <>
                {/* Show sectioned achievements */}
                {hasMultipleSections ? (
                  <>
                    {/* Top 10 section */}
                    {top10.length > 0 && (
                      <>
                        <SectionHeader title="Top 10 Achievements" />
                        <div className="grid grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                          <AnimatedCards
                            achievements={top10}
                            onAchievementClick={onAchievementClick}
                            onToggleArchive={onToggleArchive}
                            onToggleTop10={onToggleTop10}
                          />
                        </div>

                        <div className="border-t border-gray-100 my-12"></div>
                        <SectionHeader title="Unarchived Achievements" />
                      </>
                    )}

                    {/* Other achievements section */}
                    <div className="grid grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                      <AnimatedCards
                        achievements={others}
                        onAchievementClick={onAchievementClick}
                        onToggleArchive={onToggleArchive}
                        onToggleTop10={onToggleTop10}
                      />
                    </div>
                  </>
                ) : (
                  // Show all achievements without sections for other categories
                  <div className="grid grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                    <AnimatedCards
                      achievements={achievements}
                      onAchievementClick={onAchievementClick}
                      onToggleArchive={onToggleArchive}
                      onToggleTop10={onToggleTop10}
                    />
                  </div>
                )}
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Helper component for displaying achievement cards with animations
function AnimatedCards({
  achievements,
  onAchievementClick,
  onToggleArchive,
  onToggleTop10,
  startIndex = 0,
}: {
  achievements: Achievement[];
  onAchievementClick: (achievement: Achievement) => void;
  onToggleArchive: (achievement: Achievement) => void;
  onToggleTop10: (achievement: Achievement) => void;
  startIndex?: number;
}) {
  return (
    <>
      {achievements.map((achievement, index) => (
        <motion.div
          key={achievement._id}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: (index + startIndex) * 0.05,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          <AdminAchievementCard
            achievement={achievement}
            onClick={() => onAchievementClick(achievement)}
            onToggleArchive={() => onToggleArchive(achievement)}
            onToggleTop10={() => onToggleTop10(achievement)}
          />
        </motion.div>
      ))}
    </>
  );
}

// Section header component
function SectionHeader({ title }: { title: string }) {
  return (
    <h2 className="text-xl font-medium text-gray-800 mb-5 tracking-tight">
      {title}
    </h2>
  );
}

// Empty state component
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      <div className="h-16 w-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg
          className="h-8 w-8 text-gray-400"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M18 12H6m9-9l-9 9 9 9"
          />
        </svg>
      </div>
      <h3 className="text-lg font-medium text-gray-700">
        No achievements found
      </h3>
      <p className="text-gray-500 mt-2 max-w-md">
        Try changing your filters or search query to find what you're looking
        for.
      </p>
    </div>
  );
}
