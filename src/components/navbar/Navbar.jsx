"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import NavLinks from "./NavLinks";
import NavActions from "./NavActions";

function Logo() {
  return (
    <Link href="/" style={{ textDecoration: "none" }}>
      <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
        <span
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "22px",
            fontWeight: "300",
            letterSpacing: "0.18em",
            color: "var(--color-text-head)",
            textTransform: "uppercase",
          }}
        >
          CARV<span style={{ color: "var(--color-gold)" }}>Õ</span>
        </span>
        <span
          style={{
            fontFamily: "var(--font-interface)",
            fontSize: "9px",
            fontWeight: "500",
            letterSpacing: "0.22em",
            color: "var(--color-gold)",
            textTransform: "uppercase",
            marginTop: "3px",
          }}
        >
          Premium Car Rental
        </span>
      </div>
    </Link>
  );
}

function HamburgerIcon({ open }) {
  return (
    <div
      style={{
        width: "22px",
        height: "16px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          display: "block",
          height: "1.5px",
          backgroundColor: "var(--color-text-head)",
          transformOrigin: "left center",
          borderRadius: "2px",
        }}
      />
      <motion.span
        animate={open ? { opacity: 0, x: 6 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        style={{
          display: "block",
          height: "1.5px",
          backgroundColor: "var(--color-text-head)",
          borderRadius: "2px",
        }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25 }}
        style={{
          display: "block",
          height: "1.5px",
          backgroundColor: "var(--color-text-head)",
          transformOrigin: "left center",
          borderRadius: "2px",
        }}
      />
    </div>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // ── MOCK auth state — lifted here so both NavLinks & NavActions share it
  // Replace with real auth context in Phase 1
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = (e) => {
      setIsDesktop(e.matches);
      if (e.matches) setMobileOpen(false);
    };
    setIsDesktop(mq.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "var(--navbar-height)",
          zIndex: 100,
          backgroundColor: scrolled ? "var(--color-bg)" : "transparent",
          borderBottom: scrolled
            ? "1px solid var(--color-gold)"
            : "1px solid transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition:
            "background-color 0.4s ease, border-color 0.4s ease, backdrop-filter 0.4s ease",
        }}
      >
        <div
          className="container-carvo"
          style={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Logo />

          {isDesktop && <NavLinks isLoggedIn={isLoggedIn} />}

          {isDesktop && (
            <NavActions isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
          )}

          {!isDesktop && (
            <button
              onClick={() => setMobileOpen((p) => !p)}
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <HamburgerIcon open={mobileOpen} />
            </button>
          )}
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && !isDesktop && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={closeMobile}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 98,
                backgroundColor: "rgba(12,12,14,0.7)",
                backdropFilter: "blur(4px)",
              }}
            />

            <motion.div
              key="mobile-menu"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                position: "fixed",
                top: "var(--navbar-height)",
                left: 0,
                right: 0,
                zIndex: 99,
                backgroundColor: "var(--color-bg)",
                borderBottom: "1px solid var(--color-gold)",
                padding: "24px",
                paddingBottom: "32px",
              }}
            >
              <NavLinks
                mobile
                onLinkClick={closeMobile}
                isLoggedIn={isLoggedIn}
              />

              <div
                style={{
                  height: "1px",
                  backgroundColor: "var(--color-border)",
                  margin: "8px 0 16px",
                }}
              />

              <NavActions
                mobile
                onLinkClick={closeMobile}
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
