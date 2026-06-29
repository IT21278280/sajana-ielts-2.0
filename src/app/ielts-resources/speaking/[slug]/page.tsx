import {notFound} from 'next/navigation'
import Image from 'next/image'

import {client, urlForImage} from '@/sanity/client'

export const revalidate = 60

type CueCard = {
  title: string
  targetSlug: {current?: string}
  featuredImage?: {asset?: {url?: string}}
  downloadableGuide?: {asset?: {url?: string}}
  mockAssignments?: Array<{asset?: {url?: string}}>
  part2Prompts: string
  sampleModelAnswerMarkdown: string
  essentialVocabularyIdioms?: Array<{
    expression?: string
    entryType?: string
    meaning?: string
    exampleUsage?: string
  }>
  _createdAt: string
}

export default async function SpeakingCueCardPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params

  const cueCard = await client.fetch<CueCard | null>(
    `*[_type == "cueCard" && targetSlug.current == $slug][0]{title, targetSlug, featuredImage{asset->{url}}, downloadableGuide{asset->{url}}, mockAssignments[]{asset->{url}}, part2Prompts, sampleModelAnswerMarkdown, essentialVocabularyIdioms, _createdAt}`,
    {slug},
  )

  if (!cueCard) {
    notFound()
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: cueCard.title,
    description: cueCard.part2Prompts,
    author: {
      '@type': 'Organization',
      name: 'Sajana IELTS Academy',
    },
    datePublished: cueCard._createdAt,
  }

  return (
    <main className="bg-[#F8FAFC] px-4 py-14 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{__html: JSON.stringify(structuredData)}}
      />
      <article className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Speaking Cue Card</p>
        <h1 className="mt-3 text-3xl font-bold text-[#0F172A]">{cueCard.title}</h1>

        {cueCard.featuredImage ? (
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <Image
              src={urlForImage(cueCard.featuredImage).width(1400).height(720).fit('crop').url()}
              alt={cueCard.title}
              width={1400}
              height={720}
              className="h-auto w-full"
            />
          </div>
        ) : null}

        {cueCard.downloadableGuide?.asset?.url ? (
          <div className="mt-6">
            <a
              href={cueCard.downloadableGuide.asset.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-lg bg-[#D4AF37] px-5 py-3 font-semibold text-[#0F172A] transition hover:brightness-110"
            >
              Download Free PDF Guide / Worksheet
            </a>
          </div>
        ) : null}

        {cueCard.mockAssignments?.length ? (
          <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-[#0F172A]">Mock Assignments</h2>
            <ul className="mt-3 space-y-2">
              {cueCard.mockAssignments.map((item, index) =>
                item.asset?.url ? (
                  <li key={`${item.asset.url}-${index}`}>
                    <a
                      href={item.asset.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-sm font-medium text-[#0F172A] underline decoration-[#D4AF37] decoration-2 underline-offset-4"
                    >
                      Assignment {index + 1}
                    </a>
                  </li>
                ) : null,
              )}
            </ul>
          </section>
        ) : null}

        <section className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
          <h2 className="text-lg font-semibold text-[#0F172A]">Part 2 Prompts</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">{cueCard.part2Prompts}</p>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-[#0F172A]">Sample Model Answer</h2>
          <div className="mt-3 text-sm leading-7 text-slate-700">
            <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 p-4">{cueCard.sampleModelAnswerMarkdown}</pre>
          </div>
        </section>

        {cueCard.essentialVocabularyIdioms?.length ? (
          <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-[#0F172A]">Essential Vocabulary / Idioms</h2>
            <div className="mt-4 space-y-3">
              {cueCard.essentialVocabularyIdioms.map((item, index) => (
                <div key={`${item.expression ?? 'entry'}-${index}`} className="rounded-lg border border-slate-200 p-4">
                  <p className="font-semibold text-[#0F172A]">{item.expression}</p>
                  <p className="text-sm text-slate-600">Type: {item.entryType}</p>
                  <p className="mt-2 text-sm text-slate-700">{item.meaning}</p>
                  <p className="mt-2 text-sm text-slate-700">Example: {item.exampleUsage}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}
      </article>
    </main>
  )
}
