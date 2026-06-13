# WWE – 3. Liga (Hinge-Profil-Klon)

Ein statisches, durchscrollbares Fake-Hinge-Profil für humorvolle Social-Media-Posts
zur Spielerinnen-Suche in der 3. Roundnet-Liga. Reines HTML/CSS/JS, keine echte
Funktionalität – nur Optik.

## Struktur

```
src/               ← Quelldateien (hier wird editiert)
  index.html
  styles.css
  script.js
  images/          ← die fünf Profilfotos (siehe src/images/PLATZHALTER.md)
build.mjs          ← minifiziert src/ → dist/
dist/              ← Build-Output, der ausgeliefert wird (nicht eingecheckt)
wrangler.jsonc     ← Cloudflare-Deploy-Konfiguration
package.json       ← Build-, Dev- und Deploy-Skripte
```

Zum schnellen Iterieren genügt ein Doppelklick auf `src/index.html` – kein Server,
kein Build nötig. Der Build-Schritt ist nur fürs Deployment relevant.

## Build

```bash
npm install        # einmalig
npm run build      # minifiziert HTML/CSS/JS nach dist/
```

Der Build entfernt Kommentare und Whitespace und minifiziert CSS (clean-css),
JS (terser) und HTML (html-minifier-terser); die Bilder werden unverändert kopiert.

## Lokal mit Wrangler ansehen

```bash
npm run dev        # baut dist/ und startet http://localhost:8787
```

## Deployen

Alle Deploy-Skripte bauen automatisch vorher `dist/`. Das Projekt erscheint im
Cloudflare-Dashboard unter **Workers & Pages**. Vorab einmalig anmelden mit
`npx wrangler login`.

### Variante A – Workers (empfohlen, via `wrangler.jsonc`)

```bash
npm run deploy
```

### Variante B – Cloudflare Pages

Direkt-Upload des Build-Ordners:

```bash
npm run pages:deploy
```

Oder per Git-Anbindung im Dashboard (Pages → „Connect to Git“) mit diesen Einstellungen:

- **Build command:** `npm run build`
- **Build output directory:** `dist`

## Bilder nachliefern

Die Fotos mit den in `src/images/PLATZHALTER.md` genannten Dateinamen ablegen –
fehlende Bilder zeigen automatisch einen beschrifteten Platzhalter.
