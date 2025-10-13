# Repository Guidelines

## Project Structure & Module Organization
- `templates/` contains the Jinja-like theme layouts; `base.html` drives the frame, while `templates/modules/` holds reusable slices such as `nav.html`, `midbar.html`, and SEO blocks.
- `assets/` stores styling (`style.css`), sidebar and mid-bar configs (`kitze.config.json`, `kitze-midbar.json`), and icons under `assets/icons/` with top-level fallbacks.
- `hooks/` holds automation like `pre-commit.sh`, which recalculates `template.json`'s `buildNumber`; keep hook scripts executable and in place.
- `template.json` supplies metadata consumed by Planet; bump `version` when shipping visual tweaks and let the hook update `buildNumber`.

## Build, Test, and Development Commands
- `bash hooks/pre-commit.sh` — run manually if your Git hooks are not wired; regenerates the build number and stages `template.json`.
- `jq '.' assets/kitze.config.json` — quick JSON validation before pushing changes to navigation or mid-bar data.
- Planet desktop preview: Templates → Kitze → Preview. If you have the `planet` CLI, `planet preview kitze` mirrors that workflow and auto-reloads on save.

## Coding Style & Naming Conventions
- Use 2-space indentation for HTML templates and keep IDs/classes lowercase with hyphenated `kitze-` prefixes to avoid clashes.
- Maintain 4-space indentation in `assets/style.css`; group custom properties first, then related rules, followed by responsive modifiers.
- Embedded JavaScript in `templates/base.html` favors `const`/`let`, early returns, and small helpers (`applyTheme`, `openSheet`). Document new helpers with concise comments when behavior is non-obvious.
- Compress new SVGs with `svgo` before committing and keep filenames lowercase with words separated by dots (e.g., `calendar.fill.svg`).

## Testing Guidelines
- No automated suite exists. Validate desktop (≥1200px), tablet (~1024px), and mobile (<900px) breakpoints using the Planet preview.
- After editing JavaScript, confirm sidebar active states, theme toggle cycling (Light → Dark → Auto), and overlay dismissal via ESC/click.
- Run `jq '.'` against modified JSON assets and check for missing icons/CTAs in the preview before merging.

## Commit & Pull Request Guidelines
- Write imperative commit subjects (e.g., `Refine mid-bar project cards`) with optional bodies summarizing rationale and manual test results.
- Reference issues in the footer (`Refs #123`) and attach before/after screenshots or short clips to PRs for visual changes.
- Verify `template.json` reflects the intended `version` and hook-managed `buildNumber` prior to raising a PR.
- PR descriptions should call out scope, manual verification matrix, configuration changes, and any remaining follow-up tasks.
