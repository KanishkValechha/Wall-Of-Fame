"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "../data/achievements";
import { useState } from "react";

interface SubmitAchievementFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SubmitAchievementForm({ isOpen, onClose }: SubmitAchievementFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    regNo: "",
    mobile: "",
    category: "",
    professorName: "",
    proof: null as File | null
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-display">Submit Achievement</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="regNo">Registration Number</Label>
            <Input
              id="regNo"
              required
              value={formData.regNo}
              onChange={(e) => setFormData({ ...formData, regNo: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="mobile">Mobile Number</Label>
            <Input
              id="mobile"
              type="tel"
              required
              value={formData.mobile}
              onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Achievement Category</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.filter(cat => cat !== "Overall TOP 10").map((category) => (
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
            <Label htmlFor="proof">Certificate/Proof of Work</Label>
            <Input
              id="proof"
              type="file"
              required
              accept=".pdf,.jpg,.jpeg,.png"
              onChange={(e) => setFormData({ ...formData, proof: e.target.files?.[0] || null })}
            />
          </div>
          
          <Button type="submit" className="w-full">Submit Achievement</Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
