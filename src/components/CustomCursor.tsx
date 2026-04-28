import { useEffect, useState } from "react";
import { motion, useSpring, AnimatePresence } from "framer-motion";

export const CustomCursor = () => {
  const [isHovering, setIsHovering] = useState(false);
  const [cursorType, setCursorType] = useState<string | null>(null);

  const cursorX = useSpring(0, { damping: 25, stiffness: 300 });
  const cursorY = useSpring(0, { damping: 25, stiffness: 300 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const isInteractive = target.closest("button, a, .cursor-pointer");
      const isDrag = target.closest(".preserve-3d, canvas");
      const isProject = target.closest(".group");

      setIsHovering(!!isInteractive);
      
      if (isProject) setCursorType("VIEW");
      else if (isDrag) setCursorType("DRAG");
      else if (isInteractive) setCursorType("");
      else setCursorType(null);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <motion.div
      style={{
        x: cursorX,
        y: cursorY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:flex items-center justify-center mix-blend-difference"
    >
      {/* Outer Ring */}
      <motion.div
        animate={{
          width: isHovering ? 80 : 12,
          height: isHovering ? 80 : 12,
          backgroundColor: isHovering ? "rgba(242, 239, 233, 1)" : "rgba(242, 239, 233, 1)",
        }}
        transition={{ type: "spring", stiffness: 250, damping: 25 }}
        className="rounded-full flex items-center justify-center"
      >
        <AnimatePresence>
          {cursorType && (
            <motion.span
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="font-space text-[10px] font-black text-[#4A2C2A] tracking-widest"
            >
              {cursorType}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
