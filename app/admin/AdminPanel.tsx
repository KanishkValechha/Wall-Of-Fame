"use client";
import { useState, useEffect, useMemo } from "react";
import { categories } from "../data/achievements";
import Header from "../components/Header";
import AdminSidebar from "./AdminSidebar";
import AdminAchievementGrid from "./AdminAchievementGrid";
import EditAchievementModal from "./EditAchievementModal";
import ArchiveModal from "./ArchiveModal";
import { useAnimationSequence } from "../hooks/useAnimationSequence";
import { Button } from "@/components/ui/button";
import { Download, Search, RefreshCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Achievement } from "@/app/types/achievements";

// Admin-specific categories
const adminCategories = [
  "All Achievements",
  "Top 10",
  "Pending Students", // Changed from "Pending Approval" to "Pending Students"
  "Archived",
  ...categories,
];

// Sample dummy data for achievements
const dummyAchievements: Achievement[] = Array(20)
  .fill(null)
  .map((_, i) => ({
    _id: i + 1,
    fullName: `Student ${i + 1}`,
    registrationNumber: `REG${200000 + i}`,
    mobileNumber: `+91 9876${543210 + i}`.substring(0, 13),
    studentMail: `student${i + 1}@muj.edu.in`,
    achievementCategory: categories[i % categories.length],
    professorName: `Dr. Professor ${(i % 5) + 1}`,
    professorEmail: `professor${(i % 5) + 1}@muj.edu.in`,
    userImage: { data: "", contentType: "image/jpeg" },
    imageUrl: `https://source.unsplash.com/random/300x300?portrait&sig=${i}`,
    certificateProof: { data: "", contentType: "application/pdf" },
    certificateUrl: "",
    submissionDate: new Date(2025, 3, (i % 30) + 1),
    remarks: i % 5 === 0 ? "Outstanding achievement" : "Good work",
    approved: i % 3 === 0 ? null : new Date(2025, 3, (i % 30) + 2),
    overAllTop10: i < 10,
    archived: i >= 15,
    title: `Achievement Title ${i + 1}`,
    description: `This is a detailed description of the achievement ${
      i + 1
    }. The student participated in a prestigious event and secured a top position.`,
  }));

export default function AdminPanel() {
  const [achievements, setAchievements] =
    useState<Achievement[]>(dummyAchievements);
  const [selectedCategory, setSelectedCategory] = useState(adminCategories[0]);
  const [selectedAchievement, setSelectedAchievement] =
    useState<Achievement | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isArchiveModalOpen, setIsArchiveModalOpen] = useState(false);
  const [archiveOperation, setArchiveOperation] = useState<
    "archive" | "unarchive"
  >("archive");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);

  const {
    isSidebarAnimating,
    isContentFadingOut,
    isContentFadingIn,
    startAnimationSequence,
  } = useAnimationSequence();

  // Handle window resize
  useEffect(() => {
    setWindowWidth(window.innerWidth);
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Filter achievements based on selected category and search query
  const filteredAchievements = useMemo(() => {
    let filtered = achievements;

    // Filter by search query first
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.fullName.toLowerCase().includes(query) ||
          a.title.toLowerCase().includes(query) ||
          a.registrationNumber.toLowerCase().includes(query)
      );
    }

    // Filter by category
    if (selectedCategory === "Top 10") {
      filtered = filtered.filter((a) => a.overAllTop10 && !a.archived);
    } else if (selectedCategory === "Pending Students") {
      filtered = filtered.filter((a) => !a.approved && !a.archived);
    } else if (selectedCategory === "Archived") {
      filtered = filtered.filter((a) => a.archived);
    } else if (selectedCategory === "All Achievements") {
      filtered = filtered.filter((a) => !a.archived);

      // Sort to show Top 10 first, then the rest
      filtered.sort((a, b) => {
        if (a.overAllTop10 && !b.overAllTop10) return -1;
        if (!a.overAllTop10 && b.overAllTop10) return 1;
        return 0;
      });
    } else {
      // For specific categories, show all unarchived achievements of that category
      // Filter by the specific category
      filtered = filtered.filter(
        (a) => a.achievementCategory === selectedCategory && !a.archived
      );

      // Sort to show approved & Top 10 first, then approved, then pending
      filtered.sort((a, b) => {
        // Top 10 comes first
        if (a.overAllTop10 && !b.overAllTop10) return -1;
        if (!a.overAllTop10 && b.overAllTop10) return 1;

        // Then approved achievements
        if (a.approved && !b.approved) return -1;
        if (!a.approved && b.approved) return 1;

        // If both have the same approval status, maintain original order
        return 0;
      });
    }

    return filtered;
  }, [achievements, selectedCategory, searchQuery]);

  const handleSelectCategory = (category: string) => {
    startAnimationSequence();
    setTimeout(() => {
      setSelectedCategory(category);
    }, 900);
  };

  const handleAchievementClick = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setIsEditModalOpen(true);
  };

  const handleEditAchievement = (updatedAchievement: Achievement) => {
    setAchievements((prev) =>
      prev.map((a) =>
        a._id === updatedAchievement._id ? updatedAchievement : a
      )
    );
    setIsEditModalOpen(false);
    setSelectedAchievement(null);
  };

  const handleToggleArchive = (achievement: Achievement) => {
    setSelectedAchievement(achievement);
    setArchiveOperation(achievement.archived ? "unarchive" : "archive");
    setIsArchiveModalOpen(true);
  };

  const handleConfirmArchiveOperation = () => {
    if (!selectedAchievement) return;

    setAchievements((prev) =>
      prev.map((a) => {
        if (a._id === selectedAchievement._id) {
          return { ...a, archived: archiveOperation === "archive" };
        }
        return a;
      })
    );

    setIsArchiveModalOpen(false);
    setSelectedAchievement(null);
  };

  const handleToggleTop10 = (achievement: Achievement) => {
    setAchievements((prev) =>
      prev.map((a) => {
        if (a._id === achievement._id) {
          return { ...a, overAllTop10: !a.overAllTop10 };
        }
        // If adding to top 10 and we have 10 already, remove the last one
        if (!achievement.overAllTop10 && a.overAllTop10) {
          const top10Count = prev.filter((item) => item.overAllTop10).length;
          if (top10Count >= 10) {
            // Find the oldest top 10 item to remove
            const oldestTop10 = [...prev]
              .filter((item) => item.overAllTop10)
              .sort(
                (a, b) =>
                  new Date(a.approved || a.submissionDate).getTime() -
                  new Date(b.approved || b.submissionDate).getTime()
              )[0];

            if (oldestTop10._id === a._id) {
              return { ...a, overAllTop10: false };
            }
          }
        }
        return a;
      })
    );
  };
