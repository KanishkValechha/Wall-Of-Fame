import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Check, MessageCircle, SendToBack } from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/input";
import { Achievement } from "@/app/types/achievements";
import { ApprovalRequestModal } from "./ApprovalRequestModal";

interface StudentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Achievement | null;
  onStatusChange: (
    id: number,
    status: string,
    description: string,
    title: string
  ) => void;
  onOpenRemarks: (
    id: number,
    email: string | null,
    name: string,
    mobile: string
  ) => void;
}

export function StudentDetailsModal({
  isOpen,
  onClose,
  student,
  onStatusChange,
  onOpenRemarks,
}: StudentDetailsModalProps) {
  const [description, setDescription] = useState("");
  const [achievementTitle, setAchievementTitle] = useState("");
  const [studentData, setStudentData] = useState<Achievement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const descriptionInputRef = useRef<HTMLTextAreaElement>(null);
  const [approvalModalOpen, setApprovalModalOpen] = useState(false);

  // Reset states when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStudentData(null);
      setIsLoading(true);
    }
  }, [isOpen]);

  const createObjectURL = (certificateData: any) => {
    if (!certificateData) return null;
    const { data, contentType } = certificateData;
    const blob = new Blob([Buffer.from(data, "base64")], { type: contentType });
    return URL.createObjectURL(blob);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    } else {
      window.removeEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Set initial values and handle cleanup when modal closes
  useEffect(() => {
    if (!isOpen) {
      setStudentData(null);
      setDescription("");
      setAchievementTitle("");
      setIsLoading(true);
    }
  }, [isOpen]);

  // Handle initial data loading
  useEffect(() => {
    if (student) {
      setDescription(student.description || "");
      setAchievementTitle(student.title || "");
    }
  }, [student]);

  // Handle image and certificate processing
  useEffect(() => {
    if (!isOpen || !student) return;

    const processedStudent = { ...student };

    if (student.userImage?.data) {
      processedStudent.imageUrl = `data:${student.userImage.contentType};base64,${student.userImage.data}`;
    }

    if (student.certificateProof?.data) {
      const url = createObjectURL(student.certificateProof);
      if (url) {
        processedStudent.certificateUrl = url;
      }
    }

    setStudentData(processedStudent);
    setIsLoading(false);
  }, [isOpen, student]);

  // Handle cleanup of certificate URLs
  useEffect(() => {
    return () => {
      if (studentData?.certificateUrl) {
        URL.revokeObjectURL(studentData.certificateUrl);
      }
    };
  }, [studentData?.certificateUrl]);

  // Add this useEffect to handle body scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle sending approval request
  const handleSendApprovalRequest = async (
    professorEmail: string,
    message: string
  ) => {
    // This is just a frontend implementation - no real backend call
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        console.log("Sending approval request to:", professorEmail);
        console.log("Message:", message);
        console.log("Student:", student?.fullName);
        console.log("Achievement ID:", student?._id);
        resolve();
      }, 1000);
    });
  };

  if (!student) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-[100]"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-start justify-center z-[101] p-2 sm:p-4 overflow-y-auto"
          >
            <div className="bg-white rounded-lg shadow-xl p-3 sm:p-6 my-4 sm:my-8 w-full max-w-4xl">
              {isLoading ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
                  <p className="text-gray-600">Loading student details...</p>
                </div>
              ) : (
                <>
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <h2 className="text-xl sm:text-2xl font-display">
                      Student Details
                    </h2>
                    <Button variant="ghost" size="icon" onClick={onClose}>
                      <X className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Achievement Title Input */}
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-medium">
                      Achievement Title
                    </h3>
                    <Input
                      value={achievementTitle}
                      onChange={(e) => setAchievementTitle(e.target.value)}
                      placeholder="Add an achievement title"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Description Input */}
                  <div className="mb-3 sm:mb-4">
                    <h3 className="text-base sm:text-lg font-medium">
                      Description
                    </h3>
                    <textarea
                      ref={descriptionInputRef}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Add a description"
                      className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={4}
                    />
                  </div>

                  {/* Status Actions Bar */}
                  <div className="bg-gray-50 p-3 sm:p-4 rounded-lg mb-4 sm:mb-6 flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
                    <Button
                      size="default"
                      className="bg-green-600 hover:bg-green-700 text-white w-full sm:w-auto"
                      onClick={() =>
                        onStatusChange(
                          student._id,
                          "approved",
                          description,
                          achievementTitle
                        )
                      }
                    >
                      <Check className="w-5 h-5 mr-2" />
                      Approve
                    </Button>
                    <Button
                      size="default"
                      variant="destructive"
                      className="w-full sm:w-auto"
                      onClick={() =>
                        onStatusChange(
                          student._id,
                          "rejected",
                          description,
                          achievementTitle
                        )
                      }
                    >
                      <X className="w-5 h-5 mr-2" />
                      Reject
                    </Button>
                    <Button
                      size="default"
                      variant="outline"
                      className="w-full sm:w-auto"
                      onClick={() =>
                        onOpenRemarks(
                          student._id,
                          student.studentMail,
                          student.fullName,
                          student.mobileNumber
                        )
                      }
                    >
                      <MessageCircle className="w-5 h-5 mr-2" />
                      Add Remarks
                    </Button>
                    <Button
                      size="default"
                      variant="outline"
                      className="w-full sm:w-auto bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 border-blue-200"
                      onClick={() => setApprovalModalOpen(true)}
                    >
                      <SendToBack className="w-5 h-5 mr-2" />
                      Send for Approval
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                    <div className="space-y-4 sm:space-y-6">
                      <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                        {studentData?.imageUrl && (
                          <Image
                            src={studentData.imageUrl}
                            alt={studentData.fullName}
                            fill
                            className="object-cover"
                            priority
                          />
                        )}
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">
                          Basic Information
                        </h3>
                        <div className="space-y-2">
                          <p>
                            <span className="text-gray-500">Name:</span>{" "}
                            {student.fullName}
                          </p>
                          <p>
                            <span className="text-gray-500">
                              Registration Number:
                            </span>{" "}
                            {student.registrationNumber}
                          </p>
                          <p>
                            <span className="text-gray-500">Mobile:</span>{" "}
                            {student.mobileNumber}
                          </p>
                          <p>
                            <span className="text-gray-500">Mail:</span>{" "}
                            {student.studentMail}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4 sm:space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">
                          Achievement Details
                        </h3>
                        <div className="space-y-2">
                          <p>
                            <span className="text-gray-500">Category:</span>{" "}
                            {student.achievementCategory}
                          </p>
                          <p>
                            <span className="text-gray-500">
                              Submission Date:
                            </span>{" "}
                            {new Date(
                              student.submissionDate
                            ).toLocaleDateString()}
                          </p>
                          <p>
                            <span className="text-gray-500">Status:</span>
                            <span
                              className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                              ${
                                student.approved !== null &&
                                student.approved.getFullYear() !== 2000
                                  ? "bg-green-100 text-green-800"
                                  : student.approved !== null &&
                                    student.approved.getFullYear() === 2000
                                  ? "bg-red-100 text-red-800"
                                  : "bg-yellow-100 text-yellow-800"
                              }`}
                            >
                              {student.approved !== null &&
                              student.approved.getFullYear() !== 2000
                                ? "Approved"
                                : student.approved !== null &&
                                  student.approved.getFullYear() === 2000
                                ? "Rejected"
                                : "Pending"}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">
                          Professor Information
                        </h3>
                        <div className="space-y-2">
                          <p>
                            <span className="text-gray-500">
                              Professor Name:
                            </span>{" "}
                            {student.professorName}
                          </p>
                          <p>
                            <span className="text-gray-500">
                              Professor Email:
                            </span>{" "}
                            {student.professorEmail}
                          </p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">Student Remarks</h3>
                        <p className="text-gray-700">{student.remarks}</p>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold mb-2">
                          Certificate/Proof
                        </h3>
                        {studentData?.certificateUrl ? (
                          <Button
                            variant="outline"
                            className="w-full bg-white hover:bg-blue-50 border-2 border-blue-200 text-blue-600 hover:text-blue-700 transition-colors duration-200 flex items-center justify-center gap-2 py-4"
                            onClick={() => {
                              if (studentData.certificateUrl) {
                                window.open(
                                  studentData.certificateUrl,
                                  "_blank",
                                  "noopener,noreferrer"
                                );
                              }
                            }}
                          >
                            <svg
                              className="w-5 h-5"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                              />
                            </svg>
                            View Certificate
                          </Button>
                        ) : (
                          <p className="text-gray-500">
                            No certificate available
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Approval Request Modal */}
          <ApprovalRequestModal
            isOpen={approvalModalOpen}
            onClose={() => setApprovalModalOpen(false)}
            submissionId={student._id}
            studentName={student.fullName}
            achievementTitle={achievementTitle || student.title || ""}
            onSendRequest={handleSendApprovalRequest}
          />
        </>
      )}
    </AnimatePresence>
  );
}
