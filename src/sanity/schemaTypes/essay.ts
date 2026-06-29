import {defineField, defineType} from 'sanity'

export const essay = defineType({
	name: 'essay',
	title: 'IELTS Sample Essays',
	type: 'document',
	fields: [
		defineField({
			name: 'questionTitle',
			title: 'Question Title',
			type: 'string',
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'featuredImage',
			title: 'Featured Image',
			type: 'image',
			options: {
				hotspot: true,
			},
		}),
		defineField({
			name: 'downloadableGuide',
			title: 'Downloadable Guide',
			type: 'file',
			options: {
				accept: '.pdf,.doc,.docx',
			},
		}),
		defineField({
			name: 'slug',
			title: 'Slug',
			type: 'slug',
			options: {
				source: 'questionTitle',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'essayType',
			title: 'Essay Type',
			type: 'string',
			options: {
				list: [
					{title: 'Opinion', value: 'Opinion'},
					{title: 'Discussion', value: 'Discussion'},
					{title: 'Problem-Solution', value: 'Problem-Solution'},
					{title: 'Advantage-Disadvantage', value: 'Advantage-Disadvantage'},
				],
				layout: 'dropdown',
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'examinerQuestion',
			title: 'Examiner Question',
			type: 'text',
			rows: 5,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'sampleAnswer',
			title: 'Sample Answer',
			type: 'array',
			of: [{type: 'block'}],
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'bandScoreEvaluation',
			title: 'Band Score Evaluation',
			type: 'text',
			rows: 4,
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'mockAssignments',
			title: 'Mock Assignments',
			type: 'array',
			of: [{type: 'file'}],
		}),
	],
})
