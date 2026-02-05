import { Component } from '@angular/core';

@Component({
    selector: 'app-skills',
    templateUrl: './skills.component.html',
    styleUrls: ['./skills.component.css'],
    standalone: false
})
export class SkillsComponent {
  
  skills = {
    frontend: {
      title: 'Frontend Development',
      icon: 'bx-code-alt',
      technologies: [
        { name: 'HTML5', level: 'Avanzado', icon: 'bx bxl-html5' },
        { name: 'CSS3', level: 'Avanzado', icon: 'bx bxl-css3' },
        { name: 'JavaScript', level: 'Avanzado', icon: 'bx bxl-javascript' },
        { name: 'Angular', level: 'Intermedio', icon: 'bx bxl-angular' },
        { name: 'React', level: 'Básico', icon: 'bx bxl-react' },
        { name: 'Bootstrap', level: 'Avanzado', icon: 'bx bxl-bootstrap' }
      ]
    },
    backend: {
      title: 'Backend Development',
      icon: 'bx-server',
      technologies: [
        { name: 'Python', level: 'Intermedio', icon: 'bx bxl-python' },
        { name: 'FastAPI', level: 'Intermedio', icon: 'bx bxl-python' },
        { name: 'Flask', level: 'Intermedio', icon: 'bx bxl-python' },
        { name: 'Node.js', level: 'Intermedio', icon: 'bx bxl-nodejs' },
        { name: 'C#', level: 'Básico', icon: 'bx bxl-microsoft' },
        { name: 'C++', level: 'Básico', icon: 'bx bxl-c-plus-plus' }
      ]
    },
    database: {
      title: 'Bases de Datos',
      icon: 'bx-data',
      technologies: [
        { name: 'SQL Server', level: 'Básico', icon: 'bx bxl-microsoft' },
        { name: 'MySQL', level: 'Básico', icon: 'bx bx-data' }
      ]
    },
    gameDev: {
      title: 'Game Development',
      icon: 'bx-game',
      technologies: [
        { name: 'Unreal Engine 5', level: 'Avanzado', icon: 'bx bxs-invader' },
        { name: 'Blueprints', level: 'Avanzado', icon: 'bx bxs-invader' },
        { name: 'Blender 3D', level: 'Intermedio', icon: 'bx bxl-blender' }
      ]
    },
    adobe: {
      title: 'Adobe Creative Suite',
      icon: 'bx bxl-adobe',
      technologies: [
        { name: 'Photoshop', level: 'Avanzado', icon: 'bx bxl-adobe' },
        { name: 'Adobe Illustrator', level: 'Intermedio', icon: 'bx bxl-adobe' },
        { name: 'After Effects', level: 'Intermedio', icon: 'bx bxl-adobe' },
        { name: 'Adobe XD', level: 'Avanzado', icon: 'bx bxl-adobe' }
      ]
    },
    tools: {
      title: 'Herramientas & Control de Versiones',
      icon: 'bx-cog',
      technologies: [
        { name: 'Git', level: 'Avanzado', icon: 'bx bxl-git' },
        { name: 'GitHub', level: 'Avanzado', icon: 'bx bxl-github' },
        { name: 'Figma', level: 'Intermedio', icon: 'bx bxl-figma' }
      ]
    }
  };

  getLevelClass(level: string): string {
    switch (level) {
      case 'Avanzado':
        return 'level-advanced';
      case 'Intermedio':
        return 'level-intermediate';
      case 'Básico':
        return 'level-basic';
      default:
        return 'level-basic';
    }
  }
}