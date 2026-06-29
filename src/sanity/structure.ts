import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem().title('Cue Cards').child(S.documentTypeList('cueCard').title('Cue Cards')),
      S.listItem().title('Sample Essays').child(S.documentTypeList('essay').title('Sample Essays')),
      S.listItem().title('Vocabulary Lessons').child(S.documentTypeList('vocabulary').title('Vocabulary Lessons')),
      S.divider(),
      S.listItem().title('IELTS Reading').child(S.documentTypeList('readingResource').title('IELTS Reading')),
      S.listItem().title('IELTS Writing').child(S.documentTypeList('writingResource').title('IELTS Writing')),
      S.listItem().title('IELTS Listening').child(S.documentTypeList('listeningResource').title('IELTS Listening')),
      S.listItem().title('IELTS Speaking').child(S.documentTypeList('speakingResource').title('IELTS Speaking')),
      S.listItem().title('Pre-IELTS').child(S.documentTypeList('preIeltsResource').title('Pre-IELTS')),
    ])
