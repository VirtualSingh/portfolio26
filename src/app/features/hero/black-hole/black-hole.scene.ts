/* "The Singularity" — ambient WebGL scene behind the hero copy.
 * Loaded on demand via dynamic import so three.js never touches the initial
 * bundle. Drawn straight on the paper (no dark backdrop), so the disk uses
 * normal alpha blending — additive light would vanish on white. The ramp runs
 * sun-white and pale gold at the core out to Electric Iris and deep indigo at
 * the rim. All tunables live in BlackHoleSettings; the component owns
 * lifecycle (start/stop/resize/dispose). */
import * as THREE from 'three';

export interface BlackHoleSettings {
  /** Screen-space lean of the whole scene, degrees. */
  tiltDeg: number;
  /** Accretion-disk particle count; lower on small screens. */
  instanceCount: number;
  /** Device-pixel-ratio ceiling. */
  maxPixelRatio: number;
}

export interface BlackHoleScene {
  start(): void;
  stop(): void;
  setSize(width: number, height: number): void;
  renderOnce(): void;
  dispose(): void;
}

const EVENT_HORIZON_RADIUS = 4;
const DISK_INNER = 5;
const DISK_OUTER = 45;
const CAMERA_POSITION = new THREE.Vector3(0, 26, 74);
/** How wavy the disk surface is and how fast matter orbits. */
const TURBULENCE = 1.6;
const ORBIT_SPEED = 0.6;

/** Simplex noise by Ashima Arts / Stefan Gustavson (MIT), as used in the source pen. */
const NOISE_CHUNK = /* glsl */ `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
  float snoise(vec3 v) {
    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);
    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;
    i = mod289(i);
    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;
    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);
    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);
    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);
    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }
`;

const DISK_VERTEX = /* glsl */ `
  ${NOISE_CHUNK}
  uniform float uTime;
  varying vec3 vColor;
  varying float vOpacity;
  void main() {
    vec4 instPos = instanceMatrix * vec4(0.0, 0.0, 0.0, 1.0);
    float r = length(instPos.xz);
    float initialAngle = atan(instPos.z, instPos.x);
    float orbitalVelocity = (1.5 / sqrt(r)) * ${ORBIT_SPEED.toFixed(2)};
    float currentAngle = initialAngle + (uTime * orbitalVelocity);
    vec3 orbitPos = vec3(cos(currentAngle) * r, instPos.y, sin(currentAngle) * r);
    float noise = snoise(vec3(orbitPos.x * 0.08, orbitPos.z * 0.08, uTime * 0.3));
    orbitPos.y += noise * ${TURBULENCE.toFixed(2)};

    // Doppler shimmer: matter swinging toward the camera brightens
    vec3 viewDir = normalize(cameraPosition - (modelMatrix * vec4(orbitPos, 1.0)).xyz);
    vec3 orbitDir = normalize(mat3(modelMatrix) * vec3(-sin(currentAngle), 0.0, cos(currentAngle)));
    float doppler = dot(orbitDir, viewDir);

    // Core out to rim: sun white -> pale gold -> Electric Iris -> deep indigo
    vec3 core = vec3(1.0, 0.98, 0.9);
    vec3 gold = vec3(1.0, 0.84, 0.45);
    vec3 iris = vec3(0.42, 0.39, 1.0);
    vec3 indigo = vec3(0.09, 0.11, 0.42);
    vec3 color = mix(iris, indigo, smoothstep(22.0, 45.0, r));
    color = mix(gold, color, smoothstep(8.0, 16.0, r));
    color = mix(core, color, smoothstep(4.5, 8.0, r));
    vColor = color * (0.92 + doppler * 0.22);
    vOpacity = (smoothstep(3.8, 5.5, r) * (1.0 - smoothstep(38.0, 48.0, r))) * 0.85;

    // Keep each streak aligned with its orbit as it advances
    float deltaAngle = currentAngle - initialAngle;
    float c = cos(deltaAngle);
    float s = sin(deltaAngle);
    mat3 rotY = mat3(c, 0.0, s, 0.0, 1.0, 0.0, -s, 0.0, c);
    vec3 localPos = rotY * (instanceMatrix * vec4(position, 0.0)).xyz;
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(orbitPos + localPos, 1.0);
  }
`;

const DISK_FRAGMENT = /* glsl */ `
  varying vec3 vColor;
  varying float vOpacity;
  void main() {
    gl_FragColor = vec4(vColor, vOpacity);
  }
`;

