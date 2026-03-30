import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function FloatingOrb() {
  const meshRef = useRef();

  useFrame((state) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += 0.003;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
  });

  return (
    <group>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.15, 1]} />
        <meshPhysicalMaterial
          roughness={0.08}
          metalness={0.15}
          transmission={0.95}
          thickness={1.2}
          clearcoat={1}
          clearcoatRoughness={0.1}
          iridescence={0.6}
        />
      </mesh>

      <mesh scale={1.45}>
        <torusGeometry args={[1.25, 0.03, 16, 100]} />
        <meshStandardMaterial emissive="#66e3ff" emissiveIntensity={1.5} />
      </mesh>
    </group>
  );
}