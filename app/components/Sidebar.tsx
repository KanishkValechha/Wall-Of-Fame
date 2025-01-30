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
      <motion.div
        initial={false}
        animate={{ opacity: isCollapsed ? 0 : 0.7 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-10"
        onClick={() => setIsCollapsed(true)}
        style={{ display: isCollapsed ? 'none' : 'block' }}
      />
      <motion.div
        initial={false}
        animate={{ x: isCollapsed ? -320 : 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="absolute top-0 left-0 h-full w-[300px] bg-white shadow-lg z-20 border-r border-black/10"
      >
        <div className="relative h-full p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl font-display font-semibold text-primary tracking-wide">Categories</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="text-primary/80 hover:text-primary"
              >
                <ChevronLeft />
              </Button>
            </div>
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start text-left font-sidebar text-base",
                  selectedCategory === category 
                    ? "bg-black text-white hover:bg-black/90" 
                    : "text-black/70 hover:text-black hover:bg-black/5"
                )}
                onClick={() => {
                  onSelectCategory(category);
                  setIsCollapsed(true);
                }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </motion.div>
      
      {isCollapsed && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-4 text-black hover:text-black/70"
          onClick={() => setIsCollapsed(false)}
        >
          <Menu />
        </Button>
      )}
    </div>
  );
}