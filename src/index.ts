// import gsap from 'gsap';
// import Swiper, { Pagination } from 'swiper';
// import { reviews } from './assets/js/data';

// console.log('reviews:', reviews);

// const bar = document.querySelector<HTMLElement>('.loading__bar--inner');
// const counter_num = document.querySelector<HTMLElement>(
// 	'.loading__counter--number'
// );
// let c: number = 0;

// let barInterval = setInterval(() => {
// 	if (!bar) return;
// 	if (!counter_num) return;
// 	bar.style.width = c + '%';
// 	counter_num.innerText = c + '%';
// 	c++;

// 	if (c > 100) {
// 		clearInterval(barInterval);
// 		gsap.to('.loading__bar', {
// 			duration: 5,
// 			rotate: '90deg',
// 			left: '1000%',
// 		});
// 		gsap.to('.loading__text, .loading__counter', {
// 			duration: 0.5,
// 			opacity: 0,
// 		});
// 		gsap.to('.loading__box', {
// 			duration: 1,
// 			height: '500px',
// 			borderRadius: '50%',
// 		});
// 		gsap.to('.loading__box', {
// 			delay: 2,
// 			border: 'none',
// 		});
// 		gsap.to('.loading', {
// 			delay: 2,
// 			duration: 2,
// 			zIndex: 1,
// 			background: 'transparent',
// 			opacity: 0.5,
// 		});
// 		gsap.to('.loading__svg', {
// 			duration: 10,
// 			opacity: 1,
// 			rotate: '360deg',
// 		});
// 		gsap.to('.loading__svg', {
// 			delay: 2,
// 			duration: 100,
// 			rotate: '360deg',
// 		});
// 	}
// }, 20);

// // Swiper.use([Pagination]);

// const swiper = new Swiper('.swiper', {
// 	slidesPerView: 1,
// 	spaceBetween: 30,
// 	pagination: {
// 		el: '.swiper-pagination',
// 		clickable: true,
// 	},
// });

// const swiper_container = document.querySelector('.swiper-wrapper');
// reviews.forEach(review => {
// 	const slide = document.createElement('div');
// 	console.log('review.image:', review.image);
// 	console.log('typeof:', typeof review.image);

// 	slide.className = 'swiper-slide';

// 	slide.innerHTML = `
// 		<div class="review">
// 			<div class="review__card">
// 				<div class="review__topborder"></div>
// 				<div class="review__text">
// 					<span>${review.review.substring(0, 1)}</span>${review.review.substring(1)}
// 				</div>
// 				<div class="review__profile">
// 					<span>${review.name}</span>
// 					<span>${review.position}</span>
// 				</div>
// 			</div>
// 		</div>
// 	`;

// 	const img = document.createElement('img');
// 	img.className = 'review__img';
// 	img.alt = review.name;
// 	img.src = review.image;

// 	// const img = document.createElement('img');
// 	// img.className = 'review__img';
// 	// img.alt = review.name;
// 	// img.src = (review.image as any).default;

// 	// img.src =
// 	// 	typeof review.image === 'string' ? review.image : review.image.default;
// 	console.log(img.src);
// 	slide.querySelector('.review__card')?.appendChild(img);
// 	swiper_container?.appendChild(slide);
// });

// swiper.update();
