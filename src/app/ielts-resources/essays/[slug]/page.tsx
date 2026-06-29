import {notFound} from 'next/navigation'
import Image from 'next/image'

import {client, urlForImage} from '@/sanity/client'

export const revalidate = 60

type Essay = {
  questionTitle: string
  slug: {current?: string}
  featuredImage?: {asset?: {url?: string}}
  downloadableGuide?: {asset?: {url?: string}}
  mockAssignments?: Array<{asset?: {url?: string}}>
  essayType?: string
  examinerQuestion: string
  sampleAnswer: Array<{children?: Array<{text?: string}>}>
  bandScoreEvaluation: string
  _createdAt: string
}

export default async function EssayPage({
  params,
}: {
  params: Promise<{slug: string}>
}) {
  const {slug} = await params

  const essay = await client.fetch<Essay | null>(
    `*[_type == "essay" && slug.current == $slug][0]{questionTitle, slug, featuredImage{asset->{url}}, downloadableGuide{asset->{url}}, mockAssignments[]{asset->{url}}, essayType, examinerQuestion, sampleAnswer, bandScoreEvaluation, _createdAt}`,
    {slug},
  )

  if (!essay) {
    notFound()
  }

  return (
    <main className="bg-[#F8FAFC] px-4 py-14 sm:px-6 lg:px-8">
      <article className="mx-auto w-full max-w-5xl rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Sample Essay</p>
        <h1 className="mt-3 text-3xl font-bold text-[#0F172A]">{essay.questionTitle}</h1>
        <p className="mt-2 text-sm text-slate-600">Type: {essay.essayType ?? 'General'}</p>

        {essay.featuredImage ? (
          <div className="mt-6 overflow-hidden rounded-xl border border-slate-200">
            <Image
              src={urlForImage(essay.featuredImage).width(1400).height(720).fit('crop').url()}
              alt={essay.questionTitle}
              width={1400}
              height={720}
              className="h-auto w-full"
            />
          </div>
        ) : null}

        {essay.downloadableGuide?.asset?.url ? (
          <div className="mt-6">
            <a
              href={essay.downloadableGuide.asset.url}
              target="_blank"
              rel="noreferrer"
              className="inline-flex rounded-lg bg-[#D4AF37] px-5 py-3 font-semibold text-[#0F172A] transition hover:brightness-110"
            >
              Download Free PDF Guide / Worksheet
            </a>
          </div>
        ) : null}

        {essay.mockAssignments?.length ? (
          <section className="mt-6 rounded-xl border border-slate-200 bg-white p-6">
            <h2 className="text-lg font-semibold text-[#0F172A]">Mock Assignments</h2>
            <ul className="mt-3 space-y-2">
              {essay.mockAssignments.map((item, index) =>
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
          <h2 className="text-lg font-semibold text-[#0F172A]">Examiner Question</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">{essay.examinerQuestion}</p>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-[#0F172A]">Sample Answer</h2>
          <div className="mt-3 rounded-lg bg-slate-50 p-4 text-sm leading-7 text-slate-700">
            {essay.sampleAnswer?.map((block, index) => (
              <p key={index} className="mb-3 last:mb-0">
                {block.children?.map((child) => child.text).join(' ')}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-8 rounded-xl border border-slate-200 bg-white p-6">
          <h2 className="text-lg font-semibold text-[#0F172A]">Band Score Evaluation</h2>
          <p className="mt-3 whitespace-pre-line text-sm leading-7 text-slate-700">{essay.bandScoreEvaluation}</p>
        </section>
      </article>
    </main>
  )
}
