"use client";

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Error({ error, reset }) {
  useEffect(() => {
    // TODO: send to logging service (e.g. Sentry) once one is wired up
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="status-page">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src="/images/auth-brand-car.png" alt="" className="status-page-bg" />

      <motion.div
        className="status-page-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="text-caption">Something went wrong</span>

        <h1 className="status-code" style={{ marginTop: "var(--space-4)" }}>
          A small detour
        </h1>

        <div
          className="gold-rule-top"
          style={{ width: "64px", marginTop: "var(--space-8)" }}
        />

        <p className="text-body" style={{ marginTop: "var(--space-6)" }}>
          We hit an unexpected bump. You can try again, or head back to familiar
          ground.
        </p>

        <div className="status-actions">
          <motion.button
            type="button"
            onClick={() => reset()}
            className="btn-primary"
            whileTap={{ scale: 0.97 }}
          >
            Try Again
          </motion.button>

          <motion.div whileTap={{ scale: 0.97 }}>
            <Link href="/" className="btn-ghost">
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
