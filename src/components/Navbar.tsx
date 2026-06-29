'use client'

import Image from 'next/image'
import Link from 'next/link'
import {usePathname} from 'next/navigation'
import {useState} from 'react'

const navLinks = [
  {href: '/', label: 'Home'},
  {href: '/ielts-reading', label: 'Reading'},
  {href: '/ielts-writing', label: 'Writing'},
  {href: '/ielts-listening', label: 'Listening'},
  {href: '/ielts-speaking', label: 'Speaking'},
  {href: '/pre-ielts', label: 'Pre IELTS'},
  {href: '/ielts-resources', label: 'Resources'},
  {href: '/ielts-courses', label: 'Courses'},
  {href: '/about', label: 'About'},
  {href: '/contact', label: 'Contact US'},
]

export default function Navbar() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#0F172A]/95 text-white backdrop-blur-md">
      <nav aria-label="Primary" className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="flex items-center gap-3 text-lg font-semibold tracking-wide text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A]"
        >
          <span className="relative h-10 w-10 overflow-hidden rounded-full border border-[#D4AF37]/40 bg-white/10 shadow-sm">
            <Image
              src="/images/logo-sajana.jpg"
              alt="Sajana IELTS logo"
              fill
              sizes="40px"
              className="object-cover"
              priority
            />
          </span>
          <span className="hidden sm:inline">Sajana IELTS</span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center rounded-md border border-white/20 px-3 py-2 text-sm font-medium text-white hover:border-[#D4AF37] hover:text-[#D4AF37] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] md:hidden"
          aria-controls="primary-menu"
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          Menu
        </button>

        <ul className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const isActive = pathname === link.href.split('?')[0]

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] ${
                    isActive ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      <div id="primary-menu" className={`${isMenuOpen ? 'block' : 'hidden'} border-t border-white/10 bg-[#0F172A] md:hidden`}>
        <ul className="space-y-1 px-4 py-3 sm:px-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href.split('?')[0]

            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`block rounded-md px-3 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F172A] ${
                    isActive ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}
