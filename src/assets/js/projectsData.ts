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
    image: "/public/projects/GoShop.png",
    githubUrl: process.env.PROJECT_1_GITHUB_URL as string,
    liveUrl: process.env.PROJECT_1_LIVE_URL as string,
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS", "MySQL + Prisma", "Zod", "PayPal", "Stripe"]
  },
  {
    id: 2,
    title: "Next Store",
    subtitle: "Eコマースアプリケーション",
    date: "April 2025",
    image: "/public/projects/NextStore.png",
    githubUrl: process.env.PROJECT_2_GITHUB_URL as string,
    liveUrl: process.env.PROJECT_2_LIVE_URL as string,
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS", "PostgreSQL + Prisma", "Zod", "Supabase", "Stripe"]
  },
  {
    id: 3,
    title: "The Wild Oasis",
    subtitle: "キャビン予約アプリケーション",
    date: "August 2024",
    image: "public/projects/wild-oasis.png",
    githubUrl: process.env.PROJECT_3_GITHUB_URL as string,
    liveUrl: process.env.PROJECT_3_LIVE_URL as string,
    tags: ["Next.js 14", "React 18", "TypeScript", "TailwindCSS", "Prisma", "Supabase"]
  },
  {
    id: 4,
    title: "The Wild Oasis 管理画面",
    subtitle: "キャビン予約管理アプリケーション",
    date: "August 2024",
    image: "public/projects/wildoasis-admin.png",
    githubUrl: process.env.PROJECT_4_GITHUB_URL as string,
    liveUrl: process.env.PROJECT_4_LIVE_URL as string,
    tags: ["React Query", "React 18", "JavaScript", "styled-components", "recharts", "Supabase", "PostgreSQL"]
  },
  {
    id: 5,
    title: "Airbnb Clone",
    subtitle: "物件レンタルプラットフォーム「Airbnb Clone アプリケーション」",
    date: "August 2024",
    image: "public/projects/Airbnb.png",
    githubUrl: process.env.PROJECT_5_GITHUB_URL as string,
    liveUrl: process.env.PROJECT_5_LIVE_URL as string,
    tags: ["Next.js 14", "React 18", "TypeScript", "TailwindCSS", "Prisma", "Supabase", "PostgreSQL", "Stripe", "Zod"]
  },
];
