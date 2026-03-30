import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Float } from "@react-three/drei";
import { useMemo, useRef } from "react";
import FloatingOrb from "./FloatingOrb";

function ReactiveLight() {
  const lightRef = useRef();
  const { mouse } = useThree();

  useFrame(() => {
    if (!lightRef.current) return;

    lightRef.current.position.x +=
      (mouse.x * 3 - lightRef.current.position.x) * 0.08;
    lightRef.current.position.y +=
      (mouse.y * 2 - lightRef.current.position.y) * 0.08;
  });

  return (
    <pointLight
      ref={lightRef}
      position={[0, 0, 3]}
      intensity={2.5}
      color="#66e3ff"
    />
  );
}

function BackgroundParticles() {
  const pointsRef = useRef();

  const particles = useMemo(() => {
    const count = 180;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }

    return positions;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.03;
    pointsRef.current.rotation.x =
      Math.sin(state.clock.elapsedTime * 0.1) * 0.08;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#9fe8ff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.8], fov: 45 }} dpr={[1, 2]}>
      <ambientLight intensity={1.1} />
      <directionalLight position={[3, 3, 4]} intensity={1.8} />
      <pointLight position={[-4, -2, 3]} intensity={1.5} color="#8f7dff" />
      <ReactiveLight />

      <mesh position={[0, 0, -2]}>
        <planeGeometry args={[8, 8]} />
        <meshBasicMaterial color="#12243d" transparent opacity={0.35} />
      </mesh>

      <mesh position={[0.8, 0.3, -1.8]}>
        <planeGeometry args={[3.5, 3.5]} />
        <meshBasicMaterial color="#66e3ff" transparent opacity={0.08} />
      </mesh>

      <BackgroundParticles />

      <Float speed={1.6} rotationIntensity={0.35} floatIntensity={0.8}>
        <FloatingOrb />
      </Float>

      <Environment preset="city" />
    </Canvas>
  );
}