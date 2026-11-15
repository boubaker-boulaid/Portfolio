/*
 * Blog teasers. `date` values are placeholders, and `url` should point at the
 * published article once it exists (until then the card links back to the
 * blog section). `thumb` selects one of the illustrations in ArticleThumb.jsx.
 */
export const articles = [
  {
    id: 'laravel-tips',
    title: 'Laravel Tips Every Developer Should Know',
    date: '2026-11-10',
    thumb: 'code',
    url: '#blog',
  },
  {
    id: 'switched-to-linux',
    title: 'Why I Switched to Linux for Development',
    date: '2026-11-05',
    thumb: 'linux',
    url: '#blog',
  },
  {
    id: 'vscode-productivity',
    title: 'Boost Your Productivity with VS Code',
    date: '2026-10-28',
    thumb: 'vscode',
    url: '#blog',
  },
];

// Where "View All Articles" goes. Point it at your blog index when it is live.
export const blogUrl = '#blog';
