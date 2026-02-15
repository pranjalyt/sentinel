# VDMA // AI

A high-fidelity, mission-critical urban surveillance dashboard built with Next.js, React, Tailwind CSS, and Framer Motion.

![VDMA AI Dashboard](https://img.shields.io/badge/Status-ONLINE-brightgreen) ![Next.js](https://img.shields.io/badge/Next.js-14-black) ![React](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## 🎯 Overview

VDMA AI is a futuristic surveillance dashboard designed with a "Stealth Mode" aesthetic, inspired by Palantir and Anduril's mission-critical interfaces. The application provides real-time threat detection and monitoring capabilities with an emphasis on actionable intelligence.

## ✨ Features

### 🔄 Dual View Modes
- **Grid View (Default)**: 3x2 grid of active camera feeds with real-time status indicators
- **Feed View (TikTok Style)**: Vertical scrollable feed for rapid incident triage

### 🎨 Design Aesthetic
- **Theme**: "Stealth Mode" with deep blacks (`zinc-950`), subtle dark gray borders (`border-white/10`)
- **Typography**: Crisp white text (`text-zinc-100`) with monospace fonts for technical data
- **Accent Colors**: 
  - 🔴 Red (`red-500`) for CRITICAL/Weapon alerts
  - 🟠 Amber (`amber-500`) for WARNING/Fight alerts
  - ⚪ Monochrome for all other elements

### 🚨 Real-Time Monitoring
- Live camera feed status indicators
- Pulsing border animations for critical alerts
- Threat detection with confidence scores
- Action classification (e.g., "Lunging", "Gathering")
- Location tracking by sector

### 🎛️ Three-Column Layout

#### Left Sidebar (64px width)
- VDMA // AI branding with shield icon
- Navigation menu:
  - Dashboard (Active)
  - Map View
  - Analytics
  - System Health
- System status footer:
  - Online/Offline indicator
  - Real-time latency display

#### Main Content Area
- Header with view mode toggle (Grid/Feed)
- Smooth Framer Motion transitions between views
- Interactive camera cards with hover effects
- Click to select and inspect incidents

#### Right Inspector Panel (80px width)
- Glass morphism effect (`backdrop-filter: blur(12px)`)
- Large video preview of selected incident
- Telemetry data:
  - Detected object with confidence percentage
  - Action classification
  - Location information
  - Timestamp
- Action Zone:
  - **CRITICAL**: "DISPATCH UNIT" button (red-to-orange gradient) + "Mark False Positive"
  - **WARNING**: "Monitor Closely" button
  - **LIVE**: No action required

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router)
- **UI Library**: [React 18](https://react.dev/)
- **Language**: [TypeScript 5](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Animation**: [Framer Motion 11](https://www.framer.com/motion/)

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm

### Installation

1. **Clone the repository** (or navigate to the project directory):
   ```bash
   cd /Users/pranjaldubey/Documents/sites/Changethon
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to:
   ```
   http://localhost:3000
   ```

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
Changethon/
├── app/
│   ├── globals.css          # Global styles with Tailwind directives
│   ├── layout.tsx            # Root layout with metadata
│   └── page.tsx              # Main VDMA AI dashboard component
├── public/                   # Static assets
├── .eslintrc.json           # ESLint configuration
├── .gitignore               # Git ignore rules
├── next.config.mjs          # Next.js configuration
├── package.json             # Project dependencies
├── postcss.config.mjs       # PostCSS configuration
├── tailwind.config.ts       # Tailwind CSS configuration
└── tsconfig.json            # TypeScript configuration
```

## 🎮 Usage

### Switching Views
- Click the **Grid** button (LayoutGrid icon) for the 3x2 camera grid view
- Click the **Feed** button (List icon) for the vertical incident feed

### Inspecting Incidents
- Click on any camera card to select it
- The right inspector panel will update with detailed telemetry
- For CRITICAL incidents, use the "DISPATCH UNIT" button to take action

### Camera Status Types
- **🔴 CRITICAL**: Weapon detected, immediate action required
- **🟠 WARNING**: Suspicious activity, monitoring recommended
- **🟢 LIVE**: Normal operation, no threats detected

## 🎨 Design Tokens

### Colors
```css
--background: #09090b      /* zinc-950 */
--foreground: #fafafa      /* zinc-100 */
```

### Custom Animations
```css
@keyframes pulse-border {
  0%, 100% { border-color: rgb(239 68 68 / 0.5) }
  50% { border-color: rgb(239 68 68 / 1) }
}
```

## 📊 Mock Data

The dashboard includes 6 mock cameras:
1. **CAM-ALPHA-04**: CRITICAL - Machete detected (96% confidence) in Sector 4 (Market)
2. **CAM-BRAVO-12**: WARNING - Crowd Density (84% confidence) in Sector 7 (Transit Hub)
3. **CAM-CHARLIE-08**: LIVE - Normal operation in Sector 2 (Residential)
4. **CAM-DELTA-15**: LIVE - Normal operation in Sector 9 (Industrial)
5. **CAM-ECHO-03**: LIVE - Normal operation in Sector 1 (Downtown)
6. **CAM-FOXTROT-21**: LIVE - Normal operation in Sector 6 (Park)

## 🔧 Customization

### Adding New Cameras
Edit the `mockCameras` array in `app/page.tsx`:

```typescript
const mockCameras: Camera[] = [
  {
    id: 7,
    name: 'CAM-GOLF-99',
    location: 'Sector 10 (Harbor)',
    status: 'LIVE',
    timestamp: '2026-02-10 16:05:00',
  },
  // ... more cameras
];
```

### Modifying Colors
Update `tailwind.config.ts` to change the color scheme:

```typescript
theme: {
  extend: {
    colors: {
      // Add your custom colors here
    },
  },
},
```

## 🌟 Key Features Implemented

✅ Dual view mode toggle (Grid/Feed)  
✅ Real-time status indicators with pulsing animations  
✅ Glass morphism effect on inspector panel  
✅ Framer Motion smooth transitions  
✅ Responsive camera cards with hover effects  
✅ Threat detection with confidence scores  
✅ Action classification and telemetry  
✅ Slide-to-confirm dispatch button  
✅ Dark mode "Stealth" aesthetic  
✅ Monospace fonts for technical data  
✅ System status footer with latency  

## 📝 License

This project is provided as-is for demonstration purposes.

## 🎯 Design Philosophy

> "Data should look beautiful. Intelligence should be actionable."

VDMA AI embodies the principles of high-performance, mission-critical interfaces:
- **Minimal clutter**: Every element serves a purpose
- **Elegant aesthetics**: Deep blacks, crisp whites, targeted color accents
- **Instant clarity**: Status is immediately visible
- **Actionable intelligence**: Clear paths from detection to response

---

**Built with precision. Designed for impact.**

*VDMA // AI - System Status: ONLINE*
# sentinel
