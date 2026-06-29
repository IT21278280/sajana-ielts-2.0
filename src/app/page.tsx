import Link from "next/link";
import Image from "next/image";

import LeadForm from "@/components/LeadForm";
import { client, urlForImage } from "@/sanity/client";

const topResults = [
  {
    student: "Aarav S.",
    score: "Band 8.5",
    module: "Academic",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=260&q=80",
  },
  {
    student: "Nimasha P.",
    score: "Band 8.0",
    module: "General",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=260&q=80",
  },
  {
    student: "Hasini R.",
    score: "Band 7.5",
    module: "Academic",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=260&q=80",
  },
  {
    student: "Kasun M.",
    score: "Band 8.0",
    module: "General",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=260&q=80",
  },
  {
    student: "Tharushi K.",
    score: "Band 8.5",
    module: "Academic",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?auto=format&fit=crop&w=260&q=80",
  },
];

const moduleCards = [
  {
    title: "IELTS Reading",
    summary: "Passage strategy systems, skimming logic, and answer-location drills.",
    href: "/ielts-reading",
    image:
      "https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "IELTS Writing",
    summary: "Task 1 and Task 2 frameworks with band-oriented structure coaching.",
    href: "/ielts-writing",
    image:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "IELTS Listening",
    summary: "Section-by-section listening drills, prediction practice, and note capture.",
    href: "/ielts-listening",
    image:
      "https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "IELTS Speaking",
    summary: "Fluency-building cue cards, Part 1-3 coaching, and response patterns.",
    href: "/ielts-speaking",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Pre IELTS",
    summary: "Foundation grammar, vocabulary, and confidence-building starter tracks.",
    href: "/pre-ielts",
    image:
      "https://images.unsplash.com/photo-1462536943532-57a629f6cc60?auto=format&fit=crop&w=900&q=80",
  },
  {
    title: "Resource Hub",
    summary: "Search across lessons, essays, cue cards, vocabulary, and skill modules.",
    href: "/ielts-resources",
    image:
      "https://images.unsplash.com/photo-1513258496099-48168024aec0?auto=format&fit=crop&w=900&q=80",
  },
];

const coachingHighlights = [
  "Live correction with weekly accountability",
  "Band-focused writing and speaking feedback",
  "Structured modules for all four IELTS skills",
  "CMS-backed study resources updated from Sanity",
];

const outcomeStats = [
  { value: "8.5", label: "Top recent student band" },
  { value: "6", label: "Dedicated learning tracks" },
  { value: "1:1", label: "Focused feedback attention" },
  { value: "24/7", label: "Access to study resources" },
];

type LatestResource = {
  _id: string;
  _type: "readingResource" | "writingResource" | "listeningResource" | "speakingResource" | "preIeltsResource";
  title: string;
  slug: string;
  summary: string;
  featuredImage?: { asset?: { _ref?: string } };
};

const resourceRouteByType: Record<LatestResource["_type"], string> = {
  readingResource: "/ielts-reading",
  writingResource: "/ielts-writing",
  listeningResource: "/ielts-listening",
  speakingResource: "/ielts-speaking",
  preIeltsResource: "/pre-ielts",
};

const resourceLabelByType: Record<LatestResource["_type"], string> = {
  readingResource: "Reading",
  writingResource: "Writing",
  listeningResource: "Listening",
  speakingResource: "Speaking",
  preIeltsResource: "Pre IELTS",
};

