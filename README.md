# Kitze Theme

A Planetable theme inspired by [kitze.io](https://kitze.io) featuring a 3-column
layout with sidebar navigation, profile mid-bar, and main content area.

## Layout Structure

- **Sidebar** (left, 80px): Icon-based navigation with hover tooltips
- **Mid-bar** (center, 400px): Profile, stats, upcoming events, projects
- **Main** (right): Blog posts and page content
- **Mobile**: Bottom sheet menu with hamburger toggle

## Configuration Files

You can configure the theme in two ways:

1. **JSON files** (recommended): Edit `assets/kitze.config.json` and
   `assets/kitze-midbar.json`
2. **Custom Code** (advanced): Add JavaScript to Planet's custom code in
   `<head>` section

### Option 1: JSON Files (Recommended)

#### Sidebar Navigation (`assets/kitze.config.json`)

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

Tap the menu button (☰) to open a bottom-sheet with a grid of navigation items.
The sheet:

- Blurs the background with overlay
- Supports ESC key and click-to-dismiss
- Locks body scroll while open
- Smooth slide-up animation

## Responsive Breakpoints

- **1200px+**: Full 3-column layout (sidebar + mid-bar + content)
- **900-1200px**: 2-column (sidebar + content, mid-bar hidden)
- **<900px**: 1-column mobile with bottom sheet menu

### Option 2: Custom Code (Advanced)

You can override the configuration by adding JavaScript to Planet's **Custom Code** in the `<head>` section:

**Sidebar Configuration:**

```html
<script>
window.KITZE_CONFIG = {
  "sidebar": [
    { "id": "home", "title": "Home", "type": "page", "slug": "home", "icon": "home.svg" },
    { "id": "blog", "title": "Blog", "type": "index", "icon": "pencil.svg" }
  ]
};
</script>
```

**Mid-bar Configuration:**

```html
<script>
window.KITZE_MIDBAR_CONFIG = {
  "stats": {
    "followers": "100K",
    "followersUrl": "https://x.com/yourhandle",
    "subscribers": "10K",
    "views": "500K"
  },
  "upcoming": [],
  "projects": [],
  "ctas": []
};
</script>
```

**Benefits:**

- Change config without editing files
- Different config per Planet site
- Override defaults dynamically
- Config managed in Planet UI

**Priority:** Custom code config takes precedence over JSON files.

## Video Gallery

For video showcase pages (like `/videos/`), add this to your page content:

```html
<!-- Category filter (auto-generated) -->
<div id="video-category-filter" class="video-category-filter"></div>

<!-- Loading indicator -->
<div id="video-loading" class="video-loading" style="display:none;">Loading videos...</div>

<!-- Video grid (auto-populated) -->
<div id="video-grid" class="video-grid"></div>

<!-- Video configuration -->
<script>
window.KITZE_VIDEOS = {
  "videos": [
    {
      "id": "tOpY4dCWzJM",
      "date": "Dec 04, 2024",
      "categories": ["Polkadot", "Governance", "Web3"]
    },
    {
      "id": "ZkL5xuNVAS4",
      "date": "Jan 11, 2024",
      "categories": ["Webdev", "Best practices", "Decentralization"]
    }
  ]
};
</script>

<!-- Load video gallery script -->
<script src="../assets/videos.js"></script>
```

**How it works:**

1. Provide YouTube video IDs and categories
2. Script automatically fetches title and thumbnail from YouTube
3. Generates filterable video grid
4. Click categories to filter videos

**Video Object:**

- `id` (required): YouTube video ID
- `date` (optional): Display date
- `categories` (optional): Array of category tags for filtering

## Project Card View

For project showcase pages, use these HTML classes to create card layouts. Write
HTML/Markdown content directly in your Planet page.

> Note ⚠️: Markdown will interpret empty spaces in front of HTML as a code escape, so to make sure the code renders as HTML, and not as plaintext code in Markdown, don't use any indentation. E.g.:
> ```
> <div>
>     <div>
> ```
> vs
> ```
> <div>
> <div>
> ```

### Structure

**Page Layout:**

```html
<section class="project-section">     ← Main category (Startups, Teaching, etc.)
  └── <div class="project-grid-2">   ← Large 2-column cards
      
<section class="project-section">     ← Another main category (Side Projects)
  └── <div class="project-subsection"> ← Subcategory (Shipped & Live)
      └── <div class="project-grid-3"> ← Small 3-column cards
```

### Example: Large Cards (Startups, Teaching)

```html
<section class="project-section">
  <div class="project-section-icon">
    <svg><!-- Rocket icon --></svg>
    <h2>Startups</h2>
  </div>
  
  <div class="project-grid-2">
    <a href="https://sizzy.co" class="project-card">
      <div class="project-card-header">
        <div class="project-card-icon">
          <svg><!-- Phone icon --></svg>
        </div>
        <svg class="project-card-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M5 12h14M12 5l7 7-7 7"/>
        </svg>
      </div>
      <h3 class="project-card-title">Sizzy</h3>
      <p class="project-card-desc">Browser built for developers with responsive testing across all devices.</p>
    </a>
    <!-- More cards... -->
  </div>
</section>
```

### Example: Small Cards with Subsections

```html
<section class="project-section">
  <div class="project-section-icon">
    <svg><!-- Code icon --></svg>
    <h2>Side Projects</h2>
  </div>
  
  <div class="project-subsection">
    <h3 class="project-subsection-title">Shipped & Live</h3>
    <p class="project-subsection-desc">Projects ready for everyone to use.</p>
    
    <div class="project-grid-3">
      <a href="/hookz" class="project-card">
        <div class="project-card-header">
          <div class="project-card-icon project-card-icon-sm">
            <svg><!-- Icon --></svg>
          </div>
          <span class="project-card-status project-status-shipped">Shipped</span>
        </div>
        <div class="project-card-title-row">
          <h4 class="project-card-title project-card-title-sm">Hookz</h4>
          <svg class="project-card-arrow" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </div>
        <p class="project-card-desc project-card-desc-sm">Centralizes webhook payloads from every service.</p>
      </a>
      <!-- More cards... -->
    </div>
  </div>
  
  <div class="project-subsection">
    <h3 class="project-subsection-title">In Progress</h3>
    <p class="project-subsection-desc">Ideas currently being built.</p>
    <div class="project-grid-3">
      <!-- Cards here... -->
    </div>
  </div>
</section>
```

**Status Badge Classes:**

- `project-status-shipped` - Green (shipped/live)
- `project-status-beta` - Blue (not shipped yet)
- `project-status-soon` - Amber (shipping soon)
- `project-status-progress` - Yellow (in progress)
- `project-status-paused` - Red (paused/broken)
- `project-status-deprecated` - Gray (archived)

**CTA Section:**

```html
<section class="project-cta-section">
  <h2 class="project-cta-title">Interested in working together?</h2>
  <p class="project-cta-desc">Let's chat about your project.</p>
  <div class="project-cta-buttons">
    <a href="/meet" class="project-cta-primary">Schedule a Meeting</a>
    <a href="https://twitter.com/..." class="project-cta-secondary">Follow on Twitter</a>
  </div>
</section>
```

## Planet Variables

The theme automatically uses these Planet variables:

- `planet.name` - Your site name
- `has_avatar` - Shows avatar when uploaded in Planet
- `page_description_html` - About text
- `planet.twitterUsername` - Twitter profile link
- `planet.githubUsername` - GitHub profile link
- `assets_prefix` - Asset path handling
- `custom_code_head` - Custom JavaScript/CSS injection
- `custom_code_body_start` - Custom code at body start
- `custom_code_body_end` - Custom code at body end
