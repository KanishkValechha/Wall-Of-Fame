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
      whileHover={{ scale: 1.05, rotate: 0, zIndex: 1 }} // Change zIndex to 1
      className="bg-white p-3 md:p-4 shadow-lg cursor-pointer transition-transform duration-300 w-[200px] md:w-[220px] flex flex-col"
      onClick={onClick}
      style={{ transformOrigin: 'center center' }}
    >
      <motion.div 
        className="relative w-full aspect-square mb-3 md:mb-4"
        layoutId={`image-container-${achievement.id}`}
      >
        <Image
          src={achievement.image}
          alt={achievement.name}
          fill
          sizes="(max-width: 768px) 220px, 240px"
          className="object-cover rounded-sm"
          priority
        />
      </motion.div>
      <motion.h3 
        className="text-lg md:text-xl font-handwriting text-center"
        layoutId={`name-${achievement.id}`}
      >
        {achievement.name}
      </motion.h3>
    </motion.div>
  );
}