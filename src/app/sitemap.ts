import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://rawwebsite-seven.vercel.app'

  // Define all your main routes here
  const routes = [
    '',
    '/about',
    '/team',
    '/gallery',
    '/competitions',
    '/robots-gallery',
    '/contact',
    '/register',
    '/sponsors'
  ]

  // Map over the routes and return the sitemap object
  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1 : 0.8,
  }))
}
