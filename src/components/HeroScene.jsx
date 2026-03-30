import { Canvas } from "@react-three/fiber";
import { Float, Environment, OrbitControls } from "@react-three/drei";
import FloatingOrb from "./FloatingOrb";

export default function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 4.5], fov: 45 }} dpr={[1, 1.5]}>
      <ambientLight intensity={1.2} />
      <directionalLight position={[3, 3, 4]} intensity={2} />
      <pointLight position={[-3, -2, 2]} intensity={1.5} />

      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={1}>
        <FloatingOrb />
      </Float>

      <Environment preset="city" />
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate
        autoRotateSpeed={1.2}
      />
    </Canvas>
  );
}