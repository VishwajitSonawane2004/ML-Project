import api from './api';
import { initialQuestions } from '../data/mockData';

const QUESTIONS_KEY = 'rs_questions_bank';

const getStoredQuestions = () => {
  const data = localStorage.getItem(QUESTIONS_KEY);
  if (!data) {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(initialQuestions));
    return initialQuestions;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialQuestions;
  }
};

export const questionService = {
  async getQuestions(filters = {}) {
    try {
      const response = await api.get('/api/questions', { params: filters });
      return response.data;
    } catch {
      let questions = getStoredQuestions();

      if (filters.search) {
        const q = filters.search.toLowerCase();
        questions = questions.filter(
          item =>
            item.prompt.toLowerCase().includes(q) ||
            item.domain.toLowerCase().includes(q) ||
            item.topic.toLowerCase().includes(q) ||
            item.code.toLowerCase().includes(q)
        );
      }

      if (filters.dataset && filters.dataset !== 'All Datasets') {
        questions = questions.filter(item => item.sourceDataset === filters.dataset);
      }

      if (filters.domain && filters.domain !== 'All Domains') {
        questions = questions.filter(item => item.domain === filters.domain);
      }

      return questions;
    }
  },

  async createQuestion(questionData) {
    try {
      const response = await api.post('/api/questions', questionData);
      return response.data;
    } catch {
      const questions = getStoredQuestions();
      const newQuestion = {
        id: `TCQ-${Date.now().toString().slice(-4)}`,
        code: `TC_Q_${Math.floor(100 + Math.random() * 900)}`,
        sourceDataset: 'Teacher Created',
        datasetType: 'Teacher Created',
        domain: questionData.domain || 'Reading Comprehension',
        topic: questionData.topic || 'General Reading Comprehension',
        gradeLevel: questionData.gradeLevel || 'Grade 3-4',
        totalStudentResponses: 1,
        prompt: questionData.prompt,
        sampleAnswers: [
          {
            answer: questionData.sampleAnswer || 'Exemplar answer provided by teacher.',
            label: 'Correct',
            confidence: 0.95
          }
        ]
      };
      const updated = [newQuestion, ...questions];
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(updated));
      return newQuestion;
    }
  }
};
