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
import { categories } from "../data/achievements";
import { Search, Filter, Check, X, MessageCircle } from "lucide-react";
import { RemarksModal } from "./RemarksModal";
import { StudentDetailsModal } from "./StudentDetailsModal";

// Update the mock data to include all fields
const generateMockSubmissions = () =>
  Array(10)
    .fill(null)
    .map((_, i) => ({
      id: i + 1,
      fullName: `Student ${i + 1}`,
      regNo: `2023BCS${1000 + i}`,
      mobileNumber: `+91 98765${43210 + i}`,
      category: categories[i % (categories.length - 1)],
      professorName: `Prof. Smith`,
      professorEmail: `prof.smith${i + 1}@university.edu`,
      submissionDate: new Date(2024, 0, i + 1).toLocaleDateString(),
      approved: null,
      remarks: `This is a sample remark for student ${
        i + 1
      }'s achievement submission.`,
      proofUrl: "#",
      userImage:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2788&auto=format&fit=crop",
    }));

const fetchAchievements = async () => {
  const response = await fetch('/api/achievements?professorEmail=vedic20052005@gmail.com', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await response.json();
  return data.achievements;
};

interface Submission {
  id: number;
  fullName: string;
  regNo: string;
  category: string;
  professorName: string;
  submissionDate: string;
  approved: Date | null;
  proofUrl: string;
}

export default function DashboardClient() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [remarksModal, setRemarksModal] = useState({
    isOpen: false,
    submissionId: null as number | null,
  });
  const [selectedStudent, setSelectedStudent] = useState<Submission | null>(
    null
  );

  // Initialize state after component mounts to avoid hydration mismatch
  useEffect(() => {
    const loadAchievements = async () => {
      const achievements = await fetchAchievements();
      setSubmissions(achievements);
      setIsLoaded(true);
    };
    loadAchievements();
  }, []);

  const handleStatusChange = (submissionId: number, status: Date | null) => {
    setSubmissions(
      submissions.map((sub) =>
        sub.id === submissionId ? { ...sub, approved: status } : sub
      )
    );
    // Close the modal after status change
    setSelectedStudent(null);
  };

  const handleOpenRemarks = (submissionId: number) => {
    setRemarksModal({
      isOpen: true,
      submissionId: submissionId,
    });
    // Optionally close the details modal
    setSelectedStudent(null);
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.regNo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || sub.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "approved" && sub.approved !== null) ||
      (selectedStatus === "rejected" && sub.approved === null);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  if (!isLoaded) {
    return null; // or a loading spinner
  }

  return (
    <div className="min-h-screen fancy-bg p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-lg mb-6"
        >
          <h1 className="text-3xl font-display mb-6">Professor Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="relative">
              <Input
                placeholder="Search by name or reg. number"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            </div>

            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories
                  .filter((cat) => cat !== "Overall TOP 10")
                  .map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
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
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="overflow-x-auto">
            <motion.div layout className="min-w-full">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Student Details
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Submission Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white/30 backdrop-blur-sm divide-y divide-gray-200">
                  <AnimatePresence>
                    {filteredSubmissions.map((submission) => (
                      <motion.tr
                        key={submission.id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-black/5 transition-colors cursor-pointer"
                        onClick={() => setSelectedStudent(submission)}
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {submission.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {submission.regNo}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {submission.category}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {submission.submissionDate}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${
                              submission.approved !== null
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                                                            }`}
                          >
                            {submission.approved !== null ? "Approved" : "Rejected"}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-green-100 hover:text-green-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(submission.id, new Date());
                            }}
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-red-100 hover:text-red-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStatusChange(submission.id, null);
                            }}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-blue-100 hover:text-blue-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRemarksModal({
                                isOpen: true,
                                submissionId: submission.id as number,
                              });
                            }}
                          >
                            <MessageCircle className="w-4 h-4" />
                          </Button>
                        </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
                </tbody>
              </table>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <StudentDetailsModal
        isOpen={selectedStudent !== null}
        onClose={() => setSelectedStudent(null)}
        student={selectedStudent}
        onStatusChange={handleStatusChange}
        onOpenRemarks={handleOpenRemarks}
      />

      <RemarksModal
        isOpen={remarksModal.isOpen}
        onClose={() => setRemarksModal({ isOpen: false, submissionId: null })}
        submissionId={remarksModal.submissionId}
      />
    </div>
  );
}
