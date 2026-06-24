import { Suspense } from "react";
import ExploreClient from "@/components/explore/ExploreClient";

export const metadata = {
  title: "Explore Fleet — CARVÕ",
  description:
    "Browse our full fleet of premium rental vehicles. Search by name, filter by type.",
};

export default async function ExploreCarsPage({ searchParams }) {
  // Next.js 15 — searchParams is a Promise, must be awaited
  const params = await searchParams;
  const search = params?.search || "";
  const type = params?.type || "";

  return (
    <div style={{ backgroundColor: "var(--color-bg)", minHeight: "100vh" }}>
      <div className="container-carvo section-padding">
        {/* ── Page header ── */}
        <div style={{ marginBottom: "56px" }}>
          <p
            style={{
              fontFamily: "var(--font-interface)",
              fontSize: "11px",
              fontWeight: "500",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--color-gold)",
              marginBottom: "16px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <span
              style={{
                display: "inline-block",
                width: "32px",
                height: "1px",
                backgroundColor: "var(--color-gold)",
              }}
            />
            Our Fleet
          </p>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(32px, 5vw, 52px)",
              fontWeight: "300",
              color: "var(--color-text-head)",
              lineHeight: 1.15,
              letterSpacing: "-0.02em",
              marginBottom: "16px",
              maxWidth: "600px",
            }}
          >
            Explore Every{" "}
            <span style={{ fontStyle: "italic", color: "var(--color-gold)" }}>
              Vehicle.
            </span>
          </h1>

          <p
            style={{
              fontFamily: "var(--font-interface)",
              fontSize: "15px",
              fontWeight: "300",
              color: "var(--color-text-body)",
              lineHeight: 1.7,
              maxWidth: "520px",
            }}
          >
            Browse our complete fleet — from compact city cars to executive
            luxury sedans. Filter by type or search by name to find exactly what
            you need.
          </p>
        </div>

        {/* ── Interactive client section ── */}
        <Suspense fallback={null}>
          <ExploreClient initialSearch={search} initialType={type} />
        </Suspense>
      </div>
    </div>
  );
}
