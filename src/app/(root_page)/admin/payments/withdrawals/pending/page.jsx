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
import { Badge } from "@/components/ui/badge";
import { Clock, Check, X, Eye, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

export default function PendingWithdrawalsPage() {
  const [processingId, setProcessingId] = useState(null);

  const pendingWithdrawals = [
    {
      id: "WD001",
      vendorName: "Sports Events BD",
      vendorEmail: "contact@sportseventsbd.com",
      amount: 25000,
      requestDate: "2024-01-15",
      bankAccount: "**** **** **** 1234",
      eventsSold: 5,
      commission: 2500,
      daysWaiting: 3,
    },
    {
      id: "WD007",
      vendorName: "Cricket Champions",
      vendorEmail: "info@cricketchampions.com",
      amount: 15000,
      requestDate: "2024-01-14",
      bankAccount: "**** **** **** 5678",
      eventsSold: 3,
      commission: 1500,
      daysWaiting: 4,
    },
    {
      id: "WD008",
      vendorName: "Football United",
      vendorEmail: "admin@footballunited.com",
      amount: 30000,
      requestDate: "2024-01-12",
      bankAccount: "**** **** **** 9012",
      eventsSold: 6,
      commission: 3000,
      daysWaiting: 6,
    },
  ];

  const handleApprove = (id) => {
    setProcessingId(id);
    // Simulate API call
    setTimeout(() => {
      setProcessingId(null);
      // Handle approval logic
    }, 2000);
  };

  const handleReject = (id) => {
    setProcessingId(id);
    // Simulate API call
    setTimeout(() => {
      setProcessingId(null);
      // Handle rejection logic
    }, 2000);
  };

  const totalPendingAmount = pendingWithdrawals.reduce(
    (sum, w) => sum + w.amount,
    0
  );
  const totalCommission = pendingWithdrawals.reduce(
    (sum, w) => sum + w.commission,
    0
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Link href="/admin/payments/withdrawals">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Pending Withdrawals
            </h1>
            <p className="text-gray-600">
              Review and process withdrawal requests
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            Bulk Approve
          </Button>
          <Button variant="outline" size="sm">
            Bulk Reject
          </Button>
        </div>
      </div>

      {/* Alert for urgent requests */}
      <Card className="border-yellow-200 bg-yellow-50">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="h-5 w-5 text-yellow-600" />
            <div>
              <p className="font-medium text-yellow-800">
                Urgent Review Required
              </p>
              <p className="text-sm text-yellow-700">
                {pendingWithdrawals.filter((w) => w.daysWaiting > 5).length}{" "}
                requests have been waiting for more than 5 days
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Pending Requests
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {pendingWithdrawals.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-[#00453e] rounded-lg">
                <Clock className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Pending Amount
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳{totalPendingAmount.toLocaleString()}
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
                <p className="text-sm font-medium text-gray-600">
                  Commission to Earn
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳{totalCommission.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Withdrawals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Withdrawal Requests</CardTitle>
          <CardDescription>
            Review and approve or reject withdrawal requests from vendors
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
                    Bank Account
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Waiting Time
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
                {pendingWithdrawals.map((withdrawal) => (
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
                    <td className="py-3 px-4">
                      <div>
                        <p className="font-medium">
                          ৳{withdrawal.amount.toLocaleString()}
                        </p>
                        <p className="text-sm text-gray-500">
                          Commission: ৳{withdrawal.commission.toLocaleString()}
                        </p>
                      </div>
                    </td>
                    <td className="py-3 px-4 font-mono text-sm">
                      {withdrawal.bankAccount}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span
                          className={
                            withdrawal.daysWaiting > 5
                              ? "text-red-600 font-medium"
                              : "text-gray-600"
                          }
                        >
                          {withdrawal.daysWaiting} days
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge className="bg-yellow-100 text-yellow-800">
                        <Clock className="h-3 w-3 mr-1" />
                        Pending
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => handleApprove(withdrawal.id)}
                          disabled={processingId === withdrawal.id}
                        >
                          {processingId === withdrawal.id ? (
                            <Clock className="h-4 w-4 animate-spin" />
                          ) : (
                            <Check className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-600 hover:text-red-700 bg-transparent"
                          onClick={() => handleReject(withdrawal.id)}
                          disabled={processingId === withdrawal.id}
                        >
                          <X className="h-4 w-4" />
                        </Button>
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
