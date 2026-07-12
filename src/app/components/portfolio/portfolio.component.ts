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

  // Filtros
  allProjectsInCategory: Project[] = [];
  selectedLevelFilter: string = 'all';
  selectedStatusFilter: string = 'all';

  levelFilterOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'senior', label: 'Senior' },
    { value: 'mid', label: 'Mid' },
    { value: 'junior', label: 'Junior' }
  ];

  statusFilterOptions = [
    { value: 'all', label: 'Todos' },
    { value: 'finalizado', label: 'Finalizado' },
    { value: 'actualizado', label: 'Actualizado' },
    { value: 'trabajando', label: 'Trabajando' },
    { value: 'evolutivo', label: 'Evolución Continua' }
  ];

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.allProjectsInCategory = this.projectsService.getProjects(this.selectedCategory);
    this.applyFilters();
  }

  /** Cambio de categoría (tabs) */
  selectCategory(cat: CategoryId) {
    if (this.selectedCategory === cat) return;
    this.selectedCategory = cat;
    
    // Resetear filtros al cambiar de pestaña
    this.selectedLevelFilter = 'all';
    this.selectedStatusFilter = 'all';
    
    this.allProjectsInCategory = this.projectsService.getProjects(cat);
    this.applyFilters();
    this.lastDirection = 'fade';
  }

  /** Aplicar filtros combinados */
  applyFilters() {
    this.projects = this.allProjectsInCategory.filter(project => {
      const matchLevel = this.selectedLevelFilter === 'all' || project.level === this.selectedLevelFilter;
      const matchStatus = this.selectedStatusFilter === 'all' || project.statusTag === this.selectedStatusFilter;
      return matchLevel && matchStatus;
    });

    this.selectedProject = this.projects[0] ?? null;
    this.currentImage = 0;
  }

  /** Filtrar por nivel */
  filterByLevel(level: string) {
    this.selectedLevelFilter = level;
    this.applyFilters();
  }

  /** Filtrar por estado */
  filterByStatus(status: string) {
    this.selectedStatusFilter = status;
    this.applyFilters();
  }

  /** Restablecer todos los filtros */
  resetFilters() {
    this.selectedLevelFilter = 'all';
    this.selectedStatusFilter = 'all';
    this.applyFilters();
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

  /** Comprueba si la categoría actual está completamente vacía */
  get isCategoryEmpty(): boolean {
    return this.allProjectsInCategory.length === 0;
  }

  /** Comprueba si no hay resultados debido a los filtros */
  get isFilterEmpty(): boolean {
    return !this.isCategoryEmpty && this.projects.length === 0;
  }

  /** Abrir demo del proyecto */
  openProjectDemo(project: Project) {
    if (project.demo) {
      window.open(project.demo, '_blank', 'noopener,noreferrer');
    }
  }

  /** Obtiene la etiqueta amigable del estado */
  getStatusLabel(status?: string): string {
    switch (status) {
      case 'finalizado': return 'Finalizado';
      case 'actualizado': return 'Actualizado';
      case 'trabajando': return 'Trabajando';
      case 'evolutivo': return 'Evolución Continua';
      default: return '';
    }
  }

  /** Obtiene la etiqueta amigable del nivel */
  getLevelLabel(level?: string): string {
    switch (level) {
      case 'senior': return 'Senior';
      case 'mid': return 'Mid';
      case 'junior': return 'Junior';
      default: return '';
    }
  }
}
