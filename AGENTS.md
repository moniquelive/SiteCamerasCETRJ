# Repository Guidelines

## Project Structure & Module Organization
- `config.yaml` defines the Hugo site config (base URL, language, theme).
- `content/` holds Hugo content pages and markdown.
- `data/` contains site data files (for example `data/cameras.json`).
- `static/` contains static assets copied directly to the site output.
- `themes/camerasrj/` is the active theme; layouts live in `themes/camerasrj/layouts/` and theme assets in `themes/camerasrj/static/`.
- `public/` is the generated build output (do not edit by hand).
- `_localizacao das cameras/` stores source CSVs and helper scripts for camera location data.

## Build, Test, and Development Commands
- `hugo server -D` runs the local dev server and includes drafts.
- `hugo --gc --minify` builds the production site into `public/`.
- `./build.sh` installs pinned toolchain versions (Dart Sass, Go, Hugo, Node) and builds the site; this is the command Cloudflare Workers use via `wrangler.toml`.

## Coding Style & Naming Conventions
- HTML/Hugo templates use 2-space indentation; keep the existing spacing and line breaks for diffs.
- JavaScript follows the style in `themes/camerasrj/static/js/` (2-space indent, semicolons).
- YAML files use 2-space indentation; avoid tabs.
- Prefer lowercase, hyphenated filenames for new content or assets (e.g., `content/cameras-ao-vivo.md`).

## Testing Guidelines
- There are no automated tests in this repository.
- Always verify changes by running `hugo --gc --minify`.
- For manual QA, run `hugo server -D` and review the generated pages under `public/`.

## Commit & Pull Request Guidelines
- Commit history mixes short, descriptive messages and Conventional Commit-style prefixes (e.g., `chore:`, `fix:`, `feat:`). Prefer concise present-tense messages under ~72 characters and avoid noisy commits.
- PRs should include: a clear summary, linked issue (if applicable), and screenshots for any visual/layout changes. Note any data source updates (CSV or JSON) explicitly.

## Data & Content Updates
- When updating camera lists, edit the source CSVs in `_localizacao das cameras/` and regenerate any derived files in `data/` if needed.
- Keep Portuguese content consistent with existing wording and accents in the UI.

## Deployment & Hosting
- Hosting and builds are configured for Cloudflare Workers via `wrangler.toml`.
- The build command runs `./build.sh`, which installs pinned toolchains and generates `public/`.
- Avoid editing `public/` directly; update source files and rebuild instead.
