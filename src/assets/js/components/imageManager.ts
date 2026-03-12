
interface ImageConfig {
    src: string
    alt: string
    className: string
    container: string
}

export class ImageManager {
    private static readonly DEBUG = false;
    private static readonly images = {
        sergioImg: "/people/sergio.jpg",
        craigImg: "/people/craig.jpg",
    } as const

    static createAndAppendImage(config: ImageConfig): void {
        if (this.DEBUG) {
            console.log("ImageManager creating image with URL:", config.src);
        }
        const img = document.createElement("img")
        img.src = config.src
        img.alt = config.alt
        img.className = config.className

        const container = document.querySelector(config.container)
        if (container) {
            container.appendChild(img)
        } else {
            console.error(`Element matching selector '${config.container}' not found.`)
        }
    }

    static initializeImages(): void {
        if (this.DEBUG) {
            console.log("ImageManager initialized. images:", this.images);
        }
        const imageConfigs: ImageConfig[] = [
            {
                src: this.images.sergioImg,
                alt: "Instructor Sergio",
                className: "instructor__img",
                container: ".instructor__infos"
            },
            {
                src: this.images.craigImg,
                alt: "Contact person Craig",
                className: "instructor__img",
                container: ".contact__profile-item"
            }
        ]

        imageConfigs.forEach(config => this.createAndAppendImage(config))
    }
}
