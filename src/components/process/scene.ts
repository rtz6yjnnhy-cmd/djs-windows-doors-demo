// Stylized 3D "old → new" replacement for a window or a door.
// Plain Three.js, loaded on demand by Process3D. Progress (0–1) drives the
// whole timeline: measure → old unit out → new unit in → seal → warm light.

import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

export type Kind = "window" | "door";

export type ProcessScene = {
  setProgress: (p: number) => void;
  setKind: (k: Kind) => void;
  setPointer: (x: number, y: number) => void;
  setActive: (active: boolean) => void;
  resize: () => void;
  dispose: () => void;
};

const COLORS = {
  wall: 0xdfe6ee,
  floor: 0x0b1830,
  oldFrame: 0x9a8466,
  oldPanel: 0x7a5c40,
  oldGlass: 0x8a8470,
  navy: 0x0a1628,
  royal: 0x1e4fa3,
  newGlass: 0xbfd5f3,
  amber: 0xd4a24c,
  sunlight: 0xf2c879,
};

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const smooth = (v: number) => v * v * (3 - 2 * v);
const seg = (t: number, a: number, b: number) => smooth(clamp01((t - a) / (b - a)));

type Spec = { w: number; h: number; sill: number };
const SPECS: Record<Kind, Spec> = {
  window: { w: 1.5, h: 1.3, sill: 0.95 },
  door: { w: 1.0, h: 2.1, sill: 0 },
};

const WALL = { w: 4.6, h: 3.1, d: 0.24 };

