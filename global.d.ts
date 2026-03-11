// declare module '*.png' {
// 	const src: string;

// 	export default src;
// }

export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            [key: string]: string | undefined
        }
    }
}
