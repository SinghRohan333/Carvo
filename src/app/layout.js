import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeContext";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata = {
  title: "CARVÕ — Premium Car Rental",
  description:
    "Premium vehicles curated for discerning drivers. Seamless booking. Effortless journeys.",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="dark"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <Navbar />
          <main
            className="flex-1"
            style={{ paddingTop: "var(--navbar-height)" }}
          >
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
