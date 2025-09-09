# 🏠 Dashboard de Marketing Digital - Real Estate

Dashboard integral para análisis de campañas publicitarias de Meta Ads en el sector inmobiliario.

## 🚀 Características

### 📊 Métricas Generales
- **Inversión en anuncios**: $125,000
- **Impresiones**: 2.5M
- **CTR**: 3.2%
- **Leads generados**: 850
- **Leads calificados**: 420
- **Reuniones concretadas**: 180
- **Clientes mitigados**: 76
- **Costo por cliente**: $1,644.74
- **Facturación**: $495,500
- **ROAS**: 3.96x

### 📈 Análisis de Campañas
- **Top 25 campañas** más eficientes organizadas por costo por cliente
- **Ranking visual** con iconos y colores por nivel de eficiencia
- **Análisis comparativo** de costos entre diferentes rangos
- **30+ campañas** de ejemplo con datos realistas

### 🏢 Gestión de Sucursales
- **5 sucursales**: Miami, Orlando, Tampa, Jacksonville, Atlanta
- **Métricas por sucursal**: inversión, leads, citas, clientes, costos
- **Análisis de vendedores**: rendimiento individual por sucursal
- **Tarjetas expandibles** con detalles de cada vendedor

### 📊 Embudo de Conversión
- **Visualización gráfica** del proceso de conversión
- **4 etapas**: Leads → Calificados → Citas → Ventas
- **Porcentajes de conversión** en cada etapa
- **Análisis de pérdidas** y oportunidades de mejora

## 🎨 Diseño

- **Tema azul futurista** con gradientes oscuros
- **Efectos glassmorphism** en tarjetas y componentes
- **Animaciones suaves** y transiciones
- **Diseño responsivo** para diferentes dispositivos
- **Paleta de colores** azul marino, índigo y cian

## 🛠️ Tecnologías

- **Next.js 14** (App Router)
- **React 18**
- **TypeScript**
- **TailwindCSS**
- **Recharts** (para gráficos)

## 📁 Estructura del Proyecto

```
├── app/
│   ├── globals.css
│   └── page.tsx
├── components/
│   ├── AdsTable.tsx
│   ├── BranchCard.tsx
│   ├── BranchesSection.tsx
│   ├── ConversionFunnel.tsx
│   ├── Header.tsx
│   └── MetricCard.tsx
├── data/
│   ├── ads-metrics.json
│   ├── branches.json
│   └── dashboard-metrics.json
└── types/
    ├── ads.ts
    ├── branches.ts
    └── dashboard.ts
```

## 🚀 Instalación y Uso

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/sergiooosa/demo-johnatan.git
   cd demo-johnatan
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Ejecutar en desarrollo**:
   ```bash
   npm run dev
   ```

4. **Abrir en el navegador**:
   ```
   http://localhost:3000
   ```

## 📊 Datos de Ejemplo

El proyecto incluye datos de ejemplo para:
- **30 campañas** de Meta Ads con métricas realistas
- **5 sucursales** con 3 vendedores cada una
- **Métricas generales** del dashboard principal
- **Datos consistentes** entre todas las secciones

## 🎯 Funcionalidades Principales

### Análisis de Campañas
- Ordenamiento por eficiencia de costo
- Ranking visual con iconos
- Comparación de rendimiento
- Identificación de mejores prácticas

### Gestión de Sucursales
- Métricas por ubicación
- Análisis de vendedores
- Distribución de leads
- Costos por oficina

### Embudo de Conversión
- Visualización del proceso
- Identificación de cuellos de botella
- Análisis de pérdidas
- Optimización de conversiones

## 🔧 Personalización

Los datos se pueden modificar fácilmente en los archivos JSON:
- `data/dashboard-metrics.json` - Métricas generales
- `data/ads-metrics.json` - Datos de campañas
- `data/branches.json` - Información de sucursales

## 📱 Responsive Design

El dashboard está optimizado para:
- **Desktop**: Experiencia completa
- **Tablet**: Adaptación de columnas
- **Mobile**: Vista simplificada

## 🎨 Paleta de Colores

- **Azul principal**: #1E3A8A
- **Azul oscuro**: #0F172A
- **Índigo**: #312E81
- **Cian**: #0891B2
- **Gris**: #64748B

## 📈 Métricas Clave

- **ROAS promedio**: 3.96x
- **Costo por cliente**: $1,644.74
- **Tasa de conversión**: 8.9%
- **Eficiencia Top 5**: $666 por cliente
- **Facturación total**: $495,500

---

**Desarrollado para análisis de marketing digital en el sector inmobiliario** 🏠✨