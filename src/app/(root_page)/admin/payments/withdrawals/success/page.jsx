"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, Eye, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SuccessfulWithdrawalsPage() {
  const successfulWithdrawals = [
    {
      id: "WD003",
      vendorName: "Football Fever",
      vendorEmail: "admin@footballfever.com",
      amount: 12000,
      requestDate: "2024-01-13",
      completedDate: "2024-01-15",
      bankAccount: "**** **** **** 9012",
      transactionId: "TXN789012345",
      eventsSold: 2,
      commission: 1200,
    },
    {
      id: "WD005",
      vendorName: "Sports Arena",
      vendorEmail: "contact@sportsarena.com",
      amount: 35000,
      requestDate: "2024-01-10",
      completedDate: "2024-01-12",
      bankAccount: "**** **** **** 7890",
      transactionId: "TXN456789012",
      eventsSold: 7,
      commission: 3500,
    },
    {
      id: "WD006",
      vendorName: "Event Galaxy",
      vendorEmail: "info@eventgalaxy.com",
      amount: 22000,
      requestDate: "2024-01-08",
      completedDate: "2024-01-10",
      bankAccount: "**** **** **** 2468",
      transactionId: "TXN123456789",
      eventsSold: 4,
      commission: 2200,
    },
  ];

  const totalAmount = successfulWithdrawals.reduce(
    (sum, w) => sum + w.amount,
    0
  );
  const totalCommission = successfulWithdrawals.reduce(
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
              Successful Withdrawals
            </h1>
            <p className="text-gray-600">Completed withdrawal transactions</p>
          </div>
        </div>
        <Button variant="outline" size="sm">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Completed
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {successfulWithdrawals.length}
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
                  Total Amount Paid
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳{totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Commission Earned
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳{totalCommission.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Successful Withdrawals Table */}
      <Card>
        <CardHeader>
          <CardTitle>Completed Withdrawals</CardTitle>
          <CardDescription>
            All successfully processed withdrawal transactions
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
                    Transaction ID
                  </th>
                  <th className="text-left py-3 px-4 font-medium text-gray-900">
                    Completed Date
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
                {successfulWithdrawals.map((withdrawal) => (
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
                    <td className="py-3 px-4 font-mono text-sm">
                      {withdrawal.transactionId}
                    </td>
                    <td className="py-3 px-4">{withdrawal.completedDate}</td>
                    <td className="py-3 px-4">
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
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
