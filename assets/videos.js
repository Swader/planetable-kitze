/**
 * Kitze Video Gallery
 * Renders YouTube videos with filtering by category
 */

(function() {
  'use strict';

  // Check if video config exists
  if (!window.KITZE_VIDEOS) {
    console.warn('KITZE_VIDEOS not found. Add video configuration to page.');
    return;
  }

  const config = window.KITZE_VIDEOS;
  let allVideos = [];
  let activeCategory = 'all';

  // Fetch video metadata from YouTube
  async function fetchVideoMeta(videoId) {
    try {
      const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      return {
        title: data.title,
        thumbnail: data.thumbnail_url,
        author: data.author_name
      };
    } catch (e) {
      console.error('Failed to fetch video meta for', videoId, e);
      return {
        title: 'Video',
        thumbnail: `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`,
        author: ''
      };
    }
  }

  // Build video object with metadata
  async function buildVideoData() {
    const videos = config.videos || [];
    const promises = videos.map(async (video) => {
      const meta = await fetchVideoMeta(video.id);
      return {
        id: video.id,
        url: `https://www.youtube.com/watch?v=${video.id}`,
        title: meta.title,
        thumbnail: meta.thumbnail,
        author: meta.author,
        date: video.date || '',
        categories: video.categories || []
      };
    });
    
    allVideos = await Promise.all(promises);
    return allVideos;
  }

  // Collect all unique categories
  function getCategories(videos) {
    const categories = new Set();
    videos.forEach(v => {
      (v.categories || []).forEach(cat => categories.add(cat));
    });
    return Array.from(categories).sort();
  }

  // Render category filter buttons
  function renderCategoryFilter(categories) {
    const container = document.getElementById('video-category-filter');
    if (!container || categories.length === 0) return;

    container.innerHTML = '';
    
    // "All" button
    const allBtn = document.createElement('button');
    allBtn.className = 'video-cat-btn active';
    allBtn.textContent = 'All Videos';
    allBtn.setAttribute('data-category', 'all');
    allBtn.addEventListener('click', () => filterVideos('all'));
    container.appendChild(allBtn);

    // Category buttons
    categories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = 'video-cat-btn';
      btn.textContent = cat;
      btn.setAttribute('data-category', cat);
      btn.addEventListener('click', () => filterVideos(cat));
      container.appendChild(btn);
    });
  }

  // Filter videos by category
  function filterVideos(category) {
    activeCategory = category;
    
    // Update button states
    document.querySelectorAll('.video-cat-btn').forEach(btn => {
      if (btn.getAttribute('data-category') === category) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Filter video cards
    const cards = document.querySelectorAll('.video-card');
    cards.forEach(card => {
      const categories = card.getAttribute('data-categories');
      if (category === 'all' || categories.includes(category)) {
        card.style.display = 'block';
      } else {
        card.style.display = 'none';
      }
    });
  }

  // Render video grid
  function renderVideos(videos) {
    const container = document.getElementById('video-grid');
    if (!container) return;

    container.innerHTML = videos.map(video => `
      <a href="${video.url}" target="_blank" rel="noopener noreferrer" class="video-card" data-categories="${video.categories.join(',')}">
        <div class="video-card-thumbnail">
          <img src="${video.thumbnail}" alt="${video.title}" loading="lazy" />
          <div class="video-card-play">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="white">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </div>
        <div class="video-card-content">
          <h3 class="video-card-title">${video.title}</h3>
          ${video.date ? `<div class="video-card-date">${video.date}</div>` : ''}
          ${video.categories.length ? `
            <div class="video-card-categories">
              ${video.categories.map(cat => `<span class="video-card-cat">${cat}</span>`).join('')}
            </div>
          ` : ''}
        </div>
      </a>
    `).join('');
  }

  // Initialize
  async function init() {
    const loadingEl = document.getElementById('video-loading');
    if (loadingEl) loadingEl.style.display = 'block';

    const videos = await buildVideoData();
    const categories = getCategories(videos);

    if (loadingEl) loadingEl.style.display = 'none';

    renderCategoryFilter(categories);
    renderVideos(videos);
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();

