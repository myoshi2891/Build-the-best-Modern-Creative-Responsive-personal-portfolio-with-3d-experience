
import gsap from "gsap"
import imagesLoaded from "imagesloaded"
import Scrollbar from "smooth-scrollbar"

export class LoaderManager {
    private bar: HTMLElement | null
    private counterNum: HTMLElement | null
    private counter: number = 0
    private barInterval: ReturnType<typeof setInterval> | null = null
    private completeCallback?: () => void

    constructor() {
        this.bar = document.querySelector<HTMLElement>(".loading__bar--inner")
        this.counterNum = document.querySelector<HTMLElement>(".loading__counter--number")
    }

    start(onComplete?: () => void): void {
        this.completeCallback = onComplete
        if (this.barInterval) {
            clearInterval(this.barInterval)
        }
        this.barInterval = setInterval(() => {
            this.updateProgress()
        }, 20)
    }

    private updateProgress(): void {
        if (!this.bar || !this.counterNum) {
            if (this.barInterval) {
                clearInterval(this.barInterval)
            }
            console.warn("Loading elements not found")
            this.completeLoading()
            return
        }
        this.bar.style.width = this.counter + "%"
        this.counterNum.innerText = this.counter + "%"
        this.counter++

        if (this.counter > 100) {
            this.completeLoading()
        }
    }

    private completeLoading(): void {
        if (this.barInterval) {
            clearInterval(this.barInterval)
        }

        this.animateLoadingElements()
        this.waitForImages()
    }

    private animateLoadingElements(): void {
        gsap.to(".loading__bar", {
            duration: 5,
            rotate: "90deg",
            left: "1000%",
        })
        gsap.to(".loading__text, .loading__counter", {
            duration: 0.5,
            opacity: 0,
        })
        gsap.to(".loading__box", {
            duration: 1,
            height: "500px",
            borderRadius: "50%",
        })
        gsap.to(".loading__box", {
            delay: 2,
            border: "none",
        })
    }

    private waitForImages(): void {
        const imgLoad = imagesLoaded(document.querySelectorAll("img"))

        imgLoad.on("done", () => {
            this.animatePageElements()
            this.initializeScrollbar().then(() => {
                if (this.completeCallback) this.completeCallback()
            })
        })

        imgLoad.on("fail", () => {
            console.warn("Some images failed to load")
            this.animatePageElements()
            this.initializeScrollbar().then(() => {
                if (this.completeCallback) this.completeCallback()
            })
        })
    }

    private animatePageElements(): void {
        gsap.to(".loading", {
            delay: 2,
            duration: 2,
            zIndex: 1,
            background: "transparent",
            opacity: 0.5,
        })
        gsap.to(".loading__svg", {
            duration: 10,
            opacity: 1,
            rotate: "360deg",
            repeat: -1,
            ease: "linear",
            overwrite: "auto",
        })
        gsap.to("header", {
            duration: 1,
            delay: 2,
            top: "0",
        })
        gsap.to(".socials", {
            duration: 1,
            delay: 2.5,
            bottom: "10rem",
        })
        gsap.to(".scrollDown", {
            duration: 1,
            delay: 3,
            bottom: "2rem",
        })
    }

    private initializeScrollbar(): Promise<void> {
        return new Promise((resolve) => {
            setTimeout(() => {
                const options = {
                    damping: 0.1,
                    alwaysShowTracks: true,
                    plugins: {
                        disableScroll: {
                            direction: "x",
                        },
                    },
                }
                const pageSmoothScroll = Scrollbar.init(document.body, options)
                if (pageSmoothScroll.track?.xAxis?.element) {
                    pageSmoothScroll.track.xAxis.element.remove()
                }
                resolve()
            }, 2000)
        })
    }
}
