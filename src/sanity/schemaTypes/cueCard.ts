import {defineField, defineType} from 'sanity'

export const cueCard = defineType({
  name: 'cueCard',
  title: 'IELTS Speaking Cue Card',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'downloadableGuide',
      title: 'Downloadable Guide',
      type: 'file',
      options: {accept: '.pdf,.doc,.docx'},
    }),
    defineField({
      name: 'targetSlug',
      title: 'Target Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'part2Prompts',
      title: 'Part 2 Prompts',
      type: 'text',
      rows: 8,
      description: 'Add the speaking bullet prompts exactly as students should practice them.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'sampleModelAnswerMarkdown',
      title: 'Sample Model Answer (Markdown)',
      type: 'text',
      rows: 16,
      description: 'Write the sample answer using markdown syntax for headings, emphasis, and lists.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'mockAssignments',
      title: 'Mock Assignments',
      type: 'array',
      of: [{type: 'file'}],
    }),
    defineField({
      name: 'essentialVocabularyIdioms',
      title: 'Essential Vocabulary/Idioms',
      type: 'array',
      of: [
        defineField({
          name: 'matrixRow',
          title: 'Matrix Row',
          type: 'object',
          fields: [
            defineField({
              name: 'expression',
              title: 'Expression',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'entryType',
              title: 'Entry Type',
              type: 'string',
              options: {
                list: [
                  {title: 'Vocabulary', value: 'Vocabulary'},
                  {title: 'Idiom', value: 'Idiom'},
                ],
                layout: 'dropdown',
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'meaning',
              title: 'Meaning',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'exampleUsage',
              title: 'Example Usage',
              type: 'text',
              rows: 3,
              validation: (Rule) => Rule.required(),
            }),
          ],
        }),
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
  ],
})
