
import { projects } from '../projectsData';
import type { Project } from '../projectsData';

export class ProjectsRenderer {
  private container: HTMLElement | null;

  constructor(containerSelector: string) {
    this.container = document.querySelector(containerSelector);
  }

  private createProjectHTML(project: Project, totalProjects: number): string {
    const tagsHTML = project.tags.map(tag => `
      <a href="#" title="${tag}" class="coolFunnyLink">
        <span>${tag}</span>
        <svg width="100%" height="9" viewBox="0 0 101 9">
          <path d="M.426 1.973C4.144 1.567 17.77-.514 21.443 1.48 24.296 3.026 24.844 4.627 27.5 7c3.075 2.748 6.642-4.141 10.066-4.688 7.517-1.2 13.237 5.425 17.59 2.745C58.5 3 60.464-1.786 66 2c1.996 1.365 3.174 3.737 5.286 4.41 5.423 1.727 25.34-7.981 29.14-1.294" fill="none" stroke="black" stroke-width="1" />
        </svg>
      </a>
    `).join('');

    return `
      <div class="project">
        <div class="project__header">
          <span>${project.id}/${totalProjects}</span>
          <span>${project.date}</span>
        </div>
        <div class="project__infos">
          <h1 class="project__infos--name">
            ${project.title} <span>${project.subtitle}</span>
          </h1>
        </div>
        <div class="project__img">
          <img src="${project.image}" alt="${project.title}" />
          <div class="project__links">
            <a href="${project.githubUrl}" title="${project.title}" target="_blank" rel="noopener noreferrer">
              <button class="coolButton">
                <span>Github</span>
              </button>
            </a>
            <a href="${project.liveUrl}" title="${project.title}" target="_blank" rel="noopener noreferrer" class="coolCircleEyeButton">
              <svg class="textcircle" viewBox="0 0 500 500">
                <defs>
                  <path id="textcircle-${project.id}" d="M250,400 a150,150 0 0,1 0,-300a150,150 0 0,1 0,300Z" />
                </defs>
                <text>
                  <textPath xlink:href="#textcircle-${project.id}" aria-label=".Click to see the live version." textLength="900">
                    Click to see the live version.
                  </textPath>
                </text>
              </svg>
              <svg class="eye" aria-hidden="true" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
                <path class="eye__outer" d="M10.5 35.308c5.227-7.98 14.248-13.252 24.5-13.252s19.273 5.271 24.5 13.252c-5.227 7.98-14.248 13.253-24.5 13.253s-19.273-5.272-24.5-13.253z" />
                <path class="eye__lashes-up" d="M35 8.802v8.836M49.537 11.383l-3.31 8.192M20.522 11.684l3.31 8.192" />
                <path class="eye__lashes-down" d="M35 61.818v-8.836 8.836zM49.537 59.237l-3.31-8.193 3.31 8.193zM20.522 58.936l3.31-8.193-3.31 8.193z" />
                <circle class="eye__iris" cx="35" cy="35.31" r="5.221" />
                <circle class="eye__inner" cx="35" cy="35.31" r="10.041" />
              </svg>
            </a>
          </div>
          <div class="project__tags">
            ${tagsHTML}
          </div>
        </div>
      </div>
    `;
  }

  public render(): void {
    if (!this.container) {
      console.error('Projects container not found');
      return;
    }

    const projectsHTML = projects.map(project => 
      this.createProjectHTML(project, projects.length)
    ).join('');

    this.container.innerHTML = `
      <h1 class="projects__header">Some of my work</h1>
      ${projectsHTML}
    `;
  }

  public addProject(project: Project): void {
    projects.push(project);
    this.render();
  }

  public getProjects(): Project[] {
    return projects;
  }
}
