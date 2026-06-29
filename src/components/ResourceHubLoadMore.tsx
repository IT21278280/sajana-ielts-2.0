'use client'

import {useMemo, useState} from 'react'

type ResourceHubItem = {
  id: string
  title: string
  sectionLabel: string
  summary: string
  href: string
}

type ResourceHubLoadMoreProps = {
  items: ResourceHubItem[]
  initialVisibleCount: number
}

export default function ResourceHubLoadMore({
  items,
  initialVisibleCount,
}: ResourceHubLoadMoreProps) {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount)

  const visibleItems = useMemo(() => items.slice(0, visibleCount), [items, visibleCount])
  const hasMore = visibleCount < items.length

  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {visibleItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-[#FFFBEE] hover:shadow-lg"
          >
            <span className="inline-flex rounded-full border border-[#D4AF37] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#0F172A]">
              {item.sectionLabel}
            </span>
            <h2 className="mt-3 text-lg font-bold text-[#0F172A]">{item.title}</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">{item.summary}</p>
          </a>
        ))}
      </div>

      {hasMore ? (
        <div className="mt-8 flex justify-center">
          <button
            type="button"
            onClick={() => setVisibleCount((count) => count + initialVisibleCount)}
            className="rounded-full bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            Load more resources
          </button>
        </div>
      ) : null}
    </>
  )
}