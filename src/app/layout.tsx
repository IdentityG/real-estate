import type { Metadata } from "next";
import { Playfair_Display, Raleway, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import ClientLayout from "../components/layout/ClientLayout";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mekiya Real Estate | Find Your Dream Home",
  description: "Discover exceptional properties with our modern real estate platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${playfair.variable} ${raleway.variable} ${montserrat.variable} antialiased`}
      >
        <ClientLayout>
          <Navbar />
          <main className="pt-16 lg:pt-20">
            {children}
          </main>
          <Footer />
        </ClientLayout>
      </body>
    </html>
  );
}
