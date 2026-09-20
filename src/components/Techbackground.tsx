import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * <TechBackground />
 * ------------------------------------------------------------------
 * An ambient, jellyfish-like WebGL background made of tech-themed
 * shapes: wireframe "data node" cubes, "< / >" code-token glyphs, and
 * pulsing glow chips. Everything is generated procedurally from Three.js
 * primitives + extruded custom shapes — no .gltf/.obj/.fbx files are
 * ever loaded, so there's no asset weight and nothing to fetch.
 *
 * Performance & non-intrusiveness choices:
 *  - Only 3 draw calls total: one InstancedMesh per shape "family"
 *    (cubes / glyphs / chips), so object count can scale without
 *    scaling render cost.
 *  - MeshBasicMaterial + additive blending gives a "glow" look without
 *    needing scene lights or postprocessing bloom passes.
 *  - depthWrite = false on every material so translucent shapes never
 *    visually punch through or occlude each other unpleasantly, and
 *    never interfere with the DOM content stacked above the canvas.
 *  - Canvas is `position: fixed`, `pointer-events: none`, and sits at a
 *    z-index behind your page content — it can never block clicks,
 *    text selection, or scroll.
 *  - Render loop pauses via the Page Visibility API when the tab isn't
 *    visible, and the component renders nothing at all if the user has
 *    `prefers-reduced-motion` enabled.
 *  - Device pixel ratio is capped at 2 to avoid killing perf on
 *    high-DPI screens.
 *
 * Usage:
 *   import TechBackground from "./components/TechBackground";
 *   ...
 *   <main className="relative ...">
 *     <TechBackground />
 *     {...rest of your page}
 *   </main>
 */

// ---- Tunables (kept small on purpose for a light footprint) --------
const CUBE_COUNT = 10; // wireframe "data structure" nodes
const GLYPH_COUNT = 10; // "<" / ">" code-token shards (mirrored for ">")
const CHIP_COUNT = 8; // pulsing glowing chip shards
const FIELD_X = 13; // horizontal spread
const FIELD_Y = 6.5; // vertical spread
const FIELD_Z = 8; // depth spread (camera looks down -Z)

// Indigo / blue / purple palette to match the page's existing theme
const PALETTE = [0x818cf8, 0x60a5fa, 0xa78bfa, 0x6366f1];

interface FloatItem {
  baseX: number;
  baseY: number;
  baseZ: number;
  floatSpeed: number;
  floatAmp: number;
  phase: number;
  rotSpeedX: number;
  rotSpeedY: number;
  pulseSpeed: number;
  pulsePhase: number;
  mirrored?: boolean; // used by glyphs to flip "<" into ">"
}

