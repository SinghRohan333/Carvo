"use client";

import { motion } from "framer-motion";
import "@/styles/why-carvo.css";

const features = [
  {
    id: "fleet",
    title: "Curated Fleet",
    description:
      "Every vehicle is hand-selected for condition, character, and class. Nothing leaves our lot unless we'd drive it ourselves.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M4 18h20M6 18l2.5-7h11L22 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="8.5"
          cy="20.5"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle
          cx="19.5"
          cy="20.5"
          r="1.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M10 13h8"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M20 8l2 2-6 6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "booking",
    title: "Seamless Booking",
    description:
      "Reserve your vehicle in minutes. Modify or cancel anytime — no penalty, no paperwork, no friction.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <rect
          x="4"
          y="6"
          width="20"
          height="18"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M4 11h20"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M9 4v4M19 4v4"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M9 16l3 3 7-6"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    id: "delivery",
    title: "Concierge Delivery",
    description:
      "We bring the car to your address, on your schedule. No taxi to the lot. No wasted hour at a counter.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M14 4C10.134 4 7 7.134 7 11c0 5.25 7 13 7 13s7-7.75 7-13c0-3.866-3.134-7-7-7Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <circle
          cx="14"
          cy="11"
          r="2.5"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    ),
  },
  {
    id: "pricing",
    title: "Transparent Pricing",
    description:
      "No hidden fees, no surprise charges on return. The number you see at booking is the number you pay.",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <circle
          cx="14"
          cy="14"
          r="10"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M14 8v2M14 18v2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M11 11.5c0-1.105.895-2 2-2h2.5a1.5 1.5 0 0 1 0 3H12a1.5 1.5 0 0 0 0 3H14.5a2 2 0 0 0 2-2"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const headerVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function WhyCarvo() {
  return (
    <section
      className="why-carvo section-padding"
      aria-labelledby="why-carvo-heading"
    >
      <div className="container-carvo">
        {/* Section Header */}
        <motion.div
          className="why-carvo__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headerVariants}
        >
          <p className="text-caption">Why CARVÕ</p>
          <h2 className="text-h2 why-carvo__headline" id="why-carvo-heading">
            Built around the driver,{" "}
            <em className="why-carvo__headline-italic">not the transaction</em>
          </h2>
          <p className="text-body why-carvo__subtext">
            Most rental services treat you like a booking number. We don't.
          </p>
        </motion.div>

        {/* Feature Cards Grid */}
        <motion.div
          className="why-carvo__grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          variants={containerVariants}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              className="why-carvo__card card-carvo"
              variants={cardVariants}
              whileHover={{
                scale: 1.02,
                y: -4,
                transition: { duration: 0.2, ease: "easeOut" },
              }}
            >
              <div className="why-carvo__icon">{feature.icon}</div>
              <div className="gold-rule why-carvo__icon-rule" />
              <h3 className="text-h3">{feature.title}</h3>
              <p className="text-body">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
