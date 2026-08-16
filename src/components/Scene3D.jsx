import { useRef, useEffect, useState, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// High-Performance Ambient Starfield
function StarField({ count }) {
  const pointsRef = useRef();

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
      const phi = THREE.MathUtils.randFloat(0, Math.PI);
      const r = THREE.MathUtils.randFloat(10, 30);
      
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.005;
    pointsRef.current.rotation.x = time * 0.002;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.04}
        sizeAttenuation={true}
        depthWrite={false}
        opacity={0.3}
      />
    </Points>
  );
}

// Nested Geometric Wireframe Sculpture
function NestedSculpture({ reducedMotion }) {
  const innerRef = useRef();
  const outerRingRef1 = useRef();
  const outerRingRef2 = useRef();
  const groupRef = useRef();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame((state) => {
    if (reducedMotion) return;

    const time = state.clock.getElapsedTime();
    
    // Smooth rotation of internal components
    innerRef.current.rotation.y = time * 0.15;
    innerRef.current.rotation.x = time * 0.08;
    
    outerRingRef1.current.rotation.x = time * 0.05;
    outerRingRef1.current.rotation.y = time * 0.1;
    
    outerRingRef2.current.rotation.z = time * 0.07;
    outerRingRef2.current.rotation.x = -time * 0.04;

    // Damp/interpolate camera based on mouse for interactive tilt
    state.camera.position.x += (mouse.current.x * 2.0 - state.camera.position.x) * 0.04;
    state.camera.position.y += (mouse.current.y * 1.2 + 1.2 - state.camera.position.y) * 0.04;
    state.camera.lookAt(0, 0.4, 0);
  });

  return (
    <group ref={groupRef} position={[0, 0.4, 0]}>
      {/* Inner Icosahedron Wireframe */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial 
          color="#3f3f46" 
          wireframe 
          transparent 
          opacity={0.4} 
        />
      </mesh>

      {/* Nested Core Solid Points */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.4, 1]} />
        <meshBasicMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.1} 
        />
      </mesh>

      {/* Gimbal Ring 1 */}
      <mesh ref={outerRingRef1} rotation={[Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.2, 0.015, 8, 64]} />
        <meshBasicMaterial color="#71717a" transparent opacity={0.6} />
      </mesh>

      {/* Gimbal Ring 2 */}
      <mesh ref={outerRingRef2} rotation={[0, Math.PI / 4, 0]}>
        <torusGeometry args={[2.6, 0.012, 8, 64]} />
        <meshBasicMaterial color="#a1a1aa" transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

export default function Scene3D() {
  const [deviceQuality, setDeviceQuality] = useState("high");
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(motionQuery.matches);
    const handleMotionChange = (e) => setReducedMotion(e.matches);
    motionQuery.addEventListener("change", handleMotionChange);

    const checkQuality = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setDeviceQuality("mobile");
      } else {
        setDeviceQuality("high");
      }
    };
    checkQuality();
    window.addEventListener("resize", checkQuality);

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      window.removeEventListener("resize", checkQuality);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 bg-black overflow-hidden">
      <Canvas
        camera={{ position: [0, 1.2, 5.5], fov: 60 }}
        // Cap the DPI/DPR to 1.5 on desktop, and 1.0 on mobile to completely prevent scroll stutter
        dpr={deviceQuality === "mobile" ? 1.0 : 1.3}
        gl={{ alpha: false, antialias: deviceQuality !== "mobile", powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#000000"]} />
        <Suspense fallback={null}>
          <StarField count={deviceQuality === "mobile" ? 100 : 300} />
          <NestedSculpture reducedMotion={reducedMotion} />
        </Suspense>
      </Canvas>
    </div>
  );
}
