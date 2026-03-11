export interface Project {
  id: string | number;
  date: string;
  title: string;
  subtitle: string;
  image: string;
  githubUrl: string;
  liveUrl: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: 1,
    date: "2024",
    title: "Airbnb Clone",
    subtitle: "Real Estate App",
    image: "/projects/Airbnb.png",
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com/",
    tags: ["React", "Tailwind", "Next.js"]
  },
  {
    id: 2,
    date: "2024",
    title: "GoShop",
    subtitle: "E-commerce Platform",
    image: "/projects/GoShop.png",
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com/",
    tags: ["TypeScript", "Node.js", "Express"]
  },
  {
    id: 3,
    date: "2024",
    title: "NextStore",
    subtitle: "Modern Store",
    image: "/projects/NextStore.png",
    githubUrl: "https://github.com/",
    liveUrl: "https://example.com/",
    tags: ["Next.js", "PostgreSQL", "Prisma"]
  }
];
