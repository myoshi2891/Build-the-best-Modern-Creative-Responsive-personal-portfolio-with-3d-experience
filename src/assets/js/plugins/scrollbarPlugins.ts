
import { ScrollbarPlugin } from "smooth-scrollbar"

export class DisableScrollPlugin extends ScrollbarPlugin {
    static override pluginName = "disableScroll"

    static override defaultOptions = {
        direction: "", // 'x' または 'y' を指定可能
    }

    override transformDelta(delta: { x: number; y: number }) {
        if (this.options.direction) {
            delta[this.options.direction as "x" | "y"] = 0
        }

        return { ...delta }
    }
}

export class AnchorPlugin extends ScrollbarPlugin {
    static override pluginName = "anchor"

    onHashChange = () => {
        this.jumpToHash(window.location.hash)
    }

    onClick = (event: MouseEvent) => {
        if (!(event.target instanceof Element)) {
            return
        }
        const target = event.target.closest("a")

        if (!target) {
            return
        }

        const hash = target.getAttribute("href")

        if (!hash || hash.charAt(0) !== "#") {
            return
        }

        this.jumpToHash(hash)
    }

    jumpToHash(hash: string) {
        const { scrollbar } = this

        if (!hash) return

        scrollbar.containerEl.scrollTop = 0

        // Use getElementById for safer ID lookup, slice(1) to remove '#'
        let decodedHash = hash.slice(1)
        try {
            decodedHash = decodeURIComponent(decodedHash)
        } catch {
            // fallback to original hash.slice(1)
        }
        
        const targetEl = document.getElementById(decodedHash)
        if (targetEl) {
            scrollbar.scrollIntoView(targetEl as HTMLElement)
        }
    }

    override onInit() {
        this.jumpToHash(window.location.hash)

        window.addEventListener("hashchange", this.onHashChange)
        this.scrollbar.contentEl.addEventListener("click", this.onClick)
    }

    override onDestroy() {
        window.removeEventListener("hashchange", this.onHashChange)
        this.scrollbar.contentEl.removeEventListener("click", this.onClick)
    }
}
