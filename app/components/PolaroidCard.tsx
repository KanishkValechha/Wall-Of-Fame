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
        boxShadow: "0 10px 25px rgba(0,0,0,0.2)"
      }}
      className="bg-white p-2 sm:p-3 shadow-md hover:shadow-xl cursor-pointer transition-all duration-300 w-[130px] sm:w-[140px] md:w-[160px] flex flex-col"
      onClick={onClick}
      style={{ transformOrigin: 'center center' }}
    >
      <motion.div 
        className="relative w-full aspect-square mb-3"
        layoutId={`image-container-${achievement.id}`}
        transition={{ 
          type: "spring",
          bounce: 0.2,
          duration: 0.6
        }}
      >
        <Image
          src={achievement.image}
          alt={achievement.name}
          fill
          sizes="180px"
          className="object-cover rounded"
          priority
        />
      </motion.div>
      <motion.h3 
        className="text-xs sm:text-sm font-handwriting text-center truncate px-1"
        layoutId={`name-${achievement.id}`}
        transition={{ 
          type: "spring",
          bounce: 0.2,
          duration: 0.6
        }}
      >
        {achievement.name}
      </motion.h3>
    </motion.div>
  );
}