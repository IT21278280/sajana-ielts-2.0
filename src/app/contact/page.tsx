import LeadForm from '@/components/LeadForm'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A]">
      <main className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <section className="rounded-2xl bg-[#0F172A] p-8 text-white">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Contact</p>
            <h1 className="mt-3 text-4xl font-bold">Talk to the IELTS Team</h1>
            <p className="mt-4 text-lg leading-8 text-slate-200">
              Share your target band, current level, and preferred course. We will reply with a focused study plan and a demo class slot.
            </p>
          </section>

          <section id="book-demo" className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
            <LeadForm />
          </section>
        </div>
      </main>
    </div>
  )
}
