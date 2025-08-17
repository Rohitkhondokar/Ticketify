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
  Users,
  Calendar,
  Ticket,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  MoreHorizontal,
} from "lucide-react";
import { getAdminDashboardStats } from "../../../../action/adminActions";

export default async function AdminDashboard() {
  // Fetch dashboard data from backend
  const dashboardResult = await getAdminDashboardStats();
  const dashboardData = dashboardResult.success ? dashboardResult.data : {};

  // Format stats with dynamic data
  const stats = [
    {
      title: "Total Revenue",
      value: `৳${(parseFloat(dashboardData.total_revenue) || 0).toFixed(2)}`,
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Events",
      value: dashboardData.active_events?.toString() || "0",
      change: "+12.5%",
      trend: "up",
      icon: Calendar,
    },
    {
      title: "Tickets Sold",
      value: dashboardData.total_tickets?.toString() || "0",
      change: "+8.2%",
      trend: "up",
      icon: Ticket,
    },
    {
      title: "Total Users",
      value: dashboardData.total_users?.toString() || "0",
      change: "+5.7%",
      trend: "up",
      icon: Users,
    },
  ];

  // Format recent events from database
  const recentEvents = (dashboardData.recent_events || []).map((event) => ({
    id: event.id,
    name: event.title || "Unknown Event",
    vendor: event.vendor_name || "Unknown Vendor",
    date: event.event_date
      ? new Date(event.event_date).toLocaleDateString()
      : "Unknown Date",
    ticketsSold: event.capacity || 0,
    revenue: `৳${(parseFloat(event.price) || 0).toFixed(2)}`,
    status: event.status || "pending",
  }));

  // Format recent orders from database
  const recentOrders = (dashboardData.recent_orders || []).map((order) => ({
    id: order.id,
    event: order.event_title || "Unknown Event",
    buyer: order.buyer_name || "Unknown Buyer",
    amount: `৳${(parseFloat(order.total_amount) || 0).toFixed(2)}`,
    status: order.status || "pending",
    date: order.created_at
      ? new Date(order.created_at).toLocaleDateString()
      : "Unknown Date",
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome back! Here's what's happening with your platform.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
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
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={
                    stat.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {stat.change}
                </span>
                <span className="text-gray-500">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Events */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Events</CardTitle>
              <CardDescription>
                Latest events created on the platform
              </CardDescription>
            </div>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-3">
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {event.name}
                      </h3>
                      <p className="text-sm text-gray-500">by {event.vendor}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                    <span>Date: {event.date}</span>
                    <span>Sold: {event.ticketsSold}</span>
                    <span>Revenue: {event.revenue}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge
                    variant={
                      event.status === "active" ? "default" : "secondary"
                    }
                    className={event.status === "active" ? "bg-[#00453e]" : ""}
                  >
                    {event.status}
                  </Badge>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Event Management</CardTitle>
            <CardDescription>Manage all events on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full bg-[#00453e] hover:bg-[#003530]">
                View All Events
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Pending Approvals
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Vendor Management</CardTitle>
            <CardDescription>
              Manage vendors and their permissions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full bg-[#00453e] hover:bg-[#003530]">
                View All Vendors
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                New Applications
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Financial Overview</CardTitle>
            <CardDescription>Track payments and commissions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full bg-[#00453e] hover:bg-[#003530]">
                View Payments
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Generate Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
