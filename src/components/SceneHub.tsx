import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";
import { MagneticItem } from "./MagneticItem";
import { Moon, Sun, MousePointer2 } from "lucide-react";

interface SceneHubProps {
  onNavigate: (section: string) => void;
}

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="font-space text-[14px] md:text-[20px] tracking-tighter tabular-nums text-primary/80">
      {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
    </div>
  );
};

// Floating particles for "Atmosphere"
const Particles = ({ isSunset }: { isSunset: boolean }) => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 
          }}
          animate={{ 
            y: ["-10%", "110%"],
            x: ["-5%", "5%"]
          }}
          transition={{ 
            duration: 10 + Math.random() * 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          className={`absolute w-1 h-1 rounded-full ${isSunset ? 'bg-orange-200/20' : 'bg-primary/5'}`}
        />
      ))}
    </div>
  );
};

export const SceneHub: React.FC<SceneHubProps> = ({ onNavigate }) => {
  const [isSunset, setIsSunset] = useState(false);
  const [hoveredSpot, setHoveredSpot] = useState<string | null>(null);
  const [scale, setScale] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(smoothY, [-0.5, 0.5], [5, -5]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-5, 5]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-30, 30]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-30, 30]);

  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const targetWidth = 1440;
      const currentWidth = window.innerWidth;
      const newScale = Math.min(currentWidth / targetWidth, 1.2);
      setScale(newScale);
    };

    const handleMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
      mouseY.set((e.clientY / window.innerHeight) - 0.5);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const hotspots = [
    { id: "work", label: "Selected Works", x: "47%", y: "42%", info: "Coded with precision" },
    { id: "coffee", label: "Journal", x: "28%", y: "55%", info: "Thoughts & Brews" },
    { id: "about", label: "The Designer", x: "68%", y: "58%", info: "Mayank Kamdi" },
  ];

  return (
    <section className={`relative w-full h-screen overflow-hidden transition-colors duration-1000 flex items-center justify-center ${isSunset ? 'bg-[#2C1E18]' : 'bg-[#F2EFE9]'}`}>
      
      {/* ATMOSPHERIC LAYERS */}
      <Particles isSunset={isSunset} />
      <div className="noise-overlay absolute inset-0 opacity-10 pointer-events-none" />

      {/* SCALE WRAPPER */}
      <motion.div
        ref={containerRef}
        style={{ scale }}
        className="relative w-[1440px] h-[800px] flex-shrink-0"
      >
        {/* PARALLAX LAYERS */}
        <motion.div 
          style={{ x: translateX, y: translateY, rotateX, rotateY }}
          className="relative w-full h-full flex items-center justify-center"
        >
          {/* LARGE BRANDING LAYER (Revealed after Preloader) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.5 }}
            className="absolute z-[20] flex flex-col items-center pointer-events-none"
          >
            <motion.div
              style={{ 
                x: useTransform(smoothX, [-0.5, 0.5], [-50, 50]),
                y: useTransform(smoothY, [-0.5, 0.5], [-50, 50]),
              }}
              className="flex flex-col items-center"
            >
              <h1 
                className="font-archivo text-7xl md:text-[12vw] leading-[0.8] tracking-tighter uppercase italic text-[#3D1C1C] select-none"
                style={{ filter: 'url(#boiling-text)' }}
              >
                Mayank<br />Kamdi
              </h1>
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.3 }}
                transition={{ delay: 1.2 }}
                className="mt-12 font-space text-[12px] tracking-[0.6em] uppercase text-[#3D1C1C]"
              >
                ( digital architect )
              </motion.div>
            </motion.div>
          </motion.div>

          {/* SVG Filter for Boiling Effect */}
          <svg style={{ position: 'absolute', width: 0, height: 0 }}>
            <filter id="boiling-text">
              <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="1" result="noise">
                <animate attributeName="seed" from="1" to="100" dur="0.8s" repeatCount="indefinite" />
              </feTurbulence>
              <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" />
            </filter>
          </svg>

          {/* Main Illustration Section */}
          <div className="relative w-[1200px] h-auto shadow-[0_80px_150px_-30px_rgba(0,0,0,0.3)] rounded-[4rem] overflow-hidden">
            <motion.div
               animate={{ filter: isSunset ? "sepia(0.5) brightness(0.4)" : "sepia(0) brightness(1)" }}
               transition={{ duration: 1.5 }}
               className="w-full h-full"
            >
              <img 
                src="/cafe_hub.png" 
                alt="Scene" 
                className="w-full h-full object-cover"
              />
            </motion.div>
            
            {/* Ambient Glow */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${isSunset ? 'opacity-40 bg-orange-900/20' : 'opacity-0'}`} />

            {/* Digital Clock with Flicker Effect */}
            <div className="absolute top-[68.3%] left-[47.2%] -translate-x-1/2 -translate-y-1/2 bg-[#FFFBE9]/90 backdrop-blur-md px-4 py-1 rounded-sm border border-black/5 animate-flicker">
               <DigitalClock />
            </div>
          </div>

          {/* Hotspots layer (Extreme Parallax for Depth) */}
          <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1, delay: 1.5 }}
             style={{ x: useTransform(translateX, (v) => v * 1.8), y: useTransform(translateY, (v) => v * 1.8) }}
             className="absolute inset-0 pointer-events-none"
          >
            {hotspots.map((spot, i) => (
              <motion.div
                key={spot.id}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 2 + i * 0.2, type: "spring", stiffness: 100 }}
                style={{ left: spot.x, top: spot.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
              >
                <MagneticItem onClick={() => onNavigate(spot.id)}>
                  <div 
                    onMouseEnter={() => setHoveredSpot(spot.id)}
                    onMouseLeave={() => setHoveredSpot(null)}
                    className="relative group cursor-none"
                  >
                    {/* Hotspot Core */}
                    <div className="w-4 h-4 rounded-full bg-white border-2 border-accent shadow-[0_0_25px_rgba(255,75,62,0.8)] group-hover:scale-150 transition-transform duration-500" />
                    
                    {/* Pulsing Ring */}
                    <motion.div 
                      animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity }}
                      className="absolute inset-0 w-12 h-12 -left-4 -top-4 rounded-full border-2 border-accent/20"
                    />

                    {/* Thought Bubble / Label */}
                    <AnimatePresence>
                      {hoveredSpot === spot.id && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 15 }}
                          animate={{ opacity: 1, scale: 1, y: -25 }}
                          exit={{ opacity: 0, scale: 0.8, y: 10 }}
                          className="absolute bottom-full left-1/2 -translate-x-1/2 mb-4 flex flex-col items-center"
                        >
                          <div className="bg-primary text-white px-6 py-3 rounded-2xl shadow-2xl flex flex-col items-center gap-1">
                            <span className="font-archivo text-[10px] uppercase tracking-[0.25em] whitespace-nowrap">{spot.label}</span>
                            <span className="font-space text-[8px] text-white/40 uppercase tracking-widest">{spot.info}</span>
                          </div>
                          {/* Triangle */}
                          <div className="w-3 h-3 bg-primary rotate-45 -mt-1.5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </MagneticItem>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Lamp Control */}
        <div className="absolute bottom-24 right-24 z-50">
           <MagneticItem onClick={() => setIsSunset(!isSunset)}>
             <button className={`w-20 h-20 rounded-full flex flex-col items-center justify-center gap-1 transition-all duration-700 shadow-[0_20px_50px_rgba(0,0,0,0.3)] border ${isSunset ? 'bg-orange-500 border-orange-400 text-white' : 'bg-white border-primary/5 text-primary'}`}>
                {isSunset ? <Sun size={24} strokeWidth={1.5} /> : <Moon size={24} strokeWidth={1.5} />}
                <span className="font-space text-[8px] uppercase font-bold tracking-tighter">{isSunset ? "Day" : "Mood"}</span>
             </button>
           </MagneticItem>
        </div>
      </motion.div>

      {/* Floating Info */}
      <div className="fixed bottom-12 left-12 flex flex-col gap-4 mix-blend-difference pointer-events-none">
         <div className="flex items-center gap-3">
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
               <MousePointer2 size={12} className="text-white/40" />
            </motion.div>
            <span className="font-space text-[9px] text-white/40 uppercase tracking-[0.4em]">Interactive Env</span>
         </div>
         <div className="w-48 h-[1px] bg-white/10" />
      </div>
    </section>
  );
};
