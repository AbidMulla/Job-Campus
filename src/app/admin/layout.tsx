'use client';
import { useState } from "react";
import Header from "../../components/admin/Header";
import Sidebar from "../../components/admin/Sidebar";
import Footer from "../../components/admin/Footer";

export default function AdminLayout({
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
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Fixed on left side */}
      <Sidebar isMobileMenuOpen={isMobileMenuOpen} onMenuClose={handleMenuClose} />

      {/* Main Content Area - Right side */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <Header onMenuToggle={handleMenuToggle} />

        {/* Main Content */}
        <main className="flex-1 py-4 px-6">
          {children}
        </main>

        {/* Footer */}
        {/* <Footer /> */}
      </div>
    </div>
  );
}
