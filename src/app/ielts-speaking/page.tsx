import SkillResourceListPage from '@/components/SkillResourceListPage'
import {client} from '@/sanity/client'

type SpeakingResource = {
  _id: string
  title: string
  slug: string
  summary: string
  featuredImage?: {asset?: {_ref?: string}}
}

export default async function IELTSSpeakingPage() {
  const resources = await client.fetch<SpeakingResource[]>(
    `*[_type == "speakingResource"] | order(_createdAt desc)[0...12]{_id, title, "slug": slug.current, summary, featuredImage{asset}}`,
  )

  return (
    <SkillResourceListPage
      label="IELTS Speaking"
      title="Part 1, Part 2, Part 3 fluency and response development"
      description="Speaking lessons centered on expansion, response structure, confidence, and natural delivery under time pressure."
      items={resources}
      hrefBase="/ielts-speaking"
      heroImage="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1600&q=80"
    />
  )
}
