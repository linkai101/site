"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, useProgress } from "@react-three/drei";
import { Suspense, useMemo, useEffect, useRef, useCallback, useState } from "react";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { cn } from "@/lib/utils";
import { RotateCcw, Move, MousePointer, ScanSearch, ZoomIn } from "lucide-react";

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
  const data = new Uint8Array([120, 210, 255]);
  const tex = new THREE.DataTexture(data, 3, 1, THREE.RedFormat);
  tex.minFilter = THREE.NearestFilter;
  tex.magFilter = THREE.NearestFilter;
  tex.needsUpdate = true;
  return tex;
}

// ---------------------------------------------------------------------------
// Debug
// ---------------------------------------------------------------------------

export interface DebugState {
  zoom: number;
  target: [number, number, number];
  camPos: [number, number, number];
  boundingBox: { min: [number, number, number]; max: [number, number, number] } | null;
}

const DEFAULT_DEBUG_STATE: DebugState = {
  zoom: 0,
  target: [0, 0, 0],
  camPos: [0, 0, 0],
  boundingBox: null,
};

// Renders inside the Canvas: axes at the rotation origin + bounding box wireframe.
// Also writes live camera/controls state into debugStateRef each frame.
function DebugVisuals({
  groupRef,
  rotationOrigin,
  controlsRef,
  debugStateRef,
}: {
  groupRef: React.RefObject<THREE.Group | null>;
  rotationOrigin: [number, number, number];
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  debugStateRef: React.MutableRefObject<DebugState>;
}) {
  const box = useMemo(() => new THREE.Box3(), []);
  const helper = useMemo(
    () => new THREE.Box3Helper(box, new THREE.Color(0x00ff00)),
    [box],
  );

  useFrame(({ camera }) => {
    // Update bounding box from the model group
    if (groupRef.current) {
      box.setFromObject(groupRef.current);
      helper.updateMatrixWorld(true);
    }

    // Write live state for the DOM overlay
    const controls = controlsRef.current;
    const t = controls?.target ?? new THREE.Vector3();
    const p = camera.position;
    debugStateRef.current = {
      zoom: p.distanceTo(t),
      target: [t.x, t.y, t.z],
      camPos: [p.x, p.y, p.z],
      boundingBox: box.isEmpty()
        ? null
        : {
            min: [box.min.x, box.min.y, box.min.z],
            max: [box.max.x, box.max.y, box.max.z],
          },
    };
  });

  return (
    <>
      {/* XYZ axes at the rotation origin */}
      <axesHelper args={[2]} position={rotationOrigin} />
      {/* World-space bounding box of the model */}
      <primitive object={helper} />
    </>
  );
}

