import * as THREE from "three"

// ─── Scene ───────────────────────────────────────────────────────────────────
const scene  = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 3000)
camera.position.z = 500

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
renderer.setSize(window.innerWidth, window.innerHeight)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

const container = document.querySelector(".three_bg")
if (container) {
    container.appendChild(renderer.domElement)
} else {
    console.error("Element with class 'three_bg' not found.")
}

// ─── Particle Galaxy ─────────────────────────────────────────────────────────
const PARTICLE_COUNT = 12000
const geo   = new THREE.BufferGeometry()
const pos   = new Float32Array(PARTICLE_COUNT * 3)
const col   = new Float32Array(PARTICLE_COUNT * 3)
const sizes = new Float32Array(PARTICLE_COUNT)

// Color palette: electric cyan, deep violet, ghost white, crimson (rare)
const palette = [
    new THREE.Color(0x00f5ff), // cyan
    new THREE.Color(0x7b2fff), // violet
    new THREE.Color(0xe8eaff), // ghost white
    new THREE.Color(0xff1744), // crimson
]

for (let i = 0; i < PARTICLE_COUNT; i++) {
    // Three-arm spiral distribution
    const arm         = i % 3
    const radius      = Math.random() * 900 + 50
    const spinAngle   = radius * 0.0025
    const branchAngle = (arm / 3) * Math.PI * 2

    const scatter = Math.pow(Math.random(), 3)
    const rx = scatter * (Math.random() < 0.5 ? 1 : -1) * 80
    const ry = scatter * (Math.random() < 0.5 ? 1 : -1) * 40
    const rz = (Math.random() - 0.5) * 350

    pos[i * 3]     = Math.cos(branchAngle + spinAngle) * radius + rx
    pos[i * 3 + 1] = ry
    pos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius * 0.3 + rz

    // 60% cyan, 20% violet, 15% ghost, 5% crimson
    const r = Math.random()
    const c = r < 0.60 ? palette[0]
            : r < 0.80 ? palette[1]
            : r < 0.95 ? palette[2]
            :             palette[3]

    col[i * 3]     = c.r
    col[i * 3 + 1] = c.g
    col[i * 3 + 2] = c.b

    sizes[i] = Math.random() * 2.5 + 0.3
}

geo.setAttribute("position", new THREE.BufferAttribute(pos,   3))
geo.setAttribute("color",    new THREE.BufferAttribute(col,   3))
geo.setAttribute("size",     new THREE.BufferAttribute(sizes, 1))

const particleMat = new THREE.ShaderMaterial({
    uniforms: {
        uTime:  { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
    },
    vertexShader: `
        attribute float size;
        varying vec3 vColor;
        uniform float uTime;
        uniform vec2  uMouse;

        void main() {
            vColor = color;

            vec3 p = position;
            // Ambient drift — gentle organic movement
            p.y += sin(p.x * 0.005 + uTime * 0.28) * 14.0;
            p.x += cos(p.z * 0.008 + uTime * 0.18) * 10.0;

            vec4 mv = modelViewMatrix * vec4(p, 1.0);

            // Mouse parallax — deeper particles move more
            float depth = clamp(-mv.z / 600.0, 0.0, 1.0);
            mv.x += uMouse.x * depth * 55.0;
            mv.y += uMouse.y * depth * 38.0;

            gl_Position  = projectionMatrix * mv;
            gl_PointSize = size * (360.0 / -mv.z);
        }
    `,
    fragmentShader: `
        varying vec3 vColor;

        void main() {
            vec2  uv   = gl_PointCoord - 0.5;
            float dist = length(uv);
            if (dist > 0.5) discard;

            // Soft glowing core
            float core = 1.0 - smoothstep(0.0, 0.18, dist);
            float halo = 1.0 - smoothstep(0.0, 0.50, dist);

            vec3  col   = vColor * (core * 1.6 + halo * 0.4);
            float alpha = halo * 0.88;

            gl_FragColor = vec4(col, alpha);
        }
    `,
    transparent:  true,
    vertexColors: true,
    depthWrite:   false,
    blending:     THREE.AdditiveBlending,
})

const particles = new THREE.Points(geo, particleMat)
scene.add(particles)

// ─── Mouse Tracking ───────────────────────────────────────────────────────────
let targetX = 0, targetY = 0
let smoothX = 0, smoothY = 0

function handlePointerMove(e: MouseEvent | TouchEvent) {
    let clientX: number, clientY: number
    if ('touches' in e) {
        if (!e.touches[0]) return
        clientX = e.touches[0].clientX
        clientY = e.touches[0].clientY
    } else {
        clientX = e.clientX
        clientY = e.clientY
    }
    targetX = (clientX / window.innerWidth  - 0.5) * 2
    targetY = -(clientY / window.innerHeight - 0.5) * 2
}

window.addEventListener("mousemove", handlePointerMove)
window.addEventListener("touchmove", handlePointerMove, { passive: true })

// ─── Animation ────────────────────────────────────────────────────────────────
const clock = new THREE.Clock()
let animationFrameId: number | null = null

function animate() {
    animationFrameId = requestAnimationFrame(animate)

    const t = clock.getElapsedTime()

    // Smooth mouse lerp
    smoothX += (targetX - smoothX) * 0.04
    smoothY += (targetY - smoothY) * 0.04

    // Slow galaxy rotation
    particles.rotation.y = t * 0.04
    particles.rotation.x = smoothY * 0.08

    // Subtle camera drift following mouse
    camera.position.x += (smoothX * 45 - camera.position.x) * 0.05
    camera.position.y += (smoothY * 28 - camera.position.y) * 0.05
    camera.lookAt(0, 0, 0)

    particleMat.uniforms.uTime.value = t
    particleMat.uniforms.uMouse.value.set(smoothX, smoothY)

    renderer.render(scene, camera)
}

animate()

// ─── Resize ───────────────────────────────────────────────────────────────────
function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
}

window.addEventListener("resize", handleResize)

// ─── Cleanup ─────────────────────────────────────────────────────────────────
export function dispose() {
    if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
    }
    window.removeEventListener("mousemove", handlePointerMove)
    window.removeEventListener("touchmove", handlePointerMove)
    window.removeEventListener("resize", handleResize)

    geo.dispose()
    particleMat.dispose()
    renderer.dispose()

    if (container && renderer.domElement.parentElement) {
        renderer.domElement.parentElement.removeChild(renderer.domElement)
    }
}
