
interface ImageConfig {
    src: string
    alt: string
    className: string
    container: string
}

export class ImageManager {
    private static readonly IMAGES = {
        sergioImg: new URL("../../../../public/people/sergio.jpg", import.meta.url).toString(),
        craigImg: new URL("../../../../public/people/craig.jpg", import.meta.url).toString(),
    }

    static createAndAppendImage(config: ImageConfig): void {
        console.log("ImageManager creating image with URL:", config.src);
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
        console.log("ImageManager initialized. IMAGES:", this.IMAGES);
        const imageConfigs: ImageConfig[] = [
            {
                src: this.IMAGES.sergioImg,
                alt: "Instructor Sergio",
                className: "instructor__img",
                container: ".instructor__infos"
            },
            {
                src: this.IMAGES.craigImg,
                alt: "Contact person Craig",
                className: "instructor__img",
                container: ".contact__profile-item"
            }
        ]

        imageConfigs.forEach(config => this.createAndAppendImage(config))
    }
}
