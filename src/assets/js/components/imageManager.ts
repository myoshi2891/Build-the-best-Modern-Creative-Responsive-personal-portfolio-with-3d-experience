
interface ImageConfig {
    src: string
    alt: string
    className: string
    container: string
}

export class ImageManager {
    private static readonly IMAGES = {
        sergioImg: "/public/people/sergio.jpg",
        craigImg: "/public/people/craig.jpg",
    }

    static createAndAppendImage(config: ImageConfig): void {
        const img = document.createElement("img")
        img.src = config.src
        img.alt = config.alt
        img.className = config.className

        const container = document.querySelector(config.container)
        if (container) {
            container.appendChild(img)
        } else {
            console.error(`Element with class '${config.container}' not found.`)
        }
    }

    static initializeImages(): void {
        const imageConfigs: ImageConfig[] = [
            {
                src: this.IMAGES.sergioImg,
                alt: "sergio",
                className: "instructor__img",
                container: ".instructor__infos"
            },
            {
                src: this.IMAGES.craigImg,
                alt: "craig",
                className: "instructor__img",
                container: ".contact__profile-item"
            }
        ]

        imageConfigs.forEach(config => this.createAndAppendImage(config))
    }
}
