import { Component } from '@angular/core';

interface Technology {
  name: string;
  color: string;
  icon: string;
  frameworks: string[];
}

interface SkillCategory {
  key: string;
  title: string;
  icon: string;
  description: string;
  technologies: Technology[];
}

interface SkillsContainer {
  backend: SkillCategory;
  database: SkillCategory;
  frontend: SkillCategory;
  gameDev: SkillCategory;
  tools: SkillCategory;
  adobe: SkillCategory;
}

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css'],
    standalone: false
})
export class SkillsComponent {
  
  skills: SkillsContainer = {
    backend: {
      key: 'backend',
      title: 'Backend & APIs',
      icon: 'bx-server',
      description: 'Sólida experiencia en la construcción de arquitecturas backend escalables. Especializado en el ecosistema C# y .NET para el desarrollo de aplicaciones robustas con un manejo preciso y seguro de datos empresariales críticos. Complemento esto con el desarrollo de APIs RESTful eficientes utilizando Python (FastAPI, Flask) y la creación de entornos flexibles mediante Node.js y Express, adaptándome a las necesidades y transformaciones tecnológicas de cada negocio.',
      technologies: [
        { name: 'C#', color: '#239120', icon: 'bx bxl-microsoft', frameworks: ['.NET', 'Entity Framework'] },
        { name: 'Python', color: '#3776AB', icon: 'bx bxl-python', frameworks: ['FastAPI', 'Flask'] },
        { name: 'Node.js', color: '#339933', icon: 'bx bxl-nodejs', frameworks: ['Express'] },
        { name: 'C++', color: '#00599C', icon: 'bx bxl-c-plus-plus', frameworks: [] }
      ]
    },
    frontend: {
      key: 'frontend',
      title: 'Frontend & UI',
      icon: 'bx-code-alt',
      description: 'Dominio avanzado del stack web fundamental para la creación de interfaces de usuario modernas y responsivas. Desarrollo Single Page Applications (SPAs) fluidas e interactivas utilizando Angular y React, integrando gestores de estado como Zustand y frameworks de diseño como Bootstrap para optimizar al máximo la experiencia del usuario (UX).',
      technologies: [
        { name: 'Angular', color: '#DD0031', icon: 'bx bxl-angular', frameworks: [] },
        { name: 'React', color: '#61DAFB', icon: 'bx bxl-react', frameworks: ['Zustand'] },
        { name: 'JavaScript', color: '#F7DF1E', icon: 'bx bxl-javascript', frameworks: [] },
        { name: 'HTML5 & CSS3', color: '#E34F26', icon: 'bx bxl-html5', frameworks: ['Bootstrap'] }
      ]
    },
    database: {
      key: 'database',
      title: 'Bases de Datos',
      icon: 'bx-data',
      description: 'Experiencia integral en el modelado, administración y optimización de bases de datos relacionales. Sólida formación académica en Oracle SQL, complementada con un uso intensivo y actual en entornos de producción con SQL Server, MySQL y PostgreSQL, garantizando la integridad y el máximo rendimiento en consultas complejas.',
      technologies: [
        { name: 'PostgreSQL', color: '#4169E1', icon: 'bx bxs-data', frameworks: [] },
        { name: 'SQL Server', color: '#CC2927', icon: 'bx bxl-microsoft', frameworks: [] },
        { name: 'MySQL', color: '#4479A1', icon: 'bx bxs-data', frameworks: [] },
        { name: 'Oracle SQL', color: '#F80000', icon: 'bx bxs-data', frameworks: [] }
      ]
    },
    gameDev: {
      key: 'gamedev',
      title: 'Desarrollo de Videojuegos',
      icon: 'bx-game',
      description: 'Especialización en la creación de experiencias interactivas y lógicas de juego utilizando Unreal Engine 5. Sólido manejo de programación visual con Blueprints y scripting avanzado en C++. Actualmente en proceso de expansión de habilidades en arte técnico, siguiendo un roadmap estructurado para la integración y modelado 3D con Blender.',
      technologies: [
        { name: 'Unreal Engine 5', color: '#DFE3E6', icon: 'bx bxs-invader', frameworks: ['Blueprints', 'C++'] },
        { name: 'Blender 3D', color: '#E87D0D', icon: 'bx bxl-blender', frameworks: [] }
      ]
    },
    tools: {
      key: 'tools',
      title: 'Herramientas & Control de Versiones',
      icon: 'bx-cog',
      description: 'Dominio avanzado en sistemas de control de versiones, flujos de trabajo colaborativos (Git/GitHub) y gestión de despliegues. Experiencia en el mantenimiento, actualización y orquestación de entornos de desarrollo para asegurar un ciclo de vida del software eficiente, ordenado y sin interrupciones.',
      technologies: [
        { name: 'Git & GitHub', color: '#F05032', icon: 'bx bxl-github', frameworks: [] },
        { name: 'Figma', color: '#F24E1E', icon: 'bx bxl-figma', frameworks: [] }
      ]
    },
    adobe: {
      key: 'design',
      title: 'Diseño & Arte Digital',
      icon: 'bx bxl-adobe',
      description: 'Conocimientos sólidos en la suite de Adobe y Figma para la conceptualización visual. Capacidad para diseñar wireframes, maquetar mockups de alta fidelidad y prototipar experiencias de usuario (UI/UX) previas a la fase de desarrollo, asegurando la alineación visual con los requerimientos del producto.',
      technologies: [
        { name: 'Adobe Suite', color: '#FF0000', icon: 'bx bxl-adobe', frameworks: ['Photoshop', 'Illustrator', 'After Effects', 'Adobe XD'] }
      ]
    }
  };
}