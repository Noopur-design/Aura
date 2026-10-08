import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useMemo, useState } from "react";
import * as Slider from "@radix-ui/react-slider";
import { AssemblyNotes } from "@/components/technology/AssemblyNotes";

function Rig({ amount }: { amount: number }) {
  const spread = amount / 100;
  const shell = useMemo(() => 0.15 + spread * 0.85, [spread]);
  return (
    <group position={[0, 0.1, 0]}>
      <mesh position={[-shell, 0.1, 0]}>
        <cylinderGeometry args={[0.78, 0.84, 2.1, 48, 1, true, 0, Math.PI]} />
        <meshStandardMaterial color="#f3f1ec" side={2} roughness={0.6} />
      </mesh>
      <mesh position={[shell, 0.1, 0]} rotation={[0, Math.PI, 0]}>
        <cylinderGeometry args={[0.78, 0.84, 2.1, 48, 1, true, 0, Math.PI]} />
        <meshStandardMaterial color="#f7f4ef" side={2} roughness={0.6} />
      </mesh>
      <mesh position={[0, 0.95 + spread * 0.9, 0]}>
        <torusGeometry args={[0.72, 0.025, 12, 48]} />
        <meshStandardMaterial color="#d9d3c8" metalness={0.8} roughness={0.25} />
      </mesh>
      <mesh position={[0, 0.55 + spread * 0.35, 0]}>
        <torusGeometry args={[0.42, 0.05, 12, 40]} />
        <meshStandardMaterial color="#7eaeae" roughness={0.4} />
      </mesh>
      <mesh position={[0, 0.35 + spread * 1.15, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.28, 32]} />
        <meshStandardMaterial color="#b7b1a6" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.15 + spread * 0.7, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 0.08, 28]} />
        <meshStandardMaterial color="#cfc8bc" metalness={0.45} roughness={0.35} />
      </mesh>
      <mesh position={[0, -0.15 - spread * 0.15, 0]}>
        <cylinderGeometry args={[0.48, 0.48, 0.9, 40]} />
        <meshStandardMaterial color="#f4f1ea" roughness={0.85} />
      </mesh>
      <mesh position={[0, -0.72 - spread * 0.55, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.28, 40]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.9} />
      </mesh>
      <mesh position={[0, -0.2, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 1.7, 32, 1, true]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.08} side={2} />
      </mesh>
      <mesh position={[0, -1.25 - spread * 0.4, 0]}>
        <cylinderGeometry args={[0.9, 0.9, 0.12, 48]} />
        <meshStandardMaterial color="#c8c2b6" metalness={0.8} roughness={0.28} />
      </mesh>
    </group>
  );
}

export function ExplodedView() {
  const [amount, setAmount] = useState(42);
  const [active, setActive] = useState("shell");

  return (
    <div className="grid gap-8 lg:grid-cols-12">
      <div className="relative min-h-[22rem] bg-charcoal sm:min-h-[32rem] lg:col-span-7" data-cursor="drag">
        <Canvas camera={{ position: [2.4, 0.4, 4.2], fov: 35 }} dpr={[1, 1.25]}>
          <color attach="background" args={["#181818"]} />
          <ambientLight intensity={0.7} />
          <directionalLight position={[3, 4, 4]} intensity={2.2} />
          <directionalLight position={[-3, 1, -2]} intensity={0.5} />
          <Rig amount={amount} />
          <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.45} />
        </Canvas>
        <label className="absolute right-4 bottom-4 left-4 text-paper">
          <span className="eyebrow text-sand">Explode</span>
          <Slider.Root
            className="relative mt-3 flex h-11 touch-none items-center"
            value={[amount]}
            max={100}
            step={1}
            onValueChange={(value) => setAmount(value[0] ?? 0)}
            aria-label="Exploded view amount"
          >
            <Slider.Track className="relative h-px grow bg-pure/30">
              <Slider.Range className="absolute h-px bg-mist" />
            </Slider.Track>
            <Slider.Thumb className="block size-4 rounded-full bg-paper" />
          </Slider.Root>
        </label>
      </div>
      <div className="lg:col-span-5">
        <AssemblyNotes active={active} onSelect={setActive} />
      </div>
    </div>
  );
}

export default ExplodedView;
