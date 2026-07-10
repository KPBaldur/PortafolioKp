# Documentación del Proyecto: Portafolio Profesional

Este documento proporciona una guía exhaustiva de la arquitectura, funcionamiento, distribución y configuración de seguridad de la aplicación de portafolio web de **Kevin Pizarro**.

---

## 1. Descripción General del Proyecto
El proyecto es una **Single Page Application (SPA)** responsiva y de alto rendimiento, desarrollada sobre el framework **Angular (v19)**. El portafolio está diseñado para presentar proyectos de software (web, videojuegos y modelado 3D), enumerar habilidades técnicas interactivas, y proveer un canal de contacto directo protegido contra bots y abuso.

*   **Tecnologías Principales:** Angular, TypeScript, HTML5, CSS3 (Vanilla).
*   **Servicios Externos:** EmailJS (envío de correos desde cliente), Google reCAPTCHA v2 (antispam), Boxicons & FontAwesome (iconografía).
*   **Hospedaje de Producción:** Vercel.

---

## 2. Distribución de Contenido (Estructura de Directorios)

A continuación se detalla la distribución de archivos clave en la raíz y en el directorio fuente del proyecto:

### A. Archivos de Configuración en la Raíz
*   [package.json](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/package.json): Gestión de dependencias npm y scripts de ejecución/compilación.
*   [angular.json](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/angular.json): Configuración del compilador de Angular, activos y estilos globales.
*   [tsconfig.json](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/tsconfig.json): Reglas de compilación y tipado de TypeScript.
*   [vercel.json](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/vercel.json): Configuración de redirecciones para el routing en Vercel (evita errores 404 al recargar rutas).
*   [.env.example](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/.env.example): Archivo de plantilla para definir las credenciales locales de desarrollo.
*   [.gitignore](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/.gitignore): Reglas de exclusión para evitar subir credenciales u outputs compilados a GitHub.

### B. Directorio de Scripts
*   [set-env.js](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/scripts/set-env.js): Script Node.js que lee las variables de entorno del archivo `.env` o del sistema y genera dinámicamente el archivo de entorno de Angular antes de compilar.

### C. Directorio Fuente (`src/`)
*   [index.html](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/index.html): Plantilla HTML principal. Contiene la política de CSP y la carga de scripts de CDNs.
*   [styles.css](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/styles.css): Definición de variables CSS globales (colores, gradientes, tipografías y espaciados).
*   **Directorio `environments/`:** Contiene [environment.ts](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/environments/environment.ts), generado dinámicamente con las credenciales activas.
*   **Directorio `app/components/`:** Contiene los componentes de interfaz que estructuran el sitio:
    *   `about/`: Componente "Sobre mí". Contiene la descripción, enlaces sociales seguros y la descarga de CV en [about.component.html](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/about/about.component.html) y [about.component.css](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/about/about.component.css).
    *   `contact/`: Formulario de contacto integrado con EmailJS y reCAPTCHA en [contact.component.ts](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/contact/contact.component.ts) y [contact.component.html](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/contact/contact.component.html).
    *   `portfolio/`: Visualizador de proyectos clasificados por pestañas en [portfolio.component.ts](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/portfolio/portfolio.component.ts) y [portfolio.component.html](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/portfolio/portfolio.component.html).
    *   `skills/`: Listado interactivo de aptitudes con efectos de espacio y nodos de neón en [skills.component.ts](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/skills/skills.component.ts) and [skills.component.css](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/skills/skills.component.css).
    *   `project-detail-modal/`: Tarjeta modal emergente detallada para los proyectos en [project-detail-modal.component.ts](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/project-detail-modal.component.ts) y [project-detail-modal.component.html](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/project-detail-modal.component.html).

---

## 3. Funcionamiento de Módulos Clave

### A. Inyección Segura de Variables de Entorno
Para evitar la filtración de claves privadas en GitHub, el flujo de desarrollo utiliza un script automatizado:
1.  Las claves se almacenan localmente en un archivo `.env` (el cual es ignorado por git).
2.  Al ejecutar `npm start` o `npm run build`, se ejecuta primero `node scripts/set-env.js`.
3.  Este script extrae las variables del archivo `.env` y crea el archivo [environment.ts](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/environments/environment.ts):
    ```typescript
    export const environment = {
      production: false,
      emailjs: {
        publicKey: '...',
        serviceId: '...',
        templateId: '...'
      },
      recaptcha: {
        siteKey: '...'
      }
    };
    ```

