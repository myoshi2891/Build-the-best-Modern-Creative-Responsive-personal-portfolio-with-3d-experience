import * as THREE from "three"
import fragment from "../shaders/fragment.glsl"
import vertex from "../shaders/vertex.glsl"

// ✅ 正しい画像パス（publicフォルダ以下にある場合）
const images = {
	bg1Url: "/public/avatars/11.png",
	bg2Url: "/public/avatars/10.png",
	bg3Url: "/public/avatars/9.png",
	bg4Url: "/public/avatars/8.png",
}

// ✅ PromiseでTextureを読み込む関数
function loadTexture(url: string): Promise<THREE.Texture> {
	return new Promise((resolve, reject) => {
		new THREE.TextureLoader().load(url, resolve, undefined, reject)
	})
}

// ✅ 線形補間関数
function lerp(start: number, end: number, t: number): number {
	return start * (1 - t) + end * t
}

// ✅ Shadedクラス
class Shaded {
	container: HTMLElement | null
	inner: HTMLElement | null
	links: HTMLElement[]
	targetX: number = 0
	targetY: number = 0
	scene: THREE.Scene = new THREE.Scene()
	perspective: number = 1000
	sizes: THREE.Vector2 = new THREE.Vector2(0, 0)
	offset: THREE.Vector2 = new THREE.Vector2(0, 0)
	camera!: THREE.PerspectiveCamera
	renderer!: THREE.WebGLRenderer
	geometry!: THREE.PlaneGeometry
	material!: THREE.ShaderMaterial
	mesh!: THREE.Mesh
	hovered: boolean = false

	uniforms: {
		uTexture: { value: THREE.Texture }
		uAlpha: { value: number }
		uOffset: { value: THREE.Vector2 }
	}

	// 複数テクスチャを引数で受け取る
	constructor(
		private texture1: THREE.Texture,
		private texture2: THREE.Texture,
		private texture3: THREE.Texture,
		private texture4: THREE.Texture
	) {
		this.container = document.querySelector(".landing")
		this.inner = document.querySelector(".intro")
		this.links = Array.from(
			document.querySelectorAll<HTMLElement>(".shadedimg")
		)

		this.uniforms = {
			uTexture: { value: this.texture1 },
			uAlpha: { value: 1.0 },
			uOffset: { value: new THREE.Vector2(0.0, 0.0) },
		}

		this.setupCamera()
		this.setupRenderer()
		this.setupEvents()
		this.createMesh()
		this.render()
	}

	get viewport() {
		let width = window.innerWidth
		let height = window.innerHeight
		let aspectRatio = width / height
		let pixelRatio = window.devicePixelRatio
		return { width, height, aspectRatio, pixelRatio }
	}

	setupCamera() {
		const fov =
			(180 * (2 * Math.atan(window.innerHeight / 2 / this.perspective))) /
			Math.PI

		this.camera = new THREE.PerspectiveCamera(
			fov,
			this.viewport.aspectRatio,
			0.1,
			1000
		)
		this.camera.position.set(0, 0, this.perspective)
	}

	setupRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			alpha: true,
		})
		this.renderer.setSize(this.viewport.width, this.viewport.height)
		this.renderer.setPixelRatio(this.viewport.pixelRatio)
		this.container?.appendChild(this.renderer.domElement)

		window.addEventListener("resize", this.onResize.bind(this))
	}

	setupEvents() {
		this.inner?.addEventListener("mouseenter", () => {
			this.hovered = true
		})
		this.inner?.addEventListener("mouseleave", () => {
			this.hovered = false
			this.uniforms.uTexture.value = this.texture1
		})

		// this.links.forEach((link, i) => {
		// 	link.addEventListener("mouseenter", () => {
		// 		switch (i) {
		// 			case 0:
		// 				this.uniforms.uTexture.value = this.texture1
		// 				break
		// 			case 1:
		// 				this.uniforms.uTexture.value = this.texture2
		// 				break
		// 			case 2:
		// 				this.uniforms.uTexture.value = this.texture3
		// 				break
		// 			case 3:
		// 				this.uniforms.uTexture.value = this.texture4
		// 				break
		// 			default:
		// 				this.uniforms.uTexture.value = this.texture1
		// 		}
		// 	})
		// 	link.addEventListener("mouseleave", () => {
		// 		this.uniforms.uAlpha.value = lerp(
		// 			this.uniforms.uAlpha.value,
		// 			0.0,
		// 			0.1
		// 		)
		// 	})
		// })

		// 初期状態でも画像が見えるように
		this.hovered = true
		this.uniforms.uAlpha.value = 1.0

		this.links.forEach((link, i) => {
			link.addEventListener("mouseenter", () => {
				this.hovered = true // ← 追加！
				switch (i) {
					case 0:
						this.uniforms.uTexture.value = this.texture1
						break
					case 1:
						this.uniforms.uTexture.value = this.texture2
						break
					case 2:
						this.uniforms.uTexture.value = this.texture3
						break
					case 3:
						this.uniforms.uTexture.value = this.texture4
						break
				}
				this.uniforms.uTexture.value.needsUpdate = true // ← これが重要！
			})
			link.addEventListener("mouseleave", () => {
				this.hovered = false // ← 追加！
			})
		})

		window.addEventListener("mousemove", e => {
			this.targetX = e.clientX
			this.targetY = e.clientY
		})
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
		this.scene.add(this.mesh)
	}

	onResize() {
		this.camera.aspect = this.viewport.aspectRatio
		this.camera.fov =
			(180 * (2 * Math.atan(window.innerHeight / 2 / this.perspective))) /
			Math.PI
		this.camera.updateProjectionMatrix()
		this.renderer.setSize(this.viewport.width, this.viewport.height)
	}

	render() {
		this.offset.x = lerp(this.offset.x, this.targetX, 0.1)
		this.offset.y = lerp(this.offset.y, this.targetY, 0.1)

		this.uniforms.uOffset.value.set(
			(this.targetX - this.offset.x) * 0.0003,
			-(this.targetY - this.offset.y) * 0.0003
		)

		this.mesh.position.set(
			this.offset.x - window.innerWidth / 2,
			-this.offset.y + window.innerHeight / 2,
			0
		)

		this.uniforms.uAlpha.value = lerp(
			this.uniforms.uAlpha.value,
			this.hovered ? 1.0 : 0.0,
			0.1
		)

		this.renderer.render(this.scene, this.camera)
		requestAnimationFrame(this.render.bind(this))
	}
}

// ✅ すべてのテクスチャ読み込み後に Shaded を開始
Promise.all([
	loadTexture(images.bg1Url),
	loadTexture(images.bg2Url),
	loadTexture(images.bg3Url),
	loadTexture(images.bg4Url),
])
	.then(([tex1, tex2, tex3, tex4]) => {
		new Shaded(tex1, tex2, tex3, tex4)
	})
	.catch(err => {
		console.error("画像の読み込みに失敗しました:", err)
	})
