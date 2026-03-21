/**
 * Project Data Configuration
 *
 * Note: Personal information and live/github URLs are managed via environment variables (.env).
 * This structure is safe to commit to version control as no sensitive data is hardcoded.
 */
export interface Project {
	id: number
	title: string
	subtitle: string
	date: string
	image: string
	githubUrl: string | null
	liveUrl: string | null
	tags: string[]
}

export const projects: Project[] = [
	{
		id: 1,
		title: "Multi-Vendor-E-Commerce",
		subtitle: "Eコマースアプリケーション",
		date: "August 2025",
		image: "/projects/GoShop.png",
		githubUrl: import.meta.env.PROJECT_1_GITHUB_URL || null,
		liveUrl: import.meta.env.PROJECT_1_LIVE_URL || null,
		tags: [
			"Next.js",
			"React",
			"TypeScript",
			"TailwindCSS",
			"MySQL + Prisma",
			"Zod",
			"PayPal",
			"Stripe",
		],
	},
	{
		id: 2,
		title: "Next Store",
		subtitle: "Eコマースアプリケーション",
		date: "April 2025",
		image: "/projects/NextStore.png",
		githubUrl: import.meta.env.PROJECT_2_GITHUB_URL || null,
		liveUrl: import.meta.env.PROJECT_2_LIVE_URL || null,
		tags: [
			"Next.js",
			"React",
			"TypeScript",
			"TailwindCSS",
			"PostgreSQL + Prisma",
			"Zod",
			"Supabase",
			"Stripe",
		],
	},
	{
		id: 3,
		title: "The Wild Oasis",
		subtitle: "キャビン予約アプリケーション",
		date: "August 2024",
		image: "/projects/wild-oasis.png",
		githubUrl: import.meta.env.PROJECT_3_GITHUB_URL || null,
		liveUrl: import.meta.env.PROJECT_3_LIVE_URL || null,
		tags: [
			"Next.js 14",
			"React 18",
			"TypeScript",
			"TailwindCSS",
			"Supabase",
			"NextAuth.js",
		],
	},
	{
		id: 4,
		title: "Hope",
		subtitle: "3D インタラクティブ体験",
		date: "March 2026",
		image: "/projects/hope.png",
		githubUrl: import.meta.env.PROJECT_4_GITHUB_URL || null,
		liveUrl: import.meta.env.PROJECT_4_LIVE_URL || null,
		tags: ["Three.js", "React Three Fiber", "GSAP", "TypeScript"],
	},
	{
		id: 5,
		title: "LLM Comparison Tool",
		subtitle: "AI料金比較ツール",
		date: "March 2026",
		image: "/projects/llm-comparison.png",
		githubUrl: import.meta.env.PROJECT_5_GITHUB_URL || null,
		liveUrl: import.meta.env.PROJECT_5_LIVE_URL || null,
		tags: ["HTML", "CSS", "JavaScript", "LLM", "Netlify"],
	},
]
