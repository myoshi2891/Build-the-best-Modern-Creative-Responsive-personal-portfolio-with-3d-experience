import * as THREE from "three";
const images = {
	bg1Url: "./public/avatars/11.png",
	bg2Url: "./public/avatars/10.png",
	bg3Url: "./public/avatars/9.png",
	bg4Url: "./public/avatars/8.png",
}

interface ShadedConfig {
	container: HTMLElement | null
	links: HTMLElement[]
	scene: THREE.Scene
	perspective: number
	sizes: THREE.Vector2
	offset: THREE.Vector2
	uniforms: {
		uTexture: { value: THREE.Texture }
		uAlpha: { value: number }
		uOffset: { value: THREE.Vector2 }
		transparent: boolean
	}
}

const loader = new THREE.TextureLoader();
const texture1 = loader.load(images.bg1Url)
const texture2 = loader.load(images.bg2Url)
const texture3 = loader.load(images.bg3Url)
const texture4 = loader.load(images.bg4Url)

class Shaded implements ShadedConfig {
    container: HTMLElement | null;
    links: HTMLElement[];
    scene: THREE.Scene;
    perspective: number;
    sizes: THREE.Vector2;
    offset: THREE.Vector2;
	uniforms: {
		uTexture: { value: THREE.Texture },
		uAlpha: { value: number },
		uOffset: { value: THREE.Vector2 },
		transparent: boolean
	};

    constructor() {
        this.container = document.querySelector(".landing");
        this.links = Array.from(
            document.querySelectorAll<HTMLElement>(".shadedimg")
        )
        this.scene = new THREE.Scene();
        this.perspective = 1000;
        this.sizes = new THREE.Vector2(0, 0);
        this.offset = new THREE.Vector2(0, 0);
        this.uniforms = {
			uTexture: { value: texture1 },
			uAlpha: { value: 0 },
			uOffset: { value: new THREE.Vector2(0, 0) },
			transparent: true
        }
    }
}

new Shaded()