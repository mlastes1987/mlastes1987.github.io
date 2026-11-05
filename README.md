# mlastes1987 — Translations & ROM Hacks

A static portfolio for English fan translations and ROM hacks. No framework, package installation, third-party fonts, or build step required.

## Preview

Run `node tools/preview.mjs` and open `http://127.0.0.1:4174`.

## Maintain

- `index.html`: project cards, statuses, links, and Pokémon repository collection.
- `styles.css`: responsive layout. Screenshot previews share 16:9 frames and use `object-fit: contain` so images remain uncropped.
- `script.js`: project notes, screenshot captions, click-to-enlarge galleries, and filters.
- `assets/screenshots/`: authentic game captures; provenance is recorded in `assets/SOURCES.md`.

Keep cards and dialog notes in sync. Link only real public project pages or available patches. Clearly distinguish development captures, original Japanese screens, and illustrative artwork. Zool is intentionally excluded.

## Deploy

The GitHub Pages workflow publishes only the public HTML, CSS, JS, and assets when `main` changes. No secrets are required. If automatic enablement is restricted, set **Settings → Pages → Build and deployment → Source** to **GitHub Actions**, then rerun the workflow.

Expected address: https://mlastes1987.github.io/

Project information was checked against local documentation and public GitHub pages on November 5, 2026. Local development may be ahead of public repositories.

No ROMs, BIOS files, game executables, or private translation tools are included. Game screenshots depict material owned by the original rights holders; these are unofficial fan works.
