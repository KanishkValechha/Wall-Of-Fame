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
      className="card-shine bg-white p-4 cursor-pointer transition-all duration-300 w-[140px] sm:w-[160px] md:w-[180px] flex flex-col rounded-sm mx-auto"
      onClick={onClick}
      style={{
        transformOrigin: "center center",
        boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
        border: "1px solid rgba(0, 0, 0, 0.1)",
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
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4dHRodHSQkHx8nJCQvJjEmJiYmJiYxNjMtLTY3LjEtN0BAQkVGRkpHR0dHR0dHR0dHR0dHR0f/2wBDARAVFhgeGRkgGhocHRodHiMeHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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

export default React.memo(PolaroidCardComponent);
