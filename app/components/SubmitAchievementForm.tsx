"use client"

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import axios from "axios";

interface SubmitAchievementFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitAchievementForm({ isOpen, onClose }: SubmitAchievementFormProps) {
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

  const [message, setMessage] = useState<{ text: string; isError: boolean } | null>(null);

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
      const response = await axios.post("https://your-backend-url.com/submit", formDataToSend, {
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
          userImage: null,
          certificateProof: null,
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
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Submit Achievement</DialogTitle>
        </DialogHeader>
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
                <SelectItem value="Innovation & Technology">Innovation & Technology</SelectItem>
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
              onChange={(e) => setFormData({ ...formData, userImage: e.target.files?.[0] || null })}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="certificateProof">Certificate/Proof</Label>
            <Input
              id="certificateProof"
              type="file"
              required
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFormData({ ...formData, certificateProof: e.target.files?.[0] || null })}
            />
          </div>

          <Button type="submit" className="w-full">Submit Achievement</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
