import {prisma} from '@/lib/prisma'

export const dynamic = 'force-dynamic'

export default async function AdminLeadsPage() {
  const leads = await prisma.lead.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#D4AF37]">Admin Dashboard</p>
            <h1 className="mt-2 text-3xl font-bold text-[#0F172A]">Lead Overview</h1>
          </div>
          <div className="rounded-full border border-[#D4AF37] bg-white px-4 py-2 text-sm font-medium text-[#0F172A]">
            Total Leads: {leads.length}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <table className="min-w-full divide-y divide-slate-200 text-left">
            <thead className="bg-[#0F172A] text-white">
              <tr>
                <th className="px-5 py-4 text-sm font-semibold">Student Name</th>
                <th className="px-5 py-4 text-sm font-semibold">Phone</th>
                <th className="px-5 py-4 text-sm font-semibold">Email</th>
                <th className="px-5 py-4 text-sm font-semibold">Target Band</th>
                <th className="px-5 py-4 text-sm font-semibold">Message</th>
                <th className="px-5 py-4 text-sm font-semibold">Created</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {leads.map((lead) => (
                <tr key={lead.id} className="border-l-4 border-transparent transition hover:border-[#D4AF37] hover:bg-[#FFFBEE]">
                  <td className="px-5 py-4 text-sm font-medium text-[#0F172A]">{lead.studentName}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{lead.phone}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{lead.email}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{lead.targetBandScore.toString()}</td>
                  <td className="px-5 py-4 text-sm text-slate-700">{lead.message}</td>
                  <td className="px-5 py-4 text-sm text-slate-500">
                    {new Intl.DateTimeFormat('en-US', {
                      dateStyle: 'medium',
                      timeStyle: 'short',
                    }).format(lead.createdAt)}
                  </td>
                </tr>
              ))}
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-10 text-center text-sm text-slate-500">
                    No leads have been submitted yet.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  )
}
