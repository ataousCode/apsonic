# 🔄 Interactive 360° Bike Viewer

Professional 360° product viewer with drag-to-rotate functionality and GSAP animations.

---

## 📋 Overview

The `Interactive360Viewer` component displays a motorcycle in an interactive 360° view, allowing users to rotate the bike by dragging. It includes:

- ✅ **Drag-to-rotate** - Mouse and touch support
- ✅ **GSAP animations** - Smooth entrance effects
- ✅ **Responsive layout** - Works on all screen sizes
- ✅ **Specs display** - Key specifications grid
- ✅ **CTA buttons** - Call-to-action integration
- ✅ **Visual indicators** - Rotation dots and instructions
- ✅ **Premium design** - Glassmorphism and gradients

---

## 🎯 Features

### 1. **360° Rotation**
Users can drag left/right (or swipe on mobile) to rotate the bike through 4 different views.

### 2. **GSAP Animations**
- Viewer scales and fades in with 3D rotation
- Content slides in from the left
- Specs animate with stagger effect
- Instruction badge fades in last

### 3. **Interactive Controls**
- **Drag/Swipe**: Rotate the bike
- **Dots**: Click to jump to specific view
- **Keyboard**: Future enhancement possible

### 4. **Visual Feedback**
- Cursor changes to grab/grabbing
- Active dot indicator
- Smooth image transitions
- Decorative glow effects

---

## 📦 Usage

### Basic Implementation

```tsx
import Interactive360Viewer from "@/components/Interactive360Viewer";

<Interactive360Viewer
  title="APSONIC ADV 250X"
  subtitle="Latest Model"
  description="Our most advanced adventure motorcycle..."
  images={[
    "/assets/images/bike-front.jpg",
    "/assets/images/bike-side.jpg",
    "/assets/images/bike-rear.jpg",
    "/assets/images/bike-side2.jpg",
  ]}
  specs={[
    { label: "Engine", value: "250cc EFI" },
    { label: "Power", value: "18.5 HP" },
  ]}
/>
```

### With Centralized Data

```tsx
// In src/data/home.ts
export const latest360Bike = {
  title: "APSONIC ADV 250X",
  subtitle: "Latest Model",
  description: "...",
  images: ["..."],
  specs: [{ label: "...", value: "..." }],
};

// In page
import { latest360Bike } from "@/data/home";

<Interactive360Viewer
  title={latest360Bike.title}
  subtitle={latest360Bike.subtitle}
  description={latest360Bike.description}
  images={latest360Bike.images}
  specs={latest360Bike.specs}
/>
```

---

## 🎨 Props

### `Interactive360ViewerProps`

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `images` | `string[]` | ✅ | Array of 4 image URLs for different views |
| `title` | `string` | ✅ | Main product title |
| `subtitle` | `string` | ❌ | Small text above title (e.g., "Latest Model") |
| `description` | `string` | ❌ | Product description paragraph |
| `specs` | `Array<{label, value}>` | ❌ | Specifications grid |

### Spec Object Structure

```typescript
{
  label: string;  // e.g., "Engine"
  value: string;  // e.g., "250cc EFI"
}
```

---

## 🖼️ Image Guidelines

### Requirements

1. **Count**: Exactly 4 images (front, side, rear, side)
2. **Format**: PNG or JPEG recommended
3. **Size**: 800x800px minimum, square aspect ratio
4. **Background**: Transparent or consistent color
5. **Quality**: High resolution for crisp display
6. **Lighting**: Consistent across all views

### Recommended Views

```
images[0] - Front view (0°)
images[1] - Side view (90°)
images[2] - Rear view (180°)
images[3] - Other side (270°)
```

### Example File Structure

```
/public/assets/images/products/adv-250x/
  ├── 360-front.png
  ├── 360-side-right.png
  ├── 360-rear.png
  └── 360-side-left.png
```

---

## 🎬 Animation Details

### Entrance Sequence

