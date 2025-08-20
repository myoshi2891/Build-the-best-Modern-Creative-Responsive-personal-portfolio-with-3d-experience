import Scrollbar from "smooth-scrollbar"
import { DisableScrollPlugin, AnchorPlugin } from "./plugins/scrollbarPlugins"
import { LoaderManager } from "./components/loader"
import { ReviewSwiper } from "./components/reviewSwiper"
import { AccordionManager } from "./components/accordion"
import { ImageManager } from "./components/imageManager"
import { DOMUtils } from "./utils/domUtils"

export class App {
    private loaderManager!: LoaderManager  // Using definite assignment assertion
    private reviewSwiper!: ReviewSwiper    // Using definite assignment assertion
    private accordionManager!: AccordionManager  // Using definite assignment assertion

    constructor() {
        this.initializePlugins()
        this.initializeComponents()
        this.initializeUtilities()
        this.startApp()
    }

    private initializePlugins(): void {
        Scrollbar.use(DisableScrollPlugin)
        Scrollbar.use(AnchorPlugin)
    }

    private initializeComponents(): void {
        this.loaderManager = new LoaderManager()
        this.reviewSwiper = new ReviewSwiper()
        this.accordionManager = new AccordionManager()
    }

    private initializeUtilities(): void {
        DOMUtils.updateCurrentYear()
        ImageManager.initializeImages()
    }

    private startApp(): void {
        this.loaderManager.start()
        this.reviewSwiper.populateReviews()
    }

    // Optional: Add methods to access components if needed later
    public getLoader(): LoaderManager {
        return this.loaderManager
    }

    public getSwiper(): ReviewSwiper {
        return this.reviewSwiper
    }

    public getAccordion(): AccordionManager {
        return this.accordionManager
    }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
    new App()
})