'use client';
import GoogleAdSense from './GoogleAdSense';

// ✅ Ad Slot ID Updated: Using actual AdSense ad slot ID: 7178314410
// All ad placements now use the same ad slot ID as provided

// Header Ad - Top of page (Banner style)
export function HeaderAd() {
  return (
    <div className="w-full text-center py-2 bg-gray-50">
      <GoogleAdSense 
        adSlot="7178314410"
        adFormat="horizontal"
        className="w-full"
        style={{ minHeight: '90px' }}
      />
    </div>
  );
}

// Sidebar Ad - Right sidebar (Rectangle)
export function SidebarAd() {
  return (
    <div className="w-full text-center bg-gray-50 p-2 rounded">
      <GoogleAdSense 
        adSlot="7178314410"
        adFormat="rectangle"
        className="w-full"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
}

// Content Ad - Between content (Auto)
export function ContentAd() {
  return (
    <div className="w-full text-center my-6 bg-gray-50 p-4 rounded">
      <GoogleAdSense 
        adSlot="7178314410"
        adFormat="auto"
        className="w-full"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
}

// Footer Ad - Bottom of page (Banner style)
export function FooterAd() {
  return (
    <div className="w-full text-center py-4 bg-gray-50">
      <GoogleAdSense 
        adSlot="7178314410"
        adFormat="horizontal"
        className="w-full"
        style={{ minHeight: '90px' }}
      />
    </div>
  );
}

// Mobile Ad - Mobile specific (Auto responsive)
export function MobileAd() {
  return (
    <div className="w-full text-center md:hidden bg-gray-50 p-2 rounded my-4">
      <GoogleAdSense 
        adSlot="7178314410"
        adFormat="auto"
        className="w-full"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
}

// Desktop Ad - Desktop specific (Auto responsive)
export function DesktopAd() {
  return (
    <div className="hidden md:block w-full text-center bg-gray-50 p-2 rounded my-4">
      <GoogleAdSense 
        adSlot="7178314410"
        adFormat="auto"
        className="w-full"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
}

// In-Article Ad - Within article content (Auto)
export function InArticleAd() {
  return (
    <div className="w-full text-center my-8 bg-gray-50 p-4 rounded">
      <GoogleAdSense 
        adSlot="7178314410"
        adFormat="fluid"
        className="w-full"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
}

// Banner Ad - Top banner (Leaderboard)
export function BannerAd() {
  return (
    <div className="w-full text-center bg-gray-100 py-2">
      <GoogleAdSense 
        adSlot="7178314410"
        adFormat="horizontal"
        className="w-full"
        style={{ minHeight: '90px' }}
      />
    </div>
  );
}
