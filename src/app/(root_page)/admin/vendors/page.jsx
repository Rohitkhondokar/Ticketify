"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Ban,
  CheckCircle,
  Mail,
  Phone,
  Calendar,
  Settings,
  Loader2,
  AlertCircle,
  Delete,
} from "lucide-react";
import VendorStatusModal from "@/components/VendorStatusModal";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function AdminVendors() {
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [vendors, setVendors] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Fetch vendors and stats from backend
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch vendors
      const vendorsResponse = await fetch(`${API_BASE_URL}/api/admin/vendors`);
      const vendorsResult = await vendorsResponse.json();
      console.log(vendorsResult, "vendorsResult");

      // Fetch dashboard stats
      const statsResponse = await fetch(
        `${API_BASE_URL}/api/admin/dashboard/stats`
      );
      const statsResult = await statsResponse.json();

      console.log(statsResult, "statsResult");
      if (vendorsResult.success) {
        setVendors(vendorsResult.data.vendors || []);
      } else {
        setError("Failed to fetch vendors");
      }

      if (statsResult.success) {
        setStats(statsResult.data || {});
      } else {
        setError("Failed to fetch dashboard stats");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Network error. Please check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function handleDelete(vendorId) {
    console.log(vendorId);

    // API call দিয়ে vendor delete করবেন
    fetch("http://localhost/hasan/delete_vendor.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ vendorId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Vendor deleted successfully");
          // এখানে vendors লিস্ট আপডেট করতে পারেন UI থেকে vendor বাদ দিয়ে
        } else {
          alert("Delete failed: " + data.message);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Something went wrong");
      });
  }

  // Filter vendors based on search and status
  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.phone?.includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || vendor.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate vendor statistics
  const vendorStats = {
    totalVendors: stats.total_vendors || 0,
    activeVendors: stats.active_vendors || 0,
    pendingVendors: stats.pending_vendors || 0,
    suspendedVendors: stats.suspended_vendors || 0,
  };

  // Format vendors from database
  const formattedVendors = filteredVendors.map((vendor) => ({
    id: vendor.id,
    name: vendor.name || "Unknown Vendor",
    email: vendor.email || "No email",
    phone: vendor.phone || "No phone",
    joinDate: vendor.created_at
      ? new Date(vendor.created_at).toLocaleDateString()
      : "Unknown Date",
    totalEvents: vendor.total_events || 0,
    activeEvents: vendor.total_events || 0, // Using total_events as active for now
    totalRevenue: `৳${(parseFloat(vendor.total_tickets_sold * 50) || 0).toFixed(
      2
    )}`, // Estimated revenue
    status: vendor.status || "pending",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 4.5, // Default rating
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading vendors...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Error Loading Data
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <Button onClick={fetchData} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Vendors Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all vendors and their permissions
          </p>
        </div>
        <Button className="bg-[#00453e] hover:bg-[#003530]">
          <Plus className="h-4 w-4 mr-2" />
          Add Vendor
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search vendors..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#00453e]"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="suspended">Suspended</option>
            </select>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Vendors List */}
      <div className="space-y-4">
        {formattedVendors.length === 0 ? (
          <Card>
            <CardContent className="pt-6">
              <div className="text-center py-8">
                <p className="text-gray-500">
                  No vendors found matching your criteria.
                </p>
              </div>
            </CardContent>
          </Card>
        ) : (
          formattedVendors.map((vendor) => (
            <Card key={vendor.id}>
              <CardContent className="pt-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={vendor.avatar || "/placeholder.svg"}
                        alt={vendor.name}
                      />
                      <AvatarFallback>
                        {vendor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg text-gray-900">
                        {vendor.name}
                      </h3>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          <span>{vendor.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          <span>{vendor.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          <span>Joined {vendor.joinDate}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Badge
                      variant={
                        vendor.status === "approved"
                          ? "default"
                          : vendor.status === "pending"
                          ? "secondary"
                          : "destructive"
                      }
                      className={
                        vendor.status === "approved" ? "bg-[#00453e]" : ""
                      }
                    >
                      {vendor.status}
                    </Badge>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(vendor.id)}
                      >
                        <Delete className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedVendor(vendor);
                          setIsStatusModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-700 bg-transparent"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 pt-4 border-t">
                  <div>
                    <div className="text-lg font-semibold text-gray-900">
                      {vendor.totalEvents}
                    </div>
                    <div className="text-sm text-gray-600">Total Events</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-green-600">
                      {vendor.activeEvents}
                    </div>
                    <div className="text-sm text-gray-600">Active Events</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-[#00453e]">
                      {vendor.totalRevenue}
                    </div>
                    <div className="text-sm text-gray-600">Total Revenue</div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-yellow-600">
                      {vendor.rating}/5
                    </div>
                    <div className="text-sm text-gray-600">Rating</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900">
              {vendorStats.totalVendors}
            </div>
            <p className="text-sm text-gray-600">Total Vendors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {vendorStats.activeVendors}
            </div>
            <p className="text-sm text-gray-600">Active Vendors</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {vendorStats.pendingVendors}
            </div>
            <p className="text-sm text-gray-600">Pending Approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-red-600">
              {vendorStats.suspendedVendors}
            </div>
            <p className="text-sm text-gray-600">Suspended</p>
          </CardContent>
        </Card>
      </div>

      {/* Vendor Status Update Modal */}
      <VendorStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => {
          setIsStatusModalOpen(false);
          setSelectedVendor(null);
        }}
        vendor={selectedVendor}
        onSuccess={() => {
          fetchData(); // Refresh data after status update
        }}
      />
    </div>
  );
}
