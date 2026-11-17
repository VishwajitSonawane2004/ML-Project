import api from './api';
import { initialChildren } from '../data/mockData';

const STORAGE_KEY = 'rs_children_data';

const getLocalChildren = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialChildren));
    return initialChildren;
  }
  try {
    return JSON.parse(data);
  } catch {
    return initialChildren;
  }
};

const saveLocalChildren = (children) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(children));
};

export const childService = {
  async getChildren(filters = {}) {
    try {
      const response = await api.get('/api/children', { params: filters });
      return response.data;
    } catch {
      let children = getLocalChildren();
      if (filters.search) {
        const q = filters.search.toLowerCase();
        children = children.filter(c => 
          c.name.toLowerCase().includes(q) || 
          c.id.toLowerCase().includes(q) ||
          c.school.toLowerCase().includes(q)
        );
      }
      if (filters.grade && filters.grade !== 'All Grades') {
        children = children.filter(c => c.grade === filters.grade);
      }
      if (filters.status && filters.status !== 'All Statuses') {
        children = children.filter(c => c.status === filters.status);
      }
      return children;
    }
  },

  async getChildById(id) {
    try {
      const response = await api.get(`/api/children/${id}`);
      return response.data;
    } catch {
      const children = getLocalChildren();
      const child = children.find(c => c.id === id);
      if (!child) {
        throw new Error(`Child with ID ${id} not found.`);
      }
      return child;
    }
  },

  async createChild(childData) {
    try {
      const response = await api.post('/api/children', childData);
      return response.data;
    } catch {
      const children = getLocalChildren();
      const newChild = {
        id: `CHD-${Math.floor(110 + Math.random() * 890)}`,
        name: childData.name,
        age: parseInt(childData.age, 10) || 8,
        grade: childData.grade || 'Grade 3',
        gender: childData.gender || 'Not specified',
        school: childData.school || 'Lincoln Elementary School',
        dateAdded: new Date().toISOString().split('T')[0],
        status: 'Pending',
        avatarColor: ['bg-blue-600', 'bg-indigo-600', 'bg-purple-600', 'bg-emerald-600', 'bg-amber-600'][
          Math.floor(Math.random() * 5)
        ],
        notes: childData.notes || '',
        oralReadingSummary: null,
        comprehensionSummary: null
      };
      const updated = [newChild, ...children];
      saveLocalChildren(updated);
      return newChild;
    }
  },

  async updateChild(id, updatedFields) {
    try {
      const response = await api.put(`/api/children/${id}`, updatedFields);
      return response.data;
    } catch {
      const children = getLocalChildren();
      const index = children.findIndex(c => c.id === id);
      if (index === -1) throw new Error('Child not found');
      const updatedChild = { ...children[index], ...updatedFields };
      children[index] = updatedChild;
      saveLocalChildren(children);
      return updatedChild;
    }
  },

  async deleteChild(id) {
    try {
      await api.delete(`/api/children/${id}`);
      return { success: true };
    } catch {
      const children = getLocalChildren();
      const filtered = children.filter(c => c.id !== id);
      saveLocalChildren(filtered);
      return { success: true };
    }
  }
};
