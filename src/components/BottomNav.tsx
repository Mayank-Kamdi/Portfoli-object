import { motion } from "framer-motion";
import { Home, Briefcase, Coffee, User, Info } from "lucide-react";
import { MagneticItem } from "./MagneticItem";

interface BottomNavProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export const BottomNav: React.FC<BottomNavProps> = ({ onNavigate, currentSection }) => {
  const navItems = [
    { id: "hub", icon: <Home size={18} />, label: "Home" },
    { id: "work", icon: <Briefcase size={18} />, label: "Work" },
    { id: "coffee", icon: <Coffee size={18} />, label: "Journal" },
    { id: "about", icon: <User size={18} />, label: "About" },
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] px-4">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="flex items-center gap-1 p-1.5 bg-[#4A2C2A] rounded-full shadow-2xl border border-white/5"
      >
        {navItems.map((item) => (
          <MagneticItem key={item.id}>
            <button
              onClick={() => onNavigate(item.id)}
              className={`relative flex items-center justify-center p-3.5 rounded-full transition-colors duration-300 group ${
                currentSection === item.id ? "text-[#4A2C2A]" : "text-white/40 hover:text-white"
              }`}
            >
              <div className="relative z-10">{item.icon}</div>
              
              {/* Tooltip (Alt Style) */}
              <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#4A2C2A] text-[#F2EFE9] text-[9px] font-space tracking-[0.2em] uppercase rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none whitespace-nowrap border border-white/10">
                {item.label}
              </div>

              {currentSection === item.id && (
                <motion.div 
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-[#F2EFE9] rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                />
              )}
            </button>
          </MagneticItem>
        ))}
        
        <div className="w-[1px] h-4 bg-white/10 mx-2" />
        
        <MagneticItem>
          <button 
            onClick={() => onNavigate("about")}
            className="p-3.5 text-white/40 hover:text-white transition-colors group relative"
          >
            <Info size={18} />
            <div className="absolute -top-14 left-1/2 -translate-x-1/2 px-3 py-1 bg-[#4A2C2A] text-[#F2EFE9] text-[9px] font-space tracking-[0.2em] uppercase rounded-sm opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 pointer-events-none whitespace-nowrap border border-white/10">
              Details
            </div>
          </button>
        </MagneticItem>
      </motion.div>
    </div>
  );
};
