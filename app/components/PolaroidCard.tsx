"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Achievement } from "@/app/types/achievements";
import React from "react";

interface PolaroidCardProps {
  achievement: Achievement;
  onClick: () => void;
}

function PolaroidCardComponent({ achievement, onClick }: PolaroidCardProps) {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -5,
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="group relative rounded-xl overflow-hidden cursor-pointer"
      onClick={onClick}
      style={{
        width: "100%",
        aspectRatio: "3/4",
        background: "white",
        boxShadow: "0 10px 30px rgba(0, 0, 0, 0.06)",
      }}
    >
      {/* Image container with overlay gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-transparent via-black/5 to-black/70 z-10"
        layoutId={`overlay-${achievement._id}`}
      />

      <motion.div
        className="absolute inset-0"
        layoutId={`image-container-${achievement._id}`}
      >
        {achievement.imageUrl && (
          <Image
            src={achievement.imageUrl}
            alt={achievement.fullName}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            priority={true}
          />
        )}
      </motion.div>

      {/* Content overlay at bottom */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 p-5 z-20 text-white"
        layoutId={`content-${achievement._id}`}
      >
        <motion.h3
          className="font-medium text-lg md:text-xl mb-1"
          layoutId={`name-${achievement._id}`}
        >
          {achievement.fullName}
        </motion.h3>

        <motion.p
          className="text-xs md:text-sm text-white/90 line-clamp-2 font-light"
          layoutId={`title-${achievement._id}`}
        >
          {achievement.title}
        </motion.p>
      </motion.div>

      {/* Subtle shine effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-5" />
    </motion.div>
  );
}

// Use React.memo with custom comparison
export default React.memo(PolaroidCardComponent, (prev, next) => {
  return prev.achievement._id === next.achievement._id;
});
