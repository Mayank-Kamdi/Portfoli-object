import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Updated Greetings: ( .... ) in one go
const GREETINGS = [
  "( .... )",
  "( hello )",
  "( welcome in )"
];

// Typewriter with custom completion delay
const Typewriter = ({ text, onComplete, delayAfter = 500 }: { text: string; onComplete: () => void; delayAfter?: number }) => {
  const [displayedText, setDisplayedText] = useState("");
  
  useEffect(() => {
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        setTimeout(onComplete, delayAfter);
      }
    }, 60);
    return () => clearInterval(interval);
  }, [text, onComplete, delayAfter]);

  return (
    <span>
      {displayedText}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
        className="inline-block w-[2px] h-[1em] bg-current ml-1 align-middle"
      />
    </span>
  );
};

export const Preloader = ({ onComplete }: { onComplete: () => void }) => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const handleLineComplete = () => {
    if (greetingIndex < GREETINGS.length - 1) {
      setGreetingIndex(prev => prev + 1);
    } else {
      // 1 sec pause after (welcome in) as requested
      setTimeout(() => {
        setIsFinished(true);
        // After background finishes sliding down, trigger onComplete
        setTimeout(onComplete, 1200);
      }, 1000);
    }
  };

  return (
    <motion.div
      initial={{ y: 0 }}
      // "Background goes down" -> translateY(100%)
      animate={isFinished ? { y: "100%" } : { y: 0 }}
      transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[400] flex flex-col items-center justify-center bg-[#3D1C1C] overflow-hidden"
    >
      {/* Wavy Top Edge (since it slides down now) */}
      <div 
        className="absolute top-0 left-0 w-full h-[150px] -translate-y-full bg-[#3D1C1C]"
        style={{
          clipPath: "polygon(0% 100%, 15% 95%, 30% 100%, 45% 95%, 60% 100%, 75% 95%, 90% 100%, 100% 95%, 100% 0%, 0% 0%)",
        }}
      />

      <div className="relative z-10 text-center">
        <div className="font-space text-sm md:text-base tracking-[0.3em] font-bold text-[#F5F0E6]">
          <Typewriter 
            key={GREETINGS[greetingIndex]} 
            text={GREETINGS[greetingIndex]} 
            onComplete={handleLineComplete} 
            delayAfter={500} // 0.5 sec pause after each line
          />
        </div>
      </div>

      {/* Tactile Grain Overlay */}
      <div className="noise-overlay fixed inset-0 pointer-events-none z-[500] opacity-[0.05]" />
    </motion.div>
  );
};