function wallTexture() {
  // Horizontal lap siding drawn on a canvas, so the wall reads as a house.
  const c = document.createElement("canvas");
  c.width = 64;
  c.height = 256;
  const g = c.getContext("2d")!;
  for (let i = 0; i < 8; i++) {
    const y = i * 32;
    const grad = g.createLinearGradient(0, y, 0, y + 32);
    grad.addColorStop(0, "#f3f6f9");
    grad.addColorStop(0.8, "#dde4ec");
    grad.addColorStop(1, "#a9b5c4");
    g.fillStyle = grad;
    g.fillRect(0, y, 64, 32);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
}

// Warm light from inside the house: bright center falling off to the edges.
function glowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const grad = g.createRadialGradient(128, 150, 10, 128, 128, 180);
  grad.addColorStop(0, "rgba(255,236,190,1)");
  grad.addColorStop(0.45, "rgba(242,200,121,0.75)");
  grad.addColorStop(1, "rgba(212,162,76,0.15)");
  g.fillStyle = grad;
  g.fillRect(0, 0, 256, 256);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function box(w: number, h: number, d: number, mat: THREE.Material, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  m.position.set(x, y, z);
  return m;
}

// Wall with a rectangular opening, built from four blocks around it.
function buildWall(spec: Spec, tex: THREE.Texture) {
  const g = new THREE.Group();
  const top = spec.sill + spec.h;
  const side = (WALL.w - spec.w) / 2;
  const make = (w: number, h: number, x: number, y: number) => {
    const t = tex.clone();
    t.needsUpdate = true;
    t.repeat.set(w / 1.2, h / 0.9);
    const mat = new THREE.MeshStandardMaterial({ color: COLORS.wall, map: t, roughness: 0.92 });
    g.add(box(w, h, WALL.d, mat, x, y, 0));
  };
  make(side, WALL.h, -(spec.w + side) / 2, WALL.h / 2);
  make(side, WALL.h, (spec.w + side) / 2, WALL.h / 2);
  make(spec.w, WALL.h - top, 0, top + (WALL.h - top) / 2);
  if (spec.sill > 0) make(spec.w, spec.sill, 0, spec.sill / 2);
  // Opening jambs, slightly darker so the cut-out reads in depth
  const jamb = new THREE.MeshStandardMaterial({ color: 0xcfd6df, roughness: 0.9 });
  g.add(box(spec.w, 0.02, WALL.d, jamb, 0, top - 0.01, 0));
  g.add(box(0.02, spec.h, WALL.d, jamb, -spec.w / 2 + 0.01, spec.sill + spec.h / 2, 0));
  g.add(box(0.02, spec.h, WALL.d, jamb, spec.w / 2 - 0.01, spec.sill + spec.h / 2, 0));
  return g;
}

type Unit = { group: THREE.Group; materials: THREE.MeshStandardMaterial[]; glass?: THREE.MeshStandardMaterial };

// A frame of four bars plus optional glass and muntins, centered on the opening.
function frame(spec: Spec, profile: number, depth: number, mat: THREE.Material) {
  const g = new THREE.Group();
  const { w, h } = spec;
  g.add(box(w, profile, depth, mat, 0, h / 2 - profile / 2, 0));
  g.add(box(w, profile, depth, mat, 0, -h / 2 + profile / 2, 0));
  g.add(box(profile, h, depth, mat, -w / 2 + profile / 2, 0, 0));
  g.add(box(profile, h, depth, mat, w / 2 - profile / 2, 0, 0));
  return g;
}

function buildUnit(kind: Kind, fresh: boolean): Unit {
  const spec = { ...SPECS[kind], w: SPECS[kind].w - 0.03, h: SPECS[kind].h - 0.03 };
  const group = new THREE.Group();
  const frameMat = new THREE.MeshStandardMaterial(
    fresh
      ? { color: COLORS.navy, roughness: 0.32, metalness: 0.35, transparent: true }
      : { color: COLORS.oldFrame, roughness: 1, metalness: 0, transparent: true },
  );
  const materials = [frameMat];
  group.add(frame(spec, fresh ? 0.07 : 0.1, 0.14, frameMat));

  let glass: THREE.MeshStandardMaterial | undefined;
  const inner = { w: spec.w - 0.16, h: spec.h - 0.16 };

  if (kind === "window") {
    glass = new THREE.MeshStandardMaterial(
      fresh
        ? { color: COLORS.newGlass, roughness: 0.03, metalness: 0.2, transparent: true, opacity: 0.22, envMapIntensity: 2 }
        : { color: COLORS.oldGlass, roughness: 1, transparent: true, opacity: 0.86 },
    );
    materials.push(glass);
    group.add(box(inner.w, inner.h, 0.012, glass, 0, 0, 0));
    // Muntins: a cross, like the window in the logo
    const muntin = fresh ? frameMat : new THREE.MeshStandardMaterial({ color: 0x84725a, roughness: 1, transparent: true });
    if (!fresh) materials.push(muntin as THREE.MeshStandardMaterial);
    group.add(box(0.035, inner.h, 0.05, muntin, 0, 0, 0.01));
    group.add(box(inner.w, 0.035, 0.05, muntin, 0, 0, 0.01));
    if (!fresh) group.rotation.z = 0.035; // visibly out of square
  } else {
    const panelMat = new THREE.MeshStandardMaterial(
      fresh
        ? { color: COLORS.navy, roughness: 0.4, metalness: 0.3, transparent: true }
        : { color: COLORS.oldPanel, roughness: 0.95, transparent: true },
    );
    materials.push(panelMat);
    group.add(box(inner.w, inner.h, 0.06, panelMat, 0, 0, 0));
    if (fresh) {
      // Tall glass lite and a long pull handle, after the door in the logo
      glass = new THREE.MeshStandardMaterial({ color: COLORS.newGlass, roughness: 0.05, metalness: 0.1, transparent: true, opacity: 0.55, envMapIntensity: 1.6 });
      materials.push(glass);
      group.add(box(0.16, inner.h * 0.78, 0.065, glass, -inner.w * 0.22, 0, 0));
      const handle = new THREE.MeshStandardMaterial({ color: COLORS.amber, roughness: 0.25, metalness: 0.8, transparent: true });
      materials.push(handle);
      group.add(box(0.025, 0.55, 0.05, handle, inner.w * 0.36, 0.02, 0.06));
    } else {
      // Raised panels and a round knob on the old door
      const inset = new THREE.MeshStandardMaterial({ color: 0x5c4a39, roughness: 1, transparent: true });
      materials.push(inset);
      for (const [y, ph] of [[0.45, 0.62], [-0.38, 0.8]] as const) {
        group.add(box(inner.w * 0.32, ph, 0.07, inset, -inner.w * 0.2, y, 0));
        group.add(box(inner.w * 0.32, ph, 0.07, inset, inner.w * 0.2, y, 0));
      }
      const knob = new THREE.MeshStandardMaterial({ color: 0x9a9182, roughness: 0.6, metalness: 0.4, transparent: true });
      materials.push(knob);
      const k = new THREE.Mesh(new THREE.SphereGeometry(0.035, 16, 12), knob);
      k.position.set(inner.w * 0.38, -0.02, 0.07);
      group.add(k);
      group.rotation.z = -0.012;
    }
  }

  group.position.set(0, spec.sill + 0.015 + spec.h / 2, 0);
  return { group, materials, glass };
}

// Thin amber bead around the opening; each bar scales in along its length.
function buildSeal(kind: Kind) {
  const { w, h, sill } = SPECS[kind];
  const mat = new THREE.MeshStandardMaterial({ color: COLORS.amber, roughness: 0.4, metalness: 0.3, emissive: COLORS.amber, emissiveIntensity: 0.25 });
  const t = 0.022;
  const z = WALL.d / 2 + 0.005;
  const bars = [
    box(w + t * 2, t, t, mat, 0, sill + h + t / 2, z),
    box(t, h, t, mat, w / 2 + t / 2, sill + h / 2, z),
    box(t, h, t, mat, -w / 2 - t / 2, sill + h / 2, z),
  ];
  if (sill > 0) bars.push(box(w + t * 2, t, t, mat, 0, sill - t / 2, z));
  const g = new THREE.Group();
  bars.forEach((b) => g.add(b));
  return { group: g, bars };
}

// Dimension lines for the "measure" step.
function buildMeasure(kind: Kind) {
  const { w, h, sill } = SPECS[kind];
  const mat = new THREE.MeshBasicMaterial({ color: COLORS.royal, transparent: true, opacity: 0 });
  const z = WALL.d / 2 + 0.02;
  const g = new THREE.Group();
  const horiz = box(w, 0.012, 0.005, mat, 0, sill + h + 0.18, z);
  const vert = box(0.012, h, 0.005, mat, -w / 2 - 0.18, sill + h / 2, z);
  const ticks = [
    box(0.012, 0.12, 0.005, mat, -w / 2, sill + h + 0.18, z),
    box(0.012, 0.12, 0.005, mat, w / 2, sill + h + 0.18, z),
    box(0.12, 0.012, 0.005, mat, -w / 2 - 0.18, sill + h, z),
    box(0.12, 0.012, 0.005, mat, -w / 2 - 0.18, sill, z),
  ];
  [horiz, vert, ...ticks].forEach((m) => g.add(m));
  return { group: g, horiz, vert, mat };
}

export function createProcessScene(canvas: HTMLCanvasElement, opts: { reduceMotion: boolean }): ProcessScene {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);

  scene.add(new THREE.HemisphereLight(0xe8efff, 0x1b2f52, 1.0));
  const key = new THREE.DirectionalLight(0xfff1dc, 1.6);
  key.position.set(3, 5, 4);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0x8fb3e8, 0.6);
  rim.position.set(-4, 2, -3);
  scene.add(rim);

  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(4.5, 48),
    new THREE.MeshStandardMaterial({ color: COLORS.floor, roughness: 0.95, transparent: true, opacity: 0.9 }),
  );
  floor.rotation.x = -Math.PI / 2;
  scene.add(floor);

  const tex = wallTexture();
  const glowTex = glowTexture();

  const sets = (["window", "door"] as Kind[]).map((kind) => {
    const spec = SPECS[kind];
    const root = new THREE.Group();
    const wall = buildWall(spec, tex);
    const oldUnit = buildUnit(kind, false);
    const newUnit = buildUnit(kind, true);
    const seal = buildSeal(kind);
    const measure = buildMeasure(kind);
    // Warm interior light seen through the new unit
    const glowMat = new THREE.MeshBasicMaterial({ map: glowTex, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
    const glow = new THREE.Mesh(new THREE.PlaneGeometry(spec.w * 0.98, spec.h * 0.98), glowMat);
    glow.position.set(0, spec.sill + spec.h / 2, -WALL.d / 2 - 0.02);
    const lamp = new THREE.PointLight(COLORS.sunlight, 0, 5, 1.8);
    lamp.position.set(0, spec.sill + spec.h / 2, 1.4);
    root.add(wall, oldUnit.group, newUnit.group, seal.group, measure.group, glow, lamp);
    scene.add(root);
    return { kind, root, oldUnit, newUnit, seal, measure, glowMat, lamp, oldBase: oldUnit.group.position.clone(), newBase: newUnit.group.position.clone() };
  });

  let kind: Kind = "window";
  let progress = 0;
  let active = false;
  let raf = 0;
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };

  const setOpacity = (mats: THREE.MeshStandardMaterial[], o: number) => {
    for (const m of mats) {
      const base = (m.userData.baseOpacity ??= m.opacity);
      m.opacity = base * o;
      m.depthWrite = o > 0.98;
    }
  };

  const apply = () => {
    const t = progress;
    for (const s of sets) {
      s.root.visible = s.kind === kind;
      if (!s.root.visible) continue;

      // Measure: dimension lines draw in, then fade
      const m = seg(t, 0.02, 0.14);
      s.measure.horiz.scale.x = Math.max(0.001, m);
      s.measure.vert.scale.y = Math.max(0.001, m);
      s.measure.mat.opacity = m * (1 - seg(t, 0.22, 0.3));

      // Old unit tilts out toward the viewer and fades away
      const out = seg(t, 0.2, 0.46);
      s.oldUnit.group.position.set(s.oldBase.x + out * 0.35, s.oldBase.y + out * 0.25, s.oldBase.z + out * 1.9);
      s.oldUnit.group.rotation.y = out * 0.55;
      setOpacity(s.oldUnit.materials, 1 - seg(t, 0.32, 0.46));
      s.oldUnit.group.visible = t < 0.47;

      // New unit glides into the opening
      const inn = seg(t, 0.46, 0.72);
      s.newUnit.group.visible = t > 0.45;
      s.newUnit.group.position.set(s.newBase.x - (1 - inn) * 0.3, s.newBase.y + (1 - inn) * 0.2, s.newBase.z + (1 - inn) * 1.9);
      s.newUnit.group.rotation.y = -(1 - inn) * 0.5;
      setOpacity(s.newUnit.materials, seg(t, 0.46, 0.58));

      // Seal bead runs around the frame
      const seal = seg(t, 0.72, 0.86);
      s.seal.group.visible = seal > 0.001;
      s.seal.bars.forEach((b, i) => {
        const local = clamp01(seal * s.seal.bars.length - i);
        if (b.geometry.parameters.width > b.geometry.parameters.height) b.scale.x = Math.max(0.001, local);
        else b.scale.y = Math.max(0.001, local);
      });

      // Warm light comes on inside
      const glow = seg(t, 0.84, 1);
      s.glowMat.opacity = glow;
      s.lamp.intensity = glow * 1.4;
    }
  };

  const target = new THREE.Vector3();
  const placeCamera = () => {
    const spec = SPECS[kind];
    const t = opts.reduceMotion ? 1 : progress;
    const cy = spec.sill + spec.h / 2;
    // From a three-quarter view to almost straight on
    const angle = THREE.MathUtils.lerp(0.62, 0.16, smooth(t)) + pointer.sx * 0.18;
    const dist = kind === "door" ? 7.2 : 6.6;
    camera.position.set(Math.sin(angle) * dist, cy + 0.55 + pointer.sy * 0.25, Math.cos(angle) * dist);
    target.set(0, cy, 0);
    camera.lookAt(target);
  };

  const render = () => {
    pointer.sx += (pointer.x - pointer.sx) * 0.08;
    pointer.sy += (pointer.y - pointer.sy) * 0.08;
    placeCamera();
    renderer.render(scene, camera);
    if (active) raf = requestAnimationFrame(render);
  };

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    if (!active) render();
  };

  apply();
  resize();

  return {
    setProgress(p) {
      progress = clamp01(p);
      apply();
      if (!active) render();
    },
    setKind(k) {
      kind = k;
      apply();
      if (!active) render();
    },
    setPointer(x, y) {
      if (opts.reduceMotion) return;
      pointer.x = x;
      pointer.y = y;
    },
    setActive(a) {
      if (a === active) return;
      active = a;
      cancelAnimationFrame(raf);
      if (active) raf = requestAnimationFrame(render);
    },
    resize,
    dispose() {
      active = false;
      cancelAnimationFrame(raf);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const mats = Array.isArray(o.material) ? o.material : [o.material];
          mats.forEach((m) => {
            (m as THREE.MeshStandardMaterial).map?.dispose();
            m.dispose();
          });
        }
      });
      tex.dispose();
      glowTex.dispose();
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}
