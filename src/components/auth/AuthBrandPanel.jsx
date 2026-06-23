"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AuthBrandPanel({ headline, headlineItalic, caption }) {
  return (
    <div className="auth-brand-panel">
      <Image
        src="/images/auth-brand-car.png"
        alt=""
        fill
        priority
        sizes="(min-width: 1024px) 45vw, 0px"
        className="auth-brand-image"
      />
      <div className="auth-brand-overlay" />

      <motion.div
        className="auth-brand-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <span className="text-caption">CARVÕ</span>

        <h1
          className="font-display"
          style={{
            fontSize: "var(--text-hero)",
            fontWeight: 300,
            lineHeight: 1.15,
            color: "var(--color-text-head)",
            marginTop: "var(--space-6)",
          }}
        >
          {headline}{" "}
          <span
            style={{
              fontStyle: "italic",
              color: "var(--color-gold)",
            }}
          >
            {headlineItalic}
          </span>
        </h1>

        <div
          className="gold-rule-top"
          style={{ width: "64px", marginTop: "var(--space-8)" }}
        />

        <p
          className="text-body"
          style={{ marginTop: "var(--space-6)", maxWidth: "380px" }}
        >
          {caption}
        </p>
      </motion.div>
    </div>
  );
}
