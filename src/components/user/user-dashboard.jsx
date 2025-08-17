"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Ticket,
  ShoppingBag,
  Heart,
  Calendar,
  MapPin,
  TrendingUp,
  Star,
  User,
} from "lucide-react";
import Link from "next/link";
import {
  getUserDashboardStats,
  getUserTickets,
  getUserOrders,
} from "../../../action/adminActions";
import Image from "next/image";

export default function UserDashboard({ user }) {
  const [stats, setStats] = useState({
    total_tickets: 0,
    total_orders: 0,
    total_spent: 0,
    active_tickets: 0,
    confirmed_orders: 0,
    pending_orders: 0,
  });
  const [recentTickets, setRecentTickets] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // For demo purposes, using user ID 1
      // In a real app, you'd get this from authentication context
      const userId = user.id;

      // Load user stats
      const statsResult = await getUserDashboardStats(userId);
      console.log(statsResult, "jasfjdfjasfj");

      if (statsResult.success) {
        setStats(statsResult.data);
      }

      // Load recent tickets
      const ticketsResult = await getUserTickets(userId);
      if (ticketsResult.success) {
        setRecentTickets(ticketsResult.data.slice(0, 3)); // Get last 3 tickets
      }

      // Load recent orders
      const ordersResult = await getUserOrders(userId);
      if (ordersResult.success) {
        setRecentOrders(ordersResult.data.slice(0, 3)); // Get last 3 orders
      }
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    return timeString ? timeString.substring(0, 5) : "";
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "confirmed":
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
      case "used":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="bg-gradient-to-r from-[#00453e] to-[#006b5e] text-white rounded-lg p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-white/20 rounded mb-2"></div>
            <div className="h-4 bg-white/20 rounded w-3/4"></div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i}>
              <CardContent className="pt-6">
                <div className="animate-pulse">
                  <div className="h-8 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#00453e] to-[#006b5e] text-white rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user.name}!</h2>
        <p className="text-white/90">
          Here's what's happening with your tickets and orders.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Tickets
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total_tickets || 0}
                </p>
              </div>
              <Ticket className="h-8 w-8 text-[#00453e]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.total_orders || 0}
                </p>
              </div>
              <ShoppingBag className="h-8 w-8 text-[#00453e]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Tickets
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.active_tickets || 0}
                </p>
              </div>
              <Ticket className="h-8 w-8 text-[#00453e]" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Spent</p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳{(stats.total_spent || 0).toLocaleString()}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-[#00453e]" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tickets */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Tickets</CardTitle>
                <CardDescription>Your latest ticket purchases</CardDescription>
              </div>
              <Link href="/user/tickets">
                <Button variant="outline" size="sm" className="bg-transparent">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentTickets.length > 0 ? (
              recentTickets.map((ticket) => (
                <div
                  key={ticket.id}
                  className="flex items-center space-x-4 p-3 border rounded-lg"
                >
                  <div className="w-16 h-12 bg-gray-200 rounded">
                    <Image
                      src={`${process.env.NEXT_PUBLIC_API_URL}${ticket.image_url}`}
                      alt={ticket.event_title}
                      className="w-full h-full object-cover rounded"
                      width={600}
                      height={300}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {ticket.event_title}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(ticket.event_date)}</span>
                      <MapPin className="h-3 w-3" />
                      <span>{ticket.location}</span>
                    </div>
                  </div>
                  <Badge className={getStatusColor("confirmed")}>
                    {"confirmed"}
                  </Badge>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No tickets yet
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Your latest order history</CardDescription>
              </div>
              <Link href="/user/orders">
                <Button variant="outline" size="sm" className="bg-transparent">
                  View All
                </Button>
              </Link>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentOrders.length > 0 ? (
              recentOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center space-x-4 p-3 border rounded-lg"
                >
                  <div className="w-16 h-12 bg-gray-200 rounded flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {order.event_title}
                    </p>
                    <div className="flex items-center space-x-2 text-xs text-gray-500">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(order.created_at)}</span>
                      <span>•</span>
                      <span>{order.quantity} tickets</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#00453e]">
                      ৳{order.total_amount}
                    </p>
                    <Badge className={getStatusColor("confirmed")}>
                      {"confirmed"}
                    </Badge>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4 text-gray-500">
                No orders yet
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used features</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/user/tickets">
              <Button
                variant="outline"
                className="w-full h-20 flex-col bg-transparent"
              >
                <Ticket className="h-6 w-6 mb-2" />
                <span className="text-sm">My Tickets</span>
              </Button>
            </Link>
            <Link href="/user/orders">
              <Button
                variant="outline"
                className="w-full h-20 flex-col bg-transparent"
              >
                <ShoppingBag className="h-6 w-6 mb-2" />
                <span className="text-sm">Order History</span>
              </Button>
            </Link>
            <Link href="/events">
              <Button
                variant="outline"
                className="w-full h-20 flex-col bg-transparent"
              >
                <Calendar className="h-6 w-6 mb-2" />
                <span className="text-sm">Browse Events</span>
              </Button>
            </Link>
            <Link href="/user/profile">
              <Button
                variant="outline"
                className="w-full h-20 flex-col bg-transparent"
              >
                <User className="h-6 w-6 mb-2" />
                <span className="text-sm">Profile</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