export default async function HomePage() {
  const latestResources = await client.fetch<LatestResource[]>(
    `*[_type in ["readingResource", "writingResource", "listeningResource", "speakingResource", "preIeltsResource"]] | order(_createdAt desc)[0...8]{_id, _type, title, "slug": slug.current, summary, featuredImage{asset}}`
  );

  return (
    <main className="page-shell bg-transparent text-[#0F172A]">
      <section
        className="relative isolate overflow-hidden bg-[#0F172A]"
        style={{
          backgroundImage:
            "linear-gradient(115deg, rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.72) 48%, rgba(23, 48, 77, 0.60)), url('/images/classroom.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.32),transparent_22%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_28%)]" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-6 py-24 sm:py-28 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:py-32">
          <div>
            <p className="mb-4 inline-flex rounded-full border border-[#D4AF37] bg-[#D4AF37]/15 px-4 py-1 text-sm font-semibold text-[#D4AF37]">
              Sajana IELTS 2.0 Premium Coaching
            </p>
            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Build Your IELTS Score With A Cleaner Study System, Stronger Feedback, And Better Practice.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
              Train across speaking, writing, reading, and listening with guided weekly milestones,
              resource-backed lessons, and targeted correction designed for serious band improvement.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {coachingHighlights.map((item) => (
                <div key={item} className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm text-slate-100 backdrop-blur-sm">
                  {item}
                </div>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link
                href="#lead-form"
                className="rounded-full bg-[#D4AF37] px-7 py-3 text-base font-semibold text-[#0F172A] transition hover:brightness-110"
              >
                Book Free Demo
              </Link>
              <Link
                href="/ielts-resources"
                className="rounded-full border border-white/60 px-7 py-3 text-base font-semibold text-white transition hover:bg-white hover:text-[#0F172A]"
              >
                Explore Resource Hub
              </Link>
            </div>
          </div>

          <div className="grid gap-4 self-end sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-[28px] border border-white/12 bg-white/10 p-6 text-white shadow-2xl backdrop-blur-md">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Score Progress</p>
              <h2 className="mt-3 text-2xl font-bold">Weekly score-building workflow</h2>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Step 01</p>
                  <p className="mt-2 font-semibold">Diagnose weak areas</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Step 02</p>
                  <p className="mt-2 font-semibold">Train with curated resource modules</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-300">Step 03</p>
                  <p className="mt-2 font-semibold">Review feedback and repeat with precision</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto -mt-10 max-w-7xl px-6 lg:px-8">
        <div className="grid gap-4 rounded-[28px] border border-slate-200/70 bg-[#fffdf8]/95 p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] backdrop-blur sm:grid-cols-2 xl:grid-cols-4">
          {outcomeStats.map((item) => (
            <div key={item.label} className="rounded-2xl bg-[#fff8ea] px-5 py-5">
              <p className="text-3xl font-bold text-[#0F172A]">{item.value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Learning Modules</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0F172A]">Choose A Track That Matches Your Weakest Skill First</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Each module is built to reduce decision fatigue: focused topics, consistent layout, guided progression,
              and resource-backed practice.
            </p>
          </div>
          <Link href="/ielts-resources" className="text-sm font-semibold text-[#0F172A] underline decoration-[#D4AF37] decoration-2 underline-offset-4">
            View all resources
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {moduleCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-xl"
            >
              <div
                className="h-44 w-full bg-cover bg-center transition duration-500 group-hover:scale-[1.03]"
                style={{
                  backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.22), rgba(15, 23, 42, 0.12)), url('${card.image}')`,
                }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0F172A]">{card.title}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-600">{card.summary}</p>
                <span className="mt-5 inline-flex text-sm font-semibold text-[#0F172A] underline decoration-[#D4AF37] decoration-2 underline-offset-4">
                  Open module
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Latest Resources</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0F172A]">Fresh lessons added across all IELTS tracks</h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
              Newly published study materials from Reading, Writing, Listening, Speaking, and Pre IELTS.
            </p>
          </div>
          <Link href="/ielts-resources" className="text-sm font-semibold text-[#0F172A] underline decoration-[#D4AF37] decoration-2 underline-offset-4">
            Open full resource hub
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {latestResources.map((item) => {
            const baseRoute = resourceRouteByType[item._type];
            const label = resourceLabelByType[item._type];
            return (
              <Link
                key={item._id}
                href={`${baseRoute}/${item.slug}`}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-xl"
              >
                {item.featuredImage ? (
                  <div className="relative h-40 w-full overflow-hidden border-b border-slate-200">
                    <Image
                      src={urlForImage(item.featuredImage).width(900).height(500).fit("crop").url()}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>
                ) : null}
                <div className="p-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">{label}</p>
                  <h3 className="mt-2 text-lg font-bold text-[#0F172A] line-clamp-2">{item.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 line-clamp-3">{item.summary}</p>
                  <span className="mt-4 inline-flex text-sm font-semibold text-[#0F172A] underline decoration-[#D4AF37] decoration-2 underline-offset-4">
                    View lesson
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-[30px] border border-slate-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Mentor Approach</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0F172A]">A more disciplined path to band improvement</h2>
            <p className="mt-4 text-slate-700">
              Sajana IELTS is structured around clarity and correction. Students are not left guessing what to
              study next. Each week is mapped to a skill target, a resource pack, and a measurable outcome.
            </p>
            <p className="mt-3 text-slate-700">
              That makes the platform more than a library. It becomes a guided system where lessons, mock work,
              and feedback reinforce one another instead of sitting in separate silos.
            </p>
          </div>
          <div
            className="rounded-[30px] border border-slate-200 bg-[#0F172A] p-8 text-white shadow-sm"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.88)), url('/images/classroom.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Why It Works</p>
            <ul className="mt-5 space-y-4 text-sm leading-7 text-slate-200">
              <li>Focused modules reduce content overload.</li>
              <li>Searchable resources improve self-study efficiency.</li>
              <li>Repeated model structures help students internalize exam logic.</li>
              <li>Clear UI and consistent layouts lower friction across all pages.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Teaching Team ── */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="mb-10">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Teaching Team</p>
          <h2 className="mt-3 text-3xl font-bold text-[#0F172A]">
            Learn From Experienced IELTS Instructors
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">
            Our teachers bring structured exam strategy, band-specific feedback, and consistent coaching
            presence to every student&apos;s improvement journey.
          </p>
        </div>
        <div className="mx-auto max-w-3xl">
          <div className="group overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-[#D4AF37] hover:shadow-xl">
            <div className="relative h-96 overflow-hidden">
              <Image
                src="/images/teacher-sajana.jpg"
                alt="Sajana - IELTS Teacher"
                fill
                sizes="(max-width: 1024px) 100vw, 60vw"
                className="object-cover object-top transition duration-500 group-hover:scale-[1.03]"
              />
            </div>
            <div className="p-6">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">
                Founder &amp; Lead IELTS Teacher
              </p>
              <h3 className="mt-1 text-2xl font-bold text-[#0F172A]">Sajana</h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Sajana leads the complete IELTS programme with structured strategy classes,
                practical correction, and consistent mentoring for both Academic and General students.
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {["Writing", "Speaking", "Reading", "Listening", "Band Strategy"].map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#fff8ea] px-3 py-1 text-xs font-semibold text-[#0F172A]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#0F172A] py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Success Stories</p>
              <h2 className="mt-3 text-3xl font-bold text-white">Top Student Results</h2>
              <p className="mt-2 text-sm text-slate-300">Swipe to view recent score outcomes</p>
            </div>
            <Link
              href="#lead-form"
              className="rounded-full border border-[#D4AF37]/60 px-5 py-2 text-sm font-semibold text-[#D4AF37] transition hover:bg-[#D4AF37] hover:text-[#0F172A]"
            >
              Start Your Score Plan
            </Link>
          </div>
          <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
            {topResults.map((item) => (
              <article
                key={`${item.student}-${item.score}`}
                className="snap-start rounded-3xl border border-[#D4AF37]/35 bg-linear-to-b from-white/16 to-white/8 p-5 text-white shadow-[0_20px_40px_rgba(0,0,0,0.22)] backdrop-blur"
                style={{ minWidth: "278px" }}
              >
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">{item.module}</p>
                  <span className="rounded-full border border-emerald-300/40 bg-emerald-300/15 px-3 py-1 text-[11px] font-semibold text-emerald-100">
                    Verified
                  </span>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <Image
                    src={item.image}
                    alt={`${item.student} profile photo`}
                    width={60}
                    height={60}
                    className="h-15 w-15 rounded-full border-2 border-[#D4AF37]/80 object-cover"
                  />
                  <div>
                    <p className="text-base font-semibold text-white">{item.student}</p>
                    <p className="text-xs text-slate-300">Recent IELTS achiever</p>
                  </div>
                </div>
                <p className="mt-5 text-3xl font-bold text-white">{item.score}</p>
                <p className="mt-1 text-sm text-slate-200">Focused module strategy + guided feedback</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="lead-form" className="mx-auto max-w-7xl px-6 py-18 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
          <aside
            className="rounded-[30px] bg-[#0F172A] p-8 text-white"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15, 23, 42, 0.9), rgba(15, 23, 42, 0.84)), url('https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?auto=format&fit=crop&w=1200&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Contact</p>
            <h2 className="mt-4 text-3xl font-bold">Plan Your IELTS Pathway</h2>
            <p className="mt-4 text-slate-200">
              Share your current level and target band. We will review your profile and schedule a
              personalized strategy call.
            </p>
            <Link
              href="/contact#book-demo"
              className="mt-8 inline-flex rounded-lg bg-[#D4AF37] px-5 py-3 font-semibold text-[#0F172A] transition hover:brightness-110"
            >
              Book Free Demo
            </Link>
          </aside>
          <div className="rounded-[30px] border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <LeadForm />
          </div>
        </div>
      </section>

      <Link
        href="#lead-form"
        className="fixed bottom-6 right-6 rounded-full bg-[#D4AF37] px-5 py-3 text-sm font-bold text-[#0F172A] shadow-lg transition hover:brightness-110"
      >
        Book Free Demo
      </Link>
    </main>
  );
}
