"use server";

// Create new event
export async function createEvent(formData) {
  try {
    const eventData = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      location: formData.get("location"),
      event_date: formData.get("event_date"),
      start_time: formData.get("start_time"),
      end_time: formData.get("end_time"),
      price: parseFloat(formData.get("price")),
      capacity: parseInt(formData.get("capacity")),
      vendor_id: formData.get("vendor_id") || "1", // Default vendor ID for now
    };

    // Get tickets data
    const tickets = [];
    const ticketTypes = formData.getAll("ticket_type");
    const ticketPrices = formData.getAll("ticket_price");
    const ticketQuantities = formData.getAll("ticket_quantity");
    const ticketFeatures = formData.getAll("ticket_features");

    for (let i = 0; i < ticketTypes.length; i++) {
      if (ticketTypes[i] && ticketPrices[i] && ticketQuantities[i]) {
        tickets.push({
          type: ticketTypes[i],
          price: parseFloat(ticketPrices[i]),
          quantity: parseInt(ticketQuantities[i]),
          features: ticketFeatures[i]
            ? ticketFeatures[i].split(",").map((f) => f.trim())
            : [],
        });
      }
    }

    // Create FormData for file upload
    const uploadData = new FormData();

    // Add event data
    Object.keys(eventData).forEach((key) => {
      uploadData.append(key, eventData[key]);
    });

    // Add tickets as JSON string
    uploadData.append("tickets", JSON.stringify(tickets));

    // Add image file if exists
    const imageFile = formData.get("image");
    if (imageFile && imageFile.size > 0) {
      uploadData.append("image", imageFile);
    }

    const response = await fetch("http://localhost:5000/api/events", {
      method: "POST",
      body: uploadData,
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to create event");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error creating event:", error);
    return {
      success: false,
      message: error.message || "Failed to create event",
    };
  }
}
export async function createVendor(vendorData) {
  try {
    const response = await fetch(`${API_BASE_URL}/vendors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vendorData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to create vendor",
      error: error.message,
    };
  }
}
// Get all events
export async function getAllEvents(filters = {}) {
  try {
    const queryParams = new URLSearchParams();
    Object.keys(filters).forEach((key) => {
      if (filters[key]) {
        queryParams.append(key, filters[key]);
      }
    });

    const response = await fetch(
      `http://localhost:5000/api/events?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch events");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching events:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch events",
    };
  }
}

// Get vendor events
export async function getVendorEvents(vendorId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/events/vendor/my-events?vendor_id=${vendorId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch vendor events");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching vendor events:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch vendor events",
    };
  }
}

// Get event by ID
export async function getEventById(id) {
  try {
    const response = await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch event");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching event:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch event",
    };
  }
}

// Update event
export async function updateEvent(id, eventData) {
  try {
    const response = await fetch(`http://localhost:5000/api/events/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update event");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error updating event:", error);
    return {
      success: false,
      message: error.message || "Failed to update event",
    };
  }
}

// Delete event
export async function deleteEvent(id, vendorId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/events/${id}?vendor_id=${vendorId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to delete event");
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.error("Error deleting event:", error);
    return {
      success: false,
      message: error.message || "Failed to delete event",
    };
  }
}

// Search events
export async function searchEvents(query) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/events/search?q=${encodeURIComponent(query)}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to search events");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error searching events:", error);
    return {
      success: false,
      message: error.message || "Failed to search events",
    };
  }
}

// Get event stats
export async function getEventStats(vendorId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/events/vendor/stats?vendor_id=${vendorId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch event stats");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching event stats:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch event stats",
    };
  }
}

// Get event earnings
export async function getEventEarnings(vendorId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/events/vendor/earnings?vendor_id=${vendorId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch event earnings");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching event earnings:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch event earnings",
    };
  }
}

// Get ticket sales analysis
export async function getTicketSalesAnalysis(vendorId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/events/vendor/sales-analysis?vendor_id=${vendorId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        throw new Error(
          "Too many requests. Please wait a moment and try again."
        );
      }
      throw new Error(
        result.message || "Failed to fetch ticket sales analysis"
      );
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching ticket sales analysis:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch ticket sales analysis",
    };
  }
}

// Get vendor withdrawals
export async function getVendorWithdrawals(vendorId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/withdrawals/vendor/${vendorId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch vendor withdrawals");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching vendor withdrawals:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch vendor withdrawals",
    };
  }
}

// Get withdrawal stats
export async function getWithdrawalStats(vendorId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/withdrawals/vendor/${vendorId}/stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch withdrawal stats");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching withdrawal stats:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch withdrawal stats",
    };
  }
}

// Create withdrawal request
export async function createWithdrawal(withdrawalData) {
  try {
    const response = await fetch(`http://localhost:5000/api/withdrawals`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(withdrawalData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to create withdrawal request");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error creating withdrawal request:", error);
    return {
      success: false,
      message: error.message || "Failed to create withdrawal request",
    };
  }
}

// Vendor Profile Actions
export async function getVendorById(vendorId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/vendors/${vendorId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch vendor");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching vendor:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch vendor",
    };
  }
}

export async function getVendorStats(vendorId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/vendors/${vendorId}/stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch vendor stats");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching vendor stats:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch vendor stats",
    };
  }
}

export async function updateVendor(vendorId, vendorData) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/vendors/${vendorId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vendorData),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update vendor");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error updating vendor:", error);
    return {
      success: false,
      message: error.message || "Failed to update vendor",
    };
  }
}

export async function getVendorWithEvents(vendorId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/vendors/${vendorId}/events`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch vendor with events");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching vendor with events:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch vendor with events",
    };
  }
}

// Ticket Actions
export async function getVendorSoldTickets(vendorId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/tickets/vendor/${vendorId}/sold`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch vendor sold tickets");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching vendor sold tickets:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch vendor sold tickets",
    };
  }
}

export async function getVendorTicketStats(vendorId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/tickets/vendor/${vendorId}/stats`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch vendor ticket stats");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching vendor ticket stats:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch vendor ticket stats",
    };
  }
}

export async function getVendorTicketStatsByStatus(vendorId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/tickets/vendor/${vendorId}/stats/status`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(
        result.message || "Failed to fetch vendor ticket stats by status"
      );
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching vendor ticket stats by status:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch vendor ticket stats by status",
    };
  }
}
