# 📘 Informe de Arquitectura Técnica y Funcionamiento del Portafolio

Este documento detalla la estructura, tecnologías, componentes, servicios y flujos del proyecto de portafolio Angular.

---

## 🚀 1. Stack Tecnológico

El proyecto está construido sobre un stack moderno enfocado en alto rendimiento, interactividad y mantenibilidad:

- **Framework Core**: **Angular v19** (con soporte para compilación incremental y decoradores estándar).
- **Control de Estado y Datos**: TypeScript y Servicios Reactivos Inyectables.
- **Formularios**: `ReactiveFormsModule` de Angular (usado en el formulario de contacto para validación síncrona).
- **Estilos**: **Vanilla CSS** con arquitectura de Variables Cósmicas CSS (`:root` tokens en [styles.css](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/styles.css)) para fácil personalización de colores, sombras y espaciados.
- **Tipografías**: Google Fonts (`Inter` y `Poppins`).
- **Iconografía**: **Boxicons v2.1.4** (cargado globalmente para proveer íconos técnicos e interactivos).
- **Integraciones de Terceros**:
  - **EmailJS** (`@emailjs/browser`): Para el envío de mensajes de contacto directamente a tu correo sin requerir un backend propio.
- **Entorno de Configuración**: Script Node.js (`scripts/set-env.js`) con soporte de `dotenv` para inyección automatizada de variables de entorno de EmailJS y reCAPTCHA antes de cada compilación.

---

## 📂 2. Estructura de Directorios Principal

El código fuente principal está estructurado dentro de `src/app/` de la siguiente forma:

```
src/
├── app/
│   ├── components/
│   │   ├── about/                   # Componente "Sobre Mí"
│   │   ├── contact/                 # Componente de Formulario de Contacto
│   │   ├── footer/                  # Componente de pie de página
│   │   ├── home/                    # Componente de sección de bienvenida (Hero)
│   │   ├── navbar/                  # Componente de barra de navegación principal
│   │   ├── portfolio/               # Grid principal de proyectos
│   │   ├── project-case-study/      # Nueva página de caso de estudio (scroll narrativo)
│   │   ├── project-detail-modal.component # Modal de detalles emergentes
│   │   └── skills/                  # Componente de visualización de habilidades
│   ├── services/
│   │   └── projects.service.ts      # Servicio de centralización y consulta de datos
│   ├── app-routing.module.ts        # Módulo de enrutamiento principal
│   ├── app.component.html/.ts/.css  # Componente raíz del portafolio
│   └── app.module.ts                # Módulo raíz que declara dependencias
├── assets/                          # Recursos estáticos (imágenes, PDFs, videos de fondo)
└── environments/                    # Archivos generados dinámicamente para builds (dev/prod)
```

---

## ⚙️ 3. Configuración y Generación de Entorno (`set-env.js`)

El portafolio cuenta con un generador automático de configuraciones. Al ejecutar comandos como `npm start` o `npm run build`, se ejecuta previamente el script [set-env.js](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/scripts/set-env.js) que lee las variables del archivo secreto `.env` y genera el archivo **`environment.ts`** necesario para compilar el cliente.

Esto protege tus claves públicas de EmailJS (`EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID`, `EMAILJS_TEMPLATE_ID`) y reCAPTCHA evitando subirlas directamente a Git.

---

## 🧩 4. Catálogo de Componentes

### 1. `AppComponent` (Componente Raíz)
- **Ruta**: [app.component.ts](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/app.component.ts)
- **Función**: Controla la visualización del layout. Observa los eventos del enrutador (`Router`) y detecta mediante una subscripción si el usuario se encuentra dentro de la ruta de un caso de estudio (`/portafolio/:slug`). Si es así, oculta dinámicamente las secciones estáticas del home para renderizar un lienzo limpio con el `<router-outlet>`.

### 2. `NavbarComponent`
- **Ruta**: [navbar.component.html](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/navbar/navbar.component.html)
- **Función**: Barra superior adaptable (responsiva). Posee un menú de hamburguesa en dispositivos móviles y enlaces basados en fragmentos/anclas para realizar scroll local dentro del portafolio.

### 3. `HomeComponent` (Hero)
- **Ruta**: [home.component.html](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/home/home.component.html)
- **Función**: Sección inicial de impacto visual. Incluye reproducción en loop de video de fondo, rol profesional y un lema personal de cita estilizada en formato `.hero-quote-block` con borde izquierdo iluminado. Administra tres botones principales con jerarquías equilibradas (Primario, Secundario Outline, Terciario Translúcido) con idénticas alturas visuales.

