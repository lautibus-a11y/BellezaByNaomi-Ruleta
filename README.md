# BellezzaByNaomi — Ruleta de Diseños

Sitio web estático optimizado para despliegue en **Vercel** sin proceso de build.

## Estructura del proyecto

```
carrousel 2/
├── index.html              ← App principal (React via CDN)
├── styles.css              ← Estilos globales
├── vercel.json             ← Configuración de Vercel (caché, headers, etc.)
├── imagenes-random/        ← ⭐ Pon tus imágenes aquí
│   └── README.md
└── bellezzabynaomi-2.tsx   ← Código fuente original (referencia)
```

## ⭐ Cómo agregar imágenes propias

1. Copia tus imágenes de diseños de uñas a la carpeta `imagenes-random/`
2. Abre `index.html` y busca el array `DESIGN_IMAGES` (línea ~30)
3. Reemplaza las URLs de Unsplash con rutas locales:

```js
const DESIGN_IMAGES = [
  "imagenes-random/diseno-1.jpg",
  "imagenes-random/diseno-2.webp",
  // ... más imágenes
];
```

> **Tip:** Usa formato `.webp` para imágenes más ligeras y carga más rápida.

## Despliegue en Vercel

### Opción A — Desde la interfaz web (recomendado)
1. Ve a [vercel.com](https://vercel.com) → **New Project**
2. Conecta tu repositorio de GitHub con esta carpeta
3. Deja todos los campos en blanco (sin build command, sin output dir)
4. Haz clic en **Deploy** ✅

### Opción B — Con Vercel CLI
```bash
npm i -g vercel
cd "carrousel 2"
vercel --prod
```

## Desarrollo local (sin instalación)

Abre `index.html` directamente en el navegador, **o** usa un servidor local:

```bash
# Python (viene con macOS)
python3 -m http.server 3000
# Luego abre: http://localhost:3000
```
