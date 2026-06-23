"use client";

import { motion } from "framer-motion";
import "@/styles/how-it-works.css";

const steps = [
  {
    id: "browse",
    number: "01",
    title: "Browse & Choose",
    description:
      "Explore our curated fleet and select the vehicle that suits your journey — filtered by class, capacity, or character.",
  },
  {
    id: "book",
    number: "02",
    title: "Book Instantly",
    description:
      "Confirm your dates and pick-up point, then complete your reservation in minutes. No calls, no waiting, no back-and-forth.",
  },
  {
    id: "drive",
    number: "03",
    title: "Drive Away",
    description:
      "Your vehicle arrives ready at your door. Keys in hand, paperwork done, road ahead — exactly as it should be.",
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const stepVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
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

export default function HowItWorks() {
  return (
    <section
      className="how-it-works section-padding"
      aria-labelledby="how-it-works-heading"
    >
      <div className="container-carvo">
        {/* Section Header */}
        <motion.div
          className="how-it-works__header"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          variants={headerVariants}
        >
          <p className="text-caption">How It Works</p>
          <h2 className="text-h2" id="how-it-works-heading">
            Three steps.{" "}
            <em className="how-it-works__headline-italic">Zero complexity.</em>
          </h2>
          <p className="text-body how-it-works__subtext">
            We removed every unnecessary step between you and the open road.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="how-it-works__track">
          <motion.div
            className="how-it-works__steps"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={containerVariants}
          >
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                className="how-it-works__step"
                variants={stepVariants}
              >
                {/* Step number — display font, editorial */}
                <div className="how-it-works__number-wrap">
                  <span className="how-it-works__number" aria-hidden="true">
                    {step.number}
                  </span>
                  {/* Connector dot — visible on desktop between steps */}
                  {index < steps.length - 1 && (
                    <span
                      className="how-it-works__connector"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className="how-it-works__content">
                  <h3 className="text-h3">{step.title}</h3>
                  <p className="text-body how-it-works__desc">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
