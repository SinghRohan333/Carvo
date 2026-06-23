"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Cars", href: "/explore" },
];

const privateLinks = [
  { label: "Add Car", href: "/add-car" },
  { label: "My Bookings", href: "/my-bookings" },
];

export default function NavLinks({
  mobile = false,
  onLinkClick,
  isLoggedIn = false,
}) {
  const pathname = usePathname();

  // On mobile: when logged in, private links are already shown
  // inside NavActions dropdown — so only show public links here.
  // On desktop: always show all links in the center nav.
  const links =
    mobile && isLoggedIn ? publicLinks : [...publicLinks, ...privateLinks];

  if (mobile) {
    return (
      <nav className="flex flex-col">
        {links.map((link, i) => {
          const isActive = pathname === link.href;
          return (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.07, duration: 0.3, ease: "easeOut" }}
            >
              <Link
                href={link.href}
                onClick={onLinkClick}
                style={{
                  display: "block",
                  padding: "14px 0",
                  fontFamily: "var(--font-interface)",
                  fontSize: "15px",
                  fontWeight: isActive ? "500" : "300",
                  color: isActive
                    ? "var(--color-gold)"
                    : "var(--color-text-head)",
                  borderBottom: "1px solid var(--color-border)",
                  textDecoration: "none",
                  letterSpacing: "0.02em",
                  transition: "color 0.2s ease",
                }}
              >
                {link.label}
              </Link>
            </motion.div>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex items-center gap-8">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            style={{
              position: "relative",
              fontFamily: "var(--font-interface)",
              fontSize: "15px",
              fontWeight: "300",
              color: isActive ? "var(--color-gold)" : "var(--color-text-head)",
              textDecoration: "none",
              paddingBottom: "4px",
              letterSpacing: "0.02em",
              transition: "color 0.2s ease",
            }}
          >
            {link.label}
            {isActive && (
              <motion.span
                layoutId="nav-underline"
                style={{
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: "1px",
                  backgroundColor: "var(--color-gold)",
                }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
          </Link>
        );
      })}
    </nav>
  );
}
