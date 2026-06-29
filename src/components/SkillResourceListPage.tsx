import Link from 'next/link'
import Image from 'next/image'

import {urlForImage} from '@/sanity/client'

type SkillListItem = {
  _id: string
  title: string
  slug: string
  summary: string
  featuredImage?: {asset?: {_ref?: string}}
}

type SkillResourceListPageProps = {
  label: string
  title: string
  description: string
  items: SkillListItem[]
  hrefBase: string
  heroImage: string
}

export default function SkillResourceListPage({
  label,
  title,
  description,
  items,
  hrefBase,
  heroImage,
}: SkillResourceListPageProps) {
  return (
    <main className="page-shell bg-transparent text-[#0F172A]">
      <section
        className="relative overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(115deg, rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.76) 55%, rgba(23, 48, 77, 0.72)), url('${heroImage}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">{label}</p>
          <h1 className="mt-3 max-w-4xl text-4xl font-bold text-white lg:text-5xl">{title}</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-200">{description}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Published Lessons</p>
            <h2 className="mt-2 text-3xl font-bold text-[#0F172A]">Focused lessons with a consistent study structure</h2>
          </div>
          <div className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700">
            {items.length} resources
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item._id}
              href={`${hrefBase}/${item.slug}`}
              className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#D4AF37] hover:bg-[#FFFBEE] hover:shadow-lg"
            >
              {item.featuredImage ? (
                <div className="relative h-44 w-full overflow-hidden border-b border-slate-200">
                  <Image
                    src={urlForImage(item.featuredImage).width(900).height(500).fit('crop').url()}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition duration-500 group-hover:scale-[1.02]"
                  />
                </div>
              ) : null}

              <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">{label}</p>
              <h2 className="mt-3 text-xl font-bold text-[#0F172A]">{item.title}</h2>
              <p className="mt-3 text-sm leading-6 text-slate-600">{item.summary}</p>
              <span className="mt-5 inline-flex text-sm font-semibold text-[#0F172A] underline decoration-[#D4AF37] decoration-2 underline-offset-4">
                Open lesson
              </span>
              </div>
            </Link>
          ))}
          {items.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-8 text-sm text-slate-600 md:col-span-2 xl:col-span-3">
              No resources published yet.
            </div>
          ) : null}
        </div>
      </section>
    </main>
  )
}