"use server";

// Get admin dashboard statistics
export async function getDashboardStats() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/admin/dashboard/stats",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch dashboard stats");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching admin dashboard stats:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch dashboard stats",
    };
  }
}

// Alias for getDashboardStats - for backward compatibility
export const getAdminDashboardStats = getDashboardStats;

// Get admin analytics
export async function getAdminAnalytics() {
  try {
    const response = await fetch("http://localhost:5000/api/admin/analytics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch analytics");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching admin analytics:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch analytics",
    };
  }
}

// Get all users with pagination and filters
export async function getAllUsers(
  page = 1,
  limit = 10,
  search = "",
  status = ""
) {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
      status,
    });

    const response = await fetch(
      `http://localhost:5000/api/admin/users?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch users");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching users:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch users",
    };
  }
}

// Update user status
export async function updateUserStatus(userId, status) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/admin/users/${userId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update user status");
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.error("Error updating user status:", error);
    return {
      success: false,
      message: error.message || "Failed to update user status",
    };
  }
}

// Get all vendors with pagination and filters
export async function getAllVendors(
  page = 1,
  limit = 10,
  search = "",
  status = ""
) {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
      status,
    });

    const response = await fetch(
      `http://localhost:5000/api/admin/vendors?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch vendors");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching vendors:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch vendors",
    };
  }
}

// Update vendor status
export async function updateVendorStatus(vendorId, status) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/admin/vendors/${vendorId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update vendor status");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error updating vendor status:", error);
    return {
      success: false,
      message: error.message || "Failed to update vendor status",
    };
  }
}

// Create new vendor/organizer
// export async function createVendor(vendorData) {
//   try {
//     const response = await fetch("http://localhost:5000/api/vendors", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(vendorData),
//     });

//     const result = await response.json();

//     if (!response.ok) {
//       throw new Error(result.message || "Failed to create vendor");
//     }

//     return {
//       success: true,
//       data: result.data,
//       message: result.message,
//     };
//   } catch (error) {
//     console.error("Error creating vendor:", error);
//     return {
//       success: false,
//       message: error.message || "Failed to create vendor",
//     };
//   }
// }

// Get all events with pagination and filters
export async function getAllEvents(
  page = 1,
  limit = 10,
  search = "",
  status = "",
  category = ""
) {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
      status,
      category,
    });

    const response = await fetch(
      `http://localhost:5000/api/admin/events?${queryParams}`,
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

// Update event status
export async function updateEventStatus(eventId, status) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/admin/events/${eventId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update event status");
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.error("Error updating event status:", error);
    return {
      success: false,
      message: error.message || "Failed to update event status",
    };
  }
}

// Get all tickets with pagination and filters
export async function getAllTickets(
  page = 1,
  limit = 10,
  search = "",
  status = ""
) {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      search,
      status,
    });

    const response = await fetch(
      `http://localhost:5000/api/admin/tickets?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch tickets");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching tickets:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch tickets",
    };
  }
}

// Get all payments and withdrawals
export async function getAllPayments(page = 1, limit = 10, type = "all") {
  try {
    const queryParams = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      type,
    });

    const response = await fetch(
      `http://localhost:5000/api/admin/payments?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch payments");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching payments:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch payments",
    };
  }
}

// Update withdrawal status
export async function updateWithdrawalStatus(withdrawalId, status) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/admin/withdrawals/${withdrawalId}/status`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update withdrawal status");
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.error("Error updating withdrawal status:", error);
    return {
      success: false,
      message: error.message || "Failed to update withdrawal status",
    };
  }
}

// Get system settings
export async function getSystemSettings() {
  try {
    const response = await fetch("http://localhost:5000/api/admin/settings", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch settings");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching settings:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch settings",
    };
  }
}

// Update system settings
export async function updateSystemSettings(settings) {
  try {
    const response = await fetch("http://localhost:5000/api/admin/settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(settings),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to update settings");
    }

    return {
      success: true,
      message: result.message,
    };
  } catch (error) {
    console.error("Error updating settings:", error);
    return {
      success: false,
      message: error.message || "Failed to update settings",
    };
  }
}

// Get system statistics
export async function getSystemStatistics() {
  try {
    const response = await fetch("http://localhost:5000/api/admin/statistics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch system statistics");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error fetching system statistics:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch system statistics",
    };
  }
}

// Get public events for frontend
export async function getPublicEvents() {
  try {
    const response = await fetch(
      "http://localhost:5000/api/events?status=active",
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
    console.error("Error fetching public events:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch events",
    };
  }
}

// Get single event by ID for frontend
export async function getEventById(eventId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/events/${eventId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

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
    console.error("Error fetching event by ID:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch event",
    };
  }
}

// Create order for frontend
export async function createOrder(orderData) {
  try {
    const response = await fetch("http://localhost:5000/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.message || "Failed to create order");
    }

    return {
      success: true,
      data: result.data,
      message: result.message,
    };
  } catch (error) {
    console.error("Error creating order:", error);
    return {
      success: false,
      message: error.message || "Failed to create order",
    };
  }
}

// Get user tickets
export async function getUserTickets(userId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/tickets/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch user tickets");
    }
    return { success: true, data: result.data, message: result.message };
  } catch (error) {
    console.error("Error fetching user tickets:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch user tickets",
    };
  }
}

// Get user orders
export async function getUserOrders(userId) {
  try {
    const response = await fetch(
      `http://localhost:5000/api/orders/user/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch user orders");
    }
    return { success: true, data: result.data, message: result.message };
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch user orders",
    };
  }
}

// Get user profile
export async function getUserProfile(userId) {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch user profile");
    }
    return { success: true, data: result.data, message: result.message };
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch user profile",
    };
  }
}

// Update user profile
export async function updateUserProfile(userId, profileData) {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(profileData),
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to update user profile");
    }
    return { success: true, data: result.data, message: result.message };
  } catch (error) {
    console.error("Error updating user profile:", error);
    return {
      success: false,
      message: error.message || "Failed to update user profile",
    };
  }
}

// Get user dashboard stats
export async function getUserDashboardStats(userId) {
  try {
    const response = await fetch(`http://localhost:5000/api/users/${1}/stats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || "Failed to fetch user stats");
    }
    return { success: true, data: result.data, message: result.message };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return {
      success: false,
      message: error.message || "Failed to fetch user stats",
    };
  }
}

// Download ticket as PDF/Image
export async function downloadTicket(ticketId, format = "pdf") {
  try {
    const response = await fetch(
      `http://localhost:5000/api/tickets/${ticketId}/download?format=${format}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!response.ok) {
      const result = await response.json();
      throw new Error(result.message || "Failed to download ticket");
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `ticket-${ticketId}.${format}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);

    return { success: true, message: "Ticket downloaded successfully" };
  } catch (error) {
    console.error("Error downloading ticket:", error);
    return {
      success: false,
      message: error.message || "Failed to download ticket",
    };
  }
}
