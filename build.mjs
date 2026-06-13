// Minimaler Build: nimmt die Quelldateien aus src/, minifiziert HTML, CSS und
// JS und legt das Ergebnis – zusammen mit den unveraenderten Bildern – in dist/
// ab. dist/ wird anschliessend von Cloudflare ausgeliefert (siehe wrangler.jsonc).
import { rm, mkdir, readFile, writeFile, cp } from "node:fs/promises";
import { minify as minifyHtml } from "html-minifier-terser";
import { minify as minifyJs } from "terser";
import CleanCSS from "clean-css";

const SRC = "src";
const OUT = "dist";

await rm(OUT, { recursive: true, force: true });
await mkdir(OUT, { recursive: true });

// CSS minifizieren
const css = await readFile(`${SRC}/styles.css`, "utf8");
const { styles, errors } = new CleanCSS().minify(css);
if (errors.length) throw new Error(`CSS: ${errors.join("\n")}`);
await writeFile(`${OUT}/styles.css`, styles);

// JS minifizieren
const js = await readFile(`${SRC}/script.js`, "utf8");
const { code } = await minifyJs(js);
await writeFile(`${OUT}/script.js`, code);

// HTML minifizieren (inkl. evtl. eingebettetem CSS/JS)
const html = await readFile(`${SRC}/index.html`, "utf8");
const minHtml = await minifyHtml(html, {
  collapseWhitespace: true,
  removeComments: true,
  minifyCSS: true,
  minifyJS: true,
});
await writeFile(`${OUT}/index.html`, minHtml);

// Bilder unveraendert uebernehmen
await cp(`${SRC}/images`, `${OUT}/images`, { recursive: true });

console.log("Build fertig → dist/");
