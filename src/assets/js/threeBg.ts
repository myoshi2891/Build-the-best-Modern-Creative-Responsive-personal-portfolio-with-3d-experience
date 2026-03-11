import * as THREE from "three"

interface ParticleUniforms {
	[uniform: string]: THREE.IUniform
	uTime: { value: number }
	uMouse: { value: THREE.Vector2 }
}

export class ThreeBackground {
    private scene: THREE.Scene | null
    private camera: THREE.PerspectiveCamera | null
    private renderer: THREE.WebGLRenderer | null
    private container: Element | null
    private geo: THREE.BufferGeometry | null
	private particleMat: (THREE.ShaderMaterial & { uniforms: ParticleUniforms }) | null
    private particles: THREE.Points | null
    private clock: THREE.Clock | null
    private animationFrameId: number | null = null
    
    private targetX = 0
    private targetY = 0
    private smoothX = 0
    private smoothY = 0

    constructor() {
        this.scene = new THREE.Scene()
        this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 3000)
        this.camera.position.z = 500

        this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

        this.container = document.querySelector(".three_bg")
        if (this.container) {
            this.container.appendChild(this.renderer.domElement)
        } else {
            console.error("Element with class 'three_bg' not found.")
        }

        const PARTICLE_COUNT = 12000
        this.geo = new THREE.BufferGeometry()
        const pos = new Float32Array(PARTICLE_COUNT * 3)
        const col = new Float32Array(PARTICLE_COUNT * 3)
        const sizes = new Float32Array(PARTICLE_COUNT)

        const palette = [
            new THREE.Color(0x00f5ff), // cyan
            new THREE.Color(0x7b2fff), // violet
            new THREE.Color(0xe8eaff), // ghost white
            new THREE.Color(0xff1744), // crimson
        ]

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const arm = i % 3
            const radius = Math.random() * 900 + 50
            const spinAngle = radius * 0.0025
            const branchAngle = (arm / 3) * Math.PI * 2

            const scatter = Math.pow(Math.random(), 3)
            const rx = scatter * (Math.random() < 0.5 ? 1 : -1) * 80
            const ry = scatter * (Math.random() < 0.5 ? 1 : -1) * 40
            const rz = (Math.random() - 0.5) * 350

            pos[i * 3] = Math.cos(branchAngle + spinAngle) * radius + rx
            pos[i * 3 + 1] = ry
            pos[i * 3 + 2] = Math.sin(branchAngle + spinAngle) * radius * 0.3 + rz

            const r = Math.random()
			const c = (r < 0.60 ? palette[0]
					: r < 0.80 ? palette[1]
					: r < 0.95 ? palette[2]
					:             palette[3])!

            col[i * 3] = c.r
            col[i * 3 + 1] = c.g
            col[i * 3 + 2] = c.b

            sizes[i] = Math.random() * 2.5 + 0.3
        }

        this.geo.setAttribute("position", new THREE.BufferAttribute(pos, 3))
        this.geo.setAttribute("color", new THREE.BufferAttribute(col, 3))
        this.geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1))

		const uniforms: ParticleUniforms = {
			uTime: { value: 0 },
			uMouse: { value: new THREE.Vector2(0, 0) },
		}

        this.particleMat = new THREE.ShaderMaterial({
            uniforms,
            vertexShader: `
                attribute float size;
                varying vec3 vColor;
                uniform float uTime;
                uniform vec2  uMouse;

                void main() {
                    vColor = color;

                    vec3 p = position;
                    p.y += sin(p.x * 0.005 + uTime * 0.28) * 14.0;
                    p.x += cos(p.z * 0.008 + uTime * 0.18) * 10.0;

                    vec4 mv = modelViewMatrix * vec4(p, 1.0);

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

                    float core = 1.0 - smoothstep(0.0, 0.18, dist);
                    float halo = 1.0 - smoothstep(0.0, 0.50, dist);

                    vec3  col   = vColor * (core * 1.6 + halo * 0.4);
                    float alpha = halo * 0.88;

                    gl_FragColor = vec4(col, alpha);
                }
            `,
            transparent: true,
            vertexColors: true,
            depthWrite: false,
			blending: THREE.AdditiveBlending,
		}) as THREE.ShaderMaterial & { uniforms: ParticleUniforms }

        this.particles = new THREE.Points(this.geo, this.particleMat)
        this.scene.add(this.particles)

        this.clock = new THREE.Clock()

        this.handlePointerMove = this.handlePointerMove.bind(this)
        this.handleResize = this.handleResize.bind(this)
        this.animate = this.animate.bind(this)
    }

    public init(): void {
        window.addEventListener("mousemove", this.handlePointerMove)
        window.addEventListener("touchmove", this.handlePointerMove, { passive: true })
        window.addEventListener("resize", this.handleResize)
        this.animate()
    }

    private handlePointerMove(e: MouseEvent | TouchEvent) {
        let clientX: number, clientY: number
        if ("touches" in e) {
            if (!e.touches[0]) return
            clientX = e.touches[0].clientX
            clientY = e.touches[0].clientY
        } else {
            clientX = e.clientX
            clientY = e.clientY
        }
        this.targetX = (clientX / window.innerWidth - 0.5) * 2
        this.targetY = -(clientY / window.innerHeight - 0.5) * 2
    }

    private handleResize() {
        if (!this.camera || !this.renderer) return
        this.camera.aspect = window.innerWidth / window.innerHeight
        this.camera.updateProjectionMatrix()
        this.renderer.setSize(window.innerWidth, window.innerHeight)
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }

    private animate() {
        this.animationFrameId = requestAnimationFrame(this.animate)

        if (!this.clock || !this.particles || !this.camera || !this.particleMat || !this.renderer || !this.scene) return

        const t = this.clock.getElapsedTime()

        this.smoothX += (this.targetX - this.smoothX) * 0.04
        this.smoothY += (this.targetY - this.smoothY) * 0.04

        this.particles.rotation.y = t * 0.04
        this.particles.rotation.x = this.smoothY * 0.08

        this.camera.position.x += (this.smoothX * 45 - this.camera.position.x) * 0.05
        this.camera.position.y += (this.smoothY * 28 - this.camera.position.y) * 0.05
        this.camera.lookAt(0, 0, 0)

        this.particleMat.uniforms.uTime.value = t
        this.particleMat.uniforms.uMouse.value.set(this.smoothX, this.smoothY)

        this.renderer.render(this.scene, this.camera)
    }

    public dispose(): void {
        if (this.animationFrameId !== null) {
            cancelAnimationFrame(this.animationFrameId)
        }
        window.removeEventListener("mousemove", this.handlePointerMove)
        window.removeEventListener("touchmove", this.handlePointerMove)
        window.removeEventListener("resize", this.handleResize)

        if (this.scene && this.particles) {
            this.scene.remove(this.particles)
        }
        if (this.geo) this.geo.dispose()
        if (this.particleMat) this.particleMat.dispose()
        
        if (this.renderer) {
            if (this.container && this.renderer.domElement.parentElement) {
                this.renderer.domElement.parentElement.removeChild(this.renderer.domElement)
            }
            this.renderer.dispose()
        }

        // Clear instance properties
        this.scene = null
        this.camera = null
        this.renderer = null
        this.particles = null
        this.geo = null
        this.particleMat = null
        this.clock = null
        this.animationFrameId = null
    }
}

/**
 * Create a ThreeBackground instance, initialize it, and start its animation and event handling.
 *
 * @returns The initialized ThreeBackground instance ready for use
 */
export function initThreeBackground(): ThreeBackground {
    const bg = new ThreeBackground()
    bg.init()
    return bg
}
