import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, PerspectiveCamera, Float } from "@react-three/drei";
import * as THREE from "three";
import { motion } from "framer-motion";

const LaptopModel = () => {
  const group = useRef<THREE.Group>(null);
  
  // Mouse movement rotation logic
  useFrame((state) => {
    if (!group.current) return;
    // Subtle rotation based on mouse
    const x = (state.mouse.y * 0.1);
    const y = (state.mouse.x * 0.1);
    
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, x, 0.1);
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, y, 0.1);
  });

  const bodyColor = "#AD8B73";
  const frameColor = "#2C1E18"; // Darker brown
  const screenColor = "#111111";

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        {/* BASE */}
        <mesh receiveShadow castShadow position={[0, -0.1, 0]}>
          <boxGeometry args={[4, 0.2, 2.8]} />
          <meshStandardMaterial color={bodyColor} roughness={0.7} metalness={0.2} />
        </mesh>

        {/* SCREEN SECTION (Hinged at the back of the base) */}
        <group position={[0, 0, -1.4]} rotation={[Math.PI * -0.6, 0, 0]}>
          {/* Screen Frame */}
          <mesh receiveShadow castShadow position={[0, 1.4, 0.05]}>
            <boxGeometry args={[4, 2.8, 0.1]} />
            <meshStandardMaterial color={bodyColor} roughness={0.7} metalness={0.2} />
          </mesh>
          
          {/* Screen Panel (The actual display) */}
          <mesh position={[0, 1.4, 0.11]}>
            <boxGeometry args={[3.7, 2.5, 0.02]} />
            <meshStandardMaterial 
              color={screenColor} 
              emissive={screenColor} 
              emissiveIntensity={0.5}
              roughness={0.1}
            />
          </mesh>

          {/* Screen Border/Frame Detail */}
          <mesh position={[0, 1.4, 0.1]}>
            <boxGeometry args={[3.9, 2.7, 0.02]} />
            <meshStandardMaterial color={frameColor} roughness={0.8} />
          </mesh>
        </group>

        {/* HINGE DETAIL */}
        <mesh position={[0, 0, -1.4]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.08, 0.08, 3.8, 12]} />
          <meshStandardMaterial color={frameColor} roughness={0.5} />
        </mesh>
      </Float>
    </group>
  );
};

export const Laptop3D = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full h-full flex items-center justify-center bg-transparent"
    >
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 2, 5]} fov={45} />
        
        {/* LIGHTING */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1} 
          castShadow 
          shadow-mapSize={[1024, 1024]}
        />
        <spotLight position={[-5, 5, 5]} intensity={0.5} angle={0.3} penumbra={1} />

        <Suspense fallback={null}>
          <LaptopModel />
          <Environment preset="city" />
          <ContactShadows 
            position={[0, -0.5, 0]} 
            opacity={0.4} 
            scale={10} 
            blur={2} 
            far={1} 
          />
        </Suspense>
      </Canvas>
    </motion.div>
  );
};
