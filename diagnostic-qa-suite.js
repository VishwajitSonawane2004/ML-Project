// Diagnostic Test Suite for Q&A Reading Comprehension ML Assessment Pipeline
// Tests all 7 required cases on Question SEB-001 (SciEntsBank benchmark)

import { qaService } from './src/services/qaService.js';

const questionContext = {
  questionId: 'SEB-001',
  questionText: 'You put an ice cube on a plate in a warm room. After two hours, what happened to the ice cube, and why did this change occur?',
  domain: 'Physical Science',
  sourceDataset: 'SciEntsBank',
  childId: 'CHD-TEST-01',
  childName: 'Diagnostic Eval'
};

const testCases = [
  {
    id: 'Case A',
    label: 'Expected: Correct',
    answer: 'The ice melted into liquid water because it absorbed heat from the warm surroundings.'
  },
  {
    id: 'Case B',
    label: 'Expected: Partially Correct',
    answer: 'The ice turned into water because it was warm.'
  },
  {
    id: 'Case C',
    label: 'Expected: Incorrect (Misconception)',
    answer: 'The ice cube disappeared into the air because it evaporated.'
  },
  {
    id: 'Case D',
    label: 'Expected: Incorrect (Completely Unrelated)',
    answer: 'Delhi is the capital of India.'
  },
  {
    id: 'Case E',
    label: 'Expected: Incorrect (Contradictory)',
    answer: 'The ice cube remained frozen because the room was warm.'
  },
  {
    id: 'Case F',
    label: 'Expected: Incorrect (Very Short Fragment)',
    answer: 'Water.'
  },
  {
    id: 'Case G',
    label: 'Expected: Incorrect (Negation)',
    answer: 'The ice did not melt.'
  }
];

async function runTestSuite() {
  console.log('='.repeat(95));
  console.log('DIAGNOSTIC EVALUATION REPORT: Q&A READING COMPREHENSION PREDICTION PIPELINE');
  console.log('Corpus Benchmark: SciEntsBank (SEB-001: States of Matter & Heat)');
  console.log('='.repeat(95));

  const results = [];

  for (const tc of testCases) {
    const res = await qaService.assess({
      ...questionContext,
      studentAnswer: tc.answer
    });

    results.push({
      case: tc.id,
      input: tc.answer,
      prediction: res.classification,
      confidence: `${Math.round(res.confidence * 100)}%`,
      pCorrect: `${(res.probabilities.correct * 100).toFixed(1)}%`,
      pPartial: `${(res.probabilities.partial * 100).toFixed(1)}%`,
      pIncorrect: `${(res.probabilities.incorrect * 100).toFixed(1)}%`,
      reviewRequired: res.reviewRequired ? 'YES' : 'NO',
      rejectionReason: res.rejectionReason || 'None (Standard)'
    });
  }

  console.table(results);
  console.log('='.repeat(95));
  console.log('Detailed Verification Breakdown:\n');

  results.forEach(r => {
    console.log(`[${r.case}] "${r.input}"`);
    console.log(`  -> Prediction:      ${r.prediction} (Confidence: ${r.confidence})`);
    console.log(`  -> Class Probs:     P(Correct)=${r.pCorrect} | P(Partial)=${r.pPartial} | P(Incorrect)=${r.pIncorrect}`);
    console.log(`  -> Review Required: ${r.reviewRequired} (Rejection Reason: ${r.rejectionReason})\n`);
  });
}

runTestSuite().catch(err => {
  console.error('Test execution failed:', err);
});
