import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Clock,
  Ticket,
  Download,
  Share2,
  QrCode,
} from "lucide-react";
import Link from "next/link";
import {
  getVendorSoldTickets,
  getVendorTicketStatsByStatus,
} from "../../../../../action/eventActions";

export default async function SellerTicketsPage() {
  // Fetch data from backend
  const vendorId = "1"; // Default vendor ID for now
  const ticketsResult = await getVendorSoldTickets(vendorId);
  const statsResult = await getVendorTicketStatsByStatus(vendorId);

  const tickets = ticketsResult.success ? ticketsResult.data : [];
  const stats = statsResult.success ? statsResult.data : {};

  // Calculate totals
  const totalTickets = stats?.total_tickets || 0;
  const confirmedTickets = stats?.confirmed_tickets || 0;
  const pendingTickets = stats?.pending_tickets || 0;
  const totalRevenue = stats?.total_revenue || 0;

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

  const formatDate = (dateString) => {
    if (!dateString) return "Unknown Date";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (timeString) => {
    if (!timeString) return "Unknown Time";
    return timeString.substring(0, 5); // Extract HH:MM from HH:MM:SS
  };

  return (
    <div className="p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-gray-900">
              {totalTickets}
            </div>
            <p className="text-sm text-gray-600">Total Tickets</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {confirmedTickets}
            </div>
            <p className="text-sm text-gray-600">Confirmed</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-yellow-600">
              {pendingTickets}
            </div>
            <p className="text-sm text-gray-600">Pending</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-[#00453e]">
              ৳{(parseFloat(totalRevenue) || 0).toFixed(2)}
            </div>
            <p className="text-sm text-gray-600">Total Revenue</p>
          </CardContent>
        </Card>
      </div>

      {/* Tickets List */}
      <div className="space-y-6">
        {tickets.map((ticket) => (
          <Card key={ticket.id} className="overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Event Image */}
              <div className="lg:col-span-1">
                <div className="aspect-video lg:aspect-square bg-gray-200">
                  <img
                    src={ticket.image_url || "/placeholder.svg"}
                    alt={ticket.event_title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Ticket Details */}
              <div className="lg:col-span-2 p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-1">
                      {ticket.event_title || "Unknown Event"}
                    </h3>
                    <Badge className={getStatusColor(ticket.order_status)}>
                      {ticket.order_status || "unknown"}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-[#00453e]">
                      ৳{(parseFloat(ticket.total_amount) || 0).toFixed(2)}
                    </div>
                    <div className="text-sm text-gray-500">
                      {ticket.quantity || 1} tickets
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>
                      {formatDate(ticket.event_date)} at{" "}
                      {formatTime(ticket.start_time)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    <span>{ticket.venue || "Location not specified"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Ticket className="h-4 w-4" />
                    <span>{ticket.ticket_type || "Standard"}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="h-4 w-4" />
                    <span>Purchased {formatDate(ticket.purchase_date)}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600">
                    <strong>Buyer:</strong> {ticket.buyer_name || "Unknown"} (
                    {ticket.buyer_email || "No email"})
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Ticket Number:</strong>{" "}
                    {ticket.ticket_number || "N/A"}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <Link href={`/seller/tickets/${ticket.id}`}>
                    <Button className="bg-[#00453e] hover:bg-[#003530]">
                      View Ticket
                    </Button>
                  </Link>
                  <Button variant="outline" className="bg-transparent">
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="bg-transparent">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                  {ticket.order_status === "confirmed" && (
                    <Button variant="outline" className="bg-transparent">
                      Transfer
                    </Button>
                  )}
                </div>
              </div>

              {/* QR Code */}
              <div className="lg:col-span-1 p-6 border-l">
                <div className="text-center">
                  <div className="w-24 h-24 bg-gray-200 mx-auto mb-3 flex items-center justify-center rounded">
                    <QrCode className="h-12 w-12 text-gray-400" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">QR Code</p>
                  <p className="text-xs text-gray-500">
                    {ticket.ticket_number || "N/A"}
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="mt-2 bg-transparent"
                  >
                    Show QR
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Empty State (if no tickets) */}
      {tickets.length === 0 && (
        <Card className="text-center py-12">
          <CardContent>
            <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No tickets sold yet
            </h3>
            <p className="text-gray-600 mb-4">
              Start creating events and selling tickets to see them here!
            </p>
            <Link href="/seller/events">
              <Button className="bg-[#00453e] hover:bg-[#003530]">
                Create Event
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
