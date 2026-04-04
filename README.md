# Kitze Theme

A Planetable theme inspired by [kitze.io](https://kitze.io) featuring a 3-column
layout with sidebar navigation, profile mid-bar, and main content area.

## Feature Overview

- 3-column desktop layout with a dedicated sidebar, profile mid-bar, and content column
- Responsive collapse from desktop to tablet to mobile bottom-sheet navigation
- Config-driven icon sidebar with user avatar, page, tag, external-link, and theme-toggle items
- Route-aware sidebar active states derived from your configured internal pages and tags
- Profile mid-bar with social links, stats, upcoming appearances, project links, and CTA buttons
- Paginated blog index with optional hero images, audio/video badges, and quick-access tag filtering
- Generated tag pages, tag cloud, and archive page support
- Alias-aware tag display and optional tag hiding through `window.KITZE_TAG_CONFIG`
- Optional video gallery helper for YouTube pages
- Reusable project-card layout classes for rich custom pages
- Included paste-ready `projects` and `cv` snippets under `snippets/`

## Layout Structure

- **Sidebar** (left, 80px): Icon-based navigation with hover tooltips
- **Mid-bar** (center, 400px): Profile, stats, upcoming events, projects
- **Main** (right): Blog posts and page content
- **Mobile**: Bottom sheet menu with hamburger toggle

## Built-In Pages and Behaviors

`template.json` already enables the Planet features this theme expects:

- `generateIndexPagination: true`
- `generateTagPages: true`
- `generateArchive: true`

Out of the box, the theme styles and supports:

- **Blog index**: post cards, pagination, quick-access tags, video/audio badges, hero images
- **Single posts**: article tags, SEO modules, responsive content chrome
- **Tag pages**: tag title, article count, filtered index view
- **Tags overview**: tag cloud page rendered from Planet's generated tags
- **Archive**: generated archive page
- **Custom pages**: any Planet page rendered in the main content column

### Quick-Access Tag Filter

The main blog index automatically scans the visible cards and renders a tag
filter bar above them.

- Uses multi-select filtering with AND logic
- Hides the internal `blog` tag automatically
- Respects tag aliases and hidden quick-access tags from `window.KITZE_TAG_CONFIG`

### Sidebar Active-State Rules

The sidebar resolves active states from the actual configured internal routes,
instead of from a fixed hardcoded page list.

- The root/blog item is active on the site root and normal post pages
- Configured pages such as `/projects/`, `/cv/`, or `/writing/` win over the root/blog item
- Tag items stay active on their generated tag routes
- External links, theme toggle, and avatar entries never receive active state

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
- `index` - Links to the site root / blog index
- `home` - Legacy alias for `index`
- `page` - Links to a Page by `slug` (or `id` fallback)
- `tag` - Links to tag listing (requires `generateTagPages: true` in `template.json`)
- `link` - External URL (opens in new tab)
- `theme` - Theme toggle button (cycles Light → Dark → Auto)

**Options:**

- `separator: true` - Adds horizontal divider line before item
- `visible: false` - Hides item without deleting from config
- Sidebar active states are derived from configured page and tag destinations

**Icons:**

- Loaded from `assets/icons/{icon}` with fallback to `assets/{icon}`
- Auto-adjusts color for light/dark themes

#### Mid-Bar Content (`assets/kitze-midbar.json`)

Controls the center profile column content:

```json
{
  "stats": {
    "followers": "74.5K",
    "followersUrl": "https://x.com/yourhandle",
    "subscribers": "7.5K",
    "subscribersUrl": "https://youtube.com/@yourchannel",
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
   - Optional `followersUrl`, `subscribersUrl`, `viewsUrl` make stat cards clickable

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

**Tag Configuration:**

```html
<script>
window.KITZE_TAG_CONFIG = {
  hiddenQuickAccessTags: ['psychedelics'],
  hiddenTagCloudTags: ['internal-only'],
  aliases: {
    'artifical-intelligence': 'artificial-intelligence'
  },
  labels: {
    'artificial-intelligence': 'Artificial Intelligence'
  }
};
</script>
```

**Benefits:**

- Change config without editing files
- Different config per Planet site
- Override defaults dynamically
- Config managed in Planet UI

**Priority:** Custom code config takes precedence over JSON files.

### Tag Customization

`window.KITZE_TAG_CONFIG` lets you tune tag presentation without rewriting old
content.

- `hiddenQuickAccessTags` hides tags from the quick-access filter on the main blog page only
- `hiddenTagCloudTags` hides tags from the `/tags` cloud only
- `aliases` collapses typo or legacy slugs into a canonical slug for display/filtering
- `labels` overrides the visible label shown for a slug

Hidden quick-access tags still work on article tag pills and direct tag-page URLs.

This is a display-layer tool. If your content contains multiple actual tag
slugs, Planet will still generate separate static tag pages until you clean up
the source article tags themselves.

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

## Included Snippets

The repo ships with paste-ready page snippets under `snippets/`:

- `snippets/projects-page.html` - opinionated multi-section projects page using the theme's project-card system
- `snippets/cv-page.html` - CV/resume page with top-right photo slot, print-friendly styling, and a `Download PDF` button that calls `window.print()`

These are not auto-rendered by the theme. Paste them into Planet page content
and adapt the copy to your site.

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

## Practical Notes

- If Planet treats pasted HTML as code, remove indentation before pasting
- Keep `generateTagPages` enabled if you use sidebar tag items or rely on tag links
- Validate JSON config files with `jq '.' assets/kitze.config.json` and `jq '.' assets/kitze-midbar.json`
- After JavaScript changes, verify sidebar active states, tag filters, the theme toggle, and mobile sheet dismissal in Planet preview
