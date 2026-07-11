import { Injectable } from '@angular/core';

export interface Project {
  title: string;
  tech: string;
  description: string;
  images: string[];
  repo?: string;
  demo?: string;
  featured?: boolean;
  badge?: string;
  highlights?: string[];
  slug?: string;
  challenge?: string;
  videoUrl?: string;
  architectureImage?: string;
  architectureNote?: string;
  isClientProject?: boolean;
  clientRole?: string;
  businessResult?: string;
}

export type CategoryId = 'web' | 'games';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private data: Record<CategoryId, Project[]> = {
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
        ],
        slug: 'sgic',
        challenge: '// TODO: contenido pendiente de Kevin',
        videoUrl: '',
        architectureImage: '',
        architectureNote: '// TODO: contenido pendiente de Kevin'
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
        ],
        slug: 'sie',
        challenge: '// TODO: contenido pendiente de Kevin',
        videoUrl: '',
        architectureImage: '',
        architectureNote: '// TODO: contenido pendiente de Kevin'
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
        isClientProject: true,
        clientRole: 'Diseño y desarrollo end-to-end para el cliente, desde el brief inicial hasta el despliegue.',
        businessResult: '// TODO: contenido pendiente de Kevin (Mejora del 20% en el embudo de captación de leads.)'
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
    ],
    games: []
  };

  getProjects(category: CategoryId): Project[] {
    return this.data[category];
  }

  getProjectBySlug(slug: string): Project | null {
    for (const cat of Object.keys(this.data) as CategoryId[]) {
      const found = this.data[cat].find(p => p.slug === slug);
      if (found) return found;
    }
    return null;
  }

  getNextProjectWithSlug(currentSlug: string): Project | null {
    const allWithSlug: Project[] = [];
    for (const cat of Object.keys(this.data) as CategoryId[]) {
      for (const p of this.data[cat]) {
        if (p.slug) {
          allWithSlug.push(p);
        }
      }
    }
    const index = allWithSlug.findIndex(p => p.slug === currentSlug);
    if (index !== -1 && index < allWithSlug.length - 1) {
      return allWithSlug[index + 1];
    }
    return null;
  }
}
