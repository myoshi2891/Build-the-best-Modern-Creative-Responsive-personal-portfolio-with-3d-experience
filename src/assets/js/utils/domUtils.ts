
export class DOMUtils {
    static updateCurrentYear(): void {
        const update = (): void => {
            const yearElement = document.getElementById("year")
            if (yearElement) {
                yearElement.textContent = new Date().getFullYear().toString()
            }
        }

        if (document.readyState === "loading") {
            document.addEventListener("DOMContentLoaded", update, { once: true })
        } else {
            update()
        }
    }
}
