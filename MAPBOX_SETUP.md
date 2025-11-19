# 🗺️ Mapbox Setup Guide - APSONIC Dealers Page

## 🚨 Quick Fix: Map Not Showing

### **Problem:** Map shows "Loading map..." or error message

### **Solution:** Follow these 3 steps:

---

## ✅ **Step 1: Get Your Mapbox Token**

1. **Go to Mapbox:**  
   👉 https://account.mapbox.com/

2. **Sign Up / Sign In**
   - Free account (no credit card required)
   - 50,000 free map loads per month

3. **Get Your Token:**
   - After login, go to: https://account.mapbox.com/access-tokens/
   - Copy your **Default public token**
   - It looks like: `pk.eyJ1IjoieW91ciIsImEiOiJjbHh4In0.xxxxxxxxxx`

---

## ✅ **Step 2: Add Token to .env.local**

1. **Open the file:**
   ```bash
   /Users/mac/Desktop/apsonic-web/.env.local
   ```

2. **Find this line:**
   ```bash
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoiYXBzb25pYyIsImEiOiJjbHh4eHh4eHh4In0.xxxxxxxxxxxxxxxxxxxxxx
   ```

3. **Replace with your actual token:**
   ```bash
   NEXT_PUBLIC_MAPBOX_TOKEN=pk.eyJ1IjoieW91cnVzZXJuYW1lIiwiYSI6ImNseHh4eHh4eHgifQ.your_actual_token_here
   ```

4. **Save the file**

---

## ✅ **Step 3: Restart Your Dev Server**

**IMPORTANT:** Environment variables are only loaded when the server starts!

1. **Stop the server:**
   - Press `Ctrl + C` in your terminal

2. **Start it again:**
   ```bash
   npm run dev
   ```

3. **Wait for it to finish starting** (usually 5-10 seconds)

4. **Visit the dealers page:**
   ```
   http://localhost:3000/dealers
   ```

---

## 🔍 **How to Check If It's Working**

### **Method 1: Look at the Diagnostic Panel**

When you visit `/dealers`, you should see a small panel in the **bottom-right corner**:

```
🔍 Mapbox Diagnostics
✅ Token: pk.eyJ1IjoieW91ciIsImEi...
✅ Mapbox GL loaded
```

**If you see ❌ instead of ✅:**
- Token is missing or invalid
- Follow steps 1-3 above

### **Method 2: Check Browser Console**

1. **Open browser console:**
   - Chrome/Edge: `F12` or `Right-click → Inspect → Console`
   - Firefox: `F12` or `Right-click → Inspect Element → Console`
   - Safari: `⌘ + ⌥ + I` or `Develop → Show JavaScript Console`

2. **Look for these messages:**
   ```
   ✅ Map loaded successfully!
   📍 Adding 10 dealers to map (filter: all)
   ✅ Filtered to 10 dealers
   ```

3. **If you see errors:**
   ```
   ❌ Mapbox token missing!
   ❌ Error creating map: [error details]
   ```
   → Follow steps 1-3 above

---

## 🛠️ **Common Issues & Fixes**

### **Issue 1: Token Not Working**

**Symptoms:**
- Map shows error: "API access token required"
- Console shows: "❌ Mapbox token missing!"

**Fix:**
1. Check `.env.local` exists
2. Check token starts with `pk.`
3. Check token is NOT the placeholder
4. Restart dev server (`Ctrl+C`, then `npm run dev`)

---

### **Issue 2: Map Shows Loading Forever**

**Symptoms:**
- Spinner keeps spinning
- No error shown
- Console shows no messages

**Fix:**
1. Check your internet connection
2. Check browser console for errors
3. Try refreshing the page (`Ctrl+R` or `⌘+R`)
4. Check if Mapbox is down: https://status.mapbox.com/

---

### **Issue 3: Map Shows But No Markers**

**Symptoms:**
- Map loads correctly
- Dark map visible
- But no dealer markers appear

**Fix:**
1. Check console: Should show "📍 Adding 10 dealers"
2. Try zooming out (map might be too zoomed in)
3. Try different filters (Sales, Service, etc.)
4. Check if dealers have coordinates in `src/data/dealers.ts`

---

### **Issue 4: "Mapbox GL loaded: false"**

**Symptoms:**
- Diagnostic shows ❌ for "Mapbox GL loaded"
- Map doesn't render

**Fix:**
1. Check if `mapbox-gl` is installed:
   ```bash
   npm list mapbox-gl
   ```
2. If not installed:
   ```bash
   npm install mapbox-gl @types/mapbox-gl
   ```
3. Restart dev server

---

## 📋 **Checklist**

Use this checklist to ensure everything is set up correctly:

- [ ] Mapbox account created
- [ ] Default public token copied
- [ ] `.env.local` file exists in project root
- [ ] `NEXT_PUBLIC_MAPBOX_TOKEN` added to `.env.local`
- [ ] Token is actual token (not placeholder)
- [ ] Dev server restarted after adding token
- [ ] `/dealers` page visited
- [ ] Diagnostic panel shows ✅ for token
- [ ] Diagnostic panel shows ✅ for Mapbox GL
- [ ] Map loads and shows Africa
- [ ] 10 dealer markers visible
- [ ] Console shows no errors

---

## 🎯 **Expected Result**

When everything is working correctly:

