"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  MapPin,
  Clock,
  Ticket,
  FileText,
  ImageIcon,
} from "lucide-react";
import Link from "next/link";

import Image from "next/image";
import { getUserTickets } from "../../../action/adminActions";

// QR Code component using a simple QR code generator
const QRCodeGenerator = ({ value, size = 96 }) => {
  const [qrCodeUrl, setQrCodeUrl] = useState("");

  useEffect(() => {
    // Using QR Server API to generate QR code
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(
      value
    )}`;
    setQrCodeUrl(qrUrl);
  }, [value, size]);

  return (
    <div className="flex flex-col items-center">
      {qrCodeUrl ? (
        <img
          src={qrCodeUrl || "/placeholder.svg"}
          alt="QR Code"
          className="w-24 h-24 border rounded"
        />
      ) : (
        <div className="w-24 h-24 bg-gray-200 flex items-center justify-center rounded">
          <span className="text-xs text-gray-500">Loading...</span>
        </div>
      )}
    </div>
  );
};

export default function UserTicketsPage({ user }) {
  const [tickets, setTickets] = useState([]);
  console.log(tickets);

  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total_tickets: 0,
    active_tickets: 0,
    used_tickets: 0,
    total_spent: 0,
  });

  useEffect(() => {
    loadTickets();
  }, []);

  const loadTickets = async () => {
    try {
      setLoading(true);
      const userId = user.id;
      const result = await getUserTickets(1);

      if (result.success) {
        setTickets(result.data);

        const totalTickets = result.data.length;
        const activeTickets = result.data.filter(
          (t) => t.status === "active"
        ).length;
        const usedTickets = result.data.filter(
          (t) => t.status === "used"
        ).length;
        const totalSpent = result.data.reduce(
          (sum, t) => sum + (Number.parseFloat(t.price) || 0),
          0
        );

        setStats({
          total_tickets: totalTickets,
          active_tickets: activeTickets,
          used_tickets: usedTickets,
          total_spent: totalSpent,
        });
      }
    } catch (error) {
      console.error("Error loading tickets:", error);
    } finally {
      setLoading(false);
    }
  };

  const generateQRCode = (text) => {
    // Using QR Server API for QR code generation
    return `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
      text
    )}`;
  };

  const handleDownload = async (ticketData, format = "image") => {
    console.log(ticketData, format);

    if (format === "pdf") {
      await generatePDF(ticketData);
    } else {
      await generateImage(ticketData);
    }
  };

  const generatePDF = async (ticketData) => {
    try {
      // Dynamically import jsPDF to avoid SSR issues
      const { jsPDF } = await import("jspdf");

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: [210, 100], // Custom ticket size
      });

      // Background gradient effect (using rectangles)
      doc.setFillColor(102, 126, 234);
      doc.rect(0, 0, 210, 100, "F");

      doc.setFillColor(118, 75, 162);
      doc.rect(105, 0, 105, 100, "F");

      // White ticket body
      doc.setFillColor(255, 255, 255);
      doc.rect(10, 10, 190, 80, "F");

      // Ticket border
      doc.setDrawColor(226, 232, 240);
      doc.setLineWidth(0.5);
      doc.rect(10, 10, 190, 80);

      // Perforated line
      doc.setDrawColor(203, 213, 225);
      doc.setLineDashPattern([2, 2], 0);
      doc.line(150, 10, 150, 90);
      doc.setLineDashPattern([], 0);

      // Event title
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(20);
      doc.setFont(undefined, "bold");
      doc.text(ticketData.event_title || ticketData.title, 20, 30);

      // Ticket number
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(10);
      doc.setFont(undefined, "normal");
      doc.text(`Ticket: ${ticketData.ticket_number || ticketData.id}`, 20, 40);

      // Date and venue
      doc.setTextColor(30, 41, 59);
      doc.setFontSize(12);
      doc.text(`Date: ${ticketData.event_date || ticketData.date}`, 20, 50);
      doc.text(`Venue: ${ticketData.location}`, 20, 60);
      doc.text(`Time: ${ticketData.start_time || "TBD"}`, 20, 70);

      // Price
      doc.setTextColor(5, 150, 105);
      doc.setFontSize(14);
      doc.setFont(undefined, "bold");
      doc.text(`৳${ticketData.price}`, 20, 82);

      // QR Code section
      doc.setFillColor(248, 250, 252);
      doc.rect(160, 20, 40, 40, "F");
      doc.setDrawColor(226, 232, 240);
      doc.rect(160, 20, 40, 40);

      // QR Code placeholder text (since we can't easily embed the actual QR image in jsPDF)
      doc.setTextColor(100, 116, 139);
      doc.setFontSize(8);
      doc.text("QR Code", 175, 35);
      doc.text("Scan to verify", 170, 45);
      doc.text(`ID: ${ticketData.id}`, 172, 55);

      // Status badge
      doc.setFillColor(34, 197, 94);
      doc.rect(160, 65, 25, 8, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(8);
      doc.text(ticketData.status.toUpperCase(), 165, 71);

      // Download the PDF
      doc.save(`ticket-${ticketData.ticket_number || ticketData.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Error generating PDF. Please try again.");
    }
  };

  const generateImage = async (ticketData) => {
    try {
      // Create canvas element
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      if (!ctx) throw new Error("Canvas context not available");

      // Set canvas size (ticket dimensions)
      canvas.width = 600;
      canvas.height = 200;

      // Background gradient
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
      gradient.addColorStop(0, "#667eea");
      gradient.addColorStop(1, "#764ba2");
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // White ticket body
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(20, 20, canvas.width - 40, canvas.height - 40);

      // Ticket border
      ctx.strokeStyle = "#e2e8f0";
      ctx.lineWidth = 2;
      ctx.strokeRect(20, 20, canvas.width - 40, canvas.height - 40);

      // Perforated line
      ctx.setLineDash([5, 5]);
      ctx.strokeStyle = "#cbd5e1";
      ctx.beginPath();
      ctx.moveTo(450, 20);
      ctx.lineTo(450, canvas.height - 20);
      ctx.stroke();
      ctx.setLineDash([]);

      // Text styling
      ctx.fillStyle = "#1e293b";
      ctx.textAlign = "left";

      // Event name
      ctx.font = "bold 24px Arial";
      ctx.fillText(ticketData.event_title || ticketData.title, 40, 60);

      // Ticket number
      ctx.font = "14px Arial";
      ctx.fillStyle = "#64748b";
      ctx.fillText(
        `Ticket: ${ticketData.ticket_number || ticketData.id}`,
        40,
        85
      );

      // Date and venue
      ctx.font = "16px Arial";
      ctx.fillStyle = "#1e293b";
      ctx.fillText(
        `Date: ${ticketData.event_date || ticketData.date}`,
        40,
        110
      );
      ctx.fillText(`Venue: ${ticketData.location}`, 40, 130);

      // Price
      ctx.font = "bold 18px Arial";
      ctx.fillStyle = "#059669";
      ctx.fillText(`৳${ticketData.price}`, 40, 155);

      // QR Code section
      const qrUrl = generateQRCode(
        `${window.location.origin}/${ticketData.id}`
      );
      const qrImage = new Image();
      qrImage.crossOrigin = "anonymous";

      await new Promise((resolve, reject) => {
        qrImage.onload = () => {
          // QR code background
          ctx.fillStyle = "#f8fafc";
          ctx.fillRect(470, 40, 110, 110);
          ctx.strokeStyle = "#e2e8f0";
          ctx.strokeRect(470, 40, 110, 110);

          // Draw QR code
          ctx.drawImage(qrImage, 475, 45, 100, 100);

          // QR label
          ctx.fillStyle = "#64748b";
          ctx.font = "12px Arial";
          ctx.textAlign = "center";
          ctx.fillText("Scan to verify", 525, 165);

          resolve(null);
        };
        qrImage.onerror = reject;
        qrImage.src = qrUrl;
      });

      // Convert canvas to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = url;
          link.download = `ticket-${
            ticketData.ticket_number || ticketData.id
          }.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch (error) {
      console.error("Error generating ticket image:", error);
      alert("Error generating ticket image. Please try again.");
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
      case "active":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "used":
        return "bg-blue-500";
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
              {stats.total_tickets}
            </div>
            <p className="text-sm text-gray-600">Total Tickets</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-green-600">
              {stats.active_tickets}
            </div>
            <p className="text-sm text-gray-600">Active</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-blue-600">
              {stats.used_tickets}
            </div>
            <p className="text-sm text-gray-600">Used</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-[#00453e]">
              ৳{tickets[0]?.total_amount?.toLocaleString() || 0}
            </div>
            <p className="text-sm text-gray-600">Total Spent</p>
          </CardContent>
        </Card>
      </div>

      {/* Tickets List */}
      <div className="space-y-6">
        {tickets.length > 0 ? (
          tickets.map((ticket) => (
            <Card key={ticket.id} className="overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Event Image */}
                <div className="lg:col-span-1">
                  {ticket.image_url && (
                    <div className="bg-gray-200">
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${ticket.image_url}`}
                        alt={ticket.event_title}
                        width={600}
                        height={300}
                        className="w-full h-64 object-cover rounded-lg mb-6"
                      />
                    </div>
                  )}
                </div>

                {/* Ticket Details */}
                <div className="lg:col-span-2 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {ticket.event_title}
                      </h3>
                      <Badge className={getStatusColor(ticket.status)}>
                        {ticket.status}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#00453e]">
                        ৳{ticket.price}
                      </div>
                      <div className="text-sm text-gray-500">
                        Ticket #{ticket.ticket_number}
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
                      <span>{ticket.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Ticket className="h-4 w-4" />
                      <span>{ticket.ticket_type}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Clock className="h-4 w-4" />
                      <span>Purchased {formatDate(ticket.purchase_date)}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link href={`/user/tickets/${ticket.id}`}>
                      <Button className="bg-[#00453e] hover:bg-[#003530]">
                        View Ticket
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => handleDownload(ticket, "pdf")}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      PDF
                    </Button>
                    <Button
                      variant="outline"
                      className="bg-transparent"
                      onClick={() => handleDownload(ticket, "image")}
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      Image
                    </Button>
                  </div>
                </div>

                <div className="lg:col-span-1 p-6 border-l">
                  <div className="text-center">
                    <QRCodeGenerator
                      value={`${window.location.origin}/${ticket.id}`}
                      size={96}
                    />
                    <p className="text-sm text-gray-600 mb-2 mt-3">QR Code</p>
                    <p className="text-xs text-gray-500">Scan to view ticket</p>
                    <p className="text-xs text-gray-400 mt-1">
                      ID: {ticket.id}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="text-center py-12">
            <CardContent>
              <Ticket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No tickets yet
              </h3>
              <p className="text-gray-600 mb-4">
                Start exploring events and book your first ticket!
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
