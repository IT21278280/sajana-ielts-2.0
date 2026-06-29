import Link from 'next/link'

import ResourceHubLoadMore from '@/components/ResourceHubLoadMore'
import {client} from '@/sanity/client'

export const revalidate = 60

type FilterType =
  | 'all'
  | 'cue-card'
  | 'essay'
  | 'vocabulary'
  | 'reading'
  | 'writing'
  | 'listening'
  | 'speaking'
  | 'pre-ielts'

type UnifiedResource = {
  _id: string
  title: string
  slug: string
  section: FilterType
  sectionLabel: string
  summary: string
  href: string
  createdAt: string
}

type SortType = 'newest' | 'title'

const filterOptions: Array<{type: FilterType; label: string}> = [
  {type: 'all', label: 'All'},
  {type: 'cue-card', label: 'Cue Cards'},
  {type: 'essay', label: 'Sample Essays'},
  {type: 'vocabulary', label: 'Vocabulary'},
  {type: 'reading', label: 'Reading'},
  {type: 'writing', label: 'Writing'},
  {type: 'listening', label: 'Listening'},
  {type: 'speaking', label: 'Speaking'},
  {type: 'pre-ielts', label: 'Pre IELTS'},
]

function normalizeFilter(value?: string): FilterType {
  return (filterOptions.find((item) => item.type === value)?.type ?? 'all') as FilterType
}

function normalizeSort(value?: string): SortType {
  return value === 'title' ? 'title' : 'newest'
}

function buildQueryString(input: {type?: FilterType; q?: string; sort?: SortType}) {
  const params = new URLSearchParams()

  if (input.type && input.type !== 'all') {
    params.set('type', input.type)
  }

  if (input.q?.trim()) {
    params.set('q', input.q.trim())
  }

  if (input.sort && input.sort !== 'newest') {
    params.set('sort', input.sort)
  }

  const queryString = params.toString()
  return queryString ? `/ielts-resources?${queryString}` : '/ielts-resources'
}

function buildFilterLink(type: FilterType, query: string, sort: SortType) {
  return buildQueryString({type, q: query, sort})
}

