import api from './api';

const MOCK_USER_KEY = 'rs_current_user';
const TOKEN_KEY = 'auth_token';

export const authService = {
  // Login method
  async login(credentials) {
    try {
      const response = await api.post('/api/auth/login', credentials);
      if (response.data?.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
      }
      if (response.data?.user) {
        localStorage.setItem(MOCK_USER_KEY, JSON.stringify(response.data.user));
      }
      return response.data;
    } catch {
      // Mock Fallback for Demonstration
      if (!credentials.email || !credentials.password) {
        throw new Error('Please enter both email and password.');
      }
      if (credentials.password.length < 6) {
        throw new Error('Password must be at least 6 characters.');
      }

      const mockUser = {
        id: 'USR-TEACHER-01',
        name: credentials.email.toLowerCase().includes('jenkins')
          ? 'Dr. Sarah Jenkins'
          : credentials.email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
        email: credentials.email,
        role: 'Senior Reading Specialist',
        school: 'Lincoln Elementary School',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150',
      };
      const mockToken = 'mock-jwt-token-edu-2026';
      
      localStorage.setItem(TOKEN_KEY, mockToken);
      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));
      
      return { user: mockUser, token: mockToken, isMock: true };
    }
  },

  // Registration method
  async register(userData) {
    try {
      const response = await api.post('/api/auth/register', userData);
      if (response.data?.token) {
        localStorage.setItem(TOKEN_KEY, response.data.token);
      }
      if (response.data?.user) {
        localStorage.setItem(MOCK_USER_KEY, JSON.stringify(response.data.user));
      }
      return response.data;
    } catch {
      const mockUser = {
        id: 'USR-' + Math.floor(1000 + Math.random() * 9000),
        name: userData.fullName || 'Educator User',
        email: userData.email,
        role: userData.role || 'Teacher',
        school: userData.school || 'Lincoln Elementary School',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150',
      };
      const mockToken = 'mock-jwt-token-edu-reg-2026';

      localStorage.setItem(TOKEN_KEY, mockToken);
      localStorage.setItem(MOCK_USER_KEY, JSON.stringify(mockUser));

      return { user: mockUser, token: mockToken, isMock: true };
    }
  },

  // Get current session user - returns null if unauthenticated so Login page appears on start
  getCurrentUser() {
    const token = localStorage.getItem(TOKEN_KEY);
    const raw = localStorage.getItem(MOCK_USER_KEY);
    if (!token || !raw) {
      return null;
    }
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  },

  // Update profile
  updateProfile(profileData) {
    const current = this.getCurrentUser() || {};
    const updated = { ...current, ...profileData };
    localStorage.setItem(MOCK_USER_KEY, JSON.stringify(updated));
    return updated;
  },

  // Logout method
  logout() {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(MOCK_USER_KEY);
  }
};
