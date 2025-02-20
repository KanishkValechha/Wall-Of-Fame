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
import { formatDistanceToNow } from "date-fns";
import { Achievement } from "@/app/types/achievements";

const fetchAchievements = async () => {
  const response = await fetch(
    "/api/achievements?professorEmail=vedic20052005@gmail.com&blacklist=userImage,certificateProof",
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  return data.achievements.map((achievement: any) => ({
    ...achievement,
    approved: achievement.approved ? new Date(achievement.approved) : null,
    studentMail: achievement.studentMail || null,
  }));
};

const fetchStudentDetails = async (submissionId: number, name: string) => {
  const response = await fetch(
    `/api/achievements?whitelist=description,achievementTitle,userImage,certificateProof&_id=${submissionId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (!data.achievements[0].userImage) {
    throw new Error("User image not found");
  }
  return data.achievements[0];
};

const updateAchievement = async (
  submissionId: number,
  approval: Date | null,
  description: string,
  title: string,
  student: any,
  silent: boolean
) => {
  const response = await fetch("/api/achievements", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ _id: submissionId, approval, description, title }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to update achievement");
  }
  if (
    !silent &&
    student.studentMail &&
    data &&
    data.message &&
    data.message === "Achievement updated successfully"
  ) {
    //SEND MAIL TO USER
    const response = await fetch("/api/sendMail", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: student.studentMail,
        subject: "Achievement Status",
        html: `
          <p>Dear ${student.fullName},</p>
          <p>Your achievement titled "<strong>${title}</strong>" has been ${
          approval === null ? "rejected" : "approved"
        }.</p>
          <p><strong>Description:</strong> ${description}</p>
          <p>If you have any questions, feel free to contact your professor at <a href="mailto:${
            student.professorEmail
          }">${student.professorEmail}</a>.</p>
          <p>Best regards,<br/>${student.professorName}</p>
        `,
      }),
    });
    return data;
  }
};

export default function DashboardClient() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [submissions, setSubmissions] = useState<Achievement[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [remarksModal, setRemarksModal] = useState({
    isOpen: false,
    submissionId: null as number | null,
    studentMail: null as string | null,
    studentName: "",
    studentPhone: "",
  });
  const [selectedStudent, setSelectedStudent] = useState<Achievement | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Initialize state after component mounts to avoid hydration mismatch
  useEffect(() => {
    const loadAchievements = async () => {
      const achievements = await fetchAchievements();
      setSubmissions(achievements);
      setIsLoaded(true);
    };
    loadAchievements();
  }, []);

  const handleStatusChange = async (
    submissionId: number,
    status: string,
    description: string,
    title: string
  ) => {
    let approval: Date | null;
    if (status === "approved") {
      approval = new Date();
    } else if (status === "rejected") {
      approval = new Date(2000, 0, 1);
    } else {
      approval = null;
    }

    try {
      await updateAchievement(
        submissionId,
        approval,
        description,
        title,
        selectedStudent,
        false
      );
      setSubmissions(
        submissions.map((sub) =>
          sub._id === submissionId
            ? { ...sub, approved: approval, description }
            : sub
        )
      );
    } catch (error: any) {
      setError(error.message);
    }

    // Close the modal after status change
    setSelectedStudent(null);
  };

  const handleOpenRemarks = (
    submissionId: number,
    studentMail: string | null,
    studentName: string,
    studentPhone: string
  ) => {
    setRemarksModal({
      isOpen: true,
      submissionId: submissionId,
      studentMail: studentMail,
      studentName: studentName,
      studentPhone: studentPhone,
    });
    // Optionally close the details modal
    setSelectedStudent(null);
  };

  const handleCloseRemarks = () => {
    setRemarksModal({
      isOpen: false,
      submissionId: null,
      studentMail: null,
      studentName: "",
      studentPhone: "",
    });
  };

  const handleStudentClick = async (
    submissionId: number,
    approval: string,
    description: string
  ) => {
    try {
      const student = submissions.find((sub) => sub._id === submissionId);
      if (!student) return;
      await updateAchievement(
        submissionId,
        approval === "approved" ? new Date() : new Date(2000, 0, 1),
        description,
        student.achievementTitle,
        student,
        true
      );
      setSubmissions(
        submissions.map((sub) =>
          sub._id === submissionId
            ? {
                ...sub,
                approved:
                  approval === "approved" ? new Date() : new Date(2000, 0, 1),
              }
            : sub
        )
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleSendRemark = async (submissionId: number, remark: string) => {
    const submission = submissions.find((sub) => sub._id === submissionId);
    if (!submission) return;
    try {
      // Simulate sending remark
      await new Promise((resolve) => setTimeout(resolve, 200));
      setSuccessMessage("Remark sent successfully!");
      setRemarksModal({
        isOpen: false,
        submissionId: null,
        studentMail: null,
        studentName: "",
        studentPhone: "",
      });
    } catch (error: any) {
      setError(error.message);
    }
  };

  const filteredSubmissions = submissions.filter((sub) => {
    const matchesSearch =
      sub.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sub.registrationNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      sub.achievementCategory === selectedCategory;
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
                        key={submission._id}
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="hover:bg-black/5 transition-colors cursor-pointer"
                        onClick={async () => {
                          const studentDetails = await fetchStudentDetails(
                            submission._id,
                            submission.fullName
                          );
                          setSelectedStudent({
                            ...submission,
                            ...studentDetails,
                          });
                        }}
                      >
                        <td className="px-6 py-4">
                          <div className="text-sm font-medium text-gray-900">
                            {submission.fullName}
                          </div>
                          <div className="text-sm text-gray-500">
                            {submission.registrationNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {submission.achievementCategory}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatDistanceToNow(
                            new Date(submission.submissionDate),
                            { addSuffix: true }
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${
                              submission.approved !== null &&
                              submission.approved.getFullYear() !== 2000
                                ? "bg-green-100 text-green-800"
                                : submission.approved !== null &&
                                  submission.approved.getFullYear() === 2000
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {submission.approved !== null &&
                            submission.approved.getFullYear() !== 2000
                              ? "Approved"
                              : submission.approved !== null &&
                                submission.approved.getFullYear() === 2000
                              ? "Rejected"
                              : "Pending"}
                          </span>
                        </td>
                        <td className="px-6 py-4 flex space-x-2">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-green-100 hover:text-green-800"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleStudentClick(
                                submission._id,
                                "approved",
                                ""
                              );
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
                              handleStudentClick(
                                submission._id,
                                "rejected",
                                ""
                              );
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
                                submissionId: submission._id as number,
                                studentMail: submission.studentMail,
                                studentName: submission.fullName,
                                studentPhone: submission.mobileNumber,
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

      {error && (
        <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
          <div className="bg-white rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display">Error</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setError(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      )}

      {successMessage && (
        <div className="fixed inset-0 flex items-center justify-center z-[101] p-4">
          <div className="bg-green-100 rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto w-full max-w-4xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-display text-green-800">Success</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSuccessMessage(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-green-800">{successMessage}</p>
          </div>
        </div>
      )}

      <StudentDetailsModal
        isOpen={selectedStudent !== null}
        onClose={() => setSelectedStudent(null)}
        student={selectedStudent}
        onStatusChange={handleStatusChange}
        onOpenRemarks={handleOpenRemarks}
      />

      <RemarksModal
        isOpen={remarksModal.isOpen}
        onClose={handleCloseRemarks}
        submissionId={remarksModal.submissionId}
        studentMail={remarksModal.studentMail}
        studentName={remarksModal.studentName}
        studentPhone={remarksModal.studentPhone}
        onSendRemark={handleSendRemark}
      />
    </div>
  );
}
