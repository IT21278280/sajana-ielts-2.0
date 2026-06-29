import {defineField, defineType} from 'sanity'

export const vocabulary = defineType({
	name: 'vocabulary',
	title: 'IELTS Vocabulary Lessons',
	type: 'document',
	fields: [
		defineField({
			name: 'topic',
			title: 'Topic',
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
				source: 'topic',
				maxLength: 96,
			},
			validation: (Rule) => Rule.required(),
		}),
		defineField({
			name: 'wordList',
			title: 'Word List',
			type: 'array',
			of: [
				defineField({
					name: 'wordEntry',
					title: 'Word Entry',
					type: 'object',
					fields: [
						defineField({
							name: 'word',
							title: 'Word',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'partOfSpeech',
							title: 'Part Of Speech',
							type: 'string',
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'definition',
							title: 'Definition',
							type: 'text',
							rows: 3,
							validation: (Rule) => Rule.required(),
						}),
						defineField({
							name: 'ieltsExampleSentence',
							title: 'IELTS Example Sentence',
							type: 'text',
							rows: 3,
							validation: (Rule) => Rule.required(),
						}),
					],
				}),
			],
			validation: (Rule) => Rule.required().min(1),
		}),
		defineField({
			name: 'mockAssignments',
			title: 'Mock Assignments',
			type: 'array',
			of: [{type: 'file'}],
		}),
	],
})
