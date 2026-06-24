import AddCarForm from "@/components/cars/AddCarForm";

export const metadata = {
  title: "Add a Car — CARVÕ",
  description: "List a new vehicle on CARVÕ's premium rental fleet.",
};

// TODO: replace with real auth check once Phase 1 (Authentication) is built.
// Currently hardcoded per project decision — swap this for a real session/user check,
// and redirect to /login if the user is not authenticated.
const isLoggedIn = true;

export default function AddCarPage() {
  if (!isLoggedIn) {
    // Will become: redirect("/login") once real auth exists (use next/navigation's redirect in a Server Component, or a client-side check + router.push if this becomes a Client Component instead).
    return null;
  }

  return <AddCarForm />;
}
