import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import AdSenseScript from "@/components/adsense/AdSenseScript";

const nunito = Nunito({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ["latin"],
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title: "offcampushiring",
  description: "The new way to learn"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <AdSenseScript />
      </head>
      <body
        className={`${nunito.variable} antialiased`}
      >
        {/* Root Layout - This wraps ALL other layouts automatically */}
        <div className="app-container">
          {children}
        </div>
      </body>
    </html>
  );
}