1. **Viewer** (0.2s delay)
   - Scale: 0.9 → 1
   - Opacity: 0 → 1
   - RotationY: -20° → 0°
   - Duration: 1s

2. **Content** (0.4s delay)
   - X: -30px → 0
   - Opacity: 0 → 1
   - Duration: 0.8s

3. **Specs** (0.6s delay)
   - Y: 20px → 0
   - Opacity: 0 → 1
   - Stagger: 0.1s between each
   - Duration: 0.6s

4. **Instruction** (1s delay)
   - Y: 10px → 0
   - Opacity: 0 → 1
   - Duration: 0.6s

---

## 💻 Interaction Details

### Drag Sensitivity

The rotation sensitivity is controlled by:

```typescript
const sensitivity = 0.5;
```

- **Lower value** (0.3): Requires more drag to rotate
- **Higher value** (1.0): Rotates with minimal drag
- **Current** (0.5): Balanced for smooth control

### Rotation Logic

```typescript
const rotation = Math.floor(delta * sensitivity);

if (Math.abs(rotation) > 10) {
  const newIndex = (currentIndex - Math.sign(rotation) + images.length) % images.length;
  setCurrentIndex(newIndex);
}
```

Threshold of 10 pixels prevents jittery rotation.

---

## 🎨 Styling Customization

### Colors

The component uses APSONIC design tokens:

```tsx
// Primary button
bg-apsonic-green hover:bg-apsonic-green-dark

// Background gradient
bg-gradient-to-br from-apsonic-surface to-black

// Glow effects
bg-apsonic-green/20
bg-apsonic-accent/10
```

### Glassmorphism

```tsx
className="glass-panel"
// Defined in globals.css
```

### Layout

```tsx
// Two-column grid on desktop
grid lg:grid-cols-2

// Spacing
gap-12 py-16 lg:py-24
```

---

## 📱 Responsive Design

### Desktop (lg+)
- Two-column layout
- Viewer on right, content on left
- Larger text sizes
- Full interaction support

### Tablet
- Stacked layout
- Reduced padding
- Adjusted text sizes

### Mobile
- Single column
- Touch-optimized drag
- Smaller specs grid
- Compact buttons

---

## ♿ Accessibility

### Features

1. **Keyboard Navigation**: Dots are focusable buttons
2. **ARIA Labels**: Each view button has descriptive label
3. **Alt Text**: Images include proper alt attributes
4. **Cursor Feedback**: Visual indication of drag state
5. **Touch Support**: Full mobile interaction

### Future Enhancements

- [ ] Keyboard arrow keys for rotation
- [ ] Auto-rotate play/pause button
- [ ] Screen reader announcements
- [ ] Reduced motion support

---

## 🚀 Performance

### Optimizations

1. **Image Loading**: Uses CloudImage component for optimization
2. **CSS Transitions**: Smooth view switching with GPU acceleration
3. **Event Throttling**: Drag events optimized
4. **Conditional Rendering**: Only current image visible
5. **GSAP Context**: Proper cleanup on unmount

### Best Practices

```tsx
// Only 4 images loaded
images.length === 4 // Recommended

// Images are lazy-loaded by default
<CloudImage src={...} />

// Animations cleaned up
return () => ctx.revert();
```

---

## 🎯 Real-World Examples

### Example 1: Home Page (Current)

```tsx
// src/app/page.tsx
<PageSection className="bg-[var(--apsonic-surface)]">
  <Interactive360Viewer
    title={latest360Bike.title}
    subtitle={latest360Bike.subtitle}
    description={latest360Bike.description}
    images={latest360Bike.images}
    specs={latest360Bike.specs}
  />
</PageSection>
```

### Example 2: Product Detail Page

```tsx
// src/app/products/[slug]/page.tsx
<Interactive360Viewer
  title={product.name}
  subtitle="Premium Series"
  description={product.description}
  images={product.images360}
  specs={product.specifications}
/>
```

