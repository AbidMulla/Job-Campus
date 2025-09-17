'use client';
import EzoicAd from './EzoicAd';

// Header Ad - Top of page
export function HeaderAd() {
  return (
    <div className="w-full text-center py-2">
      <EzoicAd 
        id="ezoic-pub-ad-placeholder-100" 
        className="w-full"
        style={{ minHeight: '90px' }}
      />
    </div>
  );
}

// Sidebar Ad - Right sidebar
export function SidebarAd() {
  return (
    <div className="w-full text-center">
      <EzoicAd 
        id="ezoic-pub-ad-placeholder-101" 
        className="w-full"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
}

// Content Ad - Between content
export function ContentAd() {
  return (
    <div className="w-full text-center my-6">
      <EzoicAd 
        id="ezoic-pub-ad-placeholder-102" 
        className="w-full"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
}

// Footer Ad - Bottom of page
export function FooterAd() {
  return (
    <div className="w-full text-center py-4">
      <EzoicAd 
        id="ezoic-pub-ad-placeholder-103" 
        className="w-full"
        style={{ minHeight: '90px' }}
      />
    </div>
  );
}

// Mobile Ad - Mobile specific
export function MobileAd() {
  return (
    <div className="w-full text-center md:hidden">
      <EzoicAd 
        id="ezoic-pub-ad-placeholder-104" 
        className="w-full"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
}

// Desktop Ad - Desktop specific
export function DesktopAd() {
  return (
    <div className="hidden md:block w-full text-center">
      <EzoicAd 
        id="ezoic-pub-ad-placeholder-105" 
        className="w-full"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
}

// In-Article Ad - Within article content
export function InArticleAd() {
  return (
    <div className="w-full text-center my-8">
      <EzoicAd 
        id="ezoic-pub-ad-placeholder-106" 
        className="w-full"
        style={{ minHeight: '250px' }}
      />
    </div>
  );
}

// Banner Ad - Top banner
export function BannerAd() {
  return (
    <div className="w-full text-center bg-gray-100 py-2">
      <EzoicAd 
        id="ezoic-pub-ad-placeholder-107" 
        className="w-full"
        style={{ minHeight: '60px' }}
      />
    </div>
  );
}
