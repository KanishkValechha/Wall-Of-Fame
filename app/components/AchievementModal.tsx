"use client";

import { useEffect, useState } from "react";
import { Achievement } from "@/app/types/achievements";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";

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
  // console.log(achievement);
  const [processedAchievement, setProcessedAchievement] =
    useState<Achievement | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Function to create object URL from certificate data - identical to StudentDetailsModal
  const createObjectURL = (certificateData: any) => {
    if (!certificateData) return null;
    const { data, contentType } = certificateData;
    const blob = new Blob([Buffer.from(data, "base64")], { type: contentType });
    return URL.createObjectURL(blob);
  };

  // Handle image and certificate processing - same approach as StudentDetailsModal
  useEffect(() => {
    if (!isOpen || !achievement) {
      setProcessedAchievement(null);
      setIsLoading(true);
      return;
    }

    const processedData = { ...achievement };

    // Process image if needed
    if (achievement.userImage?.data && !achievement.imageUrl) {
      processedData.imageUrl = `data:${achievement.userImage.contentType};base64,${achievement.userImage.data}`;
    }

    // Process certificate if needed
    if (achievement.certificateProof?.data) {
      const url = createObjectURL(achievement.certificateProof);
      if (url) {
        processedData.certificateUrl = url;
      }
    }

    setProcessedAchievement(processedData);
    setIsLoading(false);
  }, [isOpen, achievement]);

  // Handle cleanup of certificate URLs
  useEffect(() => {
    return () => {
      if (
        processedAchievement?.certificateUrl &&
        processedAchievement.certificateUrl.startsWith("blob:")
      ) {
        URL.revokeObjectURL(processedAchievement.certificateUrl);
      }
    };
  }, [processedAchievement?.certificateUrl]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

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
            className="fixed inset-0 bg-background/80 backdrop-blur-sm"
            onClick={onClose}
          />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
              }}
              className="relative w-full bg-card rounded-lg overflow-hidden max-h-[90vh] md:max-w-4xl shadow-xl"
            >
              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-50 p-2 rounded-full bg-background/50 hover:bg-background/80 text-primary hover:text-primary/80 transition-colors"
              >
                ✕
              </button>

              {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                  <p className="text-gray-600">Loading details...</p>
                </div>
              ) : (
                <div className="flex flex-col md:grid md:grid-cols-2 max-h-[90vh] overflow-y-auto">
                  <motion.div
                    layoutId={`image-container-${achievement._id}`}
                    transition={{
                      type: "spring",
                      bounce: 0.2,
                      duration: 0.6,
                    }}
                    className="relative w-full h-[35vh] md:h-[600px] shrink-0"
                  >
                    <Image
                      src={achievement.imageUrl}
                      alt={achievement.fullName}
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
                    className="p-6 md:p-8 bg-card"
                  >
                    <div className="space-y-4">
                      <div>
                        <motion.h2
                          layoutId={`name-${achievement._id}`}
                          className="text-2xl md:text-3xl font-bold mb-2 text-primary"
                        >
                          {achievement.fullName}
                        </motion.h2>
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-sm md:text-base text-muted-foreground"
                        >
                          {achievement.achievementCategory}
                        </motion.p>
                      </div>

                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="space-y-3"
                      >
                        <h3 className="text-lg md:text-xl font-semibold text-primary">
                          {achievement.title}
                        </h3>
                        <p className="text-foreground/80 text-sm md:text-base leading-relaxed">
                          {achievement.description}
                        </p>
                      </motion.div>

                      {/* Certificate section - with identical styling from StudentDetailsModal */}
                      <motion.div
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="bg-gray-50 p-4 rounded-lg mt-4"
                      >
                        <h3 className="font-semibold mb-2">
                          Certificate/Proof
                        </h3>
                        {processedAchievement?.certificateUrl ? (
                          <Button
                            variant="outline"
                            className="w-full bg-white hover:bg-blue-50 border-2 border-blue-200 text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 py-4"
                            onClick={() => {
                              if (processedAchievement.certificateUrl) {
                                window.open(
                                  processedAchievement.certificateUrl,
                                  "_blank",
                                  "noopener,noreferrer"
                                );
                              }
                            }}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            View Certificate
                          </Button>
                        ) : (
                          <p className="text-gray-500">
                            No certificate available
                          </p>
                        )}
                      </motion.div>
                    </div>
                  </motion.div>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
