
import { ProjectsRenderer } from "./assets/js/components/projectsRenderer"
import { ReviewSwiper } from "./assets/js/components/reviewSwiper"
import { LoaderManager } from "./assets/js/components/loader"
import { initThreeBackground, ThreeBackground } from "./assets/js/threeBg"

let threeBackground: ThreeBackground | null = null

function initializeBackground() {
    if (threeBackground) {
        threeBackground.dispose()
    }
    threeBackground = initThreeBackground()
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    initializeBackground()

    // Handle lifecycle for Three.js cleanup
    document.addEventListener("visibilitychange", () => {
        if (document.visibilityState === "hidden") {
            if (threeBackground) {
                threeBackground.dispose()
                threeBackground = null
            }
        } else if (document.visibilityState === "visible") {
            if (!threeBackground) {
                initializeBackground()
            }
        }
    })

    window.addEventListener("unload", () => {
        if (threeBackground) {
            threeBackground.dispose()
            threeBackground = null
        }
    })

    // Initialize components immediately
    const projectsRenderer = new ProjectsRenderer("#projects-container")
    const reviewSwiper = new ReviewSwiper()
    
    const loader = new LoaderManager()
    loader.start(() => {
        // Render projects
        projectsRenderer.render()
        // Populate reviews
        reviewSwiper.populateReviews()
    })
})
