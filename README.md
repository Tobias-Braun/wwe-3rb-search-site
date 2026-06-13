# WWE – 3. Liga (Hinge-Profil-Klon)

Ein statisches, durchscrollbares Fake-Hinge-Profil für humorvolle Social-Media-Posts
zur Spielerinnen-Suche in der 3. Roundnet-Liga. Reines HTML/CSS/JS – kein Build-Schritt,
keine echte Funktionalität, nur Optik.

## Struktur

```
public/            ← alles, was ausgeliefert wird
  index.html
  styles.css
  script.js
  images/          ← die fünf Profilfotos (siehe public/images/PLATZHALTER.md)
wrangler.jsonc     ← Cloudflare-Deploy-Konfiguration
package.json       ← Dev- und Deploy-Skripte
```

Lokal genügt ein Doppelklick auf `public/index.html` – kein Server nötig.

## Lokal mit Wrangler ansehen

```bash
npm install        # einmalig, installiert Wrangler
npm run dev        # startet http://localhost:8787
```

## Deployen

Beides erscheint anschließend im Cloudflare-Dashboard unter **Workers & Pages**.
Vorab einmalig anmelden mit `npx wrangler login`.

### Variante A – Workers (empfohlen, via `wrangler.jsonc`)

Liefert den `public/`-Ordner als „Static Assets“-Worker aus:

```bash
npm run deploy
```

### Variante B – Cloudflare Pages

Direkt-Upload desselben Ordners:

```bash
npm run pages:deploy
```

Oder per Git-Anbindung im Dashboard (Pages → „Connect to Git“) mit diesen Einstellungen:

- **Build command:** _leer lassen_ (kein Build nötig)
- **Build output directory:** `public`

## Bilder nachliefern

Die Fotos mit den in `public/images/PLATZHALTER.md` genannten Dateinamen ablegen –
fehlende Bilder zeigen automatisch einen beschrifteten Platzhalter.
