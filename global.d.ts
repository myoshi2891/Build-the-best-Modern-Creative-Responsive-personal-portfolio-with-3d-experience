// declare module '*.png' {
// 	const src: string;

// 	export default src;
// }

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      [key: string]: string | undefined;
    }
  }
};
