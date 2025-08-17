import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, Download, Eye, Ban, CheckCircle } from "lucide-react";
import {
  getAllTickets,
  getDashboardStats,
} from "../../../../../action/adminActions";

export default async function AdminTicketsPage() {
  // Fetch tickets data and dashboard stats from backend
  const [ticketsResult, dashboardStats] = await Promise.all([
    getAllTickets(),
    getDashboardStats(),
  ]);

  const ticketsData = ticketsResult.success
    ? ticketsResult.data
    : { tickets: [], total: 0 };

  const stats = dashboardStats.success ? dashboardStats.data : {};

  // Calculate ticket statistics
  const ticketStats = {
    totalTickets: stats.total_tickets || 0,
    activeTickets:
      ticketsData.tickets?.filter((t) => t.status === "active").length || 0,
    usedTickets:
      ticketsData.tickets?.filter((t) => t.status === "used").length || 0,
    cancelledTickets:
      ticketsData.tickets?.filter((t) => t.status === "cancelled").length || 0,
    totalRevenue: stats.total_revenue || 0,
  };

  // Format tickets from database
  const tickets = (ticketsData.tickets || []).map((ticket) => ({
    id: ticket.id,
    eventName: ticket.event_title || "Unknown Event",
    customerName: ticket.buyer_name || "Unknown Buyer",
    customerEmail: ticket.buyer_email || "No email",
    ticketType: ticket.ticket_type_name || "Standard",
    quantity: ticket.quantity || 1,
    totalAmount: parseFloat(ticket.total_amount) || 0,
    status: ticket.status || "active",
    purchaseDate: ticket.created_at
      ? new Date(ticket.created_at).toLocaleDateString()
      : "Unknown Date",
    qrCode: `QR${ticket.id}`,
  }));

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "used":
        return "bg-blue-100 text-blue-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      case "expired":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Ticket Management
          </h1>
          <p className="text-gray-600">
            Manage all tickets across the platform
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Active Tickets
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {ticketStats.activeTickets}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Eye className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Used Tickets
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {ticketStats.usedTickets}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-red-100 rounded-lg">
                <Ban className="h-6 w-6 text-red-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Cancelled</p>
                <p className="text-2xl font-bold text-gray-900">
                  {ticketStats.cancelledTickets}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center">
              <div className="p-2 bg-[#00453e] rounded-lg">
                <CheckCircle className="h-6 w-6 text-white" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">
                  Total Revenue
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ৳{ticketStats.totalRevenue.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tickets Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Tickets</CardTitle>
          <CardDescription>
            Complete list of all tickets in the system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div className="min-w-[1000px]">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Ticket ID
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Event
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Customer
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Quantity
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Amount
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Status
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {tickets.map((ticket) => (
                    <tr key={ticket.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{ticket.id}</td>
                      <td className="py-3 px-4">
                        <div className="max-w-[200px]">
                          <p className="font-medium truncate">
                            {ticket.eventName}
                          </p>
                          <p className="text-sm text-gray-500">
                            {ticket.purchaseDate}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="max-w-[180px]">
                          <p className="font-medium truncate">
                            {ticket.customerName}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {ticket.customerEmail}
                          </p>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline">{ticket.ticketType}</Badge>
                      </td>
                      <td className="py-3 px-4">{ticket.quantity}</td>
                      <td className="py-3 px-4 font-medium">
                        ৳{ticket.totalAmount.toLocaleString()}
                      </td>
                      <td className="py-3 px-4">
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
