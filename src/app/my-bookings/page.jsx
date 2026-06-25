import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import MyBookingsClient from "@/components/bookings/MyBookingsClient";
import { getMyBookings } from "@/lib/data";

export default async function MyBookingsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user;

  if (!user) {
    redirect("/login");
  }

  const initialBookings = await getMyBookings(user?.id);

  if (!initialBookings.success) {
    return [];
  }

  return <MyBookingsClient bookingsData={initialBookings} userId={user?.id} />;
}
