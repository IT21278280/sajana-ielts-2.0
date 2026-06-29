import type {MetadataRoute} from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/', '/studio', '/studio/', '/ielts-resources/speaking/private', '/dashboard'],
      },
    ],
    sitemap: 'https://sajanaielts.com/sitemap.xml',
  }
}
