"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Achievement } from "@/app/types/achievements";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { categories } from "../types/categories";
import Image from "next/image";
import { format } from "date-fns";

interface EditAchievementModalProps {
  achievement: Achievement;
  isOpen: boolean;
  onClose: () => void;
  onSave: (achievement: Achievement) => void;
}

export default function EditAchievementModal({
  achievement,
  isOpen,
  onClose,
  onSave,
}: EditAchievementModalProps) {
  const [editedAchievement, setEditedAchievement] = useState<Achievement>({
    ...achievement,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditedAchievement((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCategoryChange = (value: string) => {
    setEditedAchievement((prev) => ({
      ...prev,
      achievementCategory: value,
    }));
  };

  const handleCheckboxChange = (field: string, checked: boolean) => {
    setEditedAchievement((prev) => ({
      ...prev,
      [field]: checked,
    }));
  };

  const handleSave = () => {
    // Create an object with only the _id and modified fields
    const changedFields: Partial<Record<keyof Achievement, Achievement[keyof Achievement]>> = { _id: achievement._id };
    
    // Compare original and edited achievement to find changed fields
    Object.keys(editedAchievement).forEach((key) => {
      const typedKey = key as keyof Achievement;
      if (achievement[typedKey] !== editedAchievement[typedKey]) {
        changedFields[typedKey] = editedAchievement[typedKey];
      }
    });
    
    // Send only the changed fields to the parent component
    onSave(changedFields as Achievement);
    // Don't call onClose() here as it will be handled by the parent
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose(); // Only handle the closing event
    }}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Achievement</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Student Image and Basic Info */}
          <div className="flex items-start gap-4">
            <div className="relative h-24 w-24 rounded-md overflow-hidden">
              <div className="absolute inset-0 border border-black/10 z-10 rounded-md" />
              {editedAchievement.imageUrl && (
                <Image
                  src={editedAchievement.imageUrl}
                  alt={editedAchievement.fullName}
                  fill
                  sizes="96px"
                  className="object-cover"
                />
              )}
            </div>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <Label htmlFor="fullName">Student Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={editedAchievement.fullName}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="registrationNumber">Registration No.</Label>
                  <Input
                    id="registrationNumber"
                    name="registrationNumber"
                    value={editedAchievement.registrationNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <Label htmlFor="mobileNumber">Mobile Number</Label>
                  <Input
                    id="mobileNumber"
                    name="mobileNumber"
                    value={editedAchievement.mobileNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="grid grid-cols-1">
            <Label htmlFor="studentMail">Email</Label>
            <Input
              id="studentMail"
              name="studentMail"
              value={editedAchievement.studentMail || ""}
              onChange={handleInputChange}
            />
          </div>

          {/* Achievement Details */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <Label htmlFor="title">Achievement Title</Label>
              <Input
                id="title"
                name="title"
                value={editedAchievement.title}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="description">Achievement Description</Label>
              <Textarea
                id="description"
                name="description"
                value={editedAchievement.description}
                onChange={handleInputChange}
                className="min-h-[100px]"
              />
            </div>
            <div>
              <Label htmlFor="category">Category</Label>
              <Select
                value={editedAchievement.achievementCategory}
                onValueChange={handleCategoryChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Professor Information */}
          <div className="grid grid-cols-2 gap-4 pt-2 border-t">
            <div className="col-span-2">
              <Label className="font-medium text-sm text-gray-500">
                Professor Information
              </Label>
            </div>
            <div>
              <Label htmlFor="professorName">Professor Name</Label>
              <Input
                id="professorName"
                name="professorName"
                value={editedAchievement.professorName}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="professorEmail">Professor Email</Label>
              <Input
                id="professorEmail"
                name="professorEmail"
                value={editedAchievement.professorEmail}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <Label htmlFor="remarks">Remarks</Label>
              <Textarea
                id="remarks"
                name="remarks"
                value={editedAchievement.remarks}
                onChange={handleInputChange}
                className="min-h-[60px]"
              />
            </div>
          </div>

          {/* Status Information */}
          <div className="grid grid-cols-1 gap-4 pt-2 border-t">
            <div className="flex flex-col gap-2">
              <Label className="font-medium text-sm text-gray-500">
                Status Information
              </Label>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="overAllTop10"
                  checked={editedAchievement.overAllTop10}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("overAllTop10", checked as boolean)
                  }
                />
                <Label htmlFor="overAllTop10" className="cursor-pointer">
                  Include in Top 10
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="archived"
                  checked={editedAchievement.archived}
                  onCheckedChange={(checked) =>
                    handleCheckboxChange("archived", checked as boolean)
                  }
                />
                <Label htmlFor="archived" className="cursor-pointer">
                  Archive Achievement
                </Label>
              </div>
            </div>

            <div className="flex flex-col gap-1 text-sm text-gray-500">
              <p>
                Submitted:{" "}
                {format(
                  new Date(editedAchievement.submissionDate),
                  "MMM dd, yyyy"
                )}
              </p>
              <p>
                Status:{" "}
                {editedAchievement.approved ? (
                  <>
                    Approved on{" "}
                    {format(
                      new Date(editedAchievement.approved),
                      "MMM dd, yyyy"
                    )}
                  </>
                ) : (
                  <>Pending Approval</>
                )}
              </p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={(e) => {
            e.preventDefault(); // Prevent any default dialog behavior
            handleSave();
          }}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
