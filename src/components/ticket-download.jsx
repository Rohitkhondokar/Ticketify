"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, Ticket } from "lucide-react";

export default function TicketGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);

  // Sample ticket data - you can modify this or make it dynamic
  const ticketData = {
    id: "1",
    ticketNumber: "TKT-2025-001",
    eventName: "Concert Night",
    date: "Jan 15, 2025",
    venue: "Music Hall",
    price: "$50.00",
  };

  const generateQRCode = (text) => {
    // Using QR Server API for QR code generation
    return `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${encodeURIComponent(
      text
    )}`;
  };

  const generateTicketImage = async () => {
    setIsGenerating(true);

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
      ctx.fillText(ticketData.eventName, 40, 60);

      // Ticket number
      ctx.font = "14px Arial";
      ctx.fillStyle = "#64748b";
      ctx.fillText(`Ticket: ${ticketData.ticketNumber}`, 40, 85);

      // Date and venue
      ctx.font = "16px Arial";
      ctx.fillStyle = "#1e293b";
      ctx.fillText(`Date: ${ticketData.date}`, 40, 110);
      ctx.fillText(`Venue: ${ticketData.venue}`, 40, 130);

      // Price
      ctx.font = "bold 18px Arial";
      ctx.fillStyle = "#059669";
      ctx.fillText(ticketData.price, 40, 155);

      // QR Code section
      const qrUrl = generateQRCode(`localhost:3000/${ticketData.id}`);
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
          link.download = `ticket-${ticketData.ticketNumber}.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          URL.revokeObjectURL(url);
        }
      }, "image/png");
    } catch (error) {
      console.error("Error generating ticket:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Ticket Preview */}
      <Card
        className="w-[600px] h-[200px] relative overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
        onClick={generateTicketImage}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 p-5">
          <div className="bg-white h-full rounded-lg p-6 flex">
            {/* Main ticket content */}
            <div className="flex-1 space-y-2">
              <h2 className="text-2xl font-bold text-gray-800">
                {ticketData.eventName}
              </h2>
              <p className="text-sm text-gray-500">
                Ticket: {ticketData.ticketNumber}
              </p>
              <div className="space-y-1">
                <p className="text-gray-700">Date: {ticketData.date}</p>
                <p className="text-gray-700">Venue: {ticketData.venue}</p>
                <p className="text-xl font-bold text-green-600">
                  {ticketData.price}
                </p>
              </div>
            </div>

            {/* Perforated line */}
            <div className="w-px bg-gray-300 mx-4 relative">
              <div
                className="absolute inset-y-0 w-px bg-gray-300"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, #cbd5e1 3px, #cbd5e1 8px)",
                }}
              ></div>
            </div>

            {/* QR Code section */}
            <div className="w-24 flex flex-col items-center justify-center space-y-2">
              <div className="w-20 h-20 bg-gray-100 border border-gray-200 rounded flex items-center justify-center">
                <img
                  src={generateQRCode(
                    `localhost:3000/${ticketData.id || "/placeholder.svg"}`
                  )}
                  alt="QR Code"
                  className="w-16 h-16"
                />
              </div>
              <p className="text-xs text-gray-500 text-center">
                Scan to verify
              </p>
            </div>
          </div>
        </div>

        {/* Click indicator */}
        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-5 transition-all duration-200 flex items-center justify-center">
          <div className="opacity-0 hover:opacity-100 transition-opacity duration-200 bg-white bg-opacity-90 rounded-full p-3">
            <Download className="w-6 h-6 text-gray-700" />
          </div>
        </div>
      </Card>

      {/* Generate button */}
      <div className="text-center">
        <Button
          onClick={generateTicketImage}
          disabled={isGenerating}
          size="lg"
          className="w-full max-w-md"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
              Generating Ticket...
            </>
          ) : (
            <>
              <Ticket className="w-4 h-4 mr-2" />
              Generate & Download Ticket
            </>
          )}
        </Button>
        <p className="text-sm text-gray-500 mt-2">
          Click the ticket above or this button to generate and download
        </p>
      </div>
    </div>
  );
}
