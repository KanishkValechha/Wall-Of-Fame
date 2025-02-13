"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "../data/achievements";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import axios from "axios";

export default function SubmitPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: "Vedic Varma",
    registrationNumber: "229302083",
    mobileNumber: "8766304030",
    achievementCategory: "Innovation & Technology",
    professorName: "Amit Garg",
    professorEmail: "vedic20052005@gmail.com",
    userImage: null as File | null,
    certificateProof: null as File | null,
    submissionDate: new Date().toISOString(),
    approved: null,
    remarks: "sdc project",
  });

  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(
    null
  );
  const handleBack = () => {
    router.push("/?return=true");
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value instanceof File) {
        formDataToSend.append(key, value);
      } else {
        formDataToSend.append(key, String(value));
      }
    });

    try {
      const response = await axios.post("/api/submitAchievement", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.status === 200) {
        setMessage({ text: "Submission successful!", isError: false });
        setFormData({
          fullName: "",
          registrationNumber: "",
          mobileNumber: "",
          achievementCategory: "",
          professorName: "",
          professorEmail: "",
          userImage: null as unknown as File,
          certificateProof: null as unknown as File,
          submissionDate: new Date().toISOString(),
          approved: null,
          remarks: "",
        });
      } else {
        setMessage({ text: "Submission failed. Please try again.", isError: true });
      }
    } catch (error) {
      setMessage({ text: "Error submitting form. Check your connection.", isError: true });
    }
  };

  return (
    <div className="min-h-screen fancy-bg p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Button variant="ghost" className="mb-6" onClick={handleBack}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Wall of Fame
        </Button>

        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h1 className="text-3xl font-display mb-6">Submit Achievement</h1>

        {message && (
          <div className={`p-2 rounded-md text-center ${message.isError ? "bg-red-500 text-white" : "bg-green-500 text-white"}`}>
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              required
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="registrationNumber">Registration Number</Label>
            <Input
              id="registrationNumber"
              required
              value={formData.registrationNumber}
              onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="mobileNumber">Mobile Number</Label>
            <Input
              id="mobileNumber"
              type="tel"
              required
              value={formData.mobileNumber}
              onChange={(e) => setFormData({ ...formData, mobileNumber: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="achievementCategory">Achievement Category</Label>
            <Select
              value={formData.achievementCategory}
              onValueChange={(value) => setFormData({ ...formData, achievementCategory: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                  {categories
                    .filter((cat) => cat !== "Overall TOP 10")
                    .map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="professorName">Professor Name</Label>
            <Input
              id="professorName"
              required
              value={formData.professorName}
              onChange={(e) => setFormData({ ...formData, professorName: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="professorEmail">Professor Email</Label>
            <Input
              id="professorEmail"
              type="email"
              required
              value={formData.professorEmail}
              onChange={(e) => setFormData({ ...formData, professorEmail: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="userImage">User Image</Label>
            <Input
              id="userImage"
              type="file"
              required
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, userImage: e.target.files?.[0] || null as unknown as File })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certificateProof">Certificate/Proof</Label>
            <Input
              id="certificateProof"
              type="file"
              required
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFormData({ ...formData, certificateProof: e.target.files?.[0] || null as unknown as File})}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="remarks">Remarks for professor</Label>
            <Input
              id="remarks"
              required
              value={formData.remarks}
              onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
            />
          </div>

          <Button type="submit" className="w-full">Submit Achievement</Button>
        </form>
      </div>
      </div>
      </div>
  )};
