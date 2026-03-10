
import { ProjectsRenderer } from "./assets/js/components/projectsRenderer"
import { ReviewSwiper } from "./assets/js/components/reviewSwiper"
import { LoaderManager } from "./assets/js/components/loader"
import { initThreeBackground } from "./assets/js/threeBg"

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    // Initialize three bg if needed here, or it can be initialized in app.ts 
    // Wait, the previous index.ts did not initialize it, let's just initialize it or leave it as it was if handled in app.ts.
    // threeBg was an auto-initialized global before, so let's call it here.
    initThreeBackground()

    // Initialize components immediately
    const projectsRenderer = new ProjectsRenderer("#projects-container")
    const reviewSwiper = new ReviewSwiper()
    
    // Instead of inline loading, we use LoaderManager
    // However, App.ts also runs LoaderManager. If we keep it here, we duplicate it.
    // The instructions say "update LoaderManager ... then in src/index.ts instantiate LoaderManager and pass a callback ... finally remove the setInterval-based loader block in src/index.ts".
    
    const loader = new LoaderManager()
    loader.start(() => {
        // Render projects
        projectsRenderer.render()
        // Populate reviews
        reviewSwiper.populateReviews()
    })
})
