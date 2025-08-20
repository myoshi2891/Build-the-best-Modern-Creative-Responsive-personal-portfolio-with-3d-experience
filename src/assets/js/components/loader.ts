
import gsap from "gsap"
import imagesLoaded from "imagesloaded"
import Scrollbar from "smooth-scrollbar"

export class LoaderManager {
    private bar: HTMLElement | null
    private counterNum: HTMLElement | null
    private counter: number = 0
    private barInterval: NodeJS.Timeout | null = null

    constructor() {
        this.bar = document.querySelector<HTMLElement>(".loading__bar--inner")
        this.counterNum = document.querySelector<HTMLElement>(".loading__counter--number")
    }

    start(): void {
        this.barInterval = setInterval(() => {
            this.updateProgress()
        }, 20)
    }

    private updateProgress(): void {
        if (!this.bar || !this.counterNum) return

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
            this.initializeScrollbar()
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
        })
        gsap.to(".loading__svg", {
            delay: 2,
            duration: 100,
            rotate: "360deg",
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

    private initializeScrollbar(): void {
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
            pageSmoothScroll.track.xAxis.element.remove()
        }, 2000)
    }
}
