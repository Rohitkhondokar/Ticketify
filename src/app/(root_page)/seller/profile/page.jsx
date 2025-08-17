import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Save, Camera, Star, MapPin, Calendar, Mail } from "lucide-react";
import {
  getVendorById,
  getVendorStats,
  getVendorWithEvents,
} from "../../../../../action/eventActions";

export default async function SellerProfile() {
  const vendorId = "1"; // Default vendor ID for now

  // Fetch data from backend
  const [vendorResult, statsResult, eventsResult] = await Promise.all([
    getVendorById(vendorId),
    getVendorStats(vendorId),
    getVendorWithEvents(vendorId),
  ]);

  const vendor = vendorResult.success ? vendorResult.data : {};
  const stats = statsResult.success ? statsResult.data : {};
  const events = eventsResult.success ? eventsResult.data : [];
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profile Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your seller profile and account settings
          </p>
        </div>
        <Button className="bg-[#00453e] hover:bg-[#003530]">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Overview */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Profile Overview</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src="/placeholder.svg?height=96&width=96"
                    alt="Profile"
                  />
                  <AvatarFallback>SE</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 rounded-full h-8 w-8 p-0 bg-[#00453e] hover:bg-[#003530]"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-center">
                <h3 className="font-semibold text-lg">
                  {vendor?.company_name || vendor?.name || "Unknown Company"}
                </h3>
                <p className="text-gray-500">
                  {vendor?.business_type || "Event Organizer"}
                </p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">4.8</span>
                  <span className="text-sm text-gray-500">(127 reviews)</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-4 w-4" />
                <span>
                  Member since{" "}
                  {vendor?.created_at
                    ? new Date(vendor.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        year: "numeric",
                      })
                    : "Jan 2023"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-4 w-4" />
                <span>{vendor?.address || "Location not specified"}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Mail className="h-4 w-4" />
                <span>{vendor?.email || "Email not specified"}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {stats?.total_events || 0}
                </div>
                <div className="text-xs text-gray-500">Events</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {stats?.total_tickets_sold || 0}
                </div>
                <div className="text-xs text-gray-500">Tickets</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  ৳{(stats?.total_revenue || 0).toFixed(0)}
                </div>
                <div className="text-xs text-gray-500">Revenue</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Settings */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Update your basic profile information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input
                    id="company-name"
                    defaultValue={vendor?.company_name || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-person">Contact Person</Label>
                  <Input
                    id="contact-person"
                    defaultValue={vendor?.name || ""}
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={vendor?.email || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" defaultValue={vendor?.phone || ""} />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input id="website" defaultValue={vendor?.website || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Company Description</Label>
                <Textarea
                  id="description"
                  rows={4}
                  defaultValue={
                    vendor?.description || "No description available"
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Business Information */}
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
              <CardDescription>
                Business details and verification
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="business-type">Business Type</Label>
                  <Input
                    id="business-type"
                    defaultValue={vendor?.business_type || ""}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="registration-number">
                    Registration Number
                  </Label>
                  <Input
                    id="registration-number"
                    defaultValue={vendor?.registration_number || ""}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Business Address</Label>
                <Textarea
                  id="address"
                  rows={3}
                  defaultValue={vendor?.address || ""}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tax-id">Tax ID</Label>
                  <Input id="tax-id" defaultValue="GB123456789" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="verification-status">
                    Verification Status
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Badge className="bg-green-500">Verified</Badge>
                    <span className="text-sm text-gray-500">
                      Verified on Jan 15, 2023
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Information</CardTitle>
              <CardDescription>Bank details for payouts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input id="bank-name" defaultValue="Barclays Bank" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-holder">Account Holder Name</Label>
                  <Input id="account-holder" defaultValue="Sports Events Ltd" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input id="account-number" defaultValue="****1234" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sort-code">Sort Code</Label>
                  <Input id="sort-code" defaultValue="12-34-56" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>
                Manage your notification preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-gray-500">
                      Receive email updates about your events
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enabled
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">SMS Notifications</p>
                    <p className="text-sm text-gray-500">
                      Receive SMS alerts for important updates
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Disabled
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Communications</p>
                    <p className="text-sm text-gray-500">
                      Receive promotional emails and updates
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Enabled
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
