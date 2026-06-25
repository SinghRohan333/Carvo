"use server";

import { headers } from "next/headers";
import { auth } from "./auth";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const addCar = async (formData) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  const res = await fetch(`${BASE_URL}/cars`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...formData,
      dailyRentPrice: Number(formData.dailyRentPrice),
      seatCapacity: Number(formData.seatCapacity),
      ownerId: user?.id,
    }),
  });
  if (!res.ok) {
    throw new Error("Failed to add new car");
  }
  const data = await res.json();
  return data;
};
