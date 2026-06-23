"use client";
import { useTheme } from "@/context/ThemeContext";

export default function Home() {
  const { theme, toggleTheme } = useTheme();

  return (
    <main className="section-padding container-carvo">
      <p className="text-caption">Design System</p>
      <h1 className="text-hero mt-4">
        The road <br />
        <span className="text-hero-italic">awaits you.</span>
      </h1>
      <p className="text-body mt-6 max-w-lg">
        Premium vehicles curated for discerning drivers. Seamless booking.
        Effortless journeys.
      </p>
      <div className="mt-10 flex gap-4 flex-wrap">
        <button className="btn-primary" onClick={toggleTheme}>
          Switch to {theme === "dark" ? "Light" : "Dark"} Mode
        </button>
        <button className="btn-ghost">Explore Fleet</button>
      </div>
      <div className="mt-10 card-carvo max-w-sm">
        <p className="text-caption">Starting From</p>
        <p className="text-h3 mt-2">BMW 7 Series 2024</p>
        <p className="text-body mt-1">
          Available for immediate booking · 5 seats · Dhaka
        </p>
        <p
          className="text-gold mt-3"
          style={{
            fontSize: "11px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            fontWeight: 500,
          }}
        >
          ৳4,800 / Day
        </p>
      </div>
    </main>
  );
}
