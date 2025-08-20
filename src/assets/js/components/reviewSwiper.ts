
import Swiper, { Navigation, Pagination } from "swiper"
import { reviews } from "../data"

export class ReviewSwiper {
    private swiper: Swiper
    private container: Element | null

    constructor() {
        Swiper.use([Pagination, Navigation])
        this.container = document.querySelector(".swiper-wrapper")
        this.swiper = this.initializeSwiper()
    }

    private initializeSwiper(): Swiper {
        return new Swiper(".swiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            pagination: {
                el: ".swiper-pagination",
                type: "bullets",
                clickable: true,
            },
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                },
                1480: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                },
            },
        })
    }

    populateReviews(): void {
        console.log('populateReviews called')
        console.log('Container:', this.container)
        console.log('Reviews data:', reviews)
        
        if (!this.container) {
            console.error('Swiper container not found')
            return
        }

        const reviewsHTML = reviews.map(review => this.createReviewTemplate(review)).join("")
        console.log('Generated HTML:', reviewsHTML)
        
        this.container.innerHTML = reviewsHTML
        
        // Update swiper after adding content
        this.swiper.update()
        console.log('Swiper updated')
    }

    private createReviewTemplate(review: any): string {
        return /*html*/ `
            <div class="swiper-slide">
                <div class="review">
                    <svg
                        width="33"
                        height="27"
                        viewBox="0 0 33 27"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M0 20C0 18 0 16 1 14C2 12 4 9 7 6C10 3 13 1 16 0H17C16 1 15 2 14 3C13 4 12 5 11 6C10 7 9 8 8 9C7 10 6 11 6 12C6 13 7 14 8 15C9 16 10 17 12 18C15 19 16 21 16 24C16 25 15 26 14 27C13 28 12 28 11 28C9 28 7 27 5 26C3 25 1 23 0 20ZM17 20C17 18 17 16 18 14C19 12 21 9 24 6C27 3 30 1 33 0H34C33 1 32 2 31 3C30 4 29 5 28 6C27 7 26 8 25 9C24 10 23 11 23 12C23 13 24 14 25 15C26 16 27 17 29 18C32 19 33 21 33 24C33 25 32 26 31 27C30 28 29 28 28 28C26 28 24 27 22 26C20 25 18 23 17 20Z"
                            fill="currentColor"
                        />
                    </svg>
                    <div class="review__card">
                        <div class="review__topborder"></div>
                        <div class="review__text">
                            <span>${review.review.substring(0, 1)}</span>
                            ${review.review.substring(1, review.review.length)}
                        </div>
                        <img
                            src="${review.image}"
                            alt="${review.name}"
                            class="review__img"
                        />
                        <div class="review__profile">
                            <span>${review.name}</span>
                            <span>${review.position}</span>
                        </div>
                    </div>
                </div>
            </div>
        `
    }

    getSwiper(): Swiper {
        return this.swiper
    }
}