export default async function IELTSResourcesPage({
  searchParams,
}: {
  searchParams?: Promise<{type?: string; q?: string; sort?: string}>
}) {
  const params = (await searchParams) ?? {}
  const selectedType = normalizeFilter(params.type)
  const query = (params.q ?? '').trim().toLowerCase()
  const rawQuery = params.q ?? ''
  const selectedSort = normalizeSort(params.sort)
  const initialVisibleCount = 9

  const [cueCards, essays, vocabularyItems, readingResources, writingResources, listeningResources, speakingResources, preIeltsResources] =
    await Promise.all([
      client.fetch<Array<{_id: string; title: string; slug: string; topicCategory?: string; _createdAt: string}>>(
        `*[_type == "cueCard" && defined(targetSlug.current)] | order(_createdAt desc)[0...80]{_id, title, "slug": targetSlug.current, topicCategory, _createdAt}`,
      ),
      client.fetch<Array<{_id: string; questionTitle: string; slug: string; essayType?: string; _createdAt: string}>>(
        `*[_type == "essay" && defined(slug.current)] | order(_createdAt desc)[0...80]{_id, questionTitle, "slug": slug.current, essayType, _createdAt}`,
      ),
      client.fetch<Array<{_id: string; topic: string; slug: string; _createdAt: string}>>(
        `*[_type == "vocabulary" && defined(slug.current)] | order(_createdAt desc)[0...80]{_id, topic, "slug": slug.current, _createdAt}`,
      ),
      client.fetch<Array<{_id: string; title: string; slug: string; summary?: string; _createdAt: string}>>(
        `*[_type == "readingResource" && defined(slug.current)] | order(_createdAt desc)[0...80]{_id, title, "slug": slug.current, summary, _createdAt}`,
      ),
      client.fetch<Array<{_id: string; title: string; slug: string; summary?: string; _createdAt: string}>>(
        `*[_type == "writingResource" && defined(slug.current)] | order(_createdAt desc)[0...80]{_id, title, "slug": slug.current, summary, _createdAt}`,
      ),
      client.fetch<Array<{_id: string; title: string; slug: string; summary?: string; _createdAt: string}>>(
        `*[_type == "listeningResource" && defined(slug.current)] | order(_createdAt desc)[0...80]{_id, title, "slug": slug.current, summary, _createdAt}`,
      ),
      client.fetch<Array<{_id: string; title: string; slug: string; summary?: string; _createdAt: string}>>(
        `*[_type == "speakingResource" && defined(slug.current)] | order(_createdAt desc)[0...80]{_id, title, "slug": slug.current, summary, _createdAt}`,
      ),
      client.fetch<Array<{_id: string; title: string; slug: string; summary?: string; _createdAt: string}>>(
        `*[_type == "preIeltsResource" && defined(slug.current)] | order(_createdAt desc)[0...80]{_id, title, "slug": slug.current, summary, _createdAt}`,
      ),
    ])

  const allResources: UnifiedResource[] = [
    ...cueCards.map((item) => ({
      _id: item._id,
      title: item.title,
      slug: item.slug,
      section: 'cue-card' as const,
      sectionLabel: 'Cue Card',
      summary: item.topicCategory ? `Category: ${item.topicCategory}` : 'Speaking practice cue card',
      href: `/ielts-resources/speaking/${item.slug}`,
      createdAt: item._createdAt,
    })),
    ...essays.map((item) => ({
      _id: item._id,
      title: item.questionTitle,
      slug: item.slug,
      section: 'essay' as const,
      sectionLabel: 'Sample Essay',
      summary: item.essayType ? `Essay type: ${item.essayType}` : 'Band-style model essay resource',
      href: `/ielts-resources/essays/${item.slug}`,
      createdAt: item._createdAt,
    })),
    ...vocabularyItems.map((item) => ({
      _id: item._id,
      title: item.topic,
      slug: item.slug,
      section: 'vocabulary' as const,
      sectionLabel: 'Vocabulary',
      summary: 'Topic-focused vocabulary list and usage practice',
      href: `/ielts-resources/vocabulary/${item.slug}`,
      createdAt: item._createdAt,
    })),
    ...readingResources.map((item) => ({
      _id: item._id,
      title: item.title,
      slug: item.slug,
      section: 'reading' as const,
      sectionLabel: 'Reading',
      summary: item.summary ?? 'Reading strategy and passage practice',
      href: `/ielts-reading/${item.slug}`,
      createdAt: item._createdAt,
    })),
    ...writingResources.map((item) => ({
      _id: item._id,
      title: item.title,
      slug: item.slug,
      section: 'writing' as const,
      sectionLabel: 'Writing',
      summary: item.summary ?? 'Task response and structure development',
      href: `/ielts-writing/${item.slug}`,
      createdAt: item._createdAt,
    })),
    ...listeningResources.map((item) => ({
      _id: item._id,
      title: item.title,
      slug: item.slug,
      section: 'listening' as const,
      sectionLabel: 'Listening',
      summary: item.summary ?? 'Listening sections with answer tactics',
      href: `/ielts-listening/${item.slug}`,
      createdAt: item._createdAt,
    })),
    ...speakingResources.map((item) => ({
      _id: item._id,
      title: item.title,
      slug: item.slug,
      section: 'speaking' as const,
      sectionLabel: 'Speaking',
      summary: item.summary ?? 'Part 1-3 response fluency training',
      href: `/ielts-speaking/${item.slug}`,
      createdAt: item._createdAt,
    })),
    ...preIeltsResources.map((item) => ({
      _id: item._id,
      title: item.title,
      slug: item.slug,
      section: 'pre-ielts' as const,
      sectionLabel: 'Pre IELTS',
      summary: item.summary ?? 'Foundational language skill building',
      href: `/pre-ielts/${item.slug}`,
      createdAt: item._createdAt,
    })),
  ]

  const queryFilteredResources = allResources.filter((item) => {
    const matchesQuery = !query || `${item.title} ${item.summary} ${item.sectionLabel}`.toLowerCase().includes(query)
    return matchesQuery
  })

  const filterCounts = filterOptions.map((option) => ({
    ...option,
    count:
      option.type === 'all'
        ? queryFilteredResources.length
        : queryFilteredResources.filter((item) => item.section === option.type).length,
  }))

  const filteredResources = queryFilteredResources.filter((item) => {
    return selectedType === 'all' || item.section === selectedType
  })

  const sortedResources = [...filteredResources].sort((left, right) => {
    if (selectedSort === 'title') {
      return left.title.localeCompare(right.title)
    }

    return new Date(right.createdAt).getTime() - new Date(left.createdAt).getTime()
  })

  const loadMoreItems = sortedResources.map((item) => ({
    id: `${item.section}-${item._id}`,
    title: item.title,
    sectionLabel: item.sectionLabel,
    summary: item.summary,
    href: item.href,
  }))

  return (
    <main className="page-shell bg-transparent px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
          <div
            className="relative overflow-hidden px-6 py-12 sm:px-8 lg:px-10"
            style={{
              backgroundImage:
                "linear-gradient(110deg, rgba(15, 23, 42, 0.92), rgba(15, 23, 42, 0.78) 58%, rgba(23, 48, 77, 0.72)), url('https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=1600&q=80')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">IELTS Resources</p>
              <h1 className="mt-3 text-3xl font-bold text-white sm:text-4xl">Unified IELTS Resource Hub</h1>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">
                Search and filter all published resources across speaking, writing, reading, listening, pre-IELTS,
                vocabulary, cue cards, and essays from one place.
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200 bg-[#fffdf8] px-6 py-6 sm:px-8 lg:px-10">
          <form className="grid gap-3 lg:grid-cols-[1fr_220px_180px_auto]">
            <input
              type="search"
              name="q"
              defaultValue={rawQuery}
              placeholder="Search by title, module, or topic"
              className="rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-[#0F172A] outline-none ring-[#D4AF37] transition focus:ring-2"
            />
            <select
              name="type"
              defaultValue={selectedType}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-[#0F172A] outline-none ring-[#D4AF37] transition focus:ring-2"
            >
              {filterOptions.map((option) => (
                <option key={option.type} value={option.type}>
                  {option.label}
                </option>
              ))}
            </select>
            <select
              name="sort"
              defaultValue={selectedSort}
              className="rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-[#0F172A] outline-none ring-[#D4AF37] transition focus:ring-2"
            >
              <option value="newest">Sort: Newest</option>
              <option value="title">Sort: Title</option>
            </select>
            <button
              type="submit"
              className="rounded-lg bg-[#0F172A] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Apply
            </button>
          </form>

          <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium">
            {filterCounts.map((option) => (
              <Link
                key={option.type}
                href={buildFilterLink(option.type, rawQuery, selectedSort)}
                className={`rounded-full border px-4 py-2 transition ${
                  selectedType === option.type
                    ? 'border-[#D4AF37] bg-[#FFFBEE] text-[#0F172A]'
                    : 'border-slate-300 text-slate-600 hover:border-[#D4AF37]'
                }`}
              >
                {option.label} ({option.count})
              </Link>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-5 text-sm text-slate-600">
            <p>
              Showing {Math.min(initialVisibleCount, sortedResources.length)} initially from {sortedResources.length} matching resources
            </p>
          </div>
          </div>
        </div>

        {loadMoreItems.length > 0 ? (
          <ResourceHubLoadMore items={loadMoreItems} initialVisibleCount={initialVisibleCount} />
        ) : (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            <div className="rounded-xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-600 md:col-span-2 xl:col-span-3">
              No resources match this filter. Try a broader keyword or choose a different module.
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
