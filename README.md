<div align="center">

# CARVÕ — DriveFleet

### A premium car rental experience, built with Next.js

![Next.js](https://img.shields.io/badge/Next.js-16.2.9-000000?style=flat&logo=next.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.2.4-61DAFB?style=flat&logo=react&logoColor=black)
![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer%20Motion-12-0055FF?style=flat&logo=framer&logoColor=white)
![BetterAuth](https://img.shields.io/badge/Auth-BetterAuth-000000?style=flat)
![License](https://img.shields.io/badge/License-MIT-yellow.svg?style=flat)

</div>

---

## About

**CARVÕ — DriveFleet** is a full-stack premium car rental platform — an editorial, restrained take on a car rental site, inspired by luxury automotive branding (think Bentley, Genesis) rather than a typical SaaS dashboard look.

Users can browse a curated fleet, list their own vehicles, manage their listings, and book cars with a live price calculation — all wrapped in a custom dark/light design system built from scratch.

This is the **frontend** repository, built with Next.js App Router. It talks to the [CARVÕ Server](#) for car and booking data — see that repository for the backend/API details.

> 🔗 **Live Demo:** _Coming soon — deployment in progress._

---

## Table of Contents

- [Features](#features)
- [Design System](#design-system)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Pages & Routes](#pages--routes)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Authentication](#authentication)
- [Backend](#backend)
- [Known Limitations & Roadmap](#known-limitations--roadmap)
- [Author](#author)
- [License](#license)

---

## Features

- 🎨 **Custom design system** — "Obsidian & Champagne Gold," with full dark/light theme support
- 🔐 **Authentication** — email/password sign-up and login via BetterAuth, with session-based route protection
- 🚗 **Browse & explore** — searchable, filterable car listings by type
- 📄 **Car details** — full vehicle information with live booking-count tracking
- ➕ **Add a car** — list your own vehicle with full field validation
- 🛠️ **My Added Cars** — manage your own listings with inline edit and delete (with confirmation)
- 📅 **Booking system** — a polished booking modal with driver selection, special notes, and live total price calculation
- 📜 **My Bookings** — view, inspect, and cancel your bookings
- 🔔 **Toast notifications** — themed success/error feedback throughout
- 📱 **Fully responsive** — every page, modal, and component adapts across mobile, tablet, and desktop
- 🌗 **Dark / light mode** — persisted theme preference, consistent across the entire app

---

## Design System

CARVÕ's visual identity — **Obsidian & Champagne Gold** — is built entirely from custom CSS variables rather than a third-party design system, aiming for an editorial, premium feel.

| Element | Choice |
|---|---|
| **Display typeface** | Cormorant Garamond (headlines, italic accents) |
| **Interface typeface** | DM Sans (body text, UI) |
| **Signature motif** | A gold hairline rule — used purposefully on dividers, active states, and hover borders |
| **Dark mode** | "Obsidian Night" — near-black backgrounds, champagne gold accents |
| **Light mode** | "Alabaster Day" — warm off-white backgrounds, same gold accent for continuity |
| **Motion** | Framer Motion throughout — consistent page-entry fades, modal scale-ins, button press feedback |

Theming is controlled via a `data-theme` attribute on `<html>`, with all colors, spacing, and typography defined as CSS custom properties in `globals.css`.

---

## Tech Stack

| Category | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router) |
| **UI Library** | React 19 |
| **Styling** | Tailwind CSS 4 + custom CSS (CSS variables, plain stylesheets in `src/styles`) |
| **Component Library** | HeroUI |
| **Animation** | Framer Motion |
| **Authentication** | BetterAuth (with MongoDB adapter) |
| **Database (auth)** | MongoDB (native driver) |
| **Notifications** | react-toastify |
| **Icons** | Inline SVGs (no icon library dependency in production) |
| **Fonts** | Cormorant Garamond + DM Sans, via `next/font/google` |

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Route group — Login & Register pages
│   ├── add-car/         # Add Car page (private)
│   ├── api/             # Next.js API routes
│   ├── explore-cars/    # Browse all cars
│   ├── my-added-cars/   # User's own car listings (private)
│   ├── my-bookings/     # User's booking history (private)
│   ├── error.js         # Global error boundary
│   ├── not-found.js     # Custom 404 page
│   ├── layout.js        # Root layout — fonts, theme provider, navbar, footer
│   ├── page.js          # Home page
│   └── globals.css      # Design tokens & global utility classes
├── components/          # Reusable UI components, organized by feature
├── context/             # React context providers (e.g. ThemeContext)
├── hooks/               # Custom hooks (e.g. responsive media query hook)
├── lib/                 # Auth client config, data-fetching helpers
├── styles/              # Component-scoped plain CSS files
└── proxy.js             # Request proxying / session handling helper
```

---

## Pages & Routes

| Route | Access | Description |
|---|---|---|
| `/` | Public | Home — hero section, featured cars |
| `/explore-cars` | Public | Browse and filter the full fleet |
| `/cars/:id` | Private | Car details + booking |
| `/login` | Public | Sign in |
| `/register` | Public | Create an account |
| `/add-car` | Private | List a new vehicle |
| `/my-added-cars` | Private | Manage your own listings |
| `/my-bookings` | Private | View and cancel your bookings |

> Private routes redirect to `/login` if there is no active session.

---

## Environment Variables

Create a `.env` (or `.env.local`) file in the project root:

```env
NEXT_PUBLIC_API_URL=
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=
MONGODB_URI=
```

| Variable | Description |
|---|---|
| `NEXT_PUBLIC_API_URL` | Base URL of the CARVÕ Server (Express API) |
| `BETTER_AUTH_SECRET` | Secret key used by BetterAuth to sign sessions |
| `BETTER_AUTH_URL` | Base URL of this frontend app, used by BetterAuth |
| `MONGODB_URI` | MongoDB connection string — BetterAuth connects directly to the same database used by the backend |

> Never commit your actual `.env` file. This table documents variable **names** only.

---

## Getting Started

### Prerequisites

- Node.js (compatible with Next.js 16)
- A MongoDB instance (the same one used by [CARVÕ Server](#))
- The CARVÕ Server running (locally or deployed) for car/booking data

### Installation

```bash
# Clone the repository
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>

# Install dependencies
npm install

# Set up environment variables
# Create a .env file in the project root (see Environment Variables above)

# Run the development server
npm run dev
```

The app will be available at `http://localhost:3000`.

---

## Authentication

Authentication is handled by **BetterAuth**, connected directly to the same MongoDB instance as the backend.

- **Client-side**, session state is read via `authClient.useSession()` — used for conditionally rendering UI (e.g. nav links, buttons) and gating client components.
- **Server-side**, Server Components verify sessions via `auth.api.getSession()`, redirecting unauthenticated users away from private routes before any page content renders.

Requests to the backend that require identifying the current user include a verified token, checked by the server before any car or booking data is created, modified, or returned.

---

## Backend

This frontend depends on the **CARVÕ Server** for all car and booking data.

🔗 **Server repository:** [link to your server repo here]

Make sure the server is running and `NEXT_PUBLIC_API_URL` points to it before using any car or booking features.

---

## Known Limitations & Roadmap

This is an actively developed solo project. A few things are intentionally incomplete or deferred:

- **Deployment pending.** Currently runs locally; a Vercel deployment is planned.
- **Booking status is static** on the backend — see the server README for details.

Documenting these openly here rather than leaving them as silent gaps.

---

## Author

**Rohan Singh**

---

## License

This project is licensed under the [MIT License](LICENSE).
