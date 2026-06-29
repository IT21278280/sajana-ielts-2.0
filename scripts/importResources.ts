import 'dotenv/config'

import {createClient} from '@sanity/client'
import {mkdir, writeFile} from 'node:fs/promises'

type CueCardPayload = {
  type: 'cueCard'
  id: string
  title: string
  prompts: string
  modelAnswer: string
  vocabulary: Array<{
    expression: string
    entryType: 'Vocabulary' | 'Idiom'
    meaning: string
    exampleUsage: string
  }>
  featuredImageUrl?: string
  downloadableGuideUrl?: string
}

type EssayPayload = {
  type: 'essay'
  id: string
  questionTitle: string
  essayType: 'Opinion' | 'Discussion' | 'Problem-Solution' | 'Advantage-Disadvantage'
  examinerQuestion: string
  sampleAnswer: string[]
  bandScoreEvaluation: string
  featuredImageUrl?: string
  downloadableGuideUrl?: string
}

type VocabularyPayload = {
  type: 'vocabulary'
  id: string
  topic: string
  words: Array<{
    word: string
    partOfSpeech: string
    definition: string
    ieltsExampleSentence: string
  }>
  featuredImageUrl?: string
  downloadableGuideUrl?: string
}

type SkillSectionPayload = {
  type: 'readingResource' | 'writingResource' | 'listeningResource' | 'speakingResource' | 'preIeltsResource'
  id: string
  title: string
  summary: string
  lessonContent: string[]
  keyVocabulary: Array<{
    term: string
    meaning: string
    example: string
  }>
  featuredImageUrl?: string
  downloadableGuideUrl?: string
}

type ResourcePayload = CueCardPayload | EssayPayload | VocabularyPayload | SkillSectionPayload

type UploadedAsset = {
  _id: string
}

type AssetResult = {
  kind: 'featuredImage' | 'downloadableGuide'
  sourceUrl?: string
  status: 'uploaded' | 'skipped' | 'failed'
  message?: string
  assetId?: string
}

