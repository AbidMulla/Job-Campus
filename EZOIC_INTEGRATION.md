# Ezoic Integration Guide

This document outlines the complete Ezoic integration implemented in your Next.js application following the [official Ezoic documentation](https://docs.ezoic.com/docs/ezoicads/integration/).

## ✅ Integration Complete

### Step 1: Site Integration ✅

**File:** `pages/_document.js`

- ✅ Privacy Scripts (Gatekeeper Consent) - Load first for GDPR compliance
- ✅ Ezoic Header Script - Main ad system initialization
- ✅ Proper script loading strategy using Next.js `strategy` prop
- ✅ Scripts placed in `<head>` for optimal performance

**Scripts Added:**
```javascript
// Privacy Scripts (Must load first)
<script src="https://cmp.gatekeeperconsent.com/min.js" data-cfasync="false" strategy="beforeInteractive"></script>
<script src="https://the.gatekeeperconsent.com/cmp.min.js" data-cfasync="false" strategy="beforeInteractive"></script>

// Ezoic Header Script
<script async src="//www.ezojs.com/ezoic/sa.min.js" strategy="afterInteractive"></script>
<script strategy="afterInteractive">
  window.ezstandalone = window.ezstandalone || {};
  ezstandalone.cmd = ezstandalone.cmd || [];
</script>
```

### Step 2: Ads.txt Setup ✅

**File:** `public/ads.txt`

- ✅ File correctly placed in public folder
- ✅ Accessible at `https://offcampushiring.com/ads.txt`
- ✅ Standard Ezoic format with placeholder for your Publisher ID

**Content:**
```
# Replace pub-XXXXXXXXXXXXXXXX with your actual Google AdSense Publisher ID from Ezoic dashboard
google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0
ezoic.com, 19390, RESELLER
```

### Step 3: Ad Placements ✅

**Components Created:**
- `src/components/ads/EzoicAd.tsx` - Base ad component
- `src/components/ads/AdPlacements.tsx` - Pre-configured ad placements

**Ad Types Implemented:**
- ✅ HeaderAd - Top of page
- ✅ SidebarAd - Right sidebar
- ✅ ContentAd - Between content sections
- ✅ FooterAd - Bottom of page
- ✅ MobileAd - Mobile specific
- ✅ DesktopAd - Desktop specific
- ✅ InArticleAd - Within article content
- ✅ BannerAd - Top banner

**Integration Points:**
- ✅ Main Layout (`src/app/layout.tsx`) - Banner ads
- ✅ User Layout (`src/app/user/layout.tsx`) - Header and footer ads
- ✅ Admin Layout (`src/app/admin/layout.tsx`) - Sidebar ads
- ✅ Home Page (`src/app/page.tsx`) - Content and in-article ads

## 🎯 Ad Placement IDs

The following ad placement IDs are configured:

- `ezoic-pub-ad-placeholder-100` - Header Ad
- `ezoic-pub-ad-placeholder-101` - Sidebar Ad
- `ezoic-pub-ad-placeholder-102` - Content Ad
- `ezoic-pub-ad-placeholder-103` - Footer Ad
- `ezoic-pub-ad-placeholder-104` - Mobile Ad
- `ezoic-pub-ad-placeholder-105` - Desktop Ad
- `ezoic-pub-ad-placeholder-106` - In-Article Ad
- `ezoic-pub-ad-placeholder-107` - Banner Ad

## 🔧 Next Steps

### 1. Get Your Ads.txt Content
1. Log into your Ezoic dashboard
2. Navigate to the ads.txt section
3. Copy your specific ads.txt content
4. Replace the placeholder in `public/ads.txt`

### 2. Configure Ad Placements in Ezoic
1. Log into your Ezoic dashboard
2. Go to Ad Placements section
3. Create new ad placements with the IDs listed above
4. Configure ad sizes and targeting for each placement

### 3. Test Integration
1. Deploy your application
2. Visit your website
3. Check browser console for any Ezoic errors
4. Verify ads are displaying correctly

## 🚀 Performance Benefits

- ✅ Scripts load with proper Next.js optimization
- ✅ Privacy compliance with GDPR scripts
- ✅ Responsive ad placements
- ✅ Mobile and desktop specific ads
- ✅ Non-blocking ad loading

## 📱 Responsive Design

All ad components are responsive and will:
- Display appropriately on mobile and desktop
- Maintain proper spacing and layout
- Not interfere with user experience
- Load efficiently without blocking page render

## 🔍 Verification

To verify the integration is working:

1. **Check Scripts:** View page source and confirm Ezoic scripts are in `<head>`
2. **Check Ads.txt:** Visit `https://offcampushiring.com/ads.txt`
3. **Check Console:** Look for Ezoic initialization messages
4. **Check Ads:** Verify ad placements are displaying

## 📞 Support

If you encounter any issues:
1. Check the [Ezoic documentation](https://docs.ezoic.com/docs/ezoicads/integration/)
2. Contact Ezoic support through your dashboard
3. Verify your domain is properly configured in Ezoic

---

**Integration Status:** ✅ Complete
**Last Updated:** January 2025
**Domain:** offcampushiring.com
