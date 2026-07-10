import { Component, ElementRef, ViewChild } from '@angular/core';

type CategoryId = 'web' | 'games';

interface Project {
  title: string;
  tech: string;                // cadena corta “Python – FastAPI – Uvicorn”
  description: string;
  images: string[];            // rutas en /assets/...
  repo?: string;
  demo?: string;
  featured?: boolean;
  badge?: string;
  highlights?: string[];
}

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  standalone: false
})
export class PortfolioComponent {
  @ViewChild('carouselSection') carouselSection!: ElementRef<HTMLDivElement>;

  // Modal properties
  isModalOpen = false;
  selectedProjectForModal: Project | null = null;

  // Categorías visibles en tabs
  categories: { id: CategoryId; label: string }[] = [
    { id: 'web', label: '🌐 Web & Software' },
    { id: 'games', label: '🎮 Videojuegos' },
  ];

  // Datos de ejemplo (ajusta rutas a /assets/...)
  data: Record<CategoryId, Project[]> = {
    web: [
      {
        title: 'Sistema de Monitoreo SGIC - Monitoreo en vivo de sucursales',
        tech: 'Python – FastAPI – Uvicorn – React – Zustand – TailwindCSS',
        description:
          'Sistema de Monitoreo SGIC Plataforma de observabilidad en tiempo real desarrollada para reducir la latencia de detección de fallas a lo largo de todas las sucursales de la cadena.',
        images: [
          'assets/img/portfolio/MonitorSGIC/MonitorSGIC_01.PNG',
          'assets/img/portfolio/MonitorSGIC/MonitorSGIC_02.PNG',
          'assets/img/portfolio/MonitorSGIC/MonitorSGIC_03.PNG',
        ],
        repo: 'https://github.com/KPBaldur/App-monitoreo-y-Ticket',
        featured: true,
        badge: 'Proyecto Empresarial',
        highlights: [
          'Monitoreo en tiempo real con procesos concurrentes (threading)',
          'Automatización de tickets vía Microsoft Graph API',
          'Gestión de accesos mediante Azure Active Directory'
        ]
      },
      {
        title: 'Sistema Integrado de Etiquetado (SIE)',
        tech: 'C# – .NET 8 – WPF – ZPL II – Odoo API – ClosedXML – GitHub Actions – Velopack',
        description: 'Aplicación de escritorio nativa que automatiza el etiquetado de precios y bodega, integrando impresión térmica industrial con el ERP Odoo.',
        images: [],
        featured: true,
        badge: 'Proyecto Empresarial',
        highlights: [
          'Integración en tiempo real con Odoo ERP vía JSON-RPC',
          'Comunicación nativa RAW/ZPL II con impresoras Zebra',
          'Carga masiva de datos desde Excel (ClosedXML)',
          'CI/CD automatizado con GitHub Actions y actualización silenciosa (Velopack)'
        ]
      },
      {
        title: 'API Regular Show',
        tech: 'Python – FastAPI – Uvicorn',
        description:
          'API RESTful pública con endpoints para capítulos, personajes y temporadas. Orientada a la comunidad Open Source.',
        images: [
          'assets/img/portfolio/regularshow/RegularShow.png',
          'assets/img/portfolio/regularshow/RegularShowAPI.png',
          'assets/img/portfolio/regularshow/RegularShowAPI2.png',
        ],
        repo: 'https://github.com/KPBaldur/ApiRegularShow',
        demo: 'https://kpbaldur.github.io/RegularShowWiki/index.html',
      },
      {
        title: 'Soluciones Luis Maldonado',
        tech: 'HTML – CSS – JavaScript',
        description:
          'Landing page profesional para empresa de construcción. Diseño responsive y foco en accesibilidad.',
        images: [
          'assets/img/portfolio/SolucionesLMaldonado/SolucionesLMaldonado01.png',
          'assets/img/portfolio/SolucionesLMaldonado/SolucionesLMaldonado02.png',
          'assets/img/portfolio/SolucionesLMaldonado/SolucionesLMaldonado03.png',
        ],
        demo: 'https://kpbaldur.github.io/LuisMaldonadoSoluciones',
      },
      {
        title: 'Todo App Roll v2.0',
        tech: 'Angular – TypeScript – CSS',
        description:
          'Aplicación de lista de tareas con diseño moderno, funcionalidad drag-and-drop y almacenamiento local.',
        images: [
          'assets/img/portfolio/TodoAppRollv02/TodoAppRollV02.png',
          'assets/img/portfolio/TodoAppRollv02/TodoAppRollV02-02.png',
          'assets/img/portfolio/TodoAppRollv02/TodoAppRollV02-03.png',
        ],
        repo: 'https://github.com/KPBaldur/TodoAppRoll.V02'
      },
      // agrega aquí tus otras landings
    ],
    games: [
      // Si aún no tienes proyectos, déjalo vacío
      // {
      //   title: 'Elena: Multiverse of Madness (Demo)',
      //   tech: 'Unreal Engine 5 – Blueprints – PaperZD',
      //   description: 'Top-down 2D/3D con 7 enemigos y jefe.',
      //   images: ['assets/portfolio/elena/elena1.jpg', 'assets/portfolio/elena/elena2.jpg'],
      //   demo: '#'
    ]
  };

  // Estado UI
  selectedCategory: CategoryId = 'web';
  projects: Project[] = this.data[this.selectedCategory];
  selectedProject: Project | null = this.projects[0] ?? null;

  currentImage = 0;
  lastDirection: 'left' | 'right' | 'fade' = 'fade'; // para animaciones CSS existentes

  /** Cambio de categoría (tabs) */
  selectCategory(cat: CategoryId) {
    if (this.selectedCategory === cat) return;
    this.selectedCategory = cat;
    this.projects = this.data[cat];

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
