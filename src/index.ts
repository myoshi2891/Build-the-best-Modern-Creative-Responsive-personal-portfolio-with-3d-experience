
import gsap from 'gsap';
import Scrollbar from 'smooth-scrollbar';
import { ProjectsRenderer } from './assets/js/components/projectsRenderer';
import { ReviewSwiper } from './assets/js/components/reviewSwiper';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing components...');
    
    // Initialize components immediately (they'll be ready when loader finishes)
    const projectsRenderer = new ProjectsRenderer('#projects-container');
    const reviewSwiper = new ReviewSwiper();
    
    // Start the loading sequence
    const bar = document.querySelector<HTMLElement>('.loading__bar--inner');
    const counter_num = document.querySelector<HTMLElement>('.loading__counter--number');
    let c: number = 0;

    let barInterval = setInterval(() => {
        if (!bar || !counter_num) return;
        
        bar.style.width = c + '%';
        counter_num.innerText = c + '%';
        c++;

        if (c > 100) {
            clearInterval(barInterval);
            
            // Animate loader out
            gsap.to('.loading__bar', {
                duration: 5,
                rotate: '90deg',
                left: '1000%',
            });
            gsap.to('.loading__text, .loading__counter', {
                duration: 0.5,
                opacity: 0,
            });
            gsap.to('.loading__box', {
                duration: 1,
                height: '500px',
                borderRadius: '50%',
            });
            gsap.to('.loading__box', {
                delay: 2,
                border: 'none',
            });
            gsap.to('.loading', {
                delay: 2,
                duration: 2,
                zIndex: 1,
                background: 'transparent',
                opacity: 0,
                onComplete: () => {
                    // Initialize content after loader is done
                    console.log('Loader animation complete, initializing content...');
                    
                    // Initialize smooth scrollbar
                    const scrollbarOptions = {
                        damping: 0.1,
                        alwaysShowTracks: true,
                        plugins: {
                            disableScroll: {
                                direction: "x",
                            },
                        },
                    };
                    const pageSmoothScroll = Scrollbar.init(document.body, scrollbarOptions);
                    if (pageSmoothScroll.track.xAxis.element) {
                        pageSmoothScroll.track.xAxis.element.remove();
                    }
                    
                    // Render projects
                    projectsRenderer.render();
                    
                    // Populate reviews
                    reviewSwiper.populateReviews();
                    
                    // Debug check
                    setTimeout(() => {
                        const swiperSlides = document.querySelectorAll('.swiper-slide');
                        console.log('Number of swiper slides found:', swiperSlides.length);
                        
                        const reviewsSection = document.querySelector('.reviews');
                        if (reviewsSection) {
                            console.log('Reviews section found and visible');
                        }
                    }, 500);
                }
            });
            gsap.to('.loading__svg', {
                duration: 10,
                opacity: 1,
                rotate: '360deg',
            });
            gsap.to('.loading__svg', {
                delay: 2,
                duration: 100,
                rotate: '360deg',
            });
        }
    }, 20);
});
