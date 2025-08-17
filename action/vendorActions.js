"use server";

const API_BASE_URL = process.env.API_BASE_URL || "http://localhost:5000/api";

// Get all vendors
export async function getAllVendors(page = 1, limit = 10, filters = {}) {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
      ...filters,
    });

    const response = await fetch(`${API_BASE_URL}/vendors?${params}`);
    const data = await response.json();

    return data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch vendors",
      error: error.message,
    };
  }
}

// Get vendor by ID
export async function getVendorById(vendorId) {
  try {
    const response = await fetch(`${API_BASE_URL}/vendors/${vendorId}`);
    const data = await response.json();

    return data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch vendor",
      error: error.message,
    };
  }
}

// Create vendor
export async function createVendor(vendorData) {
  console.log(vendorData);

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

// Update vendor
export async function updateVendor(vendorId, vendorData) {
  try {
    const response = await fetch(`${API_BASE_URL}/vendors/${vendorId}`, {
      method: "PUT",
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
      message: "Failed to update vendor",
      error: error.message,
    };
  }
}

// Approve vendor
export async function approveVendor(vendorId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/vendors/${vendorId}/approve`,
      {
        method: "PATCH",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to approve vendor",
      error: error.message,
    };
  }
}

// Suspend vendor
export async function suspendVendor(vendorId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/vendors/${vendorId}/suspend`,
      {
        method: "PATCH",
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to suspend vendor",
      error: error.message,
    };
  }
}

// Get vendor dashboard
export async function getVendorDashboard(vendorId) {
  try {
    const response = await fetch(
      `${API_BASE_URL}/vendors/${vendorId}/dashboard`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to fetch vendor dashboard",
      error: error.message,
    };
  }
}

// Delete vendor
export async function deleteVendor(vendorId) {
  try {
    const response = await fetch(`${API_BASE_URL}/vendors/${vendorId}`, {
      method: "DELETE",
    });

    const data = await response.json();
    return data;
  } catch (error) {
    return {
      success: false,
      message: "Failed to delete vendor",
      error: error.message,
    };
  }
}
