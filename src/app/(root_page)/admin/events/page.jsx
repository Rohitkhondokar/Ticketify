"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  MapPin,
  Users,
  CheckCircle,
  XCircle,
} from "lucide-react";
import {
  getAllEvents,
  getDashboardStats,
  updateEventStatus,
} from "../../../../../action/adminActions";
import Image from "next/image";

export default function AdminEvents() {
  const [events, setEvents] = useState([]);
  const [dashboardStats, setDashboardStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [updatingStatus, setUpdatingStatus] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      const [eventsResult, statsResult] = await Promise.all([
        getAllEvents(),
        getDashboardStats(),
      ]);

      if (eventsResult.success) {
        const formattedEvents = (eventsResult.data.events || []).map(
          (event) => ({
            id: event.id,
            name: event.title || "Unknown Event",
            vendor: event.vendor_name || "Unknown Vendor",
            date: event.event_date
              ? new Date(event.event_date).toLocaleDateString()
              : "Unknown Date",
            location: event.venue || "Location not specified",
            category: event.category || "Uncategorized",
            ticketsSold: event.tickets_sold || 0,
            totalTickets: event.capacity || 0,
            revenue: `৳${(
              parseFloat(event.total_quantity_sold * event.price) || 0
            ).toFixed(2)}`,
            status: event.status || "pending",
            image: event.image_url || "/placeholder.svg?height=100&width=150",
          })
        );
        setEvents(formattedEvents);
      }

      if (statsResult.success) {
        setDashboardStats(statsResult.data);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (eventId, newStatus) => {
    try {
      setUpdatingStatus(eventId);
      const result = await updateEventStatus(eventId, newStatus);

      if (result.success) {
        // Update the local state
        setEvents((prevEvents) =>
          prevEvents.map((event) =>
            event.id === eventId ? { ...event, status: newStatus } : event
          )
        );

        // Reload dashboard stats to update the counts
        const statsResult = await getDashboardStats();
        if (statsResult.success) {
          setDashboardStats(statsResult.data);
        }
      } else {
        alert("Failed to update event status: " + result.message);
      }
    } catch (error) {
      console.error("Error updating event status:", error);
      alert("Error updating event status");
    } finally {
      setUpdatingStatus(null);
    }
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "active":
        return "default";
      case "pending":
        return "secondary";
      case "cancelled":
        return "destructive";
      case "completed":
        return "outline";
      default:
        return "outline";
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "active":
        return "bg-[#00453e]";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "completed":
        return "bg-green-100 text-green-800";
      default:
        return "";
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading events...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Events Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage all events on the platform
          </p>
        </div>
        <Button className="bg-[#00453e] hover:bg-[#003530]">
          <Plus className="h-4 w-4 mr-2" />
          Add Event
        </Button>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900">
              {dashboardStats.total_events || 0}
            </div>
            <p className="text-sm text-gray-600">Total Events</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {dashboardStats.active_events || 0}
            </div>
            <p className="text-sm text-gray-600">Active Events</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {dashboardStats.pending_events || 0}
            </div>
            <p className="text-sm text-gray-600">Pending Approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-600">
              {(dashboardStats.total_events || 0) -
                (dashboardStats.active_events || 0) -
                (dashboardStats.pending_events || 0)}
            </div>
            <p className="text-sm text-gray-600">Other Events</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search events..." className="pl-10" />
            </div>
            <Button variant="outline">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Events Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden">
            <div className=" bg-gray-200">
              <Image
                src={`${process.env.NEXT_PUBLIC_API_URL}${event.image}`}
                width={100}
                height={100}
                alt={event.name}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-1">
                  {event.name}
                </CardTitle>
                <Badge
                  variant={getStatusBadgeVariant(event.status)}
                  className={getStatusBadgeClass(event.status)}
                >
                  {event.status}
                </Badge>
              </div>
              <CardDescription>by {event.vendor}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>
                    {event.ticketsSold}/{event.totalTickets} tickets sold
                  </span>
                </div>
              </div>

              {/* Status Update Buttons */}
              {event.status === "pending" && (
                <div className="flex gap-2 pt-2 border-t">
                  <Button
                    size="sm"
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleStatusUpdate(event.id, "active")}
                    disabled={updatingStatus === event.id}
                  >
                    {updatingStatus === event.id ? (
                      "Updating..."
                    ) : (
                      <>
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Approve
                      </>
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700"
                    onClick={() => handleStatusUpdate(event.id, "cancelled")}
                    disabled={updatingStatus === event.id}
                  >
                    {updatingStatus === event.id ? (
                      "Updating..."
                    ) : (
                      <>
                        <XCircle className="h-4 w-4 mr-1" />
                        Reject
                      </>
                    )}
                  </Button>
                </div>
              )}

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-semibold text-[#00453e]">
                  {event.revenue}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 bg-transparent"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
