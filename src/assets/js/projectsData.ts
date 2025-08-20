
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
    title: "Next Store",
    subtitle: "Eコマースアプリケーション",
    date: "April 2025",
    image: "/public/projects/NextStore.png",
    githubUrl: "https://github.com/myoshi2891/Next-Store",
    liveUrl: "https://nextstore-sable-pi.vercel.app/",
    tags: ["Next.js", "React", "TypeScript", "TailwindCSS", "PostgreSQL + Prisma", "Zod", "Supabase", "Stripe"]
  },
  {
    id: 2,
    title: "The Wild Oasis",
    subtitle: "キャビン予約アプリケーション",
    date: "August 2024",
    image: "public/projects/wild-oasis.png",
    githubUrl: "https://github.com/myoshi2891/MasterModernReact_NextJs",
    liveUrl: "https://thewildoasisnextdemo-myoshizumis-projects.vercel.app/",
    tags: ["Next.js 14", "React 18", "TypeScript", "TailwindCSS", "Prisma", "Supabase"]
  },
];
