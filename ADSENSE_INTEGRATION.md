# Google AdSense Auto Ads Integration Guide

This document outlines the complete Google AdSense **Auto Ads** integration implemented in your Next.js application following the [official Google AdSense documentation](https://support.google.com/adsense/answer/12171612?hl=en&visit_id=01758361979128-365473257273669842&rd=1).

## ✅ Auto Ads Integration Complete

### Step 1: Ads.txt Setup ✅

**File:** `public/ads.txt`

- ✅ File correctly placed in public folder
- ✅ Accessible at `https://offcampushiring.com/ads.txt`
- ✅ Contains your Google AdSense Publisher ID

**Content:**
```
google.com, pub-9751621049303254, DIRECT, f08c47fec0942fa0
```

### Step 2: Auto Ads Script Integration ✅

**Component:** `src/components/adsense/AdSenseScript.tsx`

- ✅ Auto Ads enabled with `enable_page_level_ads: true`
- ✅ Async loading for optimal performance
- ✅ Proper Next.js Script component usage
- ✅ Cross-origin handling
- ✅ Integrated into main layout

**Auto Ads Configuration:**
```javascript
// AdSense Auto Ads Script
(adsbygoogle = window.adsbygoogle || []).push({
  google_ad_client: "ca-pub-9751621049303254",
  enable_page_level_ads: true
});
```

### Step 3: Auto Ads Integration ✅

**What Auto Ads Does:**
- ✅ Automatically places ads across all pages
- ✅ Optimizes ad placement for maximum revenue
- ✅ No manual ad placement required
- ✅ Responsive across all devices
- ✅ Uses machine learning for optimal positioning

**Integration Points:**
- ✅ Main Layout (`src/app/layout.tsx`) - AdSense Auto Ads script loaded
- ✅ All pages automatically covered - No manual placement needed
- ✅ Works on user pages, admin pages, and all other routes

## 🎯 Ad Placement Configuration

### Publisher Information
- **Publisher ID:** pub-9751621049303254
- **Ad Client:** ca-pub-9751621049303254

### Ad Slot IDs (To be configured in AdSense Dashboard)
- `1234567890` - Header Ad
- `1234567891` - Sidebar Ad
- `1234567892` - Content Ad
- `1234567893` - Footer Ad
- `1234567894` - Mobile Ad
- `1234567895` - Desktop Ad
- `1234567896` - In-Article Ad
- `1234567897` - Banner Ad

**⚠️ Important:** Replace these placeholder ad slot IDs with actual slot IDs from your Google AdSense dashboard.

## 🔧 Next Steps

### 1. Set Up Ad Units in AdSense Dashboard
1. Log into your Google AdSense account
2. Go to "Ads" → "By ad unit"
3. Create new ad units for each placement type:
   - Display ads for banner, header, footer
   - In-feed ads for content areas
   - Multiplex ads for article sections
4. Copy the actual ad slot IDs and replace the placeholder IDs in `AdPlacements.tsx`

### 2. Configure Ad Sizes and Formats
Update the ad formats in `AdPlacements.tsx` based on your AdSense dashboard settings:
- **horizontal** - For banner-style ads
- **rectangle** - For sidebar and content ads
- **auto** - For responsive ads
- **fluid** - For in-article ads

### 3. Verify Integration
1. Deploy your application
2. Visit your website
3. Check browser console for any AdSense errors
4. Verify ads are displaying correctly
5. Monitor AdSense dashboard for impressions

### 4. Site Review Process
1. Ensure your ads.txt file is accessible
2. Wait for Google to crawl your site
3. Submit your site for AdSense review if required
4. Follow Google's content policies

## 🚀 Performance Benefits

- ✅ Async script loading with Next.js Script component
- ✅ Responsive ad placements
- ✅ Mobile and desktop specific ads
- ✅ Non-blocking ad loading
- ✅ Proper error handling

## 📱 Responsive Design

All ad components are responsive and will:
- Display appropriately on mobile and desktop
- Maintain proper spacing and layout
- Not interfere with user experience
- Load efficiently without blocking page render

## 🔍 Verification Checklist

To verify the integration is working:

1. **Check Ads.txt:** Visit `https://offcampushiring.com/ads.txt`
2. **Check AdSense Script:** View page source and confirm script is loaded
3. **Check Console:** Look for AdSense initialization messages
4. **Check Ad Placements:** Verify ad containers are rendering
5. **Check AdSense Dashboard:** Monitor for traffic and impressions

## 📞 Support

If you encounter any issues:
1. Check the [Google AdSense Help Center](https://support.google.com/adsense)
2. Verify your site meets AdSense policies
3. Ensure all ad slot IDs are correctly configured
4. Contact AdSense support through your dashboard

## 🔧 Customization

### Adding New Ad Placements
1. Create a new function in `AdPlacements.tsx`
2. Use the `GoogleAdSense` component with appropriate props
3. Import and use in your desired layout/page

### Modifying Ad Styles
- Update the `className` and `style` props in each ad component
- Maintain responsive design principles
- Ensure ads remain visible and accessible

---

**Integration Status:** ✅ Complete
**Last Updated:** January 2025
**Publisher ID:** pub-9751621049303254
**Domain:** offcampushiring.com

## ⚠️ Important Notes

1. **Replace Ad Slot IDs:** The current implementation uses placeholder ad slot IDs. Replace them with actual IDs from your AdSense dashboard.

2. **Content Policies:** Ensure your website content complies with Google AdSense policies.

3. **Traffic Requirements:** Some AdSense features may require minimum traffic levels.

4. **Testing:** Use AdSense's preview tools to test ads before going live.

5. **Performance:** Monitor page load times and Core Web Vitals to ensure ads don't negatively impact user experience.
