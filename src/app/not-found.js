"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
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
        <span className="text-caption">Error 404</span>

        <h1 className="status-code" style={{ marginTop: "var(--space-4)" }}>
          Lost the road
        </h1>

        <div
          className="gold-rule-top"
          style={{ width: "64px", marginTop: "var(--space-8)" }}
        />

        <p className="text-body" style={{ marginTop: "var(--space-6)" }}>
          The page you&apos;re looking for has either been moved or doesn&apos;t
          exist. Let&apos;s get you back on course.
        </p>

        <div className="status-actions">
          <motion.div whileTap={{ scale: 0.97 }}>
            <Link href="/" className="btn-primary">
              Back to Home
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
