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
import {
  Download,
  Search,
  RefreshCcw,
  Filter,
  X,
  ArrowUpDown,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Achievement } from "@/app/types/achievements";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Admin-specific categories
const adminCategories = [
  "All Achievements",
  "Top 10",
  "Pending Students",
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

// Sort options
type SortOption = {
  label: string;
  value: string;
};

const sortOptions: SortOption[] = [
  { label: "Newest first", value: "newest" },
  { label: "Oldest first", value: "oldest" },
  { label: "Name (A-Z)", value: "name_asc" },
  { label: "Name (Z-A)", value: "name_desc" },
];

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
  const [sortBy, setSortBy] = useState<string>("newest");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

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

      // Apply additional filters if selected
      if (activeFilters.includes("pending")) {
        filtered = filtered.filter((a) => !a.approved);
      }
      if (activeFilters.includes("top10")) {
        filtered = filtered.filter((a) => a.overAllTop10);
      }

      // Sort based on selection
      if (sortBy === "newest") {
        filtered.sort((a, b) => {
          const dateA = new Date(a.approved || a.submissionDate).getTime();
          const dateB = new Date(b.approved || b.submissionDate).getTime();
          return dateB - dateA;
        });
      } else if (sortBy === "oldest") {
        filtered.sort((a, b) => {
          const dateA = new Date(a.approved || a.submissionDate).getTime();
          const dateB = new Date(b.approved || b.submissionDate).getTime();
          return dateA - dateB;
        });
      } else if (sortBy === "name_asc") {
        filtered.sort((a, b) => a.fullName.localeCompare(b.fullName));
      } else if (sortBy === "name_desc") {
        filtered.sort((a, b) => b.fullName.localeCompare(a.fullName));
      }
    } else {
      // For specific categories
      filtered = filtered.filter(
        (a) => a.achievementCategory === selectedCategory && !a.archived
      );

      // Apply additional sorting
      if (sortBy === "newest") {
        filtered.sort((a, b) => {
          const dateA = new Date(a.approved || a.submissionDate).getTime();
          const dateB = new Date(b.approved || b.submissionDate).getTime();
          return dateB - dateA;
        });
      } else if (sortBy === "oldest") {
        filtered.sort((a, b) => {
          const dateA = new Date(a.approved || a.submissionDate).getTime();
          const dateB = new Date(b.approved || b.submissionDate).getTime();
          return dateA - dateB;
        });
      } else if (sortBy === "name_asc") {
        filtered.sort((a, b) => a.fullName.localeCompare(b.fullName));
      } else if (sortBy === "name_desc") {
        filtered.sort((a, b) => b.fullName.localeCompare(a.fullName));
      }

      // Make sure Top 10 are at the beginning
      filtered.sort((a, b) => {
        if (a.overAllTop10 && !b.overAllTop10) return -1;
        if (!a.overAllTop10 && b.overAllTop10) return 1;
        return 0;
      });
    }

    return filtered;
  }, [achievements, selectedCategory, searchQuery, sortBy, activeFilters]);

  const handleSelectCategory = (category: string) => {
    startAnimationSequence();
    setTimeout(() => {
      setSelectedCategory(category);
      // Reset filters when changing categories
      setActiveFilters([]);
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

  const toggleFilter = (filter: string) => {
    setActiveFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  // Create a background gradient with a subtle pattern
  const bgStyle = {
    background: `
      linear-gradient(to bottom right, rgba(255, 255, 255, 0.9), rgba(240, 240, 250, 0.9)),
      url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23bbb9f2' fill-opacity='0.07' fill-rule='evenodd'/%3E%3C/svg%3E")
    `,
  };

  return (
    <div className="min-h-screen relative overflow-x-hidden" style={bgStyle}>
      <AdminSidebar
        categories={adminCategories}
        selectedCategory={selectedCategory}
        onSelectCategory={handleSelectCategory}
      />

      <Header />

      <div className="relative w-full min-h-[calc(100vh-120px)] max-w-7xl mx-auto px-4 pt-[140px] md:pt-[160px]">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900">
            {selectedCategory}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            Manage and organize student achievements in one place
          </p>
        </div>

        {/* Admin toolbar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 space-y-4 md:space-y-0 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <div className="flex items-center space-x-2 w-full md:w-auto">
            <div className="relative flex-grow md:max-w-xs">
              <Input
                placeholder="Search achievements..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pr-8 border-gray-200 focus-visible:ring-offset-0"
              />
              {searchQuery && (
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  onClick={() => setSearchQuery("")}
                >
                  <X size={14} />
                </button>
              )}
              {!searchQuery && (
                <Search className="h-4 w-4 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400" />
              )}
            </div>

            {/* Filter dropdown for "All Achievements" view */}
            {selectedCategory === "All Achievements" && (
              <div className="flex items-center space-x-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-1.5 h-10 whitespace-nowrap"
                    >
                      <Filter className="h-3.5 w-3.5" />
                      <span>Filter</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-48">
                    <div className="p-2">
                      <div className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id="filter-pending"
                          checked={activeFilters.includes("pending")}
                          onChange={() => toggleFilter("pending")}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor="filter-pending" className="text-sm">
                          Pending only
                        </label>
                      </div>
                      <div className="flex items-center space-x-2 mt-2">
                        <input
                          type="checkbox"
                          id="filter-top10"
                          checked={activeFilters.includes("top10")}
                          onChange={() => toggleFilter("top10")}
                          className="rounded border-gray-300"
                        />
                        <label htmlFor="filter-top10" className="text-sm">
                          Top 10 only
                        </label>
                      </div>
                    </div>
                  </DropdownMenuContent>
                </DropdownMenu>

                {activeFilters.length > 0 && (
                  <div className="hidden md:flex items-center space-x-2">
                    {activeFilters.map((filter) => (
                      <Badge
                        key={filter}
                        variant="secondary"
                        className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-1"
                        onClick={() => toggleFilter(filter)}
                      >
                        {filter === "pending" ? "Pending" : "Top 10"}
                        <X size={12} className="cursor-pointer" />
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex space-x-2 w-full md:w-auto justify-between md:justify-end items-center">
            {/* Sort dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1.5 h-10"
                >
                  <ArrowUpDown className="h-3.5 w-3.5" />
                  <span className="hidden sm:inline">Sort</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuRadioGroup
                  value={sortBy}
                  onValueChange={setSortBy}
                >
                  {sortOptions.map((option) => (
                    <DropdownMenuRadioItem
                      key={option.value}
                      value={option.value}
                    >
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1.5 h-10"
              onClick={refreshData}
              disabled={loading}
            >
              <RefreshCcw
                className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`}
              />
              <span className="hidden sm:inline">Refresh</span>
            </Button>
          </div>
        </div>

        {/* Conditional mobile display of active filters */}
        {activeFilters.length > 0 &&
          selectedCategory === "All Achievements" && (
            <div className="md:hidden flex flex-wrap items-center gap-2 mb-4">
              {activeFilters.map((filter) => (
                <Badge
                  key={filter}
                  variant="secondary"
                  className="flex items-center gap-1 bg-gray-100 hover:bg-gray-200 px-2 py-1"
                  onClick={() => toggleFilter(filter)}
                >
                  {filter === "pending" ? "Pending" : "Top 10"}
                  <X size={12} className="cursor-pointer" />
                </Badge>
              ))}
            </div>
          )}

        <AdminAchievementGrid
          achievements={filteredAchievements}
          showContent={true}
          isContentFadingOut={isContentFadingOut}
          selectedCategory={selectedCategory}
          onAchievementClick={handleAchievementClick}
          onToggleArchive={handleToggleArchive}
          onToggleTop10={handleToggleTop10}
          windowWidth={windowWidth}
        />

        {/* Show count of displayed achievements */}
        <div className="mt-6 mb-8 text-sm text-gray-500">
          Showing {filteredAchievements.length} achievement
          {filteredAchievements.length !== 1 && "s"}
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
