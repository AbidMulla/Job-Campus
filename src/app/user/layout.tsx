'use client';
import { useState } from "react";
import Header from "@/components/user/Header";
import Sidebar from "@/components/user/Sidebar";
import Footer from "@/components/user/Footer";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Sidebar - Only visible on mobile */}
      <div className="lg:hidden">
        <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMenuClose={handleMenuClose} />
      </div>

      {/* Header */}
      <Header onMenuToggle={handleMenuToggle} />

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}
