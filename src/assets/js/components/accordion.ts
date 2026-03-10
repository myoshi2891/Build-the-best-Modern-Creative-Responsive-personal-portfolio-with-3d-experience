
export class AccordionManager {
    private questions: HTMLElement[]

    constructor() {
        this.questions = Array.from(document.querySelectorAll<HTMLElement>(".question"))
        this.initializeEventListeners()
    }

    private initializeEventListeners(): void {
        this.questions.forEach(question => {
            const questionText = question.querySelector<HTMLElement>("h3")
            if (questionText) {
                questionText.setAttribute("tabindex", "0")
                questionText.setAttribute("role", "button")
                questionText.addEventListener("click", () => this.toggleQuestion(question))
                questionText.addEventListener("keydown", e => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        this.toggleQuestion(question)
                    }
                })
            }
        })
    }

    private toggleQuestion(activeQuestion: HTMLElement): void {
        // Close all other questions
        this.questions
            .filter(q => q !== activeQuestion)
            .forEach(q => q.classList.remove("open"))

        // Toggle the clicked question
        activeQuestion.classList.toggle("open")
    }
}
