import { type SchemaTypeDefinition } from 'sanity'
import {cueCard} from './cueCard'
import {essay} from './essay'
import {vocabulary} from './vocabulary'
import {readingResource} from './readingResource'
import {writingResource} from './writingResource'
import {listeningResource} from './listeningResource'
import {speakingResource} from './speakingResource'
import {preIeltsResource} from './preIeltsResource'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    cueCard,
    essay,
    vocabulary,
    readingResource,
    writingResource,
    listeningResource,
    speakingResource,
    preIeltsResource,
  ],
}
