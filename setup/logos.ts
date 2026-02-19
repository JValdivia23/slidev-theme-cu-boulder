/**
 * Theme logos — bundled as Vite static imports.
 *
 * Vite resolves `import x from './image.png'` at build time into
 * hashed asset URLs (e.g. `assets/cu-logo-DxF3q.png`) that work
 * under any --base path (GitHub Pages sub-dirs, custom domains, etc.).
 *
 * Users can override either logo via themeConfig in their frontmatter:
 *
 *   themeConfig:
 *     logoUrl: /my-custom-logo.png
 *     logoRevUrl: /my-custom-logo-rev.png
 *     showLogo: false
 */
import cuLogo from '../assets/cu-logo.png';
import cuLogoRev from '../assets/cu-logo-rev.png';

export { cuLogo, cuLogoRev };
