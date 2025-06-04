const bar = document.querySelector<HTMLElement>('.loading__bar--inner');
const counter_num = document.querySelector<HTMLElement>(
	'.loading__counter--number'
);
let c: number = 0;

let barInterval = setInterval(() => {
	if (!bar) return;
	if (!counter_num) return;
	bar.style.width = c + '%';
	counter_num.innerText = c + '%';
	c++;

	if (c > 100) {
		clearInterval(barInterval);
	}
}, 20);
