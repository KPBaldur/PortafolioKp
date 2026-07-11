import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { Project, CategoryId, ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  standalone: false
})
export class PortfolioComponent implements OnInit {
  @ViewChild('carouselSection') carouselSection!: ElementRef<HTMLDivElement>;

  // Modal properties
  isModalOpen = false;
  selectedProjectForModal: Project | null = null;

  // Categorías visibles en tabs
  categories: { id: CategoryId; label: string }[] = [
    { id: 'web', label: '🌐 Web & Software' },
    { id: 'games', label: '🎮 Videojuegos' },
  ];

  // Estado UI
  selectedCategory: CategoryId = 'web';
  projects: Project[] = [];
  selectedProject: Project | null = null;

  currentImage = 0;
  lastDirection: 'left' | 'right' | 'fade' = 'fade'; // para animaciones CSS existentes

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.projects = this.projectsService.getProjects(this.selectedCategory);
    this.selectedProject = this.projects[0] ?? null;
  }

  /** Cambio de categoría (tabs) */
  selectCategory(cat: CategoryId) {
    if (this.selectedCategory === cat) return;
    this.selectedCategory = cat;
    this.projects = this.projectsService.getProjects(cat);

    // Reset del carrusel
    this.selectedProject = this.projects[0] ?? null;
    this.currentImage = 0;
    this.lastDirection = 'fade';
  }

  /** Selección desde la lista lateral */
  selectProject(p: Project) {
    if (this.selectedProject === p) return;
    this.selectedProject = p;
    this.currentImage = 0;
    this.scrollDetailIntoView();
    this.lastDirection = 'fade';
  }

  /** Carrusel: siguiente imagen */
  nextImage() {
    if (!this.selectedProject) return;
    const total = this.selectedProject.images.length;
    if (total <= 1) return;
    this.lastDirection = 'right';
    this.currentImage = (this.currentImage + 1) % total;
  }

  /** Carrusel: imagen anterior */
  prevImage() {
    if (!this.selectedProject) return;
    const total = this.selectedProject.images.length;
    if (total <= 1) return;
    this.lastDirection = 'left';
    this.currentImage = (this.currentImage - 1 + total) % total;
  }

  /** Clase de animación basada en tu CSS existente */
  getImageAnimationClass(): string {
    switch (this.lastDirection) {
      case 'right': return 'carousel-img slide-in-right active';
      case 'left': return 'carousel-img slide-in-left active';
      default: return 'carousel-img fade active';
    }
  }

  private scrollDetailIntoView() {
    queueMicrotask(() => {
      this.carouselSection?.nativeElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  /** Abrir modal con proyecto seleccionado */
  openModal(project: Project): void {
    this.selectedProjectForModal = project;
    this.isModalOpen = true;
  }

  /** Cerrar modal */
  closeModal(): void {
    this.isModalOpen = false;
    this.selectedProjectForModal = null;
  }

  /** Ayuda para estado vacío */
  get isEmpty(): boolean {
    return this.projects.length === 0;
  }

  /** Abrir demo del proyecto */
  openProjectDemo(project: Project) {
    if (project.demo) {
      window.open(project.demo, '_blank', 'noopener,noreferrer');
    }
  }
}
