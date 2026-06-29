import type {MetadataRoute} from 'next'

import {client} from '@/sanity/client'

const staticRoutes = [
  '/',
  '/about',
  '/ielts-courses',
  '/ielts-resources',
  '/ielts-reading',
  '/ielts-writing',
  '/ielts-listening',
  '/ielts-speaking',
  '/pre-ielts',
  '/contact',
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [cueCards, essays, vocabularyItems, readingResources, writingResources, listeningResources, speakingResources, preIeltsResources] = await Promise.all([
    client.fetch<Array<{slug: string}>>(`*[_type == "cueCard" && defined(targetSlug.current)]{ "slug": targetSlug.current }`),
    client.fetch<Array<{slug: string}>>(`*[_type == "essay" && defined(slug.current)]{ "slug": slug.current }`),
    client.fetch<Array<{slug: string}>>(`*[_type == "vocabulary" && defined(slug.current)]{ "slug": slug.current }`),
    client.fetch<Array<{slug: string}>>(`*[_type == "readingResource" && defined(slug.current)]{ "slug": slug.current }`),
    client.fetch<Array<{slug: string}>>(`*[_type == "writingResource" && defined(slug.current)]{ "slug": slug.current }`),
    client.fetch<Array<{slug: string}>>(`*[_type == "listeningResource" && defined(slug.current)]{ "slug": slug.current }`),
    client.fetch<Array<{slug: string}>>(`*[_type == "speakingResource" && defined(slug.current)]{ "slug": slug.current }`),
    client.fetch<Array<{slug: string}>>(`*[_type == "preIeltsResource" && defined(slug.current)]{ "slug": slug.current }`),
  ])

  const baseUrl = 'https://sajanaielts.com'
  const now = new Date()

  return [
    ...staticRoutes.map((route) => ({
      url: `${baseUrl}${route}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: route === '/' ? 1 : 0.8,
    })),
    ...cueCards.map((item) => ({
      url: `${baseUrl}/ielts-resources/speaking/${item.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...essays.map((item) => ({
      url: `${baseUrl}/ielts-resources/essays/${item.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...vocabularyItems.map((item) => ({
      url: `${baseUrl}/ielts-resources/vocabulary/${item.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...readingResources.map((item) => ({
      url: `${baseUrl}/ielts-reading/${item.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...writingResources.map((item) => ({
      url: `${baseUrl}/ielts-writing/${item.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...listeningResources.map((item) => ({
      url: `${baseUrl}/ielts-listening/${item.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...speakingResources.map((item) => ({
      url: `${baseUrl}/ielts-speaking/${item.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
    ...preIeltsResources.map((item) => ({
      url: `${baseUrl}/pre-ielts/${item.slug}`,
      lastModified: now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    })),
  ]
}
