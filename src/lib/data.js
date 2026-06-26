"use server";
import { headers } from "next/headers";
import { auth } from "./auth";

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

export const getCarById = async (id) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  // console.log(token);
  const res = await fetch(`${BASE_URL}/cars/${id}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch car details");
  }
  const data = await res.json();
  return data;
};

export const getMyAddedCars = async (ownerId) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`${BASE_URL}/cars/my-cars?ownerId=${ownerId}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user added cars");
  }
  const data = await res.json();
  return data;
};

export const getMyBookings = async (ownerId) => {
  const { token } = await auth.api.getToken({
    headers: await headers(),
  });
  const res = await fetch(`${BASE_URL}/bookings/my?ownerId=${ownerId}`, {
    cache: "no-store",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch user bookings data");
  }
  const data = await res.json();
  return data;
};
