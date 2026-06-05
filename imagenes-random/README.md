# 📸 Imagenes Random — Carrousel BellezzaByNaomi

Coloca aquí las imágenes que aparecerán en el carrousel giratorio.

## Formatos soportados
- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.avif`

## Instrucciones
1. Añade tus imágenes de diseños de uñas en esta carpeta.
2. Luego actualiza el array `DESIGN_IMAGES` en `index.html` con las rutas relativas:
   ```js
   const DESIGN_IMAGES = [
     "imagenes-random/mi-diseno-1.jpg",
     "imagenes-random/mi-diseno-2.png",
     // ...
   ];
   ```
3. Sube el proyecto a Vercel y las imágenes se servirán automáticamente.

## Tamaño recomendado
- Resolución: **600 × 840 px** (ratio 4:5, vertical)
- Peso máximo: **300 KB** por imagen (usa WebP para mejor compresión)