### Example 3: With Custom CTA

To customize the CTA buttons, modify the component:

```tsx
{/* CTA Buttons */}
<div className="flex flex-wrap gap-4">
  <Link 
    href={`/products/${productSlug}`}
    className="rounded-full bg-apsonic-green px-8 py-3..."
  >
    View Full Specs
  </Link>
  <Link 
    href="/dealers"
    className="rounded-full border border-white/40..."
  >
    Find Dealer
  </Link>
</div>
```

---

## 🛠️ Troubleshooting

### Issue: Images not rotating smoothly

**Solution**: Check image file sizes. Large images (>500KB) may cause lag.

```bash
# Optimize images
npx sharp-cli input.jpg -o output.jpg --quality 85 --resize 800
```

### Issue: Drag sensitivity too high/low

**Solution**: Adjust sensitivity value:

```typescript
const sensitivity = 0.5; // Change this value
```

### Issue: Animations not playing

**Solution**: Ensure component has `'use client'` directive and GSAP is installed.

### Issue: Images flickering

**Solution**: Preload images:

```typescript
useEffect(() => {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}, [images]);
```

---

## 🎨 Customization Examples

### Change Rotation Direction

```typescript
// Reverse rotation direction
const newIndex = (currentIndex + Math.sign(rotation) + images.length) % images.length;
```

### Add Auto-Rotate

```typescript
useEffect(() => {
  const interval = setInterval(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, 3000); // Rotate every 3 seconds
  
  return () => clearInterval(interval);
}, [images.length]);
```

### Add Zoom on Hover

```typescript
const [isHovered, setIsHovered] = useState(false);

<div 
  className={`transition-transform duration-500 ${
    isHovered ? 'scale-110' : 'scale-100'
  }`}
  onMouseEnter={() => setIsHovered(true)}
  onMouseLeave={() => setIsHovered(false)}
>
  {/* Images */}
</div>
```

---

## 📚 Component Structure

```
Interactive360Viewer/
├── Props interface
├── State management
│   ├── currentIndex (current view)
│   ├── isDragging (drag state)
│   ├── startX (drag start position)
│   └── rotationOffset (accumulated rotation)
├── GSAP animations
│   ├── Viewer entrance
│   ├── Content entrance
│   ├── Specs stagger
│   └── Instruction fade
├── Event handlers
│   ├── Mouse events
│   └── Touch events
├── JSX structure
│   ├── Content section (left)
│   └── Viewer section (right)
└── Visual elements
    ├── Images
    ├── Indicators
    ├── Instructions
    └── Decorative glows
```

---

## ✅ Checklist for Adding New 360° Viewer

- [ ] Prepare 4 high-quality images (front, side, rear, side)
- [ ] Optimize images (max 500KB each)
- [ ] Add images to `/public/assets/images/`
- [ ] Create data object in `/src/data/`
- [ ] Import component in page
- [ ] Pass required props
- [ ] Test drag interaction (mouse + touch)
- [ ] Verify animations play smoothly
- [ ] Test on mobile devices
- [ ] Check image loading performance

---

## 🚀 Future Enhancements

### Planned Features
- [ ] Auto-rotate with play/pause toggle
- [ ] Zoom in/out functionality
- [ ] Hotspots for detailed views
- [ ] Fullscreen mode
- [ ] Share button
- [ ] Comparison mode (2 bikes side-by-side)

### Advanced Features
- [ ] WebGL 3D model rendering
- [ ] Real 360° rotation (more than 4 views)
- [ ] AR view (View in your space)
- [ ] Video mode option
- [ ] Color/variant switcher

---

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review the component source code
3. Test with the home page example
4. Verify image paths are correct
5. Check browser console for errors

---

**Component Location:** `/src/components/Interactive360Viewer.tsx`  
**Data Location:** `/src/data/home.ts`  
**Usage Example:** `/src/app/page.tsx`

**Status:** ✅ Production Ready

