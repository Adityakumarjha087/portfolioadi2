import { Component, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2 uPointer;
  uniform float uSize;
  varying float vGlow;

  // Simplex noise, Ashima Arts / Ian McEwan (MIT).
  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v){
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 1.0/7.0;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  void main() {
    vec3 n = normalize(position);
    float wave = snoise(n * 1.5 + vec3(0.0, 0.0, uTime * 0.18));
    float ripple = snoise(n * 4.0 - vec3(uTime * 0.12)) * 0.25;
    float pull = max(dot(n, normalize(vec3(uPointer, 0.8))), 0.0);
    float disp = wave * 0.34 + ripple * 0.22 + pow(pull, 5.0) * 0.28;
    vec4 mv = modelViewMatrix * vec4(position + n * disp, 1.0);
    vGlow = smoothstep(-0.45, 0.7, disp) * smoothstep(-7.4, -3.8, mv.z);
    gl_PointSize = uSize * (0.6 + vGlow) / -mv.z;
    gl_Position = projectionMatrix * mv;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uOpacity;
  varying float vGlow;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.1, d);
    gl_FragColor = vec4(vec3(0.55 + vGlow * 0.45), a * (0.12 + vGlow * 0.88) * uOpacity);
  }
`;

function ParticleSphere({ count, opacity, pointer }) {
  const dpr = useThree((s) => s.viewport.dpr);
  const group = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      arr.set([Math.cos(golden * i) * r * 1.65, y * 1.65, Math.sin(golden * i) * r * 1.65], i * 3);
    }
    return arr;
  }, [count]);
  const uniforms = useMemo(
    () => ({
      uTime: { value: 4 },
      uPointer: { value: new THREE.Vector2(0, 0) },
      uSize: { value: 18 },
      uOpacity: { value: 1 },
    }),
    []
  );

  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    const u = uniforms;
    u.uTime.value += dt;
    u.uSize.value = 13 * dpr;
    u.uOpacity.value = opacity;
    u.uPointer.value.lerp(pointer.current, 0.06);
    group.current.rotation.y += dt * 0.09;
    group.current.rotation.x = -u.uPointer.value.y * 0.2 + window.scrollY * 0.0006;
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        </bufferGeometry>
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

function Rings({ opacity }) {
  const a = useRef();
  const b = useRef();
  useFrame((_, delta) => {
    const dt = Math.min(delta, 0.05);
    a.current.rotation.z += dt * 0.12;
    b.current.rotation.z -= dt * 0.08;
  });
  return (
    <>
      <group rotation={[1.2, 0.25, 0]}>
        <group ref={a}>
          <mesh>
            <torusGeometry args={[2.35, 0.006, 6, 160]} />
            <meshBasicMaterial color="#a1a1aa" transparent opacity={0.5 * opacity} />
          </mesh>
          <mesh position={[2.35, 0, 0]}>
            <sphereGeometry args={[0.045, 16, 16]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={opacity} />
          </mesh>
        </group>
      </group>
      <group rotation={[1.45, -0.5, 0]}>
        <group ref={b}>
          <mesh>
            <torusGeometry args={[2.75, 0.005, 6, 160]} />
            <meshBasicMaterial color="#71717a" transparent opacity={0.4 * opacity} />
          </mesh>
          <mesh position={[-2.75, 0, 0]}>
            <sphereGeometry args={[0.03, 16, 16]} />
            <meshBasicMaterial color="#ffffff" transparent opacity={opacity} />
          </mesh>
        </group>
      </group>
    </>
  );
}

function Stars({ count }) {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr.set([THREE.MathUtils.randFloatSpread(22), THREE.MathUtils.randFloatSpread(14), -2 - Math.random() * 10], i * 3);
    }
    return arr;
  }, [count]);
  useFrame((_, delta) => {
    ref.current.rotation.z += Math.min(delta, 0.05) * 0.006;
  });
  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#ffffff" size={0.028} sizeAttenuation transparent opacity={0.5} depthWrite={false} />
    </points>
  );
}

// The hero must still work when WebGL is unavailable.
class SceneBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}

function World({ wide, pointer }) {
  const x = wide ? 1.75 : 0.9;
  const opacity = wide ? 1 : 0.38;
  return (
    <>
      <Stars count={wide ? 420 : 180} />
      <group position={[x, wide ? 0 : 0.9, 0]} scale={wide ? 0.95 : 0.75}>
        <ParticleSphere count={wide ? 7000 : 2600} opacity={opacity} pointer={pointer} />
        <Rings opacity={opacity} />
      </group>
    </>
  );
}

export default function Scene3D() {
  const rootRef = useRef(null);
  const pointer = useRef(new THREE.Vector2(0, 0));
  const [wide, setWide] = useState(() => window.matchMedia("(min-width: 1024px)").matches);
  const [reduced, setReduced] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const wideQuery = window.matchMedia("(min-width: 1024px)");
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onWide = (e) => setWide(e.matches);
    const onMotion = (e) => setReduced(e.matches);
    const onMove = (e) =>
      pointer.current.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
    wideQuery.addEventListener("change", onWide);
    motionQuery.addEventListener("change", onMotion);
    window.addEventListener("pointermove", onMove, { passive: true });

    // Stop rendering once the hero is off screen.
    const io = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    io.observe(rootRef.current);
    return () => {
      wideQuery.removeEventListener("change", onWide);
      motionQuery.removeEventListener("change", onMotion);
      window.removeEventListener("pointermove", onMove);
      io.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} className="absolute inset-0 pointer-events-none" aria-hidden="true">
      <SceneBoundary>
        <Canvas
          key={wide ? "wide" : "narrow"}
          camera={{ position: [0, 0, 5.6], fov: 55 }}
          dpr={[1, wide ? 1.6 : 1.4]}
          frameloop={reduced || !visible ? "demand" : "always"}
          gl={{ alpha: true, antialias: false, powerPreference: "high-performance" }}
        >
          <World wide={wide} pointer={pointer} />
        </Canvas>
      </SceneBoundary>
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" />
    </div>
  );
}
