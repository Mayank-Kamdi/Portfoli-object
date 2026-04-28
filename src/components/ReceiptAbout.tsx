import { motion } from "framer-motion";

export const ReceiptAbout = () => {
  return (
    <div className="w-full min-h-screen bg-[#F2EFE9] flex items-center justify-center p-6 md:p-24 overflow-y-auto pt-32">
      <motion.div 
        initial={{ y: 100, opacity: 0, rotate: 2 }}
        animate={{ y: 0, opacity: 1, rotate: -1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-md bg-white shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] p-8 md:p-12 font-space text-primary relative overflow-hidden"
      >
        {/* Receipt Header */}
        <div className="text-center border-b-2 border-dashed border-primary/10 pb-8 mb-8">
          <h2 className="font-archivo text-2xl tracking-tighter mb-2">MAYANK KAMDI</h2>
          <p className="text-[10px] uppercase tracking-widest opacity-40">Digital Designer • London, UK</p>
          <p className="text-[10px] uppercase tracking-widest opacity-40">2026.04.26 — 10:28 AM</p>
        </div>

        {/* Receipt Body */}
        <div className="space-y-6 text-xs uppercase tracking-wider">
          <div className="flex justify-between">
            <span>Role</span>
            <span className="font-bold">Interaction Designer</span>
          </div>
          <div className="flex justify-between">
            <span>Expertise</span>
            <span className="font-bold text-right">Web3 / Motion / AI</span>
          </div>
          <div className="flex justify-between border-b border-primary/5 pb-6">
            <span>Experience</span>
            <span className="font-bold">04 Years</span>
          </div>

          <div className="py-4 text-[10px] leading-relaxed normal-case opacity-60 font-inter">
            Building immersive digital experiences that bridge the gap between human intuition and machine intelligence. I focus on creating interfaces that feel alive, tactile, and premium.
          </div>

          <div className="border-t-2 border-dashed border-primary/10 pt-6 space-y-4">
            <div className="flex justify-between font-bold text-base">
              <span>Total Impact</span>
              <span>100%</span>
            </div>
            <p className="text-[10px] opacity-40 text-center mt-8">THANK YOU FOR VISITING</p>
          </div>
        </div>

        {/* Barcode */}
        <div className="mt-12 opacity-20 h-12 w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#4A2C2A_2px,#4A2C2A_4px)]" />
        
        {/* Decorative shadow */}
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-accent/5 rounded-full blur-3xl" />
      </motion.div>
    </div>
  );
};
