"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  CheckCircle,
  Calendar,
  MapPin,
  Clock,
  Users,
  User,
  Phone,
  Mail,
} from "lucide-react";
import Link from "next/link";
import { getEventById } from "../../../../../action/adminActions";
import { TicketHeader } from "@/components/ticket-header";

export default function EventDetailsPage() {
  const params = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  console.log(event);

  useEffect(() => {
    loadEvent();
  }, [params.id]);

  const loadEvent = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await getEventById(params.id);
      if (result.success) {
        setEvent(result.data);
      } else {
        setError(result.message || "Failed to load event");
      }
    } catch (error) {
      console.error("Error loading event:", error);
      setError("Error loading event");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading event...</div>
        </div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div>
        <div className="container mx-auto py-12 text-center">
          <h2 className="text-4xl font-bold text-destructive">
            Event Not Found
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The event you are looking for does not exist.
          </p>
          <Button asChild className="mt-6">
            <a href="/">Go to Home</a>
          </Button>
        </div>
      </div>
    );
  }

  // Format event date
  const formatDate = (dateString) => {
    if (!dateString) return "TBD";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (startTime, endTime) => {
    if (!startTime) return "TBD";
    if (!endTime) return startTime;
    return `${startTime} - ${endTime}`;
  };

  return (
    <div className="">
      <TicketHeader />
      <div className="container mx-auto py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {/* Smaller Event Image */}
            <Image
              src={
                event.image_url
                  ? `${
                      process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
                    }${event.image_url}`
                  : "/placeholder.avif"
              }
              alt={event.title}
              width={600}
              height={300}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />

            {/* Event Title and Basic Info */}
            <h2 className="text-4xl font-bold mb-2">{event.title}</h2>
            <p className="text-lg text-muted-foreground mb-4">
              {formatDate(event.event_date)} |{" "}
              {formatTime(event.start_time, event.end_time)} | {event.location}
            </p>
            <Badge variant="secondary" className="mb-6">
              {event.category}
            </Badge>

            {/* Event Description */}
            <p className="text-gray-800 leading-relaxed mb-8">
              {event.description}
            </p>

            {/* Additional Event Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Event Details Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Event Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Date</p>
                      <p className="text-sm text-gray-600">
                        {formatDate(event.event_date)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Time</p>
                      <p className="text-sm text-gray-600">
                        {formatTime(event.start_time, event.end_time)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Venue</p>
                      <p className="text-sm text-gray-600">
                        {event.location || "Location TBD"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Capacity</p>
                      <p className="text-sm text-gray-600">
                        {event.capacity || "Unlimited"} tickets
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Organizer Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-xl">Organizer</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="font-medium">Name</p>
                      <p className="text-sm text-gray-600">
                        {event.vendor_name || "Unknown"}
                      </p>
                    </div>
                  </div>

                  {event.vendor_email && (
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Email</p>
                        <p className="text-sm text-gray-600">
                          {event.vendor_email}
                        </p>
                      </div>
                    </div>
                  )}

                  {event.vendor_phone && (
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-gray-500" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <p className="text-sm text-gray-600">
                          {event.vendor_phone}
                        </p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Event Status and Stats */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="text-xl">Event Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Badge
                      variant={
                        event.status === "active" ? "default" : "secondary"
                      }
                      className={
                        event.status === "active"
                          ? "bg-green-100 text-green-800"
                          : ""
                      }
                    >
                      {event.status}
                    </Badge>
                    <span className="text-sm text-gray-600">
                      {event.status === "active"
                        ? "Event is live and accepting bookings"
                        : "Event is not currently active"}
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Ticket Types</p>
                    <p className="text-2xl font-bold text-primary">
                      {event.tickets ? event.tickets.length : 1}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold mb-4">Ticket Options</h3>
            <div className="grid gap-4">
              {event.tickets && event.tickets.length > 0 ? (
                event.tickets.map((ticket) => (
                  <Card key={ticket.id} className="border-2 border-primary/20">
                    <CardHeader>
                      <CardTitle className="text-xl">{ticket.type}</CardTitle>
                      <CardDescription className="text-2xl font-bold text-primary">
                        ৳{ticket.price}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      {ticket.features && ticket.features.length > 0 ? (
                        <ul className="space-y-2 text-sm text-gray-700">
                          {ticket.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500" />
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-sm text-gray-500 mb-4">
                          Standard access included
                        </p>
                      )}
                      <p className="mt-4 text-sm text-muted-foreground">
                        Available: {ticket.quantity} tickets
                      </p>
                      <Button asChild className="w-full mt-6">
                        <Link
                          href={`/tickets/checkout?eventId=${event.id}&ticketId=${ticket.id}`}
                        >
                          Buy {ticket.type} Ticket
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                ))
              ) : (
                // Fallback if no tickets are configured
                <Card className="border-2 border-primary/20">
                  <CardHeader>
                    <CardTitle className="text-xl">General Admission</CardTitle>
                    <CardDescription className="text-2xl font-bold text-primary">
                      ৳{event.price || 0}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 text-sm text-gray-700">
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>Access to general stands</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        <span>First-come, first-served seating</span>
                      </li>
                    </ul>
                    <p className="mt-4 text-sm text-muted-foreground">
                      Available: {event.capacity || 0} tickets
                    </p>
                    <Button asChild className="w-full mt-6">
                      <Link
                        href={`/tickets/checkout?eventId=${event.id}&ticketType=general`}
                      >
                        Buy Ticket
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
