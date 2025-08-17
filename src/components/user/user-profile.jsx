"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit,
  Save,
  X,
  Calendar,
  ShoppingBag,
  Ticket,
} from "lucide-react";
import {
  getUserProfile,
  updateUserProfile,
  getUserDashboardStats,
} from "../../../action/adminActions";

export default function UserProfilePage({ user }) {
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [stats, setStats] = useState({
    total_tickets: 0,
    total_orders: 0,
    total_spent: 0,
  });
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      // For demo purposes, using user ID 1
      const userId = user.id;

      // Load user profile
      const profileResult = await getUserProfile(userId);
      if (profileResult.success) {
        setProfile(profileResult.data);
        setEditData(profileResult.data);
      }

      // Load user stats
      const statsResult = await getUserDashboardStats(userId);
      if (statsResult.success) {
        setStats(statsResult.data);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setEditing(true);
    setEditData({ ...profile });
  };

  const handleCancel = () => {
    setEditing(false);
    setEditData({ ...profile });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const userId = 1;
      const result = await updateUserProfile(userId, editData);

      if (result.success) {
        setProfile(editData);
        setEditing(false);
        alert("Profile updated successfully!");
      } else {
        alert("Failed to update profile: " + result.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  const handleInputChange = (field, value) => {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="h-64 bg-gray-200 rounded"></div>
            <div className="md:col-span-2 space-y-4">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Profile</h2>
          <p className="text-gray-600">Manage your account information</p>
        </div>
        {!editing ? (
          <Button
            onClick={handleEdit}
            className="bg-[#00453e] hover:bg-[#003530]"
          >
            <Edit className="h-4 w-4 mr-2" />
            Edit Profile
          </Button>
        ) : (
          <div className="flex gap-2">
            <Button onClick={handleCancel} variant="outline">
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button
              onClick={handleSave}
              disabled={saving}
              className="bg-[#00453e] hover:bg-[#003530]"
            >
              <Save className="h-4 w-4 mr-2" />
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              {editing ? (
                <Input
                  id="name"
                  value={editData.name || ""}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="Enter your full name"
                />
              ) : (
                <p className="text-gray-900 font-medium">{profile.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              {editing ? (
                <Input
                  id="email"
                  type="email"
                  value={editData.email || ""}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  placeholder="Enter your email"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">{profile.email}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              {editing ? (
                <Input
                  id="phone"
                  type="tel"
                  value={editData.phone || ""}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  placeholder="Enter your phone number"
                />
              ) : (
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-gray-400" />
                  <p className="text-gray-900">{profile.phone}</p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              {editing ? (
                <Input
                  id="address"
                  value={editData.address || ""}
                  onChange={(e) => handleInputChange("address", e.target.value)}
                  placeholder="Enter your address"
                />
              ) : (
                <div className="flex items-start gap-2">
                  <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                  <p className="text-gray-900">
                    {profile.address || "No address provided"}
                  </p>
                </div>
              )}
            </div>

            {!editing && (
              <div className="space-y-2">
                <Label>Account Status</Label>
                <Badge className="bg-green-500">Active</Badge>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Account Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <Ticket className="h-5 w-5 text-[#00453e]" />
                <span className="text-sm font-medium">Total Tickets</span>
              </div>
              <span className="text-lg font-bold text-[#00453e]">
                {stats.total_tickets || 0}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-[#00453e]" />
                <span className="text-sm font-medium">Total Orders</span>
              </div>
              <span className="text-lg font-bold text-[#00453e]">
                {stats.total_orders || 0}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-[#00453e]" />
                <span className="text-sm font-medium">Total Spent</span>
              </div>
              <span className="text-lg font-bold text-[#00453e]">
                ৳{(stats.total_spent || 0).toLocaleString()}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-[#00453e]" />
                <span className="text-sm font-medium">Member Since</span>
              </div>
              <span className="text-sm text-gray-600">
                {profile.created_at
                  ? new Date(profile.created_at).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              <Ticket className="h-4 w-4 mr-2" />
              View My Tickets
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <ShoppingBag className="h-4 w-4 mr-2" />
              Order History
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Mail className="h-4 w-4 mr-2" />
              Contact Support
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-red-600 hover:text-red-700"
            >
              <X className="h-4 w-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
