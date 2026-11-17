import api from './api';
import { initialAssessments } from '../data/mockData';

const ASSESSMENTS_KEY = 'rs_all_assessments';

const getStoredAssessments = () => {
  const data = localStorage.getItem(ASSESSMENTS_KEY);
  if (!data) {
    localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify(initialAssessments));
    return initialAssessments;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialAssessments;
  }
};

export const assessmentService = {
  async getAssessments(filters = {}) {
    try {
      const response = await api.get('/api/assessments', { params: filters });
      return response.data;
    } catch {
      let assessments = getStoredAssessments();

      // Check for newly added oral or QA assessments from session
      const oralSaved = JSON.parse(localStorage.getItem('rs_oral_assessments') || '[]');
      const qaSaved = JSON.parse(localStorage.getItem('rs_qa_assessments') || '[]');

      // Merge unique
      const existingIds = new Set(assessments.map(a => a.id));
      const newlyCreated = [];

      oralSaved.forEach(o => {
        if (!existingIds.has(o.assessmentId)) {
          existingIds.add(o.assessmentId);
          newlyCreated.push({
            id: o.assessmentId,
            childId: o.childId,
            childName: o.childName,
            grade: 'Grade 3',
            type: 'Oral Reading',
            date: o.date,
            passageTitle: o.passageTitle,
            metric1: `${o.wordErrorRate}% WER`,
            metric2: `${o.estimatedWpm} Est. WPM`,
            status: 'Completed',
            confidence: '95%',
            reviewRequired: false,
            summary: o.summary
          });
        }
      });

      qaSaved.forEach(q => {
        if (!existingIds.has(q.assessmentId)) {
          existingIds.add(q.assessmentId);
          newlyCreated.push({
            id: q.assessmentId,
            childId: q.childId,
            childName: q.childName,
            grade: 'Grade 3',
            type: 'Q&A Assessment',
            date: q.date,
            questionCode: q.questionId,
            metric1: `Classification: ${q.classification}`,
            metric2: `Confidence: ${q.confidence}`,
            status: q.reviewRequired ? 'Review Required' : 'Completed',
            confidence: `${Math.round(q.confidence * 100)}%`,
            reviewRequired: q.reviewRequired,
            summary: q.summary
          });
        }
      });

      if (newlyCreated.length > 0) {
        assessments = [...newlyCreated, ...assessments];
        localStorage.setItem(ASSESSMENTS_KEY, JSON.stringify(assessments));
      }

      // Apply filtering
      if (filters.search) {
        const q = filters.search.toLowerCase();
        assessments = assessments.filter(
          item =>
            item.childName.toLowerCase().includes(q) ||
            item.id.toLowerCase().includes(q) ||
            (item.passageTitle && item.passageTitle.toLowerCase().includes(q)) ||
            (item.questionCode && item.questionCode.toLowerCase().includes(q))
        );
      }

      if (filters.type && filters.type !== 'All Types') {
        assessments = assessments.filter(item => item.type === filters.type);
      }

      if (filters.status && filters.status !== 'All Statuses') {
        assessments = assessments.filter(item => item.status === filters.status);
      }

      if (filters.childId) {
        assessments = assessments.filter(item => item.childId === filters.childId);
      }

      return assessments;
    }
  },

  async getAssessmentById(id) {
    try {
      const response = await api.get(`/api/assessments/${id}`);
      return response.data;
    } catch {
      const all = getStoredAssessments();
      const found = all.find(a => a.id === id);
      if (!found) throw new Error('Assessment not found');
      return found;
    }
  }
};
