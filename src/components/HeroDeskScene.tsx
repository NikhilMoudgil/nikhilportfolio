import  { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * <HeroDeskScene />
 * ---------------------------------------------------------------------------
 * An isometric "dev desk" diorama — laptop with a live code screen, headphones
 * on a glowing stand, a second pair resting on the desk, mug, phone and a neon
 * speaker puck — built entirely from Three.js primitives. No .gltf/.obj models
 * and no texture files are loaded.
 *
 * It is a BACKDROP for the hero, not a replacement for anything in it. The
 * canvas is absolutely positioned, z-0 and pointer-events:none, so the text
 * column (z-20) and the profile-photo card (z-30) keep working exactly as they
 * do today — clicks, hovers and text selection all pass straight through.
 *
 * Mount it as the FIRST child of the hero <section> (which is already
 * `relative z-10`):
 *
 *   <section id="home" className="... relative z-10">
 *     <HeroDeskScene />
 *     <motion.div className="flex-1 ... relative z-20"> ...text... </motion.div>
 *     <motion.div className="flex-1 ... relative z-30"> ...photo... </motion.div>
 *   </section>
 *
 * Tuning props: `zoom` (bigger = closer), `yaw` (turntable angle in radians),
 * `className` (override the default placement box).
 *
 * Works on three r12x through r1xx: the renderer's colour-space and point-light
 * intensity APIs are feature-detected at runtime.
 */

// #region scene ---------------------------------------------------------------

const PALETTE = {
  slab: 0x13162a,
  slabTop: 0x20243d,
  slabEdge: 0x2e3358,
  laptop: 0xc3c8e8,
  laptopDark: 0x161a2e,
  keyWell: 0x0f1224,
  key: 0x2b3054,
  trackpad: 0x9aa1c8,
  screenBase: 0x081031,
  stand: 0x181c31,
  standFace: 0x101426,
  cushion: 0x252a44,
  mug: 0xeee8db,
  coffee: 0x8a4a22,
  phone: 0x0c0f1e,
  indigo: 0x6366f1,
  blue: 0x60a5fa,
  purple: 0xa78bfa,
  pink: 0xf472b6,
  magenta: 0xe23bd8,
  cyan: 0x3ae0f0,
  mint: 0x5eead4,
  white: 0xe6ebff,
};

/** Rounded rectangle, used as the profile for every soft-edged slab. */
function roundedRectShape(w: number, h: number, r: number) {
  const shape = new THREE.Shape();
  const x = -w / 2;
  const y = -h / 2;
  const rad = Math.max(0.001, Math.min(r, Math.min(w, h) / 2 - 0.001));
  shape.moveTo(x + rad, y);
  shape.lineTo(x + w - rad, y);
  shape.quadraticCurveTo(x + w, y, x + w, y + rad);
  shape.lineTo(x + w, y + h - rad);
  shape.quadraticCurveTo(x + w, y + h, x + w - rad, y + h);
  shape.lineTo(x + rad, y + h);
  shape.quadraticCurveTo(x, y + h, x, y + h - rad);
  shape.lineTo(x, y + rad);
  shape.quadraticCurveTo(x, y, x + rad, y);
  return shape;
}

/**
 * A box with rounded corners AND a soft bevel on the top/bottom faces — the
 * single most important ingredient for the "3D render" look. Centred on the
 * origin, height along +Y.
 */
function roundedBoxGeometry(w: number, h: number, d: number, r = 0.08, bevel = 0.02) {
  const b = Math.max(0.001, Math.min(bevel, h / 2 - 0.002, r * 0.8));
  const depth = Math.max(h - b * 2, 0.002);
  const geometry = new THREE.ExtrudeGeometry(roundedRectShape(w - b * 2, d - b * 2, r), {
    depth,
    bevelEnabled: true,
    bevelThickness: b,
    bevelSize: b,
    bevelSegments: 2,
    curveSegments: 8,
  });
  geometry.rotateX(-Math.PI / 2); // extrusion axis Z -> Y
  geometry.translate(0, -depth / 2, 0);
  return geometry;
}

function solid(color: number, roughness = 0.42, metalness = 0.28) {
  return new THREE.MeshStandardMaterial({ color, roughness, metalness });
}

/** Self-lit surface (screens, neon rims, glowing discs). */
function neon(color: number, intensity = 1.25, base = 0x04050c) {
  return new THREE.MeshStandardMaterial({
    color: base,
    emissive: color,
    emissiveIntensity: intensity,
    roughness: 0.3,
    metalness: 0,
  });
}

/**
 * Flat, always-bright material for on-screen UI bars. Fully opaque bars keep
 * depthWrite on, otherwise the opaque pass (sorted front-to-back) lets the
 * screen backdrop paint straight over them.
 */
function flat(color: number, opacity = 1) {
  return new THREE.MeshBasicMaterial({
    color,
    transparent: opacity < 1,
    opacity,
    depthWrite: opacity >= 1,
  });
}

/** Soft radial falloff quad — used for every bloom/haze accent. */
function glowMaterial(color: number, strength = 1, power = 2.6) {
  return new THREE.ShaderMaterial({
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    uniforms: {
      uColor: { value: new THREE.Color(color) },
      uStrength: { value: strength },
      uPower: { value: power },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uStrength;
      uniform float uPower;
      varying vec2 vUv;
      void main() {
        float d = clamp(distance(vUv, vec2(0.5)) * 2.0, 0.0, 1.0);
        float a = pow(1.0 - d, uPower) * uStrength;
        gl_FragColor = vec4(uColor * a, a);
      }
    `,
  });
}

function glowQuad(color: number, size: number, strength = 1, power = 2.6) {
  return new THREE.Mesh(new THREE.PlaneGeometry(size, size), glowMaterial(color, strength, power));
}

function castAll(object: THREE.Object3D, cast = true, receive = true) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.castShadow = cast;
      child.receiveShadow = receive;
    }
  });
  return object;
}

type SceneBuild = {
  root: THREE.Group;
  update: (t: number) => void;
};

/** Laptop screen contents: a cyan panel outline plus columns of code lines. */
function buildScreenUI(width: number, height: number) {
  const group = new THREE.Group();

  const backdrop = new THREE.Mesh(
    new THREE.PlaneGeometry(width, height),
    neon(0x11265e, 0.9, 0x050a1d)
  );
  group.add(backdrop);

  const left = -width / 2;
  const top = height / 2;

  // Title bar dots
  const dotColors = [PALETTE.pink, PALETTE.purple, PALETTE.cyan];
  dotColors.forEach((c, i) => {
    const dot = new THREE.Mesh(new THREE.CircleGeometry(0.018, 12), flat(c, 0.95));
    dot.position.set(left + 0.06 + i * 0.055, top - 0.055, 0.004);
    group.add(dot);
  });

  // The bright outlined panel from the reference art (upper-left of the screen)
  const panelW = 0.44;
  const panelH = 0.3;
  const panelX = left + 0.07 + panelW / 2;
  const panelY = top - 0.12 - panelH / 2;
  const edge = 0.014;
  const outline: Array<[number, number, number, number]> = [
    [panelW, edge, 0, panelH / 2],
    [panelW, edge, 0, -panelH / 2],
    [edge, panelH, -panelW / 2, 0],
    [edge, panelH, panelW / 2, 0],
  ];
  outline.forEach(([w, h, dx, dy]) => {
    const bar = new THREE.Mesh(new THREE.PlaneGeometry(w, h), flat(PALETTE.cyan, 1));
    bar.position.set(panelX + dx, panelY + dy, 0.005);
    group.add(bar);
  });
  const panelFill = new THREE.Mesh(
    new THREE.PlaneGeometry(panelW, panelH),
    flat(PALETTE.cyan, 0.12)
  );
  panelFill.position.set(panelX, panelY, 0.004);
  group.add(panelFill);

  // Code lines — a short column under the panel, a longer one on the right
  const lineColors = [PALETTE.white, PALETTE.blue, PALETTE.purple, PALETTE.mint, PALETTE.pink];
  const bars: THREE.Mesh[] = [];
  const addLines = (x0: number, y0: number, maxW: number, rows: number, seed: number) => {
    for (let i = 0; i < rows; i++) {
      const pseudo = Math.abs(Math.sin((i + 1) * seed));
      const w = maxW * (0.35 + pseudo * 0.6);
      const indent = i % 3 === 1 ? 0.045 : 0;
      const bar = new THREE.Mesh(
        new THREE.PlaneGeometry(1, 0.026),
        flat(lineColors[i % lineColors.length], 0.55 + pseudo * 0.4)
      );
      bar.scale.x = w;
      bar.position.set(x0 + indent + w / 2, y0 - i * 0.052, 0.005);
      group.add(bar);
      bars.push(bar);
    }
  };
  addLines(left + 0.07, panelY - panelH / 2 - 0.07, 0.42, 5, 12.9);
  addLines(0.03, top - 0.07, 0.5, 13, 7.3);

  // Blinking caret at the end of the last left-hand line
  const caret = new THREE.Mesh(new THREE.PlaneGeometry(0.02, 0.03), flat(PALETTE.cyan, 1));
  caret.position.set(left + 0.12, panelY - panelH / 2 - 0.07 - 5 * 0.052, 0.006);
  group.add(caret);

  // Slow scan highlight drifting down the screen
  const scan = new THREE.Mesh(new THREE.PlaneGeometry(width, 0.12), glowMaterial(PALETTE.blue, 0.5, 1.6));
  scan.position.z = 0.007;
  group.add(scan);

  const caretMat = caret.material as THREE.MeshBasicMaterial;

  return {
    group,
    update: (t: number) => {
      caretMat.opacity = Math.sin(t * 4.2) > 0 ? 1 : 0.05;
      scan.position.y = ((t * 0.22) % 1) * height - height / 2;
      // faint "typing" shimmer on the right-hand column
      for (let i = 8; i < bars.length; i++) {
        const m = bars[i].material as THREE.MeshBasicMaterial;
        m.opacity = 0.5 + 0.35 * (0.5 + 0.5 * Math.sin(t * 1.6 + i));
      }
    },
  };
}

function buildLaptop() {
  const laptop = new THREE.Group();

  const base = new THREE.Mesh(roundedBoxGeometry(1.95, 0.1, 1.36, 0.1, 0.028), solid(PALETTE.laptop, 0.34, 0.62));
  base.position.y = 0.05;
  laptop.add(base);

  const well = new THREE.Mesh(roundedBoxGeometry(1.64, 0.03, 0.94, 0.05, 0.01), solid(PALETTE.keyWell, 0.6, 0.2));
  well.position.set(0, 0.102, -0.11);
  laptop.add(well);

  // Backlit keys as one instanced mesh (70 keys, one draw call)
  const cols = 14;
  const rows = 5;
  const keyGeo = roundedBoxGeometry(0.094, 0.024, 0.13, 0.02, 0.006);
  const keyMat = new THREE.MeshStandardMaterial({
    color: PALETTE.key,
    emissive: PALETTE.indigo,
    emissiveIntensity: 0.45,
    roughness: 0.5,
    metalness: 0.15,
  });
  const keys = new THREE.InstancedMesh(keyGeo, keyMat, cols * rows);
  const dummy = new THREE.Object3D();
  let i = 0;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dummy.position.set(-0.76 + c * 0.117, 0.118, -0.46 + r * 0.17);
      dummy.updateMatrix();
      keys.setMatrixAt(i++, dummy.matrix);
    }
  }
  keys.instanceMatrix.needsUpdate = true;
  laptop.add(keys);

  const trackpad = new THREE.Mesh(roundedBoxGeometry(0.46, 0.014, 0.32, 0.04, 0.005), solid(PALETTE.trackpad, 0.3, 0.5));
  trackpad.position.set(0, 0.104, 0.44);
  laptop.add(trackpad);

  const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 1.86, 14), solid(PALETTE.laptopDark, 0.4, 0.5));
  hinge.rotation.z = Math.PI / 2;
  hinge.position.set(0, 0.086, -0.62);
  laptop.add(hinge);

  // Lid pivots at the hinge; ~105° open, leaning slightly back
  const lidPivot = new THREE.Group();
  lidPivot.position.set(0, 0.086, -0.62);
  lidPivot.rotation.x = 1.3;
  laptop.add(lidPivot);

  const lid = new THREE.Mesh(roundedBoxGeometry(1.95, 0.07, 1.3, 0.09, 0.022), solid(PALETTE.laptopDark, 0.38, 0.55));
  lid.position.set(0, 0, -0.67);
  lidPivot.add(lid);

  const bezelGlow = new THREE.Mesh(new THREE.PlaneGeometry(2.5, 1.8), glowMaterial(PALETTE.blue, 0.28, 2.4));
  bezelGlow.rotation.x = -Math.PI / 2;
  bezelGlow.position.set(0, 0.06, -0.67);
  lidPivot.add(bezelGlow);

  const screen = buildScreenUI(1.7, 1.06);
  screen.group.rotation.x = -Math.PI / 2;
  screen.group.position.set(0, 0.041, -0.67);
  lidPivot.add(screen.group);

  castAll(base);
  castAll(lid);
  castAll(keys, true, false);

  return { group: laptop, update: screen.update };
}

function buildHeadphones(bandRadius = 0.33, tube = 0.055, cupRadius = 0.19) {
  const group = new THREE.Group();

  const band = new THREE.Mesh(
    new THREE.TorusGeometry(bandRadius, tube, 12, 28, Math.PI),
    solid(PALETTE.laptopDark, 0.45, 0.35)
  );
  group.add(band);

  const pad = new THREE.Mesh(
    new THREE.TorusGeometry(bandRadius - tube * 0.7, tube * 0.45, 8, 24, Math.PI * 0.8),
    solid(PALETTE.cushion, 0.7, 0.1)
  );
  pad.rotation.z = Math.PI * 0.1;
  group.add(pad);

  const cupGeo = new THREE.CylinderGeometry(cupRadius, cupRadius * 0.92, 0.14, 24);
  const cushionGeo = new THREE.TorusGeometry(cupRadius * 0.88, 0.045, 10, 24);
  [-1, 1].forEach((side) => {
    const cup = new THREE.Mesh(cupGeo, solid(PALETTE.stand, 0.4, 0.45));
    cup.rotation.z = Math.PI / 2;
    cup.position.set(side * bandRadius, -0.02, 0);
    group.add(cup);

    const cushion = new THREE.Mesh(cushionGeo, solid(PALETTE.cushion, 0.75, 0.05));
    cushion.rotation.y = Math.PI / 2;
    cushion.position.set(side * (bandRadius - 0.07), -0.02, 0);
    group.add(cushion);

    const ring = new THREE.Mesh(new THREE.RingGeometry(cupRadius * 0.55, cupRadius * 0.72, 24), flat(PALETTE.purple, 0.85));
    ring.rotation.y = side * (Math.PI / 2);
    ring.position.set(side * (bandRadius + 0.072), -0.02, 0);
    group.add(ring);
  });

  return group;
}

function buildStand() {
  const stand = new THREE.Group();

  const pillar = new THREE.Mesh(roundedBoxGeometry(0.68, 1.22, 0.58, 0.16, 0.04), solid(PALETTE.stand, 0.38, 0.4));
  pillar.position.y = 0.61;
  stand.add(pillar);

  const face = new THREE.Mesh(roundedBoxGeometry(0.44, 0.78, 0.04, 0.12, 0.012), solid(PALETTE.standFace, 0.5, 0.3));
  face.rotation.x = Math.PI / 2;
  face.position.set(0, 0.64, 0.291);
  stand.add(face);

  // The magenta "power" oval from the reference
  const discMat = neon(PALETTE.magenta, 1.8, 0x140418);
  const disc = new THREE.Mesh(new THREE.CircleGeometry(0.135, 28), discMat);
  disc.position.set(0, 0.64, 0.315);
  stand.add(disc);

  const core = new THREE.Mesh(new THREE.CircleGeometry(0.05, 20), flat(0xffd9fb, 0.95));
  core.position.set(0, 0.64, 0.318);
  stand.add(core);

  const halo = glowQuad(PALETTE.magenta, 0.9, 1.1, 2.4);
  halo.position.set(0, 0.64, 0.33);
  stand.add(halo);

  const phones = buildHeadphones(0.34, 0.058, 0.2);
  phones.position.set(0, 1.3, 0.02);
  stand.add(phones);

  castAll(stand);
  disc.castShadow = false;
  core.castShadow = false;

  return { group: stand, discMat };
}

function buildMug() {
  const mug = new THREE.Group();

  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.175, 0.34, 28, 1, true), solid(PALETTE.mug, 0.35, 0.05));
  body.material.side = THREE.DoubleSide;
  body.position.y = 0.17;
  mug.add(body);

  const bottom = new THREE.Mesh(new THREE.CircleGeometry(0.175, 24), solid(PALETTE.mug, 0.4, 0.05));
  bottom.rotation.x = -Math.PI / 2;
  bottom.position.y = 0.002;
  mug.add(bottom);

  const coffee = new THREE.Mesh(new THREE.CircleGeometry(0.185, 24), neon(PALETTE.coffee, 0.35, 0x53260f));
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.3;
  mug.add(coffee);

  // Torus stays in the XY plane (vertical, through the mug axis) and the arc is
  // centred on +X so the gap faces the body — no extra rotation needed.
  const handle = new THREE.Mesh(
    new THREE.TorusGeometry(0.105, 0.028, 10, 24, Math.PI * 1.3),
    solid(PALETTE.mug, 0.35, 0.05)
  );
  handle.rotation.z = -Math.PI * 0.65; // arc sweeps from -117° to +117°
  handle.position.set(0.175, 0.18, 0);
  mug.add(handle);

  castAll(mug);
  return mug;
}

function buildPhone() {
  const phone = new THREE.Group();

  const body = new THREE.Mesh(roundedBoxGeometry(0.38, 0.035, 0.76, 0.07, 0.012), solid(PALETTE.phone, 0.3, 0.6));
  body.position.y = 0.018;
  phone.add(body);

  const screen = new THREE.Mesh(new THREE.PlaneGeometry(0.31, 0.66), neon(0x2b3ad6, 0.55, 0x05071a));
  screen.rotation.x = -Math.PI / 2;
  screen.position.y = 0.037;
  phone.add(screen);

  const streak = new THREE.Mesh(new THREE.PlaneGeometry(0.18, 0.02), flat(PALETTE.cyan, 0.8));
  streak.rotation.x = -Math.PI / 2;
  streak.position.set(-0.03, 0.039, -0.18);
  phone.add(streak);

  castAll(phone);
  return phone;
}

function buildSpeaker() {
  const speaker = new THREE.Group();

  const shell = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.3, 0.16, 32), solid(PALETTE.stand, 0.35, 0.5));
  shell.position.y = 0.08;
  speaker.add(shell);

  const ringMat = neon(PALETTE.cyan, 2, 0x04121a);
  const ring = new THREE.Mesh(new THREE.RingGeometry(0.11, 0.2, 32), ringMat);
  ring.rotation.x = -Math.PI / 2;
  ring.position.y = 0.163;
  speaker.add(ring);

  const dome = new THREE.Mesh(new THREE.SphereGeometry(0.1, 20, 14), solid(0x0e1424, 0.3, 0.6));
  dome.scale.y = 0.5;
  dome.position.y = 0.155;
  speaker.add(dome);

  const halo = glowQuad(PALETTE.cyan, 1.1, 0.9, 2.6);
  halo.rotation.x = -Math.PI / 2;
  halo.position.y = 0.175;
  speaker.add(halo);

  castAll(speaker);
  ring.castShadow = false;
  halo.castShadow = false;

  return { group: speaker, ringMat };
}

/** The desk slab everything sits on, plus its neon edge and floor bloom. */
function buildDesk() {
  const desk = new THREE.Group();

  const slab = new THREE.Mesh(roundedBoxGeometry(5.3, 0.5, 3.7, 0.3, 0.06), solid(PALETTE.slab, 0.5, 0.35));
  slab.position.y = -0.25;
  desk.add(slab);

  const rim = new THREE.Mesh(roundedBoxGeometry(5.34, 0.045, 3.74, 0.3, 0.012), neon(PALETTE.indigo, 0.9));
  rim.position.y = -0.055;
  desk.add(rim);

  const top = new THREE.Mesh(roundedBoxGeometry(5.16, 0.09, 3.56, 0.26, 0.022), solid(PALETTE.slabTop, 0.45, 0.35));
  top.position.y = 0.0;
  desk.add(top);

  castAll(slab, false, true);
  castAll(top, false, true);

  // Bloom pooling under the floating slab
  const pool = new THREE.Mesh(new THREE.PlaneGeometry(9, 6.4), glowMaterial(0x6d4bff, 0.75, 2.2));
  pool.rotation.x = -Math.PI / 2;
  pool.position.y = -0.85;
  desk.add(pool);

  const poolCore = new THREE.Mesh(new THREE.PlaneGeometry(5.6, 3.9), glowMaterial(PALETTE.indigo, 0.55, 2.8));
  poolCore.rotation.x = -Math.PI / 2;
  poolCore.position.y = -0.6;
  desk.add(poolCore);

  return desk;
}

/** Everything, assembled and posed like the reference render. */
function buildDiorama(): SceneBuild {
  const root = new THREE.Group();
  const TOP = 0.045; // working surface height

  root.add(buildDesk());

  const laptop = buildLaptop();
  laptop.group.position.set(0.72, TOP, 0.1);
  laptop.group.rotation.y = -0.26;
  root.add(laptop.group);

  const stand = buildStand();
  stand.group.position.set(-1.42, TOP, -0.52);
  stand.group.rotation.y = 0.34;
  root.add(stand.group);

  const deskPhones = buildHeadphones(0.31, 0.05, 0.18);
  deskPhones.rotation.x = -Math.PI / 2;
  deskPhones.rotation.z = -0.5;
  deskPhones.position.set(2.05, TOP + 0.18, 0.62);
  castAll(deskPhones);
  root.add(deskPhones);

  const mug = buildMug();
  mug.position.set(-0.85, TOP, 0.72);
  root.add(mug);

  const phone = buildPhone();
  phone.position.set(0.12, TOP, 1.12);
  phone.rotation.y = -0.22;
  root.add(phone);

  const speaker = buildSpeaker();
  speaker.group.position.set(1.28, TOP, 1.25);
  root.add(speaker.group);

  // A few slow motes so the frame never feels frozen
  const motes: THREE.Mesh[] = [];
  const moteGeo = new THREE.OctahedronGeometry(0.055);
  [PALETTE.indigo, PALETTE.purple, PALETTE.cyan, PALETTE.pink].forEach((c, idx) => {
    const mote = new THREE.Mesh(moteGeo, flat(c, 0.5));
    mote.userData.phase = idx * 1.7;
    root.add(mote);
    motes.push(mote);
  });

  const update = (t: number) => {
    laptop.update(t);
    stand.discMat.emissiveIntensity = 1.5 + Math.sin(t * 1.9) * 0.5;
    speaker.ringMat.emissiveIntensity = 1.7 + Math.sin(t * 2.6 + 1) * 0.6;
    motes.forEach((mote, idx) => {
      const phase = mote.userData.phase as number;
      const radius = 2.6 + (idx % 2) * 0.7;
      mote.position.set(
        Math.cos(t * 0.18 + phase) * radius,
        1.1 + Math.sin(t * 0.5 + phase) * 0.45,
        Math.sin(t * 0.18 + phase) * radius * 0.7
      );
      mote.rotation.x = t * 0.4;
      mote.rotation.y = t * 0.3;
    });
  };

  return { root, update };
}

export type HeroDeskSceneOptions = {
  /** Frustum half-height. Smaller = closer. */
  zoom?: number;
  /** Base turntable angle, radians. */
  yaw?: number;
};

/**
 * Boots the scene into `container` and returns a disposer.
 * Framework-free, so it can be reused outside React if you ever want to.
 */
export function createHeroDeskScene(container: HTMLElement, options: HeroDeskSceneOptions = {}) {
  const zoom = options.zoom ?? 4.2;
  const baseYaw = options.yaw ?? -0.18;

  const reduceMotion =
    typeof window.matchMedia === "function" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let renderer: THREE.WebGLRenderer;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  } catch {
    return () => {};
  }

  const revision = parseInt(THREE.REVISION, 10) || 128;
  // r155+ moved point/spot lights to physical units — same look either way.
  const pointScale = revision >= 155 ? 14 : 1;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const anyRenderer = renderer as unknown as Record<string, unknown>;
  const anyThree = THREE as unknown as Record<string, unknown>;
  if ("outputColorSpace" in anyRenderer && anyThree.SRGBColorSpace) {
    anyRenderer.outputColorSpace = anyThree.SRGBColorSpace;
  } else if ("outputEncoding" in anyRenderer && anyThree.sRGBEncoding) {
    anyRenderer.outputEncoding = anyThree.sRGBEncoding;
  }
  renderer.domElement.style.display = "block";
  renderer.domElement.style.width = "100%";
  renderer.domElement.style.height = "100%";
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.OrthographicCamera(-zoom, zoom, zoom, -zoom, 0.1, 100);
  camera.position.set(12, 10.2, 12); // true isometric direction
  camera.lookAt(0, 0.35, 0);

  // Lighting: one shadow-casting key, a cool fill, and two neon bounce lights
  scene.add(new THREE.HemisphereLight(0x8b7bff, 0x05060f, 0.65));
  scene.add(new THREE.AmbientLight(0x3a3570, 0.5));

  const key = new THREE.DirectionalLight(0xf2f0ff, 1.45);
  key.position.set(5.5, 9, 5);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.near = 0.5;
  key.shadow.camera.far = 30;
  key.shadow.camera.left = -4.6;
  key.shadow.camera.right = 4.6;
  key.shadow.camera.top = 4.2;
  key.shadow.camera.bottom = -4.2;
  key.shadow.bias = -0.0008;
  key.shadow.normalBias = 0.02;
  scene.add(key);
  scene.add(key.target);

  const fill = new THREE.DirectionalLight(0x7f6bff, 0.6);
  fill.position.set(-6, 4, -5);
  scene.add(fill);

  const bounceIndigo = new THREE.PointLight(0x6366f1, 2.4 * pointScale, 9, 2);
  bounceIndigo.position.set(-2.2, 1.4, -1.4);
  scene.add(bounceIndigo);

  const bounceCyan = new THREE.PointLight(0x38bdf8, 1.6 * pointScale, 7, 2);
  bounceCyan.position.set(2.2, 0.9, 1.8);
  scene.add(bounceCyan);

  const rig = new THREE.Group(); // bob + parallax
  const diorama = buildDiorama();
  rig.add(diorama.root);
  rig.rotation.y = baseYaw;
  scene.add(rig);

  // ---- sizing --------------------------------------------------------------
  // The diorama projects to roughly 6.4 x 4.4 units on screen, so the frustum
  // grows past `zoom` on narrow containers rather than cropping the desk.
  const FIT_HALF_WIDTH = 3.55;
  const resize = () => {
    const w = container.clientWidth;
    const h = container.clientHeight;
    if (w < 2 || h < 2) return;
    const aspect = w / h;
    const halfHeight = Math.max(zoom, FIT_HALF_WIDTH / aspect);
    camera.left = -halfHeight * aspect;
    camera.right = halfHeight * aspect;
    camera.top = halfHeight;
    camera.bottom = -halfHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
  };
  resize();

  const resizeObserver =
    typeof ResizeObserver !== "undefined" ? new ResizeObserver(resize) : null;
  resizeObserver?.observe(container);
  window.addEventListener("resize", resize);

  // ---- drag-to-rotate interaction -------------------------------------------
  let isDragging = false;
  let lastX = 0;
  let lastY = 0;
  let currentYaw = baseYaw;
  let currentPitch = 0;
  let velocityYaw = 0; // for momentum when dragging stops
  let velocityPitch = 0;

  const onPointerDown = (event: PointerEvent) => {
    isDragging = true;
    lastX = event.clientX;
    lastY = event.clientY;
    velocityYaw = 0;
    velocityPitch = 0;
  };

  const onPointerMove = (event: PointerEvent) => {
    if (!isDragging) return;
    const deltaX = event.clientX - lastX;
    const deltaY = event.clientY - lastY;
    lastX = event.clientX;
    lastY = event.clientY;

    // Map pixel deltas to rotation (0.008 rad per pixel ≈ 0.5° per pixel)
    velocityYaw = deltaX * 0.008;
    velocityPitch = deltaY * 0.008;
    currentYaw += velocityYaw;
    currentPitch += velocityPitch;

    // Clamp pitch to prevent flipping over the top/bottom
    currentPitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, currentPitch));
  };

  const onPointerUp = () => {
    isDragging = false;
  };

  if (!reduceMotion) {
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  }

  // ---- loop ----------------------------------------------------------------
  const clock = new THREE.Clock();
  let raf = 0;
  let visible = !document.hidden;

  const frame = () => {
    raf = requestAnimationFrame(frame);
    if (!visible) return;

    diorama.update(clock.getElapsedTime());

    // Apply momentum/friction when not dragging — coasts to a stop
    if (!isDragging) {
      velocityYaw *= 0.92;
      velocityPitch *= 0.92;
      currentYaw += velocityYaw;
      currentPitch += velocityPitch;
      currentPitch = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, currentPitch));
    }

    rig.rotation.y = currentYaw;
    rig.rotation.x = currentPitch;

    renderer.render(scene, camera);
  };

  if (reduceMotion) {
    diorama.update(0);
    rig.rotation.y = baseYaw;
    renderer.render(scene, camera);
  } else {
    raf = requestAnimationFrame(frame);
  }

  const onVisibility = () => {
    visible = !document.hidden;
  };
  document.addEventListener("visibilitychange", onVisibility);

  // ---- teardown ------------------------------------------------------------
  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("resize", resize);
    document.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("pointermove", onPointerMove);
    document.removeEventListener("pointerup", onPointerUp);
    document.removeEventListener("visibilitychange", onVisibility);
    resizeObserver?.disconnect();

    scene.traverse((object) => {
      const mesh = object as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.geometry.dispose();
        const materials = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        materials.forEach((material) => material.dispose());
      }
    });
    renderer.dispose();
    if (renderer.domElement.parentElement === container) {
      container.removeChild(renderer.domElement);
    }
  };
}

// #endregion scene ------------------------------------------------------------

export type HeroDeskSceneProps = HeroDeskSceneOptions & {
  /** Replaces the default placement box if you want it somewhere else. */
  className?: string;
};

const DEFAULT_BOX =
  "pointer-events-none absolute left-1/2 top-1/2 z-0 h-[100%] w-[100%] sm:w-[95%] sm:h-[110%] md:w-[85%] md:h-[120%] lg:w-[64%] lg:h-[120%] -translate-x-1/2 -translate-y-1/2 select-none";

/** Feathered edges, so the render dissolves into the page instead of ending. */
const FEATHER = "radial-gradient(70% 70% at 50% 50%, #000 46%, transparent 84%)";

export default function HeroDeskScene({ className, zoom, yaw }: HeroDeskSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    return createHeroDeskScene(containerRef.current, { zoom, yaw });
  }, [zoom, yaw]);

  return (
    <div aria-hidden="true" className={className ?? DEFAULT_BOX}>
      {/* CSS haze that ties the render into the page's own indigo glow */}
      <div className="absolute left-[8%] top-[18%] h-[62%] w-[78%] rounded-full bg-indigo-600/20 blur-[110px]" />
      <div className="absolute bottom-[8%] left-[2%] h-[45%] w-[60%] rounded-full bg-purple-600/15 blur-[120px]" />
      <div
        ref={containerRef}
        className="absolute inset-0"
        style={{ opacity: 0.8, maskImage: FEATHER, WebkitMaskImage: FEATHER }}
      />
    </div>
  );
}
