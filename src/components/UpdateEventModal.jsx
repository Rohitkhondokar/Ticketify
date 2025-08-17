"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X, Upload } from "lucide-react";
import { updateEvent } from "../../action/eventActions";

export default function UpdateEventModal({ isOpen, onClose, onSuccess, event }) {
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState([
    { type: "", price: "", quantity: "", features: "" },
  ]);
  const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    location: "",
    event_date: "",
    start_time: "",
    end_time: "",
    price: "",
    capacity: "",
  });

  // Load event data when modal opens
  useEffect(() => {
    if (event && isOpen) {
      setFormData({
        title: event.title || "",
        description: event.description || "",
        category: event.category || "",
        location: event.location || "",
        event_date: event.event_date ? event.event_date.split('T')[0] : "",
        start_time: event.start_time || "",
        end_time: event.end_time || "",
        price: event.price || "",
        capacity: event.capacity || "",
      });

      // Load existing tickets if available
      if (event.tickets && event.tickets.length > 0) {
        setTickets(event.tickets.map(ticket => ({
          type: ticket.type || "",
          price: ticket.price || "",
          quantity: ticket.quantity || "",
          features: Array.isArray(ticket.features) ? ticket.features.join(', ') : ticket.features || "",
        })));
      } else {
        setTickets([{ type: "", price: "", quantity: "", features: "" }]);
      }

      // Set image preview if available
      if (event.image_url) {
        setImagePreview(`http://localhost:5000${event.image_url}`);
      }
    }
  }, [event, isOpen]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const addTicket = () => {
    setTickets([
      ...tickets,
      { type: "", price: "", quantity: "", features: "" },
    ]);
  };

  const removeTicket = (index) => {
    if (tickets.length > 1) {
      setTickets(tickets.filter((_, i) => i !== index));
    }
  };

  const updateTicket = (index, field, value) => {
    const newTickets = [...tickets];
    newTickets[index][field] = value;
    setTickets(newTickets);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const eventData = {
        ...formData,
        tickets: tickets.filter(ticket => ticket.type && ticket.price && ticket.quantity)
      };

      const result = await updateEvent(event.id, eventData);

      if (result.success) {
        onSuccess(result);
        onClose();
      } else {
        alert(result.message || "Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      alert("Failed to update event");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Update Event</DialogTitle>
          <DialogDescription>
            Update the details of your event. You can modify ticket types and pricing.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Event Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                placeholder="Enter event title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={formData.category} onValueChange={(value) => handleInputChange('category', value)} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sports">Sports</SelectItem>
                  <SelectItem value="Music">Music</SelectItem>
                  <SelectItem value="Technology">Technology</SelectItem>
                  <SelectItem value="Business">Business</SelectItem>
                  <SelectItem value="Education">Education</SelectItem>
                  <SelectItem value="Entertainment">Entertainment</SelectItem>
                  <SelectItem value="Food & Drink">Food & Drink</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                placeholder="Enter event location"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event_date">Event Date *</Label>
              <Input
                id="event_date"
                type="date"
                value={formData.event_date}
                onChange={(e) => handleInputChange('event_date', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="start_time">Start Time *</Label>
              <Input
                id="start_time"
                type="time"
                value={formData.start_time}
                onChange={(e) => handleInputChange('start_time', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="end_time">End Time *</Label>
              <Input
                id="end_time"
                type="time"
                value={formData.end_time}
                onChange={(e) => handleInputChange('end_time', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Base Price *</Label>
              <Input
                id="price"
                type="number"
                min="0"
                step="0.01"
                placeholder="0.00"
                value={formData.price}
                onChange={(e) => handleInputChange('price', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="capacity">Capacity *</Label>
              <Input
                id="capacity"
                type="number"
                min="1"
                placeholder="Enter total capacity"
                value={formData.capacity}
                onChange={(e) => handleInputChange('capacity', e.target.value)}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your event..."
              rows={4}
              required
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label htmlFor="image">Event Image</Label>
            <div className="flex items-center gap-4">
              <Input
                id="image"
                name="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="flex-1"
              />
              {imagePreview && (
                <div className="relative">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-20 h-20 object-cover rounded"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 w-6 h-6 p-0"
                    onClick={() => {
                      setImagePreview(null);
                      document.getElementById("image").value = "";
                    }}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Tickets Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Ticket Types</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addTicket}
                className="flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Ticket Type
              </Button>
            </div>

            {tickets.map((ticket, index) => (
              <div key={index} className="border rounded-lg p-4 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium">Ticket Type {index + 1}</h4>
                  {tickets.length > 1 && (
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeTicket(index)}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label>Type Name *</Label>
                    <Input
                      placeholder="e.g., VIP, General, Premium"
                      value={ticket.type}
                      onChange={(e) =>
                        updateTicket(index, "type", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Price *</Label>
                    <Input
                      type="number"
                      min="0"
                      step="0.01"
                      placeholder="0.00"
                      value={ticket.price}
                      onChange={(e) =>
                        updateTicket(index, "price", e.target.value)
                      }
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Quantity *</Label>
                    <Input
                      type="number"
                      min="1"
                      placeholder="Available tickets"
                      value={ticket.quantity}
                      onChange={(e) =>
                        updateTicket(index, "quantity", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Features (comma-separated)</Label>
                  <Input
                    placeholder="e.g., VIP seating, Free drinks, Meet & Greet"
                    value={ticket.features}
                    onChange={(e) =>
                      updateTicket(index, "features", e.target.value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Updating..." : "Update Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
