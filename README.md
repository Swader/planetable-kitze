# Kitze Theme

A Planetable theme inspired by [kitze.io](https://kitze.io) featuring a 3-column layout with sidebar navigation, profile mid-bar, and main content area.

## Layout Structure

- **Sidebar** (left, 80px): Icon-based navigation with hover tooltips
- **Mid-bar** (center, 400px): Profile, stats, upcoming events, projects
- **Main** (right): Blog posts and page content
- **Mobile**: Bottom sheet menu with hamburger toggle

## Configuration Files

### 1. Sidebar Navigation (`assets/kitze.config.json`)

Controls the left sidebar navigation items:

```json
{
  "sidebar": [
    { "id": "user", "title": "User", "type": "user", "icon": "user.svg" },
    { "id": "home", "title": "Home", "type": "page", "slug": "home", "icon": "home.svg", "separator": true },
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

**Item Types:**
- `user` - Shows user avatar (auto-loads from Planet's uploaded avatar)
- `home`/`index` - Links to site root or blog index
- `page` - Links to a Page by `slug` (or `id` fallback)
- `tag` - Links to tag listing (requires `generateTagPages: true` in `template.json`)
- `link` - External URL (opens in new tab)
- `theme` - Theme toggle button (cycles Light → Dark → Auto)

**Options:**
- `separator: true` - Adds horizontal divider line before item
- `visible: false` - Hides item without deleting from config

**Icons:**
- Loaded from `assets/icons/{icon}` with fallback to `assets/{icon}`
- Auto-adjusts color for light/dark themes

### 2. Mid-Bar Content (`assets/kitze-midbar.json`)

Controls the center profile column content:

```json
{
  "stats": {
    "followers": "74.5K",
    "subscribers": "7.5K",
    "views": "251K"
  },
  "upcoming": [
    {
      "type": "talk",
      "title": "React Native London",
      "date": "NOV 13",
      "location": "London, UK",
      "flag": "🇬🇧",
      "url": ""
    }
  ],
  "projects": [
    {
      "icon": "📱",
      "title": "Sizzy",
      "url": ""
    }
  ],
  "ctas": [
    {
      "icon": "👥",
      "title": "Meet",
      "url": "https://cal.com/",
      "primary": true
    },
    {
      "icon": "🛍️",
      "title": "Merch",
      "url": "",
      "primary": false
    }
  ]
}
```

**Mid-Bar Sections:**

1. **Header** (auto-populated from Planet):
   - Avatar (from uploaded image)
   - Name (from `planet.name`)
   - About (from page description)
   - Social links (GitHub, Twitter)

2. **Stats** - Display custom metrics:
   - Followers, Subscribers, Views
   - Any 3 metrics you want to track

3. **Upcoming** - Events list (up to 10 items):
   - Conference talks
   - X/Twitter Spaces
   - Podcast appearances
   - Workshops
   - Other events
   - Each with date, location, flag emoji, optional URL

4. **Projects** - Project showcase:
   - Emoji icon + title
   - Optional URL for each project

5. **CTAs** - Call-to-action buttons:
   - `primary: true` - Dark button (Meet)
   - `primary: false` - Light button (Merch)

## Theme Toggle

The theme toggle cycles through 3 states:
1. **Light** → Click shows "Switch to Dark"
2. **Dark** → Click shows "Switch to Auto"  
3. **Auto** → Click shows "Switch to Light" (follows system preference)

Theme preference is saved to localStorage and persists across sessions.

## Mobile Experience

Tap the menu button (☰) to open a bottom-sheet with a grid of navigation items. The sheet:
- Blurs the background with overlay
- Supports ESC key and click-to-dismiss
- Locks body scroll while open
- Smooth slide-up animation

## Responsive Breakpoints

- **1200px+**: Full 3-column layout (sidebar + mid-bar + content)
- **900-1200px**: 2-column (sidebar + content, mid-bar hidden)
- **<900px**: 1-column mobile with bottom sheet menu

## Planet Variables

The theme automatically uses these Planet variables:
- `planet.name` - Your site name
- `has_avatar` - Shows avatar when uploaded in Planet
- `page_description_html` - About text
- `planet.twitterUsername` - Twitter profile link
- `planet.githubUsername` - GitHub profile link
- `assets_prefix` - Asset path handling
