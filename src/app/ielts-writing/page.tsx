import SkillResourceListPage from '@/components/SkillResourceListPage'
import {client} from '@/sanity/client'

type WritingResource = {
  _id: string
  title: string
  slug: string
  summary: string
  featuredImage?: {asset?: {_ref?: string}}
}

export default async function IELTSWritingPage() {
  const resources = await client.fetch<WritingResource[]>(
    `*[_type == "writingResource"] | order(_createdAt desc)[0...12]{_id, title, "slug": slug.current, summary, featuredImage{asset}}`,
  )

  return (
    <SkillResourceListPage
      label="IELTS Writing"
      title="Task 1, Task 2, model structures, and band strategies"
      description="Clear writing frameworks, paragraph logic, and response-building systems for stronger band outcomes."
      items={resources}
      hrefBase="/ielts-writing"
      heroImage="https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1600&q=80"
    />
  )
}
