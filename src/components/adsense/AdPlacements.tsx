'use client';
import GoogleAdSense from './GoogleAdSense';

// ⚠️ IMPORTANT: Replace the placeholder ad slot IDs below with actual ad slot IDs from your Google AdSense dashboard
// Current ad slots are placeholders and need to be updated after creating ad units in AdSense

// Header Ad - Top of page (Banner style)
export function HeaderAd() {
  return (
    <div className="w-full text-center py-2 bg-gray-50">
      <GoogleAdSense 
        adSlot="1234567890" // Replace with your actual ad slot ID
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
        adSlot="1234567891" // Replace with your actual ad slot ID
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
        adSlot="1234567892" // Replace with your actual ad slot ID
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
        adSlot="1234567893" // Replace with your actual ad slot ID
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
        adSlot="1234567894" // Replace with your actual ad slot ID
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
        adSlot="1234567895" // Replace with your actual ad slot ID
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
        adSlot="1234567896" // Replace with your actual ad slot ID
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
        adSlot="1234567897" // Replace with your actual ad slot ID
        adFormat="horizontal"
        className="w-full"
        style={{ minHeight: '90px' }}
      />
    </div>
  );
}
