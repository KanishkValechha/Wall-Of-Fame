"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Achievement } from "../data/achievements";
import React from "react";

interface PolaroidCardProps {
  achievement: Achievement;
  onClick: () => void;
}

function PolaroidCardComponent({ achievement, onClick }: PolaroidCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.05,
        rotate: 0,
        zIndex: 50,
      }}
      className="card-shine bg-white p-4 cursor-pointer will-change-transform 
        w-[140px] sm:w-[160px] md:w-[180px] flex flex-col rounded-sm mx-auto"
      onClick={onClick}
      style={{
        transformOrigin: "center center",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
        transform: "translate3d(0, 0, 0)", // Force GPU acceleration
        backfaceVisibility: "hidden",
        perspective: 1000,
      }}
    >
      <motion.div
        className="relative w-full aspect-square mb-5 overflow-hidden"
        layoutId={`image-container-${achievement.id}`}
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 0.6,
          layout: { duration: 0.3 },
        }}
      >
        <div className="absolute inset-0 border border-black/10 z-10" />
        <Image
          src={achievement.image}
          alt={achievement.name}
          fill
          sizes="(max-width: 768px) 140px, (max-width: 1024px) 160px, 180px"
          className="object-cover"
          loading="eager" // Change to eager since we're preloading anyway
          priority={true} // Add priority for first visible images
        />
      </motion.div>
      <motion.h3
        className="text-base sm:text-lg font-handwriting text-center truncate px-1 text-black/80"
        layoutId={`name-${achievement.id}`}
        transition={{
          type: "spring",
          bounce: 0.2,
          duration: 0.6,
          layout: { duration: 0.3 },
        }}
      >
        {achievement.name}
      </motion.h3>
    </motion.div>
  );
}

// Use React.memo with custom comparison
export default React.memo(PolaroidCardComponent, (prev, next) => {
  return prev.achievement.id === next.achievement.id;
});
