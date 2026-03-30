import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export default function FloatingOrb() {
  const groupRef = useRef();
  const orbRef = useRef();
  const ringOneRef = useRef();
  const ringTwoRef = useRef();
  const haloRef = useRef();

  const { mouse } = useThree();

  useFrame((state) => {
    const t = state.clock.elapsedTime;

    const targetX = mouse.x * 1.2;
    const targetY = mouse.y * 0.9;

    if (groupRef.current) {
      groupRef.current.rotation.y +=
        (targetX * 0.35 - groupRef.current.rotation.y) * 0.06;

      groupRef.current.rotation.x +=
        (-targetY * 0.25 - groupRef.current.rotation.x) * 0.06;

      groupRef.current.position.x +=
        (mouse.x * 0.5 - groupRef.current.position.x) * 0.06;

      groupRef.current.position.y +=
        (mouse.y * 0.28 - groupRef.current.position.y) * 0.06;
    }

    if (orbRef.current) {
      orbRef.current.rotation.y += 0.01;
      orbRef.current.rotation.x +=
        (targetY * 0.3 - orbRef.current.rotation.x) * 0.08;
      orbRef.current.rotation.z +=
        (-targetX * 0.25 - orbRef.current.rotation.z) * 0.08;

      const pulse = 1 + Math.sin(t * 1.8) * 0.025;
      orbRef.current.scale.lerp(
        new THREE.Vector3(pulse, pulse, pulse),
        0.08
      );
    }

    if (ringOneRef.current) {
      ringOneRef.current.rotation.x += 0.012;
      ringOneRef.current.rotation.y += 0.008;
      ringOneRef.current.rotation.z +=
        (targetX * 0.8 - ringOneRef.current.rotation.z) * 0.05;
    }

    if (ringTwoRef.current) {
      ringTwoRef.current.rotation.y -= 0.01;
      ringTwoRef.current.rotation.z += 0.006;
      ringTwoRef.current.rotation.x +=
        (-targetY * 0.7 - ringTwoRef.current.rotation.x) * 0.05;
    }

    if (haloRef.current) {
      const haloScale =
        1.9 + Math.sin(t * 2.4) * 0.08 + Math.abs(mouse.x) * 0.12;

      haloRef.current.scale.lerp(
        new THREE.Vector3(haloScale, haloScale, haloScale),
        0.08
      );
    }
  });

  return (
    <group ref={groupRef}>
      <mesh ref={orbRef}>
        <icosahedronGeometry args={[1.05, 5]} />
        <meshPhysicalMaterial
          color="#c8f5ff"
          roughness={0.05}
          metalness={0.25}
          transmission={1}
          thickness={2}
          clearcoat={1}
          clearcoatRoughness={0.06}
          iridescence={1}
          reflectivity={1}
        />
      </mesh>

      <mesh scale={0.45}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#8fe9ff"
          emissiveIntensity={1.8}
          transparent
          opacity={0.9}
        />
      </mesh>

      <mesh ref={ringOneRef} scale={1.45}>
        <torusGeometry args={[1.15, 0.028, 32, 220]} />
        <meshStandardMaterial
          color="#66e3ff"
          emissive="#66e3ff"
          emissiveIntensity={2.8}
        />
      </mesh>

      <mesh ref={ringTwoRef} scale={1.85} rotation={[1.1, 0.3, 0.8]}>
        <torusGeometry args={[1.05, 0.018, 24, 220]} />
        <meshStandardMaterial
          color="#8f7dff"
          emissive="#8f7dff"
          emissiveIntensity={2}
        />
      </mesh>

      <mesh scale={2.15} rotation={[0.4, 0.8, 0.3]}>
        <torusGeometry args={[0.98, 0.012, 24, 220]} />
        <meshStandardMaterial
          color="#c7f7ff"
          emissive="#c7f7ff"
          emissiveIntensity={1.3}
        />
      </mesh>

      <mesh ref={haloRef}>
        <sphereGeometry args={[1.55, 48, 48]} />
        <meshBasicMaterial color="#5fdcff" transparent opacity={0.06} />
      </mesh>
    </group>
  );
}