import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { BannerAd } from "@/components/ads/AdPlacements";

const nunito = Nunito({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "offcampushiring",
  description: "The new way to learn",
  other: {
    "ezoic-site-verification": "KmqKzQFtFC3KCbxyV10VDpdHXOm5hr"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} antialiased`}
      >
        {/* Top Banner Ad */}
        <BannerAd />
        
        {/* Root Layout - This wraps ALL other layouts automatically */}
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  );
}
