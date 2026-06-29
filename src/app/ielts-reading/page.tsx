import SkillResourceListPage from '@/components/SkillResourceListPage'
import {client} from '@/sanity/client'

type ReadingResource = {
  _id: string
  title: string
  slug: string
  summary: string
  featuredImage?: {asset?: {_ref?: string}}
}

export default async function IELTSReadingPage() {
  const resources = await client.fetch<ReadingResource[]>(
    `*[_type == "readingResource"] | order(_createdAt desc)[0...12]{_id, title, "slug": slug.current, summary, featuredImage{asset}}`,
  )

  return (
    <SkillResourceListPage
      label="IELTS Reading"
      title="Reading passages, strategies, and practice sheets"
      description="Structured reading lessons for skimming, scanning, answer-location logic, and text evidence control."
      items={resources}
      hrefBase="/ielts-reading"
      heroImage="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1600&q=80"
    />
  )
}
