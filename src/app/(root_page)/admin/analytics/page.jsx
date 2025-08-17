import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Ticket,
  Calendar,
  Download,
} from "lucide-react";
import { getAdminAnalytics } from "../../../../../action/adminActions";

export default async function AdminAnalytics() {
  // Fetch analytics data from backend
  const analyticsResult = await getAdminAnalytics();
  const analyticsData = analyticsResult.success ? analyticsResult.data : {};

  // Format analytics data
  const revenueAnalytics = analyticsData.revenue_analytics || [];
  const categoryAnalytics = analyticsData.category_analytics || [];
  const topVendorsData = analyticsData.top_vendors || [];
  const userTrends = analyticsData.user_trends || [];
  // Calculate totals from analytics data
  const totalRevenue = revenueAnalytics.reduce(
    (sum, item) => sum + (parseFloat(item.revenue) || 0),
    0
  );
  const totalTickets = revenueAnalytics.reduce(
    (sum, item) => sum + (parseInt(item.orders) || 0),
    0
  );
  const totalUsers = userTrends.reduce(
    (sum, item) => sum + (parseInt(item.new_users) || 0),
    0
  );
  const totalEvents = categoryAnalytics.reduce(
    (sum, item) => sum + (parseInt(item.total_events) || 0),
    0
  );

  const metrics = [
    {
      title: "Total Revenue",
      value: `৳${totalRevenue.toFixed(2)}`,
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      period: "vs last month",
    },
    {
      title: "Ticket Sales",
      value: totalTickets.toString(),
      change: "+8.2%",
      trend: "up",
      icon: Ticket,
      period: "vs last month",
    },
    {
      title: "New Users",
      value: totalUsers.toString(),
      change: "+5.7%",
      trend: "up",
      icon: Users,
      period: "vs last month",
    },
    {
      title: "Active Events",
      value: totalEvents.toString(),
      change: "-2.1%",
      trend: "down",
      icon: Calendar,
      period: "vs last month",
    },
  ];

  // Format top events from category analytics
  const topEvents = categoryAnalytics.map((category) => ({
    name: category.category || "Unknown Category",
    tickets: category.total_capacity || 0,
    revenue: `৳${(parseFloat(category.total_capacity * 50) || 0).toFixed(2)}`, // Estimated revenue
  }));

  // Format top vendors from database
  const topVendors = topVendorsData.map((vendor) => ({
    name: vendor.vendor_name || "Unknown Vendor",
    events: vendor.total_events || 0,
    revenue: `৳${(parseFloat(vendor.total_revenue) || 0).toFixed(2)}`,
  }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Track platform performance and insights
          </p>
        </div>
        <Button className="bg-[#00453e] hover:bg-[#003530]">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">
                {metric.title}
              </CardTitle>
              <metric.icon className="h-4 w-4 text-gray-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {metric.value}
              </div>
              <div className="flex items-center space-x-1 text-xs mt-1">
                {metric.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-500" />
                )}
                <span
                  className={
                    metric.trend === "up" ? "text-green-500" : "text-red-500"
                  }
                >
                  {metric.change}
                </span>
                <span className="text-gray-500">{metric.period}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Revenue Trend</CardTitle>
            <CardDescription>
              Monthly revenue over the last 6 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500">Revenue Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Ticket Sales</CardTitle>
            <CardDescription>
              Daily ticket sales for the last 30 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded">
              <p className="text-gray-500">Sales Chart Placeholder</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Performers */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Events</CardTitle>
            <CardDescription>
              Best performing events by ticket sales
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topEvents.map((event, index) => (
                <div
                  key={event.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#00453e] text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{event.name}</p>
                      <p className="text-sm text-gray-500">
                        {event.tickets} tickets sold
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#00453e]">
                      {event.revenue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Vendors</CardTitle>
            <CardDescription>
              Best performing vendors by revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {topVendors.map((vendor, index) => (
                <div
                  key={vendor.name}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-[#00453e] text-white rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{vendor.name}</p>
                      <p className="text-sm text-gray-500">
                        {vendor.events} events
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-[#00453e]">
                      {vendor.revenue}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">+1,549</div>
            <p className="text-sm text-gray-600">New users this month</p>
            <div className="flex items-center space-x-1 text-xs mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+15.2%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">$87.50</div>
            <p className="text-sm text-gray-600">Per transaction</p>
            <div className="flex items-center space-x-1 text-xs mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+8.1%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3.2%</div>
            <p className="text-sm text-gray-600">Visitors to buyers</p>
            <div className="flex items-center space-x-1 text-xs mt-1">
              <TrendingDown className="h-3 w-3 text-red-500" />
              <span className="text-red-500">-0.5%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
