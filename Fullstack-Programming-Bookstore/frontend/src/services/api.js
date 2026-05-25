const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    ...options
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || "API request failed");
  }

  return result;
}

export async function getProducts() {
  const result = await request("/products");
  return result.data;
}

export async function createOrder(orderData) {
  const result = await request("/orders", {
    method: "POST",
    body: JSON.stringify(orderData)
  });

  return result.data;
}
