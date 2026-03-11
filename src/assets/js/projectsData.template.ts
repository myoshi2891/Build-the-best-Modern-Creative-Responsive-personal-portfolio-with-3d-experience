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
    date: "YYYY",
    title: "Project Template",
    subtitle: "Subtitle",
    image: "/projects/placeholder.png",
    githubUrl: "https://github.com/...",
    liveUrl: "https://example.com/...",
    tags: ["Tech1", "Tech2"]
  }
];
