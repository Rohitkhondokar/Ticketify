"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Save, Bell, CreditCard, Shield, Settings } from "lucide-react";

export default function SellerSettings() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Account Settings</h1>
          <p className="text-gray-600 mt-1">
            Manage your seller account preferences
          </p>
        </div>
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="bg-[#00453e] hover:bg-[#003530]"
        >
          <Save className="h-4 w-4 mr-2" />
          {isLoading ? "Saving..." : "Save Changes"}
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Account Settings
            </CardTitle>
            <CardDescription>Basic account configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue="Sports Events Ltd" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Contact Email</Label>
              <Input
                id="contact-email"
                type="email"
                defaultValue="contact@sportsevents.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input id="phone" defaultValue="+1 234 567 8900" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="timezone">Timezone</Label>
              <Input id="timezone" defaultValue="UTC+6 (Dhaka)" />
            </div>
          </CardContent>
        </Card>

        {/* Notification Preferences */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Preferences
            </CardTitle>
            <CardDescription>
              Choose how you want to be notified
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>New Ticket Sales</Label>
                <p className="text-sm text-gray-500">
                  Get notified when tickets are sold
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Event Reminders</Label>
                <p className="text-sm text-gray-500">
                  Reminders about upcoming events
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Payment Notifications</Label>
                <p className="text-sm text-gray-500">
                  Payout and payment updates
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Marketing Updates</Label>
                <p className="text-sm text-gray-500">
                  Platform news and promotions
                </p>
              </div>
              <Switch />
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              Payment Settings
            </CardTitle>
            <CardDescription>Manage your payment preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="payout-method">Preferred Payout Method</Label>
              <Input id="payout-method" defaultValue="Bank Transfer" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="min-payout">Minimum Payout Amount</Label>
              <Input id="min-payout" type="number" defaultValue="5000" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Payout</Label>
                <p className="text-sm text-gray-500">
                  Automatic weekly payouts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-rate">Tax Rate (%)</Label>
              <Input id="tax-rate" type="number" defaultValue="15" />
            </div>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Security Settings
            </CardTitle>
            <CardDescription>Account security preferences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">
                  Add extra security to your account
                </p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Login Notifications</Label>
                <p className="text-sm text-gray-500">
                  Get notified of new logins
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Enter current password"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Enter new password"
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Event Settings</CardTitle>
          <CardDescription>Default settings for your events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="default-category">Default Event Category</Label>
                <Input id="default-category" defaultValue="Sports" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="default-duration">
                  Default Event Duration (hours)
                </Label>
                <Input id="default-duration" type="number" defaultValue="3" />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Auto-publish Events</Label>
                  <p className="text-sm text-gray-500">
                    Automatically publish new events
                  </p>
                </div>
                <Switch />
              </div>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="refund-policy">Default Refund Policy</Label>
                <Textarea
                  id="refund-policy"
                  rows={3}
                  defaultValue="Full refund available up to 24 hours before event start time."
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label>Allow Ticket Transfers</Label>
                  <p className="text-sm text-gray-500">
                    Let customers transfer tickets
                  </p>
                </div>
                <Switch defaultChecked />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
