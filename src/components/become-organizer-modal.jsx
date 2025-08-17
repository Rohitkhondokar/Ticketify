"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { User, Mail, Phone, Building, MapPin, FileText } from "lucide-react";
import { createVendor } from "../../action/vendorActions";
export function BecomeOrganizerModal({
  children,
  className,
  isOpen,
  setIsOpen,
}) {
  const [formData, setFormData] = useState({
    organizerName: "",
    email: "",
    phone: "",
    companyName: "",
    companyAddress: "",
    eventTypes: [],
    experience: "",
    description: "",
    agreeTerms: false,
  });

  // const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const vendorPayload = {
      name: formData.organizerName,
      email: formData.email,
      phone: formData.phone,
      address: formData.companyAddress,
      company_name: formData.companyName,
      business_type: "sports", // প্রয়োজনে dynamic করো
      event_types: formData.eventTypes, // JSON array
      experience: formData.experience,
      description: formData.description,
    };

    const res = await createVendor(vendorPayload);
    console.log(res);

    if (res.success) {
      console.log("Vendor created:", res);
      setIsOpen(false);
      setFormData({
        organizerName: "",
        email: "",
        phone: "",
        companyName: "",
        companyAddress: "",
        eventTypes: [],
        experience: "",
        description: "",
        agreeTerms: false,
      });
    } else {
      console.error("Error creating vendor:", res.message);
    }
  };

  const handleEventTypeChange = (eventType, checked) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        eventTypes: [...prev.eventTypes, eventType],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        eventTypes: prev.eventTypes.filter((type) => type !== eventType),
      }));
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild className={className}>
        {children}
      </DialogTrigger>
      <DialogContent className="w-[99vw] md:w-[678px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-[#00453e]">
            Become an Event Organizer
          </DialogTitle>
          <DialogDescription>
            Join our platform and start organizing amazing sports events. Fill
            out the form below to get started.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Personal Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="organizerName"
                  className="flex items-center gap-2"
                >
                  <User className="h-4 w-4" />
                  Organizer Name *
                </Label>
                <Input
                  id="organizerName"
                  value={formData.organizerName}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      organizerName: e.target.value,
                    }))
                  }
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address *
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, email: e.target.value }))
                  }
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                Phone Number *
              </Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                placeholder="Enter your phone number"
                required
              />
            </div>
          </div>

          {/* Company Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Company Information
            </h3>

            <div className="space-y-2">
              <Label htmlFor="companyName" className="flex items-center gap-2">
                <Building className="h-4 w-4" />
                Company/Organization Name
              </Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    companyName: e.target.value,
                  }))
                }
                placeholder="Enter company name (optional)"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="companyAddress"
                className="flex items-center gap-2"
              >
                <MapPin className="h-4 w-4" />
                Business Address
              </Label>
              <Textarea
                id="companyAddress"
                value={formData.companyAddress}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    companyAddress: e.target.value,
                  }))
                }
                placeholder="Enter your business address"
                rows={3}
              />
            </div>
          </div>

          {/* Event Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">
              Event Information
            </h3>

            <div className="space-y-2">
              <Label>Types of Events You Plan to Organize *</Label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  "Football",
                  "Cricket",
                  "Tennis",
                  "Basketball",
                  "Baseball",
                  "Other Sports",
                ].map((eventType) => (
                  <div key={eventType} className="flex items-center space-x-2">
                    <Checkbox
                      id={eventType}
                      checked={formData.eventTypes.includes(eventType)}
                      onCheckedChange={(checked) =>
                        handleEventTypeChange(eventType, checked)
                      }
                    />
                    <Label htmlFor={eventType} className="text-sm">
                      {eventType}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="experience">Experience Level</Label>
              <Select
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, experience: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select your experience level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                  <SelectItem value="intermediate">
                    Intermediate (2-5 years)
                  </SelectItem>
                  <SelectItem value="experienced">
                    Experienced (5+ years)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Tell us about yourself and your event organizing goals
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    description: e.target.value,
                  }))
                }
                placeholder="Describe your experience, goals, and what types of events you'd like to organize..."
                rows={4}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="agreeTerms"
              checked={formData.agreeTerms}
              onCheckedChange={(checked) =>
                setFormData((prev) => ({ ...prev, agreeTerms: checked }))
              }
              required
            />
            <Label htmlFor="agreeTerms" className="text-sm">
              I agree to the{" "}
              <span className="text-[#00453e] underline cursor-pointer">
                Terms and Conditions
              </span>{" "}
              and{" "}
              <span className="text-[#00453e] underline cursor-pointer">
                Privacy Policy
              </span>{" "}
              *
            </Label>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-[#00453e] hover:bg-[#003530]"
              disabled={
                !formData.agreeTerms ||
                !formData.organizerName ||
                !formData.email ||
                !formData.phone ||
                formData.eventTypes.length === 0
              }
            >
              Submit Application
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
