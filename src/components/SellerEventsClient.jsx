"use client";

import { useState } from "react";
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
  Copy,
} from "lucide-react";
import CreateEventModal from "@/components/CreateEventModal";
import UpdateEventModal from "@/components/UpdateEventModal";
import { deleteEvent } from "../../action/eventActions";
import Image from "next/image";

export default function SellerEventsClient({ events = [] }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Calculate stats
  const totalEvents = events.length;
  const activeEvents = events.filter((e) => e.status === "active").length;
  const pendingEvents = events.filter((e) => e.status === "pending").length;
  const draftEvents = events.filter((e) => e.status === "draft").length;
  const baseUrl = "http://localhost:5000";

  const handleUpdateEvent = (event) => {
    setSelectedEvent(event);
    setIsUpdateModalOpen(true);
  };

  const handleDeleteEvent = async (eventId) => {
    if (confirm("Are you sure you want to delete this event?")) {
      try {
        const result = await deleteEvent(eventId, "1"); // Default vendor ID
        if (result.success) {
          // Refresh the page or update the events list
          window.location.reload();
        } else {
          alert(result.message || "Failed to delete event");
        }
      } catch (error) {
        console.error("Error deleting event:", error);
        alert("Failed to delete event");
      }
    }
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Events</h1>
          <p className="text-gray-600 mt-1">Create and manage your events</p>
        </div>
        <Button
          className="bg-[#00453e] hover:bg-[#003530]"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="h-4 w-4 mr-2" />
          Create Event
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search your events..." className="pl-10" />
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
            <div className="aspect-video bg-gray-200">
              {event.image_url && (
                <Image
                  src={`${baseUrl}${event.image_url}`}
                  alt={event.title}
                  // className="w-full h-full object-cover"
                  width={1000}
                  height={100}
                />
              )}
            </div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg line-clamp-1">
                  {event.title}
                </CardTitle>
                <Badge
                  variant={
                    event.status === "active"
                      ? "default"
                      : event.status === "pending"
                      ? "secondary"
                      : "outline"
                  }
                  className={event.status === "active" ? "bg-[#00453e]" : ""}
                >
                  {event.status}
                </Badge>
              </div>
              <CardDescription>{event.category}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(event.event_date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span className="line-clamp-1">{event.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Users className="h-4 w-4" />
                  <span>{event.ticket_count || 0} ticket types available</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t">
                <span className="font-semibold text-[#00453e]">
                  ৳{event.price}
                </span>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleUpdateEvent(event)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 bg-transparent"
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900">
              {totalEvents}
            </div>
            <p className="text-sm text-gray-600">Total Events</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {activeEvents}
            </div>
            <p className="text-sm text-gray-600">Active Events</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {pendingEvents}
            </div>
            <p className="text-sm text-gray-600">Pending Approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-600">
              {draftEvents}
            </div>
            <p className="text-sm text-gray-600">Draft Events</p>
          </CardContent>
        </Card>
      </div>

      {/* Create Event Modal */}
      <CreateEventModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(result) => {
          console.log("Event created successfully:", result);
          // You can add logic here to refresh the events list
          // or add the new event to the current list
        }}
      />

      {/* Update Event Modal */}
      <UpdateEventModal
        isOpen={isUpdateModalOpen}
        onClose={() => {
          setIsUpdateModalOpen(false);
          setSelectedEvent(null);
        }}
        onSuccess={(result) => {
          console.log("Event updated successfully:", result);
          window.location.reload();
        }}
        event={selectedEvent}
      />
    </div>
  );
}
