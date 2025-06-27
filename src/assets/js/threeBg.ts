import * as THREE from 'three';
const images = {
	bg1Url: '/public/wallpapers/91.jpg',
	bg2Url: '/public/wallpapers/153.jpg',
	bg3Url: '/public/wallpapers/179.jpg',
	bg4Url: '/public/wallpapers/193.jpg',
	bg5Url: '/public/wallpapers/202.jpg',
};
// シーン、カメラ、レンダラーの初期化
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
	70,
	window.innerWidth / window.innerHeight,
	0.1,
	1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

// DOM にレンダラーを追加
const container = document.querySelector('.three_bg');
if (container) {
	container.appendChild(renderer.domElement);
} else {
	console.error("Element with class 'three_bg' not found.");
}

// responsive
window.addEventListener('resize', () => {
	const width = window.innerWidth;
	const height = window.innerHeight;
	camera.aspect = width / height;
	camera.updateProjectionMatrix();
	renderer.setSize(width, height);
});

// テクスチャローダーを使って画像を読み込み
const loader = new THREE.TextureLoader();
loader.load(
	images.bg1Url,
	texture => {
		const geometry = new THREE.PlaneGeometry(18, 10);
		const material = new THREE.MeshBasicMaterial({ map: texture });
		const mesh = new THREE.Mesh(geometry, material);
		scene.add(mesh);
		animate();
	},
	undefined,
	error => {
		console.error('画像の読み込みに失敗しました:', error);
	}
);

// アニメーションループ
function animate() {
	requestAnimationFrame(animate);
	renderer.render(scene, camera);
}