function randomRange(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function makeFloatItems(count: number, mirrorable = false): FloatItem[] {
  return Array.from({ length: count }, () => ({
    baseX: randomRange(-FIELD_X, FIELD_X),
    baseY: randomRange(-FIELD_Y, FIELD_Y),
    baseZ: randomRange(-FIELD_Z, FIELD_Z * 0.4), // bias away from camera
    floatSpeed: randomRange(0.15, 0.4),
    floatAmp: randomRange(0.4, 1.1),
    phase: randomRange(0, Math.PI * 2),
    rotSpeedX: randomRange(-0.15, 0.15),
    rotSpeedY: randomRange(-0.2, 0.2),
    pulseSpeed: randomRange(0.6, 1.4),
    pulsePhase: randomRange(0, Math.PI * 2),
    mirrored: mirrorable ? Math.random() > 0.5 : false,
  }));
}

/** Builds a thick "<" chevron outline, later extruded into a 3D glyph. */
function createChevronShape(): THREE.Shape {
  const s = 0.55; // half-height of the glyph
  const t = 0.22; // stroke thickness
  const shape = new THREE.Shape();
  shape.moveTo(t, s);
  shape.lineTo(0, s - t);
  shape.lineTo(-s + t, 0);
  shape.lineTo(0, -(s - t));
  shape.lineTo(t, -s);
  shape.lineTo(t * 2, -s + t);
  shape.lineTo(-s + t * 2, 0);
  shape.lineTo(t * 2, s - t);
  shape.lineTo(t, s);
  return shape;
}

export default function TechBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect accessibility preference — skip the whole effect and
    // render nothing if the user prefers reduced motion.
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion || !containerRef.current) return;

    const container = containerRef.current;

    // ---- Scene / camera / renderer ---------------------------------
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.z = 12;

    const renderer = new THREE.WebGLRenderer({
      alpha: true, // transparent canvas so the page background shows through
      antialias: true,
      powerPreference: "low-power",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0); // fully transparent clear
    container.appendChild(renderer.domElement);

    // ---- Shape 1: wireframe data-node cubes ------------------------
    const cubeGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);
    const cubeMat = new THREE.MeshBasicMaterial({
      color: PALETTE[0],
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      depthWrite: false,
    });
    const cubeMesh = new THREE.InstancedMesh(cubeGeo, cubeMat, CUBE_COUNT);
    const cubeItems = makeFloatItems(CUBE_COUNT);

    // ---- Shape 2: "<" / ">" code-token glyphs -----------------------
    const chevronShape = createChevronShape();
    const glyphGeo = new THREE.ExtrudeGeometry(chevronShape, {
      depth: 0.12,
      bevelEnabled: true,
      bevelThickness: 0.02,
      bevelSize: 0.02,
      bevelSegments: 1,
      curveSegments: 4,
    });
    const glyphMat = new THREE.MeshBasicMaterial({
      color: PALETTE[1],
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const glyphMesh = new THREE.InstancedMesh(glyphGeo, glyphMat, GLYPH_COUNT);
    const glyphItems = makeFloatItems(GLYPH_COUNT, true);

    // ---- Shape 3: pulsing glow chips ---------------------------------
    const chipGeo = new THREE.BoxGeometry(0.9, 0.45, 0.06);
    const chipMat = new THREE.MeshBasicMaterial({
      color: PALETTE[2],
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const chipMesh = new THREE.InstancedMesh(chipGeo, chipMat, CHIP_COUNT);
    const chipItems = makeFloatItems(CHIP_COUNT);

    scene.add(cubeMesh, glyphMesh, chipMesh);

    // Scratch objects reused every frame to avoid per-frame allocations
    const dummy = new THREE.Object3D();

    function layout(
      mesh: THREE.InstancedMesh,
      items: FloatItem[],
      time: number,
      pulseScale: boolean
    ) {
      for (let i = 0; i < items.length; i++) {
        const it = items[i];
        // Gentle weightless vertical drift, jellyfish-style
        const y = it.baseY + Math.sin(time * it.floatSpeed + it.phase) * it.floatAmp;
        const x = it.baseX + Math.cos(time * it.floatSpeed * 0.6 + it.phase) * 0.3;

        dummy.position.set(x, y, it.baseZ);
        dummy.rotation.set(
          time * it.rotSpeedX,
          time * it.rotSpeedY,
          it.phase
        );

        let scale = 1;
        if (pulseScale) {
          scale = 1 + Math.sin(time * it.pulseSpeed + it.pulsePhase) * 0.15;
        }
        dummy.scale.setScalar(scale * (it.mirrored ? 1 : 1));
        if (it.mirrored) dummy.scale.x *= -1; // flips "<" into ">"

        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);
      }
      mesh.instanceMatrix.needsUpdate = true;
    }

    // ---- Resize handling --------------------------------------------
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // ---- Render loop, paused while the tab is hidden -----------------
    let rafId = 0;
    let isVisible = !document.hidden;
    const clock = new THREE.Clock();

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return; // main-thread-friendly: skip work entirely
      const t = clock.getElapsedTime();
      layout(cubeMesh, cubeItems, t, false);
      layout(glyphMesh, glyphItems, t, true);
      layout(chipMesh, chipItems, t, true);
      renderer.render(scene, camera);
    };
    rafId = requestAnimationFrame(animate);

    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener("visibilitychange", handleVisibility);

    // ---- Cleanup: dispose everything, remove listeners & canvas ------
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("visibilitychange", handleVisibility);

      cubeGeo.dispose();
      cubeMat.dispose();
      glyphGeo.dispose();
      glyphMat.dispose();
      chipGeo.dispose();
      chipMat.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="fixed inset-0 z-0 pointer-events-none"
    />
  );
}
