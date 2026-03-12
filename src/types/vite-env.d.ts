/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly PROJECT_1_GITHUB_URL: string | undefined;
	readonly PROJECT_1_LIVE_URL: string | undefined;
	readonly PROJECT_2_GITHUB_URL: string | undefined;
	readonly PROJECT_2_LIVE_URL: string | undefined;
	readonly PROJECT_3_GITHUB_URL: string | undefined;
	readonly PROJECT_3_LIVE_URL: string | undefined;
	readonly PROJECT_4_GITHUB_URL: string | undefined;
	readonly PROJECT_4_LIVE_URL: string | undefined;
	readonly PROJECT_5_GITHUB_URL: string | undefined;
	readonly PROJECT_5_LIVE_URL: string | undefined;
}

interface ImportMeta {
	readonly env: ImportMetaEnv;
}
