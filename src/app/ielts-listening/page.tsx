import SkillResourceListPage from '@/components/SkillResourceListPage'
import {client} from '@/sanity/client'

type ListeningResource = {
  _id: string
  title: string
  slug: string
  summary: string
  featuredImage?: {asset?: {_ref?: string}}
}

export default async function IELTSListeningPage() {
  const resources = await client.fetch<ListeningResource[]>(
    `*[_type == "listeningResource"] | order(_createdAt desc)[0...12]{_id, title, "slug": slug.current, summary, featuredImage{asset}}`,
  )

  return (
    <SkillResourceListPage
      label="IELTS Listening"
      title="Section practice, note-taking skills, and audio drills"
      description="Targeted listening lessons for prediction, form completion, distractor handling, and answer accuracy."
      items={resources}
      hrefBase="/ielts-listening"
      heroImage="https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=1600&q=80"
    />
  )
}
