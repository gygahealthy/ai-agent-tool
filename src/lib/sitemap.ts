import packages from '@/data/ketnoi_packages.json';

const SITE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://goicuocmobifone.net';

export const routes = [
  {
    url: '/',
    changefreq: 'daily',
    priority: 1.0,
  },
  {
    url: '/goi-cuoc',
    changefreq: 'daily',
    priority: 0.9,
  },
  {
    url: '/ho-tro',
    changefreq: 'weekly',
    priority: 0.8,
  },
  {
    url: '/tin-tuc',
    changefreq: 'daily',
    priority: 0.8,
  }
];

export function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
            xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
            xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
      ${routes
        .map(({ url, changefreq, priority }) => {
          return `
            <url>
              <loc>${SITE_URL}${url}</loc>
              <changefreq>${changefreq}</changefreq>
              <priority>${priority}</priority>
              <lastmod>${new Date().toISOString()}</lastmod>
            </url>
          `;
        })
        .join('')}
      ${packages
        .filter(pkg => pkg.status === 1)
        .sort((a, b) => a.displayOrder - b.displayOrder)
        .map((pkg) => {
          return `
            <url>
              <loc>${SITE_URL}/goi-cuoc/${pkg.ketnoiId}</loc>
              <changefreq>weekly</changefreq>
              <priority>0.7</priority>
              <lastmod>${new Date().toISOString()}</lastmod>
            </url>
          `;
        })
        .join('')}
    </urlset>`;
} 