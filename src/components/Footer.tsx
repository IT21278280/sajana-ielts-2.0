import Image from 'next/image'
import Link from 'next/link'

const quickLinks = [
  {href: '/ielts-reading', label: 'Reading'},
  {href: '/ielts-writing', label: 'Writing'},
  {href: '/ielts-listening', label: 'Listening'},
  {href: '/ielts-speaking', label: 'Speaking'},
  {href: '/pre-ielts', label: 'Pre IELTS'},
  {href: '/ielts-resources', label: 'Resource Hub'},
]

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-[#0F172A]">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr] lg:px-8">
        <section>
          <div className="flex items-center gap-3">
            <span className="relative h-11 w-11 overflow-hidden rounded-full border border-[#D4AF37]/30 bg-white shadow-sm">
              <Image
                src="/images/logo-sajana.jpg"
                alt="Sajana IELTS logo"
                fill
                sizes="44px"
                className="object-cover"
              />
            </span>
            <h2 className="text-lg font-bold">Sajana IELTS 2.0</h2>
          </div>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-600">
            Structured IELTS coaching with practical strategy sessions, guided feedback, and focused practice resources
            for speaking, writing, reading, and listening.
          </p>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Explore</h3>
          <ul className="mt-4 space-y-2 text-sm">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link className="text-slate-700 transition hover:text-[#0F172A] hover:underline" href={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h3 className="text-sm font-semibold uppercase tracking-[0.15em] text-slate-500">Contact</h3>
          <p className="mt-4 text-sm text-slate-700">Need a band-focused study plan?</p>
          <Link
            href="/contact#book-demo"
            className="mt-4 inline-flex rounded-lg bg-[#D4AF37] px-4 py-2 text-sm font-semibold text-[#0F172A] transition hover:brightness-110"
          >
            Book Free Demo
          </Link>
        </section>
      </div>

      <div className="border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Sajana IELTS 2.0. All rights reserved.
      </div>
    </footer>
  )
}