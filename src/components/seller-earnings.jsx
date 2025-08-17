"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  CreditCard,
  Clock,
  CheckCircle,
} from "lucide-react";
import { useState, useEffect } from "react";

import PayoutRequestModal from "./PayoutRequestModal";
import {
  getEventEarnings,
  getTicketSalesAnalysis,
  getVendorWithdrawals,
  getWithdrawalStats,
} from "../../action/eventActions";
export default function SellerEarnings() {
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [refreshData, setRefreshData] = useState(0);
  const [loading, setLoading] = useState(true);

  // Dynamic data states
  const [earnings, setEarnings] = useState([]);
  console.log(earnings);

  const [withdrawals, setWithdrawals] = useState([]);
  const [withdrawalStats, setWithdrawalStats] = useState({
    total_approved_amount: 0,
    total_pending_amount: 0,
  });
  const [salesAnalysis, setSalesAnalysis] = useState([]);

  const vendorId = "1"; // This should come from auth context in real app

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [earningsData, withdrawalsData, statsData, salesData] =
          await Promise.all([
            getEventEarnings(vendorId),
            getVendorWithdrawals(vendorId),
            getWithdrawalStats(vendorId),
            getTicketSalesAnalysis(vendorId),
          ]);
        // console.log(earningsData);

        setEarnings(earningsData.data);
        setWithdrawals(withdrawalsData.data);
        setWithdrawalStats(statsData.data);
        setSalesAnalysis(salesData.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [refreshData, vendorId]);

  // Calculate earnings stats - convert to numbers
  const totalEarnings = earnings.reduce(
    (sum, earning) => sum + (Number.parseFloat(earning?.total_revenue) || 0),
    0
  );
  const thisMonthEarnings = earnings
    ?.filter((earning) => {
      if (!earning?.event_date) return false;
      const earningDate = new Date(earning.event_date);
      const now = new Date();
      return (
        earningDate.getMonth() === now.getMonth() &&
        earningDate.getFullYear() === now.getFullYear()
      );
    })
    .reduce(
      (sum, earning) => sum + (Number.parseFloat(earning?.total_revenue) || 0),
      0
    );

  // Calculate withdrawal stats with proper null checks - convert to numbers
  const totalWithdrawals =
    Number.parseFloat(withdrawalStats?.total_approved_amount) || 0;
  const pendingWithdrawals =
    Number.parseFloat(withdrawalStats?.total_pending_amount) || 0;
  const availableForWithdrawal =
    totalEarnings - totalWithdrawals - pendingWithdrawals;

  const earningsStats = [
    {
      title: "Total Earnings",
      value: `৳${totalEarnings.toFixed(2)}`,
      change: "+18.2%",
      icon: DollarSign,
    },
    {
      title: "This Month",
      value: `৳${thisMonthEarnings.toFixed(2)}`,
      change: "+12.5%",
      icon: Calendar,
    },
    {
      title: "Available for Withdrawal",
      value: `৳${availableForWithdrawal.toFixed(2)}`,
      change: "Ready to withdraw",
      icon: Clock,
    },
    {
      title: "Commission Rate",
      value: "15%",
      change: "Platform fee",
      icon: CreditCard,
    },
  ];

  // Format withdrawal history from database
  const payoutHistory = withdrawals?.map((withdrawal) => {
    const bankDetails =
      typeof withdrawal.bank_details === "string"
        ? JSON.parse(withdrawal.bank_details)
        : withdrawal.bank_details;

    return {
      id: withdrawal.id,
      date: new Date(withdrawal.created_at).toISOString().split("T")[0],
      amount: `৳${Number.parseFloat(withdrawal.amount).toFixed(2)}`,
      status: withdrawal.status,
      method: "Bank Transfer",
      reference: `WD-${withdrawal.id.toString().padStart(6, "0")}`,
      bankName: bankDetails?.bank_name || "bKash",
      processedAt: withdrawal.processed_at
        ? new Date(withdrawal.processed_at).toISOString().split("T")[0]
        : null,
    };
  });

  // Format recent earnings from earnings data
  const recentEarnings = earnings.slice(0, 4)?.map((earning) => {
    const gross = Number.parseFloat(earning?.total_revenue) || 0;
    const commission = Number.parseFloat((gross * 0.15).toFixed(2)); // 15% commission
    const net = Number.parseFloat((gross - commission).toFixed(2));

    return {
      event: earning?.title || "Unknown Event",
      date: earning?.event_date
        ? new Date(earning.event_date).toLocaleDateString()
        : "Unknown Date",
      tickets: earning?.tickets_sold || 0,
      gross: `৳${gross.toFixed(2)}`,
      commission: `৳${commission.toFixed(2)}`,
      net: `৳${net.toFixed(2)}`,
    };
  });

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00453e] mx-auto mb-4"></div>
            <p className="text-gray-600">Loading earnings data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Earnings</h1>
          <p className="text-gray-600 mt-1">
            Track your revenue and payout history
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button
            className="bg-[#00453e] hover:bg-[#003530]"
            onClick={() => setIsPayoutModalOpen(true)}
          >
            Request Payout
          </Button>
        </div>
      </div>

      {/* Earnings Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {earningsStats?.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {stat.value}
              </div>
              <div className="flex items-center space-x-1 text-xs">
                {stat.change.includes("+") ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : null}
                <span
                  className={
                    stat.change.includes("+")
                      ? "text-green-500"
                      : "text-gray-500"
                  }
                >
                  {stat.change}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Earnings Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Earnings Overview</CardTitle>
          <CardDescription>
            Monthly earnings trend over the last 6 months
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
            <div className="text-center">
              <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Earnings Chart</p>
              <p className="text-sm text-gray-400">
                Chart visualization would go here
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Earnings */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Earnings</CardTitle>
          <CardDescription>Latest earnings from your events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentEarnings?.length > 0 ? (
              recentEarnings?.map((earning, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">
                      {earning.event}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {earning.date} • {earning.tickets} tickets sold
                    </p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-right text-sm">
                    <div>
                      <p className="text-gray-500">Gross</p>
                      <p className="font-medium">{earning.gross}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Commission</p>
                      <p className="font-medium text-red-600">
                        -{earning.commission}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Net</p>
                      <p className="font-medium text-[#00453e]">
                        {earning.net}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No earnings data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payout History */}
      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
          <CardDescription>Your payment history and status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {payoutHistory?.length > 0 ? (
              payoutHistory?.map((payout) => (
                <div
                  key={payout.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-100">
                      {payout.status === "approved" ? (
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      ) : (
                        <Clock className="h-5 w-5 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {payout.amount}
                      </p>
                      <p className="text-sm text-gray-500">
                        {payout.date} • {payout.bankName} • {payout.reference}
                      </p>
                      {payout.processedAt && (
                        <p className="text-xs text-gray-400">
                          Processed: {payout.processedAt}
                        </p>
                      )}
                    </div>
                  </div>
                  <Badge
                    variant={
                      payout.status === "approved" ? "default" : "secondary"
                    }
                    className={
                      payout.status === "approved"
                        ? "bg-green-500"
                        : "bg-yellow-500"
                    }
                  >
                    {payout.status}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                No payout history available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payout Information */}
      <Card>
        <CardHeader>
          <CardTitle>Payout Information</CardTitle>
          <CardDescription>
            Important details about your payouts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Payout Schedule
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Payouts are processed bi-weekly</li>
                <li>• Minimum payout amount: ৳50</li>
                <li>• Processing time: 3-5 business days</li>
                <li>• Next payout date: January 30, 2024</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">
                Commission Structure
              </h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Platform commission: 15%</li>
                <li>• Payment processing: 2.9% + ৳0.30</li>
                <li>• No setup or monthly fees</li>
                <li>• Volume discounts available</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payout Request Modal */}
      <PayoutRequestModal
        isOpen={isPayoutModalOpen}
        onClose={() => setIsPayoutModalOpen(false)}
        availableAmount={availableForWithdrawal}
        onSuccess={() => setRefreshData((prev) => prev + 1)}
      />
    </div>
  );
}
