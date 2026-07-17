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
  level?: 'senior' | 'mid' | 'junior';
  statusTag?: 'finalizado' | 'actualizado' | 'trabajando' | 'evolutivo';
}

export type CategoryId = 'web' | 'games';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {
  private data: Record<CategoryId, Project[]> = {
    web: [
      {
        title: 'Sistema de Etiquetado Zebra ZPL II Desktop',
        tech: 'C# – .NET 8 – WPF – ZPL II – Odoo API – ClosedXML – GitHub Actions – Velopack',
        description: 'Aplicación de escritorio que conecta de forma nativa a impresoras Zebra para la impresión de etiquetas, conectado con Odoo ERP.',
        images: [
          'assets/img/portfolio/ProyectoEtiquetas/ProyectoEtiquetas-01.png',
          'assets/img/portfolio/ProyectoEtiquetas/ProyectoEtiquetas-02.png',
          'assets/img/portfolio/ProyectoEtiquetas/ProyectoEtiquetas-03.png',
          'assets/img/portfolio/ProyectoEtiquetas/ProyectoEtiquetas-04.png',
          'assets/img/portfolio/ProyectoEtiquetas/ProyectoEtiquetas-05.png',
        ],
        featured: true,
        badge: 'Proyecto Empresarial',
        highlights: [
          'Integración en tiempo real con sistemas ERP vía JSON-RPC',
          'Comunicación nativa RAW/ZPL II con impresoras Zebra',
          'Carga masiva de datos desde Excel (ClosedXML)',
          'CI/CD automatizado con GitHub Actions y actualización silenciosa (Velopack)'
        ],
        slug: 'sie',
        challenge: `Como Ingeniero de Soporte TI para una importante cadena de retail, identifiqué un problema sistemático que generaba una alta carga operativa tanto para nuestro departamento como para las sucursales: la configuración, calibración y cambio de consumibles en nuestros equipos de impresión Zebra. Las constantes fallas al imprimir etiquetas de precios y códigos de barras generaban picos de incidencias que interrumpían el trabajo de los vendedores de primera línea.

        Para resolver este desafío, tomé la iniciativa de desarrollar una solución de software capaz de comunicarse de forma nativa con cualquier modelo de impresora Zebra de la empresa. El enfoque principal fue la adaptabilidad y la experiencia del usuario final; el sistema soporta sin problemas hardware antiguo que opera a 203 dpi, como los modelos GC420t y ZD220. Gracias a su interfaz de calibración asistida, el personal de tienda adquirió total autonomía para resolver problemas básicos de hardware y cambios de rollo, sin necesidad de escalar tickets a TI.

        Adicionalmente, diseñé la arquitectura del software pensando en la escalabilidad del negocio. Implementé un flujo de CI/CD utilizando GitHub Actions para la gestión de actualizaciones. Ahora, cuando el departamento de marketing necesita alterar el diseño de las etiquetas de ofertas o precios, un simple commit dispara un flujo de trabajo que notifica automáticamente a las aplicaciones en las sucursales. El software solicita una confirmación a los usuarios y se actualiza de forma transparente, sin interrumpir el flujo de ventas.

        Esta iniciativa logró reducir las incidencias relacionadas con impresoras en casi un 90%, optimizando radicalmente los tiempos de nuestro departamento de TI y mejorando la calidad del trabajo diario en todas las tiendas.`,
        videoUrl: 'assets/videos/EjemploFuncionamientoSistemaEtiquetas.mp4',
        architectureImage: 'assets/img/portfolio/ProyectoEtiquetas/ArquitecturaProyectoEtiquetasZebra.png',
        architectureNote: `Arquitectura del Sistema de Impresión de Etiquetas
El proyecto es una aplicación de escritorio modular construida con .NET 8.0 y WPF, diseñada para optimizar y automatizar el proceso de etiquetado en el punto de venta. La arquitectura se basa en un modelo de tres capas con un fuerte enfoque en el desacoplamiento, la seguridad y la entrega continua.

A continuación, se detalla el flujo operativo y el ciclo de vida del software:

1. Flujo de Datos y Operación
El núcleo de la aplicación se encarga de conectar la sesión del usuario con el hardware de forma eficiente y segura, siguiendo este flujo continuo:

Autenticación y Contexto de Sesión: El flujo comienza cuando el usuario ingresa sus credenciales en la interfaz. El sistema establece una conexión segura (vía JSON-RPC 2.0 sobre SSL) con la API del ERP central (Odoo). Esto no solo valida el acceso, sino que contextualiza la sesión, identificando el Punto de Venta específico desde el cual opera el usuario.

Recuperación de Datos: Una vez en el panel principal, el usuario o el lector de código de barras ingresa el identificador de un producto. La capa de servicios consulta el catálogo del ERP utilizando un patrón Strategy/Fallback (buscando primero por ISBN y, de ser necesario, por SKU interno). El sistema extrae únicamente los datos públicos y autorizados necesarios para la etiqueta, manteniendo la lógica compleja de negocio completamente aislada y protegida en el backend.

Traducción a Comandos ZPL II: Los datos obtenidos se almacenan temporalmente en modelos de datos ligeros (DTOs) en la memoria de la aplicación. El servicio de impresión toma estos datos y los inyecta en plantillas predefinidas, construyendo dinámicamente comandos en lenguaje ZPL II (Zebra Programming Language), adaptándose al formato solicitado (etiqueta normal, oferta, etc.).

Túnel Transaccional de Hardware: Para evitar la latencia y los errores comunes de los drivers de Windows, el sistema utiliza interoperabilidad nativa (P/Invoke) para comunicarse directamente con la API Winspool del sistema operativo. Abre un "túnel RAW" seguro hacia la impresora (como los modelos Zebra GC420t o ZD220), envía los comandos ZPL II puros y cierra la transacción. Esto garantiza una impresión instantánea, precisa y sin riesgo de fugas de memoria.

2. Integración Continua y Actualizaciones Automáticas (CI/CD)
Para garantizar que todas las estaciones de trabajo cuenten siempre con la versión más estable sin requerir intervención manual, el proyecto implementa un pipeline moderno de CI/CD:

Despliegue Automatizado: Cada vez que se finaliza una nueva característica y se realiza un commit hacia la rama principal, un flujo de GitHub Actions entra en acción. Este pipeline compila la aplicación de forma autocontenida y ejecuta pruebas de integración.

Empaquetado y Distribución: Durante este proceso automatizado, se utiliza el gestor de releases Velopack para generar los paquetes diferenciales (.nupkg) y compilar el manifiesto de la versión. Estos archivos se publican automáticamente en los Releases del repositorio.

Actualización Silenciosa en el Cliente: Cuando el usuario abre la aplicación en su equipo, un proceso asíncrono en segundo plano consulta el repositorio en busca de nuevas versiones. Si detecta una actualización, la descarga de forma silenciosa. El sistema puede aplicar la actualización y reiniciar la aplicación al instante si el usuario lo autoriza, o bien, dejarla preparada para instalarse automáticamente la próxima vez que se cierre el programa. Esto asegura que el ciclo operativo de la tienda nunca se vea interrumpido por ventanas de carga o mantenimientos prolongados.`,
        level: 'senior',
        statusTag: 'evolutivo'
      },
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
        architectureNote: '// TODO: contenido pendiente de Kevin',
        level: 'senior',
        statusTag: 'actualizado'
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
        level: 'mid',
        statusTag: 'finalizado'
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
        businessResult: '// TODO: contenido pendiente de Kevin (Mejora del 20% en el embudo de captación de leads.)',
        level: 'junior',
        statusTag: 'finalizado'
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
        repo: 'https://github.com/KPBaldur/TodoAppRoll.V02',
        level: 'junior',
        statusTag: 'trabajando'
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
