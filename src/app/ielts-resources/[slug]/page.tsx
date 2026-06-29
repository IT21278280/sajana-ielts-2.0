import { groq } from "next-sanity";
import { notFound } from "next/navigation";
import Image from "next/image";

import { client, urlForImage } from "@/sanity/client";

type PortableTextChild = {
  text?: string;
};

type PortableTextBlock = {
  _type?: string;
  children?: PortableTextChild[];
};

type ResourceItem = {
  title: string;
  featuredImage?: { asset?: { url?: string } };
  downloadableGuide?: { asset?: { url?: string } };
  mockAssignments?: Array<{ asset?: { url?: string } }>;
  part2Prompts?: string;
  sampleModelAnswerMarkdown?: string;
  sampleAnswer?: PortableTextBlock[];
  essentialVocabularyIdioms?: Array<Record<string, string | undefined>>;
};

const resourceQuery = groq`
  *[_type == "cueCard" && targetSlug.current == $slug][0]{
    title,
    featuredImage{asset->{url}},
    downloadableGuide{asset->{url}},
    mockAssignments[]{asset->{url}},
    part2Prompts,
    sampleModelAnswerMarkdown,
    essentialVocabularyIdioms
  }
`;

function toPlainText(blocks?: PortableTextBlock[]) {
  if (!blocks?.length) {
    return "";
  }

  return blocks
    .filter((block) => block?._type === "block")
    .map((block) => (block.children ?? []).map((child) => child.text ?? "").join(""))
    .join("\n\n");
}

export default async function DynamicResourcePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = await client.fetch<ResourceItem | null>(resourceQuery, { slug });

  if (!resource) {
    notFound();
  }

  const modelAnswer = resource.sampleModelAnswerMarkdown || toPlainText(resource.sampleAnswer);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <section className="bg-[#0F172A] py-14">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Resource Detail</p>
          <h1 className="mt-3 text-4xl font-bold text-white">{resource.title}</h1>
        </div>
      </section>

      <article className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-7 shadow-sm">
          {resource.featuredImage ? (
            <div className="mb-7 overflow-hidden rounded-xl border border-slate-200">
              <Image
                src={urlForImage(resource.featuredImage).width(1400).height(720).fit("crop").url()}
                alt={resource.title}
                width={1400}
                height={720}
                className="h-auto w-full"
              />
            </div>
          ) : null}

          {resource.downloadableGuide?.asset?.url ? (
            <a
              href={resource.downloadableGuide.asset.url}
              target="_blank"
              rel="noreferrer"
              className="mb-7 inline-flex rounded-lg bg-[#D4AF37] px-5 py-3 font-semibold text-[#0F172A] transition hover:brightness-110"
            >
              Download Free PDF Guide / Worksheet
            </a>
          ) : null}

          <section>
            <h2 className="text-2xl font-bold text-[#0F172A]">Part 2 Prompt</h2>
            <p className="mt-4 whitespace-pre-line text-slate-700">{resource.part2Prompts || "Prompt unavailable."}</p>
          </section>

          <section className="mt-10">
            <h2 className="text-2xl font-bold text-[#0F172A]">Sample Model Answer</h2>
            <div className="prose prose-slate mt-4 max-w-none whitespace-pre-line text-slate-700">
              {modelAnswer || "Model answer unavailable."}
            </div>
          </section>

          {resource.mockAssignments?.length ? (
            <section className="mt-10">
              <h2 className="text-2xl font-bold text-[#0F172A]">Mock Assignments</h2>
              <ul className="mt-4 space-y-2">
                {resource.mockAssignments.map((item, index) =>
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
        </div>

        <aside className="rounded-2xl border border-[#D4AF37]/50 bg-white p-7 shadow-sm">
          <h2 className="text-xl font-bold text-[#0F172A]">Essential Vocabulary And Idioms</h2>
          <div className="mt-5 space-y-4">
            {(resource.essentialVocabularyIdioms ?? []).length > 0 ? (
              resource.essentialVocabularyIdioms?.map((item, index) => {
                const [labelKey, labelValue] = Object.entries(item ?? {}).find(([, value]) => Boolean(value)) ?? [
                  "Item",
                  "",
                ];

                return (
                  <div
                    key={`${labelKey}-${index}`}
                    className="rounded-lg border border-slate-200 border-l-4 border-l-[#D4AF37] bg-slate-50 p-4"
                  >
                    <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">{labelKey}</p>
                    <p className="mt-1 font-medium text-slate-800">{labelValue || "Vocabulary item"}</p>
                  </div>
                );
              })
            ) : (
              <p className="text-sm text-slate-600">Vocabulary list will appear here once published in Sanity.</p>
            )}
          </div>
        </aside>
      </article>
    </main>
  );
}
