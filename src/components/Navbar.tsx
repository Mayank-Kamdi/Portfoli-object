import { motion } from "framer-motion";

interface NavbarProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentSection }) => {
  return (
    <motion.nav 
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-10 md:px-12 pointer-events-none"
    >
      <div 
        className="text-[11px] font-bold tracking-[0.3em] text-[#3D1C1C] uppercase cursor-pointer pointer-events-auto"
        onClick={() => onNavigate("hub")}
      >
        MAYANK KAMDI <span className="opacity-30">©2026</span>
      </div>
      
      <div className="hidden space-x-10 text-[10px] font-bold tracking-[0.2em] uppercase text-[#3D1C1C] md:flex pointer-events-auto">
        {["Work", "About", "Coffee"].map((item) => (
          <button 
            key={item} 
            onClick={() => onNavigate(item.toLowerCase())}
            className={`transition-all duration-500 hover:opacity-100 ${
              currentSection === item.toLowerCase() ? "opacity-100" : "opacity-30"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-5 py-2 text-[10px] font-bold tracking-[0.2em] uppercase transition-all rounded-full border border-[#3D1C1C]/10 text-[#3D1C1C] hover:bg-[#3D1C1C] hover:text-[#F5F0E6] pointer-events-auto"
      >
        Contact
      </motion.button>
    </motion.nav>
  );
};
