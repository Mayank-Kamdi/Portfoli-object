import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Laptop3D } from "./Laptop3D";
import { X, ArrowRight, Minus } from "lucide-react";

const projects = [
  { id: 1, title: "AETHERIS", category: "WEB DESIGN", year: "2024", image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop", description: "Designing a visual narrative for the digital age. Focused on fluid motion and typography.", size: "tall" },
  { id: 2, title: "LUMINA", category: "MOTION", year: "2023", image: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?q=80&w=1200&auto=format&fit=crop", description: "Exploring the intersection of light and digital space.", size: "wide" },
  { id: 3, title: "KINETIC", category: "EXPERIENCE", year: "2024", image: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop", description: "Interactive installations that breathe life into code.", size: "small" },
  { id: 4, title: "MONO", category: "IDENTITY", year: "2023", image: "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?q=80&w=1200&auto=format&fit=crop", description: "Minimalist identity for a maximalist world.", size: "large" },
];

export const Work = () => {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const transition = { duration: 1.2, ease: [0.22, 1, 0.36, 1] } as any;

  return (
    <section id="work" className="min-h-screen bg-[#F2EFE9] pt-48 pb-64 px-6 md:px-16">
      <div className="max-w-[1600px] mx-auto">
        
        {/* Header Collage */}
        <div className="grid grid-cols-12 gap-6 mb-48">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={transition}
            className="col-span-12 md:col-span-7"
          >
            <div className="flex items-center gap-4 mb-8">
               <div className="w-12 h-[1px] bg-primary/20" />
               <span className="font-space text-[10px] tracking-[0.4em] text-primary/40 uppercase">Selected Archive</span>
            </div>
            <h2 className="text-[15vw] md:text-[10vw] font-archivo text-primary leading-[0.8] uppercase tracking-tighter">
              Archive<br /><span className="text-primary/10">01—04</span>
            </h2>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ ...transition, delay: 0.5 }}
            className="col-span-12 md:col-span-4 md:col-start-9 flex flex-col justify-end"
          >
            <p className="font-inter text-primary/60 text-lg leading-relaxed mb-12">
              Deep-diving into the intersection of high-fidelity motion and functional digital architecture.
            </p>
            <div className="flex gap-4">
               {["UI", "MOTION", "DEV"].map(tag => (
                 <span key={tag} className="border border-primary/10 px-4 py-1 rounded-full font-space text-[9px] tracking-widest text-primary/40 uppercase">{tag}</span>
               ))}
            </div>
          </motion.div>
        </div>

        {/* Interactive 3D Break */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={transition}
          className="w-full h-[70vh] mb-64 relative rounded-[3rem] overflow-hidden bg-white/40 border border-white/20 shadow-2xl"
        >
          <div className="absolute top-12 left-12 z-10">
             <span className="font-space text-[10px] tracking-widest text-primary/40 uppercase">Hardware Sandbox</span>
          </div>
          <Laptop3D />
          <div className="absolute bottom-12 right-12 z-10 flex flex-col items-end gap-2">
             <div className="flex items-center gap-4">
                <span className="font-space text-[9px] text-primary/40 uppercase tracking-widest">Rotational Axis</span>
                <div className="w-24 h-[1px] bg-primary/10" />
             </div>
             <span className="font-archivo text-xs text-primary/60 uppercase">Manual Interaction Enabled</span>
          </div>
        </motion.div>

        {/* The Collage Grid */}
        <div className="grid grid-cols-12 gap-x-8 gap-y-48">
          {projects.map((project, index) => {
            const isTall = project.size === "tall";
            const isWide = project.size === "wide";
            const isLarge = project.size === "large";
            
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ ...transition, delay: index * 0.1 }}
                className={`group cursor-pointer ${
                  isTall ? 'col-span-12 md:col-span-5' : 
                  isWide ? 'col-span-12 md:col-span-8' : 
                  isLarge ? 'col-span-12 md:col-span-12' : 
                  'col-span-12 md:col-span-4'
                } ${index % 2 !== 0 ? 'md:mt-32' : ''}`}
                onClick={() => setSelectedProject(project)}
              >
                <div className="relative overflow-hidden rounded-[2.5rem] bg-primary/5 aspect-[4/5] md:aspect-auto h-[500px] md:h-auto">
                  <motion.img 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
                    src={project.image} 
                    alt={project.title}
                    className={`w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ${isWide ? 'md:aspect-[16/9]' : isLarge ? 'md:aspect-[21/9]' : 'md:aspect-[4/5]'}`}
                  />
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  {/* Floating Year Tag */}
                  <div className="absolute top-8 right-8 mix-blend-difference">
                     <span className="font-space text-[10px] text-white tracking-widest">{project.year}</span>
                  </div>
                </div>
                
                <div className="mt-8 flex justify-between items-start">
                  <div>
                    <h3 className="text-5xl font-archivo text-primary tracking-tighter uppercase mb-2">{project.title}</h3>
                    <div className="flex items-center gap-3">
                       <Minus size={12} className="text-accent" />
                       <span className="font-space text-[10px] tracking-widest text-primary/40 uppercase">{project.category}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full border border-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500">
                    <ArrowRight size={20} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-[#F2EFE9] flex flex-col md:flex-row overflow-y-auto cursor-none"
          >
            <motion.div 
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={transition}
              className="w-full md:w-1/2 h-[50vh] md:h-screen sticky top-0 bg-primary/5"
            >
              <img src={selectedProject.image} alt={selectedProject.title} className="w-full h-full object-cover" />
            </motion.div>

            <div className="w-full md:w-1/2 p-12 md:p-24">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                onClick={() => setSelectedProject(null)}
                className="mb-24 w-16 h-16 rounded-full border border-primary/20 flex items-center justify-center text-primary"
              >
                <X size={24} />
              </motion.button>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ ...transition, delay: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-8">
                   <span className="font-space text-xs tracking-[0.4em] text-primary/40 uppercase">{selectedProject.category}</span>
                   <div className="w-12 h-[1px] bg-primary/10" />
                   <span className="font-space text-xs text-primary/40">{selectedProject.year}</span>
                </div>
                <h2 className="text-8xl md:text-[10vw] font-archivo text-primary tracking-tighter uppercase leading-[0.8] mb-12">{selectedProject.title}</h2>
                <p className="text-xl md:text-2xl font-inter text-primary/80 leading-relaxed max-w-lg mb-24">
                  {selectedProject.description}
                </p>

                <div className="space-y-12 border-t border-primary/10 pt-12">
                   <div className="flex justify-between items-center group">
                      <span className="font-space text-[10px] tracking-widest text-primary/40 uppercase">Role</span>
                      <span className="font-archivo text-lg text-primary uppercase group-hover:text-accent transition-colors">Lead Experience Design</span>
                   </div>
                   <div className="flex justify-between items-center group">
                      <span className="font-space text-[10px] tracking-widest text-primary/40 uppercase">Stack</span>
                      <span className="font-archivo text-lg text-primary uppercase group-hover:text-accent transition-colors">React / Three.js / GSAP</span>
                   </div>
                   <div className="flex justify-between items-center group">
                      <span className="font-space text-[10px] tracking-widest text-primary/40 uppercase">Live Site</span>
                      <span className="font-archivo text-lg text-primary uppercase border-b border-primary/20 hover:border-accent hover:text-accent transition-all cursor-pointer">Visit Link ↗</span>
                   </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
