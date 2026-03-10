
export class AccordionManager {
    private questions: HTMLElement[]

    constructor() {
        this.questions = Array.from(document.querySelectorAll<HTMLElement>(".question"))
        this.initializeEventListeners()
    }

    private initializeEventListeners(): void {
        this.questions.forEach((question, index) => {
            const questionText = question.querySelector<HTMLElement>("h3")
            const answer = question.querySelector<HTMLElement>(".question__answer")
            if (questionText && answer) {
                const answerId = `faq-answer-${index}`
                answer.setAttribute("id", answerId)
                
                questionText.setAttribute("tabindex", "0")
                questionText.setAttribute("role", "button")
                questionText.setAttribute("aria-expanded", "false")
                questionText.setAttribute("aria-controls", answerId)
                
                answer.setAttribute("aria-hidden", "true")

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
            .forEach(q => {
                q.classList.remove("open")
                const qText = q.querySelector("h3")
                const qAnswer = q.querySelector(".question__answer")
                if (qText) qText.setAttribute("aria-expanded", "false")
                if (qAnswer) qAnswer.setAttribute("aria-hidden", "true")
            })

        // Toggle the clicked question
        const isOpen = activeQuestion.classList.toggle("open")
        const activeText = activeQuestion.querySelector("h3")
        const activeAnswer = activeQuestion.querySelector(".question__answer")
        
        if (activeText) activeText.setAttribute("aria-expanded", isOpen.toString())
        if (activeAnswer) activeAnswer.setAttribute("aria-hidden", (!isOpen).toString())
    }
}
