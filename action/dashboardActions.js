"use server";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api";

// Admin Dashboard Actions
export async function getAdminDashboardData() {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics/dashboard`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching admin dashboard data:", error);
    return { success: false, message: error.message };
  }
}

export async function getAllUsers(page = 1, search = "", status = "") {
  try {
    const params = new URLSearchParams({ page, search, status });
    const response = await fetch(`${API_BASE_URL}/users?${params}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return { success: false, message: error.message };
  }
}

export async function updateUserStatus(userId, status) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating user status:", error);
    return { success: false, message: error.message };
  }
}

// Seller Dashboard Actions
export async function getSellerDashboardData(vendorId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/analytics/dashboard?vendorId=${vendorId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching seller dashboard data:", error);
    return { success: false, message: error.message };
  }
}

export async function getSellerEarnings(vendorId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/payments/earnings/${vendorId}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching seller earnings:", error);
    return { success: false, message: error.message };
  }
}

// User Dashboard Actions
export async function getUserDashboardData(userId) {
  try {
    const response = await fetch(`${API_BASE_URL}/users/${userId}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user dashboard data:", error);
    return { success: false, message: error.message };
  }
}

export async function getUserOrders(userId, page = 1) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/orders?userId=${userId}&page=${page}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return { success: false, message: error.message };
  }
}

// Payment Actions
export async function getAllPayments(page = 1, status = "", method = "") {
  try {
    const params = new URLSearchParams({ page, status, method });
    const response = await fetch(`${API_BASE_URL}/payments?${params}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching payments:", error);
    return { success: false, message: error.message };
  }
}

export async function getWithdrawalRequests(status = "", page = 1) {
  try {
    const params = new URLSearchParams({ status, page });
    const response = await fetch(
      `${API_BASE_URL}/payments/withdrawals?${params}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching withdrawal requests:", error);
    return { success: false, message: error.message };
  }
}

export async function processWithdrawal(withdrawalId, status, adminId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/payments/withdrawals/${withdrawalId}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, processedBy: adminId }),
      }
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error processing withdrawal:", error);
    return { success: false, message: error.message };
  }
}
