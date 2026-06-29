import Image from 'next/image'

import {urlForImage} from '@/sanity/client'

type Block = {children?: Array<{text?: string}>}

type KeyVocabulary = {term?: string; meaning?: string; example?: string}

type SkillResourceDetailPageProps = {
  label: string
  title: string
  summary: string
  featuredImage?: {asset?: {url?: string}}
  downloadableGuide?: {asset?: {url?: string}}
  practiceSheets?: Array<{asset?: {url?: string}}>
  lessonContent?: Block[]
  keyVocabulary?: KeyVocabulary[]
}

export default function SkillResourceDetailPage({
  label,
  title,
  summary,
  featuredImage,
  downloadableGuide,
  practiceSheets,
  lessonContent,
  keyVocabulary,
}: SkillResourceDetailPageProps) {
  return (
    <main className="page-shell bg-transparent px-4 py-14 sm:px-6 lg:px-8">
      <article className="mx-auto w-full max-w-6xl overflow-hidden rounded-4xl border border-slate-200 bg-white shadow-sm">
        <div className="grid gap-10 p-8 lg:grid-cols-[1.15fr_0.85fr] lg:p-10">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">{label}</p>
            <h1 className="mt-3 text-3xl font-bold text-[#0F172A] lg:text-4xl">{title}</h1>
            <p className="mt-4 text-sm leading-7 text-slate-700">{summary}</p>

            {featuredImage ? (
              <div className="mt-7 overflow-hidden rounded-3xl border border-slate-200">
                <Image
                  src={urlForImage(featuredImage).width(1400).height(760).fit('crop').url()}
                  alt={title}
                  width={1400}
                  height={760}
                  loading="eager"
                  priority
                  className="h-auto w-full"
                />
              </div>
            ) : null}

            <div className="mt-7 flex flex-wrap gap-3">
              {downloadableGuide?.asset?.url ? (
                <a
                  href={downloadableGuide.asset.url}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-semibold text-[#0F172A] transition hover:brightness-110"
                >
                  Download Free Guide
                </a>
              ) : null}
            </div>

            <section className="mt-8 rounded-3xl border border-slate-200 bg-[#fff8ea] p-6">
              <h2 className="text-lg font-semibold text-[#0F172A]">Lesson Content</h2>
              <div className="mt-4 space-y-3 text-sm leading-7 text-slate-700">
                {(lessonContent ?? []).map((block, index) => (
                  <p key={index}>{(block.children ?? []).map((child) => child.text).join(' ')}</p>
                ))}
              </div>
            </section>
          </div>

          <div className="space-y-6">
            {(practiceSheets ?? []).length > 0 ? (
              <section className="rounded-3xl border border-slate-200 bg-white p-6">
                <h2 className="text-lg font-semibold text-[#0F172A]">Practice Sheets</h2>
                <ul className="mt-4 space-y-2">
                  {(practiceSheets ?? []).map((item, index) =>
                    item.asset?.url ? (
                      <li key={`${item.asset.url}-${index}`}>
                        <a
                          href={item.asset.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-sm font-medium text-[#0F172A] underline decoration-[#D4AF37] decoration-2 underline-offset-4"
                        >
                          Practice Sheet {index + 1}
                        </a>
                      </li>
                    ) : null,
                  )}
                </ul>
              </section>
            ) : null}

            {(keyVocabulary ?? []).length > 0 ? (
              <section className="rounded-3xl border border-slate-200 bg-[#0F172A] p-6 text-white">
                <h2 className="text-lg font-semibold">Key Vocabulary</h2>
                <div className="mt-4 space-y-3">
                  {(keyVocabulary ?? []).map((item, index) => (
                    <div key={`${item.term ?? 'item'}-${index}`} className="rounded-2xl bg-white/10 p-4">
                      <p className="font-semibold text-white">{item.term}</p>
                      <p className="mt-1 text-sm text-slate-200">{item.meaning}</p>
                      <p className="mt-2 text-sm text-slate-300">Example: {item.example}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </article>
    </main>
  )
}