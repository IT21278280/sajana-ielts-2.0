import {notFound} from 'next/navigation'

import SkillResourceDetailPage from '@/components/SkillResourceDetailPage'
import {client} from '@/sanity/client'

export const revalidate = 60

type Block = {children?: Array<{text?: string}>}

type ResourceDoc = {
	title: string
	featuredImage?: {asset?: {url?: string}}
	downloadableGuide?: {asset?: {url?: string}}
	practiceSheets?: Array<{asset?: {url?: string}}>
	summary: string
	lessonContent?: Block[]
	keyVocabulary?: Array<{term?: string; meaning?: string; example?: string}>
}

export default async function PreIELTSDetailPage({
	params,
}: {
	params: Promise<{slug: string}>
}) {
	const {slug} = await params

	const resource = await client.fetch<ResourceDoc | null>(
		`*[_type == "preIeltsResource" && slug.current == $slug][0]{title, featuredImage{asset->{url}}, downloadableGuide{asset->{url}}, practiceSheets[]{asset->{url}}, summary, lessonContent, keyVocabulary[]{term, meaning, example}}`,
		{slug},
	)

	if (!resource) notFound()

	return <SkillResourceDetailPage label="Pre IELTS" {...resource} />
}
