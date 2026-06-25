import { headers } from "next/headers";
import { redirect } from "next/navigation";
import MyAddedCarsClient from "@/components/cars/MyAddedCarsClient";
import { auth } from "@/lib/auth";
import { getMyAddedCars } from "@/lib/data";

export default async function MyAddedCarsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  const initialCars = await getMyAddedCars(user?.id);

  if (!initialCars.success) {
    return [];
  }

  return <MyAddedCarsClient initialCars={initialCars} userId={user?.id} />;
}
