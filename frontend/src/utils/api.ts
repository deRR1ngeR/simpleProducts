const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://simpleproducts-production.up.railway.app";

export const fetcher = async (endpoint: string, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`Error: ${response.statusText}`);
  }
  return response.json();
};
