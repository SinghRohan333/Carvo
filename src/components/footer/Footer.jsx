"use client";

import Link from "next/link";
import { motion } from "framer-motion";

// ── Animation variants ────────────────────────────────────────────────
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const columnVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

// ── Data ──────────────────────────────────────────────────────────────
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Cars", href: "/explore" },
  { label: "Add Car", href: "/add-car" },
  { label: "My Bookings", href: "/my-bookings" },
  { label: "My Added Cars", href: "/my-added-cars" },
];

const contactItems = [
  {
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "hello@carvo.com",
    href: "mailto:hello@carvo.com",
  },
  {
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.56 3.44 2 2 0 0 1 3.54 1.25h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "+880 1700 000 000",
    href: "tel:+8801700000000",
  },
  {
    icon: (
      <svg
        width="15"
        height="15"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Dhaka, Bangladesh",
    href: "https://maps.google.com",
  },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "https://x.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
];

// ── Sub-components ────────────────────────────────────────────────────

function FooterLogo() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {/* Logo */}
      <div style={{ lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "24px",
            fontWeight: "300",
            letterSpacing: "0.18em",
            color: "var(--color-text-head)",
            textTransform: "uppercase",
          }}
        >
          CARV<span style={{ color: "var(--color-gold)" }}>Õ</span>
        </span>
        <div
          style={{
            fontFamily: "var(--font-interface)",
            fontSize: "9px",
            fontWeight: "500",
            letterSpacing: "0.22em",
            color: "var(--color-gold)",
            textTransform: "uppercase",
            marginTop: "4px",
          }}
        >
          Premium Car Rental
        </div>
      </div>

      {/* Tagline */}
      <p
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "17px",
          fontWeight: "300",
          fontStyle: "italic",
          color: "var(--color-gold)",
          lineHeight: 1.4,
        }}
      >
        "The road awaits you."
      </p>

      {/* Description */}
      <p
        style={{
          fontFamily: "var(--font-interface)",
          fontSize: "14px",
          fontWeight: "300",
          color: "var(--color-text-muted)",
          lineHeight: 1.7,
          maxWidth: "260px",
        }}
      >
        Premium vehicles curated for discerning drivers. Seamless booking.
        Effortless journeys.
      </p>
    </div>
  );
}

function FooterHeading({ children }) {
  return (
    <div style={{ marginBottom: "20px" }}>
      <span
        style={{
          fontFamily: "var(--font-interface)",
          fontSize: "11px",
          fontWeight: "500",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "var(--color-gold)",
        }}
      >
        {children}
      </span>
      {/* Gold hairline under heading */}
      <div
        style={{
          marginTop: "8px",
          width: "32px",
          height: "1px",
          backgroundColor: "var(--color-gold)",
          opacity: 0.5,
        }}
      />
    </div>
  );
}

function FooterNavLinks() {
  return (
    <div>
      <FooterHeading>Navigation</FooterHeading>
      <nav style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            style={{
              fontFamily: "var(--font-interface)",
              fontSize: "14px",
              fontWeight: "300",
              color: "var(--color-text-body)",
              textDecoration: "none",
              padding: "5px 0",
              transition: "color 0.2s ease",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-gold)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-body)")
            }
          >
            <span
              style={{
                display: "inline-block",
                width: "16px",
                height: "1px",
                backgroundColor: "var(--color-gold)",
                opacity: 0.4,
                flexShrink: 0,
                transition: "opacity 0.2s ease, width 0.2s ease",
              }}
            />
            {link.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}

function FooterContact() {
  return (
    <div>
      <FooterHeading>Get In Touch</FooterHeading>

      {/* Contact items */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "14px",
          marginBottom: "28px",
        }}
      >
        {contactItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.href.startsWith("http") ? "_blank" : undefined}
            rel={
              item.href.startsWith("http") ? "noopener noreferrer" : undefined
            }
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontFamily: "var(--font-interface)",
              fontSize: "14px",
              fontWeight: "300",
              color: "var(--color-text-body)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-gold)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-text-body)")
            }
          >
            <span
              style={{
                color: "var(--color-gold)",
                display: "flex",
                alignItems: "center",
                flexShrink: 0,
              }}
            >
              {item.icon}
            </span>
            {item.label}
          </a>
        ))}
      </div>

      {/* Social icons */}
      <div style={{ display: "flex", gap: "10px" }}>
        {socialLinks.map((social) => (
          <a
            key={social.label}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label}
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              border: "1px solid var(--color-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--color-text-muted)",
              textDecoration: "none",
              transition:
                "border-color 0.2s ease, color 0.2s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--color-gold)";
              e.currentTarget.style.color = "var(--color-gold)";
              e.currentTarget.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--color-border)";
              e.currentTarget.style.color = "var(--color-text-muted)";
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            {social.icon}
          </a>
        ))}
      </div>
    </div>
  );
}

// ── Main Footer ───────────────────────────────────────────────────────
export default function Footer() {
  return (
    <footer>
      {/* Gold hairline top border — the signature element */}
      <div style={{ height: "1px", backgroundColor: "var(--color-gold)" }} />

      {/* Main footer body */}
      <div style={{ backgroundColor: "var(--color-bg)" }}>
        <motion.div
          className="container-carvo footer-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          style={{
            paddingTop: "72px",
            paddingBottom: "64px",
            display: "grid",
            gap: "48px",
            gridTemplateColumns: "1fr",
          }}
        >
          {/* Column 1 — Brand */}
          <motion.div variants={columnVariants}>
            <FooterLogo />
          </motion.div>

          {/* Column 2 — Navigation */}
          <motion.div variants={columnVariants}>
            <FooterNavLinks />
          </motion.div>

          {/* Column 3 — Contact */}
          <motion.div variants={columnVariants}>
            <FooterContact />
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div style={{ borderTop: "1px solid var(--color-border)" }}>
          <div
            className="container-carvo"
            style={{
              paddingTop: "20px",
              paddingBottom: "20px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "8px",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-interface)",
                fontSize: "12px",
                fontWeight: "300",
                color: "var(--color-text-muted)",
                letterSpacing: "0.04em",
              }}
            >
              © {new Date().getFullYear()} CARVÕ. All rights reserved.
            </span>
            <span
              style={{
                fontFamily: "var(--font-interface)",
                fontSize: "12px",
                fontWeight: "300",
                color: "var(--color-text-muted)",
                letterSpacing: "0.04em",
              }}
            >
              Made with <span style={{ color: "var(--color-gold)" }}>♥</span> in
              Bangladesh
            </span>
          </div>
        </div>
      </div>

      {/* Responsive grid styles */}
      <style>{`
        @media (min-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (min-width: 1024px) {
          .footer-grid {
            grid-template-columns: 1.4fr 1fr 1.2fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
