"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, useProgress } from "@react-three/drei";
import { Suspense, useMemo, useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { cn } from "@/lib/utils";
import { RotateCcw, Move, MousePointer, ScanSearch } from "lucide-react";

// ---------------------------------------------------------------------------
// Shaders
// ---------------------------------------------------------------------------

// Cartoon outline: back-face expansion in clip space.
// Multiplying by clipPos.w before perspective division keeps outline width
// constant in screen space regardless of depth.
const outlineVertexShader = /* glsl */ `
  uniform float thickness;
  void main() {
    vec4 clipPos  = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    vec4 clipNorm = projectionMatrix * vec4(normalMatrix * normal, 0.0);
    clipPos.xy += normalize(clipNorm.xy) * thickness * clipPos.w;
    gl_Position = clipPos;
  }
`;

const outlineFragmentShader = /* glsl */ `
  uniform vec3 outlineColor;
  void main() {
    gl_FragColor = vec4(outlineColor, 1.0);
  }
`;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Three-stop gradient map → sharp toon shadow band
function makeToonGradientMap() {
  const data = new Uint8Array([0, 180, 255]);
  const tex = new THREE.DataTexture(data, 3, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

// ---------------------------------------------------------------------------
// Scene (inside Canvas)
// ---------------------------------------------------------------------------

interface PanLimit {
  x?: [number, number];
  y?: [number, number];
  z?: [number, number];
}

interface ModelSceneProps {
  src: string;
  materialColors: Record<string, string>;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  outlineThickness: number;
  outlineColor: string;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  minDistance: number;
  maxDistance: number;
  panLimit: PanLimit;
}

function ModelScene({
  src,
  materialColors,
  position,
  rotation,
  scale,
  outlineThickness,
  outlineColor,
  controlsRef,
  minDistance,
  maxDistance,
  panLimit,
}: ModelSceneProps) {
  const { scene } = useGLTF(src);

  const gradientMap = useMemo(() => makeToonGradientMap(), []);

  const outlineMaterial = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: outlineVertexShader,
        fragmentShader: outlineFragmentShader,
        uniforms: {
          thickness: { value: outlineThickness },
          outlineColor: { value: new THREE.Color(outlineColor) },
        },
        side: THREE.BackSide,
      }),
    [outlineThickness, outlineColor]
  );

  // Clone so we can mutate materials without poisoning the useGLTF cache
  const [mainScene, outlineScene] = useMemo(() => {
    const main = scene.clone(true);
    const outline = scene.clone(true);

    main.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const matName: string = Array.isArray(child.material)
        ? child.material[0]?.name ?? ""
        : child.material?.name ?? "";
      const color = materialColors[matName] ?? materialColors["*"] ?? "#ffffff";
      child.material = new THREE.MeshToonMaterial({
        color: new THREE.Color(color),
        gradientMap,
      });
    });

    outline.traverse((child) => {
      if (child instanceof THREE.Mesh) child.material = outlineMaterial;
    });

    return [main, outline];
  }, [scene, materialColors, gradientMap, outlineMaterial]);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    const t = controls.target;

    // Compute how much each axis needs to be pulled back to stay within limits.
    // Apply the same delta to the camera so the camera→target vector is
    // preserved — otherwise OrbitControls' spherical coords become stale and
    // the next rotation snaps to the wrong origin.
    let dx = 0, dy = 0, dz = 0;
    if (panLimit.x) { const cx = Math.max(panLimit.x[0], Math.min(panLimit.x[1], t.x)); dx = cx - t.x; t.x = cx; }
    if (panLimit.y) { const cy = Math.max(panLimit.y[0], Math.min(panLimit.y[1], t.y)); dy = cy - t.y; t.y = cy; }
    if (panLimit.z) { const cz = Math.max(panLimit.z[0], Math.min(panLimit.z[1], t.z)); dz = cz - t.z; t.z = cz; }
    if (dx !== 0 || dy !== 0 || dz !== 0) {
      controls.object.position.x += dx;
      controls.object.position.y += dy;
      controls.object.position.z += dz;
    }
  });

  useEffect(() => {
    return () => {
      mainScene.traverse((child) => {
        if (child instanceof THREE.Mesh) child.material?.dispose?.();
      });
      outlineScene.traverse((child) => {
        if (child instanceof THREE.Mesh) child.material?.dispose?.();
      });
      gradientMap.dispose();
    };
  }, [mainScene, outlineScene, gradientMap]);

  return (
    <>
      <group position={position} rotation={rotation} scale={scale}>
        <primitive object={outlineScene} />
        <primitive object={mainScene} />
      </group>

      <OrbitControls
        ref={controlsRef}
        enablePan
        enableRotate
        enableZoom
        minDistance={minDistance}
        maxDistance={maxDistance}
        mouseButtons={{
          LEFT: THREE.MOUSE.ROTATE,
          MIDDLE: THREE.MOUSE.DOLLY,
          RIGHT: THREE.MOUSE.PAN,
        }}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
      />
    </>
  );
}

