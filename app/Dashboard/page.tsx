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


// export default function DashboardClient() {
//   const [submissions, setSubmissions] = useState(mockSubmissions);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedCategory, setSelectedCategory] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [remarksModal, setRemarksModal] = useState<{
//     isOpen: boolean;
//     submissionId: number | null;
//   }>({
//     isOpen: false,
//     submissionId: null,
//   });

//   const handleStatusChange = (submissionId: number, status: string) => {
//     setSubmissions(
//       submissions.map((sub) =>
//         sub.id === submissionId ? { ...sub, status } : sub
//       )
//     );
//   };

//   const filteredSubmissions = submissions.filter((sub) => {
//     const matchesSearch =
//       sub.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       sub.regNo.toLowerCase().includes(searchQuery.toLowerCase());
//     const matchesCategory =
//       !selectedCategory || sub.category === selectedCategory;
//     const matchesStatus = !selectedStatus || sub.status === selectedStatus;
//     return matchesSearch && matchesCategory && matchesStatus;
//   });

//   return (
//     <div className="min-h-screen fancy-bg p-4 sm:p-6">
//       <div className="max-w-7xl mx-auto">
//         <motion.div
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0 }}
//           className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-lg mb-6"
//         >
//           <h1 className="text-3xl font-display mb-6">Professor Dashboard</h1>

//           <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
//             <div className="relative">
//               <Input
//                 placeholder="Search by name or reg. number"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//               <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
//             </div>

//             <Select
//               value={selectedCategory}
//               onValueChange={setSelectedCategory}
//             >
//               <SelectTrigger>
//                 <SelectValue placeholder="Filter by category" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="">All Categories</SelectItem>
//                 {categories
//                   .filter((cat) => cat !== "Overall TOP 10")
//                   .map((category) => (
//                     <SelectItem key={category} value={category}>
//                       {category}
//                     </SelectItem>
//                   ))}
//               </SelectContent>
//             </Select>

//             <Select value={selectedStatus} onValueChange={setSelectedStatus}>
//               <SelectTrigger>
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="">All Statuses</SelectItem>
//                 <SelectItem value="pending">Pending</SelectItem>
//                 <SelectItem value="approved">Approved</SelectItem>
//                 <SelectItem value="rejected">Rejected</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="overflow-x-auto">
//             <motion.div layout className="min-w-full">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead>
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Student Details
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Category
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Submission Date
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white/30 backdrop-blur-sm divide-y divide-gray-200">
//                   <AnimatePresence>
//                     {filteredSubmissions.map((submission) => (
//                       <motion.tr
//                         key={submission.id}
//                         layout
//                         initial={{ opacity: 0 }}
//                         animate={{ opacity: 1 }}
//                         exit={{ opacity: 0 }}
//                         className="hover:bg-black/5 transition-colors"
//                       >
//                         <td className="px-6 py-4">
//                           <div className="text-sm font-medium text-gray-900">
//                             {submission.name}
//                           </div>
//                           <div className="text-sm text-gray-500">
//                             {submission.regNo}
//                           </div>
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-500">
//                           {submission.category}
//                         </td>
//                         <td className="px-6 py-4 text-sm text-gray-500">
//                           {submission.submissionDate}
//                         </td>
//                         <td className="px-6 py-4">
//                           <span
//                             className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
//                             ${
//                               submission.status === "approved"
//                                 ? "bg-green-100 text-green-800"
//                                 : submission.status === "rejected"
//                                 ? "bg-red-100 text-red-800"
//                                 : "bg-yellow-100 text-yellow-800"
//                             }`}
//                           >
//                             {submission.status.charAt(0).toUpperCase() +
//                               submission.status.slice(1)}
//                           </span>
//                         </td>
//                         <td className="px-6 py-4 flex space-x-2">
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             className="hover:bg-green-100 hover:text-green-800"
//                             onClick={() =>
//                               handleStatusChange(submission.id, "approved")
//                             }
//                           >
//                             <Check className="w-4 h-4" />
//                           </Button>
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             className="hover:bg-red-100 hover:text-red-800"
//                             onClick={() =>
//                               handleStatusChange(submission.id, "rejected")
//                             }
//                           >
//                             <X className="w-4 h-4" />
//                           </Button>
//                           <Button
//                             size="sm"
//                             variant="ghost"
//                             className="hover:bg-blue-100 hover:text-blue-800"
//                             onClick={() =>
//                               setRemarksModal({
//                                 isOpen: true,
//                                 submissionId: submission.id as number,
//                               })
//                             }
//                           >
//                             <MessageCircle className="w-4 h-4" />
//                           </Button>
//                         </td>
//                       </motion.tr>
//                     ))}
//                   </AnimatePresence>
//                 </tbody>
//               </table>
//             </motion.div>
//           </div>
//         </motion.div>
//       </div>

//       <RemarksModal
//         isOpen={remarksModal.isOpen}
//         onClose={() => setRemarksModal({ isOpen: false, submissionId: null })}
//         submissionId={remarksModal.submissionId}
//       />
//     </div>
//   );
// }
import DashboardClient from './DashboardClient';

export default function DashboardPage() {
  return <DashboardClient />;
}