### 4. `AboutComponent`
- **Ruta**: [about.component.html](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/about/about.component.html)
- **Función**: Muestra información académica, presentación personal y filosofía de desarrollo estructurada.

### 5. `PortfolioComponent`
- **Ruta**: [portfolio.component.html](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/portfolio/portfolio.component.html)
- **Función**: Es la cuadrícula interactiva. Agrupa proyectos mediante pestañas (`selectedCategory === 'web' | 'games'`). Para proyectos Web que no tengan slug o sean regulares, abre el modal detallado. Para proyectos destacados (`featured: true`) y que cuentan con un caso de estudio (`slug` definido), navega a su URL propia.

### 6. `ProjectDetailModalComponent`
- **Ruta**: [project-detail-modal.component.ts](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/project-detail-modal.component.ts)
- **Función**: Modal que muestra un carrusel de capturas de pantalla, tecnologías y la descripción del proyecto.
  - **Bloqueo de Fondo**: Al abrirse, congela el scroll de fondo de la página agregando `.modal-open` a `document.body`.
  - **Scroll del Modal**: Cuenta con `overflow-y: auto` en la tarjeta para asegurar la lectura de contenidos extensos.
  - **Tratamiento de Clientes**: Muestra de forma destacada el badge de cliente en turquesa, el rol desempeñado (`clientRole`) y el impacto comercial (`businessResult`).

### 7. `ProjectCaseStudyComponent`
- **Ruta**: [project-case-study.component.ts](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/project-case-study/project-case-study.component.ts)
- **Función**: Página individualizada para proyectos insignia (SGIC y SIE). Carga la información mediante el parámetro `:slug` de la URL. Tiene secciones de cabecera con retorno inteligente, desafío técnico, reproductor de video de flujo con poster fallback, diagrama y nota de arquitectura, logros técnicos en viñetas de verificación, y un pie de página inteligente para saltar al siguiente caso de estudio.

### 8. `SkillsComponent`
- **Ruta**: [skills.component.ts](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/skills/skills.component.ts)
- **Función**: Mapea dinámicamente tus herramientas y conocimientos clasificados por categorías (Backend, Frontend, Bases de Datos, Videojuegos, Herramientas, y Suite de Diseño), renderizando sus barras, colores corporativos e íconos (incluyendo la reciente integración de Docker).

### 9. `ContactComponent`
- **Ruta**: [contact/](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/contact/)
- **Función**: Administra el formulario de mensajería con validación de campos obligatorios e interactúa con EmailJS para despachar los datos.

### 10. `FooterComponent`
- **Ruta**: [footer/](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/footer/)
- **Función**: Cierre del sitio con derechos de autor y accesos rápidos a redes sociales.

---

## 🛠️ 5. Servicios del Sistema

### `ProjectsService`
- **Archivo**: [projects.service.ts](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/services/projects.service.ts)
- **Patrón**: Inyectable Singleton (`providedIn: 'root'`).
- **Propósito**: Actúa como la base de datos única y en memoria del cliente. Contiene las definiciones completas de cada proyecto utilizando la interfaz `Project` (con soporte para campos condicionales de clientes y casos de estudio).
- **Métodos expuestos**:
  - `getProjects(category)`: Filtra y retorna los proyectos web o de videojuegos.
  - `getProjectBySlug(slug)`: Busca linealmente el proyecto coinciciente con el slug en la URL del caso de estudio.
  - `getNextProjectWithSlug(slug)`: Identifica los proyectos con slug y determina cuál es el siguiente relativo al actual para generar el botón de navegación del pie de página.

---

## 🛣️ 6. Enrutamiento (`AppRoutingModule`)

El enrutamiento está configurado en [app-routing.module.ts](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/app-routing.module.ts):
- Define la ruta dinámica `portafolio/:slug` asociada a `ProjectCaseStudyComponent`.
- Habilitar `anchorScrolling: 'enabled'` para permitir que al hacer clic en el botón de retroceso (que apunta a `routerLink="/" fragment="portfolio"`), la aplicación redirija a la página principal e inmediatamente realice un scroll automático de la ventana hasta enfocar la sección con la ID `#portfolio`.
- Habilitar `scrollPositionRestoration: 'enabled'` para reiniciar la posición del scroll de la página a la coordenada superior `(0,0)` cada vez que cargamos una página de caso de estudio.
