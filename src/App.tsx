import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CoffeeSection } from "./components/CoffeeSection";
import { Work } from "./components/Work";
import { Preloader } from "./components/Preloader";
import { SceneHub } from "./components/SceneHub";
import { BottomNav } from "./components/BottomNav";
import { ReceiptAbout } from "./components/ReceiptAbout";

type Section = "hub" | "work" | "coffee" | "about";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<Section>("hub");

  useEffect(() => {
    // Prevent scroll restoration and force top
    window.scrollTo(0, 0);
  }, [activeSection]);

  const handleNavigate = (section: string) => {
    setActiveSection(section as Section);
  };

  const transitionConfig = {
    duration: 1.2,
    ease: [0.22, 1, 0.36, 1]
  } as any;

  return (
    <main className="bg-[#F5F0E6] min-h-screen selection:bg-[#3D1C1C] selection:text-[#F5F0E6] overflow-hidden relative">
      <AnimatePresence>
        {isLoading && (
          <Preloader key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <>
          {/* Global Branding Overlay */}
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ ...transitionConfig, delay: 0.5 }}
            className="fixed top-8 left-8 z-[100] font-archivo text-[10px] tracking-[0.3em] text-primary mix-blend-difference pointer-events-none uppercase"
          >
            Mayank Kamdi / Archive ©2026
          </motion.div>

          {/* Section Indicator Overlay */}
          <motion.div 
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ ...transitionConfig, delay: 0.6 }}
            className="fixed top-8 right-8 z-[100] font-space text-[10px] tracking-[0.3em] text-primary mix-blend-difference pointer-events-none uppercase"
          >
            {activeSection} / 04
          </motion.div>

          <AnimatePresence>
            {activeSection !== "hub" && (
              <motion.div
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                transition={transitionConfig}
                className="fixed bottom-0 left-0 w-full z-[100] pointer-events-none"
              >
                <div className="pointer-events-auto">
                  <BottomNav onNavigate={handleNavigate} currentSection={activeSection} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative w-full h-screen">
            <AnimatePresence mode="wait">
              {activeSection === "hub" && (
                <motion.div
                  key="hub"
                  initial={{ opacity: 0, scale: 1.1, filter: "blur(40px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 1.4, filter: "blur(40px)" }}
                  transition={transitionConfig}
                  className="absolute inset-0"
                >
                  <SceneHub onNavigate={handleNavigate} />
                </motion.div>
              )}

              {activeSection === "work" && (
                <motion.div
                  key="work"
                  initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
                  transition={transitionConfig}
                  className="absolute inset-0 overflow-y-auto"
                >
                  <Work />
                </motion.div>
              )}

              {activeSection === "coffee" && (
                <motion.div
                  key="coffee"
                  initial={{ opacity: 0, x: "100%", filter: "blur(20px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: "-100%", filter: "blur(20px)" }}
                  transition={transitionConfig}
                  className="absolute inset-0 overflow-y-auto"
                >
                  <CoffeeSection />
                </motion.div>
              )}

              {activeSection === "about" && (
                <motion.div
                  key="about"
                  initial={{ opacity: 0, y: "100%" }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: "100%" }}
                  transition={transitionConfig}
                  className="absolute inset-0"
                >
                  <ReceiptAbout />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </>
      )}
      
      {/* Film Grain Overlay */}
      <div className="noise-overlay fixed inset-0 pointer-events-none z-[999] opacity-[0.08]" />
    </main>
  );
}

export default App;
