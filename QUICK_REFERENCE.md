# VDMA AI - Quick Reference Guide

## 🎯 Component Architecture

### Main Component: `app/page.tsx`
The entire dashboard is a single, self-contained React component using the Next.js App Router.

## 📦 State Management

```typescript
const [viewMode, setViewMode] = useState<ViewMode>('GRID');
const [selectedCamera, setSelectedCamera] = useState<Camera>(mockCameras[0]);
const [isSliding, setIsSliding] = useState(false);
```

### State Variables
- **viewMode**: Controls Grid vs Feed layout ('GRID' | 'FEED')
- **selectedCamera**: Currently selected camera for the inspector panel
- **isSliding**: Tracks the slide-to-confirm button interaction

## 🎨 Key Utility Functions

### `getStatusColor(status: CameraStatus)`
Returns Tailwind classes for border and background based on camera status:
- CRITICAL: `'border-red-500 bg-red-500/10'`
- WARNING: `'border-amber-500 bg-amber-500/10'`
- LIVE: `'border-white/10 bg-zinc-900'`

### `getStatusBadge(status: CameraStatus)`
Returns Tailwind classes for status badge styling:
- CRITICAL: `'bg-red-500 text-white'`
- WARNING: `'bg-amber-500 text-black'`
- LIVE: `'bg-emerald-500 text-black'`

## 🎭 Animation Patterns

### View Mode Transitions (Framer Motion)
```typescript
<motion.div
  key="grid"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0, y: -20 }}
  transition={{ duration: 0.3 }}
>
```

### Card Hover Effects
```typescript
<motion.div
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.98 }}
>
```

### Pulsing Border (CSS)
```css
/* In tailwind.config.ts */
animation: {
  'pulse-border': 'pulse-border 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
}
```

## 🎨 Design System

### Color Palette
```typescript
// Background
bg-zinc-950      // Main background
bg-zinc-900      // Panel background
bg-black         // Video placeholder

// Borders
border-white/10  // Subtle borders
border-white/20  // Emphasized borders
border-red-500   // Critical alerts
border-amber-500 // Warnings

// Text
text-zinc-100    // Primary text
text-zinc-400    // Secondary text
text-zinc-500    // Tertiary text
text-red-400     // Critical alerts
text-amber-400   // Warnings
text-emerald-400 // Success states
```

### Spacing
```typescript
// Sidebar
w-64   // Left sidebar width
w-80   // Right inspector width

// Padding
p-4    // Standard padding
p-6    // Large padding

// Gaps
gap-2  // Tight spacing
gap-3  // Medium spacing
gap-4  // Standard spacing
```

### Typography
```typescript
// Headers
text-2xl font-bold              // Main header
text-lg font-bold               // Section headers
text-xs font-bold uppercase     // Labels

// Body
text-sm font-medium             // Standard text
text-xs                         // Small text
font-mono                       // Technical data
tracking-widest                 // Logo text
```

## 🔧 Customization Points

### 1. Adding New Camera Statuses
Update the `CameraStatus` type and add cases to utility functions:
```typescript
type CameraStatus = 'CRITICAL' | 'WARNING' | 'LIVE' | 'OFFLINE';

// Then update getStatusColor() and getStatusBadge()
```

### 2. Changing Animation Speed
Modify Framer Motion transition durations:
```typescript
transition={{ duration: 0.5 }} // Slower
transition={{ duration: 0.1 }} // Faster
```

### 3. Adjusting Grid Layout
Change the grid columns in Grid View:
```typescript
className="grid grid-cols-2 gap-4"  // 2 columns
className="grid grid-cols-4 gap-4"  // 4 columns
```

### 4. Modifying Inspector Panel Width
```typescript
<aside className="w-96 ...">  // Wider panel
<aside className="w-64 ...">  // Narrower panel
```

## 🎯 Icon Usage (Lucide React)

```typescript
import {
  LayoutGrid,    // Grid view icon
  List,          // Feed view icon
  Activity,      // Dashboard nav
  Map,           // Map view nav
  BarChart3,     // Analytics nav
  Cpu,           // System health nav
  AlertTriangle, // Warning indicator
  Shield,        // Logo icon
  ChevronRight,  // Dispatch button
  Video,         // Camera placeholder
  MapPin,        // Location indicator
  Clock,         // Timestamp indicator
} from 'lucide-react';
```

## 🚀 Performance Tips

1. **Memoization**: Consider using `useMemo` for filtered camera lists in Feed view
2. **Virtual Scrolling**: For 100+ cameras, implement virtual scrolling in Feed view
3. **Image Optimization**: Replace video placeholders with Next.js `<Image>` for real feeds
4. **Code Splitting**: Extract camera card into separate component for better tree-shaking

## 🎨 Glass Morphism Effect

```css
/* In globals.css */
.glass-effect {
  background: rgba(24, 24, 27, 0.6);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
```

Apply to any element:
```typescript
<div className="glass-effect">
  {/* Content */}
</div>
```

## 🔍 Debugging Tips

### View Current State
Add this to the component for debugging:
```typescript
console.log('View Mode:', viewMode);
console.log('Selected Camera:', selectedCamera);
```

### Check Animation Performance
Open Chrome DevTools > Performance > Record interaction

### Verify Tailwind Classes
Use browser DevTools to inspect computed styles

## 📱 Responsive Considerations

Current design is optimized for desktop (1920x1080+). For mobile:

1. **Stack the layout vertically**:
```typescript
<div className="flex flex-col lg:flex-row">
```

2. **Hide sidebars on mobile**:
```typescript
<aside className="hidden lg:block w-64">
```

3. **Adjust grid columns**:
```typescript
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
```

## 🎯 Next Steps for Production

1. **Real-time Data**: Replace mock data with WebSocket connection
2. **Authentication**: Add auth layer (NextAuth.js)
3. **Video Streaming**: Integrate WebRTC or HLS for live feeds
4. **Database**: Store incidents in PostgreSQL/MongoDB
5. **Notifications**: Add push notifications for critical alerts
6. **Analytics**: Track response times and incident patterns
7. **Map Integration**: Add Mapbox/Google Maps for Map View
8. **Export**: Add PDF/CSV export for incident reports

---

**Quick Start Command:**
```bash
npm run dev
```

**Build for Production:**
```bash
npm run build && npm start
```
