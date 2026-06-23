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