1. **Map loads** - Dark map centered on Africa
2. **10 markers appear** - Green circles on dealer locations
3. **Markers are interactive:**
   - Hover → Shows popup with dealer info
   - Click → Scrolls to dealer card
4. **Filters work** - Category buttons filter markers
5. **Search works** - Typing filters dealers and updates map
6. **No errors** - Console shows success messages

---

## 🔧 **Advanced Troubleshooting**

### **Check Token in Browser**

1. Open browser console
2. Type:
   ```javascript
   console.log(process.env.NEXT_PUBLIC_MAPBOX_TOKEN)
   ```
3. Press Enter
4. Should show your token (starting with `pk.`)
5. If shows `undefined` → Token not loaded (restart server)

### **Verify Dealer Coordinates**

```javascript
// In browser console:
import { dealerEntries } from '@/data/dealers';
console.log(dealerEntries.map(d => ({ name: d.name, coords: d.coordinates })));
```

Should show 10 dealers with `{ lat, lng }` coordinates.

### **Check Mapbox CSS**

The map needs CSS to display correctly. It's imported in `DealerMap.tsx`:

```typescript
import 'mapbox-gl/dist/mapbox-gl.css';
```

If map renders but looks broken, check if CSS is loading.

---

## 📊 **Map Configuration**

Current map settings (in `DealerMap.tsx`):

```typescript
{
  style: 'mapbox://styles/mapbox/dark-v11',  // Dark theme
  center: [0, 8],                            // Longitude, Latitude (Africa)
  zoom: 3,                                   // Continent level
  minZoom: 2,                                // Can zoom out to see globe
  maxZoom: 18,                               // Can zoom in to street level
}
```

**Dealer Locations:**
- 🇬🇭 Ghana (Accra): 5.6037, -0.1870
- 🇧🇫 Burkina Faso (Ouagadougou): 12.3714, -1.5197
- 🇹🇬 Togo (Lomé): 6.1256, 1.2116
- 🇨🇮 Côte d'Ivoire (Abidjan): 5.3600, -4.0083
- 🇳🇬 Nigeria (Lagos): 6.4500, 3.3833
- 🇲🇱 Mali (Bamako): 12.6392, -8.0029
- 🇳🇪 Niger (Niamey): 13.5127, 2.1126
- 🇧🇯 Benin (Cotonou): 6.3654, 2.4183
- 🇸🇱 Sierra Leone (Freetown): 8.4840, -13.2299
- 🇱🇷 Liberia (Monrovia): 6.3156, -10.8074

---

## 🎨 **Marker Colors**

Dealers are color-coded by category:

- 🟢 **Sales** → Green (`#1CA049` - APSONIC brand)
- 🔵 **Service** → Blue (`#3B82F6`)
- 🟠 **Training** → Orange (`#F59E0B`)
- 🟣 **Spares** → Purple (`#8B5CF6`)

Legend is shown in bottom-left of map.

---

## 📱 **Mobile Behavior**

- **Mobile:** Map stacks on top, full width
- **Desktop:** Map on left, sticky while scrolling cards
- **Touch:** Optimized for pinch-to-zoom and drag
- **Controls:** Navigation buttons in top-right

---

## 🚀 **Performance**

**Free Tier Limits:**
- 50,000 map loads per month
- Unlimited map requests per session
- Rate limit: 600 requests per minute

**What counts as a map load:**
- Each time someone visits `/dealers` page
- Does NOT count pan/zoom/filter actions
- Refresh page = new load

**Estimate:**
- 1,600 loads per day
- ~67 loads per hour
- Well within free tier for development

---

## 🔒 **Security**

**Public Token:**
- Safe to expose in client-side code
- Limited to read-only operations
- Can't modify your account
- Can set URL restrictions in Mapbox dashboard

**Best Practices:**
1. Use `NEXT_PUBLIC_` prefix (client-side only)
2. Don't commit `.env.local` (already in `.gitignore`)
3. Use different tokens for dev/staging/production
4. Set URL restrictions in production

---

## 📚 **Additional Resources**

**Mapbox Documentation:**
- Getting Started: https://docs.mapbox.com/mapbox-gl-js/guides/
- API Reference: https://docs.mapbox.com/mapbox-gl-js/api/
- Examples: https://docs.mapbox.com/mapbox-gl-js/example/

**APSONIC Implementation:**
- Component: `src/components/DealerMap.tsx`
- Data: `src/data/dealers.ts`
- Page: `src/app/dealers/page.tsx`

---

## ❓ **Still Having Issues?**

If you've followed all steps and the map still isn't working:

1. **Check console for errors** - Look for red messages
2. **Check network tab** - See if Mapbox requests are failing
3. **Verify token is valid** - Try it in Mapbox Studio: https://studio.mapbox.com/
4. **Check Mapbox status** - https://status.mapbox.com/
5. **Clear browser cache** - Hard refresh: `Ctrl+Shift+R` or `⌘+Shift+R`

---

## ✨ **Success!**

Once working, you should see:
- ✅ Interactive dark map of Africa
- ✅ 10 color-coded dealer markers
- ✅ Hover popups with dealer info
- ✅ Click markers to select dealers
- ✅ Smooth zoom and pan
- ✅ Filter synchronization
- ✅ Mobile-responsive

**Now you have a professional, enterprise-level dealer locator!** 🎉

---

**Last Updated:** November 19, 2024  
**Version:** 1.0  
**Status:** Production Ready ✅