const AURA_VERTEX = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vView = normalize(-(modelViewMatrix * vec4(position, 1.0)).xyz);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const AURA_FRAGMENT = /* glsl */ `
  varying vec3 vNormal;
  varying vec3 vView;
  void main() {
    float rim = pow(1.0 - max(dot(vNormal, vView), 0.0), 4.0);
    gl_FragColor = vec4(vec3(1.0, 0.88, 0.55), rim);
  }
`;

export function createBlackHoleScene(
  canvas: HTMLCanvasElement,
  settings: BlackHoleSettings,
): BlackHoleScene {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 300);
  camera.position.copy(CAMERA_POSITION);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance',
  });
  // No tone mapping: the ramp colors are brand values and should land as-is
  renderer.setClearColor(0x000000, 0);

  // Everything hangs off one tilted group so the lean stays a single knob
  const root = new THREE.Group();
  root.rotation.z = THREE.MathUtils.degToRad(settings.tiltDeg);
  scene.add(root);

  const horizonGeo = new THREE.SphereGeometry(EVENT_HORIZON_RADIUS, 48, 48);
  const horizonMat = new THREE.MeshBasicMaterial({ color: 0x010103 });
  root.add(new THREE.Mesh(horizonGeo, horizonMat));

  const auraGeo = new THREE.SphereGeometry(EVENT_HORIZON_RADIUS + 0.25, 48, 48);
  const auraMat = new THREE.ShaderMaterial({
    vertexShader: AURA_VERTEX,
    fragmentShader: AURA_FRAGMENT,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false,
  });
  root.add(new THREE.Mesh(auraGeo, auraMat));

  const streakGeo = new THREE.CylinderGeometry(0.01, 0.12, 2.2, 3);
  streakGeo.rotateX(Math.PI / 2);
  const diskMat = new THREE.ShaderMaterial({
    uniforms: { uTime: { value: 0 } },
    vertexShader: DISK_VERTEX,
    fragmentShader: DISK_FRAGMENT,
    transparent: true,
    depthWrite: false,
  });
  const disk = new THREE.InstancedMesh(streakGeo, diskMat, settings.instanceCount);
  disk.frustumCulled = false;
  const dummy = new THREE.Object3D();
  for (let i = 0; i < settings.instanceCount; i++) {
    const r = DISK_INNER + Math.pow(Math.random(), 1.3) * (DISK_OUTER - DISK_INNER);
    const angle = Math.random() * Math.PI * 2;
    dummy.position.set(Math.cos(angle) * r, (Math.random() - 0.5) * (8 / r), Math.sin(angle) * r);
    dummy.lookAt(
      dummy.position.x + Math.sin(angle),
      dummy.position.y,
      dummy.position.z - Math.cos(angle),
    );
    dummy.updateMatrix();
    disk.setMatrixAt(i, dummy.matrix);
  }
  root.add(disk);

  // Manual accumulator instead of THREE.Clock: elapsed time survives
  // stop/start (offscreen, tab hidden) so the orbits never jump.
  let elapsed = 0;
  let lastTs = 0;
  let frameId = 0;
  let running = false;

  const renderFrame = (): void => {
    diskMat.uniforms['uTime'].value = elapsed;
    renderer.render(scene, camera);
  };

  const loop = (ts: number): void => {
    if (!running) {
      return;
    }
    if (lastTs !== 0) {
      elapsed += Math.min((ts - lastTs) / 1000, 0.1);
    }
    lastTs = ts;
    renderFrame();
    frameId = requestAnimationFrame(loop);
  };

  return {
    start(): void {
      if (running) {
        return;
      }
      running = true;
      lastTs = 0;
      frameId = requestAnimationFrame(loop);
    },
    stop(): void {
      running = false;
      cancelAnimationFrame(frameId);
    },
    setSize(width: number, height: number): void {
      if (width === 0 || height === 0) {
        return;
      }
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, settings.maxPixelRatio));
      renderer.setSize(width, height, false);
      if (!running) {
        renderFrame();
      }
    },
    renderOnce(): void {
      renderFrame();
    },
    dispose(): void {
      running = false;
      cancelAnimationFrame(frameId);
      horizonGeo.dispose();
      horizonMat.dispose();
      auraGeo.dispose();
      auraMat.dispose();
      streakGeo.dispose();
      diskMat.dispose();
      disk.dispose();
      renderer.dispose();
    },
  };
}
