"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Achievement } from "../data/achievements";

interface PolaroidCardProps {
  achievement: Achievement;
  onClick: () => void;
}

export default function PolaroidCard({ achievement, onClick }: PolaroidCardProps) {
  return (
    <motion.div
      whileHover={{ 
        scale: 1.05,
        rotate: 0,
        zIndex: 50,
      }}
      className="card-shine bg-white p-4 cursor-pointer transition-all duration-300 w-[140px] sm:w-[160px] md:w-[180px] flex flex-col rounded-sm"
      onClick={onClick}
      style={{ 
        transformOrigin: 'center center',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(0, 0, 0, 0.1)'
      }}
    >
      <motion.div 
        className="relative w-full aspect-square mb-5 overflow-hidden"
        layoutId={`image-container-${achievement.id}`}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      >
        <div className="absolute inset-0 border border-black/10 z-10" />
        <Image
          src={achievement.image}
          alt={achievement.name}
          fill
          sizes="180px"
          className="object-cover"
          priority
        />
      </motion.div>
      <motion.h3 
        className="text-base sm:text-lg font-handwriting text-center truncate px-1 text-black/80"
        layoutId={`name-${achievement.id}`}
        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
      >
        {achievement.name}
      </motion.h3>
    </motion.div>
  );
}