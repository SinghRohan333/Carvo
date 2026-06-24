"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "@/styles/hero.css";

const FLEET_SCENES = [
  {
    id: "01",
    caption: "THE SOVEREIGN FLAGSHIP",
    headlineMain: "Experience Elite ",
    headlineItalic: "Elegance",
    description:
      "Curated luxury flagships tailored precisely for discerning individuals who demand absolute road presence.",
    desktopImage: "/images/hero/hero-sovereign-desktop.png",
    mobileImage: "/images/hero/hero-sovereign-mobile.png",
  },
  {
    id: "02",
    caption: "THE CONTINENTAL GT",
    headlineMain: "Grand Touring ",
    headlineItalic: "Redefined",
    description:
      "Sleek contours fused flawlessly with immense performance capabilities for high-speed cross-border journeys.",
    desktopImage: "/images/hero/hero-grandtourer-desktop.png",
    mobileImage: "/images/hero/hero-grandtourer-mobile.png",
  },
  {
    id: "03",
    caption: "THE AVANT-GARDE EV",
    headlineMain: "The Horizon of ",
    headlineItalic: "Mobility",
    description:
      "Unprecedented quietness paired seamlessly with futuristic digital cockpits and sustainable execution.",
    desktopImage: "/images/hero/hero-avantgarde-desktop.png",
    mobileImage: "/images/hero/hero-avantgarde-mobile.png",
  },
  {
    id: "04",
    caption: "THE APEX DRIVETRAIN",
    headlineMain: "Command Any ",
    headlineItalic: "Territory",
    description:
      "High-clearance contemporary architecture engineered to grant safety and dominance across any geographical scale.",
    desktopImage: "/images/hero/hero-apex-desktop.png",
    mobileImage: "/images/hero/hero-apex-mobile.png",
  },
];

export default function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);

  // Responsive evaluation via design token constraints
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 769px)");
    setIsDesktop(mediaQuery.matches);

    const handler = (e) => setIsDesktop(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Ambient Rotational Slide Interval (6-Second Sequence Loops)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % FLEET_SCENES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const activeScene = FLEET_SCENES[currentIndex];
  const activeImg = isDesktop
    ? activeScene.desktopImage
    : activeScene.mobileImage;

  const contentFadeVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="hero-section">
      {/* Dynamic Animated Background Cross-Fade */}
      <div className="hero-image-wrapper">
        <AnimatePresence mode="popLayout">
          <motion.img
            key={`${currentIndex}-${isDesktop}`}
            src={activeImg}
            alt={activeScene.caption}
            className="hero-img"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8, ease: "easeInOut" }}
          />
        </AnimatePresence>
      </div>

      {/* Safety Contrast Mask Layer */}
      <div className="hero-overlay" />

      {/* Synchronized Foreground Presentation */}
      <div className="container-carvo hero-content-wrapper">
        <div className="hero-text-block">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScene.id}
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={{
                visible: { transition: { staggerChildren: 0.15 } },
              }}
              className="flex flex-col flex-start text-left"
            >
              {/* Gold Label Archetype — Elevated tracking for luxury breathing room */}
              <motion.span
                className="hero-editorial-caption"
                variants={contentFadeVariants}
              >
                <span className="opacity-50">{activeScene.id} //</span>{" "}
                {activeScene.caption}
              </motion.span>

              {/* Asymmetric Elegant Headline Mix */}
              <motion.h1
                className="hero-editorial-headline"
                variants={contentFadeVariants}
              >
                <span className="text-head">{activeScene.headlineMain}</span>
                <span className="text-hero-italic">
                  {activeScene.headlineItalic}
                </span>
              </motion.h1>

              {/* Subheadline Body Text — Added line-height and structural padding */}
              <motion.p
                className="hero-editorial-description"
                variants={contentFadeVariants}
              >
                {activeScene.description}
              </motion.p>

              {/* CTA Action Hook */}
              <motion.div variants={contentFadeVariants}>
                <motion.a
                  href="/explore-cars"
                  className="btn-primary hero-cta-btn"
                  whileTap={{ scale: 0.97 }}
                >
                  Explore Fleet
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="hero-cta-arrow"
                  >
                    <path
                      d="M3.33334 8H12.6667M12.6667 8L8.66667 4M12.6667 8L8.66667 12"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Contextual Ambient Carousel Dash-Indicators */}
      <div className="hero-indicators">
        {FLEET_SCENES.map((scene, idx) => (
          <div
            key={scene.id}
            className="indicator-bar"
            onClick={() => setCurrentIndex(idx)}
          >
            {idx === currentIndex && (
              <motion.div
                className="indicator-progress"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 6, ease: "linear" }}
              />
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
