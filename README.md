# Kitze Theme

The theme adds a configurable sidebar (desktop) and a mobile bottom-sheet menu.

## Features

- **User icon** at the top of the sidebar
- **Theme toggle** at the bottom of the sidebar (cycles: Light → Dark → Auto)
- **Hover tooltips**: icons only by default, text appears on hover to the right
- **Mobile bottom sheet**: tap ☰ to open, with icons in a 3-column grid

## Configure items in `assets/kitze.config.json`:

```json
{
  "sidebar": [
    { "id": "user", "title": "User", "type": "user", "icon": "user.svg" },
    { "id": "home", "title": "Home", "type": "home", "icon": "home.svg", "separator": true },
    { "id": "blog", "title": "Blog", "type": "index", "icon": "pencil.svg" },
    { "id": "videos", "title": "Videos", "type": "tag", "tag": "video", "icon": "video.svg" },
    { "id": "podcasts", "title": "Podcasts", "type": "tag", "tag": "podcast", "icon": "microphone.svg" },
    { "id": "projects", "title": "Projects", "type": "page", "slug": "projects", "icon": "layers.svg" },
    { "id": "tools", "title": "Tools", "type": "page", "slug": "tools", "icon": "gear.svg" },
    { "id": "meet", "title": "Meet", "type": "link", "href": "https://cal.com/", "icon": "people.svg" },
    { "id": "theme", "title": "Theme", "type": "theme", "icon": "theme.svg", "separator": true }
  ]
}
```

## Types:

- `home`/`index`: site root.
- `page`: link to a Page by `slug` (or `id` fallback).
- `tag`: link to tag listing (requires `generateTagPages: true` in `template.json`).
- `link`: external URL (opens in new tab).
- `user`: displays user icon (no link).
- `theme`: theme toggle button (cycles light/dark/auto).

Optional: set `visible: false` to hide an item, or `separator: true` to add a divider line.

Icons are loaded from `assets/icons/{icon}` then fall back to `assets/{icon}`.

## Theme Toggle

The theme toggle cycles through 3 states:
1. **Light** → Click shows "Switch to Dark"
2. **Dark** → Click shows "Switch to Auto"  
3. **Auto** → Click shows "Switch to Light" (follows system preference)

Theme preference is saved to localStorage and persists across sessions.

Mobile: tap the menu button (☰) to open a bottom-sheet with a grid of the same items. The sheet blurs the background, supports ESC/click-to-dismiss, and locks body scroll while open.