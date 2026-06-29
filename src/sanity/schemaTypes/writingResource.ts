import {defineField, defineType} from 'sanity'

export const writingResource = defineType({
  name: 'writingResource',
  title: 'IELTS Writing Resources',
  type: 'document',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (Rule) => Rule.required()}),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({name: 'summary', title: 'Summary', type: 'text', rows: 4, validation: (Rule) => Rule.required()}),
    defineField({name: 'lessonContent', title: 'Lesson Content', type: 'array', of: [{type: 'block'}], validation: (Rule) => Rule.required()}),
    defineField({name: 'featuredImage', title: 'Featured Image', type: 'image', options: {hotspot: true}}),
    defineField({name: 'downloadableGuide', title: 'Downloadable Guide', type: 'file', options: {accept: '.pdf,.doc,.docx'}}),
    defineField({name: 'practiceSheets', title: 'Practice Sheets', type: 'array', of: [{type: 'file'}]}),
    defineField({
      name: 'keyVocabulary',
      title: 'Key Vocabulary',
      type: 'array',
      of: [
        defineField({
          name: 'vocabItem',
          title: 'Vocabulary Item',
          type: 'object',
          fields: [
            defineField({name: 'term', title: 'Term', type: 'string', validation: (Rule) => Rule.required()}),
            defineField({name: 'meaning', title: 'Meaning', type: 'text', rows: 2, validation: (Rule) => Rule.required()}),
            defineField({name: 'example', title: 'IELTS Example', type: 'text', rows: 2, validation: (Rule) => Rule.required()}),
          ],
        }),
      ],
    }),
  ],
})