// DOM panel that reads from debugStateRef via rAF so it doesn't cause Canvas re-renders.
function DebugOverlay({
  debugStateRef,
  rotationOrigin,
  minDistance,
  maxDistance,
  panLimit,
}: {
  debugStateRef: React.MutableRefObject<DebugState>;
  rotationOrigin: [number, number, number];
  minDistance: number;
  maxDistance: number;
  panLimit: PanLimit;
}) {
  const [s, setS] = useState<DebugState>(DEFAULT_DEBUG_STATE);

  useEffect(() => {
    let rafId: number;
    const tick = () => {
      setS({ ...debugStateRef.current });
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [debugStateRef]);

  const f = (n: number) => n.toFixed(3);
  const fv3 = (v: [number, number, number]) =>
    `${f(v[0])}, ${f(v[1])}, ${f(v[2])}`;

  return (
    <div className="absolute top-10 left-2 pointer-events-none select-none font-mono text-[10px] leading-relaxed text-emerald-400 bg-black/70 rounded-md px-2.5 py-2 space-y-0.5">
      <div className="text-emerald-300 font-semibold mb-1">debug</div>

      <div className="text-foreground/40">— camera —</div>
      <div>zoom: <span className="text-white">{f(s.zoom)}</span></div>
      <div>pos: <span className="text-white">{fv3(s.camPos)}</span></div>

      <div className="text-foreground/40 mt-1">— orbit target —</div>
      <div>target: <span className="text-white">{fv3(s.target)}</span></div>

      <div className="text-foreground/40 mt-1">— config —</div>
      <div>origin: <span className="text-white">{fv3(rotationOrigin)}</span></div>
      <div>zoom range: <span className="text-white">[{f(minDistance)}, {f(maxDistance)}]</span></div>
      {panLimit.x && <div>pan.x: <span className="text-white">[{f(panLimit.x[0])}, {f(panLimit.x[1])}]</span> <span className="text-foreground/40">→ [{f(rotationOrigin[0] + panLimit.x[0])}, {f(rotationOrigin[0] + panLimit.x[1])}]</span></div>}
      {panLimit.y && <div>pan.y: <span className="text-white">[{f(panLimit.y[0])}, {f(panLimit.y[1])}]</span> <span className="text-foreground/40">→ [{f(rotationOrigin[1] + panLimit.y[0])}, {f(rotationOrigin[1] + panLimit.y[1])}]</span></div>}
      {panLimit.z && <div>pan.z: <span className="text-white">[{f(panLimit.z[0])}, {f(panLimit.z[1])}]</span> <span className="text-foreground/40">→ [{f(rotationOrigin[2] + panLimit.z[0])}, {f(rotationOrigin[2] + panLimit.z[1])}]</span></div>}

      {s.boundingBox && (
        <>
          <div className="text-foreground/40 mt-1">— bounds —</div>
          <div>min: <span className="text-white">{fv3(s.boundingBox.min)}</span></div>
          <div>max: <span className="text-white">{fv3(s.boundingBox.max)}</span></div>
        </>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Materials
// ---------------------------------------------------------------------------

/**
 * A material specification for a mesh.
 *
 * - `string` — a CSS color → creates a MeshToonMaterial with that color.
 * - object — fine-grained control:
 *   - `color`  CSS color (default `"#ffffff"`)
 *   - `type`   which Three.js material class to use (default `"toon"`)
 */
export type MaterialSpec =
  | string
  | { color?: string; type?: "toon" | "basic" | "standard" | "phong" };

function buildMaterial(spec: MaterialSpec, gradientMap: THREE.DataTexture): THREE.Material {
  const cfg = typeof spec === "string" ? { color: spec, type: "toon" as const } : spec;
  const color = new THREE.Color(cfg.color ?? "#ffffff");
  switch (cfg.type ?? "toon") {
    case "basic":    return new THREE.MeshBasicMaterial({ color });
    case "standard": return new THREE.MeshStandardMaterial({ color });
    case "phong":    return new THREE.MeshPhongMaterial({ color });
    default:         return new THREE.MeshToonMaterial({ color, gradientMap });
  }
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
  materials: Record<string, MaterialSpec>;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  outlineThickness: number;
  outlineColor: string;
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  minDistance: number;
  maxDistance: number;
  panLimit: PanLimit;
  rotationOrigin: [number, number, number];
  debug: boolean;
  debugStateRef: React.MutableRefObject<DebugState>;
}

function ModelScene({
  src,
  materials,
  position,
  rotation,
  scale,
  outlineThickness,
  outlineColor,
  controlsRef,
  minDistance,
  maxDistance,
  panLimit,
  rotationOrigin,
  debug,
  debugStateRef,
}: ModelSceneProps) {
  const { scene } = useGLTF(src);
  const groupRef = useRef<THREE.Group>(null);

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

    // DEBUG: mesh/material name dump
    if (debug) {
      console.group(`[ModelViewer] meshes in "${src}"`);
      main.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          const matName = Array.isArray(child.material)
            ? child.material.map((m: THREE.Material) => m.name).join(", ")
            : (child.material?.name ?? "");
          console.log(`mesh: "${child.name}"  material: "${matName}"`);
        }
      });
      console.groupEnd();
    }

    main.traverse((child) => {
      if (!(child instanceof THREE.Mesh)) return;
      const matName: string = Array.isArray(child.material)
        ? child.material[0]?.name ?? ""
        : child.material?.name ?? "";
      // Lookup priority: mesh name → material name → wildcard "*"
      const spec = materials[child.name] ?? materials[matName] ?? materials["*"];
      child.material = buildMaterial(spec ?? "#ffffff", gradientMap);
    });

    outline.traverse((child) => {
      if (child instanceof THREE.Mesh) child.material = outlineMaterial;
    });

    return [main, outline];
  }, [scene, materials, gradientMap, outlineMaterial]);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    const t = controls.target;

    // Compute how much each axis needs to be pulled back to stay within limits.
    // Apply the same delta to the camera so the camera→target vector is
    // preserved — otherwise OrbitControls' spherical coords become stale and
    // the next rotation snaps to the wrong origin.
    let dx = 0, dy = 0, dz = 0;
    // Pan limits are relative to rotationOrigin, so offset each bound before clamping.
    if (panLimit.x) { const cx = Math.max(rotationOrigin[0] + panLimit.x[0], Math.min(rotationOrigin[0] + panLimit.x[1], t.x)); dx = cx - t.x; t.x = cx; }
    if (panLimit.y) { const cy = Math.max(rotationOrigin[1] + panLimit.y[0], Math.min(rotationOrigin[1] + panLimit.y[1], t.y)); dy = cy - t.y; t.y = cy; }
    if (panLimit.z) { const cz = Math.max(rotationOrigin[2] + panLimit.z[0], Math.min(rotationOrigin[2] + panLimit.z[1], t.z)); dz = cz - t.z; t.z = cz; }
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
      <group ref={groupRef} position={position} rotation={rotation} scale={scale}>
        <primitive object={outlineScene} />
        <primitive object={mainScene} />
      </group>

      <OrbitControls
        ref={controlsRef}
        target={rotationOrigin}
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

      {debug && (
        <DebugVisuals
          groupRef={groupRef}
          rotationOrigin={rotationOrigin}
          controlsRef={controlsRef}
          debugStateRef={debugStateRef}
        />
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// DOM overlay – hints + reset button
// ---------------------------------------------------------------------------

const desktopHints = [
  { icon: MousePointer, label: "Drag to rotate" },
  { icon: ScanSearch,   label: "Scroll to zoom" },
  { icon: Move,         label: "Right-drag to pan" },
] as const;

const mobileHints = [
  { icon: MousePointer, label: "Drag to rotate" },
  { icon: ZoomIn,       label: "Pinch to zoom" },
  { icon: Move,         label: "Two-finger pan" },
] as const;

interface OverlayProps {
  onReset: () => void;
  loading: boolean;
  progress: number;
}

function ViewerOverlay({ onReset, loading, progress }: OverlayProps) {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(pointer: coarse)");
    setIsTouch(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsTouch(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const hints = isTouch ? mobileHints : desktopHints;

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
   * Map from mesh or material name → MaterialSpec.
   *
   * Lookup priority per mesh: mesh name → material name → `"*"` wildcard.
   * Values can be a CSS color string (→ MeshToonMaterial) or a `MaterialSpec`
   * object with `color` and `type` fields for full control.
   *
   * @example
   * // simple color by material name
   * materials: { axeHead: "#8F8F8F", "*": "#ffffff" }
   * // override a specific mesh with a non-toon material
   * materials: { badMesh: { color: "#ff0000", type: "standard" } }
   */
  materials?: Record<string, MaterialSpec>;
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
  /** World-space pivot point for orbit rotation (default [0, 0, 0]) */
  rotationOrigin?: [number, number, number];
}

export interface ModelViewerProps {
  /** All model and rendering settings */
  model: ModelConfig;
  /** CSS height of the viewer container (default "480px") */
  height?: string;
  className?: string;
  /**
   * Enable debug mode: renders axes at the rotation origin, a bounding box
   * around the model, and a live overlay with camera/controls numbers.
   */
  debug?: boolean;
}

const DEFAULT_CAMERA_POSITION: [number, number, number] = [0, 1, 4];

export function ModelViewer({ model, height = "480px", className, debug = false }: ModelViewerProps) {
  const {
    src,
    materials = {},
    position = [0, 0, 0],
    rotation = [0, 0, 0],
    scale = 1,
    outline: { thickness: outlineThickness = 0.025, color: outlineColor = "#000000" } = {},
    zoom: { min: minDistance = 1, max: maxDistance = 12 } = {},
    pan: panLimit = {},
    rotationOrigin = [0, 0, 0] as [number, number, number],
  } = model;

  const controlsRef = useRef<OrbitControlsImpl>(null);
  const debugStateRef = useRef<DebugState>(DEFAULT_DEBUG_STATE);
  const { progress, active: isLoading } = useProgress();

  const handleReset = useCallback(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    controls.target.set(...rotationOrigin);
    controls.object.position.set(...DEFAULT_CAMERA_POSITION);
    controls.update();
  }, [rotationOrigin]);

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden select-none",
        "bg-foreground/[0.03] border border-foreground/10",
        className,
      )}
      style={{ height }}
    >
      <Canvas
        camera={{ position: DEFAULT_CAMERA_POSITION, fov: 40 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 8, 5]} intensity={2} />
        <directionalLight position={[-4, 2, -4]} intensity={0.5} />

        <Suspense fallback={null}>
          <ModelScene
            src={src}
            materials={materials}
            position={position}
            rotation={rotation}
            scale={scale}
            outlineThickness={outlineThickness}
            outlineColor={outlineColor}
            controlsRef={controlsRef}
            minDistance={minDistance}
            maxDistance={maxDistance}
            panLimit={panLimit}
            rotationOrigin={rotationOrigin}
            debug={debug}
            debugStateRef={debugStateRef}
          />
        </Suspense>
      </Canvas>

      <ViewerOverlay
        onReset={handleReset}
        loading={isLoading}
        progress={progress}
      />

      {debug && (
        <DebugOverlay
          debugStateRef={debugStateRef}
          rotationOrigin={rotationOrigin}
          minDistance={minDistance}
          maxDistance={maxDistance}
          panLimit={panLimit}
        />
      )}
    </div>
  );
}
