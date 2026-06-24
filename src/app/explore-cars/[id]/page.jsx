import { notFound } from "next/navigation";
import { getCarById } from "@/lib/data";
import CarDetailsClient from "@/components/carDetails/CarDetailsClient";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const carDataCollection = await getCarById(id);
    const car = carDataCollection?.data;
    return {
      title: `${car.carName} — CARVÕ`,
      description: car.description,
    };
  } catch {
    return { title: "Car Details — CARVÕ" };
  }
}

export default async function CarDetailsPage({ params }) {
  const { id } = await params;

  let car;
  try {
    const carDataCollection = await getCarById(id);
    car = carDataCollection?.data;
  } catch {
    notFound();
  }

  if (!car) notFound();

  //   console.log("Car data received:", JSON.stringify(car, null, 2));

  return <CarDetailsClient car={car} />;
}
