import * as THREE from "three"
import fragment from "../shaders/fragment.glsl"
import vertex from "../shaders/vertex.glsl"

const images = {
	bg1Url: "./public/avatars/11.png",
	bg2Url: "./public/avatars/10.png",
	bg3Url: "./public/avatars/9.png",
	bg4Url: "./public/avatars/8.png",
}

interface ShadedConfig {
	container: HTMLElement | null
	inner: HTMLElement | null
	links: HTMLElement[]
	targetX: number
	targetY: number
	scene: THREE.Scene
	perspective: number
	sizes: THREE.Vector2
	offset: THREE.Vector2
	uniforms: {
		uTexture: { value: THREE.Texture }
		uAlpha: { value: number }
		uOffset: { value: THREE.Vector2 }
	}
	camera: THREE.PerspectiveCamera
	renderer: THREE.WebGLRenderer
	geometry: THREE.PlaneGeometry
	material: THREE.ShaderMaterial
	mesh: THREE.Mesh | undefined
	hovered: boolean
}

const loader = new THREE.TextureLoader()
const texture1 = loader.load(images.bg1Url)
const texture2 = loader.load(images.bg2Url)
const texture3 = loader.load(images.bg3Url)
const texture4 = loader.load(images.bg4Url)

function lerp(start: number, end: number, t: number): number {
	return start * (1 - t) + end * t
}

class Shaded implements ShadedConfig {
	container: HTMLElement | null
	inner: HTMLElement | null
	links: HTMLElement[]
	targetX: number
	targetY: number
	scene: THREE.Scene
	perspective: number
	sizes: THREE.Vector2
	offset: THREE.Vector2
	uniforms: {
		uTexture: { value: THREE.Texture }
		uAlpha: { value: number }
		uOffset: { value: THREE.Vector2 }
	}
	camera: THREE.PerspectiveCamera = new THREE.PerspectiveCamera()
	renderer: THREE.WebGLRenderer = new THREE.WebGLRenderer()
	geometry: THREE.PlaneGeometry = new THREE.PlaneGeometry()
	material: THREE.ShaderMaterial = new THREE.ShaderMaterial()
	mesh: THREE.Mesh | undefined
	hovered: boolean = false

	constructor() {
		this.container = document.querySelector(".landing")
		this.inner = document.querySelector(".intro")
		this.links = Array.from(
			document.querySelectorAll<HTMLElement>(".shadedimg")
		)
		this.targetX = 0
		this.targetY = 0
		this.scene = new THREE.Scene()
		this.perspective = 1000
		this.sizes = new THREE.Vector2(0, 0)
		this.offset = new THREE.Vector2(0, 0)
		this.uniforms = {
			uTexture: { value: texture1 },
			uAlpha: { value: 0.0 },
			uOffset: { value: new THREE.Vector2(0.0, 0.0) },
		}
		this.links.map((link, i) => {
			link.addEventListener("mouseenter", () => {
				switch (i) {
					case 0:
						this.uniforms.uTexture.value = texture1
						break
					case 1:
						this.uniforms.uTexture.value = texture2
						break
					case 2:
						this.uniforms.uTexture.value = texture3
						break
					case 3:
						this.uniforms.uTexture.value = texture4
						break
					default:
						this.uniforms.uTexture.value = texture1
						break
				}
			})
			link.addEventListener("mouseleave", () => {
				this.uniforms.uAlpha.value = lerp(
					this.uniforms.uAlpha.value,
					0.0,
					0.1
				)
			})
		})
		this.setupCamera = this.setupCamera.bind(this)
		this.checkHovered()
		this.setupCamera()
		this.followMouseMove()
		this.createMesh()
	}

	get viewport() {
		let width = window.innerWidth
		let height = window.innerHeight
		let aspectRatio = width / height
		let pixelRatio = window.devicePixelRatio
		return { width, height, aspectRatio, pixelRatio }
	}

	checkHovered() {
		this.inner?.addEventListener("mouseenter", () => {
			this.hovered = true
		})
		this.inner?.addEventListener("mouseleave", () => {
			this.hovered = false
			this.uniforms.uTexture = { value: texture1 }
		})
	}
	setupCamera() {
		window.addEventListener("resize", this.onResize.bind(this))
		const viewport = {
			width: window.innerWidth,
			height: window.innerHeight,
		}
		let fov =
			(180 * (2 * Math.atan(viewport.height / 2 / this.perspective))) /
			Math.PI

		this.camera = new THREE.PerspectiveCamera(
			fov,
			this.viewport.aspectRatio,
			0.1,
			1000
		)
		this.camera.position.set(0, 0, this.perspective)

		// renderer
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		})

		this.renderer.setSize(this.viewport.width, this.viewport.height)
		this.renderer.setPixelRatio(this.viewport.pixelRatio)
		this.container?.appendChild(this.renderer.domElement)
	}

	createMesh() {
		this.geometry = new THREE.PlaneGeometry(1, 1, 20, 20)
		this.material = new THREE.ShaderMaterial({
			uniforms: this.uniforms,
			vertexShader: vertex,
			fragmentShader: fragment,
			transparent: true,
		})
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.sizes.set(370, 470)
		this.mesh.scale.set(this.sizes.x, this.sizes.y, 1)
		this.mesh.position.set(this.offset.x, this.offset.y, 0)
		this.scene.add(this.mesh)
	}

	followMouseMove() {
		window.addEventListener("mousemove", (event: MouseEvent) => {
			this.targetX = event.clientX
			this.targetY = event.clientY
		})
	}

	onResize() {
		this.camera.aspect = this.viewport.aspectRatio
		const viewport = {
			width: window.innerWidth,
			height: window.innerHeight,
		}
		this.camera.fov =
			(180 * (2 * Math.atan(viewport.height / 2 / this.perspective))) /
			Math.PI
		this.renderer.setSize(this.viewport.width, this.viewport.height)
		this.camera.updateProjectionMatrix()
	}
}