type ItemReport = {
  id: string
  type: ResourcePayload['type']
  status: 'success' | 'failed'
  assetResults: AssetResult[]
  message?: string
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

function buildSkillSectionResources(
  type: SkillSectionPayload['type'],
  items: Array<{
    id: string
    title: string
    summary: string
    lessonContent: string[]
    keyVocabulary: Array<{
      term: string
      meaning: string
      example: string
    }>
    featuredImageUrl: string
    downloadableGuideUrl: string
  }>,
): SkillSectionPayload[] {
  return items.map((item) => ({
    type,
    id: item.id,
    title: item.title,
    summary: item.summary,
    lessonContent: item.lessonContent,
    keyVocabulary: item.keyVocabulary,
    featuredImageUrl: item.featuredImageUrl,
    downloadableGuideUrl: item.downloadableGuideUrl,
  }))
}

const readingResources = buildSkillSectionResources('readingResource', [
  {
    id: 'reading-true-false-not-given-strategy',
    title: 'True, False, Not Given Strategy Masterclass',
    summary: 'Build fast and accurate response logic for True/False/Not Given tasks in IELTS Reading.',
    lessonContent: [
      'Understand statement matching: identify whether the statement exactly matches, contradicts, or is not present in the text.',
      'Scan key nouns first, then confirm surrounding qualifiers such as always, rarely, and only.',
      'Never use personal assumptions. Base every answer only on explicit evidence in the passage.',
    ],
    keyVocabulary: [
      {term: 'explicit evidence', meaning: 'information clearly stated in the text', example: 'Candidates must rely on explicit evidence for each answer.'},
      {term: 'contradiction', meaning: 'information that states the opposite', example: 'A contradiction should be marked as False.'},
      {term: 'inference trap', meaning: 'guessing beyond the provided text', example: 'An inference trap often causes Not Given mistakes.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'reading-heading-matching-practice',
    title: 'Matching Headings Practice Grid',
    summary: 'Use paragraph purpose, topic shifts, and main-idea signals to choose headings efficiently.',
    lessonContent: [
      'Read the first and last sentence of each paragraph first to identify its purpose.',
      'Underline repeated concepts and contrast words because they often reveal the heading.',
      'Eliminate headings that are too specific or too general for the paragraph meaning.',
    ],
    keyVocabulary: [
      {term: 'main idea', meaning: 'the central point of a paragraph', example: 'A heading must match the main idea of the paragraph.'},
      {term: 'topic shift', meaning: 'a change in the focus of a paragraph', example: 'Spotting a topic shift helps match headings faster.'},
      {term: 'elimination', meaning: 'removing incorrect options', example: 'Elimination is essential in heading questions.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'reading-matching-information-skills',
    title: 'Matching Information with Confidence',
    summary: 'Train scanning speed and locate details without wasting time on unnecessary reading.',
    lessonContent: [
      'Search for names, dates, and key nouns rather than reading every line word by word.',
      'Pay attention to synonyms because the question often uses different wording from the passage.',
      'Confirm the answer with evidence from one specific sentence or supporting sentence pair.',
    ],
    keyVocabulary: [
      {term: 'scanning', meaning: 'searching for specific information quickly', example: 'Scanning helps locate detail questions efficiently.'},
      {term: 'synonym', meaning: 'a word with a similar meaning', example: 'The passage often hides answers behind synonyms.'},
      {term: 'detail question', meaning: 'a question asking for a specific fact', example: 'Detail questions reward precise scanning.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'reading-sentence-completion-workshop',
    title: 'Sentence Completion Workshop',
    summary: 'Match grammar and meaning to complete answers with accuracy and speed.',
    lessonContent: [
      'Check word limits and grammar before writing your final answer.',
      'Look at the sentence around the blank to decide whether the answer needs a noun, adjective, or phrase.',
      'Use nearby context clues rather than guessing from only one keyword.',
    ],
    keyVocabulary: [
      {term: 'word limit', meaning: 'the number of words allowed in an answer', example: 'Always respect the word limit in sentence completion.'},
      {term: 'context clue', meaning: 'information near the blank that helps reveal the answer', example: 'A context clue can confirm the correct phrase.'},
      {term: 'grammar fit', meaning: 'an answer that fits the sentence structure', example: 'Grammar fit is essential for a correct completion answer.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'reading-diagram-labeling-practice',
    title: 'Diagram Labeling Practice Pack',
    summary: 'Learn how to identify visible features, process steps, and labelled structures quickly.',
    lessonContent: [
      'Use the diagram title and labels to predict what kind of language is required.',
      'Match visual information with vocabulary from the passage instead of relying on guesswork.',
      'Check spelling carefully because diagram labels often lose marks through small errors.',
    ],
    keyVocabulary: [
      {term: 'label', meaning: 'a word or phrase identifying an item in a diagram', example: 'A label must be spelled exactly as required.'},
      {term: 'process step', meaning: 'a stage in a sequence of actions', example: 'Identify each process step before choosing an answer.'},
      {term: 'visual clue', meaning: 'information visible in a diagram or chart', example: 'A visual clue can narrow down the answer quickly.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'reading-yes-no-not-given-method',
    title: 'Yes, No, Not Given Method',
    summary: 'Apply opinion recognition and statement analysis with cleaner evidence checking.',
    lessonContent: [
      'Determine whether the passage expresses support, opposition, or no clear position.',
      'Do not confuse an opposite opinion with missing information.',
      'Only use language from the text to determine the correct judgment.',
    ],
    keyVocabulary: [
      {term: 'author opinion', meaning: 'the viewpoint expressed by the writer', example: 'You must identify the author opinion in Yes/No/Not Given questions.'},
      {term: 'implicit meaning', meaning: 'meaning that is suggested but not directly stated', example: 'Implicit meaning should not replace explicit evidence.'},
      {term: 'stance', meaning: 'a clear position or viewpoint', example: 'The writer’s stance can help solve the question.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'reading-summary-completion-skills',
    title: 'Summary Completion Skills',
    summary: 'Use keyword prediction and paragraph mapping to complete IELTS summaries accurately.',
    lessonContent: [
      'Predict the type of word each blank needs before searching the passage.',
      'Read the summary as a whole so that the context of each blank becomes clearer.',
      'Focus on synonyms and paraphrases instead of repeating exact wording from the question.',
    ],
    keyVocabulary: [
      {term: 'paraphrase', meaning: 'expressing the same idea in different words', example: 'The passage often uses paraphrase to hide the answer.'},
      {term: 'summary context', meaning: 'the surrounding meaning in a summary task', example: 'Summary context helps predict the blank.'},
      {term: 'keyword', meaning: 'an important word that guides the search', example: 'Keywords make summary completion faster.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'reading-overview-skim-scan-bootcamp',
    title: 'Skim and Scan Bootcamp',
    summary: 'Improve reading speed and accuracy with a simple passage navigation routine.',
    lessonContent: [
      'Skim the first 10 percent of the passage to understand the general topic and structure.',
      'Scan only after you know what kind of detail you are searching for.',
      'Avoid over-reading difficult paragraphs before you know the purpose of the question.',
    ],
    keyVocabulary: [
      {term: 'skim', meaning: 'read quickly to understand the general meaning', example: 'Skimming helps map the passage before answering.'},
      {term: 'navigation', meaning: 'the process of moving through the passage strategically', example: 'Effective navigation saves reading time.'},
      {term: 'speed reading', meaning: 'reading quickly without losing essential meaning', example: 'Speed reading is useful when time is limited.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
])

const writingResources = buildSkillSectionResources('writingResource', [
  {
    id: 'writing-task2-coherence-framework',
    title: 'IELTS Task 2 Coherence Framework',
    summary: 'A practical paragraph framework to improve coherence and cohesion in opinion and discussion essays.',
    lessonContent: [
      'Use one clear topic sentence at the beginning of each body paragraph.',
      'Support with explanation and a relevant example that directly links to the topic sentence.',
      'Use linking devices purposefully, not excessively, to maintain readability and flow.',
    ],
    keyVocabulary: [
      {term: 'cohesion', meaning: 'how ideas connect through language', example: 'Cohesion improves when transitions are used naturally.'},
      {term: 'topic sentence', meaning: 'the main idea sentence of a paragraph', example: 'Every IELTS body paragraph should start with a topic sentence.'},
      {term: 'logical progression', meaning: 'ideas moving forward in a clear order', example: 'Logical progression is essential for Band 7+ writing.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'writing-task1-overview-guide',
    title: 'Task 1 Overview and Comparison Guide',
    summary: 'Learn how to identify the big picture and report only the most important visual trends.',
    lessonContent: [
      'Start with a clear overview sentence that captures the main trend or contrast.',
      'Select two or three key figures only instead of listing every number.',
      'Use comparison language to show similarity, difference, increase, or decline.',
    ],
    keyVocabulary: [
      {term: 'overview', meaning: 'a short summary of the main trends', example: 'An overview is required in Task 1 writing.'},
      {term: 'trend', meaning: 'a general direction of change', example: 'The graph shows an upward trend in attendance.'},
      {term: 'comparison', meaning: 'showing how two things are similar or different', example: 'Comparison language strengthens Task 1 reports.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'writing-opinion-essay-structure',
    title: 'Opinion Essay Structure Builder',
    summary: 'Practice a clean introduction, body paragraph logic, and a balanced conclusion.',
    lessonContent: [
      'State your position clearly in the introduction and repeat it with variation in the conclusion.',
      'Develop one main idea per body paragraph to keep the essay controlled.',
      'Use examples that directly answer the question instead of adding unrelated ideas.',
    ],
    keyVocabulary: [
      {term: 'thesis statement', meaning: 'the writer’s clear position or main argument', example: 'A thesis statement should be visible in the introduction.'},
      {term: 'body paragraph', meaning: 'a paragraph that develops one central idea', example: 'Each body paragraph should support the thesis.'},
      {term: 'balanced conclusion', meaning: 'a conclusion that restates the idea without adding new points', example: 'A balanced conclusion closes the essay cleanly.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'writing-problem-solution-planner',
    title: 'Problem-Solution Essay Planner',
    summary: 'Use cause, effect, and solution blocks to answer challenge-based essay questions.',
    lessonContent: [
      'Explain the problem clearly before offering solutions.',
      'Make sure each solution is practical, specific, and connected to the original issue.',
      'Avoid listing too many ideas if they cannot be explained properly.',
    ],
    keyVocabulary: [
      {term: 'root cause', meaning: 'the original reason a problem happens', example: 'Identifying the root cause improves the essay response.'},
      {term: 'feasible', meaning: 'possible to do successfully', example: 'A feasible solution is better than a vague one.'},
      {term: 'remedy', meaning: 'something that solves a problem', example: 'The essay should offer a remedy for the issue.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'writing-advantage-disadvantage-map',
    title: 'Advantage-Disadvantage Map',
    summary: 'Learn how to balance benefits and drawbacks in a controlled IELTS essay response.',
    lessonContent: [
      'Group similar advantages or disadvantages rather than treating each one separately.',
      'Choose the side with stronger support if the task asks for your opinion.',
      'Use comparison phrasing to show the relationship between benefits and risks.',
    ],
    keyVocabulary: [
      {term: 'advantage', meaning: 'a positive feature or benefit', example: 'An advantage of online learning is flexibility.'},
      {term: 'disadvantage', meaning: 'a negative feature or drawback', example: 'A disadvantage is the lack of face-to-face interaction.'},
      {term: 'trade-off', meaning: 'a compromise between two options', example: 'Every policy involves some trade-off.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'writing-grammar-range-clinic',
    title: 'Grammar Range Clinic',
    summary: 'Improve sentence variety, accuracy, and control for stronger band performance.',
    lessonContent: [
      'Use simple, compound, and complex sentences to show control over grammar range.',
      'Check subject-verb agreement, article use, and verb tense consistency after drafting.',
      'Do not sacrifice clarity for complexity; accuracy matters more than length.',
    ],
    keyVocabulary: [
      {term: 'complex sentence', meaning: 'a sentence with a main clause and one or more dependent clauses', example: 'Complex sentences can improve writing variety.'},
      {term: 'accuracy', meaning: 'correct use of language', example: 'Accuracy is essential for a higher band score.'},
      {term: 'range', meaning: 'variety in sentence or vocabulary use', example: 'A wide grammar range boosts writing quality.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'writing-lexical-resource-boost',
    title: 'Lexical Resource Booster',
    summary: 'Build topic vocabulary, precise paraphrasing, and natural academic word choice.',
    lessonContent: [
      'Replace repeated words with accurate synonyms, not random advanced vocabulary.',
      'Learn collocations because natural word partnerships sound more academic and fluent.',
      'Keep a short list of topic-specific expressions for common IELTS themes.',
    ],
    keyVocabulary: [
      {term: 'collocation', meaning: 'words that naturally go together', example: 'Strong collocations improve lexical resource.'},
      {term: 'paraphrase', meaning: 'to restate an idea using different words', example: 'Paraphrase the question carefully in the introduction.'},
      {term: 'topic vocabulary', meaning: 'words linked to a specific IELTS topic', example: 'Topic vocabulary helps you write with more precision.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'writing-timed-practice-sprint',
    title: 'Timed Writing Practice Sprint',
    summary: 'Practise planning, drafting, and checking essays under real exam time pressure.',
    lessonContent: [
      'Spend the first minutes planning before you start writing.',
      'Reserve final time for proof-reading and correcting grammar or spelling errors.',
      'Train with strict timing so the exam feels familiar and manageable.',
    ],
    keyVocabulary: [
      {term: 'proof-read', meaning: 'check writing for errors before submitting', example: 'Always proof-read your essay before finishing.'},
      {term: 'time management', meaning: 'the skill of using time effectively', example: 'Time management is critical in Writing Task 2.'},
      {term: 'draft', meaning: 'a first version of a written response', example: 'A quick draft helps organise the essay flow.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
])

const listeningResources = buildSkillSectionResources('listeningResource', [
  {
    id: 'listening-section1-form-completion',
    title: 'Listening Section 1 Form Completion Skills',
    summary: 'Improve score accuracy in form completion tasks through prediction and spelling control.',
    lessonContent: [
      'Before audio starts, predict answer type from grammar and context (name, number, address, noun phrase).',
      'Track signpost language such as first, next, however, and finally to avoid missing key details.',
      'Always check spelling and word limits after recording each answer.',
    ],
    keyVocabulary: [
      {term: 'signpost language', meaning: 'words that indicate transitions in speech', example: 'Signpost language helps identify shifts in information.'},
      {term: 'prediction', meaning: 'anticipating answer type before listening', example: 'Prediction reduces panic during fast audio.'},
      {term: 'word limit', meaning: 'maximum allowed words for an answer', example: 'Ignoring the word limit can lose marks.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'listening-multiple-choice-traps',
    title: 'Multiple Choice Trap Detector',
    summary: 'Recognise distractors, paraphrase shifts, and answer changes in multiple choice tasks.',
    lessonContent: [
      'Listen for the final answer, not the first option mentioned.',
      'Watch for words that change the meaning such as but, however, and actually.',
      'Eliminate options that are only partly correct or too extreme.',
    ],
    keyVocabulary: [
      {term: 'distractor', meaning: 'an option designed to mislead the listener', example: 'Distractors often sound very similar to the correct answer.'},
      {term: 'paraphrase', meaning: 'same meaning expressed differently', example: 'The answer may be hidden behind paraphrase.'},
      {term: 'final answer', meaning: 'the corrected or confirmed answer after all details', example: 'Always wait for the final answer before marking.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'listening-map-labelling-guide',
    title: 'Map Labelling Guide',
    summary: 'Follow directions, orientation, and location words to label maps correctly.',
    lessonContent: [
      'Understand direction words like opposite, next to, on the left, and behind.',
      'Follow the map orientation before the audio begins so the layout feels familiar.',
      'Keep checking the point on the map as the speaker moves from one place to another.',
    ],
    keyVocabulary: [
      {term: 'orientation', meaning: 'the way a map or object is positioned', example: 'Orientation helps you follow a map correctly.'},
      {term: 'direction word', meaning: 'a word showing movement or position', example: 'Direction words guide map labeling answers.'},
      {term: 'landmark', meaning: 'an important point used for location', example: 'Landmarks make it easier to confirm a location.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'listening-section2-short-answer-training',
    title: 'Section 2 Short Answer Training',
    summary: 'Train for one-word and short-answer questions with strong attention to detail.',
    lessonContent: [
      'Read the instructions first so you know the exact word limit.',
      'Listen for nouns, times, places, and numbers in the exact order of the questions.',
      'Use grammar and singular/plural clues to verify the final answer.',
    ],
    keyVocabulary: [
      {term: 'short answer', meaning: 'a brief response usually in one or a few words', example: 'Short answers require precision and spelling control.'},
      {term: 'instruction', meaning: 'the rule or condition for the task', example: 'The instruction determines the word limit.'},
      {term: 'noun phrase', meaning: 'a phrase built around a noun', example: 'Many answers are noun phrases.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'listening-section3-academic-discussion',
    title: 'Section 3 Academic Discussion Skills',
    summary: 'Handle opinion shifts, academic tone, and speaker changes in discussion-based audio.',
    lessonContent: [
      'Identify who is speaking and what each speaker agrees or disagrees with.',
      'Notice when the conversation moves from general ideas to specific details.',
      'Do not assume the answer from only one speaker; confirm the final statement carefully.',
    ],
    keyVocabulary: [
      {term: 'speaker change', meaning: 'a switch from one person to another in the recording', example: 'A speaker change can alter the answer quickly.'},
      {term: 'academic tone', meaning: 'formal language used in study-related discussion', example: 'Academic tone often appears in Section 3.'},
      {term: 'agreement', meaning: 'a shared opinion or decision', example: 'Agreement clues help solve discussion questions.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'listening-section4-lecture-notes',
    title: 'Section 4 Lecture Note Capture',
    summary: 'Develop note-taking systems for lecture-style recordings and dense academic input.',
    lessonContent: [
      'Write only the most important keywords because Section 4 moves quickly.',
      'Listen for examples and signpost phrases that reveal the lecture structure.',
      'Group related facts together so your notes stay organized while listening.',
    ],
    keyVocabulary: [
      {term: 'lecture structure', meaning: 'the organised flow of a lecture', example: 'A lecture structure helps you predict upcoming points.'},
      {term: 'note-taking', meaning: 'recording essential information briefly', example: 'Good note-taking supports Section 4 accuracy.'},
      {term: 'keyword', meaning: 'an important word that captures meaning', example: 'Keywords are more useful than full sentences in notes.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'listening-spelling-and-number-accuracy',
    title: 'Spelling and Number Accuracy Drill',
    summary: 'Avoid preventable score loss by training spelling, numbers, and formatting rules.',
    lessonContent: [
      'Spell names and places exactly as heard, including double letters and uncommon names.',
      'Write numbers carefully, especially dates, times, and phone numbers.',
      'Review the answer sheet for singular/plural and capitalization issues if relevant.',
    ],
    keyVocabulary: [
      {term: 'capitalization', meaning: 'the use of upper-case letters', example: 'Capitalization matters in some answer types.'},
      {term: 'number format', meaning: 'the way a number is written', example: 'Number format should match the task instructions.'},
      {term: 'spelling check', meaning: 'reviewing the exact letters used in a word', example: 'A final spelling check can save marks.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
])

const speakingResources = buildSkillSectionResources('speakingResource', [
  {
    id: 'speaking-part2-storytelling-patterns',
    title: 'Speaking Part 2 Storytelling Patterns',
    summary: 'Structure fluent two-minute speaking answers with strong sequencing and detail expansion.',
    lessonContent: [
      'Use a beginning-middle-end structure to keep your answer organized and natural.',
      'Expand details with who, when, where, what happened, and why it was meaningful.',
      'Practice with timed repetition to increase confidence and reduce hesitation.',
    ],
    keyVocabulary: [
      {term: 'narrative flow', meaning: 'smooth progression of events in speech', example: 'Narrative flow helps examiners follow your ideas.'},
      {term: 'hesitation marker', meaning: 'filler sounds used while thinking', example: 'Reducing hesitation markers improves fluency score.'},
      {term: 'elaboration', meaning: 'adding details to support an idea', example: 'Elaboration is critical for Part 2 development.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'speaking-part1-natural-answers',
    title: 'Part 1 Natural Answer Builder',
    summary: 'Create relaxed, extended, and accurate responses for short personal questions.',
    lessonContent: [
      'Answer directly first, then add one supporting detail or short explanation.',
      'Avoid memorised speeches because they sound unnatural in Part 1.',
      'Use everyday vocabulary with clear pronunciation and steady pace.',
    ],
    keyVocabulary: [
      {term: 'direct answer', meaning: 'the first clear response to the question', example: 'A direct answer keeps Part 1 concise.'},
      {term: 'supporting detail', meaning: 'extra information that develops the answer', example: 'A supporting detail makes the response feel natural.'},
      {term: 'natural tone', meaning: 'speech that sounds normal and unforced', example: 'A natural tone is important in the speaking test.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'speaking-part3-idea-extension',
    title: 'Part 3 Idea Extension Practice',
    summary: 'Extend opinions, compare ideas, and justify your views in deeper follow-up questions.',
    lessonContent: [
      'Start with a clear opinion before expanding the reasoning behind it.',
      'Use comparison language to discuss change, society, or technology topics.',
      'Support your answer with general examples or observed trends rather than personal storytelling only.',
    ],
    keyVocabulary: [
      {term: 'justify', meaning: 'to explain why an opinion is reasonable', example: 'You should justify your view in Part 3.'},
      {term: 'compare', meaning: 'to examine similarities or differences', example: 'Comparing two ideas can enrich the answer.'},
      {term: 'trend', meaning: 'a general direction of change', example: 'Trends are common in Part 3 questions.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'speaking-pronunciation-and-stress',
    title: 'Pronunciation and Stress Control',
    summary: 'Improve clarity through sentence stress, intonation, and sound precision.',
    lessonContent: [
      'Stress the key words in a sentence so the meaning becomes easier to follow.',
      'Use rising and falling intonation naturally, without sounding exaggerated.',
      'Practice difficult sounds and common word endings to avoid misunderstanding.',
    ],
    keyVocabulary: [
      {term: 'intonation', meaning: 'the rise and fall of voice in speech', example: 'Good intonation makes answers sound more fluent.'},
      {term: 'sentence stress', meaning: 'emphasis placed on important words', example: 'Sentence stress highlights the main message.'},
      {term: 'clarity', meaning: 'being easy to understand', example: 'Clarity is more important than speaking too fast.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'speaking-fluency-reset-techniques',
    title: 'Fluency Reset Techniques',
    summary: 'Learn how to recover smoothly when you lose your thought during the test.',
    lessonContent: [
      'Use short filler phrases to reset your thinking instead of stopping completely.',
      'Keep speaking calmly and try to rephrase the idea if you forget a word.',
      'Build a habit of practising with time limits to reduce panic in the exam.',
    ],
    keyVocabulary: [
      {term: 'filler phrase', meaning: 'a short phrase used while thinking', example: 'A filler phrase can buy time in speaking.'},
      {term: 'rephrase', meaning: 'say something again using different words', example: 'Rephrasing helps maintain fluency.'},
      {term: 'fluency reset', meaning: 'a quick technique to continue speaking smoothly', example: 'A fluency reset prevents long pauses.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'speaking-topic-vocabulary-bank',
    title: 'Topic Vocabulary Bank',
    summary: 'Build theme-based words for common IELTS speaking topics like education, travel, and work.',
    lessonContent: [
      'Create small vocabulary groups for each common speaking theme.',
      'Learn collocations and short example sentences instead of isolated words only.',
      'Revisit the vocabulary regularly to make it easier to remember under pressure.',
    ],
    keyVocabulary: [
      {term: 'theme', meaning: 'a broad subject area', example: 'Education is a common speaking theme.'},
      {term: 'collocation', meaning: 'words that naturally go together', example: 'A vocabulary bank should include collocations.'},
      {term: 'recall', meaning: 'remembering information quickly', example: 'Regular review improves word recall.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'speaking-mock-interview-drills',
    title: 'Mock Interview Drills',
    summary: 'Simulate full speaking tests to improve timing, confidence, and examiner-style responses.',
    lessonContent: [
      'Use a timer and answer all three parts without stopping the flow of practice.',
      'Review recorded answers afterwards to spot filler words, grammar mistakes, and weak ideas.',
      'Repeat the same prompt until the answer sounds smoother and more confident.',
    ],
    keyVocabulary: [
      {term: 'mock interview', meaning: 'a practice version of the real speaking test', example: 'Mock interviews prepare students for exam conditions.'},
      {term: 'self-review', meaning: 'checking your own performance', example: 'Self-review helps identify speaking weaknesses.'},
      {term: 'confidence', meaning: 'a calm belief in your own ability', example: 'Confidence improves through repeated drills.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
])

const preIeltsResources = buildSkillSectionResources('preIeltsResource', [
  {
    id: 'preielts-core-grammar-starter',
    title: 'Pre-IELTS Core Grammar Starter',
    summary: 'Strengthen foundational sentence grammar before entering full IELTS preparation modules.',
    lessonContent: [
      'Start with sentence patterns: subject + verb + object, then add time and place phrases.',
      'Practice common verb tenses used in daily communication and IELTS responses.',
      'Build confidence through short guided writing and speaking tasks with feedback cycles.',
    ],
    keyVocabulary: [
      {term: 'sentence pattern', meaning: 'basic arrangement of words in a sentence', example: 'Mastering sentence patterns improves clarity.'},
      {term: 'verb tense', meaning: 'time form of a verb', example: 'Verb tense consistency is essential in writing tasks.'},
      {term: 'accuracy', meaning: 'correct use of grammar and vocabulary', example: 'Pre-IELTS training focuses on language accuracy first.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1462536943532-57a629f6cc60?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'preielts-basic-vocabulary-builder',
    title: 'Basic Vocabulary Builder',
    summary: 'Learn high-frequency words and expressions needed for everyday IELTS communication.',
    lessonContent: [
      'Group words by topic such as family, education, travel, and health.',
      'Use each word in a short sentence so the meaning becomes easier to remember.',
      'Review vocabulary in small daily sets instead of trying to memorise too much at once.',
    ],
    keyVocabulary: [
      {term: 'high-frequency', meaning: 'appearing or used very often', example: 'High-frequency vocabulary is useful for beginners.'},
      {term: 'expression', meaning: 'a phrase or way of saying something', example: 'Everyday expressions make speaking more natural.'},
      {term: 'review', meaning: 'to study again', example: 'Regular review improves memory retention.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'preielts-sentence-building-practice',
    title: 'Sentence Building Practice',
    summary: 'Combine simple clauses into clearer, longer sentences without losing grammar control.',
    lessonContent: [
      'Begin with simple sentences and then connect them with basic linking words.',
      'Check that each sentence has a clear subject and verb before adding detail.',
      'Practise transforming short notes into complete IELTS-ready sentences.',
    ],
    keyVocabulary: [
      {term: 'clause', meaning: 'a part of a sentence with a subject and verb', example: 'Clauses help build stronger sentences.'},
      {term: 'linking word', meaning: 'a word used to connect ideas', example: 'Linking words improve sentence flow.'},
      {term: 'complete sentence', meaning: 'a sentence that expresses a full thought', example: 'A complete sentence needs a subject and verb.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'preielts-pronunciation-foundations',
    title: 'Pronunciation Foundations',
    summary: 'Develop clearer pronunciation before moving into more advanced speaking tasks.',
    lessonContent: [
      'Focus on vowel and consonant sounds that commonly cause confusion.',
      'Read short phrases aloud and record yourself to check clarity.',
      'Aim for understandable pronunciation rather than a perfect accent.',
    ],
    keyVocabulary: [
      {term: 'vowel sound', meaning: 'a speech sound made with an open vocal tract', example: 'Vowel sounds are important for clear pronunciation.'},
      {term: 'consonant sound', meaning: 'a speech sound produced with some obstruction', example: 'Consonant sounds must be articulated clearly.'},
      {term: 'clarity', meaning: 'how easy something is to understand', example: 'Clarity matters more than speed.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'preielts-listening-basics',
    title: 'Listening Basics and Sound Recognition',
    summary: 'Build early listening confidence with sound discrimination and short audio tasks.',
    lessonContent: [
      'Practise listening for names, numbers, dates, and everyday phrases.',
      'Replay short audio clips and identify the exact words you missed.',
      'Work on recognising similar sounding words and common corrections.',
    ],
    keyVocabulary: [
      {term: 'sound recognition', meaning: 'identifying spoken sounds accurately', example: 'Sound recognition improves listening confidence.'},
      {term: 'audio clip', meaning: 'a short recorded piece of sound', example: 'Short audio clips are useful for beginners.'},
      {term: 'dictation', meaning: 'writing what you hear', example: 'Dictation builds careful listening habits.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    id: 'preielts-reading-setup',
    title: 'Reading Setup for Beginners',
    summary: 'Learn how to read with purpose before handling full IELTS passages.',
    lessonContent: [
      'Read short texts and answer simple factual questions first.',
      'Underline unknown words and try to infer meaning from context.',
      'Build reading stamina by practising every day with short passages.',
    ],
    keyVocabulary: [
      {term: 'context', meaning: 'the words around something that help explain it', example: 'Context helps you understand new vocabulary.'},
      {term: 'stamina', meaning: 'the ability to continue for a long time', example: 'Reading stamina improves with regular practice.'},
      {term: 'infer', meaning: 'to work out a meaning from clues', example: 'You can infer meaning from the sentence context.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    id: 'preielts-study-habits-planner',
    title: 'Study Habits Planner',
    summary: 'Set up simple routines that make long-term IELTS preparation easier to maintain.',
    lessonContent: [
      'Create a fixed weekly study schedule so learning becomes a habit.',
      'Mix grammar, vocabulary, reading, listening, and speaking in small daily sessions.',
      'Track progress in a notebook or checklist to stay motivated.',
    ],
    keyVocabulary: [
      {term: 'routine', meaning: 'a regular way of doing things', example: 'A routine helps learners stay consistent.'},
      {term: 'motivation', meaning: 'the reason or drive to keep going', example: 'Visible progress boosts motivation.'},
      {term: 'checklist', meaning: 'a list of tasks to complete', example: 'A checklist keeps study sessions organised.'},
    ],
    featuredImageUrl: 'https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
])

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const token = process.env.SANITY_WRITE_TOKEN

if (!projectId || !token) {
  throw new Error('Missing SANITY credentials. Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_WRITE_TOKEN in .env')
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2026-06-24',
  token,
  useCdn: false,
})

const resources: ResourcePayload[] = [
  {
    type: 'cueCard',
    id: 'cue-describe-study-website',
    title: 'Describe a website you use to help you study',
    prompts:
      'You should say:\n- what the website is\n- how you found it\n- how often you use it\n- and explain why it helps you improve your IELTS preparation.',
    modelAnswer:
      'One website that has genuinely transformed my study routine is BBC Learning English. I discovered it while searching for authentic listening materials, and since then I have used it almost every day. The main reason I find it useful is that it combines real-world language with clear explanations, which helps me build both fluency and accuracy.\n\nFor IELTS preparation, I particularly rely on their short news videos and pronunciation modules. These resources improve my listening concentration and give me natural phrases I can reuse in speaking tasks. I also note down topic vocabulary and test myself later in writing practice.\n\nOverall, this website is far more than a passive learning platform for me. It keeps my study sessions focused, structured, and realistic, which is exactly what IELTS candidates need when aiming for a high band score like 8.5.',
    vocabulary: [
      {
        expression: 'transform my study routine',
        entryType: 'Vocabulary',
        meaning: 'to significantly improve how I study',
        exampleUsage: 'Using guided mock tests transformed my study routine before the exam.',
      },
      {
        expression: 'build fluency and accuracy',
        entryType: 'Vocabulary',
        meaning: 'to improve smooth communication while staying grammatically correct',
        exampleUsage: 'Regular speaking practice helps learners build fluency and accuracy.',
      },
      {
        expression: 'hit the ground running',
        entryType: 'Idiom',
        meaning: 'to start quickly and effectively',
        exampleUsage: 'With a clear weekly plan, I hit the ground running in my IELTS prep.',
      },
    ],
    featuredImageUrl:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    type: 'cueCard',
    id: 'cue-describe-a-mentor',
    title: 'Describe a person who has influenced your academic journey',
    prompts:
      'You should say:\n- who this person is\n- how you met this person\n- what advice they gave you\n- and explain why this influence was important for your studies.',
    modelAnswer:
      'A person who greatly influenced my academic journey is my English mentor from high school. I first met her when I struggled with essay writing, and she noticed that my ideas were good but my structure lacked clarity. She taught me how to organize arguments logically and support each point with relevant examples.\n\nOne key piece of advice she gave me was to treat language as a tool for clear thinking rather than memorized grammar rules. Because of that mindset, I became more confident in writing and speaking. I started practicing with purpose, especially for IELTS tasks that require coherence and precision.\n\nIn the long term, her guidance transformed the way I learn. She did not only improve my test performance but also helped me become a more independent and disciplined student.',
    vocabulary: [
      {
        expression: 'academic journey',
        entryType: 'Vocabulary',
        meaning: 'the long-term path of study and learning',
        exampleUsage: 'A supportive teacher can reshape a student\'s academic journey.',
      },
      {
        expression: 'logical structure',
        entryType: 'Vocabulary',
        meaning: 'clear and organized arrangement of ideas',
        exampleUsage: 'A logical structure is essential for high-scoring IELTS essays.',
      },
      {
        expression: 'a turning point',
        entryType: 'Idiom',
        meaning: 'an event that changes direction significantly',
        exampleUsage: 'Joining a writing class was a turning point in my preparation.',
      },
    ],
    featuredImageUrl:
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    type: 'essay',
    id: 'essay-printed-books-vs-digital-media',
    questionTitle: 'Some people prefer printed books, while others prefer digital media',
    essayType: 'Discussion',
    examinerQuestion:
      'Some people prefer reading printed books, while others prefer reading digital media. Discuss both views and give your own opinion.',
    sampleAnswer: [
      'Reading habits have changed significantly over the last decade, and many people now choose digital media instead of traditional printed books. While both formats have clear advantages, I believe a balanced approach is the most practical solution.',
      'On the one hand, printed books provide a distraction-free environment and often improve concentration. Many readers also enjoy the physical experience of turning pages, highlighting sections, and keeping books for long-term reference. In academic settings, this tactile interaction can support deeper comprehension and better memory retention.',
      'On the other hand, digital media offers convenience, portability, and accessibility. A single device can store thousands of books, and online platforms often include built-in dictionaries, note-taking tools, and search functions. For students and professionals with limited time, these features can increase reading efficiency and support independent learning.',
      'In my view, digital media is ideal for speed and flexibility, whereas printed books remain superior for intensive study and long-form reading. Therefore, using both strategically is the best way to benefit from modern technology without losing the cognitive advantages of print.',
    ],
    bandScoreEvaluation:
      'Band 8.0+: Clear task response, well-developed comparison, cohesive paragraphing, and strong lexical control. Grammar includes a range of complex structures with high accuracy.',
    featuredImageUrl:
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    type: 'essay',
    id: 'essay-public-transport-vs-private-cars',
    questionTitle: 'In many cities, public transport should replace private cars',
    essayType: 'Opinion',
    examinerQuestion:
      'Some people believe that governments should invest heavily in public transport and discourage private car use. To what extent do you agree or disagree?',
    sampleAnswer: [
      'Traffic congestion and air pollution have become major urban challenges, and many policymakers argue that strong investment in public transport is the most effective solution. I largely agree with this view, although private vehicles will still be necessary in specific contexts.',
      'An efficient public transport network can reduce traffic volume dramatically. When buses and trains are reliable, affordable, and frequent, commuters are more willing to leave their cars at home. This shift not only eases congestion but also lowers fuel consumption and emissions, which are critical for sustainable city development.',
      'Public systems are also economically inclusive. Not every resident can afford to purchase and maintain a private vehicle, so quality transport improves access to jobs, education, and healthcare for lower-income groups. From a policy perspective, this makes transport investment both practical and socially equitable.',
      'However, private cars cannot be eliminated entirely. People in suburban or rural zones may lack sufficient transport coverage, and emergency travel often requires personal mobility. Therefore, the best approach is to prioritize public transport while implementing balanced car-management measures such as congestion pricing and limited parking zones.',
    ],
    bandScoreEvaluation:
      'Band 8.0+: Strong opinion with consistent support, clear paragraph progression, and precise vocabulary around policy and sustainability.',
    featuredImageUrl:
      'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    type: 'vocabulary',
    id: 'vocabulary-technology-education',
    topic: 'Technology and Education',
    words: [
      {
        word: 'ubiquitous',
        partOfSpeech: 'adjective',
        definition: 'present or found everywhere',
        ieltsExampleSentence: 'Smartphones have become ubiquitous in modern classrooms.',
      },
      {
        word: 'pedagogical',
        partOfSpeech: 'adjective',
        definition: 'related to teaching methods',
        ieltsExampleSentence: 'The course applies pedagogical strategies that support active learning.',
      },
      {
        word: 'blended learning',
        partOfSpeech: 'noun phrase',
        definition: 'a method combining online and face-to-face instruction',
        ieltsExampleSentence: 'Blended learning can improve flexibility for working students.',
      },
    ],
    featuredImageUrl:
      'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    type: 'vocabulary',
    id: 'vocabulary-health-lifestyle',
    topic: 'Health and Lifestyle Vocabulary',
    words: [
      {
        word: 'sedentary',
        partOfSpeech: 'adjective',
        definition: 'involving little physical activity',
        ieltsExampleSentence: 'A sedentary lifestyle can negatively affect long-term health.',
      },
      {
        word: 'well-being',
        partOfSpeech: 'noun',
        definition: 'the state of being healthy and comfortable',
        ieltsExampleSentence: 'Regular exercise improves both physical health and mental well-being.',
      },
      {
        word: 'nutrient-dense',
        partOfSpeech: 'adjective',
        definition: 'containing many nutrients compared to calories',
        ieltsExampleSentence: 'The report encouraged people to consume more nutrient-dense foods.',
      },
    ],
    featuredImageUrl:
      'https://images.unsplash.com/photo-1490645935967-10de6ba17061?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  {
    type: 'vocabulary',
    id: 'vocabulary-environment',
    topic: 'Environment and Climate Vocabulary',
    words: [
      {
        word: 'mitigate',
        partOfSpeech: 'verb',
        definition: 'to reduce the harmful effects of something',
        ieltsExampleSentence: 'Governments should invest in renewable energy to mitigate climate change.',
      },
      {
        word: 'biodiversity',
        partOfSpeech: 'noun',
        definition: 'the variety of plant and animal life in a habitat',
        ieltsExampleSentence: 'Deforestation poses a major threat to biodiversity in tropical regions.',
      },
      {
        word: 'sustainable',
        partOfSpeech: 'adjective',
        definition: 'able to continue over a long period without harming resources',
        ieltsExampleSentence: 'Cities should prioritize sustainable public transport systems.',
      },
    ],
    featuredImageUrl:
      'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf',
  },
  {
    type: 'vocabulary',
    id: 'vocabulary-work-careers',
    topic: 'Work and Career Vocabulary',
    words: [
      {
        word: 'upskill',
        partOfSpeech: 'verb',
        definition: 'to learn new skills for better job performance',
        ieltsExampleSentence: 'Many employees upskill to stay competitive in a changing job market.',
      },
      {
        word: 'work-life balance',
        partOfSpeech: 'noun phrase',
        definition: 'a healthy division between work responsibilities and personal life',
        ieltsExampleSentence: 'Flexible schedules often improve work-life balance.',
      },
      {
        word: 'entrepreneurial',
        partOfSpeech: 'adjective',
        definition: 'showing ability to start and manage business opportunities',
        ieltsExampleSentence: 'Universities should cultivate entrepreneurial thinking among students.',
      },
    ],
    featuredImageUrl:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?q=80&w=1400&auto=format&fit=crop',
    downloadableGuideUrl: 'https://www.orimi.com/pdf-test.pdf',
  },
  ...readingResources,
  ...writingResources,
  ...listeningResources,
  ...speakingResources,
  ...preIeltsResources,
]

async function uploadAssetFromUrl(assetUrl: string | undefined, filename: string): Promise<UploadedAsset | undefined> {
  if (!assetUrl) {
    return undefined
  }

  const response = await fetch(assetUrl)
  if (!response.ok) {
    throw new Error(`Failed to fetch asset from ${assetUrl}`)
  }

  const contentType = response.headers.get('content-type') || ''
  const buffer = Buffer.from(await response.arrayBuffer())

  if (contentType.startsWith('image/')) {
    return client.assets.upload('image', buffer, {
      filename,
      contentType,
    })
  }

  return client.assets.upload('file', buffer, {
    filename,
    contentType: contentType || 'application/pdf',
  })
}

async function uploadWithGuard(
  kind: 'featuredImage' | 'downloadableGuide',
  sourceUrl: string | undefined,
  filename: string,
): Promise<{asset?: UploadedAsset; result: AssetResult}> {
  if (!sourceUrl) {
    return {
      result: {
        kind,
        sourceUrl,
        status: 'skipped',
        message: 'No URL configured',
      },
    }
  }

  try {
    const asset = await uploadAssetFromUrl(sourceUrl, filename)
    return {
      asset,
      result: {
        kind,
        sourceUrl,
        status: 'uploaded',
        assetId: asset?._id,
      },
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown upload error'
    return {
      result: {
        kind,
        sourceUrl,
        status: 'failed',
        message,
      },
    }
  }
}

function imageRef(asset?: UploadedAsset) {
  if (!asset) {
    return undefined
  }

  return {
    _type: 'image',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }
}

function fileRef(asset?: UploadedAsset) {
  if (!asset) {
    return undefined
  }

  return {
    _type: 'file',
    asset: {
      _type: 'reference',
      _ref: asset._id,
    },
  }
}

async function upsertResource(resource: ResourcePayload): Promise<ItemReport> {
  const [featuredImageUpload, downloadableGuideUpload] = await Promise.all([
    uploadWithGuard('featuredImage', resource.featuredImageUrl, `${resource.id}-cover`),
    uploadWithGuard('downloadableGuide', resource.downloadableGuideUrl, `${resource.id}-guide.pdf`),
  ])

  const assetResults = [featuredImageUpload.result, downloadableGuideUpload.result]

  try {
    if (resource.type === 'cueCard') {
      await client.createOrReplace({
        _id: resource.id,
        _type: 'cueCard',
        title: resource.title,
        targetSlug: {current: slugify(resource.title)},
        featuredImage: imageRef(featuredImageUpload.asset),
        downloadableGuide: fileRef(downloadableGuideUpload.asset),
        part2Prompts: resource.prompts,
        sampleModelAnswerMarkdown: resource.modelAnswer,
        essentialVocabularyIdioms: resource.vocabulary.map((entry) => ({
          _type: 'matrixRow',
          expression: entry.expression,
          entryType: entry.entryType,
          meaning: entry.meaning,
          exampleUsage: entry.exampleUsage,
        })),
      })
    } else if (resource.type === 'essay') {
      await client.createOrReplace({
        _id: resource.id,
        _type: 'essay',
        questionTitle: resource.questionTitle,
        slug: {current: slugify(resource.questionTitle)},
        featuredImage: imageRef(featuredImageUpload.asset),
        downloadableGuide: fileRef(downloadableGuideUpload.asset),
        essayType: resource.essayType,
        examinerQuestion: resource.examinerQuestion,
        sampleAnswer: resource.sampleAnswer.map((paragraph) => ({
          _type: 'block',
          children: [{_type: 'span', text: paragraph}],
        })),
        bandScoreEvaluation: resource.bandScoreEvaluation,
      })
    } else if (resource.type === 'vocabulary') {
      await client.createOrReplace({
        _id: resource.id,
        _type: 'vocabulary',
        topic: resource.topic,
        slug: {current: slugify(resource.topic)},
        featuredImage: imageRef(featuredImageUpload.asset),
        downloadableGuide: fileRef(downloadableGuideUpload.asset),
        wordList: resource.words.map((word) => ({
          _type: 'wordEntry',
          word: word.word,
          partOfSpeech: word.partOfSpeech,
          definition: word.definition,
          ieltsExampleSentence: word.ieltsExampleSentence,
        })),
      })
    } else {
      await client.createOrReplace({
        _id: resource.id,
        _type: resource.type,
        title: resource.title,
        slug: {current: slugify(resource.title)},
        summary: resource.summary,
        featuredImage: imageRef(featuredImageUpload.asset),
        downloadableGuide: fileRef(downloadableGuideUpload.asset),
        lessonContent: resource.lessonContent.map((paragraph) => ({
          _type: 'block',
          children: [{_type: 'span', text: paragraph}],
        })),
        keyVocabulary: resource.keyVocabulary.map((item) => ({
          _type: 'vocabItem',
          term: item.term,
          meaning: item.meaning,
          example: item.example,
        })),
      })
    }

    return {
      id: resource.id,
      type: resource.type,
      status: 'success',
      assetResults,
    }
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown upsert error'
    return {
      id: resource.id,
      type: resource.type,
      status: 'failed',
      assetResults,
      message,
    }
  }
}

async function writeSummaryReport(reports: ItemReport[]): Promise<string> {
  const startedAt = new Date()
  const successCount = reports.filter((item) => item.status === 'success').length
  const failedCount = reports.filter((item) => item.status === 'failed').length

  let uploadedAssets = 0
  let failedAssets = 0
  let skippedAssets = 0

  for (const report of reports) {
    for (const asset of report.assetResults) {
      if (asset.status === 'uploaded') uploadedAssets += 1
      if (asset.status === 'failed') failedAssets += 1
      if (asset.status === 'skipped') skippedAssets += 1
    }
  }

  const lines: string[] = []
  lines.push('# Resource Import Summary')
  lines.push('')
  lines.push(`- Timestamp: ${startedAt.toISOString()}`)
  lines.push(`- Project ID: ${projectId}`)
  lines.push(`- Dataset: ${dataset}`)
  lines.push(`- Total items: ${reports.length}`)
  lines.push(`- Successful items: ${successCount}`)
  lines.push(`- Failed items: ${failedCount}`)
  lines.push(`- Uploaded assets: ${uploadedAssets}`)
  lines.push(`- Failed assets: ${failedAssets}`)
  lines.push(`- Skipped assets: ${skippedAssets}`)
  lines.push('')
  lines.push('## Item Results')
  lines.push('')

  for (const report of reports) {
    lines.push(`### ${report.type}: ${report.id}`)
    lines.push(`- Status: ${report.status}`)
    if (report.message) {
      lines.push(`- Error: ${report.message}`)
    }

    for (const asset of report.assetResults) {
      lines.push(`- Asset ${asset.kind}: ${asset.status}`)
      if (asset.sourceUrl) lines.push(`  - Source: ${asset.sourceUrl}`)
      if (asset.assetId) lines.push(`  - Asset ID: ${asset.assetId}`)
      if (asset.message) lines.push(`  - Message: ${asset.message}`)
    }

    lines.push('')
  }

  await mkdir('docs', {recursive: true})
  const outputPath = 'docs/import-summary.md'
  await writeFile(outputPath, `${lines.join('\n')}\n`, 'utf8')
  return outputPath
}

async function run(): Promise<void> {
  console.log(`Starting resource import to project ${projectId}, dataset ${dataset}`)

  const reports: ItemReport[] = []

  for (const resource of resources) {
    const result = await upsertResource(resource)
    reports.push(result)

    if (result.status === 'success') {
      console.log(`Imported ${resource.type}: ${resource.id}`)
    } else {
      console.error(`Failed importing ${resource.type}: ${resource.id} :: ${result.message}`)
    }
  }

  const summaryPath = await writeSummaryReport(reports)
  const failedCount = reports.filter((item) => item.status === 'failed').length

  console.log(`Import completed. Summary report written to ${summaryPath}`)

  if (failedCount > 0) {
    process.exitCode = 1
  }
}

run().catch((error) => {
  console.error('Import process failed', error)
  process.exit(1)
})
