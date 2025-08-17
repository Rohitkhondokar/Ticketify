"use client";

import { useState, useEffect } from "react";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  DollarSign,
  CreditCard,
  TrendingUp,
  AlertCircle,
  Loader2,
  Settings,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";
import WithdrawalStatusModal from "@/components/WithdrawalStatusModal";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AdminPayments() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedWithdrawal, setSelectedWithdrawal] = useState(null);

  // Fetch withdrawals and stats from backend
  const fetchData = async () => {
    try {
      setLoading(true);
      setError("");

      // Fetch withdrawals
      const withdrawalsResponse = await fetch(
        `${API_BASE_URL}/api/admin/withdrawals`
      );
      const withdrawalsResult = await withdrawalsResponse.json();

      // Fetch dashboard stats
      const statsResponse = await fetch(
        `${API_BASE_URL}/api/admin/dashboard/stats`
      );
      const statsResult = await statsResponse.json();

      if (withdrawalsResult.success) {
        setWithdrawals(withdrawalsResult.data.withdrawals || []);
      } else {
        setError("Failed to fetch withdrawals");
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

  // Filter withdrawals based on search and status
  const filteredWithdrawals = withdrawals.filter((withdrawal) => {
    const matchesSearch =
      withdrawal.vendor_name
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      withdrawal.vendor_email
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      withdrawal.id?.toString().includes(searchTerm);

    const matchesStatus =
      statusFilter === "all" || withdrawal.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  // Calculate withdrawal statistics
  const withdrawalStats = [
    {
      title: "Total Withdrawals",
      value: withdrawals.length.toString(),
      change: "+5.2%",
      icon: DollarSign,
      color: "text-blue-600",
    },
    {
      title: "Pending Requests",
      value: withdrawals
        .filter((w) => w.status === "pending")
        .length.toString(),
      change: "+12.5%",
      icon: Clock,
      color: "text-yellow-600",
    },
    {
      title: "Approved",
      value: withdrawals
        .filter((w) => w.status === "approved")
        .length.toString(),
      change: "+8.1%",
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      title: "Total Amount",
      value: `৳${withdrawals
        .reduce((sum, w) => sum + (parseFloat(w.amount) || 0), 0)
        .toLocaleString()}`,
      change: "+15.3%",
      icon: TrendingUp,
      color: "text-[#00453e]",
    },
  ];

  // Format withdrawals from database
  const formattedWithdrawals = filteredWithdrawals.map((withdrawal) => ({
    id: withdrawal.id,
    vendorName: withdrawal.vendor_name || "Unknown Vendor",
    vendorEmail: withdrawal.vendor_email || "No email",
    amount: `৳${(parseFloat(withdrawal.amount) || 0).toFixed(2)}`,
    status: withdrawal.status || "pending",
    date: withdrawal.created_at
      ? new Date(withdrawal.created_at).toLocaleDateString()
      : "Unknown Date",
    processedDate: withdrawal.processed_at
      ? new Date(withdrawal.processed_at).toLocaleDateString()
      : null,
    bankDetails: withdrawal.bank_details
      ? JSON.parse(withdrawal.bank_details)
      : {},
    withdrawal: withdrawal,
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      case "completed":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "pending":
        return <Clock className="h-4 w-4 text-yellow-600" />;
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />;
      case "completed":
        return <CheckCircle className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span>Loading withdrawals...</span>
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
            Withdrawal Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage vendor withdrawal requests and payments
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="bg-transparent"
            onClick={fetchData}
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button className="bg-[#00453e] hover:bg-[#003530]">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Withdrawal Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {withdrawalStats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="flex items-center space-x-1 text-xs">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span className="text-green-500">{stat.change}</span>
                <span className="text-gray-500">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search withdrawals..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Withdrawal Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Requests</CardTitle>
          <CardDescription>
            Manage vendor withdrawal requests and update their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="space-y-4 min-w-[800px]">
              {formattedWithdrawals.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No withdrawals found matching your criteria.
                  </p>
                </div>
              ) : (
                formattedWithdrawals.map((withdrawal) => (
                  <div
                    key={withdrawal.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-2">
                        <div className="min-w-0 flex-1">
                          <h3 className="font-medium text-gray-900 truncate">
                            WTH-{withdrawal.id}
                          </h3>
                          <p className="text-sm text-gray-500 truncate">
                            {withdrawal.vendorName} ({withdrawal.vendorEmail})
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusIcon(withdrawal.status)}
                          <Badge className={getStatusColor(withdrawal.status)}>
                            {withdrawal.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div className="min-w-0">
                          <span className="text-gray-500">Amount:</span>
                          <span className="ml-1 font-medium text-[#00453e]">
                            {withdrawal.amount}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Payment Method:</span>
                          <span className="ml-1 font-medium">
                            {withdrawal.bankDetails.payment_method || "bKash"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Account:</span>
                          <span className="ml-1 font-medium">
                            {withdrawal.bankDetails.bkash_number ||
                              withdrawal.bankDetails.account_number ||
                              "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-gray-500">Requested:</span>
                          <span className="ml-1 font-medium">
                            {withdrawal.date}
                          </span>
                        </div>
                      </div>
                      {withdrawal.processedDate && (
                        <div className="mt-2 text-xs text-gray-500">
                          Processed: {withdrawal.processedDate}
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 ml-4 flex-shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          setSelectedWithdrawal(withdrawal);
                          setIsStatusModalOpen(true);
                        }}
                        className="text-blue-600 hover:text-blue-700 bg-transparent"
                      >
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawal Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Withdrawal Status Distribution</CardTitle>
            <CardDescription>
              Breakdown of withdrawal request statuses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  status: "Pending",
                  count: withdrawals.filter((w) => w.status === "pending")
                    .length,
                  percentage: 40,
                  color: "bg-yellow-500",
                },
                {
                  status: "Approved",
                  count: withdrawals.filter((w) => w.status === "approved")
                    .length,
                  percentage: 35,
                  color: "bg-green-500",
                },
                {
                  status: "Completed",
                  count: withdrawals.filter((w) => w.status === "completed")
                    .length,
                  percentage: 20,
                  color: "bg-blue-500",
                },
                {
                  status: "Rejected",
                  count: withdrawals.filter((w) => w.status === "rejected")
                    .length,
                  percentage: 5,
                  color: "bg-red-500",
                },
              ].map((item) => (
                <div key={item.status} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>{item.status}</span>
                    <span className="font-medium">{item.count} requests</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`${item.color} h-2 rounded-full`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.percentage}% of total
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest withdrawal status updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {formattedWithdrawals.slice(0, 5).map((withdrawal) => (
                <div
                  key={withdrawal.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium text-gray-900">
                      WTH-{withdrawal.id}
                    </p>
                    <p className="text-sm text-gray-500">
                      {withdrawal.vendorName}
                    </p>
                    <p className="text-xs text-gray-400">
                      Requested {withdrawal.date}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#00453e]">
                      {withdrawal.amount}
                    </p>
                    <Badge className={getStatusColor(withdrawal.status)}>
                      {withdrawal.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Withdrawal Status Update Modal */}
      <WithdrawalStatusModal
        isOpen={isStatusModalOpen}
        onClose={() => {
          setIsStatusModalOpen(false);
          setSelectedWithdrawal(null);
        }}
        withdrawal={selectedWithdrawal}
        onSuccess={() => {
          fetchData(); // Refresh data after status update
        }}
      />
    </div>
  );
}
