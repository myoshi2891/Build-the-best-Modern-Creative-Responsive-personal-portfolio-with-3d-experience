// declare module '*.png' {
// 	const src: string;

// 	export default src;
// }

declare var process: {
	env: {
		[key: string]: string;
	};
};
