const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getFeaturedCars = async () => {
  const res = await fetch(`${BASE_URL}/cars?featured=true`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch featured cars");
  }
  const data = await res.json();
  return data;
};

export const getAllCars = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/cars${query ? `?${query}` : ""}`, {
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error("Failed to fetch cars");
  }
  const data = await res.json();
  return data;
};
