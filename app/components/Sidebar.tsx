"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface SidebarProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function Sidebar({
  categories,
  selectedCategory,
  onSelectCategory,
}: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="fixed inset-y-0 left-0 z-50">
      {/* Separate overlay with blur */}
      <motion.div
        initial={false}
        animate={{ opacity: isCollapsed ? 0 : 0.5 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10"
        onClick={() => setIsCollapsed(true)}
        style={{ display: isCollapsed ? 'none' : 'block' }}
      />
      {/* Sidebar content */}
      <motion.div
        initial={false}
        animate={{ x: isCollapsed ? -320 : 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="absolute top-0 left-0 h-full w-[300px] bg-white shadow-lg z-20"
      >
        <div className="relative h-full p-6">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold mb-6">Categories</h2>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "ghost"}
                className="w-full justify-start text-left"
                onClick={() => {
                  onSelectCategory(category);
                  setIsCollapsed(true);
                }}
              >
                {category}
              </Button>
            ))}
          </div>
          <Button
            variant="ghost"
            size="icon"
            className={cn(
              "absolute -right-14 top-2", // Changed from -right-12 to -right-14
              isCollapsed ? "text-black" : "text-white"
            )}
            onClick={() => setIsCollapsed(!isCollapsed)}
          >
            {isCollapsed ? <Menu /> : <ChevronLeft />}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}