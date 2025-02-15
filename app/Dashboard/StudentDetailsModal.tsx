import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X, Check, MessageCircle } from "lucide-react";
import Image from "next/image";

interface StudentDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: any | null;
  onStatusChange: (id: number, status: string) => void;
  onOpenRemarks: (id: number) => void;
}

export function StudentDetailsModal({
  isOpen,
  onClose,
  student,
  onStatusChange,
  onOpenRemarks,
}: StudentDetailsModalProps) {
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
            className="fixed inset-0 flex items-center justify-center z-[101] p-4"
          >
            <div className="bg-white rounded-lg shadow-xl p-6 max-h-[90vh] overflow-y-auto w-full max-w-4xl">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-display">Student Details</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              {/* Status Actions Bar */}
              <div className="bg-gray-50 p-4 rounded-lg mb-6 flex justify-center gap-4">
                <Button
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 text-white px-8"
                  onClick={() => onStatusChange(student.id, "approved")}
                >
                  <Check className="w-5 h-5 mr-2" />
                  Approve
                </Button>
                <Button
                  size="lg"
                  variant="destructive"
                  className="px-8"
                  onClick={() => onStatusChange(student.id, "rejected")}
                >
                  <X className="w-5 h-5 mr-2" />
                  Reject
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="px-8"
                  onClick={() => onOpenRemarks(student.id)}
                >
                  <MessageCircle className="w-5 h-5 mr-2" />
                  Add Remarks
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-6">
                  <div className="relative w-full aspect-square rounded-lg overflow-hidden">
                    <Image
                      src={student.userImage || "/placeholder.png"}
                      alt={student.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Basic Information</h3>
                    <div className="space-y-2">
                      <p>
                        <span className="text-gray-500">Name:</span>{" "}
                        {student.name}
                      </p>
                      <p>
                        <span className="text-gray-500">
                          Registration Number:
                        </span>{" "}
                        {student.regNo}
                      </p>
                      <p>
                        <span className="text-gray-500">Mobile:</span>{" "}
                        {student.mobileNumber}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Achievement Details</h3>
                    <div className="space-y-2">
                      <p>
                        <span className="text-gray-500">Category:</span>{" "}
                        {student.category}
                      </p>
                      <p>
                        <span className="text-gray-500">Submission Date:</span>{" "}
                        {student.submissionDate}
                      </p>
                      <p>
                        <span className="text-gray-500">Status:</span>
                        <span
                          className={`ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                          ${
                            student.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : student.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {student.status.charAt(0).toUpperCase() +
                            student.status.slice(1)}
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
                        <span className="text-gray-500">Professor Name:</span>{" "}
                        {student.professorName}
                      </p>
                      <p>
                        <span className="text-gray-500">Professor Email:</span>{" "}
                        {student.professorEmail}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Student Remarks</h3>
                    <p className="text-gray-700">{student.remarks}</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold mb-2">Certificate/Proof</h3>
                    <a
                      href={student.proofUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Certificate
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
