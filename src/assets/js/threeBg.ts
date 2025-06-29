import * as THREE from "three"

const images = {
	bg1Url: "./public/wallpapers/193.jpg", // public/ はルートから参照されるため不要
}

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
	70,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
)
camera.position.z = 5

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setSize(window.innerWidth, window.innerHeight)

const container = document.querySelector(".three_bg")
if (container) {
	container.appendChild(renderer.domElement)
} else {
	console.error("Element with class 'three_bg' not found.")
}

window.addEventListener("resize", () => {
	const width = window.innerWidth
	const height = window.innerHeight
	camera.aspect = width / height
	camera.updateProjectionMatrix()
	renderer.setSize(width, height)
})

let geometry: THREE.PlaneGeometry | null = null
let mesh: THREE.Mesh | null = null

const loader = new THREE.TextureLoader()
loader.load(
	images.bg1Url,
	texture => {
		geometry = new THREE.PlaneGeometry(5, 5, 15, 9)
		const material = new THREE.MeshBasicMaterial({
			map: texture,
			// wireframe: true,
		})

		mesh = new THREE.Mesh(geometry, material)
		scene.add(mesh)
	},
	undefined,
	error => {
		console.error("画像の読み込みに失敗しました:", error)
	}
)

const clock = new THREE.Clock()

function animate() {
	requestAnimationFrame(animate)

	const time = clock.getElapsedTime()

	if (geometry && geometry.attributes.position) {
		const pos = geometry.attributes.position
		const count = pos.count

		for (let i = 0; i < count; i++) {
			const x = pos.getX(i)
			const y = pos.getY(i)

			pos.setZ(i, -y * time * 2)
		}

		pos.needsUpdate = true
	}

	renderer.render(scene, camera)
}

animate()
