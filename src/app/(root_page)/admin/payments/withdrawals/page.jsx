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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, Download, Eye, Check, X, Clock } from "lucide-react";

export default function WithdrawalRequestsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const withdrawals = [
    {
      id: "WD001",
      vendorName: "Sports Events BD",
      vendorEmail: "contact@sportseventsbd.com",
      amount: 25000,
      requestDate: "2024-01-15",
      status: "pending",
      bankAccount: "**** **** **** 1234",
      eventsSold: 5,
      commission: 2500,
    },
    {
      id: "WD002",
      vendorName: "Cricket Mania",
      vendorEmail: "info@cricketmania.com",
      amount: 18000,
      requestDate: "2024-01-14",
      status: "approved",
      bankAccount: "**** **** **** 5678",
      eventsSold: 3,
      commission: 1800,
    },
    {
      id: "WD003",
      vendorName: "Football Fever",
      vendorEmail: "admin@footballfever.com",
      amount: 12000,
      requestDate: "2024-01-13",
      status: "completed",
      bankAccount: "**** **** **** 9012",
      eventsSold: 2,
      commission: 1200,
    },
    {
      id: "WD004",
      vendorName: "Event Masters",
      vendorEmail: "hello@eventmasters.com",
      amount: 8000,
      requestDate: "2024-01-12",
      status: "rejected",
      bankAccount: "**** **** **** 3456",
      eventsSold: 1,
      commission: 800,
      rejectionReason: "Insufficient documentation",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "approved":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "approved":
        return <Check className="h-4 w-4" />;
      case "completed":
        return <Check className="h-4 w-4" />;
      case "rejected":
        return <X className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredWithdrawals = withdrawals.filter((withdrawal) => {
    const matchesSearch =
      withdrawal.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      withdrawal.id.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeTab === "all") return matchesSearch;
    return matchesSearch && withdrawal.status === activeTab;
  });

  const stats = {
    total: withdrawals.length,
    pending: withdrawals.filter((w) => w.status === "pending").length,
    approved: withdrawals.filter((w) => w.status === "approved").length,
    completed: withdrawals.filter((w) => w.status === "completed").length,
    rejected: withdrawals.filter((w) => w.status === "rejected").length,
    totalAmount: withdrawals.reduce((sum, w) => sum + w.amount, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Withdrawal Requests
          </h1>
          <p className="text-gray-600">
            Manage vendor withdrawal requests and payouts
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.pending}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Check className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.approved}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Check className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.completed}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <X className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.rejected}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-[#00453e] rounded-lg">
                <Download className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳{stats.totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Tabs */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by vendor name or withdrawal ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full sm:w-auto"
            >
              <TabsList>
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </CardContent>
      </Card>

      {/* Withdrawals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Withdrawal Requests</CardTitle>
          <CardDescription>
            Manage and process vendor withdrawal requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Request ID
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Vendor
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Amount
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Commission
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Bank Account
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Status
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredWithdrawals.map((withdrawal) => (
                  <tr key={withdrawal.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{withdrawal.id}</td>
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">{withdrawal.vendorName}</p>
                        <p className="text-sm text-gray-500">
                          {withdrawal.vendorEmail}
                        </p>
                        <p className="text-sm text-gray-500">
                          {withdrawal.eventsSold} events sold
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-medium">
                      ৳{withdrawal.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-gray-600">
                      ৳{withdrawal.commission.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      {withdrawal.bankAccount}
                    </td>
                    <td className="py-3 px-4">
                      <Badge className={getStatusColor(withdrawal.status)}>
                        <span className="flex items-center gap-1">
                          {getStatusIcon(withdrawal.status)}
                          {withdrawal.status}
                        </span>
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        {withdrawal.status === "pending" && (
                          <>
                            <Button
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 bg-transparent"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
