# 🎨 Portfolio Style Guide - Cosmic Theme

## 🌌 Paleta de Colores Cósmica

### Colores Principales
- **`--color-background`**: `#0B0C10` - Fondo general oscuro
- **`--color-blue`**: `#0D47A1` - Azul profundo
- **`--color-celeste`**: `#00C3FF` - Celeste brillante
- **`--color-purple`**: `#7B2CBF` - Púrpura cósmico
- **`--color-magenta`**: `#E100FF` - Magenta espacial
- **`--color-green`**: `#00FFCC` - Verde acento
- **`--color-white`**: `#F5F5F5` - Texto principal

## 📏 Sistema de Espaciado

### Escala de Espaciados (múltiplos de 0.5rem)
- **`--spacing-xs`**: `0.5rem` (8px)
- **`--spacing-sm`**: `1rem` (16px)
- **`--spacing-md`**: `1.5rem` (24px)
- **`--spacing-lg`**: `2rem` (32px)
- **`--spacing-xl`**: `3rem` (48px)
- **`--spacing-xxl`**: `4rem` (64px)

## 🔤 Tipografía

### Fuentes
- **Primaria**: Inter (Google Fonts)
- **Secundaria**: Poppins (Google Fonts)

### Jerarquía
- **H1**: 3rem
- **H2**: 2.5rem
- **H3**: 1.8rem
- **H4**: 1.4rem
- **H5**: 1.2rem
- **H6**: 1rem

## 🎯 Componentes Estándar

### Botones
```css
.btn-primary {
  background: linear-gradient(135deg, var(--color-purple), var(--color-celeste));
  color: var(--color-white);
  box-shadow: var(--shadow-soft);
}
```

### Cards
```css
.card {
  background: #1a1a1a;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: var(--border-radius);
  padding: var(--spacing-lg);
}
```

### Inputs
```css
.input {
  background: rgba(255, 255, 255, 0.05);
  border: 2px solid var(--color-blue);
  border-radius: var(--border-radius-sm);
  color: var(--color-white);
}
```

## 🌟 Efectos Visuales

### Sombras
- **`--shadow-soft`**: `0 4px 15px rgba(123, 44, 191, 0.3)`
- **`--shadow-glow`**: `0 8px 32px rgba(0, 195, 255, 0.2)`
- **`--shadow-deep`**: `0 12px 40px rgba(11, 12, 16, 0.5)`

### Gradientes
- **Cósmico**: `linear-gradient(135deg, var(--color-background) 0%, #1a1a2e 50%, var(--color-background) 100%)`
- **Texto**: `linear-gradient(45deg, var(--color-celeste), var(--color-purple))`
- **Acento**: `linear-gradient(135deg, var(--color-purple), var(--color-celeste))`

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 768px
- **Tablet**: 768px - 992px
- **Desktop**: > 992px

### Adaptaciones
- Espaciados reducidos en móvil
- Tipografía escalable
- Grid adaptativo

## ♿ Accesibilidad

### Focus Styles
```css
*:focus-visible {
  outline: 2px solid var(--color-celeste);
  outline-offset: 2px;
}
```

### Contraste
- Alto contraste para legibilidad
- Colores accesibles según WCAG
- Soporte para `prefers-reduced-motion`

## 🎨 Uso en Componentes

### Importar Variables
```scss
@import '../styles.scss';
```

### Aplicar Estilos
```css
.mi-componente {
  padding: var(--spacing-lg);
  background: var(--gradient-cosmic);
  color: var(--color-white);
  border-radius: var(--border-radius);
}
```

## 🚀 Mejores Prácticas

1. **Usar siempre las variables CSS** en lugar de valores hardcodeados
2. **Mantener consistencia** en espaciados y colores
3. **Aplicar gradientes** para elementos destacados
4. **Usar sombras suaves** para profundidad
5. **Mantener accesibilidad** en todos los componentes
6. **Probar en diferentes dispositivos** para responsive

## 📋 Checklist de Implementación

- [ ] Variables CSS definidas
- [ ] Tipografías importadas
- [ ] Espaciados estandarizados
- [ ] Colores aplicados consistentemente
- [ ] Sombras y efectos implementados
- [ ] Responsive design verificado
- [ ] Accesibilidad validada
- [ ] Performance optimizada