const REJECTION_DATE = new Date("1999-12-31T18:30:00.000Z");
const getApprovalStatus = (achievement: Achievement): 'rejected' | 'pending' | 'approved' => {
  if (typeof achievement.approved === "string") {
    achievement.approved = new Date(achievement.approved);}
  if (achievement.approved instanceof Date && 
      Math.abs(achievement.approved.getTime() - REJECTION_DATE.getTime()) < 10000) { // Allow 16 min tolerance
    return 'rejected';
  } else if (achievement.approved === null) {
    return 'pending';
  } else {
    return 'approved';
  }
};

  const refreshData = () => {
    setLoading(true);
    // In a real application, this would be an API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const exportAchievements = () => {
    const dataStr =
      "data:text/json;charset=utf-8," +
      encodeURIComponent(JSON.stringify(filteredAchievements));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "achievements_export.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen fancy-bg relative overflow-x-hidden">
      <AdminSidebar
        categories={adminCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      <Header />

      <div className="relative w-full min-h-[calc(100vh-120px)] max-w-7xl mx-auto px-4 pt-[140px] md:pt-[160px]">
        {/* Admin toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <Input
              placeholder="Search achievements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-64"
            />
            <Button
              variant="outline"
              size="icon"
              onClick={() => setSearchQuery("")}
            >
              <Search className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex space-x-2 w-full md:w-auto justify-end">
            <Button
              variant="outline"
              size="sm"
              className="whitespace-nowrap"
              onClick={refreshData}
              disabled={loading}
            >
              <RefreshCcw
                className={`h-4 w-4 mr-1 ${loading ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="whitespace-nowrap"
              onClick={exportAchievements}
            >
              <Download className="h-4 w-4 mr-1" />
              Export
            </Button>
          </div>
        </div>

        <AdminAchievementGrid
          achievements={filteredAchievements}
          showContent={true}
          isContentFadingOut={isContentFadingOut}
          selectedCategory={selectedCategory}
          onAchievementClick={handleAchievementClick}
          onToggleArchive={handleToggleArchive}
          onToggleTop10={handleToggleTop10}
          windowWidth={windowWidth}
          getApprovalStatus={(achievement) => getApprovalStatus(achievement)}
        />

        {/* Show count of displayed achievements */}
        <div className="mt-6 text-sm text-black/70">
          Showing {filteredAchievements.length} achievements
          {selectedCategory !== "All Achievements"
            ? ` in "${selectedCategory}"`
            : ""}
          {searchQuery ? ` matching "${searchQuery}"` : ""}
        </div>
      </div>

      {/* Modals */}
      {selectedAchievement && (
        <>
          <EditAchievementModal
            achievement={selectedAchievement}
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedAchievement(null);
            }}
            onSave={handleEditAchievement}
          />

          <ArchiveModal
            achievement={selectedAchievement}
            operation={archiveOperation}
            isOpen={isArchiveModalOpen}
            onClose={() => setIsArchiveModalOpen(false)}
            onConfirm={handleConfirmArchiveOperation}
          />
        </>
      )}
    </div>
  );
}
