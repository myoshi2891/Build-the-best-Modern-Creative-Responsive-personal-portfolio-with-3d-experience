// types/imagesloaded/index.d.ts
declare module "imagesloaded" {
	interface ImagesLoadedOptions {
		background?: boolean | string
	}

	interface ImagesLoaded {
		on(
			event: "always" | "done" | "fail" | "progress",
			callback: (instance: ImagesLoaded, image?: any) => void
		): this
	}

	interface ImagesLoadedConstructor {
		(
			elem: Element | Element[] | NodeList,
			options?: ImagesLoadedOptions,
			callback?: () => void
		): ImagesLoaded
		new (
			elem: Element | Element[] | NodeList,
			options?: ImagesLoadedOptions,
			callback?: () => void
		): ImagesLoaded
	}

	const imagesLoaded: ImagesLoadedConstructor

	export default imagesLoaded
}
