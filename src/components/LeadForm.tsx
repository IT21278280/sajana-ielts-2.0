'use client'

import {FormEvent, useMemo, useState} from 'react'

type LeadFormData = {
  name: string
  phone: string
  email: string
  targetBand: string
  message: string
}

const initialFormData: LeadFormData = {
  name: '',
  phone: '',
  email: '',
  targetBand: '',
  message: '',
}

const targetBandOptions = ['5.0', '5.5', '6.0', '6.5', '7.0', '7.5', '8.0', '8.5', '9.0']

function SuccessIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className="h-12 w-12 text-emerald-600">
      <path
        fill="currentColor"
        d="M12 2a10 10 0 1 0 10 10A10.01 10.01 0 0 0 12 2Zm-1 14.59-4-4L8.41 11 11 13.59 15.59 9 17 10.41Z"
      />
    </svg>
  )
}

export default function LeadForm() {
  const [formData, setFormData] = useState<LeadFormData>(initialFormData)
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const isSubmitted = useMemo(() => formStatus === 'success', [formStatus])

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormStatus('submitting')
    setStatusMessage('Submitting your request...')

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = (await response.json()) as {message?: string}

      if (!response.ok) {
        throw new Error(data.message ?? 'Unable to submit your inquiry at the moment.')
      }

      setFormStatus('success')
      setStatusMessage('Your inquiry is confirmed. We will contact you shortly with the next steps.')
      setFormData(initialFormData)
    } catch (error) {
      setFormStatus('error')
      setStatusMessage(error instanceof Error ? error.message : 'Submission failed. Please try again.')
    }
  }

  if (isSubmitted) {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <SuccessIcon />
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-700">Success</p>
            <h3 className="mt-2 text-2xl font-bold text-[#0F172A]">We received your request</h3>
            <p className="mt-3 text-sm leading-7 text-emerald-900">{statusMessage}</p>
            <div className="mt-6 rounded-xl border border-emerald-200 bg-white p-4 text-sm text-slate-700">
              <p className="font-semibold text-[#0F172A]">Next steps</p>
              <ul className="mt-2 space-y-2">
                <li>1. Our team will review your goals and current band level.</li>
                <li>2. We will contact you to arrange a free demo and study plan.</li>
                <li>3. You will receive a personalized roadmap for your target score.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <form className="mt-8 space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#0F172A]">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          value={formData.name}
          onChange={(event) => setFormData((prev) => ({...prev, name: event.target.value}))}
          maxLength={70}
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="phone" className="mb-2 block text-sm font-medium text-[#0F172A]">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={formData.phone}
            onChange={(event) => setFormData((prev) => ({...prev, phone: event.target.value}))}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          />
        </div>
        <div>
          <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#0F172A]">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={(event) => setFormData((prev) => ({...prev, email: event.target.value}))}
            required
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          />
        </div>
      </div>

      <div>
        <label htmlFor="targetBand" className="mb-2 block text-sm font-medium text-[#0F172A]">
          Target Band
        </label>
        <select
          id="targetBand"
          name="targetBand"
          value={formData.targetBand}
          onChange={(event) => setFormData((prev) => ({...prev, targetBand: event.target.value}))}
          required
          className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        >
          <option value="">Select your target band</option>
          {targetBandOptions.map((band) => (
            <option key={band} value={band}>
              {band}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block text-sm font-medium text-[#0F172A]">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={(event) => setFormData((prev) => ({...prev, message: event.target.value}))}
          placeholder="Tell us your current IELTS level and timeline goals."
          required
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-[#0F172A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] focus-visible:ring-offset-2 focus-visible:ring-offset-white"
        />
      </div>

      <button
        type="submit"
        disabled={formStatus === 'submitting'}
        className="inline-flex items-center rounded-md bg-[#0F172A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#1e293b] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {formStatus === 'submitting' ? 'Submitting...' : 'Submit Inquiry'}
      </button>

      {statusMessage ? (
        <p
          className={`text-sm ${formStatus === 'success' ? 'text-emerald-700' : formStatus === 'error' ? 'text-red-700' : 'text-slate-600'}`}
          role="status"
        >
          {statusMessage}
        </p>
      ) : null}
    </form>
  )
}