### B. Formulario de Contacto (Mitigación de Spam y Bots)
El método [ContactComponent.sendEmail](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/contact/contact.component.ts#L49) procesa el envío de la siguiente manera:
1.  **Validación del Formulario:** Comprueba que todos los campos cumplan con las restricciones definidas en la reactividad de Angular (ej: email estructurado, asunto y mensaje con longitud mínima).
2.  **Mecanismo de Cooldown Local:** Compara la marca de tiempo de envío con `localStorage.getItem('last_email_sent')`. Si no ha transcurrido un cooldown de 60 segundos, bloquea la solicitud informando al usuario el tiempo restante.
3.  **Verificación de reCAPTCHA v2:**
    *   Si `environment.recaptcha.siteKey` está configurado, el formulario extrae el token generado por el widget de Google usando `grecaptcha.getResponse()`.
    *   Si no se ha resuelto la casilla, se detiene el flujo pidiendo la validación.
4.  **Envío a EmailJS:** Agrega el token bajo el parámetro `'g-recaptcha-response'` y envía el formulario asíncronamente con la API de `@emailjs/browser`.
5.  **Reinicio:** Ante un envío exitoso, restablece los inputs del formulario, reinicia el widget visual llamando a `grecaptcha.reset()`, y graba la marca de tiempo actual en el `localStorage`.

### C. Visualizador de Portafolio y Modales
El componente [PortfolioComponent](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/portfolio/portfolio.component.ts) maneja la interacción con los proyectos:
*   **Filtrado por Categorías:** Clasifica dinámicamente el arreglo de datos en base al tab activo (`web`, `games`, `models`).
*   **Carrusel de Imágenes:** Navega con transiciones CSS a través de las capturas de pantalla del proyecto.
*   **Visualización en Modal:** Al hacer click en una tarjeta, se delega al componente [ProjectDetailModalComponent](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/project-detail-modal.component.ts) para mostrar detalles adicionales e imágenes en alta resolución, capturando también el evento `Escape` en el teclado para cerrarse.

---

## 4. Arquitectura de Seguridad Implementada

### A. Content Security Policy (CSP)
Se configuró una política restrictiva en la cabecera meta de [index.html](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/index.html) para prevenir ataques de Cross-Site Scripting (XSS) y Clickjacking:
*   `default-src 'self'`: Restringe la descarga de recursos a tu propio dominio por defecto.
*   `script-src 'self' 'unsafe-inline' https://kit.fontawesome.com https://www.google.com https://www.gstatic.com`: Permite la ejecución del código de la app, los scripts de íconos y el SDK de Google reCAPTCHA.
*   `connect-src 'self' https://api.emailjs.com https://ka-f.fontawesome.com https://www.google.com`: Autoriza peticiones de red y APIs a EmailJS, FontAwesome y Google reCAPTCHA.
*   `frame-src https://www.google.com`: Permite la incrustación segura del iframe de reCAPTCHA.

### B. Mitigación de Reverse Tabnabbing
Todos los enlaces con la propiedad `target="_blank"` cuentan de manera obligatoria con el atributo `rel="noopener noreferrer"`. En redirecciones dinámicas de TypeScript ([PortfolioComponent.openProjectDemo](file:///C:/Users/Kevin%20Pizarro/Documents/Github/PortafolioKp/src/app/components/portfolio/portfolio.component.ts#L189)), se especifica explícitamente `window.open(url, '_blank', 'noopener,noreferrer')` para impedir que la nueva pestaña manipule la ventana de origen.

---

## 5. Instrucciones de Desarrollo y Despliegue

### Ejecución en Desarrollo (Local)
1.  Clona el repositorio.
2.  Crea el archivo `.env` en la raíz en base a `.env.example` y rellena las credenciales correspondientes.
3.  Ejecuta la instalación de paquetes:
    ```bash
    npm install
    ```
4.  Inicia el servidor local:
    ```bash
    npm start
    ```
    *Nota: Esto generará el archivo `environment.ts` e iniciará `ng serve` en `http://localhost:4200/`.*

### Compilación y Despliegue en Producción
Para compilar los recursos optimizados estáticos:
```bash
npm run build
```
Esto creará el directorio de salida en `/dist` listo para cargarse en Vercel. 

> [!IMPORTANT]
> En tu panel de Vercel, asegúrate de ingresar las variables `RECAPTCHA_SITE_KEY`, `EMAILJS_PUBLIC_KEY`, `EMAILJS_SERVICE_ID` y `EMAILJS_TEMPLATE_ID` en la pestaña **Settings > Environment Variables** para que el pipeline de compilación las inyecte de manera segura en el build de producción.
