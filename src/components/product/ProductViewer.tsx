import { ContactShadows, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { Photo } from "@/components/media/Photo";

export type FinishId = "ceramic" | "graphite" | "sand";

export type ProductViewerProps = {
  model?: string;
  autoRotate?: boolean;
  interactive?: boolean;
  cameraPosition?: [number, number, number];
  background?: "paper" | "charcoal" | "transparent";
  showHotspots?: boolean;
  finish?: FinishId;
  scrollRotation?: number;
  className?: string;
};

const FINISH: Record<FinishId, string> = {
  ceramic: "#f3f1ec",
  graphite: "#2a2a2a",
  sand: "#d8c7b0",
};

const HOTSPOTS = [
  { id: "grille", label: "Outlet", x: "50%", y: "18%", copy: "Clean air leaves through a flush radial grille. The pattern slows the stream so it doesn’t travel across a table." },
  { id: "ring", label: "Control ring", x: "62%", y: "36%", copy: "One machined ring. Turn for airflow, press to change mode. The aqua point is the only light AURA shows the room." },
  { id: "shell", label: "Ceramic shell", x: "38%", y: "58%", copy: "A mineral-filled ceramic composite. Matte, dense, and heavy enough to damp the motor." },
  { id: "base", label: "Plinth", x: "50%", y: "84%", copy: "Brushed metal, slightly wider than the body. Intake sits in the shadow line, out of sight." },
];

function grilleTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "#efece6";
  ctx.fillRect(0, 0, 512, 512);
  ctx.strokeStyle = "rgba(17,17,17,0.22)";
  ctx.lineWidth = 1;
  for (let i = 0; i < 72; i += 1) {
    const angle = (i / 72) * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(256, 256);
    ctx.lineTo(256 + Math.cos(angle) * 230, 256 + Math.sin(angle) * 230);
    ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 8;
  return texture;
}

function Study({
  finish,
  autoRotate,
  scrollRotation,
}: {
  finish: FinishId;
  autoRotate?: boolean;
  scrollRotation?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const texture = useMemo(() => grilleTexture(), []);
  useFrame((_, delta) => {
    const node = group.current;
    if (!node) return;
    if (typeof scrollRotation === "number") {
      node.rotation.y = scrollRotation;
      return;
    }
    if (autoRotate) node.rotation.y += delta * 0.25;
  });
  const body = FINISH[finish];
  return (
    <group ref={group} position={[0, 0.05, 0]}>
      <mesh position={[0, -1.28, 0]} castShadow>
        <cylinderGeometry args={[0.9, 0.9, 0.12, 72]} />
        <meshStandardMaterial color="#c2bbb1" metalness={0.82} roughness={0.28} />
      </mesh>
      <mesh position={[0, -0.08, 0]} castShadow>
        <cylinderGeometry args={[0.74, 0.82, 2.2, 80]} />
        <meshPhysicalMaterial color={body} roughness={0.62} metalness={0.04} clearcoat={0.12} clearcoatRoughness={0.6} />
      </mesh>
      <mesh position={[0, 0.78, 0]}>
        <torusGeometry args={[0.745, 0.02, 16, 90]} />
        <meshStandardMaterial color="#d5cfc4" metalness={0.88} roughness={0.22} />
      </mesh>
      <mesh position={[0, 0.78, 0.76]}>
        <sphereGeometry args={[0.02, 16, 16]} />
        <meshStandardMaterial color="#7eaeae" emissive="#7eaeae" emissiveIntensity={0.7} />
      </mesh>
      <mesh position={[0, 1.16, 0]} castShadow>
        <cylinderGeometry args={[0.7, 0.74, 0.34, 72]} />
        <meshPhysicalMaterial color={body} roughness={0.55} metalness={0.03} />
      </mesh>
      <mesh position={[0, 1.34, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[0.62, 72]} />
        <meshStandardMaterial map={texture ?? undefined} color="#f6f3ee" roughness={0.85} />
      </mesh>
    </group>
  );
}

function GltfModel({ url }: { url: string }) {
  const gltf = useGLTF(url);
  return <primitive object={gltf.scene} />;
}

function Scene({
  model,
  useModel,
  ...props
}: ProductViewerProps & { useModel: boolean }) {
  const background =
    props.background === "charcoal" ? "#181818" : props.background === "transparent" ? null : "#f4f2ed";
  return (
    <>
      {background ? <color attach="background" args={[background]} /> : null}
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 4]} intensity={2.4} />
      <directionalLight position={[-3, 2, -2]} intensity={0.55} />
      <directionalLight position={[0, 3, -4]} intensity={0.7} color="#e4f1f1" />
      <Suspense fallback={null}>
        {useModel && model ? <GltfModel url={model} /> : <Study finish={props.finish ?? "ceramic"} autoRotate={props.autoRotate} scrollRotation={props.scrollRotation} />}
      </Suspense>
      <ContactShadows position={[0, -1.38, 0]} opacity={0.35} scale={8} blur={2.4} far={2} color="#111111" />
      <OrbitControls
        enablePan={false}
        enableZoom={false}
        enableRotate={Boolean(props.interactive) && props.scrollRotation == null}
        autoRotate={false}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.75}
      />
    </>
  );
}

class ViewBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export function ProductViewer(props: ProductViewerProps) {
  const {
    model = "/models/aura-one.glb",
    interactive = true,
    cameraPosition = [0, 0.2, 4.8],
    background = "paper",
    showHotspots = false,
    className,
  } = props;
  const [useModel, setUseModel] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const controls = useRef<{ object: THREE.Camera; target: THREE.Vector3; update: () => void } | null>(null);
  const spot = HOTSPOTS.find((item) => item.id === active);

  useEffect(() => {
    let cancel = false;
    void fetch(model)
      .then((response) => {
        const type = response.headers.get("content-type") ?? "";
        if (!cancel && response.ok && !type.includes("text/html") && !type.includes("text/plain")) {
          setUseModel(true);
        }
      })
      .catch(() => {});
    return () => {
      cancel = true;
    };
  }, [model]);

  function zoom(direction: number) {
    const orbit = controls.current;
    if (!orbit) return;
    const offset = new THREE.Vector3().subVectors(orbit.object.position, orbit.target);
    const next = THREE.MathUtils.clamp(offset.length() * (direction > 0 ? 0.86 : 1.16), 3.2, 6.4);
    offset.setLength(next);
    orbit.object.position.copy(orbit.target).add(offset);
    orbit.update();
  }

  const fallback = (
    <Photo src="/images/aura/hero.jpg" alt="AURA ONE in warm ceramic" className="object-contain" priority />
  );

  return (
    <div className={className ?? "relative h-full min-h-[28rem] w-full"} data-cursor={interactive ? "drag" : undefined}>
      <ViewBoundary fallback={fallback}>
        <Canvas
          camera={{ position: cameraPosition, fov: 32 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: background === "transparent" }}
          onCreated={({ controls: created }) => {
            controls.current = created as never;
          }}
        >
          <Scene {...props} model={model} useModel={useModel} />
        </Canvas>
      </ViewBoundary>
      {interactive ? (
        <div className="absolute right-3 bottom-3 flex gap-2">
          <button type="button" className="size-11 bg-paper/90 text-ink" onClick={() => zoom(1)} aria-label="Zoom in">
            +
          </button>
          <button type="button" className="size-11 bg-paper/90 text-ink" onClick={() => zoom(-1)} aria-label="Zoom out">
            −
          </button>
        </div>
      ) : null}
      {showHotspots
        ? HOTSPOTS.map((item) => (
            <button
              key={item.id}
              type="button"
              className="absolute size-11 -translate-x-1/2 -translate-y-1/2"
              style={{ left: item.x, top: item.y }}
              aria-label={item.label}
              aria-pressed={active === item.id}
              onClick={() => setActive((current) => (current === item.id ? null : item.id))}
            >
              <span className="mx-auto block size-3 rounded-full border border-ink bg-paper" />
            </button>
          ))
        : null}
      {showHotspots && spot ? (
        <aside className="absolute bottom-4 left-4 max-w-xs bg-paper p-4 text-ink">
          <p className="eyebrow text-stone">{spot.label}</p>
          <p className="mt-2 text-body">{spot.copy}</p>
        </aside>
      ) : null}
    </div>
  );
}

export default ProductViewer;
