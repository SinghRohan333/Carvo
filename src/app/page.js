import AvailableCars from "@/components/home/AvailableCars";
import AvailableCarsSkeleton from "@/components/home/AvailableCarsSkeleton";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import WhyCarvo from "@/components/home/WhyCarvo";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Hero />
      <Suspense fallback={<AvailableCarsSkeleton />}>
        <AvailableCars />
      </Suspense>
      <WhyCarvo />
      <HowItWorks />
    </>
  );
}
