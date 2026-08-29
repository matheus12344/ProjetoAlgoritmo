export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '/admin/'],
    },
    sitemap: 'https://www.andrefiker.com.br/sitemap.xml',
    host: 'https://www.andrefiker.com.br',
  }
}