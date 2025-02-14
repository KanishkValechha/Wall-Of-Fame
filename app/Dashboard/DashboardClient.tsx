"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Check, X, MessageCircle } from "lucide-react";
import { RemarksModal } from "./RemarksModal";

interface Achievement {
  _id: string;
  fullName: string;
  registrationNumber: string;
  achievementCategory: string;
  professorEmail: string;
  submissionDate: string;
  approved: boolean;
  proofUrl: string;
}

export default function DashboardClient() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [remarksModal, setRemarksModal] = useState({
    isOpen: false,
    submissionId: null as string | null,
  });

  useEffect(() => {
    async function fetchAchievements() {
      try {
        const response = await fetch("/api/achievements");
        const data = await response.json();
        setAchievements(data.achievements || []);
      } catch (error) {
        console.error("Failed to fetch achievements:", error);
      } finally {
        setIsLoaded(true);
      }
    }

    fetchAchievements();
  }, []);

  const filteredAchievements = achievements.filter((ach) => {
    const matchesSearch =
      ach.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ach.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || ach.achievementCategory === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "approved" && ach.approved) ||
      (selectedStatus === "pending" && !ach.approved);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (!isLoaded) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div className="bg-white rounded-lg p-6 shadow-lg mb-6">
          <h1 className="text-3xl font-display mb-6">Professor Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Input
                placeholder="Search by name or reg. number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {/* Add dynamic category options if needed */}
              </SelectContent>
            </Select>

            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Student Details</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submission Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <AnimatePresence>
                  {filteredAchievements.map((ach) => (
                    <motion.tr key={ach._id} layout initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-gray-900">{ach.fullName}</div>
                        <div className="text-sm text-gray-500">{ach.registrationNumber}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{ach.achievementCategory}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{ach.submissionDate}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${ach.approved ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}>
                          {ach.approved ? "Approved" : "Pending"}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
