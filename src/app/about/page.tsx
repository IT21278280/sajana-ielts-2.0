import Image from "next/image"
import Link from "next/link"

const stats = [
  { value: "500+", label: "Students coached" },
  { value: "8.5", label: "Highest band achieved" },
  { value: "95%", label: "Students hit their target" },
  { value: "4+", label: "Years of structured coaching" },
]

const teacher = {
  name: "Sajana",
  role: "Head Instructor & Founder",
  image: "/images/teacher-sajana.jpg",
  bio: "Sajana founded this coaching programme with a clear goal: give every student a structured, feedback-driven path to their target band. She leads classes across writing, speaking, reading, and listening with exam-focused strategy and practical correction.",
  specialisms: ["IELTS Writing", "Speaking", "Reading", "Listening", "Band Strategy"],
}

export default function AboutPage() {
  return (
    <main className="page-shell bg-transparent text-[#0F172A]">
      {/* ── Hero ── */}
      <section
        className="relative isolate overflow-hidden bg-[#0F172A] py-24 sm:py-28"
        style={{
          backgroundImage:
            "linear-gradient(rgba(15, 23, 42, 0.82), rgba(15, 23, 42, 0.75)), url('/images/classroom.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">About Us</p>
          <div className="mt-4 flex items-center gap-4">
            <div className="relative h-14 w-14 overflow-hidden rounded-full border border-white/20 bg-white/10 shadow-lg">
              <Image
                src="/images/logo-sajana.jpg"
                alt="Sajana IELTS logo"
                fill
                sizes="56px"
                className="object-cover"
                priority
              />
            </div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/80">Sajana IELTS 2.0</p>
          </div>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold text-white sm:text-5xl">
            We Build Confident, Score-Ready IELTS Learners
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-200">
            Sajana IELTS 2.0 is a structured coaching programme built around clear feedback, targeted
            skill-building, and real exam strategy for all four IELTS components.
          </p>
          <Link
            href="/contact#book-demo"
            className="mt-8 inline-flex rounded-full bg-[#D4AF37] px-7 py-3 font-semibold text-[#0F172A] transition hover:brightness-110"
          >
            Book Free Demo
          </Link>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="-mt-10 grid gap-4 rounded-[28px] border border-slate-200/60 bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)] sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="rounded-2xl bg-[#fff8ea] px-5 py-5">
              <p className="text-3xl font-bold text-[#0F172A]">{s.value}</p>
              <p className="mt-2 text-sm leading-6 text-slate-600">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="mx-auto max-w-6xl px-6 py-18 lg:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Our Mission</p>
            <h2 className="mt-3 text-3xl font-bold text-[#0F172A]">
              More than a resource library — a structured score plan
            </h2>
            <p className="mt-5 leading-7 text-slate-700">
              Most IELTS students struggle because they study without direction. They repeat the same weak
              patterns without understanding why their scores aren&apos;t improving.
            </p>
            <p className="mt-4 leading-7 text-slate-700">
              Sajana IELTS was built to remove that guesswork. Every lesson, module, and feedback session
              is designed around a clear and repeatable improvement process.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Structured weekly skill targets",
                "Real band-focused feedback on writing and speaking",
                "Resource-backed lessons for all four IELTS skills",
                "Dedicated teaching support with exam strategy clarity",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#D4AF37]" />
                  <p className="text-sm text-slate-700">{point}</p>
                </li>
              ))}
            </ul>
          </div>
          <div
            className="min-h-95 overflow-hidden rounded-[28px] border border-slate-200 shadow-sm"
            style={{
              backgroundImage:
                "linear-gradient(rgba(15, 23, 42, 0.1), rgba(15, 23, 42, 0.04)), url('/images/classroom.jpg')",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
        </div>
      </section>

      {/* ── Teaching Team ── */}
      <section className="bg-[#0F172A] py-20">
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Teaching Team</p>
          <h2 className="mt-3 text-3xl font-bold text-white">Meet Your Teacher</h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
            One dedicated mentor with a clear coaching method, consistent feedback, and practical IELTS
            strategy for every learner.
          </p>
          <div className="mt-10 mx-auto max-w-3xl">
            <article className="overflow-hidden rounded-[28px] border border-white/12 bg-white/8 backdrop-blur-sm">
              <div className="relative h-96 w-full overflow-hidden">
                <Image
                  src={teacher.image}
                  alt="Sajana - IELTS Teacher"
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-[#0F172A]/70 via-transparent to-transparent" />
              </div>
              <div className="p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">{teacher.role}</p>
                <h3 className="mt-1 text-2xl font-bold text-white">{teacher.name}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{teacher.bio}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {teacher.specialisms.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-[#D4AF37]/40 px-3 py-1 text-xs font-semibold text-[#D4AF37]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* ── Approach ── */}
      <section className="mx-auto max-w-6xl px-6 py-18 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_2fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">How We Coach</p>
            <h2 className="mt-3 text-2xl font-bold text-[#0F172A]">Our Approach</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600">
              A four-step cycle designed to identify weak areas, deliver targeted practice, provide
              band-referenced feedback, and track real improvement.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            {[
              {
                step: "01",
                title: "Diagnose",
                desc: "Identify your weakest skill areas and set a realistic band target with your instructor.",
              },
              {
                step: "02",
                title: "Train",
                desc: "Work through structured modules and practice materials for your specific target skills.",
              },
              {
                step: "03",
                title: "Feedback",
                desc: "Receive written and spoken correction with band-referenced guidance on each task.",
              },
              {
                step: "04",
                title: "Repeat",
                desc: "Track your improvement and refine the study plan as your target band approaches.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="rounded-[20px] border border-slate-200 bg-white p-5 shadow-sm"
              >
                <p className="text-3xl font-bold text-[#D4AF37]/50">{item.step}</p>
                <h3 className="mt-2 text-base font-bold text-[#0F172A]">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-6xl px-6 pb-20 lg:px-8">
        <div
          className="overflow-hidden rounded-[30px] p-10 text-white"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15, 23, 42, 0.88), rgba(15, 23, 42, 0.92)), url('/images/classroom.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Get Started</p>
          <h2 className="mt-3 max-w-xl text-3xl font-bold">Ready to Begin Your IELTS Journey?</h2>
          <p className="mt-3 max-w-xl text-slate-200">
            Book a free demo session and let our instructors assess your current level and map a clear path
            to your target band.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href="/contact#book-demo"
              className="rounded-full bg-[#D4AF37] px-7 py-3 font-semibold text-[#0F172A] transition hover:brightness-110"
            >
              Book Free Demo
            </Link>
            <Link
              href="/ielts-resources"
              className="rounded-full border border-white/60 px-7 py-3 font-semibold text-white transition hover:bg-white hover:text-[#0F172A]"
            >
              Explore Resources
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
