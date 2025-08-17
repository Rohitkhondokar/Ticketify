"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Clock,
  ShoppingBag,
  Eye,
  Download,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { getUserOrders } from "../../../action/adminActions";
import Image from "next/image";

export default function UserOrdersPage({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_orders: 0,
    confirmed_orders: 0,
    pending_orders: 0,
    total_spent: 0,
  });

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      // For demo purposes, using user ID 1
      const userId = user.id;
      const result = await getUserOrders(userId);
      console.log(result);

      if (result.success) {
        setOrders(result.data);

        // Calculate stats
        const totalOrders = result.data.length;
        const confirmedOrders = result.data.filter(
          (o) => o.status === "confirmed"
        ).length;
        const pendingOrders = result.data.filter(
          (o) => o.status === "pending"
        ).length;
        const totalSpent = result.data.reduce(
          (sum, o) => sum + (parseFloat(o.total_amount) || 0),
          0
        );

        setStats({
          total_orders: totalOrders,
          confirmed_orders: confirmedOrders,
          pending_orders: pendingOrders,
          total_spent: totalSpent,
        });
      }
    } catch (error) {
      console.error("Error loading orders:", error);
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
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "cancelled":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  if (loading) {
    return (
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
        <div className="space-y-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="overflow-hidden">
              <div className="animate-pulse p-6">
                <div className="h-6 bg-gray-200 rounded mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900">
              {stats.total_orders}
            </div>
            <p className="text-sm text-gray-600">Total Orders</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {stats.confirmed_orders}
            </div>
            <p className="text-sm text-gray-600">Confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {stats.pending_orders}
            </div>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-[#00453e]">
              ৳{stats.total_spent.toLocaleString()}
            </div>
            <p className="text-sm text-gray-600">Total Spent</p>
          </CardContent>
        </Card>
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {orders.length > 0 ? (
          orders.map((order) => (
            <Card key={order.id} className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Event Image */}
                {order.image_url && (
                  <>
                    {console.log(
                      `${process.env.NEXT_PUBLIC_API_URL}${order.image_url}`
                    )}

                    <div className="lg:col-span-1">
                      <div className="bg-gray-200">
                        <Image
                          src={
                            order.image_url
                              ? `${
                                  process.env.NEXT_PUBLIC_API_URL ||
                                  "http://localhost:5000"
                                }${order.image_url}`
                              : "/placeholder.avif"
                          }
                          alt={order.title}
                          width={600}
                          height={300}
                          className="w-full h-64 object-cover rounded-lg mb-6"
                        />
                      </div>
                    </div>
                  </>
                )}

                {/* Order Details */}
                <div className="lg:col-span-2 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {order.event_title}
                      </h3>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#00453e]">
                        ৳{order.total_amount}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.quantity} tickets
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(order.event_date)} at{" "}
                        {formatTime(order.start_time)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin className="h-4 w-4" />
                      <span>{order.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <ShoppingBag className="h-4 w-4" />
                      <span>Order #{order.id}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Ordered {formatDate(order.created_at)}</span>
                    </div>
                  </div>

                  {order.customer_info && (
                    <div className="mb-4 p-3 bg-gray-50 rounded">
                      <h4 className="font-medium text-gray-900 mb-2">
                        Delivery Information
                      </h4>
                      <div className="text-sm text-gray-600">
                        <p>
                          {order.customer_info.firstName}{" "}
                          {order.customer_info.lastName}
                        </p>
                        <p>{order.customer_info.email}</p>
                        <p>{order.customer_info.phone}</p>
                        <p>
                          {order.customer_info.address},{" "}
                          {order.customer_info.city}
                        </p>
                      </div>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-2">
                    <Link href={`/user/orders/${order.id}`}>
                      <Button className="bg-[#00453e] hover:bg-[#003530]">
                        <Eye className="h-4 w-4 mr-2" />
                        View Order
                      </Button>
                    </Link>
                    <Button variant="outline" className="bg-transparent">
                      <FileText className="h-4 w-4 mr-2" />
                      Download Invoice
                    </Button>
                    {order.status === "confirmed" && (
                      <Link href={`/user/tickets?orderId=${order.id}`}>
                        <Button variant="outline" className="bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          View Tickets
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>

                {/* Payment Info */}
                <div className="lg:col-span-1 p-6 border-l">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gray-200 mx-auto mb-3 flex items-center justify-center rounded">
                      <ShoppingBag className="h-8 w-8 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-600 mb-2">Payment Method</p>
                    <p className="text-xs text-gray-500 capitalize">
                      {order.payment_method?.replace("_", " ") || ""}
                    </p>
                    <Badge className={`mt-2 ${getStatusColor("confirmed")}`}>
                      {"confirmed"}
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No orders yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start exploring events and make your first order!
              </p>
              <Link href="/events">
                <Button className="bg-[#00453e] hover:bg-[#003530]">
                  Browse Events
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
