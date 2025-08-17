"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { TicketHeader } from "@/components/ticket-header";
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
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Calendar,
  MapPin,
  User,
  Shield,
  CheckCircle,
  Clock,
} from "lucide-react";
import { getEventById, createOrder } from "../../../../../action/adminActions";

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [event, setEvent] = useState(null);
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    postal: "",
    country: "bd",
    quantity: 1,
    terms: false,
    marketing: false,
  });

  useEffect(() => {
    loadEventData();
  }, []);

  const loadEventData = async () => {
    try {
      setLoading(true);

      // First check localStorage for existing checkout data
      const storedData = localStorage.getItem("checkoutData");
      let eventId = searchParams.get("eventId");
      let ticketId = searchParams.get("ticketId");

      if (storedData) {
        const parsedData = JSON.parse(storedData);
        // If we have stored data and no URL params, use stored data
        if (!eventId) {
          eventId = parsedData.eventId;
          ticketId = parsedData.ticketId;
        } else {
          // If we have new URL params, update localStorage
          const checkoutData = {
            eventId: eventId,
            ticketId: ticketId,
            timestamp: Date.now(),
          };
          localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
        }
      }

      // If still no eventId, redirect to home
      if (!eventId) {
        router.push("/");
        return;
      }

      const result = await getEventById(eventId);
      if (result.success) {
        const eventData = result.data;
        setEvent(eventData);

        // Find the specific ticket
        let foundTicket = null;
        if (ticketId && eventData.tickets) {
          foundTicket = eventData.tickets.find((t) => t.id == ticketId);
        }

        if (!foundTicket && eventData.tickets && eventData.tickets.length > 0) {
          foundTicket = eventData.tickets[0];
        }

        setTicket(foundTicket);

        // Update localStorage with complete data
        const checkoutData = {
          eventId: eventId,
          ticketId: ticketId,
          event: eventData,
          ticket: foundTicket,
          timestamp: Date.now(),
        };
        localStorage.setItem("checkoutData", JSON.stringify(checkoutData));
      } else {
        // If event not found, clear localStorage and redirect
        localStorage.removeItem("checkoutData");
        router.push("/");
      }
    } catch (error) {
      console.error("Error loading event:", error);
      localStorage.removeItem("checkoutData");
      router.push("/");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const calculateTotal = () => {
    if (!ticket) return 0;
    const subtotal = ticket.price * formData.quantity;
    const serviceFee = subtotal * 0.05;
    return subtotal + serviceFee;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.terms) {
      alert("Please accept the terms and conditions");
      return;
    }

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.city ||
      !formData.postal
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      // Create order data
      const orderData = {
        eventId: event.id,
        ticketId: ticket.id,
        quantity: formData.quantity,
        totalAmount: calculateTotal(),
        customerInfo: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
          postal: formData.postal,
          country: formData.country,
        },
        paymentMethod: "Bkash",
        status: "confirmed",
        marketingConsent: formData.marketing,
      };

      // Send order to backend
      const result = await createOrder(orderData);

      if (!result.success) {
        throw new Error(result.message || "Failed to create order");
      }

      // Show success popup
      setShowSuccess(true);

      // Clear localStorage and redirect after 5 seconds
      setTimeout(() => {
        localStorage.removeItem("checkoutData");
        router.push("/");
      }, 5000);
    } catch (error) {
      console.error("Error creating order:", error);
      alert("There was an error processing your order. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center h-64">
            <div className="text-lg">Loading checkout...</div>
          </div>
        </div>
      </div>
    );
  }

  if (!event || !ticket) {
    return (
      <div className="min-h-screen bg-gray-50">
        <TicketHeader />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">
              Event Not Found
            </h2>
            <p className="text-gray-600 mb-6">
              The event you're trying to purchase is not available.
            </p>
            <Button onClick={() => router.push("/")}>Go to Home</Button>
          </div>
        </div>
      </div>
    );
  }

  const subtotal = ticket.price * formData.quantity;
  const serviceFee = subtotal * 0.05;
  const total = subtotal + serviceFee;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your ticket purchase</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Contact Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Contact Information
                  </CardTitle>
                  <CardDescription>
                    We'll use this information to send you your tickets
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange("firstName", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        placeholder="Smith"
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange("lastName", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john.smith@email.com"
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+880 1234 567890"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      required
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Delivery Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Information
                  </CardTitle>
                  <CardDescription>
                    Where should we deliver your tickets?
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      placeholder="123 Main Street"
                      value={formData.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        placeholder="Dhaka"
                        value={formData.city}
                        onChange={(e) =>
                          handleInputChange("city", e.target.value)
                        }
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="postal">Postal Code *</Label>
                      <Input
                        id="postal"
                        placeholder="1200"
                        value={formData.postal}
                        onChange={(e) =>
                          handleInputChange("postal", e.target.value)
                        }
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country *</Label>
                    <Select
                      value={formData.country}
                      onValueChange={(value) =>
                        handleInputChange("country", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bd">Bangladesh</SelectItem>
                        <SelectItem value="in">India</SelectItem>
                        <SelectItem value="pk">Pakistan</SelectItem>
                        <SelectItem value="lk">Sri Lanka</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Quantity Selection */}
              <Card>
                <CardHeader>
                  <CardTitle>Ticket Quantity</CardTitle>
                  <CardDescription>
                    How many tickets would you like to purchase?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <Label htmlFor="quantity">Quantity *</Label>
                    <Select
                      value={formData.quantity.toString()}
                      onValueChange={(value) =>
                        handleInputChange("quantity", parseInt(value))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {[...Array(Math.min(10, ticket.quantity))].map(
                          (_, i) => (
                            <SelectItem key={i + 1} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <p className="text-sm text-gray-500">
                      Available: {ticket.quantity} tickets
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Terms and Conditions */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="terms"
                        checked={formData.terms}
                        onCheckedChange={(checked) =>
                          handleInputChange("terms", checked)
                        }
                      />
                      <Label
                        htmlFor="terms"
                        className="text-sm leading-relaxed"
                      >
                        I agree to the{" "}
                        <a href="#" className="text-[#00453e] hover:underline">
                          Terms and Conditions
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-[#00453e] hover:underline">
                          Privacy Policy
                        </a>
                      </Label>
                    </div>
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="marketing"
                        checked={formData.marketing}
                        onCheckedChange={(checked) =>
                          handleInputChange("marketing", checked)
                        }
                      />
                      <Label
                        htmlFor="marketing"
                        className="text-sm leading-relaxed"
                      >
                        I would like to receive marketing communications about
                        future events and offers
                      </Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Event Details */}
                    <div className="space-y-3">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-medium text-sm">
                              {event.title}
                            </h4>
                            <Badge variant="secondary" className="text-xs mt-1">
                              {ticket.type}
                            </Badge>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">
                              ৳{(ticket.price * formData.quantity).toFixed(2)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {formData.quantity} × ৳{ticket.price}
                            </div>
                          </div>
                        </div>
                        <div className="text-xs text-gray-600">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>
                              {new Date(event.event_date).toLocaleDateString()}{" "}
                              at {event.start_time}
                            </span>
                          </div>
                          <div className="flex items-center gap-1 mt-1">
                            <MapPin className="h-3 w-3" />
                            <span>{event.location}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Price Breakdown */}
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>৳{subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Service Fee</span>
                        <span>৳{serviceFee.toFixed(2)}</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total</span>
                        <span className="text-[#00453e]">
                          ৳{total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <Separator />

                    {/* Delivery Info */}
                    <div className="bg-blue-50 p-3 rounded-lg">
                      <div className="flex items-center gap-2 text-blue-800">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium">Cash on Delivery</span>
                      </div>
                      <p className="text-xs text-blue-600 mt-1">
                        Pay when you receive your tickets (5-9 minutes delivery)
                      </p>
                    </div>

                    <Separator />

                    {/* Complete Purchase Button */}
                    <Button
                      type="submit"
                      className="w-full bg-[#00453e] hover:bg-[#003530]"
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Complete Purchase
                    </Button>

                    {/* Security Info */}
                    <div className="text-center space-y-2">
                      <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                        <Shield className="h-3 w-3" />
                        <span>Secure transaction</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        Your information is safe and secure
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog open={showSuccess} onOpenChange={setShowSuccess}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-6 w-6" />
              Purchase Successful!
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-gray-600">
              Your ticket purchase has been confirmed. You will receive your
              tickets within 5-9 minutes via cash on delivery.
            </p>
            <div className="bg-green-50 p-3 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>Order Details:</strong>
                <br />
                Event: {event.title}
                <br />
                Ticket: {ticket.type}
                <br />
                Quantity: {formData.quantity}
                <br />
                Total: ৳{total.toFixed(2)}
                <br />
                Payment: Cash on Delivery
              </p>
            </div>
            <div className="bg-blue-50 p-3 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Delivery Information:</strong>
                <br />
                {formData.firstName} {formData.lastName}
                <br />
                {formData.address}, {formData.city} {formData.postal}
                <br />
                Phone: {formData.phone}
              </p>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Redirecting to home page in 5 seconds...
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
