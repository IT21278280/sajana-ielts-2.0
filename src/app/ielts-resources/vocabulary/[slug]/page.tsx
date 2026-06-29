import Image from 'next/image'
import {notFound} from 'next/navigation'

import {client, urlForImage} from '@/sanity/client'

export const revalidate = 60

type VocabularyWord = {
  word?: string
  partOfSpeech?: string
  definition?: string
  ieltsExampleSentence?: string
}

type VocabularyDoc = {
  topic: string
  slug: {current?: string}
  featuredImage?: {asset?: {url?: string}}
  downloadableGuide?: {asset?: {url?: string}}
  mockAssignments?: Array<{asset?: {url?: string}}>
  wordList?: VocabularyWord[]
}

export default async function VocabularyDetailPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params

  const vocabulary = await client.fetch<VocabularyDoc | null>(
    `*[_type == "vocabulary" && slug.current == $slug][0]{topic, slug, featuredImage{asset->{url}}, downloadableGuide{asset->{url}}, mockAssignments[]{asset->{url}}, wordList[]{word, partOfSpeech, definition, ieltsExampleSentence}}`,
    {slug},
  )

  if (!vocabulary) {
    notFound()
  }

  return (
    <main className="bg-[#F8FAFC] px-4 py-14 sm:px-6 lg:px-8">
      <article className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Vocabulary Lesson</p>
        <h1 className="mt-3 text-3xl font-bold text-[#0F172A]">{vocabulary.topic}</h1>

        {vocabulary.featuredImage ? (
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <Image
              src={urlForImage(vocabulary.featuredImage).width(1400).height(720).fit('crop').url()}
              alt={vocabulary.topic}
              width={1400}
              height={720}
              className="h-auto w-full"
            />
          </div>
        ) : null}

        {vocabulary.downloadableGuide?.asset?.url ? (
          <div className="mt-6">
            <a
              href={vocabulary.downloadableGuide.asset.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-lg bg-[#D4AF37] px-5 py-3 font-semibold text-[#0F172A] transition hover:brightness-110"
            >
              Download Free PDF Guide / Worksheet
            </a>
          </div>
        ) : null}

        {vocabulary.mockAssignments?.length ? (
          <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-[#0F172A]">Mock Assignments</h2>
            <ul className="mt-3 space-y-2">
              {vocabulary.mockAssignments.map((item, index) =>
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

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-[#0F172A]">Word List</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {(vocabulary.wordList ?? []).map((entry, index) => (
              <article
                key={`${entry.word ?? 'entry'}-${index}`}
                className="rounded-lg border border-slate-200 border-l-4 border-l-[#D4AF37] bg-slate-50 p-4"
              >
                <p className="text-base font-semibold text-[#0F172A]">{entry.word}</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">{entry.partOfSpeech}</p>
                <p className="mt-3 text-sm text-slate-700">{entry.definition}</p>
                <p className="mt-3 text-sm text-slate-700">
                  <span className="font-semibold">IELTS Example:</span> {entry.ieltsExampleSentence}
                </p>
              </article>
            ))}
          </div>
          {(vocabulary.wordList ?? []).length === 0 ? (
            <p className="mt-4 text-sm text-slate-600">No vocabulary entries have been added yet.</p>
          ) : null}
        </section>
      </article>
    </main>
  )
}
