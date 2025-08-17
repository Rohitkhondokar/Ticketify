"use client";

import { useState, useEffect } from "react";
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
import { Save, Shield, Bell, Globe, Database, RefreshCw } from "lucide-react";
import {
  getSystemSettings,
  updateSystemSettings,
  getSystemStatistics,
} from "../../../../../action/adminActions";

export default function AdminSettings() {
  const [isLoading, setIsLoading] = useState(false);
  const [settings, setSettings] = useState({
    platform_name: "E-Ticketing Platform",
    platform_description: "Multi-vendor e-ticketing platform for sports events",
    support_email: "support@etickets.com",
    default_currency: "BDT",
    commission_rate: 5.0,
    max_tickets_per_order: 10,
    auto_approve_events: false,
    require_vendor_verification: true,
    maintenance_mode: false,
  });
  const [statistics, setStatistics] = useState({
    system_status: "Online",
    uptime: "99.9%",
    active_users: 0,
    response_time: "45ms",
  });

  useEffect(() => {
    loadSettings();
    loadStatistics();
  }, []);

  const loadSettings = async () => {
    try {
      const result = await getSystemSettings();
      if (result.success) {
        setSettings(result.data);
      }
    } catch (error) {
      console.error("Error loading settings:", error);
    }
  };

  const loadStatistics = async () => {
    try {
      const result = await getSystemStatistics();
      if (result.success) {
        setStatistics(result.data);
      }
    } catch (error) {
      console.error("Error loading statistics:", error);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const result = await updateSystemSettings(settings);
      if (result.success) {
        alert("Settings saved successfully!");
      } else {
        alert("Failed to save settings: " + result.message);
      }
    } catch (error) {
      alert("Error saving settings: " + error.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">System Settings</h1>
          <p className="text-gray-600 mt-1">
            Configure platform settings and preferences
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
        {/* General Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="h-5 w-5" />
              General Settings
            </CardTitle>
            <CardDescription>Basic platform configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="platform-name">Platform Name</Label>
              <Input
                id="platform-name"
                value={settings.platform_name}
                onChange={(e) =>
                  setSettings({ ...settings, platform_name: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="platform-description">Platform Description</Label>
              <Textarea
                id="platform-description"
                rows={3}
                value={settings.platform_description}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    platform_description: e.target.value,
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="support-email">Support Email</Label>
              <Input
                id="support-email"
                type="email"
                value={settings.support_email}
                onChange={(e) =>
                  setSettings({ ...settings, support_email: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currency">Default Currency</Label>
              <Input
                id="currency"
                value={settings.default_currency}
                onChange={(e) =>
                  setSettings({ ...settings, default_currency: e.target.value })
                }
              />
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
            <CardDescription>Platform security configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Two-Factor Authentication</Label>
                <p className="text-sm text-gray-500">
                  Require 2FA for admin accounts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Session Timeout</Label>
                <p className="text-sm text-gray-500">
                  Auto logout after inactivity
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="session-duration">
                Session Duration (minutes)
              </Label>
              <Input id="session-duration" type="number" defaultValue="30" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Login Attempt Limit</Label>
                <p className="text-sm text-gray-500">
                  Block after failed attempts
                </p>
              </div>
              <Switch defaultChecked />
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5" />
              Notification Settings
            </CardTitle>
            <CardDescription>Configure system notifications</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email Notifications</Label>
                <p className="text-sm text-gray-500">Send email alerts</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS Notifications</Label>
                <p className="text-sm text-gray-500">Send SMS alerts</p>
              </div>
              <Switch />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Push Notifications</Label>
                <p className="text-sm text-gray-500">
                  Browser push notifications
                </p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="space-y-2">
              <Label htmlFor="notification-email">
                Admin Notification Email
              </Label>
              <Input
                id="notification-email"
                type="email"
                defaultValue="admin@etickets.com"
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Database className="h-5 w-5" />
              Payment Settings
            </CardTitle>
            <CardDescription>Payment gateway configuration</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="commission-rate">Platform Commission (%)</Label>
              <Input
                id="commission-rate"
                type="number"
                value={settings.commission_rate}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    commission_rate: parseFloat(e.target.value),
                  })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="max-tickets">Maximum Tickets per Order</Label>
              <Input
                id="max-tickets"
                type="number"
                value={settings.max_tickets_per_order}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    max_tickets_per_order: parseInt(e.target.value),
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Auto Approve Events</Label>
                <p className="text-sm text-gray-500">
                  Automatically approve new events
                </p>
              </div>
              <Switch
                checked={settings.auto_approve_events}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, auto_approve_events: checked })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Require Vendor Verification</Label>
                <p className="text-sm text-gray-500">
                  Require verification for new vendors
                </p>
              </div>
              <Switch
                checked={settings.require_vendor_verification}
                onCheckedChange={(checked) =>
                  setSettings({
                    ...settings,
                    require_vendor_verification: checked,
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label>Maintenance Mode</Label>
                <p className="text-sm text-gray-500">
                  Put system in maintenance mode
                </p>
              </div>
              <Switch
                checked={settings.maintenance_mode}
                onCheckedChange={(checked) =>
                  setSettings({ ...settings, maintenance_mode: checked })
                }
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Status */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>System Status</CardTitle>
              <CardDescription>
                Current system health and statistics
              </CardDescription>
            </div>
            <Button
              onClick={loadStatistics}
              variant="outline"
              size="sm"
              className="flex items-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Refresh
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg bg-green-50">
              <div className="text-2xl font-bold text-green-600">
                {statistics.system_status}
              </div>
              <div className="text-sm text-gray-500">System Status</div>
            </div>
            <div className="text-center p-4 border rounded-lg bg-blue-50">
              <div className="text-2xl font-bold text-blue-600">
                {statistics.uptime}
              </div>
              <div className="text-sm text-gray-500">Uptime</div>
            </div>
            <div className="text-center p-4 border rounded-lg bg-purple-50">
              <div className="text-2xl font-bold text-purple-600">
                {statistics.active_users?.toLocaleString() || 0}
              </div>
              <div className="text-sm text-gray-500">Active Users</div>
            </div>
            <div className="text-center p-4 border rounded-lg bg-orange-50">
              <div className="text-2xl font-bold text-orange-600">
                {statistics.response_time}
              </div>
              <div className="text-sm text-gray-500">Response Time</div>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Platform Statistics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="text-center p-4 border rounded-lg">
                <div className="text-xl font-bold text-gray-900">
                  {statistics.total_users?.toLocaleString() || 0}
                </div>
                <div className="text-sm text-gray-500">Total Users</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-xl font-bold text-gray-900">
                  {statistics.total_events?.toLocaleString() || 0}
                </div>
                <div className="text-sm text-gray-500">Total Events</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-xl font-bold text-gray-900">
                  {statistics.active_events?.toLocaleString() || 0}
                </div>
                <div className="text-sm text-gray-500">Active Events</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-xl font-bold text-gray-900">
                  {statistics.total_vendors?.toLocaleString() || 0}
                </div>
                <div className="text-sm text-gray-500">Total Vendors</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-xl font-bold text-gray-900">
                  {statistics.active_vendors?.toLocaleString() || 0}
                </div>
                <div className="text-sm text-gray-500">Active Vendors</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-xl font-bold text-gray-900">
                  {statistics.total_orders?.toLocaleString() || 0}
                </div>
                <div className="text-sm text-gray-500">Total Orders</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-xl font-bold text-gray-900">
                  {statistics.total_tickets_sold?.toLocaleString() || 0}
                </div>
                <div className="text-sm text-gray-500">Tickets Sold</div>
              </div>
              <div className="text-center p-4 border rounded-lg">
                <div className="text-xl font-bold text-green-600">
                  ৳{statistics.total_revenue?.toLocaleString() || 0}
                </div>
                <div className="text-sm text-gray-500">Total Revenue</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
