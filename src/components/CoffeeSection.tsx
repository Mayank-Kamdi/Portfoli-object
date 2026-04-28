import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const entries = [
  { id: 1, date: "APR 2026", title: "Morning Brew", desc: "The perfect shot requires 18g in, 36g out.", image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=800&auto=format&fit=crop" },
  { id: 2, date: "MAR 2026", title: "Synthetics", desc: "Exploring the soul within the machine.", image: "https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop" },
  { id: 3, date: "FEB 2026", title: "Minimalism", desc: "Less but better. Always.", image: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?q=80&w=800&auto=format&fit=crop" },
  { id: 4, date: "JAN 2026", title: "Night Shift", desc: "Code flows best after midnight.", image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop" },
];

export const CoffeeSection = () => {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-65%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  return (
    <section ref={targetRef} className="relative h-[400vh] bg-[#F2EFE9] overflow-hidden">
      <div className="sticky top-0 h-screen w-full flex items-center">
        
        {/* Background Text Decor */}
        <motion.div 
          style={{ opacity }}
          className="absolute inset-0 pointer-events-none flex items-center justify-center"
        >
           <div className="font-archivo text-[20vw] text-primary/5 uppercase leading-none select-none">JOURNAL</div>
        </motion.div>

        {/* Horizontal Scroll Content */}
        <motion.div style={{ x }} className="flex gap-24 px-[10vw]">
          {/* Header */}
          <div className="flex-shrink-0 w-[40vw] flex flex-col justify-center">
            <span className="font-space text-xs tracking-[0.3em] text-primary/40 uppercase mb-8 block">Project Log / 002</span>
            <h2 className="text-[10vw] font-archivo text-primary leading-[0.8] uppercase tracking-tighter mb-12">Coffee &<br />Synthetics.</h2>
            <div className="w-24 h-[1px] bg-primary/20" />
          </div>

          {/* Cards */}
          {entries.map((entry) => (
            <motion.div 
              key={entry.id}
              className="flex-shrink-0 w-[35vw] group"
            >
              <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden mb-8 bg-primary/5">
                <img 
                  src={entry.image} 
                  alt={entry.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100"
                />
                <div className="absolute bottom-8 left-8">
                   <span className="bg-white/90 backdrop-blur px-3 py-1 rounded-full font-space text-[9px] text-primary tracking-widest">{entry.date}</span>
                </div>
              </div>
              <h3 className="font-archivo text-3xl text-primary tracking-tighter uppercase mb-4">{entry.title}</h3>
              <p className="font-inter text-primary/60 text-sm max-w-[280px] leading-relaxed">{entry.desc}</p>
            </motion.div>
          ))}

          <div className="flex-shrink-0 w-[20vw]" />
        </motion.div>

        {/* Scroll Bar */}
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-12 right-12 flex items-center gap-6"
        >
          <span className="font-space text-[10px] tracking-widest text-primary/40 uppercase">Keep Scrolling</span>
          <div className="w-32 h-[1px] bg-primary/10 overflow-hidden">
             <motion.div 
               style={{ scaleX: scrollYProgress }}
               className="w-full h-full bg-primary origin-left"
             />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
