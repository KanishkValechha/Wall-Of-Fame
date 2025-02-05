"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { categories } from "../data/achievements";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function SubmitPage() {
  const router = useRouter();
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
    router.push('/');
  };

  return (
    <div className="min-h-screen fancy-bg p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => router.push('/')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Wall of Fame
        </Button>

        <div className="bg-white/50 backdrop-blur-sm rounded-lg p-6 shadow-lg">
          <h1 className="text-3xl font-display mb-6">Submit Achievement</h1>
          
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
        </div>
      </div>
    </div>
  );
}