// ---------------------------------------------------------------------------
// DOM overlay – hints + reset button
// ---------------------------------------------------------------------------

const hints = [
  { icon: MousePointer, label: "Drag to rotate" },
  { icon: ScanSearch,   label: "Scroll to zoom" },
  { icon: Move,         label: "Right-drag to pan" },
] as const;

interface OverlayProps {
  onReset: () => void;
  loading: boolean;
  progress: number;
}

function ViewerOverlay({ onReset, loading, progress }: OverlayProps) {
  return (
    <div className="absolute inset-0 pointer-events-none select-none flex flex-col justify-between p-3">
      {/* ── top-right: reset ── */}
      <div className="flex justify-end">
        <button
          onClick={onReset}
          className={cn(
            "pointer-events-auto flex items-center gap-1.5 rounded-lg px-2.5 py-1.5",
            "text-xs font-medium text-foreground/60 hover:text-foreground",
            "bg-background/60 hover:bg-background/80 backdrop-blur-sm",
            "border border-foreground/10 hover:border-foreground/20",
            "transition-all duration-150 cursor-pointer",
          )}
        >
          <RotateCcw className="size-3" />
          Reset view
        </button>
      </div>

      {/* ── loading bar ── */}
      {loading && (
        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground/10">
          <div
            className="h-full bg-foreground/40 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {/* ── bottom: control hints ── */}
      <div className="flex items-center justify-center gap-4">
        {hints.map(({ icon: Icon, label }) => (
          <span
            key={label}
            className="flex items-center gap-1 text-[11px] font-medium text-foreground/40"
          >
            <Icon className="size-3 shrink-0" />
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export interface ModelConfig {
  /** Path to a .glb / .gltf file (relative to /public) */
  src: string;
  /**
   * Map from material name → CSS hex/named color.
   * Use `"*"` as a wildcard fallback for any unmatched material.
   */
  materialColors?: Record<string, string>;
  /** World-space [x, y, z] offset for the model group (default [0, 0, 0]) */
  position?: [number, number, number];
  /** Euler rotation [x, y, z] in radians applied to the model group (default [0, 0, 0]) */
  rotation?: [number, number, number];
  /** Uniform scale applied to the model group (default 1) */
  scale?: number;
  /** Cartoon outline settings */
  outline?: {
    /** Screen-space outline thickness (default 0.025) */
    thickness?: number;
    /** CSS color string (default "#000000") */
    color?: string;
  };
  /** Zoom distance clamps */
  zoom?: {
    /** Minimum camera distance (default 1) */
    min?: number;
    /** Maximum camera distance (default 12) */
    max?: number;
  };
  /** Pan target clamps per axis — each is a [min, max] tuple in world units */
  pan?: {
    x?: [number, number];
    y?: [number, number];
    z?: [number, number];
  };
}

export interface ModelViewerProps {
  /** All model and rendering settings */
  model: ModelConfig;
  /** CSS height of the viewer container (default "480px") */
  height?: string;
  className?: string;
}

export function ModelViewer({ model, height = "480px", className }: ModelViewerProps) {
  const {
    src,
    materialColors = {},
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
    outline: { thickness: outlineThickness = 0.025, color: outlineColor = "#000000" } = {},
    zoom: { min: minDistance = 1, max: maxDistance = 12 } = {},
    pan: panLimit = {},
  } = model;

  const controlsRef = useRef<OrbitControlsImpl>(null);
  const { progress, active: isLoading } = useProgress();

  const handleReset = useCallback(() => {
    controlsRef.current?.reset();
  }, []);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        "bg-foreground/[0.03] border border-foreground/10",
        className,
      )}
      style={{ height }}
    >
      <Canvas
        camera={{ position: [0, 1, 4], fov: 40 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={2} />
        <directionalLight position={[-4, 2, -4]} intensity={0.5} />

        <Suspense fallback={null}>
          <ModelScene
            src={src}
            materialColors={materialColors}
            position={position}
            rotation={rotation}
            scale={scale}
            outlineThickness={outlineThickness}
            outlineColor={outlineColor}
            controlsRef={controlsRef}
            minDistance={minDistance}
            maxDistance={maxDistance}
            panLimit={panLimit}
          />
        </Suspense>
      </Canvas>

      <ViewerOverlay
        onReset={handleReset}
        loading={isLoading}
        progress={progress}
      />
    </div>
  );
}
