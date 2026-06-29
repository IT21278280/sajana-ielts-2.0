import SkillResourceListPage from '@/components/SkillResourceListPage'
import {client} from '@/sanity/client'

type PreIeltsResource = {
  _id: string
  title: string
  slug: string
  summary: string
  featuredImage?: {asset?: {_ref?: string}}
}

export default async function PreIELTSPage() {
  const resources = await client.fetch<PreIeltsResource[]>(
    `*[_type == "preIeltsResource"] | order(_createdAt desc)[0...12]{_id, title, "slug": slug.current, summary, featuredImage{asset}}`,
  )

  return (
    <SkillResourceListPage
      label="Pre IELTS"
      title="Foundational English skills before full IELTS training"
      description="Starter modules for grammar, vocabulary, clarity, and confidence before entering higher-pressure IELTS preparation."
      items={resources}
      hrefBase="/pre-ielts"
      heroImage="https://images.unsplash.com/photo-1462536943532-57a629f6cc60?auto=format&fit=crop&w=1600&q=80"
    />
  )
}
