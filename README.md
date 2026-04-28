# MAYANK KAMDI — PORTFOLIO ARCHIVE ©2026

A high-fidelity, cinematic portfolio experience built for the digital age. This project is a pixel-perfect replication of a premium café-themed digital space, focusing on atmospheric storytelling and technical precision.

---

## ☕ THE COFFEE EXPERIENCE

### 1. High-Fidelity Preloader
The entrance sequence is a bespoke typewriter animation designed to set a calm, editorial tone.
- **Animation Sequence**: `( .... )` → `( hello )` → `( welcome in )`.
- **Logic**: Precise character-by-character reveals with a 0.5s pause between lines and a 1.0s final pause.
- **Exit Animation**: An organic downward slide using a custom SVG mask to create a wavy, liquid-like transition into the main site.

### 2. Atmospheric Cafe Hub
The main navigation layer is an interactive "Cafe Hub" that serves as the heart of the portfolio.
- **Interactive Branding**: "Mayank Kamdi" branding with a spring-based mouse displacement effect.
- **Boiling Filter**: An SVG `feTurbulence` filter applied to the branding text to create a subtle "hand-drawn" jitter effect.
- **Interactive Hotspots**: Navigation points mapped to specific items (Laptop, Coffee cup, Receipts) that trigger seamless section transitions.
- **Depth & Parallax**: Multi-layered background with subtle particle effects to enhance spatial immersion.

### 3. Archive Sections
- **WORK**: A grid-based showcase of projects featuring custom image masks and 3D hardware previews.
- **JOURNAL (Coffee)**: A horizontal scrolling journal capturing process and thoughts.
- **ABOUT**: A "Receipt" style summary of skills, experience, and contact details.

---

## 🛠️ TECHNICAL ARCHITECTURE

### Tech Stack
- **Core**: [React 19](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Animation Engine**: [Framer Motion](https://www.framer.com/motion/)
- **3D / WebGL**: [Three.js](https://threejs.org/) + [React Three Fiber](https://r3f.docs.pmnd.rs/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Typography**: Archivo Black, Inter, and Space Mono (via Google Fonts)

### Design Tokens
- **Primary Color**: `#3D1C1C` (Deep Coffee Brown)
- **Background**: `#F5F0E6` (Cream Beige)
- **Typography**: Editorial-style hierarchy with heavy focus on tracking and leading.

---

## 📂 PROJECT STRUCTURE

```text
src/
├── components/
│   ├── Preloader.tsx      # Typewriter entrance & exit logic
│   ├── SceneHub.tsx       # Interactive hub with branding
│   ├── Work.tsx           # Portfolio showcase
│   ├── CoffeeSection.tsx  # Horizontal journal
│   ├── ReceiptAbout.tsx   # About section (Receipt style)
│   ├── Laptop3D.tsx       # Three.js hardware preview
│   └── BottomNav.tsx      # Global navigation
├── hooks/
│   └── useMagnetic.ts     # Spring-based interaction hook
└── index.css              # Global tokens & CSS filters
```

---

## 📦 SETUP & DEPLOYMENT

### Local Development
1. Clone the repository:
   ```bash
   git clone https://github.com/Mayank-Kamdi/Portfoli-object.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

### Production Build
To generate an optimized production bundle:
```bash
npm run build
```
The output will be located in the `dist/` directory.

---

## 📜 LICENSE
MIT © 2026 Mayank Kamdi.
Designed and Developed with absolute precision.
