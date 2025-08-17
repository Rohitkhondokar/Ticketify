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
  Calendar,
  Ticket,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Eye,
  Plus,
  Users,
} from "lucide-react";
import {
  getEventEarnings,
  getEventStats,
  getVendorEvents,
} from "../../../../action/eventActions";

export default async function SellerDashboard() {
  const vendorId = "1"; // Default vendor ID for now

  // Fetch data from backend
  const [statsResult, earningsResult, eventsResult] = await Promise.all([
    getEventStats(vendorId),
    getEventEarnings(vendorId),
    getVendorEvents(vendorId),
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
  const events = eventsResult.success ? eventsResult.data : [];

  // Calculate total revenue
  const totalRevenue = earnings.reduce(
    (sum, earning) => sum + (parseFloat(earning?.total_revenue) || 0),
    0
  );
  const totalTicketsSold = earnings.reduce(
    (sum, earning) => sum + (earning?.tickets_sold || 0),
    0
  );

  const dashboardStats = [
    {
      title: "Total Revenue",
      value: `৳${totalRevenue.toFixed(2)}`,
      change: "+18.2%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Active Events",
      value: stats.active_events?.toString() || "0",
      change: "+2",
      trend: "up",
      icon: Calendar,
    },
    {
      title: "Tickets Sold",
      value: totalTicketsSold.toString(),
      change: "+12.5%",
      trend: "up",
      icon: Ticket,
    },
    {
      title: "Total Events",
      value: stats.total_events?.toString() || "0",
      change: "+8.1%",
      trend: "up",
      icon: Users,
    },
  ];

  // Format events for display
  const recentEvents = events.slice(0, 3).map((event) => ({
    id: event.id,
    name: event?.title || "Unknown Event",
    date: event?.event_date
      ? new Date(event.event_date).toLocaleDateString()
      : "Unknown Date",
    ticketsSold: event?.ticket_count || 0,
    totalTickets: event?.capacity || 0,
    revenue: `৳${event?.price || 0}`,
    status: event?.status || "draft",
  }));

  // Get upcoming events (events with future dates)
  const upcomingEvents = events
    .filter((event) => new Date(event.event_date) > new Date())
    .slice(0, 2)
    .map((event) => {
      const daysLeft = Math.ceil(
        (new Date(event.event_date) - new Date()) / (1000 * 60 * 60 * 24)
      );
      return {
        id: event.id,
        name: event.title,
        date: new Date(event.event_date).toLocaleDateString(),
        daysLeft,
        ticketsAvailable: event.capacity || 0,
      };
    });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Welcome back! Here's your event performance overview.
          </p>
        </div>
        <Button className="bg-[#00453e] hover:bg-[#003530]">
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat) => (
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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Events */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Events</CardTitle>
                <CardDescription>Your latest event performance</CardDescription>
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
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-gray-900">
                        {event.name}
                      </h3>
                      <Badge
                        variant={
                          event.status === "active" ? "default" : "secondary"
                        }
                        className={
                          event.status === "active" ? "bg-[#00453e]" : ""
                        }
                      >
                        {event.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{event.date}</span>
                      <span>
                        {event.ticketsSold}/{event.totalTickets} sold
                      </span>
                      <span className="font-medium text-[#00453e]">
                        {event.revenue}
                      </span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>Events starting soon</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <h3 className="font-medium text-gray-900">{event.name}</h3>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                      <span>{event.date}</span>
                      <span>{event.daysLeft} days left</span>
                      <span>{event.ticketsAvailable} tickets available</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Event Management</CardTitle>
            <CardDescription>Create and manage your events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full bg-[#00453e] hover:bg-[#003530]">
                Create New Event
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                View All Events
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Sales Analytics</CardTitle>
            <CardDescription>
              Track your ticket sales performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full bg-[#00453e] hover:bg-[#003530]">
                View Analytics
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Download Report
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Earnings</CardTitle>
            <CardDescription>Track your revenue and payouts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Button className="w-full bg-[#00453e] hover:bg-[#003530]">
                View Earnings
              </Button>
              <Button variant="outline" className="w-full bg-transparent">
                Payout History
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
