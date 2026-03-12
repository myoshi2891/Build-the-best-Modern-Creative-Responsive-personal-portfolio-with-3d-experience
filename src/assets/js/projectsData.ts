/**
 * Project Data Configuration
 * 
 * Note: Personal information and live/github URLs are managed via environment variables (.env).
 * This structure is safe to commit to version control as no sensitive data is hardcoded.
 */
export interface Project {
  id: number;
  title: string;
  subtitle: string;
  date: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: "Multi-Vendor-E-Commerce",
    subtitle: "Eコマースアプリケーション",
    date: "August 2025",
    image: "/projects/GoShop.png",
    githubUrl: import.meta.env.PROJECT_1_GITHUB_URL || "",
    liveUrl: import.meta.env.PROJECT_1_LIVE_URL || "",
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS", "MySQL + Prisma", "Zod", "PayPal", "Stripe"]
  },
  {
    id: 2,
    title: "Next Store",
    subtitle: "Eコマースアプリケーション",
    date: "April 2025",
    image: "/projects/NextStore.png",
    githubUrl: import.meta.env.PROJECT_2_GITHUB_URL || "",
    liveUrl: import.meta.env.PROJECT_2_LIVE_URL || "",
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS", "PostgreSQL + Prisma", "Zod", "Supabase", "Stripe"]
  },
  {
    id: 3,
    title: "The Wild Oasis",
    subtitle: "キャビン予約アプリケーション",
    date: "August 2024",
    image: "/projects/wild-oasis.png",
    githubUrl: import.meta.env.PROJECT_3_GITHUB_URL || "",
    liveUrl: import.meta.env.PROJECT_3_LIVE_URL || "",
    tags: ["Next.js 14", "React 18", "TypeScript", "TailwindCSS", "Prisma", "Supabase"]
  },
  {
    id: 4,
    title: "The Wild Oasis 管理画面",
    subtitle: "キャビン予約管理アプリケーション",
    date: "August 2024",
    image: "/projects/wildoasis-admin.png",
    githubUrl: import.meta.env.PROJECT_4_GITHUB_URL || "",
    liveUrl: import.meta.env.PROJECT_4_LIVE_URL || "",
    tags: ["React Query", "React 18", "JavaScript", "styled-components", "recharts", "Supabase", "PostgreSQL"]
  },
  {
    id: 5,
    title: "Airbnb Clone",
    subtitle: "物件レンタルプラットフォーム「Airbnb Clone アプリケーション」",
    date: "August 2024",
    image: "/projects/Airbnb.png",
    githubUrl: import.meta.env.PROJECT_5_GITHUB_URL || "",
    liveUrl: import.meta.env.PROJECT_5_LIVE_URL || "",
    tags: ["Next.js 14", "React 18", "TypeScript", "TailwindCSS", "Prisma", "Supabase", "PostgreSQL", "Stripe", "Zod"]
  },
];
