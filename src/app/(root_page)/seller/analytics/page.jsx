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
  BarChart3,
} from "lucide-react";
import {
  getEventEarnings,
  getEventStats,
  getTicketSalesAnalysis,
} from "../../../../../action/eventActions";

export default async function SellerAnalytics() {
  const vendorId = "1"; // Default vendor ID for now

  // Fetch data from backend
  const [statsResult, earningsResult, salesAnalysisResult] = await Promise.all([
    getEventStats(vendorId),
    getEventEarnings(vendorId),
    getTicketSalesAnalysis(vendorId),
  ]);

  const stats = statsResult.success
    ? statsResult.data
    : {
        total_events: 0,
        active_events: 0,
        pending_events: 0,
        draft_events: 0,
        completed_events: 0,
      };

  const earnings = earningsResult.success ? earningsResult.data : [];
  const salesAnalysis = salesAnalysisResult.success
    ? salesAnalysisResult.data
    : [];

  // Calculate metrics
  const totalRevenue = earnings.reduce(
    (sum, earning) => sum + (parseFloat(earning?.total_revenue) || 0),
    0
  );
  const totalTicketsSold = earnings.reduce(
    (sum, earning) => sum + (earning?.tickets_sold || 0),
    0
  );

  const metrics = [
    {
      title: "Total Revenue",
      value: `৳${totalRevenue.toFixed(2)}`,
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
      period: "vs last month",
    },
    {
      title: "Ticket Sales",
      value: totalTicketsSold.toString(),
      change: "+12.5%",
      trend: "up",
      icon: Ticket,
      period: "vs last month",
    },
    {
      title: "Event Views",
      value: "15,234",
      change: "+8.7%",
      trend: "up",
      icon: Users,
      period: "vs last month",
    },
    {
      title: "Active Events",
      value: stats.active_events?.toString() || "0",
      change: "+2",
      trend: "up",
      icon: Calendar,
      period: "vs last month",
    },
  ];

  // Format top events from earnings data
  const topEvents = earnings
    .sort((a, b) => (b?.tickets_sold || 0) - (a?.tickets_sold || 0))
    .slice(0, 5)
    .map((event) => ({
      name: event?.title || "Unknown Event",
      tickets: event?.tickets_sold || 0,
      revenue: `৳${event?.total_revenue || 0}`,
      views: Math.floor(Math.random() * 5000) + 1000, // Mock views data
    }));

  // Calculate sales by category
  const categorySales = {};
  salesAnalysis.forEach((sale) => {
    if (sale?.tickets_sold > 0) {
      if (!categorySales[sale?.title]) {
        categorySales[sale?.title] = {
          sales: 0,
          revenue: 0,
        };
      }
      categorySales[sale?.title].sales += sale.tickets_sold;
      categorySales[sale?.title].revenue += parseFloat(sale?.revenue) || 0;
    }
  });

  const totalCategorySales = Object.values(categorySales).reduce(
    (sum, cat) => sum + cat.sales,
    0
  );

  const salesByCategory = Object.entries(categorySales)
    .map(([category, data]) => ({
      category,
      sales: data.sales,
      revenue: `৳${data.revenue.toFixed(2)}`,
      percentage:
        totalCategorySales > 0
          ? Math.round((data.sales / totalCategorySales) * 100)
          : 0,
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Track your event performance and insights
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
              <div className="text-center">
                <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Revenue Chart</p>
                <p className="text-sm text-gray-400">
                  Chart visualization would go here
                </p>
              </div>
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
              <div className="text-center">
                <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Sales Chart</p>
                <p className="text-sm text-gray-400">
                  Chart visualization would go here
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Tables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Top Performing Events</CardTitle>
            <CardDescription>Your best events by ticket sales</CardDescription>
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
                        {event.tickets} tickets • {event.views} views
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
            <CardTitle>Sales by Category</CardTitle>
            <CardDescription>
              Revenue breakdown by event category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesByCategory.map((category) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-gray-900">
                        {category.category}
                      </p>
                      <p className="text-sm text-gray-500">
                        {category.sales} tickets sold
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-[#00453e]">
                        {category.revenue}
                      </p>
                      <p className="text-sm text-gray-500">
                        {category.percentage}%
                      </p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-[#00453e] h-2 rounded-full"
                      style={{ width: `${category.percentage}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Conversion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3.2%</div>
            <p className="text-sm text-gray-600">Views to purchases</p>
            <div className="flex items-center space-x-1 text-xs mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+0.5%</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Average Order Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">৳87.50</div>
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
            <CardTitle>Customer Satisfaction</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">4.8/5</div>
            <p className="text-sm text-gray-600">Average rating</p>
            <div className="flex items-center space-x-1 text-xs mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-green-500">+0.2</span>
              <span className="text-gray-500">vs last month</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
